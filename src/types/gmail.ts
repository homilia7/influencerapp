export type EmailCategory = 
  | 'priority_deal'      // 🔥 Presupuesto alto, marca verificada
  | 'contract_pending'   // ⚖️ Contrato o T&C recibido para revisión
  | 'in_followup'        // ⏳ En seguimiento
  | 'spam_curious';      // 🚫 Canje no deseado o sin presupuesto

export type QuickActionType = 'accept_meeting' | 'send_rate_card' | 'reject_budget' | 'sign_contract';

export interface EmailMessage {
  id: string;
  from: string;
  fromName: string;
  avatar?: string;
  subject: string;
  snippet: string;
  body: string;
  date: string;
  read: boolean;
  category: EmailCategory;
  aiSummary: string;
  extractedBudget?: number;
  extractedBrand?: string;
  suggestedAction: QuickActionType;
  status: 'pending' | 'action_taken';
}

export interface ImapConfig {
  email: string;
  appPassword?: string;
  host: string;
  port: number;
  useSsl: boolean;
  smtpHost: string;
  smtpPort: number;
  lastSync?: string;
  isConnected: boolean;
}
