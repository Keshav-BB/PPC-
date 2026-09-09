import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, Clock, UserCheck, AlertCircle, FileText } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | People Point Consultants',
  description:
    'Detailed Privacy Policy explaining how People Point Consultants collects, processes, protects, and retains personal, business, and diagnostic data.',
  alternates: {
    canonical: 'https://peoplepointconsultants.com/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-slate-700 text-xs sm:text-sm leading-relaxed">
        {/* Header */}
        <div className="border-b border-slate-200 pb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Data Protection & Privacy</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Last Updated: September 2026 • People Point Consultants (Chennai, India)
          </p>
        </div>

        {/* Executive Summary */}
        <div className="p-4 bg-purple-50/70 border border-purple-200/80 rounded-2xl text-purple-950 text-xs leading-relaxed">
          <strong>Overview:</strong> People Point Consultants (“we”, “our”, or “us”) respects your personal and commercial privacy. This Privacy Policy details our operational data handling procedures, legal basis for processing, concrete retention timelines, categories of third-party processors, and your statutory rights to access, correct, or request deletion of your information under applicable Indian data protection laws and international best practices.
        </div>

        {/* 1. Classes of Information We Collect */}
        <section className="space-y-3">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">1. Information We Collect</h2>
          <p>We process information categorized into three primary classes:</p>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">A. Information Provided Voluntarily</h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                <li><strong>Contact Identifiers:</strong> Full name, professional email address, phone / WhatsApp number, company name, and city.</li>
                <li><strong>Business Scoping Parameters:</strong> Operational stage (Idea, Registered, Scaling), employee team size, target timeline, and service requirements submitted through forms or consultation schedulers.</li>
                <li><strong>Commercial Engagement Files:</strong> Employee registers, historical paysheets, PAN/Aadhaar copies for statutory registrations, and banking details provided during active professional engagements.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">B. Automatically Collected Technical Data</h3>
              <p className="text-slate-600 text-xs mb-1">
                When you browse our website, our hosting servers and diagnostic analytics collect standard technical logs:
              </p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-600 text-xs">
                <li>Internet Protocol (IP) address (used solely for geolocation diagnostics, rate-limiting, and fraud prevention).</li>
                <li>Browser user-agent, operating system, screen resolution, and device category.</li>
                <li>Referral sources and campaign tracking parameters (UTM Source, UTM Medium, UTM Campaign).</li>
                <li>Time stamps, page visit sequences, and feature interaction events (e.g. tool clicks, package views).</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">C. AI Chatbot Conversational Context</h3>
              <p className="text-slate-600 text-xs">
                Queries submitted to the People Point AI Business Advisor are processed transiently to diagnose operational fit and recommend appropriate services. We explicitly instruct users <em>not to enter banking passwords, OTPs, or confidential government identification</em> into the chat drawer.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Legal Basis & Purpose of Processing */}
        <section className="space-y-3">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">2. Purpose and Legal Basis for Processing</h2>
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-purple-900 text-white font-bold text-[11px]">
                <th className="p-2.5 rounded-l-lg">Data Category</th>
                <th className="p-2.5">Processing Purpose</th>
                <th className="p-2.5 rounded-r-lg">Legal Basis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="p-2.5 font-bold">Consultation Leads</td>
                <td className="p-2.5">Assigning designated SPOC, conducting initial discovery, and scheduling meetings.</td>
                <td className="p-2.5 font-semibold text-purple-800">Consent & Pre-Contractual Steps</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">Billing & Invoices</td>
                <td className="p-2.5">Processing service retainers, generating statutory invoices, and tax reconciliation.</td>
                <td className="p-2.5 font-semibold text-purple-800">Contractual Obligation & Legal Duty</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">AI Advisory Queries</td>
                <td className="p-2.5">Generating real-time business roadmaps, service mapping, and lead qualification.</td>
                <td className="p-2.5 font-semibold text-purple-800">Consent & Legitimate Interest</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">Technical / Log Data</td>
                <td className="p-2.5">DDoS mitigation, API rate-limiting, and website performance monitoring.</td>
                <td className="p-2.5 font-semibold text-purple-800">Legitimate Security Interest</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 3. Concrete Data Retention Schedule */}
        <section className="space-y-3">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">3. Concrete Data Retention Schedule</h2>
          <p>We do not retain information indefinitely. We adhere to defined operational retention criteria:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>Marketing & Consultation Leads:</strong> Retained for <strong>24 months</strong> from the last recorded interaction, after which records are automatically archived or permanently purged, unless an active commercial contract is executed or the user requests earlier deletion.</li>
            <li><strong>AI Chat Transcripts:</strong> Preserved locally in your browser’s temporary storage (`localStorage`) during your active browsing session to preserve conversational memory. If you submit the lead form, conversation summaries are transmitted to our CRM. Transcripts in the browser can be cleared at any time by pressing the Reset button or clearing browser cache.</li>
            <li><strong>Executed Contracts, Quotations & Invoices:</strong> Retained for <strong>7 financial years</strong> to satisfy mandatory statutory compliance under the Companies Act, 2013, and Indian Income Tax / GST regulations.</li>
            <li><strong>Support & Operational Workflows:</strong> Retained for the duration of the active service agreement, plus 90 days following completion for orderly data handover.</li>
          </ul>
        </section>

        {/* 4. Authorized Third-Party Sub-Processors */}
        <section className="space-y-3">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">4. Authorized Third-Party Sub-Processors</h2>
          <p>We only share data with vetted service providers operating under strict confidentiality:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>Hosting & Infrastructure:</strong> Vercel Inc. and Cloudflare Inc. (secure SSL/TLS edge hosting and global CDN delivery).</li>
            <li><strong>Artificial Intelligence Engine:</strong> Google Cloud Gemini API (used transiently for processing natural language advisory queries without persistent training on proprietary client data).</li>
            <li><strong>Communication Platforms:</strong> Meta / WhatsApp Business API and Google Workspace / Gmail (for dispatching scheduled consultation reminders and quotation summaries).</li>
            <li><strong>Statutory Authorities:</strong> Ministry of Corporate Affairs (MCA), Goods and Services Tax Network (GSTN), Employees’ Provident Fund Organisation (EPFO), and state commercial tax portals (strictly when authorized by client for formal compliance filings).</li>
          </ul>
        </section>

        {/* 5. Individual Rights: Access, Correction & Deletion */}
        <section className="space-y-3">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">5. Your Data Rights & Deletion Procedures</h2>
          <p>Under applicable data privacy regulations, you possess the following rights:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>Right to Access & Portability:</strong> You may request a machine-readable copy of the personal information we hold concerning your account.</li>
            <li><strong>Right to Rectification:</strong> You may request that inaccurate or outdated contact information be corrected.</li>
            <li><strong>Right to Erasure (“Right to Be Forgotten”):</strong> You may request the permanent deletion of your inquiry data and marketing contact records.</li>
            <li><strong>Withdrawal of Consent:</strong> Where processing is based on consent, you may withdraw your consent at any time without affecting the lawfulness of prior processing.</li>
          </ul>
          <p>
            To exercise any of these rights, please email our Grievance Desk at{' '}
            <a href="mailto:peoplepointconsultant@gmail.com" className="text-purple-800 underline font-semibold">
              peoplepointconsultant@gmail.com
            </a>
            . We acknowledge all requests within 48 hours and resolve verified requests within 30 calendar days.
          </p>
        </section>

        {/* 6. Statutory Grievance Redressal Mechanism */}
        <section className="space-y-3">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">6. Grievance Officer & Contact Information</h2>
          <p>
            In accordance with the Information Technology Act, 2000, and rules made thereunder, the designated Grievance Officer for People Point Consultants is:
          </p>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1 font-medium">
            <p className="text-slate-900 font-bold">Grievance Officer: V. Bhavani</p>
            <p className="text-slate-600">Designation: Founder & Managing Director</p>
            <p className="text-slate-600">Organization: People Point Consultants</p>
            <p className="text-slate-600">Headquarters: Chennai, Tamil Nadu, India</p>
            <p className="text-slate-600">Direct Desk / WhatsApp: <a href="tel:+918807304713" className="text-purple-800 underline font-semibold">+91 88073 04713</a></p>
            <p className="text-slate-600">Official Inquiries: <a href="mailto:peoplepointconsultant@gmail.com" className="text-purple-800 underline font-semibold">peoplepointconsultant@gmail.com</a></p>
            <p className="text-slate-500 text-[11px] pt-1">Statutory Response Commitment: Within 30 calendar days of receipt.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
