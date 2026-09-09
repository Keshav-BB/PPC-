'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import TeamSection from '@/components/TeamSection';
import { ShieldCheck, Target, HeartHandshake, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';
import { ConsultationContext } from '@/components/ClientLayoutWrapper';

export default function AboutPage() {
  const { openConsultation } = useContext(ConsultationContext);

  return (
    <div className="bg-brand-bgSoft py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-brand-purple text-xs font-bold uppercase tracking-wider mb-3">
            <Target className="w-3.5 h-3.5 text-brand-pink" />
            <span>Our Purpose & Origin</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            We Help Founders Build the Systems Behind Their Business
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Born from the proven corporate foundation of Chennai Filings, People Point was built to bridge the painful divide between registering a company and actually running one.
          </p>
        </div>

        {/* Story & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 items-center">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-card space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-pink">
              The Reality of Scaling
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Why Traditional Consulting Leaves Founders Stranded
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Most entrepreneurs start with incredible domain passion. But very quickly, they find themselves drowning in the mundane operational machinery: chasing GST portals, writing offer letters, computing monthly PF deductions, wrestling with slow websites, and firefighting daily miscommunications.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Traditional consultancies only deliver high-level advice. Fragmented agencies only care about their narrow silo. Nobody took responsibility for the entire operating engine.
            </p>
            <div className="pt-2">
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 text-brand-purple font-bold text-xs sm:text-sm">
                “People Point was founded to be the single accountable execution partner every ambitious founder deserves.”
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-card flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-purple-100 text-brand-purple shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Rooted in Proven Corporate Experience</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Founded under the strategic stewardship of Bhavani (Founder of Chennai Filings), we bring years of deep institutional corporate governance and legal precision.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-card flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-pink-100 text-brand-pink shrink-0">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">People + Process + Technology</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  We don’t believe in technology without trained people, nor people without documented standard operating procedures. We integrate all three seamlessly.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-card flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Direct Partner SPOC Accountability</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Our leadership partners personally direct client delivery, ensuring high-touch responsiveness, strict NDAs, and punctual SLA turnaround.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Team Section */}
        <TeamSection />

        {/* Final CTA */}
        <div className="mt-16 text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Let’s Build Something Great Together
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Whether you are launching your first company or structuring an existing 50-person enterprise, we’d love to learn about your vision.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openConsultation('About Page CTA')}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold text-sm shadow-md hover:opacity-95 transition-all"
            >
              Book a Free Business Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
