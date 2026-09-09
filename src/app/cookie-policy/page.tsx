import React from 'react';
import { Cookie, ShieldCheck, Database, HardDrive } from 'lucide-react';

export const metadata = {
  title: 'Cookie & Browser Storage Policy | People Point Consultants',
  description:
    'Technical transparency statement on cookies, browser localStorage, and session storage utilized by People Point Consultants.',
  alternates: {
    canonical: 'https://peoplepointconsultants.com/cookie-policy',
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-slate-700 text-xs sm:text-sm leading-relaxed">
        {/* Header */}
        <div className="border-b border-slate-200 pb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Cookie className="w-3.5 h-3.5" />
            <span>Storage Transparency & Privacy</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1">
            Cookie & Local Storage Policy
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Last Updated: September 2026 • People Point Consultants (Chennai, India)
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">1. Technical Overview</h2>
          <p>
            This policy transparently explains how People Point Consultants uses HTTP cookies and browser web storage technologies (specifically <code>localStorage</code> and <code>sessionStorage</code>) on our website and client portal.
          </p>
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium">
            <strong>Key Privacy Fact:</strong> People Point does not sell browsing data, deploy third-party advertising tracking networks, or embed intrusive behavioral ad pixels on our site. All web storage is deployed strictly for technical functionality, session persistence, and client workflow automation.
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">2. Technologies Deployed & Purpose</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-sm mb-1">
                <Cookie className="w-4 h-4 text-purple-800" />
                <span>A. Essential Technical Cookies (First-Party Only)</span>
              </div>
              <p className="text-slate-600 text-xs">
                Essential cookies maintain secure connections, ensure correct routing through CDN edge nodes, prevent Cross-Site Request Forgery (CSRF), and manage navigation states. These cookies expire at the end of your browsing session and cannot be disabled without compromising fundamental website security.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-sm mb-1">
                <HardDrive className="w-4 h-4 text-purple-800" />
                <span>B. Browser Web Storage (localStorage & sessionStorage)</span>
              </div>
              <p className="text-slate-600 text-xs mb-2">
                Instead of bulky tracking cookies, our application utilizes standard browser web storage for secure, client-side functionality:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                <li><strong>AI Business Advisor Memory:</strong> Stores your active session dialogue, selected operational pillar, and diagnostic readiness score locally in your browser. This enables you to navigate the site without losing conversation progress. This data remains on your local device until you click “Reset conversation” or clear your browser cache.</li>
                <li><strong>Admin Studio & CRM Caching:</strong> For authorized internal users accessing `/admin/*`, draft quotations, invoices, client masters, and lead qualification queues are temporarily cached locally to provide zero-latency filtering and offline resilience.</li>
                <li><strong>Consultation Schedulers:</strong> Temporarily stores your pre-selected package so the booking modal loads seamlessly across page transitions.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-sm mb-1">
                <Database className="w-4 h-4 text-purple-800" />
                <span>C. Privacy-Conscious Analytical Events</span>
              </div>
              <p className="text-slate-600 text-xs">
                We monitor high-level aggregated interaction events (such as button clicks, tool launches, and form submissions) via first-party DOM custom events (`pp_analytics`) to identify friction points and enhance user experience. These metrics are strictly aggregated and contain no personally identifiable financial or legal data.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">3. How to Clear or Manage Your Storage</h2>
          <p>
            You have full control over your browser’s cookies and web storage. You can inspect, modify, or completely delete stored data at any time through your browser settings:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
            <li><strong>Google Chrome:</strong> Settings $\rightarrow$ Privacy and Security $\rightarrow$ Clear Browsing Data $\rightarrow$ Cookies and other site data.</li>
            <li><strong>Mozilla Firefox:</strong> Settings $\rightarrow$ Privacy & Security $\rightarrow$ Cookies and Site Data $\rightarrow$ Clear Data.</li>
            <li><strong>Apple Safari:</strong> Preferences $\rightarrow$ Privacy $\rightarrow$ Manage Website Data $\rightarrow$ Remove All.</li>
            <li><strong>Chatbot Memory Reset:</strong> Simply click the reset icon (circular arrow) in the top-right corner of the AI Advisor header to immediately wipe conversational memory.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">4. Contact Our Technical Privacy Desk</h2>
          <p>
            For questions regarding browser storage or data transparency, please reach our technical team at{' '}
            <a href="mailto:peoplepointconsultant@gmail.com" className="text-purple-800 underline font-semibold">
              peoplepointconsultant@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
