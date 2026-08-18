'use client';

import { LedgerEvent } from '@/lib/mock-data';
import { Zap, ArrowRight, Flame, Search, RefreshCw } from 'lucide-react';

interface LedgerBlockFlowProps {
  events: LedgerEvent[];
}

const ACTION_CONFIG = {
  MINT: {
    color: 'var(--color-mint)',
    bg: 'rgba(52,211,153,0.1)',
    border: 'rgba(52,211,153,0.3)',
    icon: <Zap size={12} />,
    label: 'MINT',
  },
  TRANSFER: {
    color: 'var(--color-cyan)',
    bg: 'rgba(56,189,248,0.1)',
    border: 'rgba(56,189,248,0.3)',
    icon: <ArrowRight size={12} />,
    label: 'TRANSFER',
  },
  RETIRE: {
    color: 'var(--color-coral)',
    bg: 'rgba(248,113,113,0.1)',
    border: 'rgba(248,113,113,0.3)',
    icon: <Flame size={12} />,
    label: 'RETIRE',
  },
  AUDIT: {
    color: 'var(--color-amber)',
    bg: 'rgba(251,191,36,0.1)',
    border: 'rgba(251,191,36,0.3)',
    icon: <Search size={12} />,
    label: 'AUDIT',
  },
  UPDATE: {
    color: 'rgba(255,255,255,0.5)',
    bg: 'rgba(255,255,255,0.04)',
    border: 'var(--border-hairline)',
    icon: <RefreshCw size={12} />,
    label: 'UPDATE',
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' });
}

export function LedgerBlockFlow({ events }: LedgerBlockFlowProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Horizontal scrollable block chain */}
      <div
        className="flex items-center gap-0 overflow-x-auto pb-2"
        style={{ minWidth: 0 }}
      >
        {events.map((event, i) => {
          const cfg = ACTION_CONFIG[event.action];
          const isLast = i === events.length - 1;
          return (
            <div key={i} className="flex items-center flex-shrink-0">
              {/* Block card */}
              <div
                className="flex flex-col gap-1.5"
                style={{
                  background: cfg.bg,
                  border: `1px solid ${cfg.border}`,
                  borderRadius: 10,
                  padding: '12px 14px',
                  minWidth: 140,
                  maxWidth: 160,
                }}
              >
                {/* Block # */}
                <div
                  className="font-mono-label"
                  style={{ color: 'var(--color-text-tertiary)', fontSize: 9 }}
                >
                  BLOCK #{event.blockNumber.toLocaleString()}
                </div>

                {/* Action tag */}
                <div className="flex items-center gap-1.5">
                  <span style={{ color: cfg.color }}>{cfg.icon}</span>
                  <span
                    className="font-mono-label"
                    style={{ color: cfg.color, fontSize: 10 }}
                  >
                    {cfg.label}
                  </span>
                </div>

                {/* Delta */}
                {event.deltaAmount !== 0 && (
                  <div
                    className="stat-value text-sm font-bold"
                    style={{ color: event.deltaAmount > 0 ? 'var(--color-mint)' : 'var(--color-coral)' }}
                  >
                    {event.deltaAmount > 0 ? '+' : ''}{event.deltaAmount.toLocaleString()} tCO₂e
                  </div>
                )}

                {/* Label */}
                <div
                  className="text-xs"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {event.label}
                </div>

                {/* From/To */}
                {(event.from || event.to) && (
                  <div className="font-mono-label" style={{ color: 'var(--color-text-tertiary)', fontSize: 9 }}>
                    {event.from ? `FROM ${event.from}` : event.to ? `TO ${event.to}` : ''}
                  </div>
                )}

                {/* Running balance */}
                <div className="flex items-center justify-between">
                  <span className="font-mono-label" style={{ color: 'var(--color-text-tertiary)', fontSize: 9 }}>
                    BAL
                  </span>
                  <span
                    className="stat-value"
                    style={{ color: 'var(--color-text-secondary)', fontSize: 11 }}
                  >
                    {event.runningBalance.toLocaleString()}
                  </span>
                </div>

                {/* Tx hash */}
                <div className="mono-hash" style={{ fontSize: 9 }}>
                  {event.txHash}
                </div>

                {/* Date */}
                <div className="font-mono-label" style={{ color: 'var(--color-text-tertiary)', fontSize: 9 }}>
                  {formatDate(event.timestamp)}
                </div>
              </div>

              {/* Connector */}
              {!isLast && (
                <div
                  style={{
                    width: 24,
                    height: 1,
                    borderTop: '1px dashed rgba(255,255,255,0.2)',
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface BatchBarProps {
  holders: { label: string; amount: number; percentage: number }[];
  totalIssued: number;
}

const HOLDER_COLORS = [
  'var(--color-mint)',
  'var(--color-cyan)',
  'var(--color-amber)',
];

export function BatchHolderBar({ holders, totalIssued }: BatchBarProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Segmented bar */}
      <div className="flex w-full h-3 rounded-full overflow-hidden gap-px">
        {holders.map((h, i) => (
          h.percentage > 0 && (
            <div
              key={i}
              style={{
                width: `${h.percentage}%`,
                background: HOLDER_COLORS[i % HOLDER_COLORS.length],
                opacity: 0.8,
              }}
            />
          )
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-2">
        {holders.map((h, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="rounded-sm flex-shrink-0"
                style={{ width: 10, height: 10, background: HOLDER_COLORS[i % HOLDER_COLORS.length], opacity: 0.8 }}
              />
              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                {h.label}
              </span>
            </div>
            <span className="stat-value text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
              {h.amount.toLocaleString()} tCO₂e ({h.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
