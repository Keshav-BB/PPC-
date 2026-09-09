'use client';

import React, { useState } from 'react';
import { X, Download, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { LeadMagnet } from '@/data/leadMagnets';
import { saveNewLead } from '@/lib/leadStorage';

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
  magnet: LeadMagnet | null;
}

export default function LeadMagnetModal({ isOpen, onClose, magnet }: LeadMagnetModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen || !magnet) return null;

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    saveNewLead({
      fullName: name,
      companyName: company || 'Not specified',
      phone: phone,
      email: email,
      city: 'India',
      businessStage: 'Lead Magnet Download',
      teamSize: 'Not specified',
      servicesNeeded: [magnet.category],
      challenge: `Downloaded asset: ${magnet.title}`,
      expectedTimeline: 'Exploring',
      consultationMode: 'Email & WhatsApp',
      source: `Lead Magnet: ${magnet.title}`
    });
    setDownloaded(true);
  };

  const handleClose = () => {
    setDownloaded(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-navy to-brand-purple p-6 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-[11px] font-bold uppercase tracking-wider text-pink-300">
            Free Implementation Asset • {magnet.category}
          </span>
          <h3 className="text-xl font-black text-white mt-1">
            {magnet.title}
          </h3>
          <p className="text-xs text-slate-200 mt-1">
            {magnet.format} • {magnet.downloadCount}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {downloaded ? (
            <div className="text-center py-6 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-xl font-bold text-slate-900">
                Your Toolkit is Ready!
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                We have emailed your copy of <strong>{magnet.title}</strong> to <span className="text-slate-900 font-semibold">{email}</span>.
              </p>
              <div className="pt-2">
                <a
                  href="#download"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Simulated instant download: ${magnet.title} (.pdf)`);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download File Directly</span>
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleDownload} className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                {magnet.description}
              </p>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs space-y-1">
                <div className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">
                  Inside this toolkit:
                </div>
                {magnet.bullets.map((b, i) => (
                  <div key={i} className="text-slate-600 flex items-center gap-1.5">
                    <span className="text-brand-purple font-bold">•</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name <span className="text-brand-pink">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-purple outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Business Email (Download will be sent here) <span className="text-brand-pink">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ramesh@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-purple outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile / WhatsApp <span className="text-brand-pink">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 88073..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-purple outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="My Startup"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-purple outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all mt-4"
              >
                <Download className="w-4 h-4" />
                <span>Get Free Instant Access</span>
              </button>
              <p className="text-[10px] text-slate-400 text-center mt-2 leading-tight">
                For general informational use only. Requirements vary by entity, jurisdiction and circumstances. Professional review may be required before implementation.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
