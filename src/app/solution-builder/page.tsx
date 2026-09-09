'use client';

import React, { useState } from 'react';
import { solutions } from '@/data/solutions';
import { saveNewLead } from '@/lib/leadStorage';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Calculator,
  ShieldCheck,
  Calendar,
  Building2
} from 'lucide-react';

export default function SolutionBuilderPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Business Setup & Registration',
    'HR & People Operations'
  ]);
  const [stage, setStage] = useState('First-Time Founder (Idea to Launch)');
  const [teamSize, setTeamSize] = useState('1 - 10 employees');
  const [timeline, setTimeline] = useState('Within 2 to 4 weeks');
  const [budgetExpectation, setBudgetExpectation] = useState('Standard Milestone Pricing');

  const [leadInfo, setLeadInfo] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    city: 'Chennai, India',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const toggleService = (title: string) => {
    setSelectedServices((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveNewLead({
      fullName: leadInfo.name,
      companyName: leadInfo.company || 'Custom Solution Inquiry',
      email: leadInfo.email,
      phone: leadInfo.phone,
      city: leadInfo.city,
      businessStage: stage,
      teamSize: teamSize,
      servicesNeeded: selectedServices,
      challenge: `Custom Solution Builder: Budget: ${budgetExpectation}. Notes: ${leadInfo.notes || 'None'}`,
      expectedTimeline: timeline,
      consultationMode: 'Google Meet Video Call',
      source: 'Custom Solution Builder',
      estimatedValue: `${selectedServices.length} Selected Modules`
    });
    setSubmitted(true);
  };

  return (
    <div className="bg-brand-bgSoft py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-brand-purple text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-brand-pink" />
            <span>Interactive Scope Builder</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Custom Solution Builder
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Select the exact operational capabilities your business needs right now. We will bundle them into a coordinated, single-partner execution roadmap.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center max-w-2xl mx-auto space-y-6 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Custom Proposal Request Received!
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Thank you, <strong>{leadInfo.name}</strong>. We have saved your custom scope configuration for <strong>{leadInfo.company || 'your business'}</strong> with {selectedServices.length} modules selected.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 text-slate-700">
              <div>
                <strong className="text-slate-900">Selected Capabilities:</strong>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {selectedServices.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-purple-100 text-brand-purple font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-1 flex justify-between">
                <span>Assigned Account SPOC:</span>
                <span className="font-bold text-slate-900">Senior Partner SPOC</span>
              </div>
              <div className="flex justify-between">
                <span>Expected Proposal Delivery:</span>
                <span className="font-bold text-emerald-600">Within 24 Hours</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/918807304713?text=Hi%20People%20Point%2C%20I%20just%20submitted%20my%20custom%20solution%20request%20with%20${selectedServices.length}%20modules.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-2 shadow-md transition-all"
              >
                <span>Follow Up on WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Select Capabilities */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-purple block mb-1">
                Step 1 of 3
              </span>
              <h2 className="text-xl font-black text-slate-900 mb-2">
                Select the Systems You Need Us to Build & Manage
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Choose one or multiple modules. All selected services will be synchronized under one accountable SPOC.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {solutions.map((item) => {
                  const isSelected = selectedServices.includes(item.title);
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => toggleService(item.title)}
                      className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-purple-50/70 border-brand-purple shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100/70 border-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-slate-900">{item.title}</span>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border text-xs ${
                            isSelected
                              ? 'bg-brand-purple border-brand-purple text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && '✓'}
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                        {item.headline}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Context & Parameters */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-pink block mb-1">
                Step 2 of 3
              </span>
              <h2 className="text-xl font-black text-slate-900 mb-6">
                Your Business Context & Timelines
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Current Business Stage
                  </label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-brand-purple outline-none"
                  >
                    <option value="First-Time Founder (Idea to Launch)">First-Time Founder (Idea to Launch)</option>
                    <option value="Early Startup (1 to 10 employees)">Early Startup (1 to 10 employees)</option>
                    <option value="Growing SME (10 to 50 employees)">Growing SME (10 to 50 employees)</option>
                    <option value="Established Enterprise (50+ employees)">Established Enterprise (50+ employees)</option>
                    <option value="US / International Remote Team">US / International Remote Team</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Current Team Size
                  </label>
                  <select
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-brand-purple outline-none"
                  >
                    <option value="1 - 5 team members">1 - 5 team members</option>
                    <option value="6 - 15 team members">6 - 15 team members</option>
                    <option value="16 - 50 team members">16 - 50 team members</option>
                    <option value="50+ team members">50+ team members</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Target Execution Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-brand-purple outline-none"
                  >
                    <option value="Immediately (within 7 days)">Immediately (within 7 days)</option>
                    <option value="Within 2 to 4 weeks">Within 2 to 4 weeks</option>
                    <option value="Next Month">Next Month</option>
                    <option value="Planning for next quarter">Planning for next quarter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Budget / Commercial Preference
                  </label>
                  <select
                    value={budgetExpectation}
                    onChange={(e) => setBudgetExpectation(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-brand-purple outline-none"
                  >
                    <option value="Standard Milestone Pricing">Standard Milestone Pricing</option>
                    <option value="Monthly Retainer Model">Monthly Retainer Model</option>
                    <option value="Custom Enterprise Scope">Custom Enterprise Scope</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Contact & Request */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-purple block mb-1">
                Step 3 of 3
              </span>
              <h2 className="text-xl font-black text-slate-900 mb-6">
                Where Should We Send Your Proposal?
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Full Name <span className="text-brand-pink">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senthil Nathan"
                    value={leadInfo.name}
                    onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-purple outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Company / Entity Name <span className="text-brand-pink">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vector Health Tech"
                    value={leadInfo.company}
                    onChange={(e) => setLeadInfo({ ...leadInfo, company: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-purple outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile / WhatsApp <span className="text-brand-pink">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 88073 04713"
                    value={leadInfo.phone}
                    onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-purple outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Work Email <span className="text-brand-pink">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="senthil@company.com"
                    value={leadInfo.email}
                    onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-purple outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Specific Requirements or Existing Systems
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Any specific nuances or integrations (e.g. need GreytHR or Zoho Books integration)..."
                    value={leadInfo.notes}
                    onChange={(e) => setLeadInfo({ ...leadInfo, notes: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-purple outline-none"
                  />
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Strict confidentiality. Assigned to your designated Partner SPOC.</span>
                </div>

                <button
                  type="submit"
                  disabled={selectedServices.length === 0}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-95 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request My Custom Proposal ({selectedServices.length} Modules)</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
