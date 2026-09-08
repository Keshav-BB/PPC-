'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { packages, engagementModels } from '@/data/packages';
import { CheckCircle2, ArrowRight, Sparkles, Calendar, HelpCircle, ShieldCheck } from 'lucide-react';
import { ConsultationContext } from '@/components/ClientLayoutWrapper';

export default function PackagesPage() {
  const { openConsultation } = useContext(ConsultationContext);

  return (
    <div className="bg-brand-bgSoft py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-brand-purple text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
            <span>Structured Scope & Commercials</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Packages & Engagement Models
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            We price our engagements around exact scope, team size, and complexity. No hidden fees, no opaque contracts — just predictable execution backed by an accountable SPOC.
          </p>
        </div>

        {/* Flagship Package Hero Spotlight */}
        {packages.filter((p) => p.isPopular).map((pkg) => (
          <div
            key={pkg.id}
            className="mb-16 rounded-3xl bg-gradient-to-br from-brand-navy via-slate-900 to-purple-950 text-white p-8 sm:p-12 shadow-2xl border border-slate-800 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pink text-white text-xs font-bold uppercase tracking-wider">
                  ★ Flagship Turnkey Solution
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-white">
                  {pkg.name}
                </h2>
                <p className="text-pink-300 font-semibold text-sm sm:text-base">
                  {pkg.tagline}
                </p>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  <strong>Best for:</strong> {pkg.bestFor}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {pkg.indicativeScope.map((scope, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-brand-pink shrink-0 mt-0.5" />
                      <span>{scope}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-4">
                <div className="flex justify-between items-center text-xs pb-3 border-b border-white/10">
                  <span className="text-slate-300">Standard Delivery:</span>
                  <span className="font-bold text-white">{pkg.timeline}</span>
                </div>
                <div className="flex justify-between items-center text-xs pb-3 border-b border-white/10">
                  <span className="text-slate-300">Engagement Type:</span>
                  <span className="font-bold text-white">{pkg.engagementType}</span>
                </div>
                <div className="flex justify-between items-center text-xs pb-3 border-b border-white/10">
                  <span className="text-slate-300">Accountability:</span>
                  <span className="font-bold text-emerald-400">Designated Partner SPOC</span>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => openConsultation(pkg.name)}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-95 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Request Business Launch Proposal</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 6 Remaining Packages Grid */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-black text-slate-900">
              Targeted Operational Packages
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Select an individual functional package or combine multiple areas for structured business scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.filter((p) => !p.isPopular).map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-card flex flex-col justify-between hover:shadow-hover hover:border-brand-purple/30 transition-all"
              >
                <div>
                  <h4 className="text-xl font-bold text-slate-900">
                    {pkg.name}
                  </h4>
                  <p className="text-xs font-semibold text-brand-pink mt-1">
                    {pkg.tagline}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    <strong className="text-slate-800">Best for:</strong> {pkg.bestFor}
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Indicative Scope:
                    </div>
                    <ul className="space-y-1.5">
                      {pkg.indicativeScope.slice(0, 4).map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-purple shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Timeline:</span>
                    <span className="font-semibold text-slate-800">{pkg.timeline}</span>
                  </div>

                  <button
                    onClick={() => openConsultation(pkg.name)}
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-brand-purple hover:text-white text-slate-800 font-bold text-xs transition-colors"
                  >
                    Request Custom Proposal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Engagement Models */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-card">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">
              How We Contract
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Five Standard Engagement Models
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Choose the commercial framework that matches your organization’s operational cash flow and governance model.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {engagementModels.map((model, idx) => (
              <div
                key={model.title}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-pink block mb-1">
                    Option 0{idx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">
                    {model.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {model.description}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-200/60">
                  <button
                    onClick={() => openConsultation(model.title)}
                    className="text-[11px] font-bold text-brand-purple hover:text-brand-pink flex items-center gap-1"
                  >
                    <span>Inquire Scope</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
