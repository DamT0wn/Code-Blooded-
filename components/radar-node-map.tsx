'use client';

import { useEffect, useRef, useState } from 'react';

const NODE_POSITIONS = [
  { angle: 0,   label: '0x1A', x: 0,    y: -1 },
  { angle: 90,  label: '0x7E', x: 1,    y: 0 },
  { angle: 180, label: '0x2C', x: 0,    y: 1 },
  { angle: 270, label: '0x9F', x: -1,   y: 0 },
];

export function RadarNodeMap() {
  const [pulse, setPulse] = useState(0);
  const center = 200;
  const ringRadii = [60, 100, 140, 180];
  const nodeRadius = 160;

  // Node positions (calculated from angle)
  const nodes = NODE_POSITIONS.map(({ angle, label }) => {
    const rad = (angle * Math.PI) / 180;
    return {
      label,
      cx: center + nodeRadius * Math.sin(rad),
      cy: center - nodeRadius * Math.cos(rad),
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => (p + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative" style={{ width: 400, height: 400 }}>
      <svg
        viewBox="0 0 400 400"
        width="100%"
        height="100%"
        style={{ overflow: 'visible' }}
      >
        {/* Rotating rings group */}
        <g
          style={{
            transformOrigin: `${center}px ${center}px`,
            animation: 'radar-spin 60s linear infinite',
          }}
        >
          {ringRadii.map((r, i) => (
            <circle
              key={r}
              cx={center}
              cy={center}
              r={r}
              fill="none"
              stroke={i % 2 === 0 ? 'rgba(52,211,153,0.12)' : 'rgba(56,189,248,0.08)'}
              strokeWidth={1}
              strokeDasharray={i % 2 === 0 ? 'none' : '4 6'}
            />
          ))}
          {/* Cross hairs */}
          <line x1={center} y1={center - 185} x2={center} y2={center + 185} stroke="rgba(52,211,153,0.06)" strokeWidth={1} />
          <line x1={center - 185} y1={center} x2={center + 185} y2={center} stroke="rgba(52,211,153,0.06)" strokeWidth={1} />
        </g>

        {/* Satellite connector */}
        <line
          x1={center}
          y1={center - 195}
          x2={center}
          y2={center - 145}
          stroke="rgba(56,189,248,0.4)"
          strokeWidth={1}
          strokeDasharray="3 4"
        />
        {/* Satellite glyph */}
        <g transform={`translate(${center - 14}, ${center - 218})`}>
          <rect x={0} y={4} width={28} height={10} rx={2} fill="none" stroke="rgba(56,189,248,0.7)" strokeWidth={1} />
          <rect x={-8} y={5} width={8} height={8} rx={1} fill="rgba(56,189,248,0.25)" stroke="rgba(56,189,248,0.5)" strokeWidth={0.8} />
          <rect x={28} y={5} width={8} height={8} rx={1} fill="rgba(56,189,248,0.25)" stroke="rgba(56,189,248,0.5)" strokeWidth={0.8} />
          <circle cx={14} cy={9} r={2.5} fill="rgba(56,189,248,0.6)" />
          <line x1={14} y1={0} x2={14} y2={4} stroke="rgba(56,189,248,0.5)" strokeWidth={0.8} />
        </g>
        {/* Satellite label */}
        <text
          x={center + 18}
          y={center - 205}
          fill="rgba(56,189,248,0.7)"
          fontSize={8}
          fontFamily="monospace"
          letterSpacing="0.1em"
        >
          SATELLITE LAYER
        </text>

        {/* Forest polygon blobs */}
        <ellipse
          cx={center - 28}
          cy={center + 18}
          rx={26}
          ry={20}
          fill="rgba(52,211,153,0.08)"
          stroke="rgba(52,211,153,0.2)"
          strokeWidth={1}
        />
        <ellipse
          cx={center + 22}
          cy={center - 12}
          rx={18}
          ry={14}
          fill="rgba(52,211,153,0.06)"
          stroke="rgba(52,211,153,0.15)"
          strokeWidth={1}
        />
        {/* Upward arrows */}
        <g transform={`translate(${center - 30}, ${center + 6})`}>
          <line x1={4} y1={8} x2={4} y2={0} stroke="var(--color-mint)" strokeWidth={1.5} />
          <polyline points="1,3 4,0 7,3" fill="none" stroke="var(--color-mint)" strokeWidth={1.5} />
        </g>
        <g transform={`translate(${center + 20}, ${center - 22})`}>
          <line x1={3} y1={6} x2={3} y2={0} stroke="var(--color-mint)" strokeWidth={1.5} />
          <polyline points="0,3 3,0 6,3" fill="none" stroke="var(--color-mint)" strokeWidth={1.5} />
        </g>

        {/* Center badge */}
        <g transform={`translate(${center - 36}, ${center - 20})`}>
          <rect
            x={0}
            y={0}
            width={72}
            height={40}
            rx={8}
            fill="rgba(11,15,18,0.9)"
            stroke="rgba(52,211,153,0.3)"
            strokeWidth={1}
          />
          <text
            x={36}
            y={14}
            textAnchor="middle"
            fill="rgba(244,246,245,0.6)"
            fontSize={7}
            fontFamily="monospace"
            letterSpacing="0.12em"
          >
            CO₂ CREDIT
          </text>
          <text
            x={36}
            y={28}
            textAnchor="middle"
            fill="#34d399"
            fontSize={11}
            fontFamily="monospace"
            fontWeight="bold"
          >
            ✓ VERIFIED
          </text>
        </g>

        {/* Blockchain node markers */}
        {nodes.map((node, i) => (
          <g key={node.label}>
            {/* Connector to center */}
            <line
              x1={center}
              y1={center}
              x2={node.cx}
              y2={node.cy}
              stroke="rgba(56,189,248,0.12)"
              strokeWidth={1}
              strokeDasharray="3 5"
            />
            {/* Node circle */}
            <circle
              cx={node.cx}
              cy={node.cy}
              r={16}
              fill="rgba(11,15,18,0.9)"
              stroke={pulse === i ? 'rgba(56,189,248,0.8)' : 'rgba(56,189,248,0.35)'}
              strokeWidth={pulse === i ? 2 : 1}
              style={{
                filter: pulse === i ? 'drop-shadow(0 0 8px rgba(56,189,248,0.6))' : 'none',
                transition: 'all 400ms ease',
              }}
            />
            <text
              x={node.cx}
              y={node.cy + 4}
              textAnchor="middle"
              fill={pulse === i ? '#38bdf8' : 'rgba(56,189,248,0.7)'}
              fontSize={8}
              fontFamily="monospace"
              letterSpacing="0.05em"
              fontWeight="600"
            >
              {node.label}
            </text>
          </g>
        ))}

        {/* Bottom labels */}
        <text
          x={center - 155}
          y={center + 195}
          fill="rgba(56,189,248,0.5)"
          fontSize={8}
          fontFamily="monospace"
          letterSpacing="0.1em"
        >
          BLOCKCHAIN NODES
        </text>
        <text
          x={center + 30}
          y={center + 195}
          fill="rgba(52,211,153,0.5)"
          fontSize={8}
          fontFamily="monospace"
          letterSpacing="0.1em"
        >
          FOREST PROJECTS
        </text>
      </svg>
    </div>
  );
}
