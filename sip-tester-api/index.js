require('dotenv').config();
const express = require('express');
const cors = require('cors');
// O WebRTC nativo não existe no Node, então usamos node-webrtc ou mocked transport dependendo da lib SIP.
// Utilizaremos uma implementação básica de socket SIP TCP pura adaptada para esse mock de teste.
const sip = require('sip'); // npm install sip (sip nativo do Cédric)
const os = require('os');

const app = express();
app.use(cors());
app.use(express.json());

// Load MicroSIP Credentials
const SIP_USER = process.env.SIP_USER || '3192411884';
const SIP_PASS = process.env.SIP_PASS || 'R3m@t0839'; // Chave placeholder caso não passada
const SIP_DOMAIN = process.env.SIP_DOMAIN || 'fiemg.com.br';
const SIP_PROXY = process.env.SIP_PROXY || 'sbc-ac-access.voicemanager.cloud';
const SIP_PORT = process.env.SIP_PORT || 5061;

// Gerador de Call-ID único e sequencial para chamadas
function generateCallId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '@' + getLocalIP();
}

function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const devName in interfaces) {
        const iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            const alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
                return alias.address;
        }
    }
    return '127.0.0.1';
}

function calculateResponse(authParams, method, uri, user, password) {
    const crypto = require('crypto');
    const ha1 = crypto.createHash('md5').update(`${user}:${authParams.realm}:${password}`).digest('hex');
    const ha2 = crypto.createHash('md5').update(`${method}:${uri}`).digest('hex');
    return crypto.createHash('md5').update(`${ha1}:${authParams.nonce}:${ha2}`).digest('hex');
}

