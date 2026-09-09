import React from 'react';
import { RotateCcw, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <div className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
        <div className="border-b border-slate-200 pb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider mb-2">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Commercial Terms & Transparency</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1">
            Refund & Cancellation Policy
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Last Updated: September 2026 • People Point Consultants
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Milestone-Based Project Engagements</h2>
          <p>
            People Point delivers professional business setup, software development, process engineering (SOPs), and HR operational setup under customized, milestone-driven Scopes of Work (SOW).
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Payments for projects are billed in structured tranches tied to verifiable deliverables and milestone sign-offs.</li>
            <li>Upon completion and sign-off of an agreed project milestone, the associated milestone fee is non-refundable as technical and professional resources have already been deployed.</li>
            <li>If a client chooses to terminate a project engagement prior to the completion of an active milestone, billing will be adjusted on a pro-rata basis reflecting verified hours and deliverables produced up to the formal date of written notice.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Monthly Retainer Cancellations</h2>
          <p>
            For recurring managed services (such as Monthly Payroll & Compliance, Managed People Operations, or Technical AMC):
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Clients may cancel or transition their monthly retainer by providing 30 days written notice to their designated Single Point of Contact (SPOC).</li>
            <li>Retainer fees paid for the active operating month in which service is delivered are non-refundable.</li>
            <li>Upon notice of cancellation, People Point ensures an orderly handover of employee registers, payroll histories, source code, and working documentation.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Statutory & Government Fees</h2>
          <p>
            Government statutory filing charges, MCA stamp duties, challan payments, and regulatory registry fees paid to government bodies (such as Ministry of Corporate Affairs, GSTN, or Trademark registries) on behalf of the client are strictly non-refundable once remitted to the government treasury.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Dispute Resolution & Contact</h2>
          <p>
            We pride ourselves on direct partner accountability. If you have any questions or require adjustments to your service milestones, please contact your designated SPOC or reach our management desk at{' '}
            <a href="mailto:peoplepointconsultant@gmail.com" className="text-purple-800 underline font-semibold">
              peoplepointconsultant@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
