import { useState, useEffect } from 'react';
import { Deal, Stage, FunnelStats } from '../types/deals';

const INITIAL_DEALS: Deal[] = [
  {
    id: 'deal-1',
    brandName: 'Notion España',
    brandContact: 'carlos@notion.so',
    brandLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    budget: 3500,
    deliverable: 'full_pack',
    stage: 'won',
    objective: 'Lanzamiento de Notion Calendar ante fundadores tech',
    timeline: 'Noviembre 2026',
    contractSigned: true,
    contractDate: '2026-10-10',
    signerName: 'Carlos Gómez',
    depositPaid: true,
    depositAmount: 1750,
    depositMethod: 'card_stripe',
    transactionId: 'TX-ST-882194',
    createdAt: '2026-10-05',
    driveRecordingUrl: 'https://drive.google.com/drive/u/0/folders/notion_negotiation_rec'
  },
  {
    id: 'deal-2',
    brandName: 'Supabase Cloud',
    brandContact: 'elena@supabase.io',
    brandLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    budget: 2400,
    deliverable: 'reel',
    stage: 'negotiation',
    objective: 'Reel demostrativo de Auth y Vector DB',
    timeline: 'Diciembre 2026',
    contractSigned: true,
    contractDate: '2026-10-12',
    signerName: 'Elena Ramos',
    depositPaid: true,
    depositAmount: 1200,
    depositMethod: 'wire_transfer',
    transactionId: 'TX-WIRE-441203',
    createdAt: '2026-10-11',
    meetingScheduled: 'Mañana 10:00 AM'
  },
  {
    id: 'deal-3',
    brandName: 'Raycast Pro',
    brandContact: 'thomas@raycast.com',
    budget: 1800,
    deliverable: 'youtube',
    stage: 'qualified',
    objective: 'Mención y demo de extensiones de IA',
    timeline: 'Noviembre 2026',
    contractSigned: false,
    createdAt: '2026-10-13'
  },
  {
    id: 'deal-4',
    brandName: 'ModaCasual Express',
    brandContact: 'promo@modacasual.xyz',
    budget: 80,
    deliverable: 'story',
    stage: 'curious_filtered',
    objective: 'Enviar 2 camisas a cambio de 4 historias',
    timeline: 'Inmediato',
    contractSigned: false,
    rejectionReason: 'Filtro IA: Oferta de canje no aprobada. Presupuesto inferior al mínimo ($450 USD).',
    createdAt: '2026-10-13'
  },
  {
    id: 'deal-5',
    brandName: 'CryptoMoon Bots',
    brandContact: 'lead@cryptomoon.tg',
    budget: 200,
    deliverable: 'tiktok',
    stage: 'curious_filtered',
    objective: 'Promoción de bot sin respaldo verificable',
    timeline: 'Urgente',
    contractSigned: false,
    rejectionReason: 'Filtro IA: Nicho no compatible con directrices de reputación del creador.',
    createdAt: '2026-10-12'
  }
];

export function useDeals() {
  const [deals, setDeals] = useState<Deal[]>(() => {
    const saved = localStorage.getItem('creator_deals');
    return saved ? JSON.parse(saved) : INITIAL_DEALS;
  });

  useEffect(() => {
    localStorage.setItem('creator_deals', JSON.stringify(deals));
  }, [deals]);

  const moveDealStage = (dealId: string, nextStage: Stage) => {
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, stage: nextStage } : d));
  };

  const addDeal = (newDeal: Omit<Deal, 'id' | 'createdAt'>) => {
    const deal: Deal = {
      ...newDeal,
      id: `deal-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setDeals(prev => [deal, ...prev]);
    return deal;
  };

  const signContract = (dealId: string) => {
    setDeals(prev => prev.map(d => d.id === dealId ? {
      ...d,
      contractSigned: true,
      contractDate: new Date().toISOString().split('T')[0],
      stage: 'negotiation'
    } : d));
  };

  const markDepositPaid = (dealId: string, amount: number, method: 'card_stripe' | 'wire_transfer', txId: string) => {
    setDeals(prev => prev.map(d => d.id === dealId ? {
      ...d,
      depositPaid: true,
      depositAmount: amount,
      depositMethod: method,
      transactionId: txId,
      depositDate: new Date().toISOString().split('T')[0]
    } : d));
  };

  const stats: FunnelStats = {
    totalVisitors: 842,
    formsStarted: 154,
    curiousFiltered: deals.filter(d => d.stage === 'curious_filtered').length + 86,
    qualifiedLeads: deals.filter(d => d.stage !== 'curious_filtered').length,
    closedWon: deals.filter(d => d.stage === 'won').length,
    totalPipelineValue: deals.filter(d => d.stage !== 'curious_filtered' && d.stage !== 'won').reduce((acc, d) => acc + d.budget, 0),
    wonRevenue: deals.filter(d => d.stage === 'won').reduce((acc, d) => acc + d.budget, 0)
  };

  return { deals, moveDealStage, addDeal, signContract, markDepositPaid, stats };
}
