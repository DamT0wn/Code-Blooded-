'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, CheckCircle2, Satellite, FileText, ShieldCheck, Brain,
  QrCode, ExternalLink, Wallet, Copy, Check
} from 'lucide-react';
import { AppShell } from '@/components/app-shell';
import { Badge, MonoLabel, CategoryTag } from '@/components/badge';
import { EvidenceScoreBar } from '@/components/evidence-score-bar';
import { TimelineStepper } from '@/components/timeline-stepper';
import { BeforeAfterSlider } from '@/components/before-after-slider';
import { LedgerBlockFlow, BatchHolderBar } from '@/components/ledger-block-flow';
import {
  PROJECTS, EVIDENCE_REPORTS, LEDGER_EVENTS, CREDIT_BATCHES,
  getProjectById, getEvidenceReport, getLedgerEvents, getCreditBatch,
} from '@/lib/mock-data';

type Tab = 'overview' | 'evidence' | 'ledger';

const LIFECYCLE_STEPS = (verifiedDate: string) => [
  { label: 'Verified', description: 'Third-party MRV signoff', color: 'mint' as const, date: verifiedDate },
  { label: 'Sold', description: 'Initial custody transfer', color: 'cyan' as const, date: '2023-05-14' },
  { label: 'Transferred', description: 'B2B settlement', color: 'cyan' as const, date: '2023-07-01' },
  { label: 'Retired', description: 'Final offset claim', color: 'amber' as const, date: '2023-07-30' },
];

const EVIDENCE_BUNDLE = (report: NonNullable<ReturnType<typeof getEvidenceReport>>) => [
  {
    icon: <Satellite size={14} />,
    label: 'Satellite Time-Series',
    detail: `${report.satelliteScenes} scenes · ${report.satelliteDateRange}`,
    status: 'confirmed' as const,
  },
  {
    icon: <FileText size={14} />,
    label: `MRV Report ${report.mrvVersion}`,
    detail: `${report.mrvSigned ? 'Signed' : 'Unsigned'} · ${report.mrvMethodology.slice(0, 40)}...`,
    status: (report.mrvSigned ? 'confirmed' : 'pending') as 'confirmed' | 'pending' | 'flagged',
  },
  {
    icon: <ShieldCheck size={14} />,
    label: 'Verifier Sign-off',
    detail: `${report.verifierOrg} · ${new Date(report.verifierDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`,
    status: 'confirmed' as const,
  },
  {
    icon: <Brain size={14} />,
    label: 'AI Risk Analysis',
    detail: `${report.aiAnomalyCount} anomaly flag${report.aiAnomalyCount !== 1 ? 's' : ''} · ${report.aiDoubleCountFlags} double-count flag${report.aiDoubleCountFlags !== 1 ? 's' : ''}`,
    status: (report.aiAnomalyCount > 3 || report.aiDoubleCountFlags > 0 ? 'flagged' : 'confirmed') as 'confirmed' | 'pending' | 'flagged',
  },
];

const STATUS_ICON: Record<string, React.ReactNode> = {
  confirmed: <CheckCircle2 size={14} color="var(--color-mint)" />,
  pending:   <div style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid var(--color-amber)' }} />,
  flagged:   <div style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid var(--color-coral)', background: 'rgba(248,113,113,0.15)' }} />,
};

const STATUS_VARIANT = {
  VERIFIED:     'verified',
  PENDING:      'pending',
  UNDER_REVIEW: 'under-review',
  REJECTED:     'rejected',
} as const;

