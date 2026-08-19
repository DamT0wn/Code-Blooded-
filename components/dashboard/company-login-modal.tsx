'use client';

import { useState } from 'react';
import { X, Lock, KeyRound, AlertCircle, ShieldCheck } from 'lucide-react';
import { Company } from '@/lib/company-data';

interface CompanyLoginModalProps {
  company: Company | null;
  onClose: () => void;
  onLoginSuccess: (company: Company) => void;
}

export function CompanyLoginModal({
  company,
  onClose,
  onLoginSuccess,
}: CompanyLoginModalProps) {
  const [email, setEmail] = useState(company?.email || '');
  const [password, setPassword] = useState('demo1234');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!company) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter valid company credentials.');
      return;
    }
    setError('');
    setLoading(true);

    // Simulate Supabase authentication verification
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(company);
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(5, 8, 14, 0.88)', backdropFilter: 'blur(10px)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="card relative w-full max-w-md p-6 bg-gray-900 border border-white/20 shadow-2xl rounded-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gray-800 border border-white/15 flex items-center justify-center text-2xl flex-shrink-0">
            {company.logo}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-400 font-mono uppercase tracking-wider">
                SUPABASE AUTH PORTAL
              </span>
            </div>
            <h2 className="text-xl font-bold text-white leading-tight">
              {company.name}
            </h2>
            <p className="text-xs text-gray-400">{company.industry}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle size={14} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-300">
              Company Email / ID
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-gray-800 border border-white/15 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-gray-300">
                Password
              </label>
              <button
                type="button"
                onClick={() => alert('Demo Password is: demo1234')}
                className="text-[11px] text-emerald-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-gray-800 border border-white/15 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2">
            <ShieldCheck size={14} className="flex-shrink-0 mt-0.5" />
            <span>
              Mock Supabase Auth pre-configured for prototype evaluation. Click Login to access scoped company data.
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center py-2.5 mt-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-emerald-950 border-t-transparent animate-spin" />
                Authenticating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Lock size={14} />
                Authenticate &amp; Access Dashboard
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
