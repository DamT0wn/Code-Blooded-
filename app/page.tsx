import { AppShell } from '@/components/app-shell';
import { RadarNodeMap } from '@/components/radar-node-map';
import { TimelineStepper } from '@/components/timeline-stepper';
import { MonoLabel } from '@/components/badge';
import Link from 'next/link';
import {
  ShieldCheck, Database, Satellite, BarChart3, CheckCircle2, Link2,
  ShoppingCart, ArrowRight, ArrowUpRight, Zap
} from 'lucide-react';

const PROBLEM_STEPS = [
  {
    label: 'Claim',
    description: "Project says 'we removed X tCO₂'",
    color: 'mint' as const,
  },
  {
    label: 'Uncertain',
    description: 'Evidence scattered across PDFs, registries',
    color: 'amber' as const,
  },
  {
    label: 'Buyer Risk',
    description: 'Double-selling, greenwashing exposure',
    color: 'amber' as const,
  },
  {
    label: 'No Trust',
    description: 'Market stalls; real projects get punished',
    color: 'coral' as const,
  },
];

const PROBLEM_CARDS = [
  {
    num: '01',
    title: 'Fragmented Evidence',
    body: 'Project docs, registry entries and verification reports live in disconnected silos — no unified record.',
  },
  {
    num: '02',
    title: 'Opaque Ownership',
    body: 'Same credit may be resold, retired twice, or claimed by multiple parties without a public ledger.',
  },
  {
    num: '03',
    title: 'Small Projects Locked Out',
    body: "Community-scale reforestation can't afford heavyweight verification infrastructure and get locked out.",
  },
  {
    num: '04',
    title: 'Ledger ≠ Reality',
    body: 'Blockchain proves a transaction happened — not that a tree actually grew. Evidence must sit alongside the token.',
  },
];

const SOLUTION_CHECKLIST = [
  { label: 'Environmental Project', caption: 'Registered, geolocated project boundary', color: 'mint', outline: true },
  { label: 'Project Data + Documents', caption: 'PDFs, registry references, methodology', color: 'mint', outline: true },
  { label: 'Satellite / Real-World Evidence', caption: 'Multi-year time-series from orbital sensors', color: 'mint', outline: true },
  { label: 'MRV + AI-Assisted Risk Analysis', caption: 'Anomaly detection, double-count flagging', color: 'cyan', outline: true },
  { label: 'Verification', caption: 'Third-party signoff aligned to methodology', color: 'cyan', outline: true },
  { label: 'Blockchain Credit Record', caption: 'Immutable token with full passport attached', color: 'cyan', outline: true },
];

const MARKETPLACE_ACTIONS = [
  { icon: <ShoppingCart size={14} />, action: 'Purchase', desc: 'Custody transfer' },
  { icon: <ArrowRight size={14} />, action: 'Transfer', desc: 'B2B settlement' },
  { icon: <Zap size={14} />, action: 'Retire', desc: 'Final claim' },
  { icon: <ShieldCheck size={14} />, action: 'Audit', desc: 'Public passport' },
];

const WHY_BULLETS = [
  'Raise buyer confidence with evidence-backed verification',
  'Enable real-time ownership tracking across jurisdictions',
  'Standardise MRV reporting with AI-assisted analysis',
  'Reduce double-counting and greenwashing risk',
  'Create portable, composable credit records',
  'Open the market for smaller environmental projects',
];

const ROADMAP_ITEMS = [
  { label: 'IoT Monitoring', icon: '📡' },
  { label: 'Advanced Satellite Analytics', icon: '🛰️' },
  { label: 'Automated MRV', icon: '⚙️' },
  { label: 'AI Fraud Detection', icon: '🔍' },
  { label: 'Registry Integration', icon: '🔗' },
  { label: 'Corporate ESG Reporting', icon: '📊' },
  { label: 'Cross-Chain Interoperability', icon: '🌐' },
];

