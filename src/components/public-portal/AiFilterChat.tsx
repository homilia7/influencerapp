import React, { useState } from 'react';
import { Send, Bot, Sparkles, AlertCircle, FileCheck, RefreshCw } from 'lucide-react';
import { useGeminiFilter } from '../../hooks/useGeminiFilter';
import { CreatorPolicy } from '../../types/creator';

interface AiFilterChatProps {
  policy: CreatorPolicy;
  onLeadQualified: (budget: number, deliverable: any, brandName: string, objective: string) => void;
}

export const AiFilterChat: React.FC<AiFilterChatProps> = ({ policy, onLeadQualified }) => {
  const { messages, isEvaluating, evaluation, sendMessage, resetChat } = useGeminiFilter(policy);
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isEvaluating) return;
    sendMessage(inputText.trim());
    setInputText('');
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputText(prompt);
  };

  return (
    <div className="bg-[#111827] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col h-[520px]">
      {/* Header */}
      <div className="bg-[#0E1526] p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Portero Comercial IA
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                Filtro Activo
              </span>
            </h3>
            <p className="text-xs text-slate-400">Evaluación automática de viabilidad de campañas</p>
          </div>
        </div>

        <button
          onClick={resetChat}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800/60 px-2.5 py-1.5 rounded-lg border border-slate-700/50"
        >
          <RefreshCw className="w-3 h-3" /> Reiniciar
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-2.5 max-w-[85%] ${
              m.sender === 'brand' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                m.sender === 'brand'
                  ? 'bg-slate-700 text-white font-semibold'
                  : 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              }`}
            >
              {m.sender === 'brand' ? 'M' : <Sparkles className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed ${
                m.sender === 'brand'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-[#1F2937]/90 text-slate-200 border border-slate-700/60 rounded-tl-none whitespace-pre-line'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {isEvaluating && (
          <div className="flex items-center gap-2 text-xs text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 p-2.5 rounded-xl w-fit">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            La IA está contrastando tu propuesta contra las políticas comerciales...
          </div>
        )}

        {/* Evaluation Decision Card */}
        {evaluation && (
          <div className="pt-2">
            {evaluation.qualified ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
                  <FileCheck className="w-4 h-4" /> ¡Propuesta Aprobada por la Muralla Comercial!
                </div>
                <p className="text-xs text-slate-300 mb-3">{evaluation.summary}</p>
                <button
                  onClick={() => onLeadQualified(evaluation.budget, evaluation.deliverable, evaluation.brandName, evaluation.objective)}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-xs rounded-xl hover:brightness-110 shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
                >
                  Continuar a Revisión y Firma de Términos Legales
                </button>
              </div>
            ) : (
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-1">
                  <AlertCircle className="w-4 h-4" /> Propuesta Rechazada por Parámetros Mínimos
                </div>
                <p className="text-xs text-slate-300">{evaluation.rejectionReason}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Suggested Quick Starters */}
      <div className="px-4 py-2 bg-[#0E1526]/60 border-t border-slate-800/60 flex items-center gap-2 overflow-x-auto text-[11px]">
        <span className="text-slate-500 font-medium shrink-0">Ejemplos rápidos:</span>
        <button
          onClick={() => handleQuickPrompt(`Somos TechBrand y buscamos 1 Reel con presupuesto de $2,500 USD para Noviembre.`)}
          className="bg-slate-800/80 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-md shrink-0 border border-slate-700/50"
        >
          ✅ Propuesta Aprobada ($2,500 USD)
        </button>
        <button
          onClick={() => handleQuickPrompt(`Te mandamos una caja de ropa gratis a cambio de 3 historias en Instagram.`)}
          className="bg-slate-800/80 hover:bg-slate-700 text-rose-300 px-2.5 py-1 rounded-md shrink-0 border border-slate-700/50"
        >
          ❌ Canje Gratis (Rechazo)
        </button>
        <button
          onClick={() => handleQuickPrompt(`Queremos 2 TikToks pero nuestro presupuesto máximo es de $250 USD.`)}
          className="bg-slate-800/80 hover:bg-slate-700 text-amber-300 px-2.5 py-1 rounded-md shrink-0 border border-slate-700/50"
        >
          ❌ Bajo Presupuesto ($250 USD)
        </button>
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 bg-[#0B0F19] border-t border-slate-800 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe tu propuesta (marca, formato, presupuesto estimado)..."
          className="flex-1 bg-[#1A2234] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isEvaluating}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
        >
          <Send className="w-3.5 h-3.5" /> Enviar
        </button>
      </form>
    </div>
  );
};
