'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FileText,
  Printer,
  Share2,
  Download,
  Plus,
  Trash2,
  Sparkles,
  ArrowLeft,
  Building,
  User,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  CheckCircle2,
  Layers,
  Copy,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Percent
} from 'lucide-react';
import { getStoredLeads, LeadRecord } from '@/lib/leadStorage';

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  rate: number;
  amount: number;
}

interface BillingDoc {
  type: 'invoice' | 'quotation';
  docNumber: string;
  date: string;
  validityDate: string;
  clientName: string;
  companyName: string;
  address: string;
  phone: string;
  email: string;
  gstin: string;
  subject: string;
  scopeItems: string[];
  items: LineItem[];
  discount: number;
  taxRate: number; // 0 for exempt/pre-registration, 18 for GST
  taxType: 'none' | 'cgst_sgst' | 'igst';
  advancePaid: number;
  paymentTerms: string;
  notes: string;
  bankDetails: {
    accountName: string;
    bankName: string;
    accountNumber: string;
    ifsc: string;
    accountType: string;
  };
  signatory: string;
}

// Authentic presets from real business artifacts
const SHREE_ABHI_INVOICE_PRESET: BillingDoc = {
  type: 'invoice',
  docNumber: 'INV/2026-27/007',
  date: '2026-09-04',
  validityDate: '2026-09-14',
  clientName: 'Director / Management',
  companyName: 'SHREE ABHI ELECTRICALS & ENGINEERING PRIVATE LIMITED',
  address: 'Chennai, Tamil Nadu, India',
  phone: '+91 98400 00000',
  email: 'accounts@shreeabhi.com',
  gstin: '',
  subject: 'Payroll Setup & Monthly Payroll Services – One-Time Setup Fee (Advance)',
  scopeItems: [
    'Review and verification of employee/payroll data',
    'CTC & salary structure preparation',
    'Salary components / paysheet / payslip format setup',
    'Zoho Payroll setup and configuration',
    'Employee master data setup and initial payroll reconciliation',
    'Setup of required statutory compliance reports and MIS formats'
  ],
  items: [
    {
      id: '1',
      description:
        'One-Time Payroll Setup & Review – review and verification of employee/payroll data, CTC & salary structure preparation, salary components/paysheet/payslip format setup, Zoho Payroll setup/configuration, employee master data setup, initial payroll calculation, validation and reconciliation, setup of required payroll reports and formats',
      quantity: 1,
      unit: 'Setup',
      rate: 25000,
      amount: 25000
    },
    {
      id: '2',
      description: 'Monthly Payroll & Compliance Services – 15 employees × ₹100 per employee per month',
      quantity: 15,
      unit: 'Emp/Mo',
      rate: 100,
      amount: 1500
    }
  ],
  discount: 2000,
  taxRate: 0,
  taxType: 'none',
  advancePaid: 15000,
  paymentTerms:
    'The One-Time Setup Fee is ₹23,000 (net of ₹2,000 discount on standard ₹25,000 fee), payable in two tranches: ₹15,000 advance payable now, and balance ₹8,000 payable upon completion of setup. Monthly payroll of ₹1,500 is billed monthly for 15 employees.',
  notes:
    'GST is presently not applicable under pre-registration threshold. Statutory liabilities (PF/ESIC/PT/TDS) are paid directly by client; our fee covers advisory and operational execution.',
  bankDetails: {
    accountName: 'V Bhavani',
    bankName: 'Indian Bank, Nallambakkam Branch',
    accountNumber: '6029225486',
    ifsc: 'IDIB000N056',
    accountType: 'Savings'
  },
  signatory: 'For PeoplePoint Consultants\nAuthorised Signatory'
};

