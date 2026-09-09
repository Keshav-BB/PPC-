'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { caseStudies } from '@/data/caseStudies';
import { CheckCircle2, ArrowRight, Sparkles, Building, Calendar, Quote } from 'lucide-react';
import { ConsultationContext } from '@/components/ClientLayoutWrapper';

export default function CaseStudiesPage() {
  const { openConsultation } = useContext(ConsultationContext);

  return (
    <div className="bg-brand-bgSoft py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-brand-purple text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
            <span>Representative Client Scenarios</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Case Studies & Business Scenarios
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Detailed breakdowns of how People Point solves corporate setup, operational bottlenecks, payroll compliance, and technology challenges for growing companies. These examples illustrate the types of business challenges we support. Results vary depending on business conditions and implementation scope.
          </p>
        </div>

        {/* Detailed Case Studies Stack */}
        <div className="space-y-12 max-w-5xl mx-auto mb-20">
          {caseStudies.map((cs) => (
            <div
              key={cs.id}
              id={cs.id}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-card space-y-8"
            >
              {/* Top Meta */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-pink">
                      {cs.industry}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px] font-semibold">
                      Illustrative Business Scenario
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    {cs.clientTitle}
                  </h2>
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  Scale: {cs.teamSize}
                </span>
              </div>

              {/* Challenge vs Approach */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-red-50/40 border border-red-100 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-red-700">
                    The Business Challenge:
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {cs.challenge}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-purple">
                    People Point Strategic Approach:
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {cs.approach}
                  </p>
                </div>
              </div>

              {/* Implementation */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                  What Was Implemented:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cs.implementation.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                      <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Measurable Results */}
              <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Measurable Business Outcomes:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  {cs.results.map((res, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-900 font-semibold">
                      <span className="text-emerald-600 font-black">✔</span>
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Quote */}
              {cs.quote && (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-3 italic text-xs sm:text-sm text-slate-700">
                  <Quote className="w-6 h-6 text-brand-purple shrink-0" />
                  <div>
                    <p className="mb-2">“{cs.quote.text}”</p>
                    <div className="not-italic font-bold text-slate-900 text-xs">
                      — {cs.quote.author}, <span className="text-slate-500 font-normal">{cs.quote.role}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-100">
                * This example illustrates the type of business challenge People Point can support. Results vary depending on business conditions and implementation scope.
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-navy to-purple-950 text-white text-center max-w-4xl mx-auto space-y-4 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Have a Similar Operational Challenge?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Book a complimentary session with our partners to discuss how we can build structured systems for your business.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openConsultation('Case Studies Page Inquiry')}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold text-sm shadow-md hover:opacity-95 transition-all"
            >
              Book Free Business Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
