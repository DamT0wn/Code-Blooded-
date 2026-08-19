'use client';

import Link from 'next/link';
import { Company, getInvestedProjectsForCompany } from '@/lib/company-data';
import { MonoLabel, CategoryTag, Badge } from '@/components/badge';
import { EvidenceScoreBar } from '@/components/evidence-score-bar';
import { MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

interface InvestedProjectsProps {
  company: Company;
}

export function InvestedProjects({ company }: InvestedProjectsProps) {
  const projects = getInvestedProjectsForCompany(company);

  return (
    <div className="card p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MonoLabel color="mint">INVESTED CARBON PROJECTS</MonoLabel>
          <span className="pill pill-mint text-[10px]">ACTIVE PORTFOLIO</span>
        </div>
        <span className="text-xs text-gray-400 font-mono">
          {projects.length} Projects Supported
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="card-alt p-5 flex flex-col justify-between gap-4 border border-white/10 hover:border-emerald-500/40 transition-all duration-200"
          >
            <div className="flex flex-col gap-3">
              {/* Eyebrow */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MonoLabel color="cyan">{project.id}</MonoLabel>
                  <CategoryTag category={project.category} />
                </div>
                <Badge variant="verified" icon>Verified ✓</Badge>
              </div>

              {/* Title & Location */}
              <div>
                <h3 className="font-bold text-white text-base leading-tight">
                  {project.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <MapPin size={11} className="text-gray-500" />
                  {project.location}
                </p>
              </div>

              {/* Descriptor */}
              <p className="text-xs text-gray-300">
                {project.metaLine}
              </p>

              {/* Credits & Price metrics */}
              <div className="p-3 rounded-lg bg-gray-900/80 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-gray-400 font-mono">
                    YOUR HOLDINGS
                  </div>
                  <div className="stat-value text-base font-bold text-emerald-400">
                    {project.creditsAvailable.toLocaleString()} tCO₂e
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-gray-400 font-mono">
                    UNIT PRICE
                  </div>
                  <div className="stat-value text-base font-bold text-white">
                    ₹{project.pricePerCredit.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Evidence Score */}
              <EvidenceScoreBar score={project.evidenceScore} />
            </div>

            {/* Passport CTA */}
            <Link
              href={`/passport/${project.id}`}
              id={`invested-passport-${project.id}`}
              className="btn-ghost justify-center text-xs py-2 w-full mt-2"
            >
              View Passport →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
