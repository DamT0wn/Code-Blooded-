'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface BeforeAfterSliderProps {
  beforeLabel?: string;
  afterLabel?: string;
  beforeYear?: number;
  afterYear?: number;
  beforeNdvi?: number;
  afterNdvi?: number;
}

export function BeforeAfterSlider({
  beforeLabel = 'BEFORE',
  afterLabel = 'AFTER',
  beforeYear = 2021,
  afterYear = 2023,
  beforeNdvi = 0.41,
  afterNdvi = 0.64,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(0.45);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    setPosition(Math.max(0.05, Math.min(0.95, x)));
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    e.preventDefault();
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (dragging.current) updatePosition(e.clientX);
    };
    const onMouseUp = () => { dragging.current = false; };
    const onTouchMove = (e: TouchEvent) => {
      if (dragging.current) updatePosition(e.touches[0].clientX);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [updatePosition]);

  return (
    <div className="w-full flex flex-col gap-3">
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ height: 240, borderRadius: 12, border: '1px solid var(--border-hairline)', cursor: 'ew-resize', userSelect: 'none' }}
      >
        {/* BEFORE panel (full width background) */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #0d2c1a 0%, #1a4428 40%, #0f3322 100%)',
          }}
        >
          {/* Before satellite imagery simulation */}
          <BeforeSatellite />
          {/* Before label */}
          <div
            className="absolute top-3 left-3 font-mono-label px-2 py-1 rounded"
            style={{ background: 'rgba(5,7,10,0.8)', color: 'var(--color-text-secondary)', fontSize: 10 }}
          >
            {beforeLabel} · {beforeYear}
          </div>
          <div
            className="absolute bottom-3 left-3 font-mono-label px-2 py-1 rounded"
            style={{ background: 'rgba(5,7,10,0.8)', color: 'var(--color-amber)', fontSize: 10 }}
          >
            NDVI avg: {beforeNdvi.toFixed(2)}
          </div>
        </div>

        {/* AFTER panel (clipped to slider position) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position * 100}%` }}
        >
          <div
            className="absolute inset-0"
            style={{
              width: `${100 / position}%`,
              background: 'linear-gradient(135deg, #0a3d1e 0%, #1a5c2e 40%, #0f4823 70%, #1a6b38 100%)',
            }}
          >
            <AfterSatellite />
            {/* After label */}
            <div
              className="absolute top-3 left-3 font-mono-label px-2 py-1 rounded"
              style={{ background: 'rgba(5,7,10,0.8)', color: 'var(--color-mint)', fontSize: 10 }}
            >
              {afterLabel} · {afterYear}
            </div>
            <div
              className="absolute bottom-3 left-3 font-mono-label px-2 py-1 rounded"
              style={{ background: 'rgba(5,7,10,0.8)', color: 'var(--color-mint)', fontSize: 10 }}
            >
              NDVI avg: {afterNdvi.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Divider handle */}
        <div
          className="absolute top-0 bottom-0 z-10 flex items-center justify-center"
          style={{
            left: `${position * 100}%`,
            width: 2,
            background: 'var(--color-mint)',
            transform: 'translateX(-50%)',
            cursor: 'ew-resize',
            boxShadow: '0 0 12px rgba(52,211,153,0.5)',
          }}
          onMouseDown={onMouseDown}
          onTouchStart={(e) => { dragging.current = true; }}
        >
          <div
            className="absolute"
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'var(--color-mint)',
              boxShadow: '0 0 16px rgba(52,211,153,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="14" height="10" viewBox="0 0 14 10">
              <polyline points="3,5 0,2 3,5 0,8" fill="none" stroke="#05070a" strokeWidth="1.5" />
              <line x1="0" y1="5" x2="14" y2="5" stroke="#05070a" strokeWidth="1.5" />
              <polyline points="11,2 14,5 11,8" fill="none" stroke="#05070a" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>

      <p
        className="text-xs text-center"
        style={{ color: 'var(--color-text-tertiary)', fontStyle: 'italic' }}
      >
        Drag to compare satellite imagery · NDVI change: +{(afterNdvi - beforeNdvi).toFixed(2)}
      </p>
    </div>
  );
}

// Simulated satellite imagery SVG backgrounds
function BeforeSatellite() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="xMidYMid slice">
      {/* Sparse, less healthy vegetation */}
      {Array.from({ length: 30 }).map((_, i) => (
        <ellipse
          key={i}
          cx={`${(i * 37 + 15) % 100}%`}
          cy={`${(i * 53 + 20) % 100}%`}
          rx={`${3 + (i % 4)}%`}
          ry={`${2 + (i % 3)}%`}
          fill={`rgba(${30 + i % 20},${80 + i % 30},${30 + i % 10},0.5)`}
        />
      ))}
      {/* Barren patches */}
      {Array.from({ length: 8 }).map((_, i) => (
        <rect
          key={i}
          x={`${(i * 41 + 5) % 90}%`}
          y={`${(i * 67 + 10) % 80}%`}
          width={`${8 + i % 6}%`}
          height={`${5 + i % 4}%`}
          fill="rgba(100,70,40,0.3)"
          rx="2"
        />
      ))}
    </svg>
  );
}

function AfterSatellite() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="xMidYMid slice">
      {/* Dense, healthy vegetation */}
      {Array.from({ length: 50 }).map((_, i) => (
        <ellipse
          key={i}
          cx={`${(i * 23 + 8) % 100}%`}
          cy={`${(i * 41 + 12) % 100}%`}
          rx={`${4 + (i % 5)}%`}
          ry={`${3 + (i % 4)}%`}
          fill={`rgba(${20 + i % 15},${100 + i % 40},${20 + i % 20},0.6)`}
        />
      ))}
    </svg>
  );
}
