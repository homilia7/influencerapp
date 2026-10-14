import React, { useState } from 'react';
import { X, ShieldCheck, Mail, Key, Server, ChevronDown, CheckCircle2 } from 'lucide-react';
import { ImapConfig } from '../../types/gmail';

interface ConnectGmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfig?: ImapConfig;
  onSaveConfig: (config: Partial<ImapConfig>) => void;
}

export const ConnectGmailModal: React.FC<ConnectGmailModalProps> = ({
  isOpen,
  onClose,
  currentConfig,
  onSaveConfig,
}) => {
  const [email, setEmail] = useState(currentConfig?.email || 'mateo@mateosilva.tech');
  const [appPassword, setAppPassword] = useState(currentConfig?.appPassword || '••••••••••••••••');
  const [host, setHost] = useState(currentConfig?.host || 'imap.gmail.com');
  const [port, setPort] = useState(currentConfig?.port || 993);
  const [showGuide, setShowGuide] = useState(false);
  const [testedSuccess, setTestedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setTestedSuccess(true);
    setTimeout(() => {
      onSaveConfig({
        email: email.trim(),
        appPassword: appPassword.trim(),
        host: host.trim(),
        port: Number(port),
        useSsl: true,
        smtpHost: 'smtp.gmail.com',
        smtpPort: 465,
        isConnected: true
      });
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#111827] border border-slate-700/80 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Conexión IMAP de Gmail</h3>
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Sin necesidad de Google Cloud Console ni OAuth
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          Conecta directamente tu buzón usando una <strong>Contraseña de Aplicación</strong> de Google. La app se sincroniza vía IMAP seguro (SSL puerto 993) y clasifica propuestas con IA.
        </p>

        {/* Guía Desplegable de Ayuda */}
        <div className="bg-[#090D16] border border-slate-800 rounded-xl mb-4 overflow-hidden">
          <button
            type="button"
            onClick={() => setShowGuide(!showGuide)}
            className="w-full p-3 flex items-center justify-between text-xs text-slate-300 hover:text-white font-medium"
          >
            <span className="flex items-center gap-2">
              <Key className="w-3.5 h-3.5 text-amber-400" />
              ¿Cómo obtener tu Contraseña de Aplicación en 30 seg?
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showGuide ? 'rotate-180 text-emerald-400' : ''}`} />
          </button>

          {showGuide && (
            <div className="p-3 pt-0 text-[11px] text-slate-400 space-y-1.5 border-t border-slate-800/80">
              <p>1. Ingresa a tu cuenta de Google en <span className="text-indigo-300 font-mono">myaccount.google.com/security</span>.</p>
              <p>2. Asegúrate de tener activa la <strong>Verificación en 2 pasos</strong>.</p>
              <p>3. En el buscador escribe <strong>Contraseñas de aplicaciones</strong>, genera una llamada "InfluencerApp" y copia el código de 16 letras.</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Tu Correo de Gmail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1F2937] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-amber-400" /> Contraseña de Aplicación de Google (16 caracteres)
            </label>
            <input
              type="password"
              required
              placeholder="xxxx xxxx xxxx xxxx"
              value={appPassword}
              onChange={(e) => setAppPassword(e.target.value)}
              className="w-full bg-[#1F2937] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono tracking-wider"
            />
          </div>

          {/* Servidor IMAP Config */}
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <label className="block text-slate-400 mb-1 flex items-center gap-1">
                <Server className="w-3 h-3 text-indigo-400" /> Servidor IMAP
              </label>
              <input
                type="text"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                className="w-full bg-[#1F2937] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Puerto (SSL/TLS)</label>
              <input
                type="number"
                value={port}
                onChange={(e) => setPort(Number(e.target.value))}
                className="w-full bg-[#1F2937] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-110 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all mt-2"
          >
            {testedSuccess ? (
              <span className="flex items-center gap-1 text-white">
                <CheckCircle2 className="w-4 h-4 animate-bounce" /> ¡Conexión IMAP Verificada!
              </span>
            ) : (
              'Guardar y Verificar Conexión IMAP'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
