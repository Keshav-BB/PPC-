import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { solutions } from '@/data/solutions';

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Col (2 spans on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative h-12 w-52 bg-white/95 px-3 py-1.5 rounded-lg">
                <Image
                  src="/logo.png"
                  alt="People Point Consultants"
                  fill
                  className="object-contain p-1"
                />
              </div>
            </Link>
            <p className="text-slate-300 text-sm font-medium tracking-wide">
              TURN IDEAS INTO RUNNING BUSINESSES.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              From company setup and hiring to payroll, compliance, technology, operations, and growth — People Point provides businesses with one integrated, accountable partner to build and operate the systems behind their success.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-medium text-slate-400">
              <span className="px-2.5 py-1 rounded bg-slate-800/70 border border-slate-700/50">
                • Business Setup
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-800/70 border border-slate-700/50">
                • People & HR
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-800/70 border border-slate-700/50">
                • Payroll & Compliance
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-800/70 border border-slate-700/50">
                • Technology
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-800/70 border border-slate-700/50">
                • Operations SOPs
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-800/70 border border-slate-700/50">
                • Growth Marketing
              </span>
            </div>

            <div className="pt-4 flex items-center gap-3 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-brand-pink" />
              <span>Strict Non-Disclosure & Enterprise Data Confidentiality Guaranteed</span>
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
                    <span className="text-brand-pink text-[10px]">›</span>
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
                  Industries We Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & SPOC Col */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Get in Touch
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
                <span className="block text-[11px] text-pink-400 font-semibold uppercase">
                  Accountable SPOC
                </span>
                <span className="block text-white font-medium mt-0.5">
                  Kesavan — Working Partner
                </span>
                <span className="block text-slate-400 text-[11px] mt-0.5">
                  Business Operations & Execution
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-brand-purple mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] text-slate-500">Call / WhatsApp</span>
                  <a href="tel:+919840000000" className="text-white hover:underline">
                    +91 98400 00000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-brand-pink mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] text-slate-500">Official Inquiries</span>
                  <a href="mailto:contact@peoplepointconsultants.com" className="text-white hover:underline">
                    contact@peoplepointconsultants.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] text-slate-500">Headquarters</span>
                  <span>Chennai, Tamil Nadu, India</span>
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
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/data-security" className="hover:text-slate-400 transition-colors">
              Data Security & Confidentiality
            </Link>
            <span>•</span>
            <Link href="/admin/leads" className="text-slate-600 hover:text-slate-400">
              Admin / CRM
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
