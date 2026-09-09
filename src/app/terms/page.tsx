import React from 'react';
import Link from 'next/link';
import { ShieldAlert, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions | People Point Consultants',
  description:
    'Comprehensive Terms & Conditions governing advisory, business setup, HR, payroll, technology, and operations services delivered by People Point Consultants.',
  alternates: {
    canonical: 'https://peoplepointconsultants.com/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-slate-700 text-xs sm:text-sm leading-relaxed">
        {/* Header */}
        <div className="border-b border-slate-200 pb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Commercial & Legal Agreement</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1">
            Terms & Conditions of Service
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Effective Date: September 2026 • People Point Consultants (Chennai, Tamil Nadu, India)
          </p>
        </div>

        {/* Executive Scope Note */}
        <div className="p-4 bg-purple-50/70 border border-purple-200/80 rounded-2xl text-purple-950 text-xs leading-relaxed space-y-1">
          <strong>Preamble:</strong> These Terms and Conditions constitute a legally binding agreement between you (the “Client”, “you”, or “your”) and People Point Consultants (“People Point”, “we”, “us”, or “our”). They govern your access to our website, diagnostic tools, and professional service engagements across Business Setup, HR, Payroll, Technology, Accounts, Operations SOPs, and Digital Growth.
        </div>

        {/* 1. Acceptance */}
        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing this website, submitting inquiry forms, interacting with our AI Business Advisor, accepting a commercial quotation, or executing a Statement of Work (SOW), you confirm that you have read, understood, and agreed to be bound by these Terms and Conditions. If you are entering into this agreement on behalf of a legal entity, you represent and warrant that you possess full legal authority to bind that entity.
          </p>
        </section>

        {/* 2. Order of Precedence (SOW & Proposals) */}
        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">2. Statement of Work (SOW) & Precedence</h2>
          <p>
            Specific professional deliverables, project milestones, commercials, and SLAs are documented in individually agreed Commercial Quotations, Invoices, or Statements of Work (SOW). In the event of any direct conflict between these general Terms & Conditions and a mutually executed SOW or signed Commercial Quotation, the terms of the specific SOW/Quotation shall prevail regarding project scope and pricing.
          </p>
        </section>

        {/* 3. Professional Fees, Taxes & Third-Party Out-of-Pockets */}
        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">3. Professional Fees, Taxes & Disbursements</h2>
          <p>
            All professional fees quoted by People Point cover advisory, documentation, implementation, and operational management services. Fees are exclusive of:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>Government & Statutory Fees:</strong> MCA portal filing fees, stamp duties, DIN allocations, trademark government fees, and statutory registry challans are direct sovereign liabilities and are payable directly by the client or reimbursed at actuals against official receipts.</li>
            <li><strong>Applicable Taxes:</strong> Applicable Goods and Services Tax (GST) or other statutory levies shall be charged as per prevailing tax laws. Where pre-registration tax exemptions apply, statutory notes are explicitly reflected on official invoices.</li>
            <li><strong>Third-Party Infrastructure:</strong> Cloud hosting, server instances (AWS/Vercel), domain registrar fees, SMS gateways, WhatsApp Business API utility fees, and third-party software licenses (e.g. Zoho, Google Workspace) are the direct financial responsibility of the client.</li>
          </ul>
        </section>

        {/* 4. Payment Terms, Due Dates & Suspension Rights */}
        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">4. Invoicing, Due Dates & Service Suspension</h2>
          <p>
            Invoices are raised in accordance with agreed milestone schedules or on the 1st of each calendar month for ongoing retainers. Standard payment terms are Net 10 business days from invoice issuance unless otherwise specified in the quotation.
          </p>
          <p>
            If payment is not received within 15 calendar days following the due date, People Point reserves the right, upon written notice, to pause ongoing advisory, hold software releases, or temporarily suspend monthly payroll processing until outstanding arrears are reconciled. People Point shall not be liable for statutory interest or penalties arising from client-induced payment suspensions.
          </p>
        </section>

        {/* 5. Client Responsibilities & Data Accuracy */}
        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">5. Client Input Responsibilities & Timelines</h2>
          <p>
            Timely operational delivery requires active client collaboration. The Client agrees to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Provide complete, accurate, and verified source documentation (including employee registers, attendance, PAN/Aadhaar copies, bank statements, and director KYC).</li>
            <li>Designate an authorized Single Point of Contact (SPOC) empowered to approve drafts, paysheets, and milestone sign-offs.</li>
            <li>Submit monthly payroll variable inputs (attendance, leaves, LOP, overtime) by the agreed cut-off date (e.g. 25th of the active month).</li>
            <li>Conduct final management verification and written approval of computed salary sheets prior to bank disbursement.</li>
          </ul>
        </section>

        {/* 6. Client-Caused Delays & Timeline Extensions */}
        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">6. Project Timelines & Client-Induced Delays</h2>
          <p>
            Project timelines (including our indicative 30-Day Business Launch Framework) assume timely submission of KYC and sign-offs. If milestone completion is delayed due to client inaction, delayed document delivery, or pending internal approvals exceeding 14 calendar days, project delivery milestones shall be extended by an equivalent duration without penalty to People Point.
          </p>
        </section>

        {/* 7. Change Requests & Scope Creep */}
        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">7. Change Management & Software Scope Creep</h2>
          <p>
            Deliverables are strictly governed by the approved Scope of Work. Any request by the Client for additional features, design overhauls, architectural modifications, or additional compliance registrations not contained in the original agreement shall be treated as a Change Request. People Point will submit an estimated timeline and commercial amendment for client approval before commencing out-of-scope work.
          </p>
        </section>

        {/* 8. Third-Party Dependencies & API Disclaimer */}
        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">8. Third-Party Platforms, APIs & Cloud Services</h2>
          <p>
            Our technological implementations may interface with external platforms including Google Cloud, Meta/WhatsApp, Zoho, GitHub, payment gateways, and banking APIs. People Point is not responsible for outages, rate limits, API deprecations, policy changes, or account suspensions imposed by these independent third-party providers.
          </p>
        </section>

        {/* 9. Regulatory Approvals & Sovereign Portal Disclaimer */}
        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">9. Sovereign Regulatory Approvals & Portals</h2>
          <p>
            People Point acts as a diligent facilitator for corporate and tax registrations. However, sovereign approvals (including MCA Certificate of Incorporation, GST registration approval, PF/ESIC code issuance, and Trademark registry grants) remain under the sovereign authority of the respective government departments. People Point does not guarantee arbitrary government completion dates and is not liable for administrative portal downtime (e.g. MCA V3 or GSTN outages).
          </p>
        </section>

        {/* 10. Disclaimers for Specialized Disciplines */}
        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">10. Recruitment & Marketing Disclaimers</h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>Recruitment Outcome Disclaimer:</strong> While People Point conducts rigorous candidate screening, final hiring decisions rest solely with the Client. People Point does not guarantee employee longevity, cultural fit, or future performance.</li>
            <li><strong>Marketing & ROAS Disclaimer:</strong> Digital marketing and growth services focus on strategic execution, creative positioning, and campaign management. People Point does not warrant specific sales figures, return on ad spend (ROAS), or commercial revenue quotas.</li>
          </ul>
        </section>

        {/* 11. AI Business Advisor Disclaimer */}
        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">11. AI Business Advisor Disclaimer</h2>
          <p>
            The People Point AI Business Advisor provides conversational scoping and diagnostic information based on operational parameters you submit. Responses are purely informational, exploratory, and non-binding. The AI tool does not issue formal legal opinions, tax advice, or commercial fee guarantees. Official proposals are finalized exclusively by assigned human consultants.
          </p>
        </section>

        {/* 12. Intellectual Property & Code Ownership */}
        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">12. Intellectual Property Rights</h2>
          <p>
            Upon receipt of full and final settlement of all agreed project milestone invoices, all bespoke software source code, bespoke graphic assets, custom SOP manuals, and client-specific workflows developed by People Point under the contract shall transfer to the ownership of the Client. People Point retains ownership of pre-existing proprietary toolkits, starter boilerplates, and generic operational templates.
          </p>
        </section>

        {/* 13. Confidentiality & Non-Disclosure */}
        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">13. Confidentiality & Data Protection</h2>
          <p>
            Both parties agree to treat all business plans, financial records, employee salary structures, customer lists, and proprietary code as strictly confidential. Neither party shall disclose confidential information to any third party without prior written consent, except where required by lawful court order or statutory authority.
          </p>
        </section>

        {/* 14. Cancellations & Refunds */}
        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">14. Cancellation & Refund Policy</h2>
          <p>
            All cancellations, milestone adjustments, and refund determinations are governed by our dedicated{' '}
            <Link href="/refund-policy" className="text-purple-800 underline font-semibold hover:text-purple-950">
              Refund & Cancellation Policy
            </Link>
            , which is expressly incorporated into these Terms by reference. Completed and signed-off milestones and disbursed government statutory fees are strictly non-refundable.
          </p>
        </section>

        {/* 15. Termination */}
        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">15. Termination of Engagement</h2>
          <p>
            Either party may terminate an ongoing retainer agreement by providing thirty (30) days advance written notice to the designated SPOC. Either party may terminate immediately in the event of material breach by the other party that remains uncured for fourteen (14) days following written notice. Upon termination, the Client shall settle all outstanding invoices for work performed up to the date of termination, and People Point shall execute an orderly handover of records.
          </p>
        </section>

        {/* 16. Force Majeure */}
        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">16. Force Majeure</h2>
          <p>
            Neither party shall be held liable for failure or delay in performing operational obligations (other than payment obligations) caused by events beyond reasonable control, including acts of God, war, pandemic, government portal collapse, nationwide telecommunication failure, or cyber-attacks.
          </p>
        </section>

        {/* 17. Dispute Resolution & Governing Law */}
        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">17. Governing Law & Jurisdiction</h2>
          <p>
            These Terms & Conditions and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of India. Both parties agree that the competent courts in <strong>Chennai, Tamil Nadu, India</strong> shall have exclusive jurisdiction over any legal proceedings arising from this engagement.
          </p>
        </section>

        {/* 18. Amendments & Legal Contact */}
        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">18. Modifications & Legal Inquiries</h2>
          <p>
            People Point reserves the right to update these Terms periodically to reflect changes in regulatory standards or service capabilities. For legal notices, contract inquiries, or clarifications, please reach our management desk:
          </p>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1 font-medium">
            <p className="text-slate-900 font-bold">People Point Consultants — Legal Desk</p>
            <p className="text-slate-600">Location: Chennai, Tamil Nadu, India</p>
            <p className="text-slate-600">Official Email: <a href="mailto:peoplepointconsultant@gmail.com" className="text-purple-800 underline font-semibold">peoplepointconsultant@gmail.com</a></p>
            <p className="text-slate-600">Single Point of Contact (SPOC): <a href="tel:+918807304713" className="text-purple-800 underline font-semibold">+91 88073 04713</a></p>
          </div>
        </section>
      </div>
    </div>
  );
}
