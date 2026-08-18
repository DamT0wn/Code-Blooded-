'use client';

import { useEffect, useRef, useState } from 'react';

export interface TimelineStep {
  label: string;
  description?: string;
  color?: 'mint' | 'cyan' | 'amber' | 'coral' | 'dim';
  icon?: React.ReactNode;
  date?: string;
}

interface TimelineStepperProps {
  steps: TimelineStep[];
  activeIndex?: number;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'problem' | 'flow' | 'lifecycle';
}

const COLOR_MAP = {
  mint:  { bg: 'var(--color-mint)',  border: 'rgba(52,211,153,0.4)',  glow: 'rgba(52,211,153,0.5)', text: 'var(--color-mint)' },
  cyan:  { bg: 'var(--color-cyan)',  border: 'rgba(56,189,248,0.4)',  glow: 'rgba(56,189,248,0.5)', text: 'var(--color-cyan)' },
  amber: { bg: 'var(--color-amber)', border: 'rgba(251,191,36,0.4)',  glow: 'rgba(251,191,36,0.5)', text: 'var(--color-amber)' },
  coral: { bg: 'var(--color-coral)', border: 'rgba(248,113,113,0.4)', glow: 'rgba(248,113,113,0.5)', text: 'var(--color-coral)' },
  dim:   { bg: 'rgba(255,255,255,0.2)', border: 'var(--border-hairline)', glow: 'transparent', text: 'var(--color-text-secondary)' },
};

export function TimelineStepper({
  steps,
  activeIndex = -1,
  orientation = 'horizontal',
  variant = 'flow',
}: TimelineStepperProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  if (orientation === 'vertical') {
    return (
      <div ref={ref} className="flex flex-col gap-0">
        {steps.map((step, i) => {
          const c = COLOR_MAP[step.color ?? 'dim'];
          const isActive = i === activeIndex;
          const isLast = i === steps.length - 1;
          return (
            <div key={i} className="flex gap-4" style={{ opacity: visible ? 1 : 0, transition: `opacity 400ms ease ${i * 80}ms, transform 400ms ease ${i * 80}ms`, transform: visible ? 'none' : 'translateX(-12px)' }}>
              {/* Spine */}
              <div className="flex flex-col items-center" style={{ width: 20, flexShrink: 0 }}>
                <div
                  className="timeline-node"
                  style={{
                    background: c.bg,
                    boxShadow: isActive ? `0 0 14px 3px ${c.glow}` : 'none',
                    animation: isActive ? 'pulse-glow 2.5s ease-in-out infinite' : 'none',
                    border: `1.5px solid ${c.border}`,
                  }}
                />
                {!isLast && (
                  <div style={{ flex: 1, width: 1, background: 'var(--border-hairline)', minHeight: 32, margin: '4px 0' }} />
                )}
              </div>
              {/* Content */}
              <div className="pb-6">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold" style={{ color: c.text }}>{step.label}</span>
                  {step.date && <span className="font-mono-label" style={{ color: 'var(--color-text-tertiary)', fontSize: 10 }}>{step.date}</span>}
                </div>
                {step.description && (
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{step.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Horizontal
  return (
    <div ref={ref} className="flex items-start gap-0 overflow-x-auto">
      {steps.map((step, i) => {
        const c = COLOR_MAP[step.color ?? 'dim'];
        const isActive = i === activeIndex;
        const isLast = i === steps.length - 1;
        return (
          <div
            key={i}
            className="flex flex-col items-center gap-2"
            style={{
              flex: 1,
              minWidth: 120,
              opacity: visible ? 1 : 0,
              transition: `opacity 400ms ease ${i * 100}ms, transform 400ms ease ${i * 100}ms`,
              transform: visible ? 'none' : 'translateY(12px)',
            }}
          >
            {/* Node row */}
            <div className="flex items-center w-full">
              <div
                className="timeline-node"
                style={{
                  background: c.bg,
                  boxShadow: isActive ? `0 0 14px 3px ${c.glow}` : 'none',
                  animation: isActive ? 'pulse-glow 2.5s ease-in-out infinite' : 'none',
                  border: `1.5px solid ${c.border}`,
                  flexShrink: 0,
                }}
              />
              {!isLast && <div className="timeline-line" />}
            </div>
            {/* Label */}
            <div className="w-full pr-2">
              <div className="text-xs font-semibold mb-0.5" style={{ color: c.text }}>{step.label}</div>
              {step.description && (
                <div className="text-xs" style={{ color: 'var(--color-text-tertiary)', lineHeight: 1.5 }}>{step.description}</div>
              )}
              {step.date && (
                <div className="font-mono-label mt-0.5" style={{ color: 'var(--color-text-tertiary)', fontSize: 9 }}>{step.date}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
