'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const pathname = usePathname();

  const getContextMessage = () => {
    if (pathname.includes('business-setup')) {
      return 'Hi People Point, I am interested in your Business Setup & Registration services and would like to discuss my requirements.';
    }
    if (pathname.includes('hr-people')) {
      return 'Hi People Point, I am interested in your HR & People Operations services and would like to discuss my requirements.';
    }
    if (pathname.includes('payroll-compliance')) {
      return 'Hi People Point, I am interested in your Payroll & Compliance services and would like to discuss my requirements.';
    }
    if (pathname.includes('technology')) {
      return 'Hi People Point, I am interested in your Custom Software & Technology services and would like to discuss my requirements.';
    }
    if (pathname.includes('accounts-backend')) {
      return 'Hi People Point, I am interested in your Accounts & Backend Support services and would like to discuss my requirements.';
    }
    if (pathname.includes('process-operations')) {
      return 'Hi People Point, I am interested in your Business Process & SOP Consulting and would like to discuss my requirements.';
    }
    if (pathname.includes('digital-marketing')) {
      return 'Hi People Point, I am interested in your Digital Marketing & Performance Ad services and would like to discuss my requirements.';
    }
    if (pathname.includes('packages')) {
      return 'Hi People Point, I am reviewing your Business Packages (such as Business Launch 360°) and would like to request a proposal.';
    }
    if (pathname.includes('assessment')) {
      return 'Hi People Point, I am taking your Business Readiness Assessment and would like to review my results with your team.';
    }
    return 'Hi People Point, I would like to discuss how you can help build and run the systems behind my business.';
  };

  const whatsappUrl = `https://wa.me/918807304713?text=${encodeURIComponent(getContextMessage())}`;

  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-6 right-6 z-40 hidden sm:block">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5"
        title="Chat with People Point on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
        <span className="text-xs font-bold tracking-wide pr-1">
          WhatsApp Us
        </span>
      </a>
    </aside>
  );
}
