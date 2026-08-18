'use client';

import { useEffect, useRef, useState } from 'react';

interface StatItem {
  label: string;
  value: string | number;
  suffix?: string;
  color?: 'mint' | 'cyan' | 'amber' | 'coral' | 'primary';
  mono?: boolean;
}

interface StatGridProps {
  stats: StatItem[];
  columns?: number;
}

interface StatRowProps {
  label: string;
  value: string | number;
  suffix?: string;
  color?: 'mint' | 'cyan' | 'amber' | 'coral' | 'primary';
}

const COLOR_MAP = {
  mint:    'var(--color-mint)',
  cyan:    'var(--color-cyan)',
  amber:   'var(--color-amber)',
  coral:   'var(--color-coral)',
  primary: 'var(--color-text-primary)',
};

function AnimatedNumber({ target }: { target: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animating = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animating.current) {
          animating.current = true;
          const start = Date.now();
          const duration = 1200;
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out
            setDisplay(Math.round(target * ease));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{new Intl.NumberFormat('en-US').format(display)}</span>;
}

export function StatCard({ stat }: { stat: StatItem }) {
  const colorVal = COLOR_MAP[stat.color ?? 'primary'];
  const numericValue = typeof stat.value === 'number' ? stat.value : null;

  return (
    <div
      className="card p-5 flex flex-col gap-1"
      style={{ borderColor: 'var(--border-hairline)' }}
    >
      <span
        className="font-mono-label"
        style={{ color: 'var(--color-text-tertiary)', fontSize: 10 }}
      >
        {stat.label}
      </span>
      <div
        className="stat-value text-2xl font-bold"
        style={{ color: colorVal }}
      >
        {numericValue !== null ? (
          <>
            <AnimatedNumber target={numericValue} />
            {stat.suffix && (
              <span
                className="text-sm font-medium ml-1"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {stat.suffix}
              </span>
            )}
          </>
        ) : (
          <span>{stat.value}{stat.suffix && <span className="text-sm ml-1" style={{ color: 'var(--color-text-secondary)' }}>{stat.suffix}</span>}</span>
        )}
      </div>
    </div>
  );
}

export function StatGrid({ stats, columns = 4 }: StatGridProps) {
  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {stats.map((stat, i) => (
        <StatCard key={i} stat={stat} />
      ))}
    </div>
  );
}

export function StatRow({ label, value, suffix, color = 'primary' }: StatRowProps) {
  return (
    <div
      className="flex items-center justify-between py-3"
      style={{ borderBottom: '1px solid var(--border-hairline)' }}
    >
      <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        {label}
      </span>
      <span
        className="stat-value text-sm font-bold"
        style={{ color: COLOR_MAP[color] }}
      >
        {value}{suffix && <span className="text-xs ml-1 font-normal" style={{ color: 'var(--color-text-tertiary)' }}>{suffix}</span>}
      </span>
    </div>
  );
}
