'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '@/components/app-shell';
import { ProjectCard } from '@/components/project-card';
import { FilterBar, FilterState } from '@/components/filter-bar';
import { StatRow } from '@/components/stat-row';
import { MonoLabel } from '@/components/badge';
import { BuyModal } from '@/components/buy-modal';
import { PROJECTS, DASHBOARD_STATS, Project } from '@/lib/mock-data';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

export default function MarketplacePage() {
  const [filters, setFilters] = useState<FilterState>({
    verified: true,
    highEvidence: false,
    region: 'All Regions',
    sort: 'Evidence Score ↓',
  });
  const [buyProject, setBuyProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handler = (e: Event) => {
      setBuyProject((e as CustomEvent<Project>).detail);
    };
    window.addEventListener('open-buy-modal', handler);
    return () => window.removeEventListener('open-buy-modal', handler);
  }, []);

  // Filter
  let filtered = [...PROJECTS];
  if (filters.verified) filtered = filtered.filter((p) => p.status === 'VERIFIED');
  if (filters.highEvidence) filtered = filtered.filter((p) => p.evidenceScore >= 80);
  if (filters.region !== 'All Regions') filtered = filtered.filter((p) => p.region === filters.region);

  // Sort
  switch (filters.sort) {
    case 'Evidence Score ↓':
      filtered.sort((a, b) => b.evidenceScore - a.evidenceScore);
      break;
    case 'Price: Low → High':
      filtered.sort((a, b) => a.pricePerCredit - b.pricePerCredit);
      break;
    case 'Price: High → Low':
      filtered.sort((a, b) => b.pricePerCredit - a.pricePerCredit);
      break;
    case 'Credits Available ↓':
      filtered.sort((a, b) => b.creditsAvailable - a.creditsAvailable);
      break;
    case 'Newest First':
      filtered.sort((a, b) => new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime());
      break;
  }

  return (
    <AppShell>
      <div className="container-max py-10">
        {/* ── Page Header ── */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <MonoLabel color="tertiary">MARKETPLACE</MonoLabel>
            <h1
              className="font-bold tracking-tight"
              style={{ fontSize: 'clamp(28px, 3vw, 40px)', color: 'var(--color-text-primary)' }}
            >
              Verified Carbon Credits
            </h1>
          </div>
          {/* Live count badge */}
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl flex-shrink-0"
            style={{
              background: 'rgba(52,211,153,0.08)',
              border: '1px solid rgba(52,211,153,0.25)',
            }}
          >
            <TrendingUp size={14} color="var(--color-mint)" />
            <span
              className="stat-value font-bold"
              style={{ color: 'var(--color-mint)', fontSize: 14 }}
            >
              ▲ {DASHBOARD_STATS.liveProjects} live
            </span>
          </div>
        </div>

        {/* ── Filter bar ── */}
        <div
          className="mb-6 pb-4"
          style={{ borderBottom: '1px solid var(--border-hairline)' }}
        >
          <FilterBar value={filters} onChange={setFilters} />
        </div>

        {/* ── Main content: grid + right rail ── */}
        <div className="flex gap-6 items-start">
          {/* Left: project grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div
                className="card flex flex-col items-center gap-4 py-16 text-center"
              >
                <p style={{ color: 'var(--color-text-tertiary)' }}>No projects match these filters.</p>
                <button
                  className="btn-ghost"
                  onClick={() => setFilters({ verified: false, highEvidence: false, region: 'All Regions', sort: 'Evidence Score ↓' })}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                {/* Result count */}
                <div className="mb-4">
                  <span className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
                    {filtered.length} project{filtered.length !== 1 ? 's' : ''} found
                  </span>
                </div>

                <div className="grid lg:grid-cols-2 gap-4">
                  {filtered.map((project, i) => (
                    <div
                      key={project.id}
                      style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'none' : 'translateY(16px)',
                        transition: `opacity 400ms ease ${i * 60}ms, transform 400ms ease ${i * 60}ms`,
                      }}
                    >
                      <ProjectCard project={project} index={i} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right: dashboard rail */}
          <aside
            className="hidden xl:flex flex-col gap-4 sticky top-24"
            style={{ width: 280, flexShrink: 0 }}
          >
            {/* Verification dashboard */}
            <div className="card p-5 flex flex-col gap-1">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: 'var(--color-mint)', animation: 'var(--animate-pulse-glow)' }}
                />
                <MonoLabel color="tertiary">VERIFICATION DASHBOARD</MonoLabel>
              </div>

              <StatRow
                label="Live projects"
                value={DASHBOARD_STATS.liveProjects}
                color="mint"
              />
              <StatRow
                label="Avg evidence score"
                value={`${DASHBOARD_STATS.avgEvidenceScore}/100`}
                color="cyan"
              />
              <StatRow
                label="Pending re-verification"
                value={DASHBOARD_STATS.pendingReVerification}
                color="amber"
              />
              <StatRow
                label="Retired this month"
                value={`${DASHBOARD_STATS.retiredThisMonth.toLocaleString()} tCO₂e`}
                color="primary"
              />
            </div>

            {/* Filter summary */}
            {(filters.verified || filters.highEvidence || filters.region !== 'All Regions') && (
              <div className="card p-4 flex flex-col gap-3">
                <MonoLabel color="tertiary">ACTIVE FILTERS</MonoLabel>
                <div className="flex flex-wrap gap-1.5">
                  {filters.verified && (
                    <span className="pill pill-mint text-xs">Verified ✓</span>
                  )}
                  {filters.highEvidence && (
                    <span className="pill pill-cyan text-xs">Evidence ≥ 80</span>
                  )}
                  {filters.region !== 'All Regions' && (
                    <span className="pill pill-dim text-xs">{filters.region}</span>
                  )}
                </div>
                <button
                  className="text-xs"
                  style={{ color: 'var(--color-text-tertiary)', textAlign: 'left' }}
                  onClick={() => setFilters({ verified: false, highEvidence: false, region: 'All Regions', sort: 'Evidence Score ↓' })}
                >
                  Clear all filters →
                </button>
              </div>
            )}

            {/* Trust note */}
            <div
              className="p-4 rounded-xl text-xs leading-relaxed"
              style={{
                background: 'rgba(52,211,153,0.04)',
                border: '1px solid rgba(52,211,153,0.15)',
                color: 'var(--color-text-tertiary)',
                fontStyle: 'italic',
              }}
            >
              Evidence scores reflect satellite and MRV data quality — not the carbon credit's
              registration status. Always check the passport before purchasing.
            </div>
          </aside>
        </div>
      </div>

      {/* Buy modal */}
      <BuyModal project={buyProject} onClose={() => setBuyProject(null)} />
    </AppShell>
  );
}
