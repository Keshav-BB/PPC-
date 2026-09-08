'use client';

import React, { useState } from 'react';
import { leadMagnets, LeadMagnet } from '@/data/leadMagnets';
import LeadMagnetModal from '@/components/LeadMagnetModal';
import { Download, CheckCircle2, Sparkles, BookOpen, ArrowRight } from 'lucide-react';

const articles = [
  {
    category: 'Business Setup',
    title: 'Private Limited vs LLP: Which Structure Is Right for Your 3-Year Vision?',
    snippet: 'A comprehensive comparative analysis covering statutory compliance overhead, investor eligibility, equity vesting, and tax implications in India.',
    readTime: '6 min read',
    date: 'September 2026'
  },
  {
    category: 'Payroll & Statutory',
    title: 'The Essential Guide to Monthly PF, ESI, and Professional Tax for Growing Startups',
    snippet: 'Avoid severe compliance penalties. Understanding mandatory wage cutoffs, employer vs employee deduction splits, and monthly return calendars.',
    readTime: '8 min read',
    date: 'September 2026'
  },
  {
    category: 'HR & People',
    title: 'Why You Need Documented KRA/KPI Matrices Before Your 10th Hire',
    snippet: 'How early role ambiguity creates founder bottlenecks, employee friction, and subjective performance evaluations—and how to fix it in 5 steps.',
    readTime: '5 min read',
    date: 'August 2026'
  },
  {
    category: 'Operations & SOPs',
    title: 'How to Document Business SOPs That Employees Actually Follow',
    snippet: 'Most standard operating procedures end up unread in dusty binders. Discover our visual, checklist-driven method for creating living SOPs.',
    readTime: '7 min read',
    date: 'August 2026'
  }
];

export default function InsightsPage() {
  const [selectedMagnet, setSelectedMagnet] = useState<LeadMagnet | null>(null);

  return (
    <div className="bg-brand-bgSoft py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-brand-purple text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-brand-pink" />
            <span>Operational Knowledge & Toolkits</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Insights, Guides & Business Toolkits
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Actionable resources designed to help entrepreneurs, founders, and operations leaders build robust business systems.
          </p>
        </div>

        {/* Free Downloadable Toolkits (Lead Magnets) */}
        <div className="mb-20">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-2xl font-black text-slate-900">
                Free Downloadable Toolkits & Templates
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Ready-to-use checklists, templates, and compliance calendars created by our execution team.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadMagnets.map((magnet) => (
              <div
                key={magnet.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-card flex flex-col justify-between hover:shadow-hover hover:border-brand-purple/30 transition-all"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-brand-purple border border-purple-100">
                      {magnet.category}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {magnet.downloadCount}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {magnet.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {magnet.description}
                  </p>

                  <div className="space-y-1 text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-200/60 mb-4">
                    {magnet.bullets.map((b, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-pink shrink-0" />
                        <span className="line-clamp-1">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setSelectedMagnet(magnet)}
                    className="w-full py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navyLight text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Toolkit (Free)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Practical Business Articles */}
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900">
              Practical Articles & Operational Blueprints
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Deep dives into statutory filings, employee management, and workflow automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((art, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card hover:border-brand-purple/40 hover:shadow-hover transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center text-xs mb-3">
                    <span className="font-bold text-brand-pink">{art.category}</span>
                    <span className="text-slate-400">{art.readTime} • {art.date}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {art.snippet}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-purple hover:text-brand-pink flex items-center gap-1 cursor-pointer">
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <LeadMagnetModal
        isOpen={!!selectedMagnet}
        onClose={() => setSelectedMagnet(null)}
        magnet={selectedMagnet}
      />
    </div>
  );
}
