'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import {
  Compass,
  Search,
  PenTool,
  Play,
  BarChart3,
  LifeBuoy,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { ConsultationContext } from '@/components/ClientLayoutWrapper';

const steps = [
  {
    num: '01',
    title: 'Understand & Discover',
    tagline: 'Deep Business Alignment',
    icon: <Compass className="w-6 h-6 text-brand-purple" />,
    description: 'We conduct a structured discovery session to understand your business model, current scale, operational pain points, and commercial objectives.',
    activities: [
      'Founder / leadership interview with our Partner SPOC',
      'Review of existing legal entity, employee records & contracts',
      'Clarification of target launch or turnaround deadlines',
      'Non-Disclosure Agreement (NDA) execution for complete data security'
    ]
  },
  {
    num: '02',
    title: 'Assess & Audit Gaps',
    tagline: 'Objective Systems Diagnostics',
    icon: <Search className="w-6 h-6 text-brand-pink" />,
    description: 'Our domain leads review your current legal compliance, HR documentation, payroll filings, software architecture, and workflow bottlenecks.',
    activities: [
      'Statutory compliance health check (PF, ESI, PT, GST, TDS)',
      'Operational bottleneck identification and founder dependency audit',
      'Technology stack evaluation and integration feasibility review',
      'Issuance of an actionable Gap Analysis & Systems Roadmap'
    ]
  },
  {
    num: '03',
    title: 'Design & Solution Blueprint',
    tagline: 'Detailed Architecture & Milestones',
    icon: <PenTool className="w-6 h-6 text-brand-purple" />,
    description: 'We translate your requirements into explicit deliverables, role matrices, SOP drafts, technical wireframes, and fixed milestone schedules.',
    activities: [
      'Comprehensive Scope of Work (SOW) with milestone signoffs',
      'Organization hierarchy chart and KRA/KPI framework design',
      'Standard Operating Procedure (SOP) flowcharts and approval matrix',
      'Database and technical architecture documentation'
    ]
  },
  {
    num: '04',
    title: 'Execute & Implement',
    tagline: 'Hands-On Delivery by Domain Specialists',
    icon: <Play className="w-6 h-6 text-brand-pink" />,
    description: 'Our internal teams execute the work directly. We draft legal documents, configure cloud HRMS, develop software, and set up growth funnels.',
    activities: [
      'Entity incorporation & statutory licensing execution',
      'Drafting legally-vetted offer letters, NDAs, and company handbooks',
      'Web application development, API integrations, and CRM alerts setup',
      'Standardized payroll register and bank disbursement configuration'
    ]
  },
  {
    num: '05',
    title: 'Measure & Validate',
    tagline: 'Rigorous Quality & SLA Audits',
    icon: <BarChart3 className="w-6 h-6 text-brand-purple" />,
    description: 'Every deliverable undergoes strict multi-tier quality checks. We ensure zero payroll errors, full regulatory conformance, and seamless code deployment.',
    activities: [
      'Pre-payroll verification and employee master validation',
      'Cross-browser and mobile responsive UI/UX testing',
      'Client review and formal acceptance signoff',
      'Deployment of executive MIS reports and performance tracking'
    ]
  },
  {
    num: '06',
    title: 'Support & Scale',
    tagline: 'Ongoing Operational Peace of Mind',
    icon: <LifeBuoy className="w-6 h-6 text-brand-pink" />,
    description: 'We don’t abandon you after launch. We transition into an ongoing monthly retainer or technical maintenance partner as your business scales.',
    activities: [
      'Dedicated Partner SPOC weekly sync meetings',
      'Monthly payroll processing and punctual statutory return filings',
      'Technical hosting, security patches, and feature additions',
      'Continuous operational audits to eliminate emerging bottlenecks'
    ]
  }
];

export default function HowWeWorkPage() {
  const { openConsultation } = useContext(ConsultationContext);

  return (
    <div className="bg-brand-bgSoft py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-brand-purple text-xs font-bold uppercase tracking-wider mb-3">
            Predictable Execution Blueprint
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            How We Work
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            We replace vendor chaos and informal coordination with a proven, 6-stage delivery framework governed by an accountable Single Point of Contact (SPOC).
          </p>
        </div>

        {/* 6 Steps Detailed Grid */}
        <div className="space-y-8 max-w-5xl mx-auto mb-20">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card flex flex-col md:flex-row gap-6 items-start hover:shadow-hover transition-all"
            >
              <div className="flex md:flex-col items-center gap-3 shrink-0">
                <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-100 shadow-xs">
                  {step.icon}
                </div>
                <span className="text-2xl font-black text-brand-navy">
                  {step.num}
                </span>
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-xl font-bold text-slate-900">
                    {step.title}
                  </h2>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-pink-50 text-brand-pink border border-pink-100">
                    {step.tagline}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>

                <div className="pt-2 border-t border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Key Activities & Checkpoints:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {step.activities.map((act, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-purple shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SPOC Guarantee Card */}
        <div className="rounded-3xl bg-gradient-to-br from-brand-navy via-slate-900 to-purple-950 text-white p-8 sm:p-12 shadow-2xl border border-slate-800 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold uppercase tracking-wider border border-pink-500/30">
            <ShieldCheck className="w-4 h-4 text-brand-pink" />
            <span>Accountability Standard</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Experience the Power of an Accountable SPOC
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            You will never be handed off to junior call centers. Our dedicated Client Operations Partners directly oversee client delivery syncs, ensuring your business systems are executed with precision.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => openConsultation('How We Work Discovery')}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold text-sm shadow-md hover:opacity-95 transition-all"
            >
              Book 30-Min Discovery Session
            </button>
            <Link
              href="/packages"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
            >
              Explore Packages
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
