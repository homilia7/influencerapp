import React, { useState } from 'react';
import { Mail, Sparkles, Check, Send, ChevronDown, ArrowLeft, Scale, ShieldAlert, RefreshCw, Server } from 'lucide-react';
import { EmailMessage, EmailCategory, QuickActionType } from '../../types/gmail';

interface GmailInboxProps {
  emails: EmailMessage[];
  isConnected: boolean;
  connectedAccount: string;
  isSyncing?: boolean;
  lastSync?: string;
  onSyncClick?: () => void;
  onExecuteAction: (emailId: string, action: QuickActionType) => void;
  onConnectClick: () => void;
}

export const GmailInbox: React.FC<GmailInboxProps> = ({
  emails,
  isConnected,
  connectedAccount,
  isSyncing,
  lastSync,
  onSyncClick,
  onExecuteAction,
  onConnectClick,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<EmailCategory | 'all'>('all');
  const [activeEmailId, setActiveEmailId] = useState<string>(emails[0]?.id || '');
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');

  const filtered = selectedCategory === 'all' 
    ? emails 
    : emails.filter(e => e.category === selectedCategory);

  const activeEmail = emails.find(e => e.id === activeEmailId) || filtered[0];

  const handleSelectEmail = (id: string) => {
    setActiveEmailId(id);
    setMobileView('detail');
  };

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[580px] md:h-[620px]">
      {/* Panel Izquierdo: Lista de Correos */}
      <div className={`w-full md:w-5/12 border-r border-slate-800 flex flex-col ${mobileView === 'detail' ? 'hidden md:flex' : 'flex'}`}>
        {/* Header */}
        <div className="p-3.5 bg-[#0E1526] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-rose-400" />
            <div>
              <h3 className="font-bold text-white text-xs flex items-center gap-1.5">
                Copiloto IMAP
                <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded font-mono">
                  SSL:993
                </span>
              </h3>
              <p className="text-[10px] text-slate-400 font-mono truncate max-w-[130px] sm:max-w-[180px]">{connectedAccount}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {onSyncClick && (
              <button
                type="button"
                onClick={onSyncClick}
                disabled={isSyncing}
                title="Sincronizar buzón IMAP"
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-emerald-400' : ''}`} />
              </button>
            )}
            <button
              onClick={onConnectClick}
              className="text-[10px] bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 px-2 py-1 rounded-lg border border-indigo-500/30 font-medium flex items-center gap-1"
            >
              <Server className="w-3 h-3" /> Config IMAP
            </button>
          </div>
        </div>

        {/* Menú Desplegable de Categorías (Sin menú horizontal) */}
        <div className="p-2.5 bg-[#090D16] border-b border-slate-800">
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="w-full bg-[#1A2337] border border-slate-700 text-white rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:border-indigo-500 appearance-none pr-8 cursor-pointer"
            >
              <option value="all">📬 Ver Todos ({emails.length})</option>
              <option value="priority_deal">🔥 Tratos Top con Presupuesto</option>
              <option value="contract_pending">⚖️ Contratos y T&C Pendientes</option>
              <option value="spam_curious">🚫 Curiosos y Canjes Rechazados</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Lista de Correos */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/80">
          {filtered.map(email => (
            <div
              key={email.id}
              onClick={() => handleSelectEmail(email.id)}
              className={`p-3.5 cursor-pointer transition-all ${activeEmail?.id === email.id ? 'bg-[#1A2337] border-l-4 border-indigo-500' : 'hover:bg-slate-800/50'}`}
            >
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-bold text-white truncate max-w-[160px]">{email.fromName}</span>
                <span className="text-slate-400 text-[10px]">{email.date}</span>
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
                  <span className="text-emerald-400 flex items-center gap-0.5 font-medium">
                    <Check className="w-3 h-3" /> Respondido
                  </span>
                ) : (
                  <span className="text-amber-400 flex items-center gap-0.5 font-medium">
                    <Sparkles className="w-3 h-3" /> IA Resumen
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Panel Derecho: Detalle y Acciones */}
      <div className={`flex-1 flex flex-col bg-[#0E1526] ${mobileView === 'list' ? 'hidden md:flex' : 'flex'}`}>
        {activeEmail ? (
          <div className="p-4 sm:p-6 flex flex-col h-full overflow-y-auto">
            {/* Botón Volver en Móvil */}
            <div className="md:hidden mb-3">
              <button
                type="button"
                onClick={() => setMobileView('list')}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 font-semibold bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Volver a lista de correos
              </button>
            </div>

            {/* Banner de IA */}
            <div className="bg-gradient-to-r from-indigo-950/80 to-slate-900 border border-indigo-500/30 rounded-xl p-3.5 sm:p-4 mb-4 shadow-lg">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs mb-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                Resumen Ejecutivo por Asistente de IA:
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {activeEmail.aiSummary}
              </p>
            </div>

            {/* Cabecera del correo */}
            <div className="pb-3 border-b border-slate-800 mb-4">
              <h2 className="text-sm sm:text-base font-bold text-white mb-1.5">{activeEmail.subject}</h2>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-1">
                <span>De: <strong className="text-slate-200">{activeEmail.fromName}</strong> ({activeEmail.from})</span>
                <span className="text-[11px]">{activeEmail.date}</span>
              </div>
            </div>

            {/* Cuerpo */}
            <div className="flex-1 text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed mb-6 font-sans">
              {activeEmail.body}
            </div>

            {/* Barra de Respuestas en 1 Clic */}
            <div className="bg-[#111827] border border-slate-800 p-3.5 sm:p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-auto">
              <div className="text-xs text-slate-400">
                Acción IA: <strong className="text-white">Respuesta en 1 Clic</strong>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                {activeEmail.category === 'priority_deal' && (
                  <button
                    onClick={() => onExecuteAction(activeEmail.id, 'accept_meeting')}
                    disabled={activeEmail.status === 'action_taken'}
                    className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-110 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {activeEmail.status === 'action_taken' ? 'Reunión Agendada' : 'Aceptar Reunión Mañana 10:00 AM'}
                  </button>
                )}

                {activeEmail.category === 'contract_pending' && (
                  <button
                    onClick={() => onExecuteAction(activeEmail.id, 'sign_contract')}
                    disabled={activeEmail.status === 'action_taken'}
                    className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
                  >
                    <Scale className="w-3.5 h-3.5" />
                    {activeEmail.status === 'action_taken' ? 'Contrato Devuelto' : 'Aprobar y Devolver Firmado'}
                  </button>
                )}

                {activeEmail.category === 'spam_curious' && (
                  <button
                    onClick={() => onExecuteAction(activeEmail.id, 'reject_budget')}
                    disabled={activeEmail.status === 'action_taken'}
                    className="w-full sm:w-auto px-4 py-2.5 bg-rose-600/80 hover:bg-rose-600 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    {activeEmail.status === 'action_taken' ? 'Canje Rechazado' : 'Rechazar Educadamente por Política'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-xs text-slate-400 p-4">
            Selecciona un correo para ver el resumen de IA
          </div>
        )}
      </div>
    </div>
  );
};