const B_SEC_QUOTATION_PRESET: BillingDoc = {
  type: 'quotation',
  docNumber: 'QTN/2026-27/001',
  date: '2026-07-23',
  validityDate: '2026-08-22',
  clientName: 'Leadership Team',
  companyName: 'B-Sec Technologies',
  address: 'Chennai, Tamil Nadu, India',
  phone: '+91 98840 00000',
  email: 'info@bsectechnologies.com',
  gstin: '',
  subject: 'Proposal & Commercial Quotation for End-to-End Payroll & Statutory Compliance Services',
  scopeItems: [
    'A. Payroll Processing & Administration: Employee master data, monthly salary computation (fixed/variable/LOP), payslip generation & secure distribution, bank advice transfer statement, attendance/leave handling, new joinee onboarding & F&F settlements.',
    'B. Statutory Compliance Support: Provident Fund (PF) ECR & challan generation, Employees State Insurance (ESIC) filing, Professional Tax (PT) state compliance, TDS Section 192 computation and Form 16 issuance.',
    'C. Reporting & Advisory: Monthly MIS cost analysis, headcount reports, and SPOC compliance advisory.'
  ],
  items: [
    {
      id: '1',
      description:
        'Comprehensive Payroll Consultancy Services (Per Employee Per Month) – including payroll processing, PF ECR, ESIC challan, PT return, TDS Sec 192 computation and employee support.',
      quantity: 15,
      unit: 'Emp/Mo',
      rate: 100,
      amount: 1500
    }
  ],
  discount: 0,
  taxRate: 0,
  taxType: 'none',
  advancePaid: 0,
  paymentTerms:
    'Quote based on 15 employees. Additional employees billed at ₹100/emp/month. Invoices raised at the beginning of each calendar month. Payment due within 10 business days.',
  notes:
    'Valid for 30 days from date of issue. Statutory duties (PF/ESIC/PT) are directly client liabilities. GST currently not applicable. Upon GST registration, GST will be charged at applicable rate.',
  bankDetails: {
    accountName: 'V Bhavani',
    bankName: 'Indian Bank, Nallambakkam Branch',
    accountNumber: '6029225486',
    ifsc: 'IDIB000N056',
    accountType: 'Savings'
  },
  signatory: 'For PeoplePoint Consultants\nAuthorised Signatory'
};

const LAUNCH_360_PRESET: BillingDoc = {
  type: 'quotation',
  docNumber: 'QTN/2026-27/003',
  date: new Date().toISOString().split('T')[0],
  validityDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  clientName: 'Founding Team',
  companyName: 'New Venture Private Limited',
  address: 'Chennai / Bengaluru, India',
  phone: '+91 88073 04713',
  email: 'founder@newventure.com',
  gstin: '',
  subject: 'Business Launch 360° – Integrated Corporate Setup & People Foundation',
  scopeItems: [
    'Corporate Entity Structuring & MCA Incorporation (Pvt Ltd / LLP)',
    'Core Registrations: PAN, TAN, GST, MSME/Udyam, PF, ESIC, Professional Tax',
    'HR Setup: Offer letters, employment contracts, HR policies, leave matrix, NDAs',
    'Cloud Payroll System Setup (Zoho Payroll / Keka) with CTC builder',
    'Bank Account Setup Coordination and First 30 Days SPOC Handholding'
  ],
  items: [
    {
      id: '1',
      description: 'Business Launch 360° Comprehensive Foundation Package (End-to-End Corporate Setup + HR + Compliance)',
      quantity: 1,
      unit: 'Package',
      rate: 35000,
      amount: 35000
    },
    {
      id: '2',
      description: 'First 3 Months Starter Retainer (Statutory Compliance & Review-Controlled Payroll)',
      quantity: 3,
      unit: 'Months',
      rate: 2500,
      amount: 7500
    }
  ],
  discount: 2500,
  taxRate: 0,
  taxType: 'none',
  advancePaid: 20000,
  paymentTerms: '50% advance on execution of service agreement, balance milestone-based on MCA & system handover.',
  notes: 'Government statutory challans & MCA filing portal fees billed at actuals against official receipts.',
  bankDetails: {
    accountName: 'V Bhavani',
    bankName: 'Indian Bank, Nallambakkam Branch',
    accountNumber: '6029225486',
    ifsc: 'IDIB000N056',
    accountType: 'Savings'
  },
  signatory: 'For PeoplePoint Consultants\nAuthorised Signatory'
};

