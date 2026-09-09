'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function QuoteRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/billing?tab=quotations&action=new-quote');
  }, [router]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-slate-50">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-3xl border border-slate-200 shadow-lg space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-900 flex items-center justify-center mx-auto">
          <FileText className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-black text-slate-900">
          Opening Quotation Creator Studio
        </h2>
        <p className="text-xs text-slate-500">
          Redirecting you to the People Point Sales & Billing Studio to prepare a new commercial quotation...
        </p>
        <div className="flex items-center justify-center gap-2 text-purple-900 font-bold text-xs pt-2">
          <Loader2 className="w-4 h-4 animate-spin text-purple-700" />
          <span>Loading Studio</span>
        </div>
        <div className="pt-4 border-t border-slate-100">
          <Link
            href="/admin/billing?tab=quotations&action=new-quote"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-900 hover:underline"
          >
            <span>Click here if you are not redirected automatically</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
