import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="bg-brand-bgSoft py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-card space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">
            Legal & Compliance
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Last Updated: September 2026 • People Point Consultants
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Commitment to Privacy</h2>
          <p>
            People Point Consultants (“we”, “our”, or “us”) respects your privacy and is committed to protecting the personal and business information you share with us through our website, consultation booking tools, diagnostic assessments, and direct communication channels.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Information We Collect</h2>
          <p>We collect information you provide directly to us when you:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Book a business consultation (Full name, company name, phone/WhatsApp number, email address, city/country).</li>
            <li>Complete our Business Readiness Assessment (Operational parameters, team size, challenges, and diagnostic answers).</li>
            <li>Use the Custom Solution Builder or download implementation checklists.</li>
            <li>Communicate with our team via WhatsApp, phone, or email.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. How We Use Your Information</h2>
          <p>We use the collected information strictly to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Evaluate your business requirements and provide tailored consultation advice.</li>
            <li>Assign your account to our dedicated Single Point of Contact (SPOC) and domain specialists.</li>
            <li>Prepare custom proposals, scope documents, and milestone estimates.</li>
            <li>Deliver requested toolkits, checklists, and operational resources.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Information Sharing & Non-Disclosure</h2>
          <p>
            We strictly <strong className="text-slate-900">do not sell, rent, or trade your personal or business data</strong> to third-party advertisers or data brokers. All client communications and proprietary documents are treated under strict professional non-disclosure obligations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">5. Contacting Us</h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to request deletion of your information, please contact our administrative office at <a href="mailto:peoplepointconsultant@gmail.com" className="text-brand-purple underline font-semibold">peoplepointconsultant@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
