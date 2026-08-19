'use client';

import { useEffect, useRef, useState } from 'react';
import { scoreColor } from '@/lib/mock-data';

interface EvidenceScoreBarProps {
  score: number;
  label?: string;
  showScore?: boolean;
  height?: number;
}

export function EvidenceScoreBar({
  score,
  label = 'Evidence Score',
  showScore = true,
  height = 6,
}: EvidenceScoreBarProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const color = scoreColor(score);

  const colorMap = {
    mint:  { bar: 'score-bar-fill-mint',  text: 'var(--color-mint)' },
    cyan:  { bar: 'score-bar-fill-cyan',  text: 'var(--color-cyan)' },
    amber: { bar: 'score-bar-fill-amber', text: 'var(--color-amber)' },
    coral: { bar: 'score-bar-fill-coral', text: 'var(--color-coral)' },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        <span
          className="font-mono-label"
          style={{ color: 'var(--color-text-tertiary)', fontSize: 10 }}
        >
          {label.toUpperCase()}
        </span>
        {showScore && (
          <span
            className="stat-value text-xs"
            style={{ color: colorMap[color].text }}
          >
            {score}/100
          </span>
        )}
      </div>
      <div className="score-bar-track" style={{ height }}>
        <div
          className={`score-bar-fill ${colorMap[color].bar}`}
          style={{
            width: animated ? `${score}%` : '0%',
          }}
        />
      </div>
    </div>
  );
}
