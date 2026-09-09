import React from 'react';
import { AlertCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function DisclaimerPage() {
  return (
    <div className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
        <div className="border-b border-slate-200 pb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Legal Notice & Scope Clarity</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1">
            Service Disclaimer
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Last Updated: September 2026 • People Point Consultants
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Nature of Advisory & Operational Services</h2>
          <p>
            People Point Consultants (“People Point”) provides business enablement, management consulting, operational process design (SOPs), human resources management, software engineering, and operational coordination services.
          </p>
          <p>
            The content, diagnostic assessments, checklists, and automated recommendations provided on this website are intended solely for exploratory and operational scoping purposes and do not constitute formal legal counsel, statutory tax opinions, or formal financial audits.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Statutory Filings & Professional Coordination</h2>
          <p>
            Where corporate filings, statutory returns (such as MCA company registrations, GST registrations, PF/ESI submissions, or TDS returns) require statutory authorization or formal representation before government departments:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>People Point acts as an operational facilitator and project coordinator to compile, verify, and streamline documentation.</li>
            <li>Where statutory filings mandate certified Chartered Accountants, Company Secretaries, or legal practitioners, such activities are handled in strict coordination with certified professional practitioners and licensed legal entities.</li>
            <li>Cross-border and international payroll or backoffice support is executed within agreed operational boundaries and coordinated with client-designated in-country providers where statutory representation is mandated.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Regulatory Approval & Government Portal Timelines</h2>
          <p>
            While People Point strives to expedite all corporate filings and maintain strict turnaround times, timelines for company registration (indicative 7–14 working days) or package milestones (such as Business Launch 360°) are indicative. Exact issuance dates of government certificates, PAN/TAN, GST numbers, and licenses remain subject to the processing schedules and approvals of respective government portals (Ministry of Corporate Affairs, GSTN, CBDT, EPFO, ESIC).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Third-Party Certifications & Security Notice</h2>
          <p>
            People Point adheres to rigorous internal standards for role-based access control, confidential client data handling, and non-disclosure obligations. We strictly distinguish direct operations from certified external audits and do not claim third-party certifications (such as ISO or SOC 2) unless actively and officially audited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">5. Contact Our Governance Team</h2>
          <p>
            For any queries regarding our operational boundaries or legal disclosures, please write to{' '}
            <a href="mailto:peoplepointconsultant@gmail.com" className="text-purple-800 underline font-semibold">
              peoplepointconsultant@gmail.com
            </a>{' '}
            or call <a href="tel:+918807304713" className="text-purple-800 underline font-semibold">+91 88073 04713</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
