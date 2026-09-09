import React from 'react';
import Link from 'next/link';
import { Home, Layers, Package, PhoneCall, ArrowRight, ShieldCheck, Compass, HelpCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-3xl w-full text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold mb-6">
          <HelpCircle className="w-4 h-4 text-rose-600" />
          <span>Error 404 • Page Not Found</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
          We Couldn’t Find the System <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-purple-900 via-purple-700 to-rose-600 bg-clip-text text-transparent">
            You Were Looking For
          </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed">
          The link you followed may have moved, expired, or been updated as part of our platform improvements. Let’s get your business back on track.
        </p>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-10">
          <Link
            href="/"
            className="group p-5 bg-white rounded-xl border border-gray-200 hover:border-purple-600 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-lg bg-purple-50 text-purple-800 group-hover:bg-purple-800 group-hover:text-white transition-colors">
                <Home className="w-5 h-5" />
              </div>
              <span className="font-bold text-gray-900 group-hover:text-purple-900 transition-colors">
                Home Overview
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Return to the People Point homepage to explore our complete execution model.
            </p>
          </Link>

          <Link
            href="/solutions"
            className="group p-5 bg-white rounded-xl border border-gray-200 hover:border-purple-600 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-lg bg-purple-50 text-purple-800 group-hover:bg-purple-800 group-hover:text-white transition-colors">
                <Layers className="w-5 h-5" />
              </div>
              <span className="font-bold text-gray-900 group-hover:text-purple-900 transition-colors">
                Business Solutions
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Setup, HR, Payroll, Statutory Compliance, Custom Software, SOPs, and Growth.
            </p>
          </Link>

          <Link
            href="/packages"
            className="group p-5 bg-white rounded-xl border border-gray-200 hover:border-purple-600 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-lg bg-rose-50 text-rose-800 group-hover:bg-rose-700 group-hover:text-white transition-colors">
                <Package className="w-5 h-5" />
              </div>
              <span className="font-bold text-gray-900 group-hover:text-rose-700 transition-colors">
                Execution Packages
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Explore 30-Day Business Launch, Foundation, Operational & Scale retainer plans.
            </p>
          </Link>

          <Link
            href="/contact"
            className="group p-5 bg-white rounded-xl border border-gray-200 hover:border-purple-600 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <PhoneCall className="w-5 h-5" />
              </div>
              <span className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                Consult With Our Team
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Schedule a confidential 30-minute system discovery consultation in Chennai.
            </p>
          </Link>
        </div>

        {/* Bottom CTA Row */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-purple-900 text-white font-semibold text-sm hover:bg-purple-950 transition-colors shadow-sm"
          >
            <span>Back to Home</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://wa.me/918807304713?text=Hi%20People%20Point%2C%20I%20hit%20a%20missing%20page%20on%20your%20website%20and%20would%20like%20assistance."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-semibold text-sm hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
          >
            <span>WhatsApp Quick Support</span>
          </a>
        </div>

        {/* Security reassurance footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex items-center justify-center gap-2 text-xs text-gray-400">
          <ShieldCheck className="w-4 h-4 text-gray-400" />
          <span>People Point Consultants • Chennai, India • Built on Secure Enterprise Architecture</span>
        </div>
      </div>
    </div>
  );
}
