'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, ShieldCheck, CheckCircle2, UserCheck } from 'lucide-react';
import { saveNewLead } from '@/lib/leadStorage';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: 'General Business Consultation',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveNewLead({
      fullName: formData.name,
      companyName: formData.company || 'Direct Contact Inquiry',
      phone: formData.phone,
      email: formData.email,
      city: 'India',
      businessStage: 'Direct Contact',
      teamSize: 'Not specified',
      servicesNeeded: [formData.service],
      challenge: formData.message || 'Direct inquiry from contact page.',
      expectedTimeline: 'Immediately',
      consultationMode: 'Direct Phone / Email',
      source: 'Contact Page Form'
    });
    setSubmitted(true);
  };

  return (
    <div className="bg-brand-bgSoft py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-800 block mb-2">
            Direct Leadership Access
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Speak With Our Partners
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Have a question about company setup, employee payroll, custom software, or operations? Our Single Point of Contact (SPOC) is ready to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* SPOC Spotlight Card */}
            <div className="p-7 rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl border border-slate-800">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider border border-rose-500/30">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Accountable Client SPOC</span>
              </div>
              <div>
                <h3 className="text-xl font-black text-white">
                  Client Operations & Execution
                </h3>
                <div className="text-xs font-bold text-rose-400 mt-0.5">
                  Dedicated Partner & SPOC
                </div>
                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                  Acts as your single point of contact, orchestrating all internal teams across legal, human resources, payroll, tech, and operations.
                </p>
              </div>
            </div>

            {/* Office & Direct Contact Details */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-card space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-800 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Phone & WhatsApp
                  </span>
                  <a href="tel:+918807304713" className="text-sm font-bold text-slate-900 hover:text-purple-800">
                    +91 88073 04713
                  </a>
                  <span className="block text-[11px] text-slate-500 mt-0.5">Mon–Sat, 9:30 AM to 6:30 PM IST</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Official Inquiries
                  </span>
                  <a href="mailto:peoplepointconsultant@gmail.com" className="text-sm font-bold text-slate-900 hover:text-purple-800">
                    peoplepointconsultant@gmail.com
                  </a>
                  <span className="block text-[11px] text-slate-500 mt-0.5">Direct response within 4 hours</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Corporate Office
                  </span>
                  <span className="text-sm font-bold text-slate-900 block">
                    People Point Consultants
                  </span>
                  <span className="text-xs text-slate-600 block leading-relaxed">
                    Chennai, Tamil Nadu, India
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <a
                  href="https://wa.me/918807304713?text=Hi%20People%20Point%2C%20I%20would%20like%20to%20discuss%20my%20business%20requirements."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-card">
            <h2 className="text-2xl font-black text-slate-900 mb-1">
              Send a Direct Message
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Our partners review incoming messages multiple times a day.
            </p>

            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-slate-900">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our SPOC will contact you at <strong>{formData.phone}</strong> or <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-purple-800 hover:underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Karthik Venkat"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-700 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="Company name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-700 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile / WhatsApp <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 88073 04713"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-700 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Work Email <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="karthik@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-700 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Primary Service of Interest
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-purple-700 outline-none"
                  >
                    <option value="General Business Consultation">General Business Consultation</option>
                    <option value="Business Launch 360° Package">Business Launch 360° Package</option>
                    <option value="Business Setup & Registration">Business Setup & Registration</option>
                    <option value="HR & People Operations">HR & People Operations</option>
                    <option value="Payroll & Statutory Compliance">Payroll & Statutory Compliance</option>
                    <option value="Technology & Custom Software">Technology & Custom Software</option>
                    <option value="Business Process & Operations SOPs">Business Process & Operations SOPs</option>
                    <option value="Accounts & Backend Support">Accounts & Backend Support</option>
                    <option value="Digital Marketing & Growth">Digital Marketing & Growth</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    How Can We Help You?
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide a brief overview of your business situation or requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-700 outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-800 to-rose-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                  >
                    Send Inquiry to Partner SPOC
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
