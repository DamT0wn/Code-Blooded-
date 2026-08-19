'use client';

import { Company } from '@/lib/company-data';
import { MonoLabel } from '@/components/badge';
import { TrendingUp } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface ImpactChartProps {
  company: Company;
}

export function ImpactChart({ company }: ImpactChartProps) {
  return (
    <div className="card p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MonoLabel color="cyan">IMPACT OVER TIME</MonoLabel>
          <span className="pill pill-cyan text-[10px]">MONTHLY OFFSET TRAJECTORY</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
          <TrendingUp size={14} />
          <span>+24.8% YoY</span>
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={company.monthlyProgress}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="mintGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis
              dataKey="month"
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#9ca3af"
              fontSize={11}
              tickLine={false}
              tickFormatter={(v) => `${v / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#111827',
                borderColor: 'rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
              }}
              formatter={(value: any) => [`${value} tCO₂e`, 'Cumulative Offset']}
            />
            <Area
              type="monotone"
              dataKey="offset"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#mintGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
