'use client';

import { Trophy, Flame, Award, PiggyBank, Brain, Wallet, TrendingUp, Bot } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DashboardProps {
  userLevel: number;
  userPoints: number;
  streak: number;
  badges: string[];
  setActiveTab: (tab: 'dashboard' | 'quiz' | 'budget' | 'future' | 'ai') => void;
}

export default function Dashboard({ userLevel, userPoints, streak, badges, setActiveTab }: DashboardProps) {
  // Sample data for charts
  const savingsData = [
    { month: 'Jan', amount: 1200, goal: 2000 },
    { month: 'Feb', amount: 1600, goal: 2000 },
    { month: 'Mar', amount: 1800, goal: 2000 },
    { month: 'Apr', amount: 2200, goal: 2000 },
    { month: 'May', amount: 2800, goal: 2000 },
    { month: 'Jun', amount: 3200, goal: 2000 },
  ];

  const weeklySpending = [
    { week: 'W1', needs: 500, wants: 300, savings: 200 },
    { week: 'W2', needs: 550, wants: 250, savings: 200 },
    { week: 'W3', needs: 480, wants: 320, savings: 200 },
    { week: 'W4', needs: 520, wants: 280, savings: 200 },
  ];

  const expenseData = [
    { name: 'Housing', value: 35, color: '#3B82F6' },
    { name: 'Food', value: 20, color: '#10B981' },
    { name: 'Transport', value: 15, color: '#8B5CF6' },
    { name: 'Entertainment', value: 12, color: '#F59E0B' },
    { name: 'Shopping', value: 10, color: '#EF4444' },
    { name: 'Others', value: 8, color: '#6B7280' },
  ];

  const savingsGoal = {
    name: 'Diamond Sword PC',
    current: 3200,
    target: 5000,
  };

  const progress = (savingsGoal.current / savingsGoal.target) * 100;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="pixel-border border-emerald-500 rounded-xl p-4 bg-gray-800/50 glow-emerald">
          <Trophy className="w-8 h-8 text-emerald-500 mb-2" />
          <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: 'var(--font-pixel)' }}>Level</p>
          <p className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-pixel)' }}>{userLevel}</p>
          <p className="text-[10px] text-emerald-500 mt-1" style={{ fontFamily: 'var(--font-pixel)' }}>{userPoints} XP</p>
        </div>

        <div className="pixel-border border-orange-500 rounded-xl p-4 bg-gray-800/50 glow-orange">
          <Flame className="w-8 h-8 text-orange-500 mb-2" />
          <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: 'var(--font-pixel)' }}>Streak</p>
          <p className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-pixel)' }}>{streak}</p>
          <p className="text-[10px] text-orange-500 mt-1" style={{ fontFamily: 'var(--font-pixel)' }}>Days Active</p>
        </div>

        <div className="pixel-border border-purple-500 rounded-xl p-4 bg-gray-800/50 glow-purple">
          <Award className="w-8 h-8 text-purple-500 mb-2" />
          <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: 'var(--font-pixel)' }}>Badges</p>
          <p className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-pixel)' }}>{badges.length}</p>
          <p className="text-[10px] text-purple-500 mt-1" style={{ fontFamily: 'var(--font-pixel)' }}>Unlocked</p>
        </div>

        <div className="pixel-border border-blue-500 rounded-xl p-4 bg-gray-800/50 glow-blue">
          <PiggyBank className="w-8 h-8 text-blue-500 mb-2" />
          <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: 'var(--font-pixel)' }}>Savings</p>
          <p className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-pixel)' }}>{Math.round(progress)}%</p>
          <p className="text-[10px] text-blue-500 mt-1" style={{ fontFamily: 'var(--font-pixel)' }}>Goal Reached</p>
        </div>
      </div>

      {/* Savings Goal Quest */}
      <div className="pixel-border border-emerald-500 rounded-xl p-6 bg-gray-800/50 glow-emerald">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm md:text-base text-white" style={{ fontFamily: 'var(--font-pixel)' }}>
            ⚔️ Savings Quest
          </h2>
          <PiggyBank className="w-6 h-6 text-emerald-500" />
        </div>
        <p className="text-xs text-gray-400 mb-3" style={{ fontFamily: 'var(--font-pixel)' }}>
          {savingsGoal.name}
        </p>
        <div className="relative w-full h-8 bg-gray-700 rounded-lg overflow-hidden mb-3 pixel-border border-gray-600">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-white z-10" style={{ fontFamily: 'var(--font-pixel)' }}>
              {Math.round(progress)}%
            </span>
          </div>
        </div>
        <div className="flex justify-between text-[10px]" style={{ fontFamily: 'var(--font-pixel)' }}>
          <span className="text-emerald-500">${savingsGoal.current}</span>
          <span className="text-gray-400">Target: ${savingsGoal.target}</span>
        </div>
        <p className="text-[10px] text-orange-500 mt-2" style={{ fontFamily: 'var(--font-pixel)' }}>
          ${savingsGoal.target - savingsGoal.current} remaining
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Area Chart - Savings History */}
        <div className="pixel-border border-blue-500 rounded-xl p-4 md:p-6 bg-gray-800/50 glow-blue">
          <h3 className="text-xs md:text-sm text-white mb-4" style={{ fontFamily: 'var(--font-pixel)' }}>
            📈 6-Month Savings
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={savingsData}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: '10px' }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '10px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '2px solid #10B981',
                  borderRadius: '8px',
                  fontSize: '10px'
                }} 
              />
              <Area type="monotone" dataKey="amount" stroke="#10B981" fillOpacity={1} fill="url(#colorAmount)" />
              <Area type="monotone" dataKey="goal" stroke="#F59E0B" strokeDasharray="5 5" fill="none" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Weekly Spending */}
        <div className="pixel-border border-purple-500 rounded-xl p-4 md:p-6 bg-gray-800/50 glow-purple">
          <h3 className="text-xs md:text-sm text-white mb-4" style={{ fontFamily: 'var(--font-pixel)' }}>
            📊 Weekly Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklySpending}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="week" stroke="#9CA3AF" style={{ fontSize: '10px' }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '10px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '2px solid #8B5CF6',
                  borderRadius: '8px',
                  fontSize: '10px'
                }} 
              />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              <Bar dataKey="needs" fill="#3B82F6" />
              <Bar dataKey="wants" fill="#8B5CF6" />
              <Bar dataKey="savings" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Expense Breakdown */}
        <div className="pixel-border border-orange-500 rounded-xl p-4 md:p-6 bg-gray-800/50 glow-orange">
          <h3 className="text-xs md:text-sm text-white mb-4" style={{ fontFamily: 'var(--font-pixel)' }}>
            🥧 Expense Categories
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
                style={{ fontSize: '8px' }}
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '2px solid #F59E0B',
                  borderRadius: '8px',
                  fontSize: '10px'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Info Card */}
        <div className="pixel-border border-yellow-500 rounded-xl p-4 md:p-6 bg-gray-800/50 glow-orange">
          <h3 className="text-xs md:text-sm text-white mb-4" style={{ fontFamily: 'var(--font-pixel)' }}>
            💡 Tips & Achievements
          </h3>
          <div className="space-y-3">
            {badges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2 pixel-border border-yellow-500 rounded-lg p-2 bg-gray-900">
                <Award className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                <span className="text-[10px] text-yellow-500" style={{ fontFamily: 'var(--font-pixel)' }}>
                  {badge}
                </span>
              </div>
            ))}
            <p className="text-[10px] text-gray-400 mt-4" style={{ fontFamily: 'var(--font-pixel)' }}>
              💎 Save 20% of income to unlock &quot;Diamond Saver&quot; badge!
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => setActiveTab('quiz')}
          className="pixel-border border-blue-500 rounded-xl p-4 bg-gray-800/50 hover:bg-gray-700/50 transition-all glow-blue group"
        >
          <Brain className="w-8 h-8 text-blue-500 mb-2 mx-auto" />
          <p className="text-xs text-white mb-1" style={{ fontFamily: 'var(--font-pixel)' }}>Quiz Battle</p>
          <p className="text-[10px] text-gray-400" style={{ fontFamily: 'var(--font-pixel)' }}>Mine Knowledge</p>
        </button>

        <button
          onClick={() => setActiveTab('budget')}
          className="pixel-border border-emerald-500 rounded-xl p-4 bg-gray-800/50 hover:bg-gray-700/50 transition-all glow-emerald group"
        >
          <Wallet className="w-8 h-8 text-emerald-500 mb-2 mx-auto" />
          <p className="text-xs text-white mb-1" style={{ fontFamily: 'var(--font-pixel)' }}>Budget Craft</p>
          <p className="text-[10px] text-gray-400" style={{ fontFamily: 'var(--font-pixel)' }}>Plan Resources</p>
        </button>

        <button
          onClick={() => setActiveTab('future')}
          className="pixel-border border-purple-500 rounded-xl p-4 bg-gray-800/50 hover:bg-gray-700/50 transition-all glow-purple group"
        >
          <TrendingUp className="w-8 h-8 text-purple-500 mb-2 mx-auto" />
          <p className="text-xs text-white mb-1" style={{ fontFamily: 'var(--font-pixel)' }}>Future Sim</p>
          <p className="text-[10px] text-gray-400" style={{ fontFamily: 'var(--font-pixel)' }}>Predict Growth</p>
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className="pixel-border border-orange-500 rounded-xl p-4 bg-gray-800/50 hover:bg-gray-700/50 transition-all glow-orange group"
        >
          <Bot className="w-8 h-8 text-orange-500 mb-2 mx-auto" />
          <p className="text-xs text-white mb-1" style={{ fontFamily: 'var(--font-pixel)' }}>AI Guide</p>
          <p className="text-[10px] text-gray-400" style={{ fontFamily: 'var(--font-pixel)' }}>Ask NPC</p>
        </button>
      </div>
    </div>
  );
}
