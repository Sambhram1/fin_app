'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import LoginPage from '@/components/LoginPage';
import Dashboard from '@/components/Dashboard';
import QuizBattle from '@/components/QuizBattle';
import BudgetCrafter from '@/components/BudgetCrafter';
import FutureSimulator from '@/components/FutureSimulator';
import AIMentor from '@/components/AIMentor';
import Header from '@/components/Header';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'quiz' | 'budget' | 'future' | 'ai'>('dashboard');
  const [userPoints, setUserPoints] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);

  const supabase = useMemo(() => createClient(), []);

  const loadUserProfile = useCallback(async (userId: string) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profile) {
      setUserName(profile.username);
      setUserPoints(profile.xp);
      setUserLevel(profile.level);
      setStreak(profile.streak);

      // Calculate badges based on achievements
      const userBadges: string[] = [];
      if (profile.xp >= 100) userBadges.push('First Save');
      if (profile.level >= 3) userBadges.push('Quiz Master');
      if (profile.level >= 5) userBadges.push('Budget Pro');
      setBadges(userBadges);
    }
  }, [supabase]);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserProfile(session.user.id);
      } else {
        // Reset state on logout
        setUserName('');
        setUserPoints(0);
        setUserLevel(1);
        setStreak(0);
        setBadges([]);
        setActiveTab('dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [loadUserProfile, supabase]);

  const handleLogin = async (username: string) => {
    setUserName(username);
    if (user) {
      await loadUserProfile(user.id);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const addPoints = async (points: number) => {
    if (!user) return;

    const newPoints = userPoints + points;
    const newLevel = Math.floor(newPoints / 500) + 1;

    // Update local state
    setUserPoints(newPoints);
    if (newLevel > userLevel) {
      setUserLevel(newLevel);
    }

    // Update database
    await supabase
      .from('profiles')
      .update({
        xp: newPoints,
        level: newLevel,
      })
      .eq('id', user.id);
    
    // Reload to update badges
    await loadUserProfile(user.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-emerald-400 text-xl" style={{ fontFamily: 'var(--font-pixel)' }}>
          Loading...
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header 
        userName={userName}
        userLevel={userLevel}
        userPoints={userPoints}
        streak={streak}
        badges={badges}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-6 md:py-8">
        {activeTab === 'dashboard' && (
          <Dashboard 
            userLevel={userLevel}
            userPoints={userPoints}
            streak={streak}
            badges={badges}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'quiz' && <QuizBattle addPoints={addPoints} />}
        {activeTab === 'budget' && <BudgetCrafter />}
        {activeTab === 'future' && <FutureSimulator />}
        {activeTab === 'ai' && <AIMentor />}
      </main>
    </div>
  );
}
