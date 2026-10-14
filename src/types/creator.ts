export interface CreatorProfile {
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  niche: string;
  followers: string;
  engagement: string;
  avgViews: string;
  location: string;
  verifiedBadge: boolean;
  activeCampaignsCount: number;
}

export interface CreatorPolicy {
  minReelBudget: number;       // ej. $1,200 USD
  minStoryBudget: number;      // ej. $450 USD
  minTikTokBudget: number;     // ej. $900 USD
  minPackBudget: number;       // ej. $2,200 USD
  acceptsBarter: boolean;      // false por defecto
  minBarterValue: number;      // ej. $2,000 USD si acepta
  requiresContractFirst: boolean;
  imageRightsDays: number;     // ej. 30 días de pauta paga
  lateFeeDailyPercent: number; // ej. 1.5% por día de retraso
}
