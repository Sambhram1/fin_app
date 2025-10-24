'use client';

import { useState } from 'react';
import { Wallet, TrendingUp, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BudgetCrafter() {
  const [income, setIncome] = useState(3000);

  const needs = income * 0.5;
  const wants = income * 0.3;
  const savings = income * 0.2;

  const spendData = [
    { category: 'Housing', amount: 800, percent: (800 / income) * 100, color: '#3B82F6' },
    { category: 'Food', amount: 500, percent: (500 / income) * 100, color: '#10B981' },
    { category: 'Transport', amount: 300, percent: (300 / income) * 100, color: '#8B5CF6' },
    { category: 'Entertainment', amount: 250, percent: (250 / income) * 100, color: '#F59E0B' },
    { category: 'Shopping', amount: 200, percent: (200 / income) * 100, color: '#EF4444' },
    { category: 'Others', amount: 150, percent: (150 / income) * 100, color: '#6B7280' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="pixel-border border-emerald-500 rounded-2xl p-6 bg-gray-800/50 glow-emerald">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base md:text-lg text-white" style={{ fontFamily: 'var(--font-pixel)' }}>
            💰 Budget Crafter
          </h2>
          <Wallet className="w-6 h-6 text-emerald-500" />
        </div>
        <p className="text-xs text-gray-400" style={{ fontFamily: 'var(--font-pixel)' }}>
          Craft your financial plan with the 50-30-20 rule
        </p>
      </div>

      {/* Income Input */}
      <div className="pixel-border border-blue-500 rounded-2xl p-6 bg-gray-800/50 glow-blue">
        <label className="block text-xs text-gray-400 mb-3" style={{ fontFamily: 'var(--font-pixel)' }}>
          💵 Monthly Income
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-emerald-500">$</span>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="w-full pl-10 pr-4 py-4 bg-gray-700 pixel-border border-gray-600 rounded-xl text-white text-lg focus:border-emerald-500 focus:outline-none"
            style={{ fontFamily: 'var(--font-pixel)' }}
            min="0"
          />
        </div>
      </div>

      {/* 50-30-20 Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Needs - 50% */}
        <div className="pixel-border border-blue-500 rounded-2xl p-6 bg-gray-800/50 glow-blue">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-400" style={{ fontFamily: 'var(--font-pixel)' }}>
              🏠 NEEDS
            </span>
            <span className="text-xs text-blue-500" style={{ fontFamily: 'var(--font-pixel)' }}>
              50%
            </span>
          </div>
          <p className="text-2xl text-white mb-4" style={{ fontFamily: 'var(--font-pixel)' }}>
            ${needs.toFixed(0)}
          </p>
          <div className="w-full h-3 bg-gray-700 rounded-lg overflow-hidden pixel-border border-gray-600">
            <div className="h-full bg-blue-500" style={{ width: '50%' }} />
          </div>
          <p className="text-[10px] text-gray-400 mt-2" style={{ fontFamily: 'var(--font-pixel)' }}>
            Housing, food, utilities, transport
          </p>
        </div>

        {/* Wants - 30% */}
        <div className="pixel-border border-purple-500 rounded-2xl p-6 bg-gray-800/50 glow-purple">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-400" style={{ fontFamily: 'var(--font-pixel)' }}>
              🎮 WANTS
            </span>
            <span className="text-xs text-purple-500" style={{ fontFamily: 'var(--font-pixel)' }}>
              30%
            </span>
          </div>
          <p className="text-2xl text-white mb-4" style={{ fontFamily: 'var(--font-pixel)' }}>
            ${wants.toFixed(0)}
          </p>
          <div className="w-full h-3 bg-gray-700 rounded-lg overflow-hidden pixel-border border-gray-600">
            <div className="h-full bg-purple-500" style={{ width: '30%' }} />
          </div>
          <p className="text-[10px] text-gray-400 mt-2" style={{ fontFamily: 'var(--font-pixel)' }}>
            Entertainment, dining, hobbies
          </p>
        </div>

        {/* Savings - 20% */}
        <div className="pixel-border border-emerald-500 rounded-2xl p-6 bg-gray-800/50 glow-emerald">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-400" style={{ fontFamily: 'var(--font-pixel)' }}>
              💎 SAVINGS
            </span>
            <span className="text-xs text-emerald-500" style={{ fontFamily: 'var(--font-pixel)' }}>
              20%
            </span>
          </div>
          <p className="text-2xl text-white mb-4" style={{ fontFamily: 'var(--font-pixel)' }}>
            ${savings.toFixed(0)}
          </p>
          <div className="w-full h-3 bg-gray-700 rounded-lg overflow-hidden pixel-border border-gray-600">
            <div className="h-full bg-emerald-500" style={{ width: '20%' }} />
          </div>
          <p className="text-[10px] text-gray-400 mt-2" style={{ fontFamily: 'var(--font-pixel)' }}>
            Emergency fund, investments
          </p>
        </div>
      </div>

      {/* Spend Analyzer */}
      <div className="pixel-border border-orange-500 rounded-2xl p-6 bg-gray-800/50 glow-orange">
        <h3 className="text-sm md:text-base text-white mb-4" style={{ fontFamily: 'var(--font-pixel)' }}>
          📊 Spend Analyzer
        </h3>
        <div className="space-y-3">
          {spendData.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400" style={{ fontFamily: 'var(--font-pixel)' }}>
                  {item.category}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white" style={{ fontFamily: 'var(--font-pixel)' }}>
                    ${item.amount}
                  </span>
                  <span className="text-[10px] text-gray-500" style={{ fontFamily: 'var(--font-pixel)' }}>
                    {item.percent.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-lg overflow-hidden">
                <div 
                  className="h-full transition-all duration-300" 
                  style={{ 
                    width: `${item.percent}%`,
                    backgroundColor: item.color
                  }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="pixel-border border-yellow-500 rounded-xl p-4 bg-gray-800/50 glow-orange">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-xs text-yellow-500 mb-2" style={{ fontFamily: 'var(--font-pixel)' }}>
                💡 Pro Tip
              </h4>
              <p className="text-[10px] text-gray-400" style={{ fontFamily: 'var(--font-pixel)' }}>
                Track every diamond! Small expenses add up. Use the 50-30-20 rule to maintain balance.
              </p>
            </div>
          </div>
        </div>

        <div className="pixel-border border-emerald-500 rounded-xl p-4 bg-gray-800/50 glow-emerald">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-xs text-emerald-500 mb-2" style={{ fontFamily: 'var(--font-pixel)' }}>
                🎯 Goal
              </h4>
              <p className="text-[10px] text-gray-400" style={{ fontFamily: 'var(--font-pixel)' }}>
                Save 20% consistently to build your diamond fortress and unlock financial freedom!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
