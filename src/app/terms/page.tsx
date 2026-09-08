import React from 'react';

export default function TermsPage() {
  return (
    <div className="bg-brand-bgSoft py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-card space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">
            Terms of Service
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1">
            Terms & Conditions
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Last Updated: September 2026 • People Point Consultants
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing this website, utilizing our interactive diagnostic tools, or engaging People Point Consultants for business setup, HR, payroll, technology, or operations services, you agree to be bound by these Terms and Conditions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Professional Services & Scope Boundaries</h2>
          <p>
            People Point Consultants operates as an integrated business enablement partner. Detailed commercial engagements are governed by separate, mutually-signed Statements of Work (SOW) or Service Level Agreements (SLA) specifying milestones, deliverables, and fees.
          </p>
          <p className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <strong>Regulatory Scope Disclaimer:</strong> Statutory tax filings, legal documentation, and cross-border payroll are conducted in strict compliance with applicable laws and, where required, executed in coordination with certified practitioners and licensed statutory bodies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Intellectual Property</h2>
          <p>
            For custom software, websites, and business systems engineered for clients, full intellectual property rights transfer to the client upon full settlement of project milestone invoices as outlined in individual contracts.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Limitation of Liability</h2>
          <p>
            While People Point adheres to the highest standards of operational rigor and compliance deadlines, we are not liable for regulatory portal downtimes (such as MCA, GSTN, EPFO, or state tax server delays) beyond our direct technical control.
          </p>
        </section>
      </div>
    </div>
  );
}
