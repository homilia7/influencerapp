import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, PenTool, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DeliverableType } from '../../types/deals';

interface ContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandName: string;
  budget: number;
  deliverable: DeliverableType;
  objective: string;
  onContractSigned: (signedData: { brandContact: string; brandName: string }) => void;
}

export const ContractModal: React.FC<ContractModalProps> = ({
  isOpen,
  onClose,
  brandName: initialBrandName,
  budget,
  deliverable,
  onContractSigned,
}) => {
  const [brandName, setBrandName] = useState(initialBrandName || 'TechBrand Global');
  const [signerName, setSignerName] = useState('');
  const [signerEmail, setSignerEmail] = useState('');
  const [acceptedTC, setAcceptedTC] = useState(false);
  const [signatureText, setSignatureText] = useState('');

  if (!isOpen) return null;

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTC || !signerName.trim() || !signerEmail.trim()) return;

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    onContractSigned({
      brandName: brandName.trim(),
      brandContact: signerEmail.trim()
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#111827] border border-slate-700/80 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4 text-emerald-400">
          <ShieldCheck className="w-6 h-6" />
          <h2 className="text-lg font-bold text-white">Acuerdo Preliminar y Firma de Términos</h2>
        </div>

        {/* Campaign Summary */}
        <div className="bg-[#0E1526] p-4 rounded-xl border border-slate-800 mb-4 grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-slate-400">Entregable:</span>
            <p className="font-bold text-white uppercase">{deliverable}</p>
          </div>
          <div>
            <span className="text-slate-400">Tarifa Acordada:</span>
            <p className="font-bold text-emerald-400 text-sm">${budget.toLocaleString()} USD</p>
          </div>
        </div>

        {/* Legal Terms Scrollbox */}
        <div className="bg-[#090D16] border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 space-y-2 mb-4 max-h-40 overflow-y-auto font-mono">
          <p className="font-bold text-slate-100 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-indigo-400" /> CLÁUSULAS COMERCIALES VINCULANTES:
          </p>
          <p>1. <strong>Pago y Anticipo:</strong> 50% requerido a la aprobación del guión y 50% previo a la publicación del contenido.</p>
          <p>2. <strong>Derechos de Uso:</strong> La marca obtiene licencia de uso digital por 30 días continuos. El contenido no podrá ser modificado por IA.</p>
          <p>3. <strong>Revisiones:</strong> Incluye hasta una (1) ronda de ajustes menores. Cambios de guión completo conllevan tarifa adicional del 30%.</p>
          <p>4. <strong>Protección de Imagen:</strong> El creador mantiene los derechos morales sobre su marca personal y canal.</p>
        </div>

        {/* Form & Signature */}
        <form onSubmit={handleSign} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Nombre de la Empresa</label>
              <input
                type="text"
                required
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full bg-[#1F2937] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Representante Legal / Contacto</label>
              <input
                type="text"
                required
                placeholder="Ej. Ana Martínez"
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
                className="w-full bg-[#1F2937] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Correo Corporativo</label>
            <input
              type="email"
              required
              placeholder="contacto@empresa.com"
              value={signerEmail}
              onChange={(e) => setSignerEmail(e.target.value)}
              className="w-full bg-[#1F2937] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <PenTool className="w-3.5 h-3.5 text-indigo-400" /> Firma Electrónica (Escribe tu nombre completo como firma)
            </label>
            <input
              type="text"
              required
              placeholder="Firma autorizada (Nombre y Apellidos)"
              value={signatureText}
              onChange={(e) => setSignatureText(e.target.value)}
              className="w-full font-serif italic text-sm tracking-wide bg-[#1F2937] border border-indigo-500/50 rounded-lg px-3 py-2.5 text-indigo-200 focus:outline-none"
            />
          </div>

          <label className="flex items-start gap-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              required
              checked={acceptedTC}
              onChange={(e) => setAcceptedTC(e.target.checked)}
              className="mt-0.5 rounded border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span className="text-[11px] text-slate-300 leading-tight">
              Acepto los Términos y Condiciones y confirmo tener facultades para comprometer a la empresa en esta colaboración.
            </span>
          </label>

          <button
            type="submit"
            disabled={!acceptedTC || !signerName || !signatureText}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-xs rounded-xl hover:brightness-110 shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 disabled:opacity-50 transition-all mt-2"
          >
            <CheckCircle className="w-4 h-4" /> Firmar Acuerdo y Confirmar Reserva de Campaña
          </button>
        </form>
      </div>
    </div>
  );
};
