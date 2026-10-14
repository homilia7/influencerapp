import React from 'react';
import { Deal, Stage } from '../../types/deals';
import { DealCard } from './DealCard';
import { ShieldAlert, CheckCircle2, MessageSquare, Award } from 'lucide-react';

interface KanbanBoardProps {
  deals: Deal[];
  onAdvance: (dealId: string, nextStage: Stage) => void;
  onSignContract: (dealId: string) => void;
  onOpenMeeting: (deal: Deal) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  deals,
  onAdvance,
  onSignContract,
  onOpenMeeting,
}) => {
  const columns: { stage: Stage; title: string; icon: React.ReactNode; color: string }[] = [
    {
      stage: 'curious_filtered',
      title: 'Curiosos Filtrados (IA)',
      icon: <ShieldAlert className="w-4 h-4 text-rose-400" />,
      color: 'border-rose-500/30 bg-rose-500/5'
    },
    {
      stage: 'qualified',
      title: 'Calificados por Presupuesto',
      icon: <CheckCircle2 className="w-4 h-4 text-indigo-400" />,
      color: 'border-indigo-500/30 bg-indigo-500/5'
    },
    {
      stage: 'negotiation',
      title: 'En Negociación / T&C',
      icon: <MessageSquare className="w-4 h-4 text-amber-400" />,
      color: 'border-amber-500/30 bg-amber-500/5'
    },
    {
      stage: 'won',
      title: 'Cerrados & Firmados',
      icon: <Award className="w-4 h-4 text-emerald-400" />,
      color: 'border-emerald-500/30 bg-emerald-500/5'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {columns.map(col => {
        const colDeals = deals.filter(d => d.stage === col.stage);
        const colTotal = colDeals.reduce((sum, d) => sum + d.budget, 0);

        return (
          <div
            key={col.stage}
            className={`rounded-2xl border ${col.color} p-3.5 flex flex-col h-[640px]`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                {col.icon}
                <h3 className="font-bold text-white text-xs">{col.title}</h3>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#111827] text-slate-300 border border-slate-800">
                {colDeals.length}
              </span>
            </div>

            {/* Total Value Pill */}
            {colTotal > 0 && col.stage !== 'curious_filtered' && (
              <div className="text-[11px] text-slate-400 mb-3 px-2 py-1 bg-[#111827]/70 rounded-lg flex justify-between">
                <span>Valor en etapa:</span>
                <strong className="text-emerald-400">${colTotal.toLocaleString()} USD</strong>
              </div>
            )}

            {/* Cards List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {colDeals.map(deal => (
                <DealCard
                  key={deal.id}
                  deal={deal}
                  onAdvance={onAdvance}
                  onSignContract={onSignContract}
                  onOpenMeeting={onOpenMeeting}
                />
              ))}

              {colDeals.length === 0 && (
                <div className="h-32 flex items-center justify-center text-xs text-slate-400 border border-dashed border-slate-800 rounded-xl">
                  Sin tratos en esta etapa
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
