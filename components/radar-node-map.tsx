'use client';

import React from 'react';
import { Satellite, Check } from 'lucide-react';

export function RadarNodeMap() {
  const center = 220;
  const outerRadius = 145;
  const middleRadius = 105;
  const innerRadius = 65;

  return (
    <div className="relative w-full h-full max-w-[440px] aspect-square flex items-center justify-center select-none">
      {/* ── SVG Radar Grid Lines & Rings ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 440 440"
        fill="none"
      >
        <defs>
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Radar Concentric Circles */}
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          stroke="rgba(52, 211, 153, 0.3)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />
        <circle
          cx={center}
          cy={center}
          r={middleRadius}
          stroke="rgba(52, 211, 153, 0.35)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />
        <circle
          cx={center}
          cy={center}
          r={outerRadius}
          stroke="rgba(52, 211, 153, 0.55)"
          strokeWidth="1.2"
          strokeDasharray="3 4"
          filter="url(#neonGlow)"
        />

        {/* Crosshair Lines connecting nodes to center */}
        <line
          x1={center}
          y1={center - outerRadius}
          x2={center}
          y2={center + outerRadius}
          stroke="#34d399"
          strokeWidth="1.2"
          strokeOpacity="0.85"
          filter="url(#neonGlow)"
        />
        <line
          x1={center - outerRadius}
          y1={center}
          x2={center + outerRadius}
          y2={center}
          stroke="#34d399"
          strokeWidth="1.2"
          strokeOpacity="0.85"
          filter="url(#neonGlow)"
        />

        {/* Radar Node Line Dots */}
        <circle cx={center} cy={center - 105} r="2" fill="#34d399" />
        <circle cx={center} cy={center + 105} r="2" fill="#34d399" />
        <circle cx={center - 105} cy={center} r="2" fill="#34d399" />
        <circle cx={center + 105} cy={center} r="2" fill="#34d399" />

        <circle cx={center} cy={center - 65} r="1.8" fill="#34d399" />
        <circle cx={center} cy={center + 65} r="1.8" fill="#34d399" />
        <circle cx={center - 65} cy={center} r="1.8" fill="#34d399" />
        <circle cx={center + 65} cy={center} r="1.8" fill="#34d399" />
      </svg>

      {/* ── Top Badge: SATELLITE LAYER ── */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-xl bg-[#090e13]/45 backdrop-blur-md border border-slate-700/80 shadow-lg flex items-center gap-2.5">
        <div className="w-5 h-5 rounded flex items-center justify-center text-emerald-400">
          <Satellite size={16} />
        </div>
        <span className="text-xs font-mono font-bold tracking-widest text-white uppercase">
          SATELLITE LAYER
        </span>
      </div>

      {/* ── Top Circular Blockchain Node: 0x1A ── */}
      <div
        className="absolute z-20 w-14 h-14 rounded-full bg-[#060a0d]/45 backdrop-blur-md border-2 border-emerald-400 text-emerald-300 font-mono font-extrabold text-sm flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.45)]"
        style={{ top: `${center - outerRadius - 28}px`, left: `${center - 28}px` }}
      >
        0x1A
      </div>

      {/* ── Bottom Circular Blockchain Node: 0x2C ── */}
      <div
        className="absolute z-20 w-14 h-14 rounded-full bg-[#060a0d]/45 backdrop-blur-md border-2 border-emerald-400 text-emerald-300 font-mono font-extrabold text-sm flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.45)]"
        style={{ top: `${center + outerRadius - 28}px`, left: `${center - 28}px` }}
      >
        0x2C
      </div>

      {/* ── Left Circular Blockchain Node: 0x9F ── */}
      <div
        className="absolute z-20 w-14 h-14 rounded-full bg-[#060a0d]/45 backdrop-blur-md border-2 border-emerald-400 text-emerald-300 font-mono font-extrabold text-sm flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.45)]"
        style={{ top: `${center - 28}px`, left: `${center - outerRadius - 28}px` }}
      >
        0x9F
      </div>

      {/* ── Right Circular Blockchain Node: 0x7E ── */}
      <div
        className="absolute z-20 w-14 h-14 rounded-full bg-[#060a0d]/45 backdrop-blur-md border-2 border-emerald-400 text-emerald-300 font-mono font-extrabold text-sm flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.45)]"
        style={{ top: `${center - 28}px`, left: `${center + outerRadius - 28}px` }}
      >
        0x7E
      </div>

      {/* ── Central Glassmorphism Card: CO₂ CREDIT / VERIFIED ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 px-6 py-4 rounded-2xl bg-[#060b0e]/45 backdrop-blur-md border border-emerald-500/50 shadow-[0_0_35px_rgba(16,185,129,0.3)] flex flex-col items-center justify-center gap-1.5 min-w-[150px]">
        <span className="text-[11px] font-mono tracking-widest text-slate-300 uppercase font-bold">
          CO₂ CREDIT
        </span>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-black">
            <Check size={16} strokeWidth={3.5} />
          </div>
          <span className="text-emerald-400 font-mono font-extrabold text-lg tracking-wide">
            VERIFIED
          </span>
        </div>
      </div>
    </div>
  );
}
