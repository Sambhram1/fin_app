'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { PiggyBank, TrendingUp, Award, Zap, Loader2 } from 'lucide-react';

interface LoginPageProps {
  onLogin: (name: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        // Sign up
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username: username,
            },
          },
        });

        if (signUpError) throw signUpError;

        if (data.user) {
          // Create profile
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              username: username,
              xp: 0,
              level: 1,
              streak: 0,
            });

          if (profileError) throw profileError;

          onLogin(username);
        }
      } else {
        // Sign in
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        if (data.user) {
          // Fetch profile to get username
          const { data: profile } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', data.user.id)
            .single();

          onLogin(profile?.username || 'Player');
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-block pixel-border border-emerald-500 rounded-2xl p-6 bg-emerald-500/10 glow-emerald mb-6">
            <PiggyBank className="w-16 h-16 text-emerald-500" />
          </div>
          <h1 className="text-2xl md:text-3xl text-emerald-500 mb-2" style={{ fontFamily: 'var(--font-pixel)' }}>
            FinBuddy
          </h1>
          <p className="text-xs md:text-sm text-gray-400" style={{ fontFamily: 'var(--font-pixel)' }}>
            Mine Your Financial Future
          </p>
        </div>

        {/* Login/SignUp Form */}
        <div className="pixel-border border-gray-700 rounded-2xl p-6 md:p-8 bg-gray-800/50 glow-emerald mb-8">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 px-4 py-3 rounded-lg text-xs transition-all ${
                !isSignUp
                  ? 'bg-emerald-500 text-white pixel-border border-emerald-400'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              style={{ fontFamily: 'var(--font-pixel)' }}
            >
              Login
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 px-4 py-3 rounded-lg text-xs transition-all ${
                isSignUp
                  ? 'bg-emerald-500 text-white pixel-border border-emerald-400'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              style={{ fontFamily: 'var(--font-pixel)' }}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs text-gray-400 mb-2" style={{ fontFamily: 'var(--font-pixel)' }}>
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none text-sm"
                  placeholder="Steve"
                  required={isSignUp}
                  disabled={loading}
                  style={{ fontFamily: 'var(--font-pixel)' }}
                />
              </div>
            )}
            
            <div>
              <label className="block text-xs text-gray-400 mb-2" style={{ fontFamily: 'var(--font-pixel)' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none text-sm"
                placeholder="steve@minecraft.com"
                required
                disabled={loading}
                style={{ fontFamily: 'var(--font-pixel)' }}
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-2" style={{ fontFamily: 'var(--font-pixel)' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none text-sm"
                placeholder="••••••••"
                required
                disabled={loading}
                minLength={6}
                style={{ fontFamily: 'var(--font-pixel)' }}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border-2 border-red-500 rounded-lg">
                <p className="text-xs text-red-500" style={{ fontFamily: 'var(--font-pixel)' }}>
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg pixel-border border-emerald-400 glow-emerald transition-all text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ fontFamily: 'var(--font-pixel)' }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isSignUp ? 'Creating...' : 'Logging in...'}</span>
                </>
              ) : (
                <span>{isSignUp ? '⛏️ Mine Your Account' : '🗡️ Enter World'}</span>
              )}
            </button>
          </form>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="pixel-border border-emerald-500 rounded-xl p-3 bg-gray-800/50 text-center">
            <PiggyBank className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
            <p className="text-[10px] text-gray-300" style={{ fontFamily: 'var(--font-pixel)' }}>
              Save Diamonds
            </p>
          </div>
          <div className="pixel-border border-blue-500 rounded-xl p-3 bg-gray-800/50 text-center">
            <TrendingUp className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-[10px] text-gray-300" style={{ fontFamily: 'var(--font-pixel)' }}>
              Earn XP
            </p>
          </div>
          <div className="pixel-border border-purple-500 rounded-xl p-3 bg-gray-800/50 text-center">
            <Award className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <p className="text-[10px] text-gray-300" style={{ fontFamily: 'var(--font-pixel)' }}>
              Get Badges
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
