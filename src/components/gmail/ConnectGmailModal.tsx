import React, { useState } from 'react';
import { X, Check, ShieldCheck, Mail } from 'lucide-react';

interface ConnectGmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentEmail: string;
  onConnect: (email: string) => void;
}

export const ConnectGmailModal: React.FC<ConnectGmailModalProps> = ({
  isOpen,
  onClose,
  currentEmail,
  onConnect,
}) => {
  const [emailInput, setEmailInput] = useState(currentEmail);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    onConnect(emailInput.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#111827] border border-slate-700/80 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Vincular Cuenta de Gmail</h3>
            <p className="text-xs text-slate-400">Copiloto de Patrocinios con IA</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Al vincular tu cuenta de Google Workspace o Gmail personal, el Asistente IA filtrará automáticamente los correos de marcas, calculará presupuestos y te permitirá responder en 1 clic.
        </p>

        {/* Scopes */}
        <div className="bg-[#090D16] border border-slate-800 rounded-xl p-3 text-xs text-slate-300 space-y-2 mb-5">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" /> Permisos Seguros Autorizados:
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-300">
            <Check className="w-3.5 h-3.5 text-emerald-400" /> Lectura de propuestas entrantes de patrocinios
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-300">
            <Check className="w-3.5 h-3.5 text-emerald-400" /> Envío de respuestas y confirmación de agenda
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-300">
            <Check className="w-3.5 h-3.5 text-emerald-400" /> Resguardo automático en Google Drive
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Dirección de Correo de Gmail
            </label>
            <input
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full bg-[#1F2937] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
          >
            Confirmar y Conectar Cuenta
          </button>
        </form>
      </div>
    </div>
  );
};
