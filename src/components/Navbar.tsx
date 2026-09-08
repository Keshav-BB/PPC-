'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  Building2,
  Users,
  Receipt,
  Code2,
  FileSpreadsheet,
  Workflow,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { solutions } from '@/data/solutions';

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-5 h-5 text-brand-purple" />,
  Users: <Users className="w-5 h-5 text-brand-pink" />,
  Receipt: <Receipt className="w-5 h-5 text-brand-purple" />,
  Code2: <Code2 className="w-5 h-5 text-brand-pink" />,
  FileSpreadsheet: <FileSpreadsheet className="w-5 h-5 text-brand-purple" />,
  Workflow: <Workflow className="w-5 h-5 text-brand-pink" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-brand-purple" />,
};

interface NavbarProps {
  onOpenConsultation?: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Notification Strip */}
      <div className="bg-brand-navy text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-medium text-pink-400">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
              Turn Ideas Into Running Businesses
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-300">
              One Partner for Business Setup, People, Payroll, Tech & Growth
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="tel:+919840000000"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-pink" />
              <span>+91 98400 00000</span>
            </a>
            <a
              href="mailto:contact@peoplepointconsultants.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-brand-purple" />
              <span className="hidden sm:inline">contact@peoplepointconsultants.com</span>
              <span className="sm:hidden">Email Us</span>
            </a>
            <Link
              href="/admin/leads"
              className="hidden lg:inline-flex text-xs px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              CRM Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-100'
            : 'bg-white py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-44 sm:h-12 sm:w-52">
              <Image
                src="/logo.png"
                alt="People Point Consultants"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === '/' ? 'text-brand-purple font-semibold' : 'text-slate-700 hover:text-brand-purple'
              }`}
            >
              Home
            </Link>

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${
                  pathname.startsWith('/solutions') ? 'text-brand-purple font-semibold' : 'text-slate-700 hover:text-brand-purple'
                }`}
                onClick={() => setSolutionsOpen(!solutionsOpen)}
              >
                <span>Solutions</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${solutionsOpen ? 'rotate-180 text-brand-purple' : ''}`} />
              </button>

              {/* Mega Dropdown Menu */}
              {solutionsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="col-span-2 pb-2 border-b border-slate-100 flex justify-between items-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Our 7 Core Operating Pillars
                    </span>
                    <Link
                      href="/packages"
                      className="text-xs font-semibold text-brand-purple hover:text-brand-pink flex items-center gap-1"
                    >
                      View All Packages <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                  {solutions.map((item) => (
                    <Link
                      key={item.id}
                      href={`/solutions/${item.slug}`}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
                    >
                      <div className="p-2 rounded-lg bg-purple-50 group-hover/item:bg-purple-100 transition-colors">
                        {iconMap[item.iconName]}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800 group-hover/item:text-brand-purple flex items-center gap-1.5">
                          {item.shortTitle}
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {item.subheadline}
                        </p>
                      </div>
                    </Link>
                  ))}
                  <div className="col-span-2 pt-2 border-t border-slate-100 bg-slate-50 -mx-6 -mb-6 p-4 rounded-b-2xl flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">
                      Not sure which solution fits your stage?
                    </span>
                    <Link
                      href="/assessment"
                      className="font-bold text-brand-pink hover:text-brand-purple flex items-center gap-1"
                    >
                      Take 2-Min Readiness Diagnostic →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/packages"
              className={`text-sm font-medium transition-colors ${
                pathname === '/packages' ? 'text-brand-purple font-semibold' : 'text-slate-700 hover:text-brand-purple'
              }`}
            >
              Packages
            </Link>

            <Link
              href="/how-we-work"
              className={`text-sm font-medium transition-colors ${
                pathname === '/how-we-work' ? 'text-brand-purple font-semibold' : 'text-slate-700 hover:text-brand-purple'
              }`}
            >
              How We Work
            </Link>

            <Link
              href="/case-studies"
              className={`text-sm font-medium transition-colors ${
                pathname === '/case-studies' ? 'text-brand-purple font-semibold' : 'text-slate-700 hover:text-brand-purple'
              }`}
            >
              Case Studies
            </Link>

            <Link
              href="/industries"
              className={`text-sm font-medium transition-colors ${
                pathname === '/industries' ? 'text-brand-purple font-semibold' : 'text-slate-700 hover:text-brand-purple'
              }`}
            >
              Industries
            </Link>

            <Link
              href="/about"
              className={`text-sm font-medium transition-colors ${
                pathname === '/about' ? 'text-brand-purple font-semibold' : 'text-slate-700 hover:text-brand-purple'
              }`}
            >
              About Team
            </Link>

            <Link
              href="/insights"
              className={`text-sm font-medium transition-colors ${
                pathname === '/insights' ? 'text-brand-purple font-semibold' : 'text-slate-700 hover:text-brand-purple'
              }`}
            >
              Insights
            </Link>

            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors ${
                pathname === '/contact' ? 'text-brand-purple font-semibold' : 'text-slate-700 hover:text-brand-purple'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="https://wa.me/919840000000?text=Hi%20People%20Point%2C%20I%20would%20like%20to%20discuss%20my%20business%20requirements."
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-slate-700 hover:text-brand-purple px-3 py-2 rounded-lg border border-slate-200 hover:border-brand-purple/30 transition-all flex items-center gap-1.5"
            >
              <span>Talk to Us</span>
            </Link>

            <button
              onClick={onOpenConsultation}
              className="text-xs sm:text-sm font-bold bg-gradient-to-r from-brand-purple to-brand-pink text-white px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:opacity-95 transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenConsultation}
              className="sm:hidden text-xs font-bold bg-gradient-to-r from-brand-purple to-brand-pink text-white px-3 py-1.5 rounded-lg"
            >
              Book Call
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 space-y-3 max-h-[80vh] overflow-y-auto">
            <Link
              href="/"
              className="block py-2 text-sm font-semibold text-slate-800 hover:text-brand-purple"
            >
              Home
            </Link>

            <div className="border-t border-slate-100 pt-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Our 7 Solutions
              </div>
              <div className="space-y-1.5 pl-2">
                {solutions.map((item) => (
                  <Link
                    key={item.id}
                    href={`/solutions/${item.slug}`}
                    className="block py-1.5 text-sm text-slate-700 hover:text-brand-purple"
                  >
                    • {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-2 space-y-2">
              <Link href="/packages" className="block py-1.5 text-sm font-medium text-slate-800">
                Packages & Pricing
              </Link>
              <Link href="/how-we-work" className="block py-1.5 text-sm font-medium text-slate-800">
                How We Work
              </Link>
              <Link href="/case-studies" className="block py-1.5 text-sm font-medium text-slate-800">
                Case Studies
              </Link>
              <Link href="/industries" className="block py-1.5 text-sm font-medium text-slate-800">
                Industries Supported
              </Link>
              <Link href="/about" className="block py-1.5 text-sm font-medium text-slate-800">
                About & Core Team
              </Link>
              <Link href="/assessment" className="block py-1.5 text-sm font-medium text-brand-pink font-semibold">
                Business Readiness Quiz →
              </Link>
              <Link href="/solution-builder" className="block py-1.5 text-sm font-medium text-brand-purple font-semibold">
                Custom Solution Builder →
              </Link>
              <Link href="/insights" className="block py-1.5 text-sm font-medium text-slate-800">
                Insights & Checklists
              </Link>
              <Link href="/contact" className="block py-1.5 text-sm font-medium text-slate-800">
                Contact Office
              </Link>
              <Link href="/admin/leads" className="block py-1.5 text-xs text-slate-500 font-mono">
                CRM Lead Dashboard
              </Link>
            </div>

            <div className="pt-4 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation?.();
                }}
                className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold text-sm shadow-md"
              >
                Book a Free Business Consultation
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
