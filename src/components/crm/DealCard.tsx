import React from 'react';
import { FileCheck2, Clock, CheckCircle, ArrowRight, ShieldAlert, Video, Download } from 'lucide-react';
import { Deal, Stage } from '../../types/deals';
import { generateContractPdf } from '../../utils/contractPdf';

interface DealCardProps {
  deal: Deal;
  onAdvance: (dealId: string, nextStage: Stage) => void;
  onSignContract: (dealId: string) => void;
  onOpenMeeting?: (deal: Deal) => void;
}

export const DealCard: React.FC<DealCardProps> = ({ deal, onAdvance, onSignContract, onOpenMeeting }) => {
  const depositVal = deal.depositAmount || Math.round(deal.budget * 0.5);

  return (
    <div className="bg-[#111827] border border-slate-800 hover:border-slate-700 p-3.5 rounded-xl transition-all shadow-md">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-bold text-white text-xs truncate">{deal.brandName}</h4>
        <span className="text-[11px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
          ${deal.budget.toLocaleString()} USD
        </span>
      </div>

      <p className="text-[11px] text-slate-300 line-clamp-2 mb-2.5">{deal.objective}</p>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3 text-[10px]">
        <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md uppercase font-mono">
          {deal.deliverable}
        </span>
        {deal.contractSigned ? (
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Contrato
          </span>
        ) : (
          <span className="bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
            <Clock className="w-3 h-3" /> T&C Pendiente
          </span>
        )}
        {deal.depositPaid ? (
          <span className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-md font-semibold">
            💰 Anticipo 50% ($${depositVal})
          </span>
        ) : deal.contractSigned ? (
          <span className="bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-md">
            ⏳ Anticipo Pendiente
          </span>
        ) : null}
      </div>

      {deal.rejectionReason && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[10px] p-2 rounded-lg mb-2 flex items-start gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span>{deal.rejectionReason}</span>
        </div>
      )}

      {/* Stage Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] gap-1">
        {deal.contractSigned && (
          <button
            type="button"
            onClick={() => generateContractPdf(deal)}
            className="text-slate-400 hover:text-white flex items-center gap-1 text-[10px] bg-slate-800/70 hover:bg-slate-700 px-2 py-1 rounded"
            title="Descargar contrato formal en PDF"
          >
            <Download className="w-3 h-3 text-indigo-400" /> PDF
          </button>
        )}

        {!deal.contractSigned && deal.stage !== 'curious_filtered' && (
          <button
            onClick={() => onSignContract(deal.id)}
            className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
          >
            <FileCheck2 className="w-3.5 h-3.5" /> Firmar
          </button>
        )}

        {deal.stage === 'negotiation' && onOpenMeeting && (
          <button
            onClick={() => onOpenMeeting(deal)}
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
          >
            <Video className="w-3.5 h-3.5" /> Sala
          </button>
        )}

        {deal.stage === 'qualified' && (
          <button
            onClick={() => onAdvance(deal.id, 'negotiation')}
            className="ml-auto text-slate-300 hover:text-white flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded"
          >
            Negociar <ArrowRight className="w-3 h-3" />
          </button>
        )}

        {deal.stage === 'negotiation' && (
          <button
            onClick={() => onAdvance(deal.id, 'won')}
            className="ml-auto text-emerald-300 hover:text-emerald-200 flex items-center gap-1 bg-emerald-600/30 hover:bg-emerald-600/50 px-2 py-1 rounded"
          >
            Cerrar <CheckCircle className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
