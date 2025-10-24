'use client';

import { LogOut } from 'lucide-react';

interface HeaderProps {
  userName: string;
  userLevel: number;
  userPoints: number;
  streak: number;
  badges: string[];
  activeTab: string;
  setActiveTab: (tab: 'dashboard' | 'quiz' | 'budget' | 'future' | 'ai') => void;
  onLogout: () => void;
}

export default function Header({ 
  userName, 
  userLevel, 
  userPoints, 
  activeTab, 
  setActiveTab, 
  onLogout 
}: HeaderProps) {
  const tabs = [
    { id: 'dashboard', label: '🏠 Hub', emoji: '🏠' },
    { id: 'quiz', label: '🧠 Quiz', emoji: '🧠' },
    { id: 'budget', label: '💰 Budget', emoji: '💰' },
    { id: 'future', label: '🔮 Future', emoji: '🔮' },
    { id: 'ai', label: '🤖 AI Guide', emoji: '🤖' },
  ];

  return (
    <header className="bg-gray-800 border-b-4 border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        {/* Top Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="pixel-border border-emerald-500 rounded-lg p-2 bg-emerald-500/10">
              <span className="text-2xl">🐷</span>
            </div>
            <div>
              <h1 className="text-sm md:text-base text-emerald-500" style={{ fontFamily: 'var(--font-pixel)' }}>
                FinBuddy
              </h1>
              <p className="text-[10px] text-gray-400" style={{ fontFamily: 'var(--font-pixel)' }}>
                Welcome, {userName}!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="pixel-border border-yellow-500 rounded-lg px-3 py-2 bg-gray-900">
              <p className="text-[10px] md:text-xs text-yellow-500" style={{ fontFamily: 'var(--font-pixel)' }}>
                Lvl {userLevel} | {userPoints} XP
              </p>
            </div>
            <button
              onClick={onLogout}
              className="pixel-border border-red-500 rounded-lg px-3 py-2 bg-red-500/10 hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 md:px-4 py-2 rounded-lg text-[10px] md:text-xs whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-white pixel-border border-emerald-400 glow-emerald'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 pixel-border border-gray-600'
              }`}
              style={{ fontFamily: 'var(--font-pixel)' }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
