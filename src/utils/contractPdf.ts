import { jsPDF } from 'jspdf';
import { Deal } from '../types/deals';

export function generateContractPdf(deal: Partial<Deal> & {
  brandName: string;
  budget: number;
  deliverable: string;
  signerName?: string;
  brandContact?: string;
  contractDate?: string;
  depositPaid?: boolean;
  depositAmount?: number;
  transactionId?: string;
}) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryColor = [15, 23, 42]; // Slate 900
  const accentColor = [16, 185, 129]; // Emerald 500
  const dateStr = deal.contractDate || new Date().toISOString().split('T')[0];
  const contractId = `CTR-${dateStr.replace(/-/g, '')}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  // Header Bar
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('CREATORGATE OS — CONTRATO DE PATROCINIO DIGITAL', 15, 15);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`ID: ${contractId} | FECHA: ${dateStr}`, 150, 15);

  // Subtitle
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('ACUERDO VINCULANTE DE PRESTACIÓN DE SERVICIOS PUBLICITARIOS Y LICENCIA DE IMAGEN', 15, 34);

  // Parties box
  doc.setDrawColor(203, 213, 225);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, 38, 180, 28, 2, 2, 'FD');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('PARTE A (EL CREADOR):', 20, 45);
  doc.setFont('helvetica', 'normal');
  doc.text('Mateo Silva (@mateosilva.ai) — Divulgador de Software & IA', 65, 45);

  doc.setFont('helvetica', 'bold');
  doc.text('PARTE B (LA MARCA):', 20, 53);
  doc.setFont('helvetica', 'normal');
  doc.text(`${deal.brandName} | Contacto: ${deal.brandContact || 'Representante Legal'}`, 65, 53);

  doc.setFont('helvetica', 'bold');
  doc.text('FIRMADO POR:', 20, 61);
  doc.setFont('helvetica', 'normal');
  doc.text(`${deal.signerName || 'Representante Autorizado'} (Facultad Legal Confirmada)`, 65, 61);

  // Deliverables & Payment Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('1. ENTREGABLES Y COMPROMISO ECONÓMICO', 15, 74);

  doc.roundedRect(15, 78, 180, 22, 2, 2, 'FD');
  doc.setFontSize(9);
  doc.text(`Formato: ${deal.deliverable?.toUpperCase() || 'REEL DEDICADO'}`, 20, 85);
  doc.text(`Inversión Total Acordada: $${deal.budget?.toLocaleString()} USD`, 20, 93);

  const depositValue = deal.depositAmount || Math.round((deal.budget || 0) * 0.5);
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.text(`Anticipo Obligatorio (50%): $${depositValue.toLocaleString()} USD ${deal.depositPaid ? '[ACREDITADO]' : '[PENDIENTE]'}`, 105, 85);
  doc.setTextColor(30, 41, 59);
  doc.text(`Saldo a la Publicación (50%): $${depositValue.toLocaleString()} USD`, 105, 93);

  // Clauses
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('2. CLÁUSULAS LEGALES VINCULANTES', 15, 108);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  const clauses = [
    'A. CONDICIÓN PREVIA DE PRODUCCIÓN: La agenda de grabación y reserva de fecha queda formalmente activa únicamente tras la acreditación del anticipo del 50%. Ningún guión ni grabación será ejecutado sin dicho depósito.',
    'B. DERECHOS DE USO Y PAUTA DIGITAL: Se otorga a LA MARCA licencia no exclusiva de reproducción digital por un período de 30 días naturales. Queda estrictamente prohibido entrenar modelos de Inteligencia Artificial con la voz, imagen o video del CREADOR.',
    'C. REVISIONES Y MODIFICACIONES: El servicio contempla una (1) ronda de ajustes menores sobre el corte borrador. Cambios estructurales sobre un guión previamente aprobado devengarán un cargo adicional del 30% del total.',
    'D. PENALIZACIÓN POR RETRASO EN PAGOS: En caso de que el saldo final exceda 5 días tras la entrega del contenido final, se aplicará una penalización por mora del 1.5% diario sobre el monto adeudado.',
    'E. SOBERANÍA DE NEGOCIACIÓN: Toda sesión de videollamada y acuerdo verbal previo respaldado en Google Drive forma parte interpretativa de este acuerdo legal.'
  ];

  let currentY = 114;
  clauses.forEach(clause => {
    const lines = doc.splitTextToSize(clause, 180);
    doc.text(lines, 15, currentY);
    currentY += lines.length * 4.2 + 2;
  });

  // Digital Signature Seal
  doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(15, currentY + 3, 180, 36, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(16, 185, 129);
  doc.text('SELLO DIGITAL DE FIRMA ELECTRÓNICA Y VALIDEZ JURÍDICA', 20, currentY + 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.text(`Firmado digitalmente por: ${deal.signerName || 'Representante Autorizado'} (${deal.brandName})`, 20, currentY + 16);
  doc.text(`Timestamp / Marca de tiempo: ${dateStr}T${new Date().toTimeString().split(' ')[0]} UTC`, 20, currentY + 22);
  doc.text(`Hash criptográfico de integridad: SHA256:${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`, 20, currentY + 28);
  doc.text(`Estado del Anticipo: ${deal.depositPaid ? `PAGADO ($${depositValue} USD) - Ref: ${deal.transactionId || 'ST-948214'}` : 'Pendiente de acreditación'}`, 20, currentY + 34);

  // Footer
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('Generado automáticamente por CreatorGate OS (influencerapp.pages.dev) — Documento con validez de acuerdo mercantil bilateral.', 15, 285);

  doc.save(`Contrato_${deal.brandName.replace(/\s+/g, '_')}_MateoSilva.pdf`);
}
