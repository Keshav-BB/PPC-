'use client';

import React, { useContext } from 'react';
import AssessmentWidget from '@/components/AssessmentWidget';
import { ConsultationContext } from '@/components/ClientLayoutWrapper';
import { ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AssessmentPage() {
  const { openConsultation } = useContext(ConsultationContext);

  return (
    <div className="bg-brand-bgSoft py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-brand-purple text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
            <span>Interactive Self-Diagnostic</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Business Readiness Assessment
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Evaluate your company across Legal Structuring, HR Operations, Payroll Compliance, Technology, and Process SOPs. Get instant scoring and priority action items.
          </p>
        </div>

        <AssessmentWidget onOpenConsultation={() => openConsultation('Business Readiness Review')} />

        <div className="mt-12 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm max-w-2xl mx-auto text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Confidential & Secure Diagnostic</span>
          </div>
          <p className="text-xs text-slate-500">
            Your responses are stored securely and used exclusively by People Point’s senior partners to prepare your operational roadmap.
          </p>
        </div>
      </div>
    </div>
  );
}
