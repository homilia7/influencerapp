import { useState } from 'react';
import { CreatorPolicy } from '../types/creator';
import { DeliverableType } from '../types/deals';

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'brand';
  text: string;
  timestamp: string;
}

export interface EvaluationResult {
  qualified: boolean;
  budget: number;
  deliverable: DeliverableType;
  brandName: string;
  objective: string;
  rejectionReason?: string;
  summary: string;
}

const GEMINI_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';

export function useGeminiFilter(policy: CreatorPolicy) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'ai',
      text: '¡Hola! Soy el setter de patrocinios y acuerdos comerciales de Mateo Silva. Para agilizar tu propuesta y verificar encaje de agenda y presupuesto, cuéntame: ¿De qué marca nos contactas y qué formato buscas (Reel, Story, TikTok o Pack completo)?',
      timestamp: 'Ahora'
    }
  ]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);

  const sendMessage = async (userText: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'brand',
      text: userText,
      timestamp: 'Ahora'
    };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setIsEvaluating(true);

    // Parse budget and intent
    const lower = userText.toLowerCase();
    const budgetMatch = userText.match(/\$?(\d+[\d,.]*)/);
    let extractedBudget = budgetMatch ? parseInt(budgetMatch[1].replace(/[,.]/g, ''), 10) : 0;
    const isCanje = lower.includes('canje') || lower.includes('gratis') || lower.includes('producto') || lower.includes('intercambio') || lower.includes('regalo');
    
    let deliverable: DeliverableType = 'reel';
    if (lower.includes('story') || lower.includes('historia')) deliverable = 'story';
    else if (lower.includes('tiktok')) deliverable = 'tiktok';
    else if (lower.includes('pack') || lower.includes('completo')) deliverable = 'full_pack';
    else if (lower.includes('youtube')) deliverable = 'youtube';

    let minRequired = policy.minReelBudget;
    if (deliverable === 'story') minRequired = policy.minStoryBudget;
    else if (deliverable === 'tiktok') minRequired = policy.minTikTokBudget;
    else if (deliverable === 'full_pack') minRequired = policy.minPackBudget;

    // Check qualification
    setTimeout(() => {
      let aiResponseText = '';
      let result: EvaluationResult;

      if (isCanje && !policy.acceptsBarter) {
        aiResponseText = `Agradecemos mucho el interés de su marca. Sin embargo, por políticas comerciales y de representación exclusiva, el creador NO acepta colaboraciones mediante canje o intercambio de productos. Para campañas patrocinadas, la tarifa base es de $${minRequired} USD.`;
        result = {
          qualified: false,
          budget: 0,
          deliverable,
          brandName: 'Marca Curiosa / Canje',
          objective: userText,
          rejectionReason: 'Filtro Muralla China: Canje no aceptado por política comercial.',
          summary: 'Propuesta de canje rechazada automáticamente.'
        };
      } else if (extractedBudget > 0 && extractedBudget < minRequired) {
        aiResponseText = `Gracias por compartir su estimación. Actualmente la tarifa mínima institucional para un entregable de tipo ${deliverable.toUpperCase()} comienza a partir de $${minRequired.toLocaleString()} USD (más impuestos y derechos de uso estándar). La propuesta de $${extractedBudget.toLocaleString()} USD queda por debajo de este umbral, por lo que no es posible agendar en este momento.`;
        result = {
          qualified: false,
          budget: extractedBudget,
          deliverable,
          brandName: 'Marca con Presupuesto Insuficiente',
          objective: userText,
          rejectionReason: `Presupuesto ofrecido ($${extractedBudget} USD) inferior a tarifa base ($${minRequired} USD).`,
          summary: 'Lead rechazado por no alcanzar presupuesto mínimo.'
        };
      } else {
        // Qualified!
        const approvedBudget = extractedBudget >= minRequired ? extractedBudget : minRequired;
        aiResponseText = `¡Excelente! Su propuesta para formato ${deliverable.toUpperCase()} con una inversión estimada de $${approvedBudget.toLocaleString()} USD se ajusta perfectamente a los estándares de la comunidad del creador.\n\nPara blindar el acuerdo y reservar la fecha en agenda, por favor complete la aceptación de Términos y Condiciones y la firma electrónica preliminar en el siguiente paso.`;
        result = {
          qualified: true,
          budget: approvedBudget,
          deliverable,
          brandName: 'Marca Calificada',
          objective: userText,
          summary: `Propuesta viable: ${deliverable.toUpperCase()} por $${approvedBudget} USD.`
        };
      }

      setMessages(prev => [...prev, {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: 'Ahora'
      }]);
      setEvaluation(result);
      setIsEvaluating(false);
    }, 700);
  };

  const resetChat = () => {
    setMessages([messages[0]]);
    setEvaluation(null);
  };

  return { messages, isEvaluating, evaluation, sendMessage, resetChat, apiKeySet: !!GEMINI_KEY };
}
