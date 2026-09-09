import React from 'react';
import { Cookie, ShieldCheck } from 'lucide-react';

export default function CookiePolicyPage() {
  return (
    <div className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
        <div className="border-b border-slate-200 pb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Cookie className="w-3.5 h-3.5" />
            <span>Browser Storage & Transparency</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1">
            Cookie Policy
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Last Updated: September 2026 • People Point Consultants
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files placed on your device by your web browser when you visit our website. They allow our website to remember your device, preferences, and browsing actions over time to deliver a smooth and personalized experience.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Types of Cookies We Use</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">Essential / Technical Cookies</h3>
              <p className="text-slate-600 text-xs">
                These cookies are strictly required for the operation of our website, including session security, routing, and remembering consultation booking modal states.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">Analytical & Performance Cookies</h3>
              <p className="text-slate-600 text-xs">
                These allow us to measure traffic, page loading speeds, and visitor navigation flows to continuously optimize our user experience. Data collected is aggregated and anonymized.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">Functional & Preference Cookies</h3>
              <p className="text-slate-600 text-xs">
                Used to recognize your return visits, store your diagnostic quiz progress, and remember conversational context in the AI Business Advisor.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Managing and Disabling Cookies</h2>
          <p>
            Most web browsers allow you to control and block cookies through their setting preferences. Please note that disabling essential cookies may impact the proper functioning and interactivity of certain interactive diagnostic tools on our website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Inquiries & Data Protection</h2>
          <p>
            For any questions regarding our Cookie Policy, please contact our team at{' '}
            <a href="mailto:peoplepointconsultant@gmail.com" className="text-purple-800 underline font-semibold">
              peoplepointconsultant@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