export default function LandingPage() {
  return (
    <AppShell showFooter>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="section-pad" style={{ paddingTop: 120 }}>
        <div className="container-max">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            {/* Left: copy — wrapped in liquid-glass-strong panel */}
            <div
              className="flex-1 flex flex-col gap-8 liquid-glass-strong"
              style={{
                borderRadius: 28,
                padding: '2.5rem',
              }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3">
                <div
                  className="h-px flex-1 max-w-8"
                  style={{ background: 'var(--color-mint)', opacity: 0.6 }}
                />
                <MonoLabel color="mint">01 CARBON · BLOCKCHAIN · TRUST</MonoLabel>
              </div>

              {/* H1 — Poppins with Source Serif 4 italic accent */}
              <h1
                className="font-bold leading-[0.95] tracking-tight"
                style={{ fontSize: 'clamp(52px, 7vw, 80px)', fontFamily: 'var(--font-display)' }}
              >
                <span style={{ color: 'var(--color-text-primary)', display: 'block' }}>Code</span>
                <span className="text-gradient-mint-cyan" style={{ display: 'block' }}>Blooded.</span>
              </h1>

              {/* Subhead */}
              <p
                className="font-semibold"
                style={{ color: 'var(--color-text-secondary)', fontSize: 18, fontFamily: 'var(--font-display)' }}
              >
                Carbon Credit Trust &amp; Verification Platform
              </p>

              {/* Body */}
              <p
                className="max-w-xl leading-relaxed"
                style={{ color: 'var(--color-text-secondary)', fontSize: 16 }}
              >
                Verify the impact. Track the credit. Trust the carbon. A decentralized marketplace
                where every tonne of CO₂ carries evidence —{' '}
                <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'rgba(244,246,245,0.8)' }}>
                  from satellite pixel to blockchain ledger.
                </em>
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link href="/marketplace" id="hero-cta-primary" className="btn-primary">
                  Explore Marketplace
                  <ArrowRight size={16} />
                </Link>
                <Link href="/passport/CC-IND-00291" id="hero-cta-secondary" className="btn-ghost">
                  View a Passport
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>

            {/* Right: Radar map */}
            <div
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: 'min(440px, 100%)', aspectRatio: '1/1' }}
            >
              <RadarNodeMap />
            </div>
          </div>

          {/* Hero 5-Stat Bar */}
          <div className="mt-16 pt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={20} color="var(--color-mint)" />
              </div>
              <div>
                <div className="stat-value text-lg font-bold text-white">2.45M+</div>
                <div className="text-xs font-semibold text-gray-200">Credits Issued</div>
                <div className="text-[11px] text-gray-400">Tonnes of CO₂e</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                <BarChart3 size={20} color="var(--color-mint)" />
              </div>
              <div>
                <div className="stat-value text-lg font-bold text-white">850+</div>
                <div className="text-xs font-semibold text-gray-200">Projects Verified</div>
                <div className="text-[11px] text-gray-400">Across 26+ countries</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                <Database size={20} color="var(--color-mint)" />
              </div>
              <div>
                <div className="stat-value text-lg font-bold text-white">320+</div>
                <div className="text-xs font-semibold text-gray-200">Organizations</div>
                <div className="text-[11px] text-gray-400">Building a sustainable future</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                <Link2 size={20} color="var(--color-mint)" />
              </div>
              <div>
                <div className="stat-value text-lg font-bold text-white">1.12M+</div>
                <div className="text-xs font-semibold text-gray-200">Credits Transferred</div>
                <div className="text-[11px] text-gray-400">On-chain &amp; transparent</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                <Zap size={20} color="var(--color-mint)" />
              </div>
              <div>
                <div className="stat-value text-lg font-bold text-white">980K+</div>
                <div className="text-xs font-semibold text-gray-200">Credits Retired</div>
                <div className="text-[11px] text-gray-400">Real impact delivered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM SECTION ─────────────────────────────────── */}
      <section className="section-pad">
        <div className="container-max">
          <div className="flex flex-col gap-12">
            {/* Header */}
            <div className="flex flex-col gap-4 max-w-2xl">
              <MonoLabel color="tertiary">02 THE TRUST GAP</MonoLabel>
              <h2
                className="font-bold leading-tight tracking-tight"
                style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontFamily: 'var(--font-display)' }}
              >
                Carbon markets have a{' '}
                <em
                  style={{
                    color: 'var(--color-coral)',
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontWeight: 300,
                  }}
                >
                  "trust"
                </em>{' '}
                problem.
              </h2>
              <p
                className="leading-relaxed"
                style={{ color: 'var(--color-text-secondary)', fontSize: 16 }}
              >
                Buyers pay for a promise — but the evidence behind that promise lives across
                scattered PDFs, registry spreadsheets and verification bodies. There is no single,
                tamper-evident record.
              </p>
            </div>

            {/* Timeline */}
            <div className="card p-6">
              <TimelineStepper steps={PROBLEM_STEPS} orientation="horizontal" />
            </div>

            {/* 4-card grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {PROBLEM_CARDS.map((card) => (
                <div key={card.num} className="card card-hover p-6 flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <span
                      className="font-mono-label flex-shrink-0"
                      style={{ color: 'var(--color-coral)', fontSize: 11 }}
                    >
                      {card.num}
                    </span>
                    <h3
                      className="font-semibold"
                      style={{ color: 'var(--color-text-primary)', fontSize: 15 }}
                    >
                      {card.title}
                    </h3>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUTION SECTION ─────────────────────────────────── */}
      <section className="section-pad">
        <div className="container-max">
          <div className="flex flex-col gap-12">
            {/* Header */}
            <div className="flex flex-col gap-4 max-w-2xl">
              <MonoLabel color="tertiary">03 OUR SOLUTION</MonoLabel>
              <h2
                className="font-bold leading-tight tracking-tight"
                style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontFamily: 'var(--font-display)' }}
              >
                A{' '}
                <em
                  style={{
                    color: 'var(--color-mint)',
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontWeight: 300,
                  }}
                >
                  Trust Layer
                </em>{' '}
                for carbon credits.
              </h2>
              <p
                className="leading-relaxed"
                style={{ color: 'var(--color-text-secondary)', fontSize: 16 }}
              >
                We don't just track carbon credits — we help verify the evidence behind them. Every
                credit carries a passport of satellite proof, MRV data, risk score and blockchain
                history.
              </p>
            </div>

            {/* Two-col layout */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left: checklist */}
              <div className="card p-6 flex flex-col gap-4">
                <div className="font-mono-label" style={{ color: 'var(--color-text-tertiary)' }}>
                  VERIFICATION PIPELINE
                </div>
                <div className="flex flex-col gap-0">
                  {SOLUTION_CHECKLIST.map((item, i) => {
                    const isLast = i === SOLUTION_CHECKLIST.length - 1;
                    const isMint = item.color === 'mint';
                    return (
                      <div
                        key={i}
                        className="flex gap-4 pb-4"
                        style={!isLast ? { borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: 16 } : {}}
                      >
                        {/* Spine */}
                        <div className="flex flex-col items-center gap-1" style={{ width: 20, flexShrink: 0 }}>
                          <div
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: '50%',
                              border: `1.5px solid ${isMint ? 'var(--color-mint)' : 'var(--color-cyan)'}`,
                              background: isMint ? 'rgba(52,211,153,0.08)' : 'rgba(56,189,248,0.08)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <div
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                background: isMint ? 'var(--color-mint)' : 'var(--color-cyan)',
                              }}
                            />
                          </div>
                          {!isLast && (
                            <div style={{ flex: 1, width: 1, background: 'rgba(255,255,255,0.08)', minHeight: 8 }} />
                          )}
                        </div>
                        <div>
                          <div
                            className="text-sm font-semibold mb-0.5"
                            style={{ color: 'var(--color-text-primary)' }}
                          >
                            {item.label}
                          </div>
                          <div
                            className="text-xs"
                            style={{ color: 'var(--color-text-tertiary)' }}
                          >
                            {item.caption}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Marketplace card */}
              <div className="card p-6 flex flex-col gap-5">
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono-label px-2 py-1 rounded-full"
                    style={{ background: 'rgba(56,189,248,0.08)', color: 'var(--color-cyan)', fontSize: 10, boxShadow: '0 0 0 1px rgba(56,189,248,0.2)' }}
                  >
                    MARKETPLACE LAYER
                  </span>
                </div>
                <h3
                  className="text-xl font-bold"
                  style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
                >
                  Transparent Marketplace
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Buyers browse credits with visible evidence. Every purchase, transfer and retirement
                  is written back to the ledger.
                </p>

                {/* On-chain action rows */}
                <div className="flex flex-col gap-2">
                  {MARKETPLACE_ACTIONS.map((action) => (
                    <div
                      key={action.action}
                      className="flex items-center gap-3 p-3 rounded-xl inner-panel-row"
                    >
                      <div
                        className="flex items-center justify-center rounded-lg"
                        style={{
                          width: 28,
                          height: 28,
                          background: 'rgba(52,211,153,0.08)',
                          color: 'var(--color-mint)',
                          flexShrink: 0,
                        }}
                      >
                        {action.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                          {action.action}
                        </div>
                        <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                          {action.desc}
                        </div>
                      </div>
                      <CheckCircle2 size={14} color="var(--color-mint)" />
                    </div>
                  ))}
                </div>

                {/* Tagline */}
                <div
                  className="pt-3 text-sm font-medium"
                  style={{
                    color: 'var(--color-text-secondary)',
                    borderTop: '1px solid rgba(255,255,255,0.07)',
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                  }}
                >
                  "Evidence &gt; Trust. Trust &gt; Trade."
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <Link href="/marketplace" id="solution-cta" className="btn-primary">
                See it live →
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMPACT SECTION ──────────────────────────────────── */}
      <section className="section-pad">
        <div className="container-max flex flex-col gap-12">
          <h2
            className="font-bold leading-tight tracking-tight max-w-2xl"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontFamily: 'var(--font-display)' }}
          >
            Trust compounds. So does the{' '}
            <em
              style={{
                color: 'var(--color-mint)',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 300,
              }}
            >
              planet's
            </em>{' '}
            upside.
          </h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Why Code Blooded */}
            <div className="card p-6 flex flex-col gap-4">
              <div className="font-mono-label" style={{ color: 'var(--color-text-tertiary)' }}>
                WHY CODE BLOODED
              </div>
              <div className="flex flex-col gap-3">
                {WHY_BULLETS.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      size={16}
                      color="var(--color-mint)"
                      className="flex-shrink-0 mt-0.5"
                    />
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* What comes next */}
            <div className="card p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="font-mono-label" style={{ color: 'var(--color-text-tertiary)' }}>
                  WHAT COMES NEXT
                </div>
                <span
                  className="font-mono-label px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(56,189,248,0.08)', color: 'var(--color-cyan)', fontSize: 9, boxShadow: '0 0 0 1px rgba(56,189,248,0.2)' }}
                >
                  PHASE 2/3 ROADMAP
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {ROADMAP_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2.5 p-3 rounded-xl inner-panel-row"
                  >
                    <span style={{ fontSize: 16 }}>{item.icon}</span>
                    <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION (PURPOSE, WORKING & FUNCTIONING) ──────── */}
      <section id="about" className="section-pad border-t border-white/10" style={{ background: 'rgba(9, 13, 20, 0.7)' }}>
        <div className="container-max flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-4 max-w-3xl">
            <MonoLabel color="mint">05 ABOUT GREENLEDGER / CODE BLOODED</MonoLabel>
            <h2
              className="font-bold leading-tight tracking-tight text-white"
              style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontFamily: 'var(--font-display)' }}
            >
              Purpose, Working &amp; Platform Architecture
            </h2>
            <p className="text-base text-gray-300 leading-relaxed">
              Code Blooded (GreenLedger) is an enterprise-grade Carbon Credit Trust &amp; Verification Platform designed to eradicate greenwashing and double-counting in voluntary carbon markets.
            </p>
          </div>

          {/* 3 Core Pillar Cards: Purpose, Working, Functioning */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Pillar 1: Purpose */}
            <div className="card p-6 flex flex-col gap-4 border-l-4 border-l-emerald-500">
              <div className="flex items-center justify-between">
                <span className="pill pill-mint text-[10px]">CORE MISSION</span>
                <ShieldCheck size={20} color="var(--color-mint)" />
              </div>
              <h3 className="text-lg font-bold text-white">Platform Purpose</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Traditional carbon markets suffer from scattered documentation, double-selling, and unverified offset claims. Code Blooded bridges physical orbital evidence with blockchain ledgers—ensuring every carbon credit represents verified, permanent environmental impact.
              </p>
            </div>

            {/* Pillar 2: Working & Pipeline */}
            <div className="card p-6 flex flex-col gap-4 border-l-4 border-l-cyan-500">
              <div className="flex items-center justify-between">
                <span className="pill pill-cyan text-[10px]">TECHNICAL PIPELINE</span>
                <Satellite size={20} color="var(--color-cyan)" />
              </div>
              <h3 className="text-lg font-bold text-white">How It Works</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Multitemporal satellite scenes capture vegetation and canopy deltas over time. AI anomaly detection flags double-count risks, while accredited verifiers execute methodology sign-offs. Verified credits are then minted on-chain with immutable digital passports attached.
              </p>
            </div>

            {/* Pillar 3: Core Functionality */}
            <div className="card p-6 flex flex-col gap-4 border-l-4 border-l-amber-500">
              <div className="flex items-center justify-between">
                <span className="pill pill-amber text-[10px]">ENTERPRISE SUITE</span>
                <BarChart3 size={20} color="var(--color-amber)" />
              </div>
              <h3 className="text-lg font-bold text-white">Platform Functioning</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Corporations browse transparent credits on the Marketplace with live Rupee pricing (₹), manage annual emission reduction targets on the B2B Company Dashboard (/dashboard), and inspect full audit trails via public Digital Passports (/passport/[id]).
              </p>
            </div>
          </div>

          {/* Breakdown Table of Efficacy */}
          <div className="card p-6 flex flex-col gap-4">
            <MonoLabel color="tertiary">PLATFORM FUNCTIONING &amp; MODULE SUMMARY</MonoLabel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-gray-900/80 border border-white/10 flex flex-col gap-2">
                <div className="text-sm font-bold text-emerald-400">1. Verified Marketplace</div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Real-time credit discovery featuring INR pricing, evidence scores (0–100), regional filtering, and instant purchase simulations with instant ledger references.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-900/80 border border-white/10 flex flex-col gap-2">
                <div className="text-sm font-bold text-cyan-400">2. Corporate B2B Dashboard</div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Scoped enterprise portal for tracking carbon purchases, offset target completion gauges, monthly trajectory charts, and audit-ready transaction ledgers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-900/80 border border-white/10 flex flex-col gap-2">
                <div className="text-sm font-bold text-amber-400">3. Digital Carbon Passport</div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Tamper-evident project passports providing interactive before/after satellite sliders, verifier sign-offs, batch distribution bars, and on-chain hash verification.
                </p>
              </div>
            </div>
          </div>

          {/* Closing lockup */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 liquid-glass-strong"
            style={{ borderRadius: 24 }}
          >
            <h3
              className="font-bold tracking-tight"
              style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontFamily: 'var(--font-display)' }}
            >
              Code{' '}
              <span className="text-gradient-mint-cyan">Blooded.</span>
            </h3>
            <p
              className="text-base font-medium max-w-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Verify the impact. Track the credit.{' '}
              <strong style={{ color: 'var(--color-text-primary)' }}>Trust the carbon.</strong>
            </p>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
