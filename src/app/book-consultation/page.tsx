'use client';

import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, ShieldCheck, Sparkles, UserCheck, ArrowRight } from 'lucide-react';
import { saveNewLead } from '@/lib/leadStorage';
import { solutions } from '@/data/solutions';

export default function BookConsultationPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    city: 'Chennai',
    businessStage: 'Startup / Small Business',
    teamSize: '1 - 10 employees',
    servicesNeeded: ['Business Setup & Registration'],
    challenge: '',
    expectedTimeline: 'Immediately (within 7 days)',
    consultationMode: 'Google Meet Video Call',
    preferredDate: '',
    preferredTime: '11:00 AM'
  });

  const [submitted, setSubmitted] = useState(false);

  const toggleService = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      servicesNeeded: prev.servicesNeeded.includes(title)
        ? prev.servicesNeeded.filter((s) => s !== title)
        : [...prev.servicesNeeded, title]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveNewLead({
      fullName: formData.fullName,
      companyName: formData.companyName || 'Consultation Booking',
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      businessStage: formData.businessStage,
      teamSize: formData.teamSize,
      servicesNeeded: formData.servicesNeeded,
      challenge: `Slot: ${formData.preferredDate || 'Earliest Available'} at ${formData.preferredTime}. Challenge: ${formData.challenge || 'None specified.'}`,
      expectedTimeline: formData.expectedTimeline,
      consultationMode: formData.consultationMode,
      source: 'Dedicated Consultation Booking Page'
    });
    setSubmitted(true);
  };

  return (
    <div className="bg-brand-bgSoft py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-brand-purple text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
            <span>Complimentary 30-Minute Session</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Book a Business Consultation
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Speak directly with our partner leadership team to assess your business setup, HR, payroll, technology, and operations.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Consultation Scheduled!
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Thank you, <strong>{formData.fullName}</strong>. A calendar invite and Google Meet link have been prepared for <strong>{formData.email}</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto text-xs space-y-2 text-slate-700">
              <div className="flex justify-between">
                <span>Accountable SPOC:</span>
                <span className="font-bold text-slate-900">Senior Partner SPOC</span>
              </div>
              <div className="flex justify-between">
                <span>Preferred Mode:</span>
                <span className="font-bold text-slate-900">{formData.consultationMode}</span>
              </div>
              <div className="flex justify-between">
                <span>Response Time:</span>
                <span className="font-bold text-emerald-600">Within 2 to 4 Business Hours</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/918807304713?text=Hi%20People%20Point%2C%20I%20just%20scheduled%20a%20consultation%20for%20${encodeURIComponent(formData.companyName || formData.fullName)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-2 shadow-md transition-all"
              >
                <span>Notify Us on WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                Tell Us About Your Business
              </h2>
              <p className="text-xs text-slate-500">
                All information is strictly protected under enterprise non-disclosure.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-brand-pink">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Krishnan"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-purple outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Company / Venture Name
                </label>
                <input
                  type="text"
                  placeholder="Company name"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
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
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                  placeholder="ramesh@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-purple outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Current Business Stage
                </label>
                <select
                  value={formData.businessStage}
                  onChange={(e) => setFormData({ ...formData, businessStage: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-brand-purple outline-none"
                >
                  <option value="First-Time Founder (Idea / Pre-registration)">First-Time Founder (Idea / Pre-registration)</option>
                  <option value="Startup / Small Business (1 - 25 team)">Startup / Small Business (1 - 25 team)</option>
                  <option value="Growing SME (25 - 100 team)">Growing SME (25 - 100 team)</option>
                  <option value="Existing Business (Outsourcing Function)">Existing Business (Outsourcing Function)</option>
                  <option value="India / US Cross-Border Operations">India / US Cross-Border Operations</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Consultation Mode
                </label>
                <select
                  value={formData.consultationMode}
                  onChange={(e) => setFormData({ ...formData, consultationMode: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-brand-purple outline-none"
                >
                  <option value="Google Meet Video Call">Google Meet Video Call</option>
                  <option value="Direct Phone Call">Direct Phone Call</option>
                  <option value="WhatsApp Discussion">WhatsApp Discussion</option>
                  <option value="In-Person Meeting (Office)">In-Person Meeting (Office)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Services Needed (Select multiple)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {solutions.map((s) => {
                  const isChecked = formData.servicesNeeded.includes(s.title);
                  return (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => toggleService(s.title)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-purple-50 border-brand-purple text-brand-purple font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span>{s.title}</span>
                      {isChecked && <CheckCircle2 className="w-4 h-4 text-brand-purple" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Current Operational Bottleneck / Goal
              </label>
              <textarea
                rows={3}
                placeholder="What is your biggest operational headache or objective right now?"
                value={formData.challenge}
                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-purple outline-none"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero cost, zero obligation business assessment.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-95 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirm & Schedule Free Call</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
