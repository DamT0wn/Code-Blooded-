'use client';

import Link from 'next/link';
import { MapPin, Leaf, Sun, Wind, Layers } from 'lucide-react';
import { Project } from '@/lib/mock-data';
import { EvidenceScoreBar } from './evidence-score-bar';
import { Badge, CategoryTag, MonoLabel } from './badge';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  FOREST:      <Leaf size={14} />,
  SOLAR:       <Sun size={14} />,
  WIND:        <Wind size={14} />,
  SOIL:        <Layers size={14} />,
  BLUE_CARBON: <Leaf size={14} />,
};

const BANNER_GRADIENTS: Record<string, string> = {
  FOREST:      'linear-gradient(135deg, #0d2c1a 0%, #1a4428 60%, #0f3322 100%)',
  SOLAR:       'linear-gradient(135deg, #0a1929 0%, #0d2540 60%, #061520 100%)',
  WIND:        'linear-gradient(135deg, #091622 0%, #0e2133 60%, #081420 100%)',
  SOIL:        'linear-gradient(135deg, #1a1205 0%, #2d1e08 60%, #1a1105 100%)',
  BLUE_CARBON: 'linear-gradient(135deg, #071c22 0%, #0c2e38 60%, #071a21 100%)',
};

const STATUS_VARIANT: Record<string, 'verified' | 'pending' | 'under-review' | 'rejected'> = {
  VERIFIED:     'verified',
  PENDING:      'pending',
  UNDER_REVIEW: 'under-review',
  REJECTED:     'rejected',
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const bannerGradient = BANNER_GRADIENTS[project.category] ?? BANNER_GRADIENTS.FOREST;
  const categoryIcon = CATEGORY_ICONS[project.category] ?? <Leaf size={14} />;
  const statusVariant = STATUS_VARIANT[project.status] ?? 'dim';

  return (
    <div
      className="card card-hover card-hover-mint flex flex-col overflow-hidden"
      style={{
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* Banner */}
      <div
        className="relative flex items-start justify-between px-4 py-3"
        style={{
          background: bannerGradient,
          minHeight: 80,
          borderBottom: '1px solid var(--border-hairline)',
        }}
      >
        {/* Category pattern dots */}
        <CategoryBannerPattern category={project.category} />

        {/* Top-left badge */}
        <Badge variant={statusVariant} icon={true}>
          {project.status === 'VERIFIED' ? '✓ VERIFIED' : project.status.replace('_', ' ')}
        </Badge>

        {/* Top-right tag */}
        <CategoryTag category={project.category} />
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        {/* Eyebrow */}
        <div className="flex items-center gap-1.5">
          <MonoLabel color="cyan">{project.id}</MonoLabel>
          <span className="font-mono-label" style={{ color: 'var(--color-text-tertiary)', fontSize: 10 }}>·</span>
          <span className="flex items-center gap-1" style={{ color: 'var(--color-text-tertiary)', fontSize: 11 }}>
            <MapPin size={10} />
            {project.location}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-semibold leading-tight"
          style={{ color: 'var(--color-text-primary)', fontSize: 15 }}
        >
          {project.name}
        </h3>

        {/* Meta line */}
        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          {project.metaLine}
        </p>

        {/* Credits / price row */}
        <div
          className="flex items-center justify-between py-2.5"
          style={{ borderTop: '1px solid var(--border-hairline)', borderBottom: '1px solid var(--border-hairline)' }}
        >
          <div>
            <div className="stat-value text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
              {project.creditsAvailable.toLocaleString()}
            </div>
            <div className="font-mono-label" style={{ color: 'var(--color-text-tertiary)', fontSize: 9 }}>
              CREDITS AVAILABLE (tCO₂e)
            </div>
          </div>
          <div className="text-right">
            <div className="stat-value text-base font-bold" style={{ color: 'var(--color-mint)' }}>
              ${project.pricePerCredit.toFixed(2)}
            </div>
            <div className="font-mono-label" style={{ color: 'var(--color-text-tertiary)', fontSize: 9 }}>
              PER tCO₂e
            </div>
          </div>
        </div>

        {/* Evidence score bar */}
        <EvidenceScoreBar score={project.evidenceScore} />

        {/* Action buttons */}
        <div className="flex gap-2 mt-auto">
          <Link
            href={`/passport/${project.id}`}
            id={`card-passport-${project.id}`}
            className="btn-ghost flex-1 text-center text-sm py-2.5"
            style={{ padding: '10px 12px', fontSize: 12 }}
          >
            View Passport →
          </Link>
          <button
            id={`card-buy-${project.id}`}
            className="btn-primary flex-1 text-sm"
            style={{ padding: '10px 12px', fontSize: 12 }}
            onClick={() => {
              // Opens modal — handled by parent
              const event = new CustomEvent('open-buy-modal', { detail: project });
              window.dispatchEvent(event);
            }}
          >
            Buy Credits
          </button>
        </div>
      </div>
    </div>
  );
}

function CategoryBannerPattern({ category }: { category: string }) {
  if (category === 'SOLAR') {
    return (
      <svg className="absolute inset-0 w-full h-full opacity-20" style={{ pointerEvents: 'none' }}>
        {/* Solar panel grid */}
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 8 }).map((_, col) => (
            <rect
              key={`${row}-${col}`}
              x={col * 20 + 2}
              y={row * 16 + 2}
              width={17}
              height={13}
              rx={1}
              fill="none"
              stroke="rgba(56,189,248,0.5)"
              strokeWidth={0.5}
            />
          ))
        )}
      </svg>
    );
  }
  if (category === 'FOREST' || category === 'BLUE_CARBON') {
    return (
      <svg className="absolute inset-0 w-full h-full opacity-15" style={{ pointerEvents: 'none' }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <circle
            key={i}
            cx={`${(i * 31 + 10) % 95}%`}
            cy={`${(i * 47 + 15) % 90}%`}
            r={4 + (i % 3) * 2}
            fill={`rgba(52,211,153,${0.3 + (i % 3) * 0.1})`}
          />
        ))}
      </svg>
    );
  }
  return null;
}
