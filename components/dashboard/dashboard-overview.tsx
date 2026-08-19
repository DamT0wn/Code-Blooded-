'use client';

import { Company, formatINR, formatCredits } from '@/lib/company-data';
import { MonoLabel } from '@/components/badge';
import {
  LogOut,
  ShoppingBag,
  Zap,
  IndianRupee,
  Leaf,
  Layers,
  Building2,
  CheckCircle2,
} from 'lucide-react';

interface DashboardOverviewProps {
  company: Company;
  onSignOut: () => void;
}

export function DashboardOverview({
  company,
  onSignOut,
}: DashboardOverviewProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Header */}
      <div className="card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gray-800 border border-white/20 flex items-center justify-center text-3xl flex-shrink-0 shadow-lg">
            {company.logo}
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Welcome back, {company.name}
              </h1>
              <span className="pill pill-mint text-[10px]">
                <CheckCircle2 size={10} /> Authenticated
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-300">
              <span className="flex items-center gap-1">
                <Building2 size={12} className="text-gray-400" />
                {company.industry}
              </span>
              <span>·</span>
              <span className="font-mono text-cyan-400">
                {company.email}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onSignOut}
          className="btn-ghost text-xs py-2 px-4 flex-shrink-0"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>

      {/* 5 Main Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Purchased */}
        <div className="card p-5 flex flex-col gap-2 border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between text-gray-400">
            <MonoLabel color="tertiary">PURCHASED</MonoLabel>
            <ShoppingBag size={16} className="text-emerald-400" />
          </div>
          <div className="stat-value text-2xl font-bold text-white">
            {company.creditsPurchased.toLocaleString()}
          </div>
          <p className="text-xs text-gray-400 font-mono">
            tCO₂e Total Purchased
          </p>
        </div>

        {/* Retired */}
        <div className="card p-5 flex flex-col gap-2 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between text-gray-400">
            <MonoLabel color="tertiary">RETIRED</MonoLabel>
            <Zap size={16} className="text-amber-400" />
          </div>
          <div className="stat-value text-2xl font-bold text-amber-400">
            {company.creditsRetired.toLocaleString()}
          </div>
          <p className="text-xs text-gray-400 font-mono">
            tCO₂e Retired Credits
          </p>
        </div>

        {/* Total Spent */}
        <div className="card p-5 flex flex-col gap-2 border-l-4 border-l-cyan-500">
          <div className="flex items-center justify-between text-gray-400">
            <MonoLabel color="tertiary">TOTAL SPENT</MonoLabel>
            <IndianRupee size={16} className="text-cyan-400" />
          </div>
          <div className="stat-value text-xl font-bold text-white">
            {formatINR(company.totalSpentINR)}
          </div>
          <p className="text-xs text-gray-400 font-mono">
            Capital Invested in Credits
          </p>
        </div>

        {/* Carbon Impact */}
        <div className="card p-5 flex flex-col gap-2 border-l-4 border-l-emerald-400">
          <div className="flex items-center justify-between text-gray-400">
            <MonoLabel color="tertiary">CARBON IMPACT</MonoLabel>
            <Leaf size={16} className="text-emerald-400" />
          </div>
          <div className="stat-value text-2xl font-bold text-emerald-400">
            {company.carbonImpact.toLocaleString()}
          </div>
          <p className="text-xs text-gray-400 font-mono">
            tCO₂e Verified Offset
          </p>
        </div>

        {/* Available */}
        <div className="card p-5 flex flex-col gap-2 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between text-gray-400">
            <MonoLabel color="tertiary">AVAILABLE</MonoLabel>
            <Layers size={16} className="text-blue-400" />
          </div>
          <div className="stat-value text-2xl font-bold text-blue-400">
            {company.availableCredits.toLocaleString()}
          </div>
          <p className="text-xs text-gray-400 font-mono">
            tCO₂e Ready to Retire
          </p>
        </div>
      </div>
    </div>
  );
}
