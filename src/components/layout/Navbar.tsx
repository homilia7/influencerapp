import React, { useState } from 'react';
import { Shield, Sparkles, LayoutDashboard, Mail, Video, Sliders, ExternalLink, ChevronDown, Check } from 'lucide-react';

export type ActiveTab = 'public' | 'crm' | 'gmail' | 'meeting' | 'settings';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  curiousFilteredCount: number;
  unreadEmailCount: number;
}

const TABS: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
  { id: 'public', label: 'Portal Creador (Público)', icon: <ExternalLink className="w-4 h-4 text-emerald-400" /> },
  { id: 'crm', label: 'CRM Pipeline & Tratos', icon: <LayoutDashboard className="w-4 h-4 text-indigo-400" /> },
  { id: 'gmail', label: 'Copiloto Gmail IA', icon: <Mail className="w-4 h-4 text-rose-400" />, badge: 'IA' },
  { id: 'meeting', label: 'Sala de Negociación & Drive', icon: <Video className="w-4 h-4 text-cyan-400" /> },
  { id: 'settings', label: 'Muralla China (Políticas)', icon: <Sliders className="w-4 h-4 text-amber-400" /> },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  curiousFilteredCount,
  unreadEmailCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentTabInfo = TABS.find(t => t.id === activeTab) || TABS[0];

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F19]/95 backdrop-blur-md border-b border-slate-800 px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <div className="flex items-center space-x-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-[1px] flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-[#090D16] rounded-xl flex items-center justify-center">
              <Shield className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-white text-sm sm:text-base">CreatorGate<span className="text-emerald-400">OS</span></span>
            </div>
            <p className="text-[10px] text-slate-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              {curiousFilteredCount} curiosos filtrados
            </p>
          </div>
        </div>

        {/* Dropdown Menu (Menú Desplegable) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-[#162032] hover:bg-[#1E2B45] text-white px-3.5 py-2 rounded-xl border border-indigo-500/30 shadow-md text-xs sm:text-sm font-semibold transition-all"
            aria-expanded={isOpen}
          >
            <span className="flex items-center gap-2">
              {currentTabInfo.icon}
              <span className="truncate max-w-[130px] sm:max-w-none">{currentTabInfo.label}</span>
            </span>
            {activeTab === 'gmail' && unreadEmailCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            )}
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-400' : ''}`} />
          </button>

          {/* Menú Desplegable Flotante */}
          {isOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-[#111827] border border-slate-700/80 rounded-2xl shadow-2xl py-2 z-50 divide-y divide-slate-800/80 animate-fade-in">
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Navegación del Sistema
                </div>
                <div className="py-1">
                  {TABS.map((tab) => {
                    const isSelected = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => handleSelectTab(tab.id)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-colors ${
                          isSelected
                            ? 'bg-indigo-600/20 text-white font-bold border-l-4 border-indigo-500'
                            : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          {tab.icon}
                          <span>{tab.label}</span>
                        </span>
                        <div className="flex items-center gap-1.5">
                          {tab.badge && (
                            <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-1.5 py-0.5 rounded font-mono">
                              {tab.badge}
                            </span>
                          )}
                          {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="px-3.5 py-2 bg-[#090D16] text-[11px] text-slate-400 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Sparkles className="w-3 h-3" /> Drive Sync Activo
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">influencerapp.pages.dev</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
