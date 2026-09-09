'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Lightbulb,
  Building2,
  Users,
  Receipt,
  Workflow,
  Code2,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface JourneyItem {
  id: string;
  question: string;
  actionTag: string;
  icon: React.ReactNode;
  stage: string;
  needs: string;
  response: string;
  solutionLink: string;
  highlightPoints: string[];
}

const journeys: JourneyItem[] = [
  {
    id: 'idea',
    question: 'I have a business idea',
    actionTag: 'Help me launch.',
    icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
    stage: 'Start',
    needs: 'Registration, launch plan, website, initial hiring, foundational HR, operating checklist.',
    response: 'Business Setup & Launch Support (Business Launch 360°)',
    solutionLink: '/solutions/business-setup',
    highlightPoints: [
      'Typical incorporation timeline: approximately 7-14 working days after complete documentation, subject to MCA and applicable government processing.',
      'Applicable statutory registrations may include GST, MSME/Udyam, PAN/TAN, PT and others based on entity type, location and statutory eligibility.',
      'Launch checklist and operating structure',
      'Turnkey handover to initial operations'
    ]
  },
  {
    id: 'incorporation',
    question: 'I’m starting a company',
    actionTag: 'Set up my business.',
    icon: <Building2 className="w-5 h-5 text-brand-purple" />,
    stage: 'Start',
    needs: 'Legal entity, bank accounts, director documentation, GST/tax registrations, compliance foundation.',
    response: 'Business Setup & Registration Services',
    solutionLink: '/solutions/business-setup',
    highlightPoints: [
      'Corporate entity advisory tailored to funding roadmap',
      'Bank resolution & capitalization support',
      'Statutory compliance filing kit',
      'Founders agreements & initial IP protection'
    ]
  },
  {
    id: 'team',
    question: 'I need employees',
    actionTag: 'Build my team.',
    icon: <Users className="w-5 h-5 text-brand-pink" />,
    stage: 'Build',
    needs: 'Structured hiring, legally sound offer letters, job descriptions, employee handbook, onboarding.',
    response: 'Recruitment, HR Operations & Documentation',
    solutionLink: '/solutions/hr-people',
    highlightPoints: [
      'Full-funnel recruitment with structured interviews',
      'Offer letters, employment contracts & NDAs',
      'Role clarity with documented KRA / KPI matrices',
      'Employee handbook & statutory leave policies'
    ]
  },
  {
    id: 'payroll',
    question: 'I need HR & payroll',
    actionTag: 'Manage my people.',
    icon: <Receipt className="w-5 h-5 text-emerald-600" />,
    stage: 'Manage',
    needs: 'Punctual monthly salary calculations, digital payslips, PF/ESI/PT filings, HRMS setup, leave tracking.',
    response: 'Payroll, Compliance & Cloud HRMS',
    solutionLink: '/solutions/payroll-compliance',
    highlightPoints: [
      'Structured & review-controlled monthly salary processing',
      'Timely PF, ESI, Professional Tax & TDS compliance',
      'Self-service employee portal for digital payslips',
      'India & US cross-border payroll coordination'
    ]
  },
  {
    id: 'operations',
    question: 'My operations are unstructured',
    actionTag: 'Structure my processes.',
    icon: <Workflow className="w-5 h-5 text-indigo-600" />,
    stage: 'Operate',
    needs: 'Eliminating founder bottlenecks, writing SOPs, role hierarchies, approval gates, MIS reporting.',
    response: 'SOPs, Process Design, KRA/KPI & Reporting',
    solutionLink: '/solutions/process-operations',
    highlightPoints: [
      'End-to-end business workflow mapping',
      'Standard Operating Procedures (SOPs) manual',
      'Delegation of Authority & financial approval matrix',
      'Executive MIS reports for margin and cash clarity'
    ]
  },
  {
    id: 'technology',
    question: 'I need software & automation',
    actionTag: 'Digitize my business.',
    icon: <Code2 className="w-5 h-5 text-cyan-600" />,
    stage: 'Digitize',
    needs: 'High-converting website, custom portal, CRM pipeline, WhatsApp notifications, workflow automation.',
    response: 'Software, Web, CRM, HRMS & Integrations',
    solutionLink: '/solutions/technology',
    highlightPoints: [
      'Custom Next.js web application engineering',
      'CRM implementation with automated lead alerts',
      'API integrations: WhatsApp, payments, SMS, accounting',
      'Continuous hosting, maintenance & technical AMC'
    ]
  },
  {
    id: 'growth',
    question: 'I need more customers & leads',
    actionTag: 'Grow my business.',
    icon: <TrendingUp className="w-5 h-5 text-brand-pink" />,
    stage: 'Grow',
    needs: 'High-intent lead generation, Google/Meta ad management, conversion landing pages, SEO authority.',
    response: 'Digital Marketing & Growth Support',
    solutionLink: '/solutions/digital-marketing',
    highlightPoints: [
      'Performance marketing on Meta & Google Ads',
      'High-converting landing page design & A/B testing',
      'Transparent ROAS and Cost Per Lead (CPL) dashboards',
      'End-to-end UTM attribution to won revenue'
    ]
  }
];

