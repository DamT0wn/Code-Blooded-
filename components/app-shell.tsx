'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Menu, X } from 'lucide-react';
import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Docs', href: '#docs' },
  { label: 'About', href: '#about' },
];

export function AppNav() {
  const pathname = usePathname();
  const isLanding = pathname === '/';
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="glass-nav fixed top-0 left-0 right-0 z-50"
      style={{ height: '64px' }}
    >
      <div className="container-max h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" id="nav-logo">
          <span
            className="flex items-center justify-center rounded-xl liquid-glass"
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
            }}
          >
            <Leaf size={14} color="var(--color-mint)" />
          </span>
          <span
            className="text-sm font-semibold tracking-tight"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
          >
            code blooded
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.href) && link.href !== '#docs' && link.href !== '#about';
            return (
              <Link
                key={link.href}
                href={link.href}
                id={`nav-${link.label.toLowerCase()}`}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  color: active ? 'var(--color-mint)' : 'var(--color-text-secondary)',
                  background: active ? 'rgba(52,211,153,0.08)' : 'transparent',
                  boxShadow: active ? '0 0 0 1px rgba(52,211,153,0.25)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-primary)';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 0 1px rgba(255,255,255,0.12)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-secondary)';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                  }
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right slot */}
        <div className="flex items-center gap-3">
          {isLanding && (
            <span
              className="hidden md:flex font-mono-label items-center gap-1.5"
              style={{ color: 'var(--color-text-tertiary)', fontSize: 10 }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--color-mint)', animation: 'var(--animate-pulse-glow)' }}
              />
              HACKATHON PITCH · 2026
            </span>
          )}
          <Link
            href="/marketplace"
            id="nav-cta"
            className="btn-primary hidden md:inline-flex"
            style={{ padding: '8px 18px', fontSize: 13 }}
          >
            Explore
          </Link>
          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-full liquid-glass"
            style={{ color: 'var(--color-text-secondary)' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            id="nav-mobile-toggle"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="md:hidden liquid-glass-strong"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="container-max py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                style={{ color: 'var(--color-text-secondary)' }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export function AppShell({ children, showFooter = false }: { children: React.ReactNode; showFooter?: boolean }) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <AppNav />
      <main className="flex-1 relative-z pt-16">
        {children}
      </main>
      {showFooter && <AppFooter />}
    </div>
  );
}

function AppFooter() {
  return (
    <footer
      className="relative-z liquid-glass"
      style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="container-max py-6 flex items-center justify-between flex-wrap gap-4">
        <span className="font-mono-label" style={{ color: 'var(--color-text-tertiary)' }}>
          TRUST · TRANSPARENCY · TRACEABILITY
        </span>
        <div className="flex items-center gap-6">
          <span className="font-mono-label" style={{ color: 'var(--color-text-tertiary)', fontSize: 10 }}>
            / TEAM CODE BLOODED — Naitik Jangid · Rudra Pratap Singh · Pulkit Chaudhary · Utkarsh Kumar Rai
          </span>
          <span className="font-mono-label" style={{ color: 'var(--color-text-tertiary)', fontSize: 10 }}>
            v0.1.0 · 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