function parseAuthenticateHeader(wwwAuthenticate) {
    let params = {};
    if (Array.isArray(wwwAuthenticate)) {
        params = { ...wwwAuthenticate[0] };
        for (let k in params) {
            if (typeof params[k] === 'string') {
                params[k] = params[k].replace(/^"|"$/g, ''); // Remove aspas
            }
        }
    } else {
        const parts = wwwAuthenticate.split(' ')[1].split(',');
        parts.forEach(p => {
            const [key, value] = p.trim().split('=');
            params[key] = value.replace(/"/g, '');
        });
    }
    return params;
}


// Inicia o transporte SIP Globalmente (apenas uma vez)
try {
    sip.start({
        udp: false, // ISP geralmente bloqueia 5060.
        tcp: false,
        tls_port: 5077, // Porta livre local para escuta TLS (evita conflito 5061)
        tls: { rejectUnauthorized: false }, // Ignora erro de certificado self-signed
        logger: {
            send: (m) => console.log('>> send', m.method || m.status),
            recv: (m) => {
                console.log('<< recv', m.method || m.status, m.reason || '');
                if (m.status === 200 && m.headers.cseq.method === 'INVITE') {
                    console.log('--- 200 OK INVITE HEADERS ---', JSON.stringify(m.headers));
                    console.log('--- 200 OK INVITE BODY ---', m.content);
                }
            }
        }
    }, (req) => {
        console.log("Recebido pacote SIP via engine: ", req.method || req.status);
    });
} catch (e) {
    console.warn("Aviso: Engine SIP já está iniciada ou porta ocupada.", e.message);
}

app.post('/api/test-call', async (req, res) => {
    const { destino } = req.body;
    if (!destino) return res.status(400).json({ error: 'Número de destino (destino) obrigatório.' });

    const inviteURI = `sip:${destino}@${SIP_DOMAIN}`;

    // Etapa 1: Enviar REGISTER para se "logar" temporariamente na rede SBC antes de discar
    let reqReg = {
        method: 'REGISTER',
        uri: `sip:${SIP_DOMAIN}`,
        headers: {
            to: { uri: `sip:${SIP_USER}@${SIP_DOMAIN}` },
            from: { uri: `sip:${SIP_USER}@${SIP_DOMAIN}`, params: { tag: Math.random().toString(36).substring(2) } },
            'call-id': generateCallId(),
            cseq: { method: 'REGISTER', seq: 1 },
            contact: [{ uri: `sip:${SIP_USER}@${getLocalIP()}:5077;transport=tls`, params: { expires: 60 } }],
            route: [{ uri: `sip:${SIP_PROXY}:${SIP_PORT};transport=tls;lr` }],
            'max-forwards': 70,
            'user-agent': 'MicroSIP/3.21.3',
            via: []
        }
    };

    let isCompleted = false;
    let callStatus = 'failed';

    console.log(`Disparando REGISTER request para: ${SIP_USER}@${SIP_DOMAIN} através de ${SIP_PROXY}...`);

    sip.send(reqReg, function (rsReg) {
        if (rsReg.status === 401 || rsReg.status === 407) {
            // Re-enviar REGISTER autenticado
            const authHeader = rsReg.headers['proxy-authenticate'] || rsReg.headers['www-authenticate'];
            const authParams = parseAuthenticateHeader(authHeader);
            const responseHash = calculateResponse(authParams, 'REGISTER', `sip:${SIP_DOMAIN}`, SIP_USER, SIP_PASS);

            reqReg.headers.cseq.seq++;
            reqReg.headers.authorization = `Digest username="${SIP_USER}", realm="${authParams.realm}", nonce="${authParams.nonce}", uri="sip:${SIP_DOMAIN}", response="${responseHash}"`;

            sip.send(reqReg, (rsAuthReg) => {
                if (rsAuthReg.status >= 300) {
                    console.log("Falha na autenticação do REGISTER", rsAuthReg.status);
                    if (!isCompleted) { isCompleted = true; res.json({ status: 'failed', reason: `REG: ${rsAuthReg.status} ${rsAuthReg.reason}` }); }
                    return;
                }
                // REGISTRO BEM SUCEDIDO. Discar agora!
                enviarInvite();
            })
        } else if (rsReg.status >= 200 && rsReg.status < 300) {
            enviarInvite(); // Registrou sem pedir autenticação de gateway (raro)
        } else if (rsReg.status >= 300) {
            if (!isCompleted) { isCompleted = true; res.json({ status: 'failed', reason: `REG: ${rsReg.status} ${rsReg.reason}` }); }
        }
    });

    function startSIPCallFlow() {
        // Fluxo: REGISTER -> INVITE
        let cseqRegister = 1;
        let cseqInvite = 1;
        const callIdReg = generateCallId();
        const callIdInv = generateCallId();
        const fromTag = Math.random().toString(36).substring(2);

        const baseContact = `sip:${SIP_USER}@${getLocalIP()}:5077;transport=tls`;

        let reqRegister = {
            method: 'REGISTER',
            uri: `sip:${SIP_DOMAIN}`,
            headers: {
                to: { uri: `sip:${SIP_USER}@${SIP_DOMAIN}` },
                from: { uri: `sip:${SIP_USER}@${SIP_DOMAIN}`, params: { tag: fromTag } },
                'call-id': callIdReg,
                cseq: { method: 'REGISTER', seq: cseqRegister },
                contact: [{ uri: baseContact, params: { expires: 600 } }],
                route: [{ uri: `sip:${SIP_PROXY}:${SIP_PORT};transport=tls;lr` }],
                'max-forwards': 70,
                'user-agent': 'MicroSIP/3.21.3',
                'content-length': 0,
                via: []
            }
        };

        const dummySdp =
            "v=0\r\n" +
            `o=MicroSIP 12345 12345 IN IP4 ${getLocalIP()}\r\n` +
            "s=Session\r\n" +
            `c=IN IP4 ${getLocalIP()}\r\n` +
            "t=0 0\r\n" +
            "m=audio 4000 RTP/AVP 8 0 101\r\n" +
            "a=rtpmap:8 PCMA/8000\r\n" +
            "a=rtpmap:0 PCMU/8000\r\n" +
            "a=rtpmap:101 telephone-event/8000\r\n" +
            "a=sendrecv\r\n";

        // 1. Enviar REGISTER
        console.log('[SIP] Enviando REGISTER inicial...');
        sip.send(reqRegister, (rsReg) => {
            if (rsReg.status === 401 || rsReg.status === 407) {
                // Autenticar Register
                const authHeader = rsReg.headers['proxy-authenticate'] || rsReg.headers['www-authenticate'];
                const authParams = parseAuthenticateHeader(authHeader);
                const responseHash = calculateResponse(authParams, 'REGISTER', reqRegister.uri, SIP_USER, SIP_PASS);

                reqRegister.headers.cseq.seq++;
                reqRegister.headers.authorization = `Digest username="${SIP_USER}", realm="${authParams.realm}", nonce="${authParams.nonce}", uri="${reqRegister.uri}", response="${responseHash}"`;

                console.log('[SIP] Re-enviando REGISTER com Auth...');
                sip.send(reqRegister, (rsRegAuth) => {
                    if (rsRegAuth.status >= 200 && rsRegAuth.status < 300) {
                        console.log('[SIP] Registrado com Sucesso! Preparando INVITE...');
                        enviarInviteAutenticado();
                    } else {
                        return finalizarErro(`Falha de Registro: ${rsRegAuth.status}`);
                    }
                });
            } else if (rsReg.status >= 200 && rsReg.status < 300) {
                console.log('[SIP] Registrado com Sucesso sem Auth! Preparando INVITE...');
                enviarInviteAutenticado();
            } else {
                return finalizarErro(`Falha de Registro Absoluta: ${rsReg.status}`);
            }
        });

        // 2. Enviar INVITE
        function enviarInviteAutenticado() {
            let reqInvite = {
                method: 'INVITE',
                uri: inviteURI,
                headers: {
                    to: { uri: inviteURI },
                    from: { uri: `sip:${SIP_USER}@${SIP_DOMAIN}`, params: { tag: fromTag } },
                    'call-id': callIdInv,
                    cseq: { method: 'INVITE', seq: cseqInvite },
                    contact: [{ uri: baseContact }],
                    route: [{ uri: `sip:${SIP_PROXY}:${SIP_PORT};transport=tls;lr` }],
                    'max-forwards': 70,
                    'user-agent': 'MicroSIP/3.21.3',
                    'content-type': 'application/sdp',
                    via: []
                },
                content: dummySdp
            };

            console.log(`[SIP] Disparando Chamada (INVITE) para: ${destino}...`);
            sip.send(reqInvite, (rsInv) => {
                handleInviteResponse(reqInvite, rsInv);
            });
        }

        function handleInviteResponse(reqInvite, rs) {
            console.log(`[SIP] Retorno INVITE: ${rs.status} ${rs.reason}`);

            if (rs.status === 401 || rs.status === 407) {
                const authHeader = rs.headers['proxy-authenticate'] || rs.headers['www-authenticate'];
                const authParams = parseAuthenticateHeader(authHeader);
                const responseHash = calculateResponse(authParams, 'INVITE', inviteURI, SIP_USER, SIP_PASS);

                reqInvite.headers.cseq.seq++;
                reqInvite.headers.authorization = `Digest username="${SIP_USER}", realm="${authParams.realm}", nonce="${authParams.nonce}", uri="${inviteURI}", response="${responseHash}"`;

                console.log('[SIP] Re-enviando INVITE com Autenticação...');
                sip.send(reqInvite, (rsInvAuth) => {
                    handleFinalInviteStatus(reqInvite, rsInvAuth);
                });
            } else {
                handleFinalInviteStatus(reqInvite, rs);
            }
        }

        function handleFinalInviteStatus(reqInvite, rs) {
            console.log(`[SIP] Retorno Status Final: ${rs.status}`);
            if (rs.status >= 300) {
                return finalizarErro(`${rs.status} ${rs.reason}`);
            }
            else if (rs.status < 200) {
                // Informational (100 Trying, 180 Ringing)
                console.log(`Chamada Progresso / Tocando: ${rs.status}`);
                // Não marcamos como "atendido" aqui, apenas observamos. Se não atender em 30s cai no timeout.
            }
            else if (rs.status >= 200 && rs.status < 300) {
                // 200 OK -> Chamada Atendida (Real ou IVR Falsa)
                console.log('[SIP] Chamada 200 OK! Fechando fluxo de aúdio (ACK)...');

                sip.send({
                    method: 'ACK',
                    uri: rs.headers.contact ? rs.headers.contact[0].uri : inviteURI,
                    headers: {
                        to: rs.headers.to,
                        from: rs.headers.from,
                        'call-id': rs.headers['call-id'],
                        cseq: { method: 'ACK', seq: reqInvite.headers.cseq.seq }
                    }
                });

                // Toca a música da caixa ou desliga depois de 10s
                setTimeout(() => {
                    sip.send({
                        method: 'BYE',
                        uri: rs.headers.contact ? rs.headers.contact[0].uri : inviteURI,
                        headers: {
                            to: rs.headers.to,
                            from: rs.headers.from,
                            'call-id': rs.headers['call-id'],
                            cseq: { method: 'BYE', seq: reqInvite.headers.cseq.seq + 1 }
                        }
                    });

                    if (!isCompleted) {
                        isCompleted = true;
                        res.json({ status: 'answered', duration: 10 });
                    }
                }, 10000);
            }
        }

        function finalizarErro(motivo) {
            if (!isCompleted) {
                isCompleted = true;
                console.log(`[ERRO] ${motivo}`);
                res.json({ status: 'failed', reason: motivo });
            }
        }
    }

    startSIPCallFlow();

    // Timeout Global
    setTimeout(() => {
        if (!isCompleted) {
            isCompleted = true;
            res.json({ status: 'busy', reason: 'Timeout. Ninguém atendeu a ligação na ponta.' });
        }
    }, 25000);
});

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`SIP Tester API Engine rodando na porta ${PORT}`);
    console.log(`SIP_PROXY Configurado: ${SIP_PROXY}:${SIP_PORT}`);
});