export default function PassportPage({ params }: { params: { id: string } }) {
  const [tab, setTab] = useState<Tab>('overview');
  const [copied, setCopied] = useState(false);

  const project = getProjectById(params.id);
  if (!project) notFound();

  const report = getEvidenceReport(project.id);
  const ledgerEvents = getLedgerEvents(project.id);
  const batch = getCreditBatch(project.id);

  const statusVariant = STATUS_VARIANT[project.status] ?? 'dim';

  const copyTx = () => {
    navigator.clipboard.writeText(project.txRef).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const trustCaption =
    project.trustScore >= 85
      ? 'High Evidence — Well-documented satellite and MRV trail'
      : project.trustScore >= 60
      ? 'Moderate Evidence — Some gaps in verification chain'
      : 'Lower Evidence — Pending re-verification';

  return (
    <AppShell>
      <div className="container-max py-8">
        {/* ── Back link ── */}
        <Link
          href="/marketplace"
          id="passport-back"
          className="flex items-center gap-2 mb-6 text-sm"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          <ArrowLeft size={14} />
          Back to Marketplace
        </Link>

        {/* ── Passport header ── */}
        <div
          className="card p-6 mb-6"
          style={{ borderColor: 'var(--border-hairline-lg)' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <MonoLabel color="cyan">{project.id}</MonoLabel>
                <CategoryTag category={project.category} />
              </div>
              <h1
                className="font-bold tracking-tight"
                style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--color-text-primary)' }}
              >
                {project.name}
              </h1>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {project.location}
              </p>
            </div>
            <Badge variant={statusVariant} icon className="self-start">
              {project.status === 'VERIFIED' ? '✓ VERIFIED' : project.status.replace('_', ' ')}
            </Badge>
          </div>
        </div>

        {/* ── Tab bar ── */}
        <div className="tab-bar mb-6">
          {(['overview', 'evidence', 'ledger'] as Tab[]).map((t) => (
            <button
              key={t}
              id={`tab-${t}`}
              className={`tab-item ${tab === t ? 'active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* ══ TAB: OVERVIEW ══════════════════════════════════ */}
        {tab === 'overview' && (
          <div
            className="flex flex-col gap-6"
            style={{ animation: 'slide-fade-in 200ms ease' }}
          >
            {/* 4-stat grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'ISSUED (tCO₂e)', value: project.creditsIssued.toLocaleString(), color: 'var(--color-text-primary)' },
                { label: 'AVAILABLE', value: project.creditsAvailable.toLocaleString(), color: 'var(--color-mint)' },
                { label: 'RETIRED', value: project.creditsRetired.toLocaleString(), color: 'var(--color-coral)' },
                { label: 'TRUST SCORE', value: `${project.trustScore}/100`, color: project.trustScore >= 85 ? 'var(--color-mint)' : project.trustScore >= 60 ? 'var(--color-cyan)' : 'var(--color-amber)' },
              ].map((s) => (
                <div key={s.label} className="card p-5 flex flex-col gap-1">
                  <span className="font-mono-label" style={{ color: 'var(--color-text-tertiary)', fontSize: 9 }}>
                    {s.label}
                  </span>
                  <span className="stat-value text-xl font-bold" style={{ color: s.color }}>
                    {s.value}
                  </span>
                  {s.label === 'TRUST SCORE' && (
                    <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                      {trustCaption}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Evidence score */}
            <div className="card p-5">
              <EvidenceScoreBar score={project.evidenceScore} label="Evidence Score" height={8} />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Owner row */}
              <div className="card p-6 flex flex-col gap-4">
                <MonoLabel color="tertiary">CURRENT OWNER</MonoLabel>
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-xl"
                    style={{
                      width: 48,
                      height: 48,
                      background: 'linear-gradient(135deg, rgba(52,211,153,0.2), rgba(56,189,248,0.2))',
                      border: '1px solid rgba(52,211,153,0.3)',
                    }}
                  >
                    <Wallet size={20} color="var(--color-mint)" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      {project.ownerOrg}
                    </div>
                    <div className="mono-hash">{project.ownerWallet}</div>
                    {project.ownerVerified && (
                      <div className="flex items-center gap-1">
                        <CheckCircle2 size={11} color="var(--color-mint)" />
                        <span className="text-xs" style={{ color: 'var(--color-mint)' }}>
                          Verified corporate wallet
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Lifecycle timeline */}
              <div className="card p-6 flex flex-col gap-4">
                <MonoLabel color="tertiary">LIFECYCLE</MonoLabel>
                <TimelineStepper
                  steps={LIFECYCLE_STEPS(project.verifiedDate)}
                  orientation="horizontal"
                  activeIndex={1}
                />
              </div>
            </div>

            {/* On-chain reference */}
            <div className="card p-6 flex flex-col gap-4">
              <MonoLabel color="tertiary">ON-CHAIN REFERENCE</MonoLabel>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* QR placeholder */}
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-xl"
                  style={{
                    width: 88,
                    height: 88,
                    background: 'var(--color-bg-panel-alt)',
                    border: '1px solid var(--border-hairline)',
                  }}
                >
                  <QrCode size={40} color="var(--color-text-tertiary)" />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="font-mono-label" style={{ color: 'var(--color-text-tertiary)' }}>
                    TX_REF
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="font-mono text-xs break-all"
                      style={{ color: 'var(--color-cyan)' }}
                    >
                      {project.txRef}
                    </span>
                    <button onClick={copyTx} style={{ color: 'var(--color-text-tertiary)', flexShrink: 0 }}>
                      {copied ? <Check size={13} color="var(--color-mint)" /> : <Copy size={13} />}
                    </button>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--color-text-tertiary)', fontStyle: 'italic' }}>
                    Scan to open the on-chain record. Every event above is a verifiable transaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ TAB: EVIDENCE ══════════════════════════════════ */}
        {tab === 'evidence' && report && (
          <div
            className="flex flex-col gap-6"
            style={{ animation: 'slide-fade-in 200ms ease' }}
          >
            {/* Evidence bundle checklist */}
            <div className="card p-6 flex flex-col gap-4">
              <MonoLabel color="tertiary">EVIDENCE BUNDLE</MonoLabel>
              <div className="flex flex-col gap-3">
                {EVIDENCE_BUNDLE(report).map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl"
                    style={{ background: 'var(--color-bg-panel-alt)', border: '1px solid var(--border-hairline)' }}
                  >
                    <div
                      className="flex-shrink-0 flex items-center justify-center rounded-lg"
                      style={{
                        width: 32,
                        height: 32,
                        background: 'rgba(52,211,153,0.08)',
                        color: 'var(--color-mint)',
                      }}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                        {item.label}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                        {item.detail}
                      </div>
                    </div>
                    <div className="flex-shrink-0 mt-1">
                      {STATUS_ICON[item.status]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Before/After slider */}
            {(project.category === 'FOREST' || project.category === 'BLUE_CARBON' || project.category === 'SOIL') && (
              <div className="card p-6 flex flex-col gap-4">
                <MonoLabel color="tertiary">SATELLITE COMPARISON</MonoLabel>
                <BeforeAfterSlider
                  beforeYear={report.beforeYear}
                  afterYear={report.afterYear}
                  beforeNdvi={report.beforeNdviAvg}
                  afterNdvi={report.afterNdviAvg}
                />
              </div>
            )}

            {/* Evidence report readout */}
            <div className="card p-6 flex flex-col gap-4">
              <MonoLabel color="tertiary">EVIDENCE REPORT READOUT</MonoLabel>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Canopy Δ', value: report.canopyDelta, color: report.canopyDelta.startsWith('+') ? 'var(--color-mint)' : report.canopyDelta === 'N/A' ? 'var(--color-text-secondary)' : 'var(--color-coral)' },
                  { label: 'NDVI Δ', value: report.ndviDelta, color: report.ndviDelta.startsWith('+') ? 'var(--color-mint)' : report.ndviDelta === 'N/A' ? 'var(--color-text-secondary)' : 'var(--color-coral)' },
                  { label: 'Deforestation Flags', value: String(report.deforestationFlags), color: report.deforestationFlags === 0 ? 'var(--color-mint)' : 'var(--color-coral)' },
                  { label: 'Evidence Score', value: `${project.evidenceScore}/100`, color: project.evidenceScore >= 85 ? 'var(--color-mint)' : project.evidenceScore >= 60 ? 'var(--color-cyan)' : 'var(--color-amber)' },
                ].map((stat) => (
                  <div key={stat.label} className="card-alt p-4 text-center">
                    <div className="stat-value text-xl font-bold" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="font-mono-label mt-1" style={{ color: 'var(--color-text-tertiary)', fontSize: 9 }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Methodology */}
              <div
                className="p-4 rounded-xl text-xs leading-relaxed"
                style={{ background: 'var(--color-bg-panel-alt)', border: '1px solid var(--border-hairline)' }}
              >
                <span className="font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Methodology: </span>
                <span style={{ color: 'var(--color-text-tertiary)' }}>{report.mrvMethodology}</span>
              </div>

              {/* Honesty note */}
              <div
                className="p-4 rounded-xl text-xs leading-relaxed"
                style={{
                  background: 'rgba(56,189,248,0.04)',
                  border: '1px solid rgba(56,189,248,0.2)',
                  color: 'var(--color-text-secondary)',
                  fontStyle: 'italic',
                }}
              >
                ⚠ {report.notes}
              </div>
            </div>
          </div>
        )}

        {/* ══ TAB: LEDGER ════════════════════════════════════ */}
        {tab === 'ledger' && (
          <div
            className="flex flex-col gap-6"
            style={{ animation: 'slide-fade-in 200ms ease' }}
          >
            {/* Block flow */}
            <div className="card p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <MonoLabel color="tertiary">ON-CHAIN EVENT LOG</MonoLabel>
                <span className="font-mono-label" style={{ color: 'var(--color-text-tertiary)', fontSize: 9 }}>
                  ← scroll →
                </span>
              </div>
              {ledgerEvents.length > 0 ? (
                <LedgerBlockFlow events={ledgerEvents} />
              ) : (
                <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
                  No ledger events found for this project.
                </p>
              )}
            </div>

            {/* Batch holder bar */}
            {batch && (
              <div className="card p-6 flex flex-col gap-4">
                <MonoLabel color="tertiary">BATCH DISTRIBUTION — {batch.batchId}</MonoLabel>
                <BatchHolderBar holders={batch.holders} totalIssued={batch.totalIssued} />
              </div>
            )}

            {/* Smart contract fields */}
            <div className="card p-6 flex flex-col gap-4">
              <MonoLabel color="tertiary">SMART CONTRACT FIELDS</MonoLabel>
              <div className="flex flex-col gap-0 divide-y" style={{ borderColor: 'var(--border-hairline)' }}>
                {[
                  { key: 'batch_id', value: batch?.batchId ?? 'N/A' },
                  { key: 'owner_current', value: project.ownerWallet },
                  { key: 'tx_history', value: `${ledgerEvents.length} events` },
                  { key: 'balance', value: `${project.creditsAvailable.toLocaleString()} tCO₂e` },
                  { key: 'retired', value: `${project.creditsRetired.toLocaleString()} tCO₂e` },
                  { key: 'timestamp', value: new Date(project.verifiedDate).toISOString() },
                  { key: 'tx_ref', value: project.txRef.slice(0, 32) + '...' },
                ].map((row) => (
                  <div
                    key={row.key}
                    className="flex items-center justify-between py-3"
                    style={{ borderColor: 'var(--border-hairline)' }}
                  >
                    <span
                      className="font-mono-label"
                      style={{ color: 'var(--color-text-tertiary)', fontSize: 10 }}
                    >
                      {row.key}
                    </span>
                    <span
                      className="font-mono text-xs text-right"
                      style={{ color: 'var(--color-cyan)', maxWidth: '60%', wordBreak: 'break-all' }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
