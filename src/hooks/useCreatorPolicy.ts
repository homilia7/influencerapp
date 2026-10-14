import { useState, useEffect } from 'react';
import { CreatorProfile, CreatorPolicy } from '../types/creator';

const DEFAULT_PROFILE: CreatorProfile = {
  name: "Mateo Silva",
  handle: "@mateosilva.ai",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  bio: "Divulgador de IA & Emprendimiento Digital. 485K+ creadores y fundadores en mi comunidad.",
  niche: "Tech, IA & Software SaaS",
  followers: "485K",
  engagement: "8.4%",
  avgViews: "125K",
  location: "Madrid / CDMX / Remote",
  verifiedBadge: true,
  activeCampaignsCount: 4
};

const DEFAULT_POLICY: CreatorPolicy = {
  minReelBudget: 1200,
  minStoryBudget: 450,
  minTikTokBudget: 900,
  minPackBudget: 2200,
  acceptsBarter: false,
  minBarterValue: 2500,
  requiresContractFirst: true,
  imageRightsDays: 30,
  lateFeeDailyPercent: 1.5
};

export function useCreatorPolicy() {
  const [profile, setProfile] = useState<CreatorProfile>(() => {
    const saved = localStorage.getItem('creator_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const [policy, setPolicy] = useState<CreatorPolicy>(() => {
    const saved = localStorage.getItem('creator_policy');
    return saved ? JSON.parse(saved) : DEFAULT_POLICY;
  });

  useEffect(() => {
    localStorage.setItem('creator_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('creator_policy', JSON.stringify(policy));
  }, [policy]);

  const updatePolicy = (newPolicy: Partial<CreatorPolicy>) => {
    setPolicy(prev => ({ ...prev, ...newPolicy }));
  };

  const updateProfile = (newProfile: Partial<CreatorProfile>) => {
    setProfile(prev => ({ ...prev, ...newProfile }));
  };

  return { profile, policy, updatePolicy, updateProfile };
}
