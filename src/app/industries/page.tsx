'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import { ConsultationContext } from '@/components/ClientLayoutWrapper';

const industriesData = [
  {
    title: 'Technology & SaaS Ventures',
    badge: 'High-Growth Startups',
    icon: '💻',
    challenge: 'Managing rapid hiring surges, ESOP documentation, intellectual property assignments, and cross-functional engineering delivery.',
    howWeHelp: 'We handle developer recruitment screening, standard NDAs and IP assignment deeds, cloud payroll, and custom client portal development.',
    results: 'Accelerated investor due-diligence readiness and zero contract ambiguities.'
  },
  {
    title: 'Retail & Omnichannel E-commerce',
    badge: 'D2C & Marketplace Brands',
    icon: '🛍️',
    challenge: 'Multi-platform settlements (Amazon, Shopify), untracked return deductions, inventory mismatch, and volatile ad costs.',
    howWeHelp: 'We deploy centralized bookkeeping reconciliations, warehouse dispatch SOPs, and conversion-optimized Meta/Google Ads funnels.',
    results: 'Substantial recovery of untracked marketplace dues and improved ad ROAS.'
  },
  {
    title: 'Healthcare & Clinical Diagnostic Centers',
    badge: 'Clinical Networks',
    icon: '🩺',
    challenge: 'Shift roster chaos, high frontline receptionist turnover, inconsistent patient wait-times, and biometric payroll disconnect.',
    howWeHelp: 'We author clinic-floor SOPs, implement biometric-integrated payroll, design KRA scorecards for center managers, and conduct training.',
    results: 'Reduced frontline staff attrition and improved patient check-in velocity.'
  },
  {
    title: 'Manufacturing & Industrial Fabrication',
    badge: 'Engineering & Plants',
    icon: '⚙️',
    challenge: 'Founder bottleneck in daily purchase approvals, worker attendance disputes, delayed client deliveries, and informal vendor ledgers.',
    howWeHelp: 'We establish 3-tier financial approval matrices, factory compliance audits (PF/ESI/Factory Act), and order tracking workflows.',
    results: 'Over 30% reduction in order turnaround time and audit-ready books.'
  },
  {
    title: 'Professional Services & Consultancies',
    badge: 'B2B Service Agencies',
    icon: '📊',
    challenge: 'Scope creep, unbilled retainer hours, lack of dedicated client onboarding workflows, and inconsistent sales pipelines.',
    howWeHelp: 'We implement client onboarding SOPs, milestone-based agreement templates, CRM pipelines, and automated WhatsApp payment reminders.',
    results: 'Predictable retainer renewals and shortened sales cycles.'
  },
  {
    title: 'US & Global Cross-Border Operations',
    badge: 'Offshore & Remote Teams',
    icon: '🌐',
    challenge: 'Foreign entities needing structured, compliant India-based personnel, local payroll processing, and disciplined backend operations.',
    howWeHelp: 'We provide scope-bounded payroll coordination, statutory compliance oversight, contractor agreements, and dedicated offshore SPOC bridge.',
    results: 'Seamless cross-border payroll runs with strict local regulatory compliance.'
  }
];

export default function IndustriesPage() {
  const { openConsultation } = useContext(ConsultationContext);

  return (
    <div className="bg-brand-bgSoft py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-brand-purple text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
            <span>Targeted Industry Expertise</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Industries We Support
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Every industry has unique statutory regulations, operational handovers, and compliance nuances. Here are the sectors where our team brings practical operational and compliance experience.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {industriesData.map((ind) => (
            <div
              key={ind.title}
              className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-card flex flex-col justify-between hover:shadow-hover hover:border-brand-purple/30 transition-all"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-3xl">{ind.icon}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {ind.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {ind.title}
                </h3>

                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="p-3 rounded-2xl bg-red-50/40 border border-red-100">
                    <strong className="text-red-800 block mb-0.5">Industry Challenge:</strong>
                    <p className="text-slate-600">{ind.challenge}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-purple-50/50 border border-purple-100">
                    <strong className="text-brand-purple block mb-0.5">How People Point Solves It:</strong>
                    <p className="text-slate-600">{ind.howWeHelp}</p>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => openConsultation(`${ind.title} Consultation`)}
                  className="text-xs font-bold text-brand-purple hover:text-brand-pink flex items-center gap-1"
                >
                  <span>Discuss Industry Scope</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-navy to-purple-950 text-white text-center max-w-4xl mx-auto space-y-4 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Operate in a Specialized Niche?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Our systems architecture is modular. Speak with our Partner SPOC to evaluate how our frameworks adapt to your specific operating model.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openConsultation('Specialized Industry Inquiry')}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold text-sm shadow-md hover:opacity-95 transition-all"
            >
              Schedule an Industry Discovery Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
