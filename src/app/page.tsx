'use client';

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Calendar,
  Building2,
  Users,
  Receipt,
  Code2,
  Workflow,
  TrendingUp,
  FileSpreadsheet,
  Layers,
  ChevronDown,
  Clock,
  UserCheck,
  Target,
  Download,
  Briefcase,
  HelpCircle,
  MessageCircle,
  Compass,
  Star
} from 'lucide-react';
import { ConsultationContext } from '@/components/ClientLayoutWrapper';
import BusinessJourneySelector from '@/components/BusinessJourneySelector';
import SolutionsGrid from '@/components/SolutionsGrid';
import TimelineSection from '@/components/TimelineSection';
import TeamSection from '@/components/TeamSection';
import AssessmentWidget from '@/components/AssessmentWidget';
import LeadMagnetModal from '@/components/LeadMagnetModal';
import { packages, engagementModels } from '@/data/packages';
import { caseStudies, testimonials } from '@/data/caseStudies';
import { generalFaqs } from '@/data/faqs';
import { leadMagnets, LeadMagnet } from '@/data/leadMagnets';

export default function HomePage() {
  const { openConsultation } = useContext(ConsultationContext);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedMagnet, setSelectedMagnet] = useState<LeadMagnet | null>(null);

  return (
    <div className="space-y-0">
      {/* 01 & 02: HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-32 bg-gradient-to-b from-white via-slate-50/50 to-brand-bgSoft">
        {/* Decorative background glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-brand-pink/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Top Brand Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm mb-6 border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-brand-pink animate-ping"></span>
              <span className="tracking-wide">CORE BRAND PROMISE:</span>
              <span className="text-pink-300">TURN IDEAS INTO RUNNING BUSINESSES</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Build Your Business. <br />
              <span className="gradient-text">We’ll Build the Systems Behind It.</span>
            </h1>

            {/* Supporting Statement */}
            <p className="mt-6 text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto">
              From company setup and hiring to payroll, statutory compliance, custom software, operations, and growth — People Point gives founders and growing enterprises <strong className="text-slate-900 font-semibold">one accountable partner</strong> to move from idea to execution.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={() => openConsultation()}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl hover:opacity-95 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <Calendar className="w-5 h-5 text-white" />
                <span>Book a Free Business Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#solutions"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-200 shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Our Solutions</span>
              </a>
            </div>

            {/* Trust Highlights Strip */}
            <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-4xl mx-auto">
              <div className="p-3.5 rounded-2xl bg-white/70 border border-slate-200/60 shadow-xs">
                <span className="block text-xl sm:text-2xl font-black text-brand-purple">One Partner</span>
                <span className="text-xs text-slate-500 font-medium">No disconnected vendors</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/70 border border-slate-200/60 shadow-xs">
                <span className="block text-xl sm:text-2xl font-black text-brand-pink">Accountable SPOC</span>
                <span className="text-xs text-slate-500 font-medium">Dedicated leadership contact</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/70 border border-slate-200/60 shadow-xs">
                <span className="block text-xl sm:text-2xl font-black text-brand-navy">People + Tech</span>
                <span className="text-xs text-slate-500 font-medium">End-to-end execution</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/70 border border-slate-200/60 shadow-xs">
                <span className="block text-xl sm:text-2xl font-black text-emerald-600">30-Day Launch</span>
                <span className="text-xs text-slate-500 font-medium">Turnkey business readiness</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03: CAPABILITY STRIP */}
      <section className="bg-brand-navy text-white py-5 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm font-bold tracking-wide">
            <span className="text-pink-400 flex items-center gap-1.5">
              <Building2 className="w-4 h-4" /> Business Setup
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-purple-300 flex items-center gap-1.5">
              <Users className="w-4 h-4" /> People & HR
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-pink-400 flex items-center gap-1.5">
              <Receipt className="w-4 h-4" /> Payroll & Compliance
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-cyan-400 flex items-center gap-1.5">
              <Code2 className="w-4 h-4" /> Technology
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-purple-300 flex items-center gap-1.5">
              <FileSpreadsheet className="w-4 h-4" /> Accounts & Backend
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-amber-400 flex items-center gap-1.5">
              <Workflow className="w-4 h-4" /> Operations SOPs
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-pink-400 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" /> Growth Marketing
            </span>
          </div>
        </div>
      </section>

      {/* 04: BUSINESS JOURNEY SELECTOR */}
      <BusinessJourneySelector onOpenConsultation={() => openConsultation()} />

      {/* 05: SEVEN CORE SOLUTIONS */}
      <SolutionsGrid onOpenConsultation={(s) => openConsultation(s)} />

      {/* 06: FROM IDEA -> RUNNING BUSINESS (TIMELINE) */}
      <TimelineSection />

      {/* 07: BUSINESS LAUNCH 360° (FLAGSHIP PACKAGE) */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 to-brand-navy text-white relative overflow-hidden">
        <div className="absolute -bottom-10 right-0 w-[500px] h-[500px] bg-brand-pink/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold uppercase tracking-wider border border-pink-500/30">
                <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
                <span>Flagship Turnkey Program</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Business Launch 360°
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Move from business idea to a registered, compliant, staffed, and operating business in 30 days without juggling six independent agencies.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-brand-pink font-bold text-sm">01. Legal Incorporation</div>
                  <p className="text-xs text-slate-300">Pvt Ltd / LLP, DIN/DSC, GST, MSME, Professional Tax, bank resolutions.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-purple-300 font-bold text-sm">02. Foundational HR</div>
                  <p className="text-xs text-slate-300">Employment contracts, offer letters, NDAs, and customized company policy handbook.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-cyan-300 font-bold text-sm">03. Digital Storefront & CRM</div>
                  <p className="text-xs text-slate-300">High-converting Next.js website, domain email, and CRM with WhatsApp lead alerts.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-amber-300 font-bold text-sm">04. Core SOPs & Launch Plan</div>
                  <p className="text-xs text-slate-300">Master 90-day operating checklist, approval matrices, and initial growth roadmap.</p>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => openConsultation('Business Launch 360°')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-95 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Business Launch 360° Scope</span>
                </button>

                <Link
                  href="/packages"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Compare Packages</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Card Feature Summary */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/15 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-300">Turnkey Engagement</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                  Fixed 30-Day Sprint
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-pink shrink-0" />
                  <span>Single Point of Contact (SPOC) coordination</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-pink shrink-0" />
                  <span>Zero vendor blame games or coordination overhead</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-pink shrink-0" />
                  <span>Complete ownership from Day 1 to running status</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-pink shrink-0" />
                  <span>60-Day post-launch operational warranty & support</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[11px] text-slate-400 font-semibold uppercase block">Pricing Principle</span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Transparent milestone-based commercial pricing tailored to your corporate structure and technology specifications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 08: WHY PEOPLE POINT (6 DIFFERENTIATORS) */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-brand-purple text-xs font-bold uppercase tracking-wider mb-2">
              Why Companies Partner With Us
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Built Different. Focused on Execution.
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              We aren’t traditional consultants who deliver PowerPoint decks and leave. We are implementation partners who construct and run the operating machinery of your company.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-brand-purple flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900">One Accountable Partner</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Founders do not have to coordinate multiple disconnected vendors (CA, HR agency, web developers, marketing agencies). Everything is synchronized under one roof.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 text-brand-pink flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900">End-to-End Execution</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We take accountability for the actual implementation—drafting the contracts, filing statutory returns, writing the code, and establishing the SOPs.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-navy/10 text-brand-navy flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900">People + Process + Tech</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                True business efficiency requires all three legs of the stool: trained people, documented repeatable processes, and integrated modern technology.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-brand-purple flex items-center justify-center font-bold">
                04
              </div>
              <h3 className="text-lg font-bold text-slate-900">Single Point of Contact (SPOC)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our clients get a designated SPOC (headed by Working Partner Kesavan) who coordinates requirements and internal team delivery, guaranteeing prompt response times.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 text-brand-pink flex items-center justify-center font-bold">
                05
              </div>
              <h3 className="text-lg font-bold text-slate-900">Built for Long-Term Scale</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We establish systems that can scale from 5 employees to 100+ without requiring painful redesigns or chaotic restructuring later.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-navy/10 text-brand-navy flex items-center justify-center font-bold">
                06
              </div>
              <h3 className="text-lg font-bold text-slate-900">Zero Unverifiable Claims</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We focus strictly on verifiable results, rigorous compliance, and transparent deliverables rather than inflated marketing slogans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 09: HOW WE WORK (6-STAGE MODEL) */}
      <section className="py-16 sm:py-24 bg-brand-bgSoft border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-brand-purple text-xs font-bold uppercase tracking-wider mb-2">
              Structured Delivery Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              How We Work
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              A transparent, 6-stage execution framework that turns vague requirements into predictable business outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              { num: '01', title: 'Understand', desc: 'Deep discovery interview to map your current business stage, goals & constraints.' },
              { num: '02', title: 'Assess', desc: 'Audit compliance, operational bottlenecks, technology gaps, and team structure.' },
              { num: '03', title: 'Design', desc: 'Craft detailed scope of work, architecture blueprints, SOP outlines & timeline.' },
              { num: '04', title: 'Execute', desc: 'Deploy incorporation, contracts, software, payroll setups & marketing funnels.' },
              { num: '05', title: 'Measure', desc: 'Review performance against agreed SLAs, error rates, and business metrics.' },
              { num: '06', title: 'Support', desc: 'Ongoing monthly retainer management, technical AMC, and scale iterations.' },
            ].map((step, idx) => (
              <div
                key={step.num}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-black text-brand-pink block mb-1">
                    Stage {step.num}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10: CORE TEAM */}
      <TeamSection />

      {/* 11: ENGAGEMENT MODELS */}
      <section className="py-16 sm:py-24 bg-brand-bgSoft border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-brand-pink text-xs font-bold uppercase tracking-wider mb-2">
              Flexible Partnership Structures
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Engagement Models Built for Your Stage
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              We structure our commercials around scope, team complexity, and stage rather than forcing rigid, one-size-fits-all contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {engagementModels.map((model, idx) => (
              <div
                key={model.title}
                className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-card hover:border-brand-purple/40 hover:shadow-hover transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Model 0{idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {model.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {model.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => openConsultation(model.title)}
                    className="text-xs font-bold text-brand-purple hover:text-brand-pink flex items-center gap-1"
                  >
                    <span>Discuss Model</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12: INDUSTRIES SUPPORTED */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-brand-purple text-xs font-bold uppercase tracking-wider mb-2">
                Proven Sector Experience
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Industries We Genuinely Support
              </h2>
              <p className="mt-2 text-slate-600 text-sm sm:text-base">
                We only focus on industries where our cross-functional team has direct operational and statutory track records.
              </p>
            </div>
            <Link
              href="/industries"
              className="text-xs sm:text-sm font-bold text-brand-purple hover:text-brand-pink flex items-center gap-1"
            >
              <span>Explore Industry Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Tech & SaaS Startups', icon: '💻', desc: 'IP protection, ESOP frameworks, tech stack, and rapid hiring.' },
              { name: 'Retail & E-commerce', icon: '🛍️', desc: 'Marketplace reconciliations, inventory SOPs, and performance ads.' },
              { name: 'Healthcare & Clinics', icon: '🩺', desc: 'Shift rosters, diagnostic SOPs, KRA scorecards, and compliance.' },
              { name: 'Manufacturing & B2B', icon: '⚙️', desc: 'Approval gateways, factory payroll, supply chain SOPs, and MIS.' },
              { name: 'Professional Services', icon: '📊', desc: 'Client onboarding, retainer billing, talent sourcing, and portals.' },
              { name: 'US / Global Backoffice', icon: '🌐', desc: 'India offshore payroll, time tracking, backend admin, and SLA rigor.' },
            ].map((ind) => (
              <div
                key={ind.name}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:bg-white hover:border-brand-purple/30 transition-all text-center"
              >
                <div className="text-2xl mb-2">{ind.icon}</div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">{ind.name}</h3>
                <p className="text-[11px] text-slate-500 leading-tight">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13: CASE STUDIES */}
      <section className="py-16 sm:py-24 bg-brand-bgSoft border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                Real Client Results
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Case Studies: Challenge to Result
              </h2>
              <p className="mt-2 text-slate-600 text-sm sm:text-base">
                Verifiable outcomes achieved through People Point’s integrated People + Process + Technology model.
              </p>
            </div>
            <Link
              href="/case-studies"
              className="text-xs sm:text-sm font-bold text-brand-purple hover:text-brand-pink flex items-center gap-1"
            >
              <span>View All Detailed Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((cs) => (
              <div
                key={cs.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-card flex flex-col justify-between hover:shadow-hover transition-all"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-brand-purple font-bold">
                      {cs.industry}
                    </span>
                    <span className="text-slate-400 font-medium">{cs.teamSize}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {cs.clientTitle}
                  </h3>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                      <strong className="text-slate-800 block mb-0.5 font-semibold">The Challenge:</strong>
                      <p className="text-slate-600 line-clamp-2">{cs.challenge}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-100">
                      <strong className="text-brand-purple block mb-0.5 font-semibold">People Point Implementation:</strong>
                      <p className="text-slate-600 line-clamp-2">{cs.approach}</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Key Outcomes:
                    </div>
                    <ul className="space-y-1.5">
                      {cs.results.map((res, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-800 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/case-studies#${cs.id}`}
                    className="text-xs font-bold text-brand-purple hover:text-brand-pink flex items-center gap-1"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14: TESTIMONIALS */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-brand-purple text-xs font-bold uppercase tracking-wider mb-2">
              Client Endorsements
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Trusted by Founders and Managing Directors
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Genuine feedback from leaders who rely on People Point for their business infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:bg-white hover:shadow-card transition-all"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                    “{t.feedback}”
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60">
                  <div className="text-xs font-bold text-slate-900">{t.name}</div>
                  <div className="text-[11px] text-slate-500">{t.designation}, {t.company}</div>
                  <div className="text-[10px] font-semibold text-brand-pink mt-1">{t.service}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15: BUSINESS READINESS ASSESSMENT (DIAGNOSTIC TOOL) */}
      <section id="assessment" className="py-16 sm:py-24 bg-brand-bgSoft border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-brand-pink text-xs font-bold uppercase tracking-wider mb-2">
              Free 2-Minute Diagnostic
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Test Your Business Readiness
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Answer 12 rapid questions across Legal, HR, Payroll, Tech, Operations, and Growth to identify your biggest bottlenecks and compliance exposures.
            </p>
          </div>

          <AssessmentWidget onOpenConsultation={() => openConsultation('Business Readiness Review')} />
        </div>
      </section>

      {/* 16: INSIGHTS & FREE CHECKLISTS */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-brand-purple text-xs font-bold uppercase tracking-wider mb-2">
                Free Practical Frameworks
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Startup Checklists, SOPs & Guides
              </h2>
              <p className="mt-2 text-slate-600 text-sm sm:text-base">
                Download the exact implementation assets our consulting team uses with clients.
              </p>
            </div>
            <Link
              href="/insights"
              className="text-xs sm:text-sm font-bold text-brand-purple hover:text-brand-pink flex items-center gap-1"
            >
              <span>View All Guides & Templates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadMagnets.slice(0, 3).map((magnet) => (
              <div
                key={magnet.id}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                      {magnet.category}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {magnet.downloadCount}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {magnet.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {magnet.description}
                  </p>

                  <div className="space-y-1 text-xs text-slate-600 bg-white p-3 rounded-2xl border border-slate-200/60 mb-4">
                    {magnet.bullets.slice(0, 2).map((b, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-pink shrink-0" />
                        <span className="line-clamp-1">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedMagnet(magnet)}
                  className="w-full py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navyLight text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Free Copy</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 17: FAQ SECTION */}
      <section className="py-16 sm:py-24 bg-brand-bgSoft border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-brand-purple text-xs font-bold uppercase tracking-wider mb-2">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Answers to common questions regarding our engagement models, accountability, and execution scope.
            </p>
          </div>

          <div className="space-y-3">
            {generalFaqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-brand-purple transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-brand-purple' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 18: FINAL HIGH-IMPACT CTA */}
      <section className="py-20 sm:py-28 bg-gradient-to-r from-brand-navy via-purple-950 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-pink-300 text-xs font-bold uppercase tracking-wider border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Turn Ideas Into Running Businesses</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Ready to Build the Systems Behind Your Business?
          </h2>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Stop juggling disconnected vendors. Partner with People Point for end-to-end setup, human resources, statutory payroll, technology, and operations.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openConsultation()}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-95 text-white font-bold text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 transition-all"
            >
              <Calendar className="w-5 h-5" />
              <span>Book a Free 30-Minute Consultation</span>
            </button>

            <a
              href="https://wa.me/919840000000?text=Hi%20People%20Point%2C%20I%20would%20like%20to%20discuss%20building%20systems%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-pink" /> Strict NDA & Confidentiality
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Accountable SPOC Assigned
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-purple-400" /> Response within 4 Hours
            </span>
          </div>
        </div>
      </section>

      {/* Lead Magnet Download Modal */}
      <LeadMagnetModal
        isOpen={!!selectedMagnet}
        onClose={() => setSelectedMagnet(null)}
        magnet={selectedMagnet}
      />
    </div>
  );
}
