'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, CheckCircle2, Calendar, Clock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { saveNewLead } from '@/lib/leadStorage';
import { solutions } from '@/data/solutions';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function ConsultationModal({ isOpen, onClose, defaultService }: ConsultationModalProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    city: '',
    businessStage: 'Startup / Small Business',
    teamSize: '1 - 10 employees',
    servicesNeeded: defaultService ? [defaultService] : ['Business Setup & Registration'],
    challenge: '',
    expectedTimeline: 'Immediately (within 7 days)',
    consultationMode: 'Google Meet Video Call'
  });

  if (!isOpen) return null;

  const handleToggleService = (serviceTitle: string) => {
    setFormData((prev) => {
      const exists = prev.servicesNeeded.includes(serviceTitle);
      return {
        ...prev,
        servicesNeeded: exists
          ? prev.servicesNeeded.filter((s) => s !== serviceTitle)
          : [...prev.servicesNeeded, serviceTitle]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveNewLead({
      fullName: formData.fullName,
      companyName: formData.companyName || 'Undisclosed / New Venture',
      email: formData.email,
      phone: formData.phone,
      city: formData.city || 'India',
      businessStage: formData.businessStage,
      teamSize: formData.teamSize,
      servicesNeeded: formData.servicesNeeded.length > 0 ? formData.servicesNeeded : ['General Business Inquiry'],
      challenge: formData.challenge || 'Needs end-to-end systems guidance from People Point.',
      expectedTimeline: formData.expectedTimeline,
      consultationMode: formData.consultationMode,
      source: 'Consultation Modal Booking'
    });
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-slate-900 p-6 text-white relative border-b border-slate-800">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>30-Minute Free Business Consultation</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Build Your Business. We’ll Build the Systems Behind It.
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Directly with our senior partner leadership team for structured execution.
          </p>

          {!submitted && (
            <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-slate-300">
              <span className={`px-3 py-1 rounded-full ${step === 1 ? 'bg-purple-800 text-white' : 'bg-slate-800'}`}>
                1. Contact
              </span>
              <span>→</span>
              <span className={`px-3 py-1 rounded-full ${step === 2 ? 'bg-purple-800 text-white' : 'bg-slate-800'}`}>
                2. Business Scope
              </span>
              <span>→</span>
              <span className={`px-3 py-1 rounded-full ${step === 3 ? 'bg-purple-800 text-white' : 'bg-slate-800'}`}>
                3. Timing & Mode
              </span>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-slate-900">
                Consultation Request Confirmed!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Your requirement has been registered in our CRM pipeline with high priority.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto space-y-2 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Assigned SPOC:</span>
                  <span className="font-semibold text-slate-900">Dedicated Senior Partner</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contact Number:</span>
                  <span className="font-semibold text-slate-900">{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Preferred Mode:</span>
                  <span className="font-semibold text-slate-900">{formData.consultationMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Response SLA:</span>
                  <span className="font-bold text-emerald-600">Within 2 to 4 Business Hours</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={`https://wa.me/918807304713?text=Hi%20People%20Point%2C%20I%20just%20booked%20a%20consultation%20for%20${encodeURIComponent(formData.companyName || formData.fullName)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <span>Chat on WhatsApp Instantly</span>
                </a>
                <button
                  onClick={handleClose}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anand Kumar"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Company / Venture Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Apex Innovations Pvt Ltd"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mobile / WhatsApp Number <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 88073 04713"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Business Email <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="anand@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      City & Country
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Chennai, India / California, USA"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-700"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      disabled={!formData.fullName || !formData.phone || !formData.email}
                      onClick={() => setStep(2)}
                      className="px-6 py-2.5 rounded-xl bg-purple-900 hover:bg-purple-800 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 transition-all"
                    >
                      <span>Continue to Business Scope</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Current Business Stage
                      </label>
                      <select
                        value={formData.businessStage}
                        onChange={(e) => setFormData({ ...formData, businessStage: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-700 bg-white"
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
                        Current Team Size
                      </label>
                      <select
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-700 bg-white"
                      >
                        <option value="Just Founders (1 - 3)">Just Founders (1 - 3)</option>
                        <option value="4 - 10 employees">4 - 10 employees</option>
                        <option value="11 - 25 employees">11 - 25 employees</option>
                        <option value="26 - 50 employees">26 - 50 employees</option>
                        <option value="50+ employees">50+ employees</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Services Needed (Select all that apply)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {solutions.map((s) => {
                        const isSelected = formData.servicesNeeded.includes(s.title);
                        return (
                          <button
                            type="button"
                            key={s.id}
                            onClick={() => handleToggleService(s.title)}
                            className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-purple-50 border-purple-800 text-purple-900 font-bold shadow-xs'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <span>{s.title}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-purple-800 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-2.5 rounded-xl bg-purple-900 hover:bg-purple-800 text-white font-bold text-xs flex items-center gap-2 transition-all"
                    >
                      <span>Continue to Final Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Current Business Challenge or Objective
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe what you need help with..."
                      value={formData.challenge}
                      onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-700"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Expected Start Timeline
                      </label>
                      <select
                        value={formData.expectedTimeline}
                        onChange={(e) => setFormData({ ...formData, expectedTimeline: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-700 bg-white"
                      >
                        <option value="Immediately (within 7 days)">Immediately (within 7 days)</option>
                        <option value="Within 2 to 4 weeks">Within 2 to 4 weeks</option>
                        <option value="Next month">Next month</option>
                        <option value="Exploring / Planning phase">Exploring / Planning phase</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Preferred Consultation Mode
                      </label>
                      <select
                        value={formData.consultationMode}
                        onChange={(e) => setFormData({ ...formData, consultationMode: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-700 bg-white"
                      >
                        <option value="Google Meet Video Call">Google Meet Video Call</option>
                        <option value="Direct Phone Call">Direct Phone Call</option>
                        <option value="WhatsApp Discussion">WhatsApp Discussion</option>
                        <option value="In-Person Meeting (Chennai Office)">In-Person Meeting (Chennai Office)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Your details are strictly confidential under enterprise non-disclosure.</span>
                  </div>

                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="consent-modal"
                      required
                      defaultChecked
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-purple-700 focus:ring-purple-600 cursor-pointer"
                    />
                    <label htmlFor="consent-modal" className="text-[11px] text-slate-500 leading-snug cursor-pointer select-none">
                      I agree to the <Link href="/terms" target="_blank" className="underline hover:text-purple-700 font-semibold">Terms of Service</Link> and <Link href="/privacy" target="_blank" className="underline hover:text-purple-700 font-semibold">Privacy Policy</Link>, and consent to being contacted by People Point via Phone, WhatsApp, or Email for advisory purposes.
                    </label>
                  </div>

                  <div className="pt-2 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-800 to-rose-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Confirm & Schedule Consultation</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
