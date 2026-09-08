'use client';

import React, { useState } from 'react';
import { assessmentQuestions } from '@/data/assessmentQuestions';
import { CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, Sparkles, Calendar } from 'lucide-react';
import { saveNewLead } from '@/lib/leadStorage';

interface AssessmentWidgetProps {
  onOpenConsultation?: () => void;
  compact?: boolean;
}

export default function AssessmentWidget({ onOpenConsultation, compact = false }: AssessmentWidgetProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', phone: '', email: '', company: '' });

  const currentQ = assessmentQuestions[currentIdx];
  const totalQuestions = assessmentQuestions.length;

  const handleSelectOption = (points: number) => {
    const updated = { ...answers, [currentQ.id]: points };
    setAnswers(updated);

    if (currentIdx + 1 < totalQuestions) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentIdx(0);
    setIsComplete(false);
    setLeadCaptured(false);
  };

  // Calculate Scores
  const totalPoints = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
  const maxPoints = totalQuestions * 3;
  const overallPercentage = Math.round((totalPoints / maxPoints) * 100);

  const getPillarScore = (pillar: string) => {
    const pillarQs = assessmentQuestions.filter((q) => q.pillar === pillar);
    const earned = pillarQs.reduce((acc, q) => acc + (answers[q.id] || 0), 0);
    const max = pillarQs.length * 3;
    return Math.round((earned / max) * 100);
  };

  const pillars = [
    { key: 'Setup', label: 'Business Setup & Legal', score: getPillarScore('Setup') },
    { key: 'HR', label: 'Team & HR Operations', score: getPillarScore('HR') },
    { key: 'Payroll', label: 'Payroll & Compliance', score: getPillarScore('Payroll') },
    { key: 'Technology', label: 'Technology & CRM', score: getPillarScore('Technology') },
    { key: 'Operations', label: 'Operations & SOPs', score: getPillarScore('Operations') },
    { key: 'Growth', label: 'Growth & Acquisition', score: getPillarScore('Growth') },
  ];

  const handleSaveScoreAndBook = (e: React.FormEvent) => {
    e.preventDefault();
    saveNewLead({
      fullName: userInfo.name,
      companyName: userInfo.company || 'Assessment Lead',
      phone: userInfo.phone,
      email: userInfo.email,
      city: 'India',
      businessStage: 'Diagnostic Completed',
      teamSize: 'Not specified',
      servicesNeeded: pillars.filter(p => p.score < 60).map(p => p.label),
      challenge: `Readiness Score: ${overallPercentage}%. Weakest pillars: ${pillars.filter(p => p.score < 60).map(p => p.label).join(', ') || 'None'}`,
      expectedTimeline: 'Immediately',
      consultationMode: 'Google Meet Video Call',
      source: 'Business Readiness Assessment'
    });
    setLeadCaptured(true);
  };

  return (
    <div className={`bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden ${compact ? 'p-6' : 'p-6 sm:p-10'}`}>
      {/* Quiz Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-brand-purple text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
            <span>Interactive Diagnostic</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            Business Readiness & Systems Assessment
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Identify operational gaps, compliance risks, and founder bottlenecks in 2 minutes.
          </p>
        </div>

        {!isComplete && (
          <div className="text-right">
            <span className="text-xs text-slate-400 font-bold block">Question</span>
            <span className="text-lg font-black text-brand-purple">
              {currentIdx + 1} <span className="text-xs text-slate-400">/ {totalQuestions}</span>
            </span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {!isComplete && (
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-4">
          <div
            className="bg-gradient-to-r from-brand-purple to-brand-pink h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      )}

      {/* Quiz Body */}
      {!isComplete ? (
        <div className="mt-8 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-pink">
              Pillar: {currentQ.pillarTitle}
            </span>
            <h4 className="text-base sm:text-xl font-bold text-slate-900 mt-1">
              {currentQ.question}
            </h4>
          </div>

          <div className="space-y-3">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(option.points)}
                className="w-full p-4 rounded-2xl border border-slate-200 hover:border-brand-purple hover:bg-purple-50/40 text-left transition-all duration-200 flex items-start gap-3 group"
              >
                <div className="w-6 h-6 rounded-full border border-slate-300 group-hover:border-brand-purple flex items-center justify-center text-xs font-bold text-slate-500 group-hover:text-brand-purple group-hover:bg-white shrink-0 mt-0.5">
                  {String.fromCharCode(65 + idx)}
                </div>
                <div className="flex-1">
                  <div className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-brand-purple">
                    {option.label}
                  </div>
                  {option.hint && (
                    <span className="inline-block mt-1 text-[10px] font-semibold text-slate-400 group-hover:text-brand-pink">
                      {option.hint}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {currentIdx > 0 && (
            <div className="pt-2 flex justify-start">
              <button
                onClick={() => setCurrentIdx(currentIdx - 1)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                ← Previous Question
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="mt-8 space-y-8 animate-in fade-in duration-300">
          {/* Overall Score Badge */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-brand-navy to-purple-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-pink-400">
                Your Operational Health Score
              </span>
              <h4 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {overallPercentage >= 75
                  ? 'Strong Operating Systems'
                  : overallPercentage >= 50
                  ? 'Moderate Systems — Bottlenecks Emerging'
                  : 'High Operational Risk & Founder Dependency'}
              </h4>
              <p className="text-xs text-slate-300 mt-2 max-w-lg leading-relaxed">
                {overallPercentage >= 75
                  ? 'Your foundation is solid. Focus on automation, advanced KRA/KPI tracking, and aggressive growth.'
                  : overallPercentage >= 50
                  ? 'Your business is running, but critical gaps in documentation, compliance, or SOPs are slowing you down.'
                  : 'Your business is highly vulnerable to personnel departures and compliance penalties. Establishing formal systems is urgent.'}
              </p>
            </div>

            <div className="text-center p-5 rounded-2xl bg-white/10 border border-white/15 min-w-[150px]">
              <span className="text-4xl sm:text-5xl font-black text-white">
                {overallPercentage}%
              </span>
              <span className="block text-[11px] font-bold text-pink-300 uppercase tracking-wider mt-1">
                Overall Score
              </span>
            </div>
          </div>

          {/* Pillar Breakdown Bars */}
          <div className="space-y-4">
            <h5 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Pillar Breakdown & Gap Analysis
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((p) => (
                <div key={p.key} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                    <span className="text-slate-800">{p.label}</span>
                    <span className={p.score < 50 ? 'text-red-500' : p.score < 75 ? 'text-amber-600' : 'text-emerald-600'}>
                      {p.score}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        p.score < 50 ? 'bg-red-500' : p.score < 75 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${p.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Capture / Booking Box */}
          {!leadCaptured ? (
            <div className="p-6 rounded-2xl bg-purple-50 border border-brand-purple/20 space-y-4">
              <div>
                <h5 className="text-base font-bold text-brand-navy">
                  Want an Actionable Systems Roadmap to Fix These Gaps?
                </h5>
                <p className="text-xs text-slate-600 mt-1">
                  Enter your details to receive your customized Diagnostic Report and schedule a free 30-minute review with our SPOC.
                </p>
              </div>

              <form onSubmit={handleSaveScoreAndBook} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple"
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={userInfo.company}
                  onChange={(e) => setUserInfo({ ...userInfo, company: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple"
                />
                <input
                  type="tel"
                  required
                  placeholder="Mobile / WhatsApp"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple"
                />
                <input
                  type="email"
                  required
                  placeholder="Business Email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple"
                />

                <div className="sm:col-span-2 pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 hover:opacity-95 transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Get Custom Report & Schedule Call</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 text-xs font-semibold hover:bg-white flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h5 className="text-lg font-bold text-slate-900">
                Diagnostic Submitted Successfully!
              </h5>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Our operations team has received your score breakdown. We will reach out via WhatsApp and email to discuss your systems roadmap.
              </p>
              <button
                onClick={onOpenConsultation}
                className="px-6 py-2.5 rounded-xl bg-brand-navy text-white text-xs font-bold hover:bg-brand-navyLight"
              >
                Choose Consultation Slot Now
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
