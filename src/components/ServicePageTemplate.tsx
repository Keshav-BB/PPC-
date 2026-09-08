'use client';

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Calendar,
  Clock,
  Briefcase,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Users,
  Building2,
  Receipt,
  Code2,
  FileSpreadsheet,
  Workflow,
  TrendingUp,
  MessageCircle
} from 'lucide-react';
import { SolutionItem } from '@/data/solutions';
import { ConsultationContext } from './ClientLayoutWrapper';

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-8 h-8 text-brand-purple" />,
  Users: <Users className="w-8 h-8 text-brand-pink" />,
  Receipt: <Receipt className="w-8 h-8 text-brand-purple" />,
  Code2: <Code2 className="w-8 h-8 text-brand-pink" />,
  FileSpreadsheet: <FileSpreadsheet className="w-8 h-8 text-brand-purple" />,
  Workflow: <Workflow className="w-8 h-8 text-brand-pink" />,
  TrendingUp: <TrendingUp className="w-8 h-8 text-brand-purple" />,
};

interface ServicePageTemplateProps {
  solution: SolutionItem;
}

export default function ServicePageTemplate({ solution }: ServicePageTemplateProps) {
  const { openConsultation } = useContext(ConsultationContext);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <div className="bg-brand-bgSoft">
      {/* 1. HERO / BUSINESS OUTCOME */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 bg-white border-b border-slate-100">
        <div className="absolute top-0 right-10 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-brand-purple text-xs font-bold uppercase tracking-wider mb-4">
              <span className="p-1 rounded-md bg-white shadow-xs">
                {iconMap[solution.iconName]}
              </span>
              <span>Pillar: {solution.category}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {solution.headline}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              {solution.subheadline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => openConsultation(solution.title)}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-95 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Discuss Your Requirement</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/919840000000?text=${encodeURIComponent(`Hi People Point, I am interested in your ${solution.title} services and would like to discuss my requirements.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-sm flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Quick WhatsApp Chat</span>
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-6 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-purple" /> Timeline: {solution.timeline}
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-pink" /> 100% Dedicated SPOC Assigned
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2 & 3: PAIN POINTS VS HOW WE HELP */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pain Points */}
          <div className="p-8 rounded-3xl bg-red-50/40 border border-red-100 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span>Common Challenges & Bottlenecks</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              What Slows Businesses Down
            </h2>
            <ul className="space-y-3 pt-2">
              {solution.painPoints.map((pain, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <span className="text-red-500 font-bold text-sm">✕</span>
                  <span>{pain}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How We Help */}
          <div className="p-8 rounded-3xl bg-purple-50/60 border border-purple-100 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-purple">
              <Sparkles className="w-4 h-4 text-brand-pink" />
              <span>The People Point Approach</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              How We Solve It End-to-End
            </h2>
            <ul className="space-y-3 pt-2">
              {solution.howWeHelp.map((sol, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{sol}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4 & 6: SERVICES INCLUDED & DELIVERABLES */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Services Included */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">
                  Comprehensive Scope
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  Services Included in this Solution
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Every component is executed under strict standards and verified by function leads.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {solution.servicesIncluded.map((service, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-brand-navy to-slate-900 text-white rounded-3xl p-8 space-y-6 shadow-xl border border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-pink-300">
                  Tangible Outcomes
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  What You Receive (Deliverables)
                </h3>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                {solution.deliverables.map((deliv, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-pink shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="text-xs text-slate-300">
                  <strong>Expected Execution Timeline:</strong> {solution.timeline}
                </div>
                <div className="text-xs text-slate-300">
                  <strong>Engagement Models:</strong> {solution.engagementModels.join(', ')}
                </div>
              </div>

              <button
                onClick={() => openConsultation(solution.title)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold text-xs shadow-md hover:opacity-95 transition-all"
              >
                Request Detailed Scope & Proposal
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5 & 10: WHO IT IS FOR & CASE STUDY HIGHLIGHT */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Who It Is For */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-pink">
                Ideal Profile
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Who This Solution Is Built For
              </h3>
              <ul className="space-y-3 pt-4">
                {solution.targetAudience.map((aud, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
                    <span>{aud}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500 font-medium">
                Unsure if this fits your current team size? Our SPOC will review during your consultation.
              </span>
            </div>
          </div>

          {/* Relevant Case Study */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-brand-purple font-bold">
                  Client Success Highlight
                </span>
                <span className="text-slate-400 font-medium">{solution.caseStudyHighlight.industry}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-2">
                {solution.caseStudyHighlight.client}
              </h3>

              <div className="space-y-2.5 pt-3 text-xs text-slate-700">
                <div>
                  <strong className="text-slate-900 block font-semibold">The Challenge:</strong>
                  <p className="text-slate-600">{solution.caseStudyHighlight.challenge}</p>
                </div>
                <div>
                  <strong className="text-brand-purple block font-semibold">People Point Execution:</strong>
                  <p className="text-slate-600">{solution.caseStudyHighlight.solution}</p>
                </div>
                <div>
                  <strong className="text-emerald-700 block font-semibold">Measurable Result:</strong>
                  <p className="text-slate-900 font-medium">{solution.caseStudyHighlight.result}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/case-studies"
                className="text-xs font-bold text-brand-purple hover:text-brand-pink flex items-center gap-1"
              >
                <span>Read More Client Stories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11: FAQS */}
      {solution.faqs && solution.faqs.length > 0 && (
        <section className="py-16 sm:py-20 bg-white border-y border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">
                Got Questions?
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                {solution.title} FAQs
              </h3>
            </div>

            <div className="space-y-3">
              {solution.faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 overflow-hidden"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left font-bold text-sm text-slate-800 flex justify-between items-center hover:text-brand-purple"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 12: FINAL CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-brand-navy via-slate-900 to-brand-navy text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-400">
            Take Action Today
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Ready to Implement {solution.title}?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Schedule a confidential 30-minute consultation with our operations leads to review scope, milestones, and deliverables.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => openConsultation(solution.title)}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold text-sm shadow-lg hover:opacity-95 transition-all"
            >
              Book Free Consultation
            </button>
            <Link
              href="/solution-builder"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
            >
              Build Custom Solution
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
