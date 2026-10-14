import React, { useState } from 'react';
import { Mail, Flame, Scale, ShieldAlert, Sparkles, Check, Send } from 'lucide-react';
import { EmailMessage, EmailCategory, QuickActionType } from '../../types/gmail';

interface GmailInboxProps {
  emails: EmailMessage[];
  isConnected: boolean;
  connectedAccount: string;
  onExecuteAction: (emailId: string, action: QuickActionType) => void;
  onConnectClick: () => void;
}

export const GmailInbox: React.FC<GmailInboxProps> = ({
  emails,
  isConnected,
  connectedAccount,
  onExecuteAction,
  onConnectClick,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<EmailCategory | 'all'>('all');
  const [activeEmailId, setActiveEmailId] = useState<string>(emails[0]?.id || '');

  const filtered = selectedCategory === 'all' 
    ? emails 
    : emails.filter(e => e.category === selectedCategory);

  const activeEmail = emails.find(e => e.id === activeEmailId) || filtered[0];

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[620px]">
      {/* Left List */}
      <div className="w-full md:w-5/12 border-r border-slate-800 flex flex-col h-full">
        {/* Header */}
        <div className="p-4 bg-[#0E1526] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-rose-400" />
            <div>
              <h3 className="font-bold text-white text-xs">Copiloto Gmail</h3>
              <p className="text-[11px] text-slate-400 font-mono truncate max-w-[180px]">{connectedAccount}</p>
            </div>
          </div>

          <button
            onClick={onConnectClick}
            className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 font-medium"
          >
            {isConnected ? 'Cuenta Vinculada' : 'Conectar Gmail'}
          </button>
        </div>

        {/* Filter Pills */}
        <div className="p-2 bg-[#090D16] border-b border-slate-800 flex gap-1 overflow-x-auto text-[11px]">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 rounded-md font-semibold ${selectedCategory === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Todos ({emails.length})
          </button>
          <button
            onClick={() => setSelectedCategory('priority_deal')}
            className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1 ${selectedCategory === 'priority_deal' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            <Flame className="w-3 h-3 text-amber-400" /> Tratos Top
          </button>
          <button
            onClick={() => setSelectedCategory('contract_pending')}
            className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1 ${selectedCategory === 'contract_pending' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            <Scale className="w-3 h-3 text-indigo-400" /> Contratos
          </button>
          <button
            onClick={() => setSelectedCategory('spam_curious')}
            className={`px-2.5 py-1 rounded-md font-semibold flex items-center gap-1 ${selectedCategory === 'spam_curious' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            <ShieldAlert className="w-3 h-3 text-rose-400" /> Curiosos
          </button>
        </div>

        {/* Email list */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/80">
          {filtered.map(email => (
            <div
              key={email.id}
              onClick={() => setActiveEmailId(email.id)}
              className={`p-3.5 cursor-pointer transition-all ${activeEmail?.id === email.id ? 'bg-[#1A2337] border-l-4 border-indigo-500' : 'hover:bg-slate-800/50'}`}
            >
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-bold text-white truncate max-w-[160px]">{email.fromName}</span>
                <span className="text-slate-400">{email.date}</span>
              </div>
              <h4 className="text-xs font-semibold text-slate-200 truncate mb-1">{email.subject}</h4>
              <p className="text-[11px] text-slate-400 line-clamp-1 mb-2">{email.snippet}</p>

              <div className="flex items-center justify-between text-[10px]">
                {email.extractedBudget ? (
                  <span className="text-emerald-400 font-extrabold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    ${email.extractedBudget.toLocaleString()} USD
                  </span>
                ) : (
                  <span className="text-rose-400 font-medium">Sin presupuesto / Canje</span>
                )}

                {email.status === 'action_taken' ? (
                  <span className="text-emerald-400 flex items-center gap-0.5">
                    <Check className="w-3 h-3" /> Respondido
                  </span>
                ) : (
                  <span className="text-amber-400 flex items-center gap-0.5">
                    <Sparkles className="w-3 h-3" /> IA Resumen listo
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Detail Pane */}
      <div className="flex-1 flex flex-col h-full bg-[#0E1526]">
        {activeEmail ? (
          <div className="p-6 flex flex-col h-full overflow-y-auto">
            {/* AI Summary Banner */}
            <div className="bg-gradient-to-r from-indigo-950/80 to-slate-900 border border-indigo-500/30 rounded-xl p-4 mb-5 shadow-lg">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs mb-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                Resumen Ejecutivo por Asistente de IA:
              </div>
              <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-medium">
                {activeEmail.aiSummary}
              </p>
            </div>

            {/* Email Header */}
            <div className="pb-4 border-b border-slate-800 mb-4">
              <h2 className="text-base font-bold text-white mb-2">{activeEmail.subject}</h2>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>De: <strong className="text-slate-200">{activeEmail.fromName}</strong> ({activeEmail.from})</span>
                <span>{activeEmail.date}</span>
              </div>
            </div>

            {/* Email Body */}
            <div className="flex-1 text-xs md:text-sm text-slate-300 whitespace-pre-line leading-relaxed mb-6 font-sans">
              {activeEmail.body}
            </div>

            {/* 1-Click Action Bar */}
            <div className="bg-[#111827] border border-slate-800 p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 mt-auto">
              <div className="text-xs text-slate-400">
                Acción recomendada: <strong className="text-white">Respuesta en 1 Clic</strong>
              </div>

              <div className="flex gap-2">
                {activeEmail.category === 'priority_deal' && (
                  <button
                    onClick={() => onExecuteAction(activeEmail.id, 'accept_meeting')}
                    disabled={activeEmail.status === 'action_taken'}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-110 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/30"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {activeEmail.status === 'action_taken' ? 'Reunión Agendada' : 'Aceptar Reunión Mañana 10:00 AM'}
                  </button>
                )}

                {activeEmail.category === 'contract_pending' && (
                  <button
                    onClick={() => onExecuteAction(activeEmail.id, 'sign_contract')}
                    disabled={activeEmail.status === 'action_taken'}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center gap-2"
                  >
                    <Scale className="w-3.5 h-3.5" />
                    {activeEmail.status === 'action_taken' ? 'Contrato Devuelto Firmado' : 'Aprobar y Devolver Firmado'}
                  </button>
                )}

                {activeEmail.category === 'spam_curious' && (
                  <button
                    onClick={() => onExecuteAction(activeEmail.id, 'reject_budget')}
                    disabled={activeEmail.status === 'action_taken'}
                    className="px-4 py-2 bg-rose-600/80 hover:bg-rose-600 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center gap-2"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    {activeEmail.status === 'action_taken' ? 'Canje Rechazado' : 'Rechazar Educadamente por Política'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-xs text-slate-400">
            Selecciona un correo para ver el resumen de IA
          </div>
        )}
      </div>
    </div>
  );
};