interface BusinessJourneySelectorProps {
  onOpenConsultation?: () => void;
  onOpenChat?: (stage: string) => void;
}

export default function BusinessJourneySelector({ onOpenConsultation, onOpenChat }: BusinessJourneySelectorProps) {
  const [activeJourney, setActiveJourney] = useState(journeys[0]);

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-brand-purple text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
            <span>Interactive Business Journey Selector</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Where Are You in Your Business Journey?
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Select your current situation below. See how People Point combines People, Process, and Technology to build the exact systems your business needs right now.
          </p>
        </div>

        {/* Journey Tabs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-8">
          {journeys.map((j) => {
            const isSelected = activeJourney.id === j.id;
            return (
              <button
                key={j.id}
                onClick={() => setActiveJourney(j)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-brand-navy text-white border-brand-navy shadow-lg scale-[1.02]'
                    : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-white/10' : 'bg-white shadow-xs'}`}>
                    {j.icon}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-brand-pink text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {j.stage}
                  </span>
                </div>
                <div>
                  <div className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {j.question}
                  </div>
                  <div className={`text-[11px] font-medium mt-1 ${isSelected ? 'text-pink-300 font-semibold' : 'text-brand-purple'}`}>
                    → {j.actionTag}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card */}
        <div className="bg-gradient-to-br from-slate-900 via-brand-navy to-purple-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-400">
                  Business Stage: {activeJourney.stage}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-slate-300 font-medium">
                  {activeJourney.question}
                </span>
              </div>

              <h3 className="text-xl sm:text-3xl font-black text-white leading-tight">
                Recommended People Point Support: <br />
                <span className="gradient-text">{activeJourney.response}</span>
              </h3>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-300">
                <strong className="text-white block mb-1">Your Current Requirement:</strong>
                {activeJourney.needs}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {activeJourney.highlightPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-brand-pink shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Action Box */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-pink-300">
                  Ready to Implement?
                </span>
                <h4 className="text-lg font-bold text-white">
                  Get a Structured Scope & Timeline
                </h4>
                <p className="text-xs text-slate-300">
                  We assign an accountable SPOC to review your stage and provide a turnkey execution roadmap.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  onClick={onOpenConsultation}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Book Free 30-Min Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenChat?.(activeJourney.stage)}
                  className="w-full py-2.5 px-4 rounded-xl bg-purple-900/60 hover:bg-purple-900 border border-purple-400/30 text-purple-200 hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-rose-300" />
                  <span>✨ Ask AI Advisor About This Stage</span>
                </button>

                <Link
                  href={activeJourney.solutionLink}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Deep-Dive Into {activeJourney.actionTag}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
