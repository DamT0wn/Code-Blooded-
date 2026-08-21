'use client';

import { AppShell } from '@/components/app-shell';
import { MonoLabel } from '@/components/badge';
import Link from 'next/link';
import {
  ShieldCheck,
  Satellite,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Database,
  Link2,
  Zap,
  Building2,
  Users,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <AppShell showFooter>
      <div className="container-max py-12 flex flex-col gap-12">
        {/* ── Page Header ── */}
        <div className="flex flex-col gap-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <MonoLabel color="mint">ABOUT VERDANT LEDGER</MonoLabel>
            <span className="pill pill-mint text-[10px]">PLATFORM OVERVIEW</span>
          </div>
          <h1
            className="font-bold tracking-tight text-white"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontFamily: 'var(--font-display)' }}
          >
            Purpose, Working &amp; Platform Architecture
          </h1>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Verdant Ledger is an enterprise-grade Carbon Credit Trust &amp; Verification Platform built to eliminate greenwashing, double-counting, and opaque claims in global carbon markets.
          </p>
        </div>

        {/* ── 3 Core Pillar Cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pillar 1: Purpose */}
          <div className="card p-6 flex flex-col gap-4 border-l-4 border-l-emerald-500">
            <div className="flex items-center justify-between">
              <span className="pill pill-mint text-[10px]">CORE MISSION</span>
              <ShieldCheck size={20} color="var(--color-mint)" />
            </div>
            <h2 className="text-xl font-bold text-white">Platform Purpose</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Traditional carbon markets suffer from scattered documentation, double-selling, and unverified offset claims. Verdant Ledger bridges physical orbital evidence with blockchain ledgers—ensuring every carbon credit represents verified, permanent environmental impact.
            </p>
          </div>

          {/* Pillar 2: Technical Pipeline */}
          <div className="card p-6 flex flex-col gap-4 border-l-4 border-l-cyan-500">
            <div className="flex items-center justify-between">
              <span className="pill pill-cyan text-[10px]">TECHNICAL PIPELINE</span>
              <Satellite size={20} color="var(--color-cyan)" />
            </div>
            <h2 className="text-xl font-bold text-white">How It Works</h2>
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
            <h2 className="text-xl font-bold text-white">Platform Functioning</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Corporations browse transparent credits on the Marketplace with live Rupee pricing (₹), manage annual emission reduction targets on the B2B Company Dashboard (/dashboard), and inspect full audit trails via public Digital Passports (/passport/[id]).
            </p>
          </div>
        </div>

        {/* ── Module Breakdown ── */}
        <div className="card p-6 flex flex-col gap-6">
          <MonoLabel color="tertiary">PLATFORM FUNCTIONING &amp; MODULE SUMMARY</MonoLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-gray-900/45 backdrop-blur-md border border-white/10 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-emerald-400">1. Verified Marketplace</span>
                <Link href="/marketplace" className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
                  Open <ArrowRight size={12} />
                </Link>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Real-time credit discovery featuring INR pricing, evidence scores (0–100), regional filtering, and instant purchase simulations with instant ledger references.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-gray-900/45 backdrop-blur-md border border-white/10 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-cyan-400">2. Corporate B2B Dashboard</span>
                <Link href="/dashboard" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
                  Open <ArrowRight size={12} />
                </Link>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Scoped enterprise portal for tracking carbon purchases, offset target completion gauges, monthly trajectory charts, and audit-ready transaction ledgers.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-gray-900/45 backdrop-blur-md border border-white/10 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-amber-400">3. Digital Carbon Passport</span>
                <Link href="/passport/CC-IND-00291" className="text-xs text-amber-400 hover:underline flex items-center gap-1">
                  Sample <ArrowRight size={12} />
                </Link>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Tamper-evident project passports providing interactive before/after satellite sliders, verifier sign-offs, batch distribution bars, and on-chain hash verification.
              </p>
            </div>
          </div>
        </div>


        {/* ── Quick Links ── */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/marketplace" className="btn-primary">
            Explore Marketplace →
          </Link>
          <Link href="/dashboard" className="btn-ghost">
            Access B2B Dashboard →
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
