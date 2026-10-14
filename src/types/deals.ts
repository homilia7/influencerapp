export type Stage = 
  | 'curious_filtered'   // Rechazados por la IA (Muralla China)
  | 'qualified'          // Aprobados por presupuesto y encaje
  | 'negotiation'        // En conversación / video call
  | 'contract_pending'   // T&C enviados a la espera de firma
  | 'won';               // Contrato firmado y listo para producir

export type DeliverableType = 'reel' | 'story' | 'tiktok' | 'youtube' | 'event' | 'full_pack';

export interface Deal {
  id: string;
  brandName: string;
  brandContact: string;
  brandLogo?: string;
  budget: number;
  deliverable: DeliverableType;
  stage: Stage;
  objective: string;
  timeline: string;
  contractSigned: boolean;
  contractDate?: string;
  signerName?: string;
  depositPaid?: boolean;
  depositAmount?: number;
  depositDate?: string;
  depositMethod?: 'card_stripe' | 'wire_transfer';
  transactionId?: string;
  rejectionReason?: string;
  createdAt: string;
  meetingScheduled?: string;
  driveRecordingUrl?: string;
}

export interface FunnelStats {
  totalVisitors: number;
  formsStarted: number;
  curiousFiltered: number;
  qualifiedLeads: number;
  closedWon: number;
  totalPipelineValue: number;
  wonRevenue: number;
}
