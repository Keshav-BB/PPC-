'use client';

import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface MobileActionBarProps {
  onOpenConsultation?: () => void;
}

export default function MobileActionBar({ onOpenConsultation }: MobileActionBarProps) {
  const pathname = usePathname();

  const getWhatsAppMessage = () => {
    if (pathname.includes('business-setup')) return 'Hi People Point, I am interested in your Business Setup services.';
    if (pathname.includes('hr-people')) return 'Hi People Point, I am interested in your HR & Hiring services.';
    if (pathname.includes('payroll')) return 'Hi People Point, I need Payroll & Compliance support.';
    if (pathname.includes('technology')) return 'Hi People Point, I need custom software/web services.';
    return 'Hi People Point, I would like to consult on my business requirements.';
  };

  const whatsappUrl = `https://wa.me/918807304713?text=${encodeURIComponent(getWhatsAppMessage())}`;

  return (
    <aside aria-label="Mobile quick actions" className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 sm:hidden shadow-lg flex items-center justify-between gap-2">
      <a
        href="tel:+918807304713"
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold active:bg-slate-100"
      >
        <Phone className="w-3.5 h-3.5 text-purple-800" />
        <span>Call</span>
      </a>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold active:bg-emerald-700"
      >
        <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
        <span>WhatsApp</span>
      </a>

      <button
        onClick={onOpenConsultation}
        className="flex-[1.4] flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-purple-800 to-rose-600 text-white text-xs font-bold shadow-sm active:opacity-90"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>Book Free Call</span>
      </button>
    </aside>
  );
}