export default function AdminBillingPage() {
  const [doc, setDoc] = useState<BillingDoc>(SHREE_ABHI_INVOICE_PRESET);
  const [crmLeads, setCrmLeads] = useState<LeadRecord[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string>('');

  useEffect(() => {
    setCrmLeads(getStoredLeads());
  }, []);

  // Recalculate totals
  const subtotal = doc.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const netAfterDiscount = Math.max(0, subtotal - (Number(doc.discount) || 0));
  const taxAmount = doc.taxType === 'none' ? 0 : (netAfterDiscount * doc.taxRate) / 100;
  const totalPayable = netAfterDiscount + taxAmount;
  const balanceDue = Math.max(0, totalPayable - (Number(doc.advancePaid) || 0));

  const handleItemChange = (index: number, field: keyof LineItem, val: string | number) => {
    const updated = [...doc.items];
    const target = { ...updated[index], [field]: val };
    if (field === 'quantity' || field === 'rate') {
      const q = field === 'quantity' ? Number(val) : target.quantity;
      const r = field === 'rate' ? Number(val) : target.rate;
      target.amount = (q || 0) * (r || 0);
    }
    updated[index] = target;
    setDoc({ ...doc, items: updated });
  };

  const addItem = () => {
    const newItem: LineItem = {
      id: String(Date.now()),
      description: 'New Professional Service / Advisory Scope',
      quantity: 1,
      unit: 'Service',
      rate: 5000,
      amount: 5000
    };
    setDoc({ ...doc, items: [...doc.items, newItem] });
  };

  const removeItem = (index: number) => {
    if (doc.items.length <= 1) return;
    const updated = doc.items.filter((_, i) => i !== index);
    setDoc({ ...doc, items: updated });
  };

  const handleLeadImport = (leadId: string) => {
    setSelectedLeadId(leadId);
    const lead = crmLeads.find((l) => l.id === leadId);
    if (!lead) return;

    setDoc((prev) => ({
      ...prev,
      clientName: lead.fullName,
      companyName: lead.companyName,
      phone: lead.phone,
      email: lead.email,
      address: lead.city ? `${lead.city}, India` : prev.address,
      subject: `Proposal for ${lead.servicesNeeded.join(', ') || 'Business Solutions'}`,
      items: [
        {
          id: '1',
          description: `${lead.servicesNeeded.join(' & ') || 'Business Consultation & Execution'} – Tailored for ${lead.businessStage || 'Growing Business'}`,
          quantity: 1,
          unit: 'Scope',
          rate: 15000,
          amount: 15000
        }
      ]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const generateWhatsAppMessage = () => {
    const title = doc.type === 'invoice' ? 'Invoice' : 'Commercial Quotation';
    const msg =
      `*People Point Consultants — Official ${title}*\n\n` +
      `*Doc Ref:* ${doc.docNumber}\n` +
      `*Date:* ${doc.date}\n` +
      `*Client:* ${doc.companyName} (${doc.clientName})\n` +
      `*Subject:* ${doc.subject}\n\n` +
      `*Summary of Charges:*\n` +
      `• Subtotal: ₹${subtotal.toLocaleString('en-IN')}\n` +
      (doc.discount > 0 ? `• Discount: -₹${doc.discount.toLocaleString('en-IN')}\n` : '') +
      `• Total Amount: ₹${totalPayable.toLocaleString('en-IN')}\n` +
      (doc.advancePaid > 0
        ? `• Advance Amount: ₹${doc.advancePaid.toLocaleString('en-IN')}\n• Balance Due: ₹${balanceDue.toLocaleString('en-IN')}\n`
        : '') +
      `\n*Bank Transfer Details:*\n` +
      `A/c Name: ${doc.bankDetails.accountName}\n` +
      `Bank: ${doc.bankDetails.bankName}\n` +
      `A/c No: ${doc.bankDetails.accountNumber}\n` +
      `IFSC: ${doc.bankDetails.ifsc}\n\n` +
      `For queries or formal execution, reply directly to our partner desk at +91 88073 04713.`;

    const phoneClean = doc.phone.replace(/[^0-9]/g, '');
    const url = phoneClean
      ? `https://wa.me/${phoneClean.startsWith('91') ? phoneClean : '91' + phoneClean}?text=${encodeURIComponent(msg)}`
      : `https://wa.me/918807304713?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const handleExportJSON = () => {
    const payload = {
      source: 'People Point Web Admin',
      qmsIntegration: 'D:\\Quote Create',
      generatedAt: new Date().toISOString(),
      document: {
        ...doc,
        totals: {
          subtotal,
          discount: doc.discount,
          taxAmount,
          totalPayable,
          advancePaid: doc.advancePaid,
          balanceDue
        }
      }
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.docNumber.replace(/[\/\\]/g, '_')}_${doc.type}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Print stylesheet to isolate printable area */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          .printable-doc {
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
          @page {
            margin: 1.5cm;
            size: A4 portrait;
          }
        }
      `}</style>

      {/* Top Navbar & Admin Navigation */}
      <div className="no-print bg-white border-b border-slate-200 sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/leads"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Back to CRM Leads"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-purple-900 bg-purple-100 px-2 py-0.5 rounded">
                  Admin Billing
                </span>
                <span className="text-xs text-slate-400">|</span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> QMS Synced
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                Quotation & Invoice Automation Studio
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/leads"
              className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all"
            >
              ← CRM Leads
            </Link>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-purple-900 hover:bg-purple-950 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={generateWhatsAppMessage}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Dispatch</span>
            </button>
            <button
              onClick={handleExportJSON}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
              title="Export JSON payload compatible with D:\Quote Create QMS"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">QMS JSON</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Controls & Presets (hidden during print) */}
        <div className="no-print lg:col-span-5 space-y-6">
          {/* Preset Selector */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                <span>1. Load Standard Preset</span>
              </h2>
              <span className="text-[11px] text-slate-400 font-medium">Real business templates</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setDoc(SHREE_ABHI_INVOICE_PRESET)}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  doc.docNumber === SHREE_ABHI_INVOICE_PRESET.docNumber
                    ? 'bg-purple-50 border-purple-800 text-purple-950 font-bold shadow-2xs ring-1 ring-purple-800'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="font-bold">Shree Abhi</div>
                <div className="text-[10px] text-slate-500 mt-0.5">INV/2026-27/007 (Setup + Payroll)</div>
              </button>

              <button
                type="button"
                onClick={() => setDoc(B_SEC_QUOTATION_PRESET)}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  doc.docNumber === B_SEC_QUOTATION_PRESET.docNumber
                    ? 'bg-purple-50 border-purple-800 text-purple-950 font-bold shadow-2xs ring-1 ring-purple-800'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="font-bold">B-Sec Tech</div>
                <div className="text-[10px] text-slate-500 mt-0.5">QTN/2026-27/001 (Payroll Quote)</div>
              </button>

              <button
                type="button"
                onClick={() => setDoc(LAUNCH_360_PRESET)}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  doc.docNumber === LAUNCH_360_PRESET.docNumber
                    ? 'bg-purple-50 border-purple-800 text-purple-950 font-bold shadow-2xs ring-1 ring-purple-800'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="font-bold">Launch 360°</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Setup + Retainer</div>
              </button>
            </div>

            {/* Import CRM Lead */}
            {crmLeads.length > 0 && (
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span>Import Active CRM Lead</span>
                  <span className="text-[10px] text-purple-700 font-semibold">{crmLeads.length} leads in queue</span>
                </label>
                <select
                  value={selectedLeadId}
                  onChange={(e) => handleLeadImport(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-700"
                >
                  <option value="">-- Choose a Captured Lead to Auto-Fill --</option>
                  {crmLeads.map((lead) => (
                    <option key={lead.id} value={lead.id}>
                      {lead.fullName} — {lead.companyName} ({lead.phone})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Document Config Editor */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-500">
              2. Document Header & Client Data
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Document Type</label>
                <select
                  value={doc.type}
                  onChange={(e) =>
                    setDoc({
                      ...doc,
                      type: e.target.value as 'invoice' | 'quotation',
                      docNumber:
                        e.target.value === 'invoice'
                          ? doc.docNumber.replace('QTN', 'INV')
                          : doc.docNumber.replace('INV', 'QTN')
                    })
                  }
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="invoice">Tax Invoice / Bill</option>
                  <option value="quotation">Formal Commercial Quotation</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Document Ref No.</label>
                <input
                  type="text"
                  value={doc.docNumber}
                  onChange={(e) => setDoc({ ...doc, docNumber: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Issue Date</label>
                <input
                  type="date"
                  value={doc.date}
                  onChange={(e) => setDoc({ ...doc, date: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Due / Validity Date</label>
                <input
                  type="date"
                  value={doc.validityDate}
                  onChange={(e) => setDoc({ ...doc, validityDate: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Client Entity / Company Name</label>
                <input
                  type="text"
                  value={doc.companyName}
                  onChange={(e) => setDoc({ ...doc, companyName: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Client Contact Name</label>
                  <input
                    type="text"
                    value={doc.clientName}
                    onChange={(e) => setDoc({ ...doc, clientName: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Client Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={doc.phone}
                    onChange={(e) => setDoc({ ...doc, phone: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Client Email</label>
                  <input
                    type="email"
                    value={doc.email}
                    onChange={(e) => setDoc({ ...doc, email: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Client Location / Address</label>
                  <input
                    type="text"
                    value={doc.address}
                    onChange={(e) => setDoc({ ...doc, address: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Subject / Re:</label>
                <input
                  type="text"
                  value={doc.subject}
                  onChange={(e) => setDoc({ ...doc, subject: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Line Items Editor */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-500">
                3. Commercial Line Items
              </h2>
              <button
                type="button"
                onClick={addItem}
                className="px-2.5 py-1 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3" /> Add Item
              </button>
            </div>

            <div className="space-y-3">
              {doc.items.map((item, idx) => (
                <div key={item.id || idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                      Item #{idx + 1}
                    </span>
                    {doc.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Remove Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                    placeholder="Particulars / Service Description"
                    className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-0.5">Qty / Units</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                        className="w-full text-xs p-1.5 rounded border border-slate-200 bg-white text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-0.5">Rate (₹)</label>
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) => handleItemChange(idx, 'rate', e.target.value)}
                        className="w-full text-xs p-1.5 rounded border border-slate-200 bg-white text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-0.5">Amount (₹)</label>
                      <div className="text-xs font-bold text-slate-900 p-1.5 bg-slate-100 rounded text-center">
                        ₹{(item.amount || 0).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Adjustments: Discount, GST, Advance */}
            <div className="pt-3 border-t border-slate-200 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Discount (₹)</label>
                  <input
                    type="number"
                    value={doc.discount}
                    onChange={(e) => setDoc({ ...doc, discount: Number(e.target.value) || 0 })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">GST Application</label>
                  <select
                    value={doc.taxType}
                    onChange={(e) => {
                      const t = e.target.value as 'none' | 'cgst_sgst' | 'igst';
                      setDoc({ ...doc, taxType: t, taxRate: t === 'none' ? 0 : 18 });
                    }}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="none">Exempt / Pre-Registration (0%)</option>
                    <option value="cgst_sgst">CGST 9% + SGST 9% (18%)</option>
                    <option value="igst">IGST (18%)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Advance Amount Payable Now (₹)</label>
                <input
                  type="number"
                  value={doc.advancePaid}
                  onChange={(e) => setDoc({ ...doc, advancePaid: Number(e.target.value) || 0 })}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Payment Terms & Schedule</label>
                <textarea
                  rows={2}
                  value={doc.paymentTerms}
                  onChange={(e) => setDoc({ ...doc, paymentTerms: e.target.value })}
                  className="w-full text-xs p-2 rounded-xl border border-slate-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Authentic A4 Preview / Printable Area */}
        <div className="lg:col-span-7">
          <div className="sticky top-20">
            {/* Desktop QMS Status Banner */}
            <div className="no-print mb-4 p-3 rounded-xl bg-purple-900 text-white text-xs flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-pink" />
                <span>
                  <strong>QMS Desktop Sync:</strong> Output is calibrated for direct parity with{' '}
                  <code>D:\Quote Create</code> QMS.
                </span>
              </div>
              <button
                onClick={handlePrint}
                className="underline hover:text-brand-pink font-semibold shrink-0 ml-2"
              >
                Print Preview
              </button>
            </div>

            {/* A4 PAPER CONTAINER */}
            <div
              id="printable-document"
              className="printable-doc bg-white rounded-2xl border border-slate-200 shadow-xl p-8 sm:p-12 text-slate-900 min-h-[900px] flex flex-col justify-between"
            >
              {/* DOCUMENT CONTENT */}
              <div className="space-y-6">
                {/* Header with Logo and Company Info */}
                <div className="flex flex-row justify-between items-start border-b-2 border-purple-900 pb-6 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-9 h-9 rounded-xl bg-purple-950 text-white flex items-center justify-center font-black text-lg">
                        P
                      </div>
                      <div>
                        <h2 className="text-xl font-black tracking-tight text-slate-900">
                          PeoplePoint Consultants
                        </h2>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-purple-800">
                          Turn Ideas Into Running Businesses
                        </p>
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-600 space-y-0.5 mt-2">
                      <p>Corporate Setup • HR • Payroll • Tech • Compliance</p>
                      <p>Chennai, Tamil Nadu, India</p>
                      <p>
                        Phone: +91 88073 04713 • Email: peoplepointconsultant@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-lg bg-purple-900 text-white text-xs font-black uppercase tracking-wider mb-2">
                      {doc.type === 'invoice' ? 'TAX INVOICE' : 'COMMERCIAL QUOTATION'}
                    </span>
                    <div className="text-xs space-y-1">
                      <p>
                        <strong className="text-slate-700">Ref No:</strong>{' '}
                        <span className="font-mono font-bold text-slate-900">{doc.docNumber}</span>
                      </p>
                      <p>
                        <strong className="text-slate-700">Date:</strong> {doc.date}
                      </p>
                      <p>
                        <strong className="text-slate-700">
                          {doc.type === 'invoice' ? 'Due Date:' : 'Valid Until:'}
                        </strong>{' '}
                        {doc.validityDate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Client / Bill To Block */}
                <div className="grid grid-cols-2 gap-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      {doc.type === 'invoice' ? 'Bill To:' : 'Quotation Prepared For:'}
                    </span>
                    <h3 className="font-black text-sm text-slate-900">{doc.companyName}</h3>
                    <p className="text-slate-700 font-semibold">{doc.clientName}</p>
                    <p className="text-slate-600">{doc.address}</p>
                    {doc.phone && <p className="text-slate-600">Phone: {doc.phone}</p>}
                    {doc.email && <p className="text-slate-600">Email: {doc.email}</p>}
                    {doc.gstin && <p className="text-slate-600">GSTIN: {doc.gstin}</p>}
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Subject / Engagement:
                    </span>
                    <p className="font-bold text-slate-900 text-xs leading-snug">{doc.subject}</p>
                    <p className="text-[11px] text-slate-500 mt-2">
                      Issued under People Point Professional Services framework. Direct partner-assigned execution.
                    </p>
                  </div>
                </div>

                {/* Scope Breakdown (Especially prominent for quotations) */}
                {doc.scopeItems && doc.scopeItems.length > 0 && (
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-black uppercase tracking-wider text-purple-900">
                      Scope of Services & Deliverables:
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-700 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                      {doc.scopeItems.map((scope, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span className="leading-snug">{scope}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Line Items Table */}
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-purple-950 text-white font-bold text-[11px]">
                        <th className="py-2.5 px-3 w-12 text-center">#</th>
                        <th className="py-2.5 px-3">Service Particulars</th>
                        <th className="py-2.5 px-3 w-16 text-center">Qty</th>
                        <th className="py-2.5 px-3 w-20 text-center">Unit</th>
                        <th className="py-2.5 px-3 w-24 text-right">Rate (₹)</th>
                        <th className="py-2.5 px-3 w-28 text-right">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {doc.items.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-3 text-center text-slate-400 font-bold">{idx + 1}</td>
                          <td className="py-2.5 px-3 text-slate-800 font-medium leading-snug">
                            {item.description}
                          </td>
                          <td className="py-2.5 px-3 text-center text-slate-600">{item.quantity}</td>
                          <td className="py-2.5 px-3 text-center text-slate-500 text-[11px]">{item.unit}</td>
                          <td className="py-2.5 px-3 text-right text-slate-700 font-mono">
                            ₹{Number(item.rate).toLocaleString('en-IN')}
                          </td>
                          <td className="py-2.5 px-3 text-right text-slate-900 font-bold font-mono">
                            ₹{Number(item.amount).toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Calculation Summary Block */}
                <div className="flex justify-end pt-2">
                  <div className="w-72 space-y-1.5 text-xs text-slate-700">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span>Subtotal:</span>
                      <span className="font-mono font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>

                    {doc.discount > 0 && (
                      <div className="flex justify-between py-1 text-emerald-700 border-b border-slate-100">
                        <span>Discount:</span>
                        <span className="font-mono font-semibold">–₹{doc.discount.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span>Net Taxable Value:</span>
                      <span className="font-mono font-semibold">₹{netAfterDiscount.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between py-1 text-[11px] text-slate-500 border-b border-slate-100">
                      <span>
                        GST ({doc.taxType === 'none' ? 'Not Applicable / Pre-Reg' : `${doc.taxRate}%`}):
                      </span>
                      <span className="font-mono">
                        {doc.taxType === 'none' ? '–' : `₹${taxAmount.toLocaleString('en-IN')}`}
                      </span>
                    </div>

                    <div className="flex justify-between py-2 text-sm font-black text-slate-900 border-b-2 border-purple-900">
                      <span>Total Amount:</span>
                      <span className="font-mono text-purple-900">₹{totalPayable.toLocaleString('en-IN')}</span>
                    </div>

                    {doc.advancePaid > 0 && (
                      <>
                        <div className="flex justify-between py-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2 rounded">
                          <span>Advance Payable Now:</span>
                          <span className="font-mono">₹{doc.advancePaid.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between py-1 text-xs font-bold text-slate-800 bg-slate-100 px-2 rounded">
                          <span>Balance on Completion:</span>
                          <span className="font-mono">₹{balanceDue.toLocaleString('en-IN')}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Terms and Bank Account Details (Authentic People Point Account) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 text-xs">
                  <div className="space-y-2">
                    <h5 className="font-bold text-slate-900 text-[11px] uppercase tracking-wider">
                      Payment Terms & Scope Notes
                    </h5>
                    <p className="text-[11px] text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      {doc.paymentTerms}
                    </p>
                    <p className="text-[10px] text-slate-400 italic">
                      {doc.notes}
                    </p>
                  </div>

                  <div className="space-y-1.5 p-3 rounded-xl bg-purple-50/70 border border-purple-100 text-purple-950">
                    <h5 className="font-black text-[11px] uppercase tracking-wider text-purple-900 flex items-center gap-1">
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Bank Transfer Details</span>
                    </h5>
                    <div className="text-[11px] space-y-0.5 leading-snug">
                      <p>
                        <strong className="text-purple-900">Account Name:</strong> {doc.bankDetails.accountName}
                      </p>
                      <p>
                        <strong className="text-purple-900">Bank:</strong> {doc.bankDetails.bankName}
                      </p>
                      <p>
                        <strong className="text-purple-900">Account No:</strong>{' '}
                        <span className="font-mono font-bold">{doc.bankDetails.accountNumber}</span>
                      </p>
                      <p>
                        <strong className="text-purple-900">IFSC Code:</strong>{' '}
                        <span className="font-mono font-bold">{doc.bankDetails.ifsc}</span>
                      </p>
                      <p>
                        <strong className="text-purple-900">Account Type:</strong> {doc.bankDetails.accountType}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Signatory Footer */}
              <div className="pt-8 mt-8 border-t border-slate-200 flex justify-between items-end text-xs">
                <div className="text-[10px] text-slate-400 max-w-xs">
                  This document is formally generated by People Point Consultants Administrative Billing System.
                </div>
                <div className="text-right space-y-8">
                  <span className="font-bold text-slate-800 text-[11px] block">For PeoplePoint Consultants</span>
                  <div className="pt-4 border-t border-slate-400 font-semibold text-slate-900 text-xs">
                    Authorised Signatory
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
