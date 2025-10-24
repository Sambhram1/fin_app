'use client';

import { useState } from 'react';
import { TrendingUp, Sparkles } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function FutureSimulator() {
  const [monthlySaving, setMonthlySaving] = useState(200);
  const [months, setMonths] = useState(12);
  const [interestRate, setInterestRate] = useState(5);

  const calculateFutureValue = () => {
    const monthlyRate = interestRate / 100 / 12;
    const futureValue = monthlySaving * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    return futureValue;
  };

  const generateChartData = () => {
    const data = [];
    const monthlyRate = interestRate / 100 / 12;
    
    for (let month = 0; month <= months; month++) {
      const futureValue = monthlySaving * ((Math.pow(1 + monthlyRate, month) - 1) / monthlyRate) * (1 + monthlyRate);
      data.push({
        month: `M${month}`,
        amount: month === 0 ? 0 : Math.round(futureValue)
      });
    }
    return data;
  };

  const futureValue = calculateFutureValue();
  const chartData = generateChartData();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="pixel-border border-purple-500 rounded-2xl p-6 bg-gray-800/50 glow-purple">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base md:text-lg text-white" style={{ fontFamily: 'var(--font-pixel)' }}>
            🔮 Future Simulator
          </h2>
          <TrendingUp className="w-6 h-6 text-purple-500" />
        </div>
        <p className="text-xs text-gray-400" style={{ fontFamily: 'var(--font-pixel)' }}>
          Predict your financial growth with compound magic
        </p>
      </div>

      {/* Input Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="pixel-border border-blue-500 rounded-xl p-4 md:p-6 bg-gray-800/50 glow-blue">
          <label className="block text-xs text-gray-400 mb-3" style={{ fontFamily: 'var(--font-pixel)' }}>
            💰 Monthly Saving
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-blue-500">$</span>
            <input
              type="number"
              value={monthlySaving}
              onChange={(e) => setMonthlySaving(Number(e.target.value))}
              className="w-full pl-8 pr-3 py-3 bg-gray-700 pixel-border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              style={{ fontFamily: 'var(--font-pixel)' }}
              min="0"
            />
          </div>
        </div>

        <div className="pixel-border border-emerald-500 rounded-xl p-4 md:p-6 bg-gray-800/50 glow-emerald">
          <label className="block text-xs text-gray-400 mb-3" style={{ fontFamily: 'var(--font-pixel)' }}>
            📅 Number of Months
          </label>
          <input
            type="number"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full px-3 py-3 bg-gray-700 pixel-border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
            style={{ fontFamily: 'var(--font-pixel)' }}
            min="1"
            max="360"
          />
        </div>

        <div className="pixel-border border-orange-500 rounded-xl p-4 md:p-6 bg-gray-800/50 glow-orange">
          <label className="block text-xs text-gray-400 mb-3" style={{ fontFamily: 'var(--font-pixel)' }}>
            📈 Interest Rate (%)
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full px-3 py-3 bg-gray-700 pixel-border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
            style={{ fontFamily: 'var(--font-pixel)' }}
            step="0.1"
            min="0"
            max="100"
          />
        </div>
      </div>

      {/* Future Value Card */}
      <div className="pixel-border border-purple-500 rounded-2xl p-8 bg-gradient-to-br from-purple-900/50 to-pink-900/50 glow-purple text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-purple-400" />
          <h3 className="text-sm text-purple-400" style={{ fontFamily: 'var(--font-pixel)' }}>
            Future Diamond Value
          </h3>
        </div>
        <p className="text-4xl md:text-5xl text-white mb-4" style={{ fontFamily: 'var(--font-pixel)' }}>
          ${futureValue.toFixed(2)}
        </p>
        <p className="text-xs text-purple-300" style={{ fontFamily: 'var(--font-pixel)' }}>
          After {months} months at {interestRate}% annual interest
        </p>
      </div>

      {/* Growth Chart */}
      <div className="pixel-border border-blue-500 rounded-2xl p-4 md:p-6 bg-gray-800/50 glow-blue">
        <h3 className="text-sm md:text-base text-white mb-4" style={{ fontFamily: 'var(--font-pixel)' }}>
          📈 Growth Projection
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="colorPurple" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="month" 
              stroke="#9CA3AF" 
              style={{ fontSize: '10px' }}
            />
            <YAxis 
              stroke="#9CA3AF" 
              style={{ fontSize: '10px' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '2px solid #8B5CF6',
                borderRadius: '8px',
                fontSize: '10px',
                fontFamily: 'var(--font-pixel)'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#8B5CF6" 
              strokeWidth={3}
              dot={{ fill: '#8B5CF6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="pixel-border border-emerald-500 rounded-xl p-4 bg-gray-800/50 glow-emerald">
          <h4 className="text-xs text-emerald-500 mb-3" style={{ fontFamily: 'var(--font-pixel)' }}>
            💡 Compound Magic
          </h4>
          <p className="text-[10px] text-gray-400 leading-relaxed" style={{ fontFamily: 'var(--font-pixel)' }}>
            Your money grows exponentially! Interest earns interest, creating a snowball effect. Start early to maximize your diamond fortress!
          </p>
        </div>

        <div className="pixel-border border-yellow-500 rounded-xl p-4 bg-gray-800/50 glow-orange">
          <h4 className="text-xs text-yellow-500 mb-3" style={{ fontFamily: 'var(--font-pixel)' }}>
            🎯 Pro Strategy
          </h4>
          <p className="text-[10px] text-gray-400 leading-relaxed" style={{ fontFamily: 'var(--font-pixel)' }}>
            Even small monthly contributions add up! ${monthlySaving}/month = ${(monthlySaving * 12).toFixed(0)}/year. Time is your greatest weapon!
          </p>
        </div>
      </div>
    </div>
  );
}
