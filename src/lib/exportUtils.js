import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Utilitário genérico para exportar dados iteráveis em tabela para PDF.
 * @param {string} title Título a ser exibido no cabeçalho do PDF.
 * @param {Array<string>} head Array de strings com os títulos das colunas.
 * @param {Array<Array<any>>} body Array de arrays contento os dados das linhas em ordem respectiva às colunas.
 * @param {string} filename Nome do arquivo gerado (padrão: export.pdf).
 * @param {object} options Opções suplementares customizadas para jspdf-autotable.
 */
export const exportToPDF = (title, head, body, filename = 'export.pdf', options = {}) => {
    const doc = new jsPDF();

    // Configurações do Título
    doc.setFontSize(16);
    doc.text(title, 14, 15);

    // Geração da Tabela
    autoTable(doc, {
        startY: 20,
        head: [head],
        body: body,
        theme: 'striped',
        styles: { fontSize: 9 },
        headStyles: { fillColor: [37, 99, 235] }, // Tailwind blue-600 RGB
        ...options
    });

    doc.save(filename);
};
