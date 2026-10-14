import React from 'react';
import { CheckCircle2, Users, TrendingUp, Eye, ShieldCheck, Sparkles } from 'lucide-react';
import { CreatorProfile, CreatorPolicy } from '../../types/creator';

interface CreatorHeroProps {
  profile: CreatorProfile;
  policy: CreatorPolicy;
}

export const CreatorHero: React.FC<CreatorHeroProps> = ({ profile, policy }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-[#0E1526] rounded-2xl border border-slate-800 p-6 md:p-8 mb-8 shadow-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Avatar with Glow */}
        <div className="relative">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-2 border-indigo-500/50 shadow-xl shadow-indigo-500/20">
            <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-black p-1 rounded-full border-2 border-[#090D16]">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{profile.name}</h1>
            <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-full font-mono">
              {profile.handle}
            </span>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verificado Oficial
            </span>
          </div>

          <p className="text-slate-300 text-sm md:text-base max-w-2xl mb-4">{profile.bio}</p>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto md:mx-0">
            <div className="bg-[#111827]/80 border border-slate-800 p-2.5 rounded-xl text-center">
              <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-0.5">
                <Users className="w-3.5 h-3.5 text-indigo-400" /> Audiencia
              </div>
              <span className="text-base font-bold text-white">{profile.followers}</span>
            </div>

            <div className="bg-[#111827]/80 border border-slate-800 p-2.5 rounded-xl text-center">
              <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-0.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Engagement
              </div>
              <span className="text-base font-bold text-emerald-400">{profile.engagement}</span>
            </div>

            <div className="bg-[#111827]/80 border border-slate-800 p-2.5 rounded-xl text-center">
              <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-0.5">
                <Eye className="w-3.5 h-3.5 text-cyan-400" /> Vistas Prom.
              </div>
              <span className="text-base font-bold text-white">{profile.avgViews}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wall of Standards Banner */}
      <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Filtro de Patrocinios Activo: Tarifa base Reel <strong>${policy.minReelBudget} USD</strong> &bull; Canjes: <strong>{policy.acceptsBarter ? 'Bajo evaluación' : 'No aceptados'}</strong></span>
        </div>
        <span className="text-emerald-400 font-medium">Contratos con validez jurídica internacional</span>
      </div>
    </div>
  );
};
