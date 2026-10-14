import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/layout/Navbar';
import { CreatorHero } from './components/public-portal/CreatorHero';
import { AiFilterChat } from './components/public-portal/AiFilterChat';
import { ContractModal } from './components/public-portal/ContractModal';
import { FunnelMetrics } from './components/crm/FunnelMetrics';
import { KanbanBoard } from './components/crm/KanbanBoard';
import { GmailInbox } from './components/gmail/GmailInbox';
import { ConnectGmailModal } from './components/gmail/ConnectGmailModal';
import { VideoRoom } from './components/meeting/VideoRoom';
import { PolicySettings } from './components/settings/PolicySettings';

import { useCreatorPolicy } from './hooks/useCreatorPolicy';
import { useDeals } from './hooks/useDeals';
import { useGmailCopilot } from './hooks/useGmailCopilot';
import { DeliverableType, Deal } from './types/deals';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('public');
  const { profile, policy, updatePolicy } = useCreatorPolicy();
  const { deals, moveDealStage, addDeal, signContract, stats } = useDeals();
  const { emails, isConnected, connectedAccount, executeAction, connectAccount } = useGmailCopilot();

  // Modals state
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [isConnectGmailOpen, setIsConnectGmailOpen] = useState(false);
  const [selectedMeetingDeal, setSelectedMeetingDeal] = useState<Deal | undefined>();

  // Temporary qualified lead payload for signing
  const [pendingLead, setPendingLead] = useState<{
    budget: number;
    deliverable: DeliverableType;
    brandName: string;
    objective: string;
  } | null>(null);

  const handleLeadQualified = (budget: number, deliverable: DeliverableType, brandName: string, objective: string) => {
    setPendingLead({ budget, deliverable, brandName, objective });
    setIsContractModalOpen(true);
  };

  const handleContractSigned = (signedData: { brandContact: string; brandName: string }) => {
    if (!pendingLead) return;
    const createdDeal = addDeal({
      brandName: signedData.brandName,
      brandContact: signedData.brandContact,
      budget: pendingLead.budget,
      deliverable: pendingLead.deliverable,
      stage: 'negotiation',
      objective: pendingLead.objective,
      timeline: 'Próximos 15 días',
      contractSigned: true,
      contractDate: new Date().toISOString().split('T')[0]
    });
    setIsContractModalOpen(false);
    setPendingLead(null);
    setSelectedMeetingDeal(createdDeal);
    setActiveTab('crm');
  };

  const handleOpenMeeting = (deal: Deal) => {
    setSelectedMeetingDeal(deal);
    setActiveTab('meeting');
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        curiousFilteredCount={stats.curiousFiltered}
        unreadEmailCount={emails.filter(e => !e.read).length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 lg:p-8">
        {activeTab === 'public' && (
          <div className="space-y-6">
            <CreatorHero profile={profile} policy={policy} />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8">
                <AiFilterChat policy={policy} onLeadQualified={handleLeadQualified} />
              </div>
              <div className="lg:col-span-4 bg-[#111827] border border-slate-800 p-6 rounded-2xl">
                <h3 className="font-bold text-white text-sm mb-3">¿Cómo funciona este portal?</h3>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex gap-2">
                    <span className="text-emerald-400 font-bold">1.</span>
                    <span>La marca conversa con la IA de Mateo para verificar presupuesto y alcance.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-400 font-bold">2.</span>
                    <span>Los curiosos y ofertas de canje sin valor quedan descartados al instante.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo-400 font-bold">3.</span>
                    <span>Si califica, firma digitalmente los Términos y Condiciones antes de agendar.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'crm' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl font-black text-white">Pipeline de Patrocinios & Acuerdos</h1>
                <p className="text-xs text-slate-400">Embudo comercial en tiempo real con respaldo de contratos</p>
              </div>
            </div>
            <FunnelMetrics stats={stats} />
            <KanbanBoard
              deals={deals}
              onAdvance={moveDealStage}
              onSignContract={signContract}
              onOpenMeeting={handleOpenMeeting}
            />
          </div>
        )}

        {activeTab === 'gmail' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl font-black text-white">Copiloto Inteligente de Gmail</h1>
                <p className="text-xs text-slate-400">Filtrado automático de propuestas comerciales con IA y respuestas en 1 clic</p>
              </div>
            </div>
            <GmailInbox
              emails={emails}
              isConnected={isConnected}
              connectedAccount={connectedAccount}
              onExecuteAction={executeAction}
              onConnectClick={() => setIsConnectGmailOpen(true)}
            />
          </div>
        )}

        {activeTab === 'meeting' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl font-black text-white">Sala de Negociación Blindada</h1>
                <p className="text-xs text-slate-400">Grabación privada sincronizada a Google Drive y borrado automático en servidor</p>
              </div>
            </div>
            <VideoRoom selectedDeal={selectedMeetingDeal} onCloseMeeting={() => setActiveTab('crm')} />
          </div>
        )}

        {activeTab === 'settings' && (
          <PolicySettings policy={policy} onUpdatePolicy={updatePolicy} />
        )}
      </main>

      <ContractModal
        isOpen={isContractModalOpen}
        onClose={() => setIsContractModalOpen(false)}
        brandName={pendingLead?.brandName || ''}
        budget={pendingLead?.budget || 0}
        deliverable={pendingLead?.deliverable || 'reel'}
        objective={pendingLead?.objective || ''}
        onContractSigned={handleContractSigned}
      />

      <ConnectGmailModal
        isOpen={isConnectGmailOpen}
        onClose={() => setIsConnectGmailOpen(false)}
        currentEmail={connectedAccount}
        onConnect={connectAccount}
      />
    </div>
  );
};
export default App;
