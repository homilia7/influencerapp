import React from 'react';
import { Eye, ShieldAlert, DollarSign, Award, ArrowUpRight } from 'lucide-react';
import { FunnelStats } from '../../types/deals';

interface FunnelMetricsProps {
  stats: FunnelStats;
}

export const FunnelMetrics: React.FC<FunnelMetricsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* 1. Traffic */}
      <div className="bg-[#111827] border border-slate-800 p-4 rounded-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400">Tráfico al Portal</span>
          <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Eye className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-white">{stats.totalVisitors}</span>
          <span className="text-[11px] font-semibold text-emerald-400 flex items-center">
            <ArrowUpRight className="w-3 h-3" /> +18.4%
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">{stats.formsStarted} marcas iniciaron propuesta</p>
      </div>

      {/* 2. Curious Blocked */}
      <div className="bg-[#111827] border border-slate-800 p-4 rounded-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400">Curiosos Filtrados (IA)</span>
          <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <ShieldAlert className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-rose-400">{stats.curiousFiltered}</span>
          <span className="text-[11px] font-mono text-slate-400">~14 hrs ahorradas</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">Canjes rechazados y bajo presupuesto</p>
      </div>

      {/* 3. Pipeline in Negotiation */}
      <div className="bg-[#111827] border border-slate-800 p-4 rounded-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400">En Negociación</span>
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <DollarSign className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-amber-400">${stats.totalPipelineValue.toLocaleString()}</span>
          <span className="text-[11px] font-mono text-slate-400">USD</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">{stats.qualifiedLeads} marcas con presupuesto verificado</p>
      </div>

      {/* 4. Won Revenue */}
      <div className="bg-[#111827] border border-slate-800 p-4 rounded-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400">Cerrado & Firmado</span>
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Award className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-emerald-400">${stats.wonRevenue.toLocaleString()}</span>
          <span className="text-[11px] font-mono text-slate-400">USD</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">{stats.closedWon} contratos en producción activa</p>
      </div>
    </div>
  );
};
