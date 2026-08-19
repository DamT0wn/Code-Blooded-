'use client';

import { useState } from 'react';
import { Search, Building2, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { COMPANIES, Company } from '@/lib/company-data';
import { MonoLabel } from '@/components/badge';

interface CompanyListProps {
  onSelectCompany: (company: Company) => void;
}

export function CompanyList({ onSelectCompany }: CompanyListProps) {
  const [search, setSearch] = useState('');

  const filtered = COMPANIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header banner */}
      <div className="card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <MonoLabel color="mint">B2B ENTERPRISE PORTAL</MonoLabel>
            <span className="pill pill-mint text-[10px]">AUTH REQUIRED</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Select Your Organization to Access Dashboard
          </h2>
          <p className="text-sm text-gray-300">
            Public directory of registered climate-committed organizations. Authentication required for private credit data.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex-shrink-0">
          <ShieldCheck size={14} />
          <span>256-Bit Encrypted</span>
        </div>
      </div>

      {/* Search input */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by company name or industry..."
          className="w-full pl-11 pr-4 py-3 bg-gray-900/90 border border-white/15 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      {/* Company Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((company) => (
          <div
            key={company.id}
            className="card card-hover card-hover-mint p-5 flex flex-col justify-between gap-4"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                {/* Logo avatar */}
                <div className="w-12 h-12 rounded-xl bg-gray-800 border border-white/15 flex items-center justify-center text-2xl flex-shrink-0">
                  {company.logo}
                </div>
                <span className="pill pill-mint text-[10px]">Verified ✓</span>
              </div>

              <div>
                <h3 className="font-semibold text-white text-base leading-tight">
                  {company.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <Building2 size={12} className="flex-shrink-0" />
                  {company.industry}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-gray-400 font-mono">
                {company.creditsPurchased.toLocaleString()} tCO₂e
              </span>
              <button
                onClick={() => onSelectCompany(company)}
                className="btn-primary text-xs py-1.5 px-3"
              >
                <Lock size={12} />
                Login
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
