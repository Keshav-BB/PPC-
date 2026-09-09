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
  Calendar,
  MessageCircle
} from 'lucide-react';
import { solutions } from '@/data/solutions';

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-5 h-5 text-purple-700" />,
  Users: <Users className="w-5 h-5 text-rose-600" />,
  Receipt: <Receipt className="w-5 h-5 text-purple-700" />,
  Code2: <Code2 className="w-5 h-5 text-rose-600" />,
  FileSpreadsheet: <FileSpreadsheet className="w-5 h-5 text-purple-700" />,
  Workflow: <Workflow className="w-5 h-5 text-rose-600" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-purple-700" />,
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

  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Corporate Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-bold text-rose-400">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              TURN IDEAS INTO RUNNING BUSINESSES
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-300 font-medium">
              Setup • HR • Payroll • Compliance • Tech • Operations • Growth
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a
              href="tel:+918807304713"
              className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-rose-400" />
              <span>+91 88073 04713</span>
            </a>
            <a
              href="mailto:peoplepointconsultant@gmail.com"
              className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors font-medium"
            >
              <Mail className="w-3.5 h-3.5 text-purple-400" />
              <span>peoplepointconsultant@gmail.com</span>
            </a>
            <Link
              href="/admin/leads"
              className="hidden lg:inline-flex text-[11px] px-2.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
            >
              CRM Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-2.5 border-b border-slate-200'
            : 'bg-white py-3.5 border-b border-slate-200/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo - Highly Visible & Sharp */}
          <Link href="/" className="flex items-center gap-3 shrink-0 py-1">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="People Point Consultants"
                width={240}
                height={58}
                className="h-10 sm:h-12 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-7">
            <Link
              href="/"
              className={`text-sm font-semibold transition-colors ${
                pathname === '/' ? 'text-purple-800 font-bold border-b-2 border-purple-800 pb-0.5' : 'text-slate-700 hover:text-purple-800'
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
                className={`flex items-center gap-1 text-sm font-semibold transition-colors py-2 ${
                  pathname.startsWith('/solutions') ? 'text-purple-800 font-bold' : 'text-slate-700 hover:text-purple-800'
                }`}
                onClick={() => setSolutionsOpen(!solutionsOpen)}
              >
                <span>Solutions</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${solutionsOpen ? 'rotate-180 text-purple-800' : 'text-slate-400'}`} />
              </button>

              {/* Mega Dropdown Menu */}
              {solutionsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[740px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 grid grid-cols-2 gap-3.5 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="col-span-2 pb-2.5 border-b border-slate-100 flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Our 7 Core Operating Pillars
                    </span>
                    <Link
                      href="/packages"
                      className="text-xs font-bold text-purple-800 hover:text-rose-600 flex items-center gap-1"
                    >
                      Compare All Packages <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  {solutions.map((item) => (
                    <Link
                      key={item.id}
                      href={`/solutions/${item.slug}`}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item border border-transparent hover:border-slate-200/80"
                    >
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 group-hover/item:bg-purple-50 group-hover/item:border-purple-200 transition-colors shrink-0">
                        {iconMap[item.iconName]}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 group-hover/item:text-purple-800">
                          {item.shortTitle}
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {item.headline}
                        </p>
                      </div>
                    </Link>
                  ))}
                  <div className="col-span-2 pt-3 border-t border-slate-100 bg-slate-50/80 -mx-6 -mb-6 p-4 rounded-b-2xl flex items-center justify-between text-xs">
                    <span className="text-slate-700 font-medium">
                      Not sure which solution fits your business stage?
                    </span>
                    <Link
                      href="/assessment"
                      className="font-bold text-rose-600 hover:text-purple-800 flex items-center gap-1"
                    >
                      Take 2-Min Business Diagnostic →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/packages"
              className={`text-sm font-semibold transition-colors ${
                pathname === '/packages' ? 'text-purple-800 font-bold border-b-2 border-purple-800 pb-0.5' : 'text-slate-700 hover:text-purple-800'
              }`}
            >
              Packages
            </Link>

            <Link
              href="/how-we-work"
              className={`text-sm font-semibold transition-colors ${
                pathname === '/how-we-work' ? 'text-purple-800 font-bold border-b-2 border-purple-800 pb-0.5' : 'text-slate-700 hover:text-purple-800'
              }`}
            >
              How We Work
            </Link>

            <Link
              href="/case-studies"
              className={`text-sm font-semibold transition-colors ${
                pathname === '/case-studies' ? 'text-purple-800 font-bold border-b-2 border-purple-800 pb-0.5' : 'text-slate-700 hover:text-purple-800'
              }`}
            >
              Case Studies
            </Link>

            <Link
              href="/industries"
              className={`text-sm font-semibold transition-colors ${
                pathname === '/industries' ? 'text-purple-800 font-bold border-b-2 border-purple-800 pb-0.5' : 'text-slate-700 hover:text-purple-800'
              }`}
            >
              Industries
            </Link>

            <Link
              href="/about"
              className={`text-sm font-semibold transition-colors ${
                pathname === '/about' ? 'text-purple-800 font-bold border-b-2 border-purple-800 pb-0.5' : 'text-slate-700 hover:text-purple-800'
              }`}
            >
              About Team
            </Link>

            <Link
              href="/insights"
              className={`text-sm font-semibold transition-colors ${
                pathname === '/insights' ? 'text-purple-800 font-bold border-b-2 border-purple-800 pb-0.5' : 'text-slate-700 hover:text-purple-800'
              }`}
            >
              Insights
            </Link>

            <Link
              href="/contact"
              className={`text-sm font-semibold transition-colors ${
                pathname === '/contact' ? 'text-purple-800 font-bold border-b-2 border-purple-800 pb-0.5' : 'text-slate-700 hover:text-purple-800'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/918807304713?text=Hi%20People%20Point%2C%20I%20would%20like%20to%20discuss%20my%20business%20requirements."
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-slate-700 hover:text-purple-800 px-3.5 py-2.5 rounded-xl border border-slate-300 hover:border-purple-300 transition-all flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Talk to Us</span>
            </a>

            <button
              onClick={onOpenConsultation}
              className="text-xs sm:text-sm font-bold bg-gradient-to-r from-purple-800 via-purple-700 to-rose-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:opacity-95 transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenConsultation}
              className="sm:hidden text-xs font-bold bg-gradient-to-r from-purple-800 to-rose-600 text-white px-3 py-2 rounded-lg"
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
          <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-4 pb-6 space-y-3 max-h-[85vh] overflow-y-auto">
            <Link
              href="/"
              className="block py-2 text-sm font-bold text-slate-900 hover:text-purple-800"
            >
              Home
            </Link>

            <div className="border-t border-slate-100 pt-2.5">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Our 7 Solutions
              </div>
              <div className="space-y-1.5 pl-2">
                {solutions.map((item) => (
                  <Link
                    key={item.id}
                    href={`/solutions/${item.slug}`}
                    className="block py-1 text-sm text-slate-700 hover:text-purple-800 font-medium"
                  >
                    • {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-2.5 space-y-2">
              <Link href="/packages" className="block py-1 text-sm font-semibold text-slate-800">
                Packages & Models
              </Link>
              <Link href="/how-we-work" className="block py-1 text-sm font-semibold text-slate-800">
                How We Work
              </Link>
              <Link href="/case-studies" className="block py-1 text-sm font-semibold text-slate-800">
                Case Studies
              </Link>
              <Link href="/industries" className="block py-1 text-sm font-semibold text-slate-800">
                Industries Supported
              </Link>
              <Link href="/about" className="block py-1 text-sm font-semibold text-slate-800">
                About & Leadership Team
              </Link>
              <Link href="/assessment" className="block py-1 text-sm font-bold text-rose-600">
                Business Readiness Quiz →
              </Link>
              <Link href="/solution-builder" className="block py-1 text-sm font-bold text-purple-800">
                Custom Scope Builder →
              </Link>
              <Link href="/insights" className="block py-1 text-sm font-semibold text-slate-800">
                Insights & Checklists
              </Link>
              <Link href="/contact" className="block py-1 text-sm font-semibold text-slate-800">
                Contact Office
              </Link>
              <Link href="/admin/leads" className="block py-1 text-xs text-slate-500 font-mono">
                CRM Lead Dashboard
              </Link>
            </div>

            <div className="pt-3 border-t border-slate-200">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation?.();
                }}
                className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-purple-800 to-rose-600 text-white font-bold text-sm shadow-md"
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
