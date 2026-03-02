const sip = require('sip');
const crypto = require('crypto');

function calculateResponse(authParams, method, uri, user, password) {
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
                params[k] = params[k].replace(/^"|"$/g, '');
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

sip.start({
    udp: false,
    tcp: false,
    tls_port: 5077
});

const destino = '31972587500';
const sipProxy = 'sbc-ac-access.voicemanager.cloud';
const sipDomain = 'fiemg.com.br';

let req = {
    method: 'INVITE',
    uri: `sip:${destino}@${sipDomain}`,
    headers: {
        to: { uri: `sip:${destino}@${sipDomain}` },
        from: { uri: `sip:3192411884@${sipDomain}`, params: { tag: 't123' } },
        'call-id': 'test' + Math.random(),
        cseq: { method: 'INVITE', seq: 1 },
        contact: [{ uri: 'sip:3192411884@192.168.0.6:5077;transport=tls' }],
        route: [{ uri: `sip:${sipProxy}:5061;transport=tls;lr` }],
        'max-forwards': 70,
        'user-agent': 'MicroSIP/3.21.3',
        'content-type': 'application/sdp',
        via: []
    },
    content: "v=0\r\no=- 0 0 IN IP4 192.168.0.6\r\ns=-\r\nc=IN IP4 192.168.0.6\r\nt=0 0\r\nm=audio 4000 RTP/AVP 8 0 101\r\na=rtpmap:8 PCMA/8000\r\na=rtpmap:0 PCMU/8000\r\na=rtpmap:101 telephone-event/8000\r\na=sendrecv\r\n"
};

sip.send(req, (rs) => {
    console.log('[SIP] STATUS:', rs.status, rs.reason);

    if (rs.status === 401 || rs.status === 407) {
        const ah = rs.headers['proxy-authenticate'] || rs.headers['www-authenticate'];
        const ap = parseAuthenticateHeader(ah);
        const hash = calculateResponse(ap, 'INVITE', req.uri, '3192411884', 'R3m@t0839');

        req.headers.cseq.seq++;
        req.headers.authorization = `Digest username="3192411884", realm="${ap.realm}", nonce="${ap.nonce}", uri="${req.uri}", response="${hash}"`;

        sip.send(req, (rsAuth) => {
            console.log('[SIP AUTH] STATUS:', rsAuth.status, rsAuth.reason);
            if (rsAuth.status < 200) {
                console.log('[SIP AUTH] In Progress...', rsAuth.status);
            } else {
                console.log('[SIP AUTH] FINAL STATUS:', rsAuth.status, rsAuth.reason);
                console.log(rsAuth.headers);
                process.exit(0);
            }
        });
    } else if (rs.status < 200) {
        console.log('[SIP] In Progress (No auth)...', rs.status);
    } else {
        console.log('[SIP] FINAL STATUS:', rs.status, rs.reason);
        console.log(rs.headers);
        process.exit(0);
    }
});

setTimeout(() => {
    console.log("Timeout reached.");
    process.exit(1);
}, 15000);
