'use client';

import { Company, formatCredits } from '@/lib/company-data';
import { MonoLabel } from '@/components/badge';
import { Target, CheckCircle2, AlertCircle } from 'lucide-react';

interface ImpactProgressProps {
  company: Company;
}

export function ImpactProgress({ company }: ImpactProgressProps) {
  const percentage = Math.min(
    100,
    Math.round((company.achievedTarget / company.annualTarget) * 100)
  );
  const remaining = Math.max(0, company.annualTarget - company.achievedTarget);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="card p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MonoLabel color="mint">ANNUAL IMPACT TARGET</MonoLabel>
          <span className="pill pill-mint text-[10px]">FY 2025-26</span>
        </div>
        <Target size={18} className="text-emerald-400" />
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-8">
        {/* SVG Circular Progress Gauge */}
        <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background track */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Progress fill */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              stroke="#10b981"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold text-white stat-value">
              {percentage}%
            </span>
            <span className="text-[10px] text-emerald-400 font-mono font-semibold">
              COMPLETED
            </span>
          </div>
        </div>

        {/* Progress Breakdown Details */}
        <div className="flex-1 w-full flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-gray-800/80 border border-white/10 flex flex-col gap-1">
              <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                Annual Target
              </span>
              <span className="stat-value text-lg font-bold text-white">
                {company.annualTarget.toLocaleString()} tCO₂e
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex flex-col gap-1">
              <span className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 size={12} /> Achieved
              </span>
              <span className="stat-value text-lg font-bold text-emerald-400">
                {company.achievedTarget.toLocaleString()} tCO₂e
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex flex-col gap-1">
              <span className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                <AlertCircle size={12} /> Remaining
              </span>
              <span className="stat-value text-lg font-bold text-amber-400">
                {remaining.toLocaleString()} tCO₂e
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden border border-white/10">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
