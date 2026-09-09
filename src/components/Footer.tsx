import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { solutions } from '@/data/solutions';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col (2 spans on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <div className="bg-white px-3.5 py-1.5 rounded-xl inline-block shadow-sm">
                <Image
                  src="/logo.png"
                  alt="People Point Consultants"
                  width={220}
                  height={52}
                  className="h-9 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-white text-sm font-bold tracking-wide">
              TURN IDEAS INTO RUNNING BUSINESSES.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              From company setup and hiring to payroll, compliance, technology, operations, and growth — People Point provides businesses with one integrated, accountable partner to build and operate the systems behind their success.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-semibold text-slate-400">
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                • Business Setup
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                • People & HR
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                • Payroll & Compliance
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                • Technology
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                • Operations SOPs
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                • Growth Marketing
              </span>
            </div>

            <div className="pt-3 flex items-center gap-2 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Strict Non-Disclosure & Strong Confidentiality Controls</span>
            </div>
          </div>

          {/* Solutions Col */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              7 Core Solutions
            </h4>
            <ul className="space-y-2.5 text-xs">
              {solutions.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/solutions/${item.slug}`}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-rose-500 text-[10px]">›</span>
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Packages & Company Col */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Packages & Company
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/packages" className="text-slate-400 hover:text-white transition-colors">
                  Business Launch 360° (Flagship)
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-slate-400 hover:text-white transition-colors">
                  HR Foundation Package
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-slate-400 hover:text-white transition-colors">
                  Managed People Operations
                </Link>
              </li>
              <li>
                <Link href="/how-we-work" className="text-slate-400 hover:text-white transition-colors">
                  How We Work (6-Stage Model)
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-slate-400 hover:text-white transition-colors">
                  Client Case Studies
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  Core Leadership Team
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-slate-400 hover:text-white transition-colors">
                  Industries Supported
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & SPOC Col */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Contact Office
            </h4>
            <div className="space-y-3.5 text-xs text-slate-400">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="block text-[11px] text-rose-400 font-bold uppercase">
                  Accountable Client SPOC
                </span>
                <span className="block text-white font-bold mt-0.5">
                  Business Operations & Execution
                </span>
                <span className="block text-slate-400 text-[11px] mt-0.5">
                  Dedicated Account Lead
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] text-slate-500">Call / WhatsApp</span>
                  <a href="tel:+918807304713" className="text-white font-bold hover:underline">
                    +91 88073 04713
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] text-slate-500">Official Inquiries</span>
                  <a href="mailto:peoplepointconsultant@gmail.com" className="text-white font-medium hover:underline">
                    peoplepointconsultant@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] text-slate-500">Corporate Office</span>
                  <span className="text-slate-200">Chennai, Tamil Nadu, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} People Point Consultants. All rights reserved. Turn Ideas Into Running Businesses.
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/data-security" className="hover:text-slate-300 transition-colors">
              Data Security & Confidentiality
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
