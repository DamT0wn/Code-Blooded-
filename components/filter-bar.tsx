'use client';

import { useState } from 'react';
import { Check, ChevronDown, Filter } from 'lucide-react';

interface FilterState {
  verified: boolean;
  highEvidence: boolean;
  region: string;
  sort: string;
}

interface FilterBarProps {
  value: FilterState;
  onChange: (f: FilterState) => void;
}

const REGIONS = ['All Regions', 'Asia', 'Africa', 'Latin America', 'Europe', 'Oceania', 'North America'];
const SORT_OPTIONS = ['Evidence Score ↓', 'Price: Low → High', 'Price: High → Low', 'Credits Available ↓', 'Newest First'];

export type { FilterState };

export function FilterBar({ value, onChange }: FilterBarProps) {
  const [regionOpen, setRegionOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const toggle = (key: 'verified' | 'highEvidence') => {
    onChange({ ...value, [key]: !value[key] });
  };

  return (
    <div
      className="flex items-center gap-2 flex-wrap"
      style={{ padding: '12px 0' }}
    >
      {/* Filter icon */}
      <span style={{ color: 'var(--color-text-tertiary)' }}>
        <Filter size={14} />
      </span>

      {/* Verified chip */}
      <button
        id="filter-verified"
        className={`filter-chip ${value.verified ? 'active' : ''}`}
        onClick={() => toggle('verified')}
      >
        {value.verified && <Check size={10} />}
        Verified ✓
      </button>

      {/* Evidence ≥ 80 chip */}
      <button
        id="filter-high-evidence"
        className={`filter-chip ${value.highEvidence ? 'active' : ''}`}
        onClick={() => toggle('highEvidence')}
      >
        {value.highEvidence && <Check size={10} />}
        Evidence ≥ 80
      </button>

      {/* Region dropdown */}
      <div className="relative">
        <button
          id="filter-region"
          className="filter-chip"
          onClick={() => { setRegionOpen(!regionOpen); setSortOpen(false); }}
        >
          {value.region === 'All Regions' ? 'Region' : value.region}
          <ChevronDown size={10} style={{ transform: regionOpen ? 'rotate(180deg)' : 'none', transition: '150ms' }} />
        </button>
        {regionOpen && (
          <div
            className="absolute top-full mt-1 left-0 z-20 card"
            style={{ minWidth: 160, boxShadow: '0 16px 40px rgba(0,0,0,0.6)' }}
          >
            {REGIONS.map((r) => (
              <button
                key={r}
                className="w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between"
                style={{
                  color: value.region === r ? 'var(--color-mint)' : 'var(--color-text-secondary)',
                  background: value.region === r ? 'rgba(52,211,153,0.06)' : 'transparent',
                }}
                onClick={() => { onChange({ ...value, region: r }); setRegionOpen(false); }}
                onMouseEnter={(e) => { if (value.region !== r) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)'; }}
                onMouseLeave={(e) => { if (value.region !== r) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
              >
                {r}
                {value.region === r && <Check size={12} />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sort dropdown */}
      <div className="relative">
        <button
          id="filter-sort"
          className="filter-chip"
          onClick={() => { setSortOpen(!sortOpen); setRegionOpen(false); }}
        >
          {value.sort}
          <ChevronDown size={10} style={{ transform: sortOpen ? 'rotate(180deg)' : 'none', transition: '150ms' }} />
        </button>
        {sortOpen && (
          <div
            className="absolute top-full mt-1 left-0 z-20 card"
            style={{ minWidth: 200, boxShadow: '0 16px 40px rgba(0,0,0,0.6)' }}
          >
            {SORT_OPTIONS.map((s) => (
              <button
                key={s}
                className="w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between"
                style={{
                  color: value.sort === s ? 'var(--color-mint)' : 'var(--color-text-secondary)',
                  background: value.sort === s ? 'rgba(52,211,153,0.06)' : 'transparent',
                }}
                onClick={() => { onChange({ ...value, sort: s }); setSortOpen(false); }}
                onMouseEnter={(e) => { if (value.sort !== s) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)'; }}
                onMouseLeave={(e) => { if (value.sort !== s) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
              >
                {s}
                {value.sort === s && <Check size={12} />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
