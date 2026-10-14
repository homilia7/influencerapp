import React, { useState } from 'react';
import { ShieldCheck, DollarSign, Ban, Save, Check } from 'lucide-react';
import { CreatorPolicy } from '../../types/creator';

interface PolicySettingsProps {
  policy: CreatorPolicy;
  onUpdatePolicy: (updated: Partial<CreatorPolicy>) => void;
}

export const PolicySettings: React.FC<PolicySettingsProps> = ({ policy, onUpdatePolicy }) => {
  const [formData, setFormData] = useState<CreatorPolicy>(policy);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePolicy(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl max-w-4xl mx-auto">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Configuración de la "Muralla China"</h2>
            <p className="text-xs text-slate-400">Parámetros que la IA utiliza para descartar curiosos y ofertas no viables</p>
          </div>
        </div>

        {savedSuccess && (
          <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-lg flex items-center gap-1 font-semibold">
            <Check className="w-3.5 h-3.5" /> Políticas Actualizadas
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tarifas Mínimas */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" /> Tarifas Mínimas de Inversión (USD)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#0E1526] p-3.5 rounded-xl border border-slate-800">
              <label className="block text-[11px] text-slate-400 mb-1 font-medium">Mínimo por Reel</label>
              <div className="flex items-center text-sm font-bold text-white">
                <span className="text-slate-500 mr-1">$</span>
                <input
                  type="number"
                  value={formData.minReelBudget}
                  onChange={(e) => setFormData({ ...formData, minReelBudget: Number(e.target.value) })}
                  className="w-full bg-transparent border-b border-slate-700 focus:outline-none focus:border-indigo-500 font-mono text-white"
                />
              </div>
            </div>

            <div className="bg-[#0E1526] p-3.5 rounded-xl border border-slate-800">
              <label className="block text-[11px] text-slate-400 mb-1 font-medium">Mínimo por Story</label>
              <div className="flex items-center text-sm font-bold text-white">
                <span className="text-slate-500 mr-1">$</span>
                <input
                  type="number"
                  value={formData.minStoryBudget}
                  onChange={(e) => setFormData({ ...formData, minStoryBudget: Number(e.target.value) })}
                  className="w-full bg-transparent border-b border-slate-700 focus:outline-none focus:border-indigo-500 font-mono text-white"
                />
              </div>
            </div>

            <div className="bg-[#0E1526] p-3.5 rounded-xl border border-slate-800">
              <label className="block text-[11px] text-slate-400 mb-1 font-medium">Mínimo por TikTok</label>
              <div className="flex items-center text-sm font-bold text-white">
                <span className="text-slate-500 mr-1">$</span>
                <input
                  type="number"
                  value={formData.minTikTokBudget}
                  onChange={(e) => setFormData({ ...formData, minTikTokBudget: Number(e.target.value) })}
                  className="w-full bg-transparent border-b border-slate-700 focus:outline-none focus:border-indigo-500 font-mono text-white"
                />
              </div>
            </div>

            <div className="bg-[#0E1526] p-3.5 rounded-xl border border-slate-800">
              <label className="block text-[11px] text-slate-400 mb-1 font-medium">Mínimo Pack Completo</label>
              <div className="flex items-center text-sm font-bold text-white">
                <span className="text-slate-500 mr-1">$</span>
                <input
                  type="number"
                  value={formData.minPackBudget}
                  onChange={(e) => setFormData({ ...formData, minPackBudget: Number(e.target.value) })}
                  className="w-full bg-transparent border-b border-slate-700 focus:outline-none focus:border-indigo-500 font-mono text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Canjes y Bloqueos */}
        <div className="border-t border-slate-800 pt-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Ban className="w-4 h-4 text-rose-400" /> Política de Canjes e Intercambios
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0E1526] p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white mb-0.5">Permitir propuestas de Canje</h4>
                <p className="text-[11px] text-slate-400">Si está inactivo, la IA descarta inmediatamente cualquier mensaje que ofrezca productos.</p>
              </div>
              <input
                type="checkbox"
                checked={formData.acceptsBarter}
                onChange={(e) => setFormData({ ...formData, acceptsBarter: e.target.checked })}
                className="w-5 h-5 rounded border-slate-700 text-indigo-600 focus:ring-0 cursor-pointer"
              />
            </div>

            <div className="bg-[#0E1526] p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white mb-0.5">Contrato Previo Obligatorio</h4>
                <p className="text-[11px] text-slate-400">Bloquea la agenda hasta que el representante de la marca firme digitalmente.</p>
              </div>
              <input
                type="checkbox"
                checked={formData.requiresContractFirst}
                onChange={(e) => setFormData({ ...formData, requiresContractFirst: e.target.checked })}
                className="w-5 h-5 rounded border-slate-700 text-indigo-600 focus:ring-0 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
        >
          <Save className="w-4 h-4" /> Guardar y Aplicar al Portero IA
        </button>
      </form>
    </div>
  );
};
