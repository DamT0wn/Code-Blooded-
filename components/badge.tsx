'use client';

import { CheckCircle, Clock, AlertTriangle, XCircle } from 'lucide-react';

type BadgeVariant = 'verified' | 'pending' | 'under-review' | 'rejected' | 'mint' | 'cyan' | 'amber' | 'coral' | 'dim';
type PillVariant = 'mint' | 'cyan' | 'amber' | 'coral' | 'dim';

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  icon?: boolean;
  className?: string;
}

interface PillProps {
  variant?: PillVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const STATUS_CONFIG: Record<string, { pillClass: string; icon: React.ReactNode; label: string }> = {
  verified:     { pillClass: 'pill-mint',  icon: <CheckCircle size={11} />,   label: 'Verified' },
  pending:      { pillClass: 'pill-amber', icon: <Clock size={11} />,         label: 'Pending' },
  'under-review': { pillClass: 'pill-cyan', icon: <AlertTriangle size={11} />, label: 'Under Review' },
  rejected:     { pillClass: 'pill-coral', icon: <XCircle size={11} />,       label: 'Rejected' },
  mint:         { pillClass: 'pill-mint',  icon: null, label: '' },
  cyan:         { pillClass: 'pill-cyan',  icon: null, label: '' },
  amber:        { pillClass: 'pill-amber', icon: null, label: '' },
  coral:        { pillClass: 'pill-coral', icon: null, label: '' },
  dim:          { pillClass: 'pill-dim',   icon: null, label: '' },
};

export function Badge({ variant, children, icon = true, className = '' }: BadgeProps) {
  const config = STATUS_CONFIG[variant] ?? STATUS_CONFIG['dim'];
  return (
    <span className={`pill ${config.pillClass} ${className}`}>
      {icon && config.icon}
      {children}
    </span>
  );
}

export function Pill({ variant = 'dim', children, className = '', dot = false }: PillProps) {
  const config = STATUS_CONFIG[variant] ?? STATUS_CONFIG['dim'];
  return (
    <span className={`pill ${config.pillClass} ${className}`}>
      {dot && (
        <span
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{
            background: variant === 'mint' ? 'var(--color-mint)' :
                        variant === 'cyan' ? 'var(--color-cyan)' :
                        variant === 'amber' ? 'var(--color-amber)' :
                        variant === 'coral' ? 'var(--color-coral)' :
                        'rgba(255,255,255,0.4)',
          }}
        />
      )}
      {children}
    </span>
  );
}

export function CategoryTag({ category }: { category: string }) {
  const styles: Record<string, { bg: string; text: string }> = {
    FOREST:      { bg: 'rgba(52,211,153,0.12)', text: 'var(--color-mint)' },
    SOLAR:       { bg: 'rgba(56,189,248,0.12)', text: 'var(--color-cyan)' },
    WIND:        { bg: 'rgba(56,189,248,0.12)', text: 'var(--color-cyan)' },
    SOIL:        { bg: 'rgba(251,191,36,0.12)', text: 'var(--color-amber)' },
    BLUE_CARBON: { bg: 'rgba(52,211,153,0.12)', text: 'var(--color-mint)' },
  };
  const s = styles[category] ?? { bg: 'rgba(255,255,255,0.06)', text: 'var(--color-text-secondary)' };
  return (
    <span
      className="font-mono-label"
      style={{
        background: s.bg,
        color: s.text,
        padding: '3px 8px',
        borderRadius: 6,
        fontSize: 10,
      }}
    >
      {category.replace('_', ' ')}
    </span>
  );
}

export function MonoLabel({ children, className = '', color = 'tertiary' }: {
  children: React.ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'tertiary' | 'mint' | 'cyan' | 'amber';
}) {
  const colorMap = {
    primary:   'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    tertiary:  'var(--color-text-tertiary)',
    mint:      'var(--color-mint)',
    cyan:      'var(--color-cyan)',
    amber:     'var(--color-amber)',
  };
  return (
    <span
      className={`font-mono-label ${className}`}
      style={{ color: colorMap[color] }}
    >
      {children}
    </span>
  );
}
