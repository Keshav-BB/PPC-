'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2,
  Users,
  Receipt,
  Code2,
  FileSpreadsheet,
  Workflow,
  TrendingUp,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { solutions } from '@/data/solutions';

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-6 h-6 text-brand-purple" />,
  Users: <Users className="w-6 h-6 text-brand-pink" />,
  Receipt: <Receipt className="w-6 h-6 text-brand-purple" />,
  Code2: <Code2 className="w-6 h-6 text-brand-pink" />,
  FileSpreadsheet: <FileSpreadsheet className="w-6 h-6 text-brand-purple" />,
  Workflow: <Workflow className="w-6 h-6 text-brand-pink" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-brand-purple" />,
};

interface SolutionsGridProps {
  onOpenConsultation?: (serviceTitle?: string) => void;
}

export default function SolutionsGrid({ onOpenConsultation }: SolutionsGridProps) {
  return (
    <section id="solutions" className="py-16 sm:py-24 bg-brand-bgSoft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-brand-purple text-xs font-bold uppercase tracking-wider mb-2">
              Integrated Operating Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Seven Core Operating Solutions
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Everything your business needs to launch, staff, manage, digitize, and scale — delivered under one accountable team.
            </p>
          </div>
          <div>
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-purple hover:text-brand-pink transition-colors"
            >
              <span>Compare All Service Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 7 Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((item, idx) => (
            <div
              key={item.id}
              className={`bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-card hover:shadow-hover hover:border-brand-purple/30 transition-all duration-300 flex flex-col justify-between group ${
                idx === 0 ? 'lg:col-span-1 border-t-4 border-t-brand-purple' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-purple-50 group-hover:bg-purple-100 transition-colors">
                    {iconMap[item.iconName]}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    Pillar 0{idx + 1} • {item.category}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-brand-purple transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-brand-pink mt-1">
                  {item.headline}
                </p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {item.subheadline}
                </p>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Key Deliverables:
                  </div>
                  <ul className="space-y-1.5">
                    {item.servicesIncluded.slice(0, 3).map((serv, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-purple shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{serv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <Link
                  href={`/solutions/${item.slug}`}
                  className="text-xs font-bold text-slate-800 hover:text-brand-purple flex items-center gap-1 transition-colors"
                >
                  <span>Explore Scope</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => onOpenConsultation?.(item.title)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-brand-purple hover:text-white text-slate-700 transition-all"
                >
                  Discuss Need
                </button>
              </div>
            </div>
          ))}

          {/* 8th CTA Card */}
          <div className="bg-gradient-to-br from-brand-navy to-slate-900 rounded-3xl p-6 sm:p-7 text-white flex flex-col justify-between border border-slate-800 shadow-xl">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-pink-400">
                Flagship Turnkey Program
              </span>
              <h3 className="text-xl font-black text-white mt-1">
                Business Launch 360°
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Need an execution-ready business from Day 1? Business Launch 360° combines legal setup, HR, payroll, website, core SOPs, and growth under one coordinated team.
              </p>

              <div className="mt-4 p-3 rounded-2xl bg-white/10 text-xs text-slate-200 space-y-1">
                <div className="font-semibold text-white">Why founders love it:</div>
                <div>• No multi-vendor coordination burden</div>
                <div>• Single Point of Contact (SPOC) accountability</div>
                <div>• Typical implementation: approximately 3-4 weeks, subject to final scope, documentation readiness, statutory approvals and third-party dependencies.</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <Link
                href="/packages"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold text-xs flex items-center justify-center gap-2 shadow hover:opacity-95 transition-all"
              >
                <span>View Business Launch 360° Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
