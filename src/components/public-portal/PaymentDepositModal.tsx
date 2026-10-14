import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Building2, Download, CheckCircle, ArrowRight, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateContractPdf } from '../../utils/contractPdf';

interface PaymentDepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandName: string;
  brandContact: string;
  signerName: string;
  budget: number;
  deliverable: string;
  onPaymentSuccess: (paymentInfo: { amount: number; method: 'card_stripe' | 'wire_transfer'; txId: string }) => void;
}

export const PaymentDepositModal: React.FC<PaymentDepositModalProps> = ({
  isOpen,
  onClose,
  brandName,
  brandContact,
  signerName,
  budget,
  deliverable,
  onPaymentSuccess,
}) => {
  const [method, setMethod] = useState<'card_stripe' | 'wire_transfer'>('card_stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [txId, setTxId] = useState('');

  if (!isOpen) return null;

  const depositAmount = Math.round(budget * 0.5);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedTxId = `TX-${method === 'card_stripe' ? 'ST' : 'WIRE'}-${Math.floor(100000 + Math.random() * 900000)}`;
      setTxId(generatedTxId);
      setIsPaid(true);
      setIsProcessing(false);

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });

      onPaymentSuccess({
        amount: depositAmount,
        method,
        txId: generatedTxId
      });
    }, 1200);
  };

  const handleDownloadPdf = () => {
    generateContractPdf({
      brandName,
      brandContact,
      signerName,
      budget,
      deliverable,
      depositPaid: true,
      depositAmount,
      transactionId: txId || 'TX-ST-948123',
      contractDate: new Date().toISOString().split('T')[0]
    });
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

        {!isPaid ? (
          <div>
            <div className="flex items-center gap-2.5 mb-2 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
              <h2 className="text-base sm:text-lg font-bold text-white">Bloqueo de Agenda: Anticipo del 50%</h2>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              Para garantizar la fecha de publicación con Mateo Silva, se requiere la acreditación del 50% de anticipo según las cláusulas del contrato.
            </p>

            {/* Desglose Económico */}
            <div className="bg-[#090D16] border border-slate-800 rounded-xl p-3.5 mb-4 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400">Total Campaña:</span>
                <p className="font-bold text-white">${budget.toLocaleString()} USD</p>
              </div>
              <div>
                <span className="text-emerald-400 font-semibold">Anticipo Obligatorio (50%):</span>
                <p className="font-black text-emerald-400 text-sm">${depositAmount.toLocaleString()} USD</p>
              </div>
            </div>

            {/* Selector de Método */}
            <div className="flex gap-2 mb-4 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setMethod('card_stripe')}
                className={`flex-1 py-2 px-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${method === 'card_stripe' ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'}`}
              >
                <CreditCard className="w-4 h-4 text-indigo-400" /> Tarjeta (Stripe)
              </button>
              <button
                type="button"
                onClick={() => setMethod('wire_transfer')}
                className={`flex-1 py-2 px-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${method === 'wire_transfer' ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'}`}
              >
                <Building2 className="w-4 h-4 text-emerald-400" /> Transferencia Wire
              </button>
            </div>

            {/* Formulario */}
            <form onSubmit={handlePay} className="space-y-3">
              {method === 'card_stripe' ? (
                <div className="space-y-2.5 bg-[#0E1526] p-3.5 rounded-xl border border-slate-800">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Número de Tarjeta</label>
                    <input
                      type="text"
                      defaultValue="4242 •••• •••• 4242"
                      required
                      className="w-full bg-[#1F2937] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Vencimiento</label>
                      <input
                        type="text"
                        defaultValue="12/28"
                        required
                        className="w-full bg-[#1F2937] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">CVC</label>
                      <input
                        type="text"
                        defaultValue="894"
                        required
                        className="w-full bg-[#1F2937] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#0E1526] p-3.5 rounded-xl border border-slate-800 text-[11px] space-y-1.5 text-slate-300 font-mono">
                  <p><strong>Beneficiario:</strong> Mateo Silva Media Corp LLC</p>
                  <p><strong>Banco:</strong> JPMorgan Chase Bank N.A.</p>
                  <p><strong>SWIFT/BIC:</strong> CHASUS33XXX</p>
                  <p><strong>Concepto:</strong> {brandName} - Anticipo Campaña</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-110 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 disabled:opacity-50 transition-all mt-3"
              >
                <Lock className="w-3.5 h-3.5" />
                {isProcessing ? 'Procesando Pago Seguro...' : `Pagar Anticipo de $${depositAmount.toLocaleString()} USD`}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4 animate-fade-in">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500/40">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-white">¡Anticipo Acreditado y Agenda Bloqueada!</h3>
              <p className="text-xs text-slate-400 mt-1 font-mono">ID de Transacción: {txId}</p>
            </div>

            <div className="bg-[#090D16] border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 text-left space-y-1">
              <p className="flex justify-between"><span>Monto Pagado (50%):</span> <strong className="text-emerald-400">${depositAmount.toLocaleString()} USD</strong></p>
              <p className="flex justify-between"><span>Saldo Restante a Publicación:</span> <strong className="text-white">${depositAmount.toLocaleString()} USD</strong></p>
              <p className="flex justify-between"><span>Entregable:</span> <strong className="uppercase text-indigo-400">{deliverable}</strong></p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
              >
                <Download className="w-4 h-4" /> Descargar Contrato Oficial Firmado (PDF)
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-1.5"
              >
                Continuar al Tablero de Campaña <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
