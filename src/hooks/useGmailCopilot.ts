import { useState, useEffect } from 'react';
import { EmailMessage, QuickActionType, ImapConfig } from '../types/gmail';

const DEFAULT_IMAP: ImapConfig = {
  email: 'mateo@mateosilva.tech',
  host: 'imap.gmail.com',
  port: 993,
  useSsl: true,
  smtpHost: 'smtp.gmail.com',
  smtpPort: 465,
  lastSync: 'Hace 5 minutos',
  isConnected: true
};

const INITIAL_EMAILS: EmailMessage[] = [
  {
    id: 'email-1',
    from: 'partnerships@linear.app',
    fromName: 'Sarah Jenkins (Linear)',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    subject: 'Propuesta de Patrocinio: Serie de Productividad para Ingenieros',
    snippet: 'Hola Mateo, nos encanta tu contenido sobre flujos de trabajo eficientes. Queremos patrocinar 2 Reels...',
    body: 'Hola Mateo,\n\nTe escribe Sarah del equipo de Growth en Linear. Seguimos de cerca tu canal y tus análisis de herramientas.\n\nNos gustaría colaborar contigo durante el mes de Noviembre para el lanzamiento de nuestra nueva función. Proponemos un presupuesto base de $3,200 USD para 2 Reels con derechos de uso por 30 días.\n\n¿Tienes disponibilidad para una videollamada mañana a las 10:00 AM para afinar los detalles?',
    date: 'Hace 25 min',
    read: false,
    category: 'priority_deal',
    aiSummary: 'Linear ofrece $3,200 USD por 2 Reels (Supera tu tarifa mínima de $1,200/Reel). Pide llamada mañana a las 10:00 AM.',
    extractedBudget: 3200,
    extractedBrand: 'Linear App',
    suggestedAction: 'accept_meeting',
    status: 'pending'
  },
  {
    id: 'email-2',
    from: 'legal-agreements@vercel.com',
    fromName: 'Vercel Legal Desk',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    subject: 'Contrato y Términos para Campaña Next.js Conf ($4,500 USD)',
    snippet: 'Adjuntamos el contrato de patrocinio firmado por nuestra parte para tu revisión y contra-firma...',
    body: 'Estimado Mateo,\n\nAdjuntamos la minuta final de patrocinio para Next.js Conf por un importe de $4,500 USD.\n\nPor favor revisa la Cláusula 5 sobre exclusividad temporal y confirma la firma digital mediante tu plataforma.',
    date: 'Hace 2 horas',
    read: false,
    category: 'contract_pending',
    aiSummary: 'Contrato listo de Vercel por $4,500 USD. Cláusula de exclusividad alineada con tus políticas de 30 días.',
    extractedBudget: 4500,
    extractedBrand: 'Vercel',
    suggestedAction: 'sign_contract',
    status: 'pending'
  },
  {
    id: 'email-3',
    from: 'marketing@techgadgets-direct.ru',
    fromName: 'TechGadget Dropship',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    subject: 'Colaboración gratis: Auriculares Bluetooth a cambio de 1 Reel',
    snippet: 'Hola amigo influencer! Te enviamos unos auriculares gratis si nos haces un video...',
    body: 'Hola Mateo,\n\nSomos una marca internacional de gadgets. Te queremos regalar un reloj inteligente valorado en $39 USD. A cambio solo queremos 1 Reel dedicado y 3 historias etiquetando nuestra tienda en AliExpress.',
    date: 'Ayer',
    read: true,
    category: 'spam_curious',
    aiSummary: 'Curioso / Canje no deseado. Ofrecen producto de $39 USD sin presupuesto en dinero. Rechazar automáticamente.',
    extractedBudget: 0,
    extractedBrand: 'TechGadget',
    suggestedAction: 'reject_budget',
    status: 'pending'
  }
];

export function useGmailCopilot() {
  const [emails, setEmails] = useState<EmailMessage[]>(() => {
    const saved = localStorage.getItem('creator_gmail');
    return saved ? JSON.parse(saved) : INITIAL_EMAILS;
  });

  const [isConnected, setIsConnected] = useState<boolean>(() => {
    return localStorage.getItem('gmail_connected') !== 'false';
  });

  const [connectedAccount, setConnectedAccount] = useState<string>('mateo@mateosilva.tech');

  const [imapConfig, setImapConfig] = useState<ImapConfig>(() => {
    const saved = localStorage.getItem('creator_imap_config');
    return saved ? JSON.parse(saved) : DEFAULT_IMAP;
  });

  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('creator_gmail', JSON.stringify(emails));
  }, [emails]);

  useEffect(() => {
    localStorage.setItem('creator_imap_config', JSON.stringify(imapConfig));
  }, [imapConfig]);

  const executeAction = (emailId: string, _action: QuickActionType) => {
    setEmails(prev => prev.map(e => {
      if (e.id === emailId) {
        return { ...e, status: 'action_taken', read: true };
      }
      return e;
    }));
  };

  const saveImapConfig = (config: Partial<ImapConfig>) => {
    setImapConfig(prev => {
      const updated = { ...prev, ...config, isConnected: true, lastSync: 'Recién conectado' };
      localStorage.setItem('creator_imap_config', JSON.stringify(updated));
      return updated;
    });
    setConnectedAccount(config.email || imapConfig.email);
    setIsConnected(true);
    localStorage.setItem('gmail_connected', 'true');
  };

  const syncEmails = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setImapConfig(prev => ({ ...prev, lastSync: 'Hace unos segundos' }));
    }, 1200);
  };

  const disconnectAccount = () => {
    setIsConnected(false);
    setImapConfig(prev => ({ ...prev, isConnected: false }));
    localStorage.setItem('gmail_connected', 'false');
  };

  return {
    emails,
    isConnected,
    connectedAccount: imapConfig.email || connectedAccount,
    imapConfig,
    isSyncing,
    saveImapConfig,
    syncEmails,
    executeAction,
    disconnectAccount
  };
}
