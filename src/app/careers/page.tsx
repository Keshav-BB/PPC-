'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { Briefcase, Users, Code2, Receipt, ArrowRight, Sparkles, CheckCircle2, HeartHandshake } from 'lucide-react';
import { ConsultationContext } from '@/components/ClientLayoutWrapper';

const openRoles = [
  {
    title: 'HR & Statutory Compliance Specialist',
    department: 'People & Payroll Operations',
    location: 'Chennai (On-site / Hybrid)',
    type: 'Full-time',
    description: 'Manage client payroll runs, PF/ESI challan generation, leave tracking, and employment documentation for fast-growing startup clients.',
    requirements: [
      '2+ years experience in Indian payroll processing and statutory compliance (PF, ESI, PT, TDS)',
      'Working knowledge of cloud HRMS tools (GreytHR, Keka, Zoho People)',
      'Strong client communication and detail-oriented approach to salary registers'
    ]
  },
  {
    title: 'Full-Stack Software Engineer (Next.js / TypeScript)',
    department: 'Technology Solutions',
    location: 'Chennai (Hybrid)',
    type: 'Full-time',
    description: 'Build robust web applications, internal client portals, automated CRM pipelines, and API integrations under Lead Developer guidance.',
    requirements: [
      'Proficiency with React, Next.js (App Router), TypeScript, and Tailwind CSS',
      'Experience with REST APIs, database schemas (PostgreSQL / Supabase), and authentication',
      'Commitment to clean architecture, component reusability, and mobile performance'
    ]
  },
  {
    title: 'Business Operations & SOP Associate',
    department: 'Process & Consulting',
    location: 'Chennai (On-site)',
    type: 'Full-time',
    description: 'Work alongside leadership partners to audit client workflows, author standard operating procedures (SOPs), and build management dashboards.',
    requirements: [
      'Strong structured thinking, process mapping, and clear English documentation ability',
      'Proficiency in building workflow diagrams, Notion/Google Docs SOP manuals, and KPI matrices',
      'Comfortable communicating with business owners and department heads'
    ]
  }
];

export default function CareersPage() {
  const { openConsultation } = useContext(ConsultationContext);

  return (
    <div className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5 text-rose-600" />
            <span>Join People Point</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Build the Systems That Power Real Businesses
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            At People Point, we don&apos;t just consult from the sidelines. We execute. We help entrepreneurs turn ideas into running businesses across HR, technology, payroll, and operations.
          </p>
        </div>

        {/* Culture & Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-800 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">One Team, Multi-Disciplinary</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Work alongside experienced founders, payroll compliance leads, and full-stack developers. Broaden your skills across corporate systems.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Direct Impact on Real Businesses</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your work directly helps new companies incorporate, hires get paid accurately on time, and web products launch without delays.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Zero Politics, High Accountability</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We value clarity, documented processes, and ownership. We measure results by client success and operational excellence.
            </p>
          </div>
        </div>

        {/* Open Positions */}
        <div className="max-w-4xl mx-auto space-y-6 mb-16">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Current Openings</h2>
              <p className="text-xs text-slate-500 mt-0.5">Chennai Corporate Office • Immediate Openings</p>
            </div>
            <span className="text-xs font-bold text-purple-800 px-3 py-1 rounded-full bg-purple-50">
              {openRoles.length} Active Positions
            </span>
          </div>

          {openRoles.map((role, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-purple-300 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{role.title}</h3>
                  <div className="text-xs text-slate-500 flex flex-wrap gap-2 mt-1">
                    <span className="text-purple-800 font-semibold">{role.department}</span>
                    <span>•</span>
                    <span>{role.location}</span>
                    <span>•</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">{role.type}</span>
                  </div>
                </div>

                <a
                  href={`mailto:peoplepointconsultant@gmail.com?subject=Application%20for%20${encodeURIComponent(role.title)}`}
                  className="px-5 py-2.5 rounded-xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 shrink-0"
                >
                  <span>Apply via Email</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {role.description}
              </p>

              <div className="pt-3 border-t border-slate-100 space-y-1.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Key Requirements:
                </div>
                {role.requirements.map((req, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* General Application Callout */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-purple-950 text-white text-center max-w-3xl mx-auto space-y-3 shadow-lg">
          <h3 className="text-xl font-bold">Don&apos;t See Your Exact Role?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            We are always interested in connecting with passionate talent across HR, full-stack tech, performance marketing, and client operations.
          </p>
          <div className="pt-2">
            <a
              href="mailto:peoplepointconsultant@gmail.com?subject=General%20Career%20Inquiry%20-%20People%20Point"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs transition-colors shadow-sm"
            >
              <span>Send Your Resume to peoplepointconsultant@gmail.com</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
