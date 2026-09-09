import React from 'react';
import { Lightbulb, Building2, Users, Code2, Workflow, TrendingUp, CheckCircle2 } from 'lucide-react';

const stages = [
  {
    step: '01',
    title: 'Idea & Entity Setup',
    duration: 'Week 1',
    icon: <Building2 className="w-5 h-5 text-brand-purple" />,
    description: 'We evaluate your business model, structure the appropriate legal vehicle (Pvt Ltd / LLP), obtain DIN/DSC, and complete incorporation.',
    outputs: ['Certificate of Incorporation', 'Director DIN & Digital Signatures', 'Founders Agreement']
  },
  {
    step: '02',
    title: 'Statutory Registrations & Banking',
    duration: 'Week 2',
    icon: <Lightbulb className="w-5 h-5 text-brand-pink" />,
    description: 'Procuring mandatory tax and commercial licenses, opening current bank accounts, and establishing statutory compliance readiness.',
    outputs: ['GST & MSME Udyam Certificates', 'Professional Tax Registration', 'Corporate Banking Setup']
  },
  {
    step: '03',
    title: 'People Systems & HR Architecture',
    duration: 'Week 3',
    icon: <Users className="w-5 h-5 text-brand-purple" />,
    description: 'Designing role scorecards, drafting employment contracts, non-disclosure deeds, company policies, and setting up initial employee records.',
    outputs: ['Employee Policy Handbook', 'Standard Offer & NDA Templates', 'KRA/KPI Scorecards']
  },
  {
    step: '04',
    title: 'Technology & Digital Presence',
    duration: 'Week 3 – 4',
    icon: <Code2 className="w-5 h-5 text-brand-pink" />,
    description: 'Deploying a modern, conversion-optimized Next.js web portal, professional domain email, and CRM automation with WhatsApp lead alerts.',
    outputs: ['Production Web Portal', 'Integrated CRM Pipeline', 'Automated Lead Notifications']
  },
  {
    step: '05',
    title: 'Operational SOPs & Approval Gates',
    duration: 'Week 4',
    icon: <Workflow className="w-5 h-5 text-brand-purple" />,
    description: 'Mapping daily fulfillment workflows, establishing financial delegation thresholds, and authoring Standard Operating Procedures.',
    outputs: ['Standard Operating Procedures (SOP) Binder', 'Financial Approval Matrix', 'Monthly MIS Template']
  },
  {
    step: '06',
    title: 'A Running Business Built to Scale',
    duration: 'Ongoing',
    icon: <TrendingUp className="w-5 h-5 text-brand-pink" />,
    description: 'Your business is now fully operational. People Point continues managing monthly payroll, statutory filings, and customer growth.',
    outputs: ['Automated Monthly Payroll', 'Proactive Compliance Management', 'Scalable Performance Ads']
  }
];

export default function TimelineSection() {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-brand-pink text-xs font-bold uppercase tracking-wider mb-2">
            End-to-End Business Enablement
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            From Idea → Running Business
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            How People Point systematically transforms your business idea into an execution-ready, compliant, and operating business machine in 30 days.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {stages.map((stage, idx) => (
            <div
              key={stage.step}
              className="relative p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-hover hover:border-brand-purple/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-brand-purple group-hover:text-brand-pink transition-colors">
                      {stage.step}
                    </span>
                    <div className="p-2.5 rounded-xl bg-white shadow-xs">
                      {stage.icon}
                    </div>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-100/60 text-brand-purple">
                    {stage.duration}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-purple transition-colors">
                  {stage.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {stage.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Key Outcomes:
                </div>
                <ul className="space-y-1">
                  {stage.outputs.map((out, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-pink shrink-0" />
                      <span>{out}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
