'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
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
  Percent,
  Clock,
  RefreshCw,
  ChevronRight,
  Edit3,
  Eye,
  Send,
  AlertTriangle,
  Filter,
  Search,
  Check,
  X,
  ShieldAlert,
  Award,
  FileSpreadsheet,
  ArrowRight,
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Briefcase,
  Settings as SettingsIcon,
  BookOpen,
  Receipt
} from 'lucide-react';
import {
  ClientRecord,
  LineItem,
  ScopeSection,
  QuotationRecord,
  InvoiceRecord,
  PaymentRecord,
  RateCardItem,
  OrgSettings,
  AuditLogEntry,
  getStoredClients,
  saveClients,
  getStoredQuotations,
  saveQuotations,
  getStoredInvoices,
  saveInvoices,
  getStoredPayments,
  savePayments,
  getStoredSettings,
  saveSettings,
  getStoredAuditLogs,
  logAuditEvent,
  PAYROLL_SCOPE_TEMPLATES,
  SEED_RATE_CARDS,
  SEED_CLIENTS
} from '@/lib/billingStorage';
import { getStoredLeads, LeadRecord } from '@/lib/leadStorage';

type ActiveTab =
  | 'quotations'
  | 'invoices'
  | 'clients'
  | 'payments'
  | 'receipts'
  | 'rate_cards'
  | 'templates'
  | 'reports'
  | 'settings'
  | 'audit';

type UserRole = 'Sales / SPOC' | 'Manager' | 'Accounts' | 'Admin' | 'Management';

export default function AdminBillingPage() {
  // Navigation & Role State
  const [activeTab, setActiveTab] = useState<ActiveTab>('quotations');
  const [currentRole, setCurrentRole] = useState<UserRole>('Admin');
  const [currentUser, setCurrentUser] = useState<string>('Bhavani (Founder)');

  // Master Data State
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [quotations, setQuotations] = useState<QuotationRecord[]>([]);
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [settings, setSettings] = useState<OrgSettings>(getStoredSettings());
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [crmLeads, setCrmLeads] = useState<LeadRecord[]>([]);

  // Selected Documents for Viewing / Editing / Printing
  const [selectedQuote, setSelectedQuote] = useState<QuotationRecord | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRecord | null>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentRecord | null>(null);
  const [quoteEditorMode, setQuoteEditorMode] = useState<'create' | 'edit' | 'preview'>('preview');
  const [invoiceEditorMode, setInvoiceEditorMode] = useState<'create' | 'edit' | 'preview'>('preview');

  // Interactive Quote & Invoice Creator Modal States
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteFormData, setQuoteFormData] = useState<QuotationRecord | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceFormData, setInvoiceFormData] = useState<InvoiceRecord | null>(null);

  // New Client Modal
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [newClientForm, setNewClientForm] = useState<Partial<ClientRecord>>({
    legalName: '',
    tradingName: '',
    contactPerson: '',
    phone: '',
    email: '',
    billingAddress: '',
    state: 'Tamil Nadu',
    placeOfSupply: 'Tamil Nadu (33)',
    country: 'India',
    gstin: '',
    pan: '',
    defaultPaymentTerms: 'Net 10 Business Days',
    internalOwner: 'Bhavani (Founder)'
  });

  // Record Payment Modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    invoiceId: '',
    amount: 0,
    tdsDeducted: 0,
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMode: 'NEFT / RTGS' as PaymentRecord['paymentMode'],
    utrReference: '',
    notes: ''
  });

  // Recurring Invoice Generator Modal
  const [showRecurringModal, setShowRecurringModal] = useState(false);
  const [recurringMonth, setRecurringMonth] = useState('October 2026');
  const [recurringHeadcountMap, setRecurringHeadcountMap] = useState<Record<string, number>>({});

  // Notification Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Load initial stored records
  useEffect(() => {
    setClients(getStoredClients());
    setQuotations(getStoredQuotations());
    setInvoices(getStoredInvoices());
    setPayments(getStoredPayments());
    setSettings(getStoredSettings());
    setAuditLogs(getStoredAuditLogs());
    setCrmLeads(getStoredLeads());

    const initialQuotes = getStoredQuotations();
    if (initialQuotes.length > 0) {
      setSelectedQuote(initialQuotes[0]);
    }
    const initialInvoices = getStoredInvoices();
    if (initialInvoices.length > 0) {
      setSelectedInvoice(initialInvoices[0]);
    }

    // Check URL parameters for tab and action (e.g. ?tab=quotations&action=new-quote)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      const actionParam = params.get('action');

      if (tabParam && ['quotations', 'invoices', 'clients', 'payments', 'receipts', 'rate_cards', 'templates', 'reports', 'settings', 'audit'].includes(tabParam)) {
        setActiveTab(tabParam as ActiveTab);
      }

      if (actionParam === 'new-quote') {
        setActiveTab('quotations');
        setTimeout(() => {
          handleOpenNewQuoteModal();
        }, 150);
      } else if (actionParam === 'new-invoice') {
        setActiveTab('invoices');
        setTimeout(() => {
          handleOpenNewInvoiceModal();
        }, 150);
      }
    }
  }, []);

  // Update headcount map when invoices load
  useEffect(() => {
    const map: Record<string, number> = {};
    invoices.forEach((inv) => {
      if (inv.isRecurring && inv.recurringHeadcount) {
        map[inv.id] = inv.recurringHeadcount;
      }
    });
    setRecurringHeadcountMap(map);
  }, [invoices]);

  // -------------------------------------------------------------
  // Calculations Helper for Active Quote Editor
  // -------------------------------------------------------------
  const quoteSubtotal = useMemo(() => {
    if (!selectedQuote) return 0;
    return selectedQuote.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  }, [selectedQuote]);

  const quoteNetAfterDiscount = useMemo(() => {
    if (!selectedQuote) return 0;
    return Math.max(0, quoteSubtotal - (Number(selectedQuote.discount) || 0));
  }, [selectedQuote, quoteSubtotal]);

  const quoteTaxAmount = useMemo(() => {
    if (!selectedQuote || selectedQuote.taxType === 'none') return 0;
    return (quoteNetAfterDiscount * (selectedQuote.taxRate || 0)) / 100;
  }, [selectedQuote, quoteNetAfterDiscount]);

  const quoteTotalAmount = useMemo(() => {
    return quoteNetAfterDiscount + quoteTaxAmount;
  }, [quoteNetAfterDiscount, quoteTaxAmount]);

  // -------------------------------------------------------------
  // Quotation Management Actions
  // -------------------------------------------------------------
  const handleOpenNewQuoteModal = () => {
    const nextSeq = (settings.qtnSequence || 5) + 1;
    const newDocNum = `QTN/2026-27/${String(nextSeq).padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];
    const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const defaultClient = clients[0] || SEED_CLIENTS[0];

    const draftQuote: QuotationRecord = {
      id: 'QTN-' + Date.now().toString(36),
      quoteNumber: newDocNum,
      revision: 0,
      revisionCode: newDocNum,
      date: today,
      validityDays: 30,
      validUntil,
      clientId: defaultClient.id,
      clientName: defaultClient.contactPerson,
      companyName: defaultClient.legalName,
      address: defaultClient.billingAddress,
      phone: defaultClient.phone,
      email: defaultClient.email,
      gstin: defaultClient.gstin || '',
      placeOfSupply: defaultClient.placeOfSupply,
      serviceCategory: 'Payroll',
      quoteType: 'Per Employee',
      currency: 'INR',
      subject: 'Proposal & Commercial Quotation for End-to-End Payroll & Compliance Services',
      scopeSections: [
        {
          title: 'A. One-Time Payroll Setup & Review',
          items: [...PAYROLL_SCOPE_TEMPLATES.setupAndReview]
        },
        {
          title: 'B. Monthly Payroll & Statutory Compliance',
          items: [...PAYROLL_SCOPE_TEMPLATES.monthlyPayroll]
        }
      ],
      exclusions: [...PAYROLL_SCOPE_TEMPLATES.exclusions],
      clientResponsibilities: [...PAYROLL_SCOPE_TEMPLATES.clientResponsibilities],
      items: [
        {
          id: '1',
          description:
            'Comprehensive Monthly Payroll Consultancy Services (15 employees × ₹100 per employee per month)',
          quantity: 15,
          unit: 'Emp/Mo',
          rate: 100,
          billingFrequency: 'Monthly',
          discount: 0,
          amount: 1500
        }
      ],
      subtotal: 1500,
      discount: 0,
      netAfterDiscount: 1500,
      taxRate: settings.gstRegistered ? 18 : 0,
      taxType: settings.gstRegistered ? 'cgst_sgst' : 'none',
      taxAmount: 0,
      totalAmount: 1500,
      annualIllustration: 18000,
      advanceRequired: 0,
      balanceDue: 1500,
      paymentTerms: 'Monthly invoices billed at beginning of each calendar month. Payment due within 10 business days.',
      notes: settings.nonTaxMessage,
      status: 'Draft',
      preparedBy: currentUser,
      internalApprover: 'Management Sign-off',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setQuoteFormData(draftQuote);
    setShowQuoteModal(true);
  };

  const handleOpenEditQuoteModal = (quote: QuotationRecord) => {
    setQuoteFormData({
      ...quote,
      items: quote.items.map((it) => ({ ...it })),
      scopeSections: quote.scopeSections.map((s) => ({ ...s, items: [...s.items] }))
    });
    setShowQuoteModal(true);
  };

  const handleSaveQuoteModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteFormData) return;

    // Recalculate line item amounts and totals
    const sub = quoteFormData.items.reduce((acc, it) => acc + (Number(it.amount) || (it.quantity * it.rate)), 0);
    const disc = Number(quoteFormData.discount) || 0;
    const net = Math.max(0, sub - disc);
    const tax = quoteFormData.taxRate > 0 ? (net * quoteFormData.taxRate) / 100 : 0;
    const tot = net + tax;

    const isPerEmp = quoteFormData.quoteType === 'Per Employee' || quoteFormData.quoteType === 'Monthly';
    const annual = isPerEmp ? tot * 12 : undefined;

    const finalQuote: QuotationRecord = {
      ...quoteFormData,
      subtotal: sub,
      discount: disc,
      netAfterDiscount: net,
      taxAmount: tax,
      totalAmount: tot,
      balanceDue: tot - (Number(quoteFormData.advanceRequired) || 0),
      annualIllustration: annual,
      updatedAt: new Date().toISOString()
    };

    const exists = quotations.some((q) => q.id === finalQuote.id);
    let updatedQuotes: QuotationRecord[];

    if (exists) {
      updatedQuotes = quotations.map((q) => (q.id === finalQuote.id ? finalQuote : q));
      logAuditEvent(currentUser, currentRole, 'UPDATE_QUOTATION', 'Quotation', finalQuote.revisionCode, `Updated quotation details.`);
      showToast(`Quotation ${finalQuote.revisionCode} updated successfully.`);
    } else {
      updatedQuotes = [finalQuote, ...quotations];
      const nextSeq = (settings.qtnSequence || 5) + 1;
      const updatedSettings = { ...settings, qtnSequence: nextSeq };
      setSettings(updatedSettings);
      saveSettings(updatedSettings);
      logAuditEvent(currentUser, currentRole, 'CREATE_QUOTATION', 'Quotation', finalQuote.revisionCode, `Created quotation ${finalQuote.revisionCode}.`);
      showToast(`Quotation ${finalQuote.revisionCode} created successfully.`);
    }

    setQuotations(updatedQuotes);
    saveQuotations(updatedQuotes);
    setSelectedQuote(finalQuote);
    setActiveTab('quotations');
    setShowQuoteModal(false);
  };

  const handleCreateNewQuote = () => {
    handleOpenNewQuoteModal();
  };

  const handleCreateRevision = (quote: QuotationRecord) => {
    const nextRev = (quote.revision || 0) + 1;
    const revCode = `${quote.quoteNumber}-R${nextRev}`;

    const revisedQuote: QuotationRecord = {
      ...quote,
      id: 'QTN-' + Date.now().toString(36),
      revision: nextRev,
      revisionCode: revCode,
      status: 'Internal Review',
      preparedBy: currentUser,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = [revisedQuote, ...quotations];
    setQuotations(updated);
    saveQuotations(updated);
    setSelectedQuote(revisedQuote);
    setQuoteEditorMode('edit');

    logAuditEvent(
      currentUser,
      currentRole,
      'CREATE_REVISION',
      'Quotation',
      revCode,
      `Created revision ${revCode} from ${quote.revisionCode}. Original version preserved.`
    );
    showToast(`Revision ${revCode} created. Original version protected.`);
  };

  const handleDuplicateQuote = (quote: QuotationRecord) => {
    const nextSeq = (settings.qtnSequence || 5) + 1;
    const newDocNum = `QTN/2026-27/${String(nextSeq).padStart(3, '0')}`;

    const duplicated: QuotationRecord = {
      ...quote,
      id: 'QTN-' + Date.now().toString(36),
      quoteNumber: newDocNum,
      revision: 0,
      revisionCode: newDocNum,
      status: 'Draft',
      preparedBy: currentUser,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updated = [duplicated, ...quotations];
    setQuotations(updated);
    saveQuotations(updated);
    setSelectedQuote(duplicated);

    const updatedSettings = { ...settings, qtnSequence: nextSeq };
    setSettings(updatedSettings);
    saveSettings(updatedSettings);

    logAuditEvent(currentUser, currentRole, 'DUPLICATE_QUOTATION', 'Quotation', newDocNum, `Cloned from ${quote.revisionCode}.`);
    showToast(`Duplicated into new quotation ${newDocNum}.`);
  };

  const handleStatusChangeQuote = (quoteId: string, newStatus: QuotationRecord['status']) => {
    const updated = quotations.map((q) => {
      if (q.id === quoteId) {
        const item: QuotationRecord = {
          ...q,
          status: newStatus,
          updatedAt: new Date().toISOString(),
          acceptedAt: newStatus === 'Accepted' ? new Date().toISOString() : q.acceptedAt
        };
        return item;
      }
      return q;
    });
    setQuotations(updated);
    saveQuotations(updated);

    const target = updated.find((q) => q.id === quoteId);
    if (target && selectedQuote?.id === quoteId) {
      setSelectedQuote(target);
    }

    logAuditEvent(currentUser, currentRole, 'UPDATE_STATUS', 'Quotation', target?.revisionCode || quoteId, `Status changed to ${newStatus}.`);
    showToast(`Quotation status updated to ${newStatus}.`);
  };

  // -------------------------------------------------------------
  // Quote-to-Invoice Conversion (Section 10)
  // -------------------------------------------------------------
  const handleConvertToInvoice = (quote: QuotationRecord) => {
    const nextSeq = (settings.invSequence || 8) + 1;
    const newInvNum = `INV/2026-27/${String(nextSeq).padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];
    const dueDate = new Date(Date.now() + (settings.defaultPaymentDueDays || 10) * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    const newInvoice: InvoiceRecord = {
      id: 'INV-' + Date.now().toString(36),
      invoiceNumber: newInvNum,
      date: today,
      dueDate,
      quotationRef: quote.revisionCode,
      invoiceType: quote.quoteType === 'Per Employee' ? 'Per-Employee Recurring' : 'Advance',
      billingPeriod: new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }),
      clientId: quote.clientId,
      clientName: quote.clientName,
      companyName: quote.companyName,
      address: quote.address,
      phone: quote.phone,
      email: quote.email,
      gstin: quote.gstin || '',
      placeOfSupply: quote.placeOfSupply,
      subject: quote.subject,
      scopeItems: quote.scopeSections.flatMap((s) => s.items).slice(0, 8),
      items: quote.items.map((it) => ({
        id: it.id,
        description: it.description,
        quantity: it.quantity,
        unit: it.unit,
        rate: it.rate,
        billingFrequency: it.billingFrequency,
        amount: it.amount
      })),
      subtotal: quote.subtotal,
      discount: quote.discount,
      netAfterDiscount: quote.netAfterDiscount,
      taxRate: quote.taxRate,
      taxType: quote.taxType,
      taxAmount: quote.taxAmount,
      totalPayable: quote.totalAmount,
      advancePaid: quote.advanceRequired || 0,
      tdsDeducted: 0,
      balanceDue: quote.balanceDue || quote.totalAmount,
      paymentTerms: quote.paymentTerms,
      notes: quote.notes,
      status: 'Issued',
      isRecurring: quote.quoteType === 'Per Employee' || quote.quoteType === 'Monthly',
      recurringHeadcount: quote.items.find((i) => i.unit.includes('Emp'))?.quantity || 15,
      recurringPerEmpRate: quote.items.find((i) => i.unit.includes('Emp'))?.rate || 100,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Update invoice list
    const updatedInvoices = [newInvoice, ...invoices];
    setInvoices(updatedInvoices);
    saveInvoices(updatedInvoices);

    // Update quote status to Converted
    const updatedQuotes = quotations.map((q) =>
      q.id === quote.id
        ? {
            ...q,
            status: 'Converted to Invoice' as const,
            convertedToInvoiceId: newInvNum,
            updatedAt: new Date().toISOString()
          }
        : q
    );
    setQuotations(updatedQuotes);
    saveQuotations(updatedQuotes);

    // Update settings sequence
    const updatedSettings = { ...settings, invSequence: nextSeq };
    setSettings(updatedSettings);
    saveSettings(updatedSettings);

    setSelectedInvoice(newInvoice);
    setActiveTab('invoices');

    logAuditEvent(
      currentUser,
      currentRole,
      'CONVERT_TO_INVOICE',
      'Invoice',
      newInvNum,
      `Converted accepted quote ${quote.revisionCode} into invoice ${newInvNum}.`
    );
    showToast(`Quote ${quote.revisionCode} converted to Invoice ${newInvNum}!`);
  };

  // -------------------------------------------------------------
  // Recurring Invoice Automation (Section 12)
  // -------------------------------------------------------------
  const handleGenerateRecurringInvoices = () => {
    const recurringParents = invoices.filter((inv) => inv.isRecurring);
    if (recurringParents.length === 0) {
      showToast('No active recurring retainer clients found.');
      return;
    }

    let nextSeq = settings.invSequence || 8;
    const newDrafts: InvoiceRecord[] = [];
    const today = new Date().toISOString().split('T')[0];
    const dueDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    recurringParents.forEach((parent) => {
      nextSeq += 1;
      const invNum = `INV/2026-27/${String(nextSeq).padStart(3, '0')}`;
      const confirmedHeadcount = recurringHeadcountMap[parent.id] || parent.recurringHeadcount || 15;
      const rate = parent.recurringPerEmpRate || 100;
      const computedAmount = confirmedHeadcount * rate;

      const draft: InvoiceRecord = {
        id: 'INV-' + Date.now().toString(36) + '-' + nextSeq,
        invoiceNumber: invNum,
        date: today,
        dueDate,
        quotationRef: parent.quotationRef,
        invoiceType: 'Per-Employee Recurring',
        billingPeriod: recurringMonth,
        clientId: parent.clientId,
        clientName: parent.clientName,
        companyName: parent.companyName,
        address: parent.address,
        phone: parent.phone,
        email: parent.email,
        gstin: parent.gstin,
        placeOfSupply: parent.placeOfSupply,
        subject: `Monthly Payroll & Compliance Retainer – ${recurringMonth}`,
        scopeItems: parent.scopeItems,
        items: [
          {
            id: '1',
            description: `Comprehensive Monthly Payroll Services (${confirmedHeadcount} employees × ₹${rate} per employee per month)`,
            quantity: confirmedHeadcount,
            unit: 'Emp/Mo',
            rate,
            billingFrequency: 'Monthly',
            amount: computedAmount
          }
        ],
        subtotal: computedAmount,
        discount: 0,
        netAfterDiscount: computedAmount,
        taxRate: parent.taxRate,
        taxType: parent.taxType,
        taxAmount: (computedAmount * parent.taxRate) / 100,
        totalPayable: computedAmount + (computedAmount * parent.taxRate) / 100,
        advancePaid: 0,
        tdsDeducted: 0,
        balanceDue: computedAmount + (computedAmount * parent.taxRate) / 100,
        paymentTerms: parent.paymentTerms,
        notes: parent.notes,
        status: 'Draft',
        isRecurring: true,
        recurringHeadcount: confirmedHeadcount,
        recurringPerEmpRate: rate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      newDrafts.push(draft);
    });

    const updatedInvoices = [...newDrafts, ...invoices];
    setInvoices(updatedInvoices);
    saveInvoices(updatedInvoices);

    const updatedSettings = { ...settings, invSequence: nextSeq };
    setSettings(updatedSettings);
    saveSettings(updatedSettings);

    setShowRecurringModal(false);
    logAuditEvent(
      currentUser,
      currentRole,
      'RECURRING_BATCH_DRAFT',
      'Invoice',
      `${newDrafts.length} Invoices`,
      `Generated ${newDrafts.length} recurring draft invoices for ${recurringMonth} with confirmed headcounts.`
    );
    showToast(`Generated ${newDrafts.length} recurring payroll drafts for ${recurringMonth}.`);
  };

  // -------------------------------------------------------------
  // Invoice Management & Creator Actions (Sections 10 & 11)
  // -------------------------------------------------------------
  const handleOpenNewInvoiceModal = (presetClient?: ClientRecord) => {
    const nextSeq = (settings.invSequence || 8) + 1;
    const newDocNum = `INV/2026-27/${String(nextSeq).padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];
    const dueDate = new Date(Date.now() + (settings.defaultPaymentDueDays || 10) * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    const defaultClient = presetClient || clients[0] || SEED_CLIENTS[0];

    const draftInvoice: InvoiceRecord = {
      id: 'INV-' + Date.now().toString(36),
      invoiceNumber: newDocNum,
      date: today,
      dueDate,
      quotationRef: '',
      invoiceType: 'Monthly Retainer',
      billingPeriod: new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }),
      clientId: defaultClient.id,
      clientName: defaultClient.contactPerson,
      companyName: defaultClient.legalName,
      address: defaultClient.billingAddress,
      phone: defaultClient.phone,
      email: defaultClient.email,
      gstin: defaultClient.gstin || '',
      placeOfSupply: defaultClient.placeOfSupply,
      subject: 'Tax Invoice for Monthly Retainer & Operational Consulting',
      scopeItems: ['Monthly Payroll Computation', 'PF & ESI Filing', 'Statutory MIS Reporting'],
      items: [
        {
          id: '1',
          description: 'Comprehensive Monthly Retainer Services (15 employees × ₹100/emp/mo)',
          quantity: 15,
          unit: 'Emp/Mo',
          rate: 100,
          billingFrequency: 'Monthly',
          amount: 1500
        }
      ],
      subtotal: 1500,
      discount: 0,
      netAfterDiscount: 1500,
      taxRate: settings.gstRegistered ? 18 : 0,
      taxType: settings.gstRegistered ? 'cgst_sgst' : 'none',
      taxAmount: 0,
      totalPayable: 1500,
      advancePaid: 0,
      tdsDeducted: 0,
      balanceDue: 1500,
      paymentTerms: 'Payment due within 10 business days from date of invoice.',
      notes: settings.nonTaxMessage,
      status: 'Issued',
      isRecurring: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setInvoiceFormData(draftInvoice);
    setShowInvoiceModal(true);
  };

  const handleOpenEditInvoiceModal = (inv: InvoiceRecord) => {
    setInvoiceFormData({
      ...inv,
      items: inv.items.map((it) => ({ ...it })),
      scopeItems: inv.scopeItems ? [...inv.scopeItems] : []
    });
    setShowInvoiceModal(true);
  };

  const handleSaveInvoiceModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceFormData) return;

    const sub = invoiceFormData.items.reduce((acc, it) => acc + (Number(it.amount) || (it.quantity * it.rate)), 0);
    const disc = Number(invoiceFormData.discount) || 0;
    const net = Math.max(0, sub - disc);
    const tax = invoiceFormData.taxRate > 0 ? (net * invoiceFormData.taxRate) / 100 : 0;
    const tot = net + tax;
    const adv = Number(invoiceFormData.advancePaid) || 0;
    const tds = Number(invoiceFormData.tdsDeducted) || 0;
    const bal = Math.max(0, tot - adv - tds);

    let status = invoiceFormData.status;
    if (bal === 0 && tot > 0) {
      status = 'Paid';
    } else if (adv > 0 && bal > 0) {
      status = 'Partially Paid';
    }

    const finalInvoice: InvoiceRecord = {
      ...invoiceFormData,
      subtotal: sub,
      discount: disc,
      netAfterDiscount: net,
      taxAmount: tax,
      totalPayable: tot,
      balanceDue: bal,
      status,
      updatedAt: new Date().toISOString()
    };

    const exists = invoices.some((i) => i.id === finalInvoice.id);
    let updatedInvoices: InvoiceRecord[];

    if (exists) {
      updatedInvoices = invoices.map((i) => (i.id === finalInvoice.id ? finalInvoice : i));
      logAuditEvent(currentUser, currentRole, 'UPDATE_INVOICE', 'Invoice', finalInvoice.invoiceNumber, `Updated invoice details.`);
      showToast(`Invoice ${finalInvoice.invoiceNumber} updated successfully.`);
    } else {
      updatedInvoices = [finalInvoice, ...invoices];
      const nextSeq = (settings.invSequence || 8) + 1;
      const updatedSettings = { ...settings, invSequence: nextSeq };
      setSettings(updatedSettings);
      saveSettings(updatedSettings);
      logAuditEvent(currentUser, currentRole, 'CREATE_INVOICE', 'Invoice', finalInvoice.invoiceNumber, `Created invoice ${finalInvoice.invoiceNumber}.`);
      showToast(`Invoice ${finalInvoice.invoiceNumber} created successfully.`);
    }

    setInvoices(updatedInvoices);
    saveInvoices(updatedInvoices);
    setSelectedInvoice(finalInvoice);
    setActiveTab('invoices');
    setShowInvoiceModal(false);
  };

  // -------------------------------------------------------------
  // Record Payment & Receipt Generation (Section 14)
  // -------------------------------------------------------------
  const handleRecordPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inv = invoices.find((i) => i.id === paymentForm.invoiceId);
    if (!inv) return;

    const nextRecSeq = (settings.recSequence || 3) + 1;
    const recNum = `REC/2026-27/${String(nextRecSeq).padStart(3, '0')}`;

    const newPayment: PaymentRecord = {
      id: 'PAY-' + Date.now().toString(36),
      receiptNumber: recNum,
      invoiceId: inv.id,
      invoiceNumber: inv.invoiceNumber,
      clientId: inv.clientId,
      clientName: inv.clientName,
      companyName: inv.companyName,
      amount: Number(paymentForm.amount),
      tdsDeducted: Number(paymentForm.tdsDeducted || 0),
      paymentDate: paymentForm.paymentDate,
      paymentMode: paymentForm.paymentMode,
      utrReference: paymentForm.utrReference,
      notes: paymentForm.notes,
      createdAt: new Date().toISOString()
    };

    const updatedPayments = [newPayment, ...payments];
    setPayments(updatedPayments);
    savePayments(updatedPayments);

    // Update invoice paid & balance amounts
    const totalPaidNow = (inv.advancePaid || 0) + Number(paymentForm.amount);
    const newBalance = Math.max(0, inv.totalPayable - totalPaidNow - Number(paymentForm.tdsDeducted || 0));
    const newStatus: InvoiceRecord['status'] = newBalance === 0 ? 'Paid' : 'Partially Paid';

    const updatedInvoices = invoices.map((i) =>
      i.id === inv.id
        ? {
            ...i,
            advancePaid: totalPaidNow,
            tdsDeducted: (i.tdsDeducted || 0) + Number(paymentForm.tdsDeducted || 0),
            balanceDue: newBalance,
            status: newStatus,
            updatedAt: new Date().toISOString()
          }
        : i
    );
    setInvoices(updatedInvoices);
    saveInvoices(updatedInvoices);

    const updatedSettings = { ...settings, recSequence: nextRecSeq };
    setSettings(updatedSettings);
    saveSettings(updatedSettings);

    setShowPaymentModal(false);
    setSelectedReceipt(newPayment);
    setActiveTab('receipts');

    logAuditEvent(
      currentUser,
      currentRole,
      'RECORD_PAYMENT',
      'Payment',
      recNum,
      `Recorded ₹${paymentForm.amount} for ${inv.invoiceNumber} (UTR: ${paymentForm.utrReference}). Status: ${newStatus}.`
    );
    showToast(`Payment recorded. Receipt ${recNum} generated!`);
  };

  // -------------------------------------------------------------
  // Add New Client (Section 3)
  // -------------------------------------------------------------
  const handleSaveNewClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientForm.legalName) return;

    const newClient: ClientRecord = {
      id: 'CLI-' + Date.now().toString(36).toUpperCase(),
      legalName: newClientForm.legalName || '',
      tradingName: newClientForm.tradingName || newClientForm.legalName || '',
      contactPerson: newClientForm.contactPerson || 'Management',
      phone: newClientForm.phone || '+91 98000 00000',
      email: newClientForm.email || 'info@client.com',
      billingAddress: newClientForm.billingAddress || 'Chennai, India',
      state: newClientForm.state || 'Tamil Nadu',
      placeOfSupply: newClientForm.placeOfSupply || 'Tamil Nadu (33)',
      country: 'India',
      gstin: newClientForm.gstin || '',
      pan: newClientForm.pan || '',
      defaultPaymentTerms: newClientForm.defaultPaymentTerms || 'Net 10 Business Days',
      internalOwner: newClientForm.internalOwner || currentUser,
      notes: newClientForm.notes || '',
      createdAt: new Date().toISOString()
    };

    const updated = [newClient, ...clients];
    setClients(updated);
    saveClients(updated);
    setShowNewClientModal(false);

    logAuditEvent(currentUser, currentRole, 'CREATE_CLIENT', 'Client', newClient.id, `Added client ${newClient.legalName}`);
    showToast(`Client ${newClient.legalName} saved.`);
  };

  // -------------------------------------------------------------
  // Dispatch Actions: Print, WhatsApp, JSON Export
  // -------------------------------------------------------------
  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppDispatch = () => {
    const isInvoice = activeTab === 'invoices';
    const targetDoc = isInvoice ? selectedInvoice : selectedQuote;
    if (!targetDoc) return;

    const docType = isInvoice ? 'Invoice' : 'Commercial Quotation';
    const docNum = isInvoice ? (targetDoc as InvoiceRecord).invoiceNumber : (targetDoc as QuotationRecord).revisionCode;
    const total = isInvoice ? (targetDoc as InvoiceRecord).totalPayable : (targetDoc as QuotationRecord).totalAmount;

    const msg =
      `*People Point Consultants — Official ${docType}*\n\n` +
      `*Reference:* ${docNum}\n` +
      `*Date:* ${targetDoc.date}\n` +
      `*Client:* ${targetDoc.companyName} (${targetDoc.clientName})\n` +
      `*Subject:* ${targetDoc.subject}\n\n` +
      `*Commercial Summary:*\n` +
      `• Total Amount: ₹${total.toLocaleString('en-IN')}\n` +
      (targetDoc.discount > 0 ? `• Courtesy Discount: -₹${targetDoc.discount.toLocaleString('en-IN')}\n` : '') +
      `• Payment Terms: ${targetDoc.paymentTerms}\n\n` +
      `*Bank Transfer Details:*\n` +
      `• A/c Name: ${settings.bankDetails.accountName}\n` +
      `• Bank: ${settings.bankDetails.bankName}\n` +
      `• A/c No: ${settings.bankDetails.accountNumber}\n` +
      `• IFSC: ${settings.bankDetails.ifsc}\n\n` +
      `For review or formal execution, connect with our Single Point of Contact (SPOC) at +91 88073 04713.`;

    const cleanPhone = targetDoc.phone.replace(/[^0-9]/g, '');
    const url = cleanPhone
      ? `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(msg)}`
      : `https://wa.me/918807304713?text=${encodeURIComponent(msg)}`;

    logAuditEvent(currentUser, currentRole, 'DISPATCH_WHATSAPP', isInvoice ? 'Invoice' : 'Quotation', docNum, `Sent to ${targetDoc.phone}`);
    window.open(url, '_blank');
  };

  const handleExportJSON = () => {
    const isInvoice = activeTab === 'invoices';
    const targetDoc = isInvoice ? selectedInvoice : selectedQuote;
    if (!targetDoc) return;

    const docNum = isInvoice ? (targetDoc as InvoiceRecord).invoiceNumber : (targetDoc as QuotationRecord).revisionCode;
    const payload = {
      source: 'People Point Sales & Billing System',
      qmsIntegrationPath: 'D:\\Quote Create',
      exportedAt: new Date().toISOString(),
      documentType: isInvoice ? 'INVOICE' : 'QUOTATION',
      data: targetDoc,
      organization: settings
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docNum.replace(/[\/\\]/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Exported ${docNum} as QMS JSON.`);
  };

  // -------------------------------------------------------------
  // Executive Reports & KPI Computations (Section 15)
  // -------------------------------------------------------------
  const reportMetrics = useMemo(() => {
    const quotesThisMonth = quotations.length;
    const quotesAccepted = quotations.filter((q) => q.status === 'Accepted' || q.status === 'Converted to Invoice').length;
    const conversionRate = quotesThisMonth > 0 ? Math.round((quotesAccepted / quotesThisMonth) * 100) : 0;
    const totalQuotedValue = quotations.reduce((sum, q) => sum + (q.totalAmount || 0), 0);

    const totalInvoicedValue = invoices.reduce((sum, i) => sum + (i.totalPayable || 0), 0);
    const totalCollected = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
    const totalOutstanding = invoices.reduce((sum, i) => sum + (i.balanceDue || 0), 0);
    const overdueInvoices = invoices.filter((i) => i.status === 'Overdue' || (i.balanceDue > 0 && new Date(i.dueDate) < new Date()));
    const totalOverdue = overdueInvoices.reduce((sum, i) => sum + (i.balanceDue || 0), 0);

    // Monthly Recurring Revenue (MRR) from active recurring clients
    const recurringMRR = invoices
      .filter((i) => i.isRecurring)
      .reduce((sum, i) => {
        const item = i.items[0];
        return sum + (item ? item.amount : 0);
      }, 0);

    return {
      quotesThisMonth,
      quotesAccepted,
      conversionRate,
      totalQuotedValue,
      totalInvoicedValue,
      totalCollected,
      totalOutstanding,
      totalOverdue,
      recurringMRR
    };
  }, [quotations, invoices, payments]);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans">
      {/* Print stylesheet to isolate printable area */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          .printable-doc {
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          @page {
            margin: 1.2cm;
            size: A4 portrait;
          }
        }
      `}</style>

      {/* Toast Banner */}
      {toastMsg && (
        <div className="no-print fixed top-5 right-5 z-50 bg-purple-950 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 border border-purple-800 text-xs font-semibold animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header & Role Bar (no-print) */}
      <div className="no-print bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/leads"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Return to CRM Leads"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-900 bg-purple-100 px-2 py-0.5 rounded">
                  Admin Platform
                </span>
                <span className="text-xs text-slate-300">|</span>
                <span className="text-xs font-bold text-slate-900">
                  Sales & Billing Automation
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> QMS Active
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                Quotation, Invoice, Payment & Scope Studio
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Role Switcher */}
            <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200 text-xs">
              <ShieldAlert className="w-3.5 h-3.5 text-purple-800" />
              <span className="font-semibold text-slate-600 hidden sm:inline">Role:</span>
              <select
                value={currentRole}
                onChange={(e) => {
                  const r = e.target.value as UserRole;
                  setCurrentRole(r);
                  showToast(`Switched active session to ${r} role.`);
                }}
                className="bg-transparent font-bold text-purple-950 focus:outline-none cursor-pointer"
              >
                <option value="Admin">Admin</option>
                <option value="Sales / SPOC">Sales / SPOC</option>
                <option value="Manager">Manager</option>
                <option value="Accounts">Accounts</option>
                <option value="Management">Management</option>
              </select>
            </div>

            {/* Direct Document Creators */}
            <button
              onClick={handleOpenNewQuoteModal}
              className="px-3 py-1.5 rounded-xl bg-purple-900 hover:bg-purple-950 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Create Quote</span>
            </button>
            <button
              onClick={() => handleOpenNewInvoiceModal()}
              className="px-3 py-1.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Create Invoice</span>
            </button>

            {/* Quick Actions */}
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-purple-900" />
              <span>Print A4</span>
            </button>
            <button
              onClick={handleWhatsAppDispatch}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={handleExportJSON}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              title="Download structured JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">QMS JSON</span>
            </button>
          </div>
        </div>

        {/* Section 2: Full Sales & Billing Navigation Menu */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex overflow-x-auto gap-1 py-1 border-t border-slate-100 text-xs">
          {[
            { id: 'quotations', label: 'Quotations', count: quotations.length },
            { id: 'invoices', label: 'Invoices', count: invoices.length },
            { id: 'clients', label: 'Clients', count: clients.length },
            { id: 'payments', label: 'Payments', count: payments.length },
            { id: 'receipts', label: 'Receipts', count: payments.length },
            { id: 'rate_cards', label: 'Rate Cards', count: SEED_RATE_CARDS.length },
            { id: 'templates', label: 'Templates' },
            { id: 'reports', label: 'Reports & Dashboard' },
            { id: 'settings', label: 'Settings' },
            { id: 'audit', label: 'Audit Trail', count: auditLogs.length }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`px-3 py-2 font-bold whitespace-nowrap rounded-xl transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-purple-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-purple-950 hover:bg-slate-100'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* ========================================================= */}
        {/* TAB 1: QUOTATIONS MODULE (Sections 4, 5, 6, 8, 9, 10)       */}
        {/* ========================================================= */}
        {activeTab === 'quotations' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Quotation Master List & Actions (no-print) */}
            <div className="no-print lg:col-span-5 space-y-5">
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Quotation Master</h3>
                  <p className="text-xs text-slate-500">Auto-numbering, scope builder & revisions</p>
                </div>
                <button
                  onClick={handleCreateNewQuote}
                  className="py-2 px-3.5 rounded-xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Quotation</span>
                </button>
              </div>

              {/* CRM Lead Direct Import Banner (Section 17) */}
              {crmLeads.length > 0 && (
                <div className="bg-purple-50/90 border border-purple-200 rounded-2xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-purple-950 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                      Import from Qualified CRM Leads
                    </span>
                    <Link href="/admin/leads" className="text-[11px] text-purple-700 underline font-semibold">
                      View All
                    </Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      onChange={(e) => {
                        const lead = crmLeads.find((l) => l.id === e.target.value);
                        if (!lead) return;
                        // Populate into selected quote
                        if (selectedQuote) {
                          setSelectedQuote({
                            ...selectedQuote,
                            companyName: lead.companyName,
                            clientName: lead.fullName,
                            phone: lead.phone,
                            email: lead.email,
                            address: lead.city ? `${lead.city}, India` : selectedQuote.address,
                            subject: `Proposal for ${lead.servicesNeeded.join(', ') || 'Business Solutions'}`
                          });
                          showToast(`Imported lead ${lead.fullName} (${lead.companyName}) into quotation.`);
                        }
                      }}
                      className="flex-1 text-xs px-2.5 py-1.5 rounded-xl border border-purple-200 bg-white focus:outline-none"
                    >
                      <option value="">Select a qualified lead to auto-fill...</option>
                      {crmLeads.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.fullName} — {l.companyName} ({l.servicesNeeded[0] || 'General'})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Quotation Cards List */}
              <div className="space-y-2.5 max-h-[70vh] overflow-y-auto pr-1">
                {quotations.map((quote) => {
                  const isSelected = selectedQuote?.id === quote.id;
                  return (
                    <div
                      key={quote.id}
                      onClick={() => setSelectedQuote(quote)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-purple-50/70 border-purple-400 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-xs text-purple-950">
                              {quote.revisionCode}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                quote.status === 'Accepted' || quote.status === 'Converted to Invoice'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : quote.status === 'Approved'
                                  ? 'bg-blue-100 text-blue-800'
                                  : quote.status === 'Sent'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {quote.status}
                            </span>
                          </div>
                          <h4 className="font-bold text-xs text-slate-900 mt-1 line-clamp-1">
                            {quote.companyName}
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                            {quote.subject}
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="font-extrabold text-xs text-slate-900">
                            ₹{quote.totalAmount.toLocaleString('en-IN')}
                          </span>
                          <div className="text-[10px] text-slate-400 mt-0.5">{quote.date}</div>
                        </div>
                      </div>

                      {/* Card Action Shortcuts */}
                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-[11px]">
                        <span className="text-slate-400 font-medium">
                          {quote.serviceCategory} • {quote.quoteType}
                        </span>
                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleCreateRevision(quote)}
                            className="p-1 rounded-lg text-slate-500 hover:text-purple-800 hover:bg-slate-100 transition-colors"
                            title="Create Revision (R1, R2...)"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDuplicateQuote(quote)}
                            className="p-1 rounded-lg text-slate-500 hover:text-purple-800 hover:bg-slate-100 transition-colors"
                            title="Duplicate Quote"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                          {quote.status === 'Accepted' && (
                            <button
                              onClick={() => handleConvertToInvoice(quote)}
                              className="px-2 py-0.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] flex items-center gap-1 shadow-2xs"
                            >
                              <ArrowRight className="w-3 h-3" />
                              <span>To Invoice</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Interactive Quotation A4 View / Live Editor */}
            <div className="lg:col-span-7">
              {selectedQuote ? (
                <div className="space-y-4">
                  {/* Status & Revision Controls Toolbar (no-print) */}
                  <div className="no-print bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-500">Status Workflow:</span>
                      <select
                        value={selectedQuote.status}
                        onChange={(e) =>
                          handleStatusChangeQuote(selectedQuote.id, e.target.value as QuotationRecord['status'])
                        }
                        className="text-xs font-bold px-2.5 py-1 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Internal Review">Internal Review</option>
                        <option value="Approved">Approved</option>
                        <option value="Sent">Sent</option>
                        <option value="Viewed">Viewed</option>
                        <option value="Negotiation">Negotiation</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Expired">Expired</option>
                        <option value="Converted to Invoice">Converted to Invoice</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditQuoteModal(selectedQuote)}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1 transition-colors"
                      >
                        <Edit3 className="w-3 h-3 text-purple-700" />
                        <span>Edit Quote</span>
                      </button>
                      <button
                        onClick={() => handleCreateRevision(selectedQuote)}
                        className="px-3 py-1.5 rounded-xl border border-purple-200 bg-purple-50 text-purple-900 font-bold text-xs hover:bg-purple-100 flex items-center gap-1 transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Revise ({selectedQuote.quoteNumber}-R{(selectedQuote.revision || 0) + 1})</span>
                      </button>
                      {selectedQuote.status !== 'Converted to Invoice' && (
                        <button
                          onClick={() => handleConvertToInvoice(selectedQuote)}
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-900 to-rose-700 text-white font-bold text-xs hover:opacity-95 flex items-center gap-1.5 shadow-xs transition-all"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Convert to Invoice</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Clean Authentic A4 Printable Document Container */}
                  <div className="printable-doc bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-lg text-slate-800 space-y-6">
                    {/* Document Header */}
                    <div className="flex items-start justify-between pb-6 border-b-2 border-purple-900">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-xl bg-purple-900 text-white flex items-center justify-center font-black text-base shadow-xs">
                            PP
                          </div>
                          <div>
                            <h2 className="font-black text-xl text-purple-950 tracking-tight">
                              PEOPLE POINT CONSULTANTS
                            </h2>
                            <p className="text-[11px] text-purple-700 font-bold uppercase tracking-wider">
                              Turn Ideas Into Running Businesses
                            </p>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-2 max-w-sm leading-relaxed">
                          Business Setup • HR Foundation • Cloud Payroll • Technology • Compliance • SOPs
                          <br />
                          {settings.address} | Phone: {settings.phone}
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="text-xl font-black uppercase tracking-wider text-purple-900">
                          COMMERCIAL QUOTATION
                        </div>
                        <div className="font-mono font-extrabold text-sm text-slate-900 mt-1">
                          Ref: {selectedQuote.revisionCode}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          <strong>Date:</strong> {selectedQuote.date}
                        </div>
                        <div className="text-xs text-slate-600">
                          <strong>Valid Until:</strong> {selectedQuote.validUntil} (30 Days)
                        </div>
                      </div>
                    </div>

                    {/* Client & Place of Supply Block */}
                    <div className="grid grid-cols-2 gap-6 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 text-xs">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          PROPOSAL PREPARED FOR:
                        </span>
                        <div className="font-black text-sm text-slate-900 mt-0.5">
                          {selectedQuote.companyName}
                        </div>
                        <div className="text-slate-700 mt-0.5 font-medium">
                          Attn: {selectedQuote.clientName}
                        </div>
                        <div className="text-slate-500 text-[11px] mt-0.5 leading-snug">
                          {selectedQuote.address}
                        </div>
                        {selectedQuote.gstin && (
                          <div className="text-[11px] font-mono mt-1 text-slate-700">
                            <strong>GSTIN:</strong> {selectedQuote.gstin}
                          </div>
                        )}
                      </div>

                      <div className="space-y-1 text-right">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          ENGAGEMENT DETAILS:
                        </span>
                        <div><strong>Service Domain:</strong> {selectedQuote.serviceCategory}</div>
                        <div><strong>Engagement Model:</strong> {selectedQuote.quoteType}</div>
                        <div><strong>Place of Supply:</strong> {selectedQuote.placeOfSupply}</div>
                        <div><strong>Prepared By:</strong> {selectedQuote.preparedBy}</div>
                      </div>
                    </div>

                    {/* Subject Line */}
                    <div className="text-xs font-bold text-slate-900 bg-purple-50/60 p-3 rounded-xl border border-purple-200/60">
                      <strong>Subject:</strong> {selectedQuote.subject}
                    </div>

                    {/* Smart Scope Breakdown (Section 5) */}
                    <div className="space-y-3">
                      <h4 className="font-extrabold text-xs uppercase tracking-wider text-purple-950 pb-1 border-b border-purple-100">
                        Detailed Scope of Work & Deliverables
                      </h4>
                      {selectedQuote.scopeSections.map((sec, idx) => (
                        <div key={idx} className="space-y-1">
                          <h5 className="font-bold text-xs text-slate-900">{sec.title}</h5>
                          <ul className="list-disc pl-5 space-y-0.5 text-[11px] text-slate-700">
                            {sec.items.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Commercial Line Items Table (Section 6) */}
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-xs uppercase tracking-wider text-purple-950 pb-1 border-b border-purple-100">
                        Commercial Pricing Schedule
                      </h4>
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="bg-purple-900 text-white font-bold text-[11px]">
                            <th className="p-2.5 rounded-l-lg">Description</th>
                            <th className="p-2.5 text-center">Qty / Headcount</th>
                            <th className="p-2.5 text-center">Unit</th>
                            <th className="p-2.5 text-right">Rate (₹)</th>
                            <th className="p-2.5 text-right rounded-r-lg">Total Amount (₹)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {selectedQuote.items.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="p-2.5 text-slate-800 leading-snug">
                                <strong>{item.description}</strong>
                                <span className="block text-[10px] text-slate-500 font-medium">
                                  Billing Model: {item.billingFrequency}
                                </span>
                              </td>
                              <td className="p-2.5 text-center font-bold">{item.quantity}</td>
                              <td className="p-2.5 text-center text-slate-600">{item.unit}</td>
                              <td className="p-2.5 text-right font-medium">
                                ₹{item.rate.toLocaleString('en-IN')}
                              </td>
                              <td className="p-2.5 text-right font-bold text-slate-900">
                                ₹{item.amount.toLocaleString('en-IN')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Totals & Financial Calculations */}
                    <div className="flex justify-end pt-2">
                      <div className="w-72 space-y-1.5 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <div className="flex justify-between text-slate-600">
                          <span>Subtotal:</span>
                          <span className="font-bold">₹{quoteSubtotal.toLocaleString('en-IN')}</span>
                        </div>
                        {selectedQuote.discount > 0 && (
                          <div className="flex justify-between text-rose-700 font-medium">
                            <span>Courtesy Discount:</span>
                            <span>-₹{selectedQuote.discount.toLocaleString('en-IN')}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-slate-600">
                          <span>Net Taxable Value:</span>
                          <span className="font-bold">₹{quoteNetAfterDiscount.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>GST (Presently Exempt / Pre-Reg):</span>
                          <span>{selectedQuote.taxRate > 0 ? `₹${quoteTaxAmount.toLocaleString('en-IN')}` : '₹0'}</span>
                        </div>
                        <div className="flex justify-between text-sm font-black text-purple-950 pt-2 border-t border-slate-200">
                          <span>Total Quotation Value:</span>
                          <span>₹{quoteTotalAmount.toLocaleString('en-IN')}</span>
                        </div>
                        {selectedQuote.annualIllustration && (
                          <div className="pt-1.5 text-[10px] text-purple-800 font-semibold border-t border-purple-100">
                            <strong>Annual Illustration:</strong> ₹{selectedQuote.annualIllustration.toLocaleString('en-IN')} / year
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Client Responsibilities & Scope Exclusions (Section 8) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-[11px]">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1">
                        <span className="font-bold text-slate-900 uppercase text-[10px]">
                          Client Input Responsibilities:
                        </span>
                        <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                          {selectedQuote.clientResponsibilities.slice(0, 3).map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1">
                        <span className="font-bold text-slate-900 uppercase text-[10px]">
                          Scope Exclusions & Disclaimers:
                        </span>
                        <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                          {selectedQuote.exclusions.slice(0, 2).map((ex, i) => (
                            <li key={i}>{ex}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Payment Terms & Notes */}
                    <div className="text-[11px] text-slate-600 space-y-1 pt-1">
                      <div><strong>Commercial Payment Terms:</strong> {selectedQuote.paymentTerms}</div>
                      <div><strong>Statutory Note:</strong> {selectedQuote.notes}</div>
                    </div>

                    {/* Bank Details & Authorised Signatory Footer */}
                    <div className="pt-4 border-t-2 border-purple-900 flex items-end justify-between text-xs">
                      <div className="space-y-0.5 text-[11px] text-slate-600">
                        <div className="font-bold text-purple-950 text-xs uppercase tracking-wider">
                          DIRECT BANK SETTLEMENT DETAILS:
                        </div>
                        <div><strong>Account Name:</strong> {settings.bankDetails.accountName}</div>
                        <div><strong>Bank Name:</strong> {settings.bankDetails.bankName}</div>
                        <div><strong>Account Number:</strong> {settings.bankDetails.accountNumber}</div>
                        <div><strong>IFSC Code:</strong> {settings.bankDetails.ifsc}</div>
                        <div><strong>Account Type:</strong> {settings.bankDetails.accountType}</div>
                      </div>

                      <div className="text-right space-y-8">
                        <div className="text-xs font-bold text-purple-950">
                          For PeoplePoint Consultants
                        </div>
                        <div>
                          <div className="font-extrabold text-xs text-slate-900">
                            {settings.signatoryName}
                          </div>
                          <div className="text-[10px] text-slate-500 font-medium">
                            {settings.signatoryDesignation}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
                  Select a quotation from the left panel to inspect or print.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: INVOICES MODULE (Sections 10, 11, 12, 13)            */}
        {/* ========================================================= */}
        {activeTab === 'invoices' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Invoice Master & Recurring Generator */}
            <div className="no-print lg:col-span-5 space-y-5">
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Invoice Master</h3>
                  <p className="text-xs text-slate-500">Tax invoices, retainers & payment reconciliation</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenNewInvoiceModal()}
                    className="py-2 px-3.5 rounded-xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Invoice</span>
                  </button>
                  <button
                    onClick={() => setShowRecurringModal(true)}
                    className="py-2 px-3 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Recurring Batch</span>
                  </button>
                </div>
              </div>

              {/* Invoice List */}
              <div className="space-y-2.5 max-h-[75vh] overflow-y-auto pr-1">
                {invoices.map((inv) => {
                  const isSelected = selectedInvoice?.id === inv.id;
                  return (
                    <div
                      key={inv.id}
                      onClick={() => setSelectedInvoice(inv)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-purple-50/70 border-purple-400 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-xs text-purple-950">
                              {inv.invoiceNumber}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                inv.status === 'Paid'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : inv.status === 'Partially Paid'
                                  ? 'bg-blue-100 text-blue-800'
                                  : inv.status === 'Issued'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {inv.status}
                            </span>
                          </div>
                          <h4 className="font-bold text-xs text-slate-900 mt-1 line-clamp-1">
                            {inv.companyName}
                          </h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{inv.subject}</p>
                        </div>

                        <div className="text-right">
                          <span className="font-black text-xs text-slate-900">
                            ₹{inv.totalPayable.toLocaleString('en-IN')}
                          </span>
                          <div className="text-[10px] text-slate-400 mt-0.5">{inv.date}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-[11px]">
                        <span className="text-slate-500 font-medium">
                          Period: {inv.billingPeriod} {inv.isRecurring && '• Retainer'}
                        </span>
                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          {inv.balanceDue > 0 && (
                            <button
                              onClick={() => {
                                setPaymentForm({
                                  invoiceId: inv.id,
                                  amount: inv.balanceDue,
                                  tdsDeducted: 0,
                                  paymentDate: new Date().toISOString().split('T')[0],
                                  paymentMode: 'NEFT / RTGS',
                                  utrReference: '',
                                  notes: `Settlement for ${inv.invoiceNumber}`
                                });
                                setShowPaymentModal(true);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] flex items-center gap-1 shadow-2xs"
                            >
                              <CreditCard className="w-3 h-3" />
                              <span>Record Payment</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Invoice A4 Preview (Section 13) */}
            <div className="lg:col-span-7">
              {selectedInvoice ? (
                <div className="space-y-4">
                  {/* Action Bar */}
                  <div className="no-print bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-500">Status:</span>
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-xl ${
                          selectedInvoice.status === 'Paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {selectedInvoice.status} (Balance: ₹{selectedInvoice.balanceDue.toLocaleString('en-IN')})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {selectedInvoice.balanceDue > 0 && (
                        <button
                          onClick={() => {
                            setPaymentForm({
                              invoiceId: selectedInvoice.id,
                              amount: selectedInvoice.balanceDue,
                              tdsDeducted: 0,
                              paymentDate: new Date().toISOString().split('T')[0],
                              paymentMode: 'NEFT / RTGS',
                              utrReference: '',
                              notes: `Settlement for ${selectedInvoice.invoiceNumber}`
                            });
                            setShowPaymentModal(true);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Record Receipt</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenEditInvoiceModal(selectedInvoice)}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1 transition-colors"
                      >
                        <Edit3 className="w-3 h-3 text-purple-700" />
                        <span>Edit Invoice</span>
                      </button>
                      <button
                        onClick={handlePrint}
                        className="px-3.5 py-1.5 rounded-xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Invoice</span>
                      </button>
                    </div>
                  </div>

                  {/* Clean 1-Page A4 Invoice Document */}
                  <div className="printable-doc bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-lg text-slate-800 space-y-6">
                    {/* Invoice Header */}
                    <div className="flex items-start justify-between pb-6 border-b-2 border-purple-900">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-xl bg-purple-900 text-white flex items-center justify-center font-black text-base shadow-xs">
                            PP
                          </div>
                          <div>
                            <h2 className="font-black text-xl text-purple-950 tracking-tight">
                              PEOPLE POINT CONSULTANTS
                            </h2>
                            <p className="text-[11px] text-purple-700 font-bold uppercase tracking-wider">
                              Turn Ideas Into Running Businesses
                            </p>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-2 max-w-sm leading-relaxed">
                          Corporate Setup • HR • Payroll & Compliance • Accounts • SOPs
                          <br />
                          {settings.address} | Phone: {settings.phone}
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-black uppercase tracking-wider text-purple-900">
                          INVOICE
                        </div>
                        <div className="font-mono font-extrabold text-sm text-slate-900 mt-1">
                          Invoice No: {selectedInvoice.invoiceNumber}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          <strong>Date:</strong> {selectedInvoice.date}
                        </div>
                        <div className="text-xs text-slate-600">
                          <strong>Payment Due:</strong> {selectedInvoice.dueDate}
                        </div>
                        {selectedInvoice.quotationRef && (
                          <div className="text-xs text-purple-800 font-mono mt-0.5">
                            <strong>Quote Ref:</strong> {selectedInvoice.quotationRef}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bill To Details */}
                    <div className="grid grid-cols-2 gap-6 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 text-xs">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          BILLED TO:
                        </span>
                        <div className="font-black text-sm text-slate-900 mt-0.5">
                          {selectedInvoice.companyName}
                        </div>
                        <div className="text-slate-700 mt-0.5 font-medium">
                          Attn: {selectedInvoice.clientName}
                        </div>
                        <div className="text-slate-500 text-[11px] mt-0.5 leading-snug">
                          {selectedInvoice.address}
                        </div>
                        {selectedInvoice.gstin && (
                          <div className="text-[11px] font-mono mt-1 text-slate-700">
                            <strong>GSTIN:</strong> {selectedInvoice.gstin}
                          </div>
                        )}
                      </div>

                      <div className="space-y-1 text-right">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          INVOICE METADATA:
                        </span>
                        <div><strong>Billing Period:</strong> {selectedInvoice.billingPeriod}</div>
                        <div><strong>Invoice Type:</strong> {selectedInvoice.invoiceType}</div>
                        <div><strong>Place of Supply:</strong> {selectedInvoice.placeOfSupply}</div>
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="text-xs font-bold text-slate-900 bg-purple-50/60 p-3 rounded-xl border border-purple-200/60">
                      <strong>Subject:</strong> {selectedInvoice.subject}
                    </div>

                    {/* Itemized Table */}
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="bg-purple-900 text-white font-bold text-[11px]">
                          <th className="p-2.5 rounded-l-lg">Description</th>
                          <th className="p-2.5 text-center">Qty / Headcount</th>
                          <th className="p-2.5 text-center">Unit</th>
                          <th className="p-2.5 text-right">Rate (₹)</th>
                          <th className="p-2.5 text-right rounded-r-lg">Amount (₹)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {selectedInvoice.items.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="p-2.5 text-slate-800 leading-snug font-medium">
                              {item.description}
                            </td>
                            <td className="p-2.5 text-center font-bold">{item.quantity}</td>
                            <td className="p-2.5 text-center text-slate-600">{item.unit}</td>
                            <td className="p-2.5 text-right font-medium">
                              ₹{item.rate.toLocaleString('en-IN')}
                            </td>
                            <td className="p-2.5 text-right font-bold text-slate-900">
                              ₹{item.amount.toLocaleString('en-IN')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Totals & Advance Breakdown */}
                    <div className="flex justify-end pt-2">
                      <div className="w-72 space-y-1.5 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <div className="flex justify-between text-slate-600">
                          <span>Subtotal:</span>
                          <span className="font-bold">₹{selectedInvoice.subtotal.toLocaleString('en-IN')}</span>
                        </div>
                        {selectedInvoice.discount > 0 && (
                          <div className="flex justify-between text-rose-700 font-medium">
                            <span>Courtesy Discount:</span>
                            <span>-₹{selectedInvoice.discount.toLocaleString('en-IN')}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-slate-600">
                          <span>Net Taxable Value:</span>
                          <span className="font-bold">₹{selectedInvoice.netAfterDiscount.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>GST (Presently Exempt):</span>
                          <span>₹0</span>
                        </div>
                        <div className="flex justify-between text-sm font-black text-purple-950 pt-2 border-t border-slate-200">
                          <span>Total Payable:</span>
                          <span>₹{selectedInvoice.totalPayable.toLocaleString('en-IN')}</span>
                        </div>
                        {selectedInvoice.advancePaid > 0 && (
                          <div className="flex justify-between text-emerald-700 font-bold">
                            <span>Amount Received:</span>
                            <span>₹{selectedInvoice.advancePaid.toLocaleString('en-IN')}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-xs font-black text-rose-800 pt-1 border-t border-slate-200">
                          <span>Balance Due:</span>
                          <span>₹{selectedInvoice.balanceDue.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Notes & Terms */}
                    <div className="text-[11px] text-slate-600 space-y-1">
                      <div><strong>Payment Terms:</strong> {selectedInvoice.paymentTerms}</div>
                      <div><strong>Statutory Note:</strong> {selectedInvoice.notes}</div>
                    </div>

                    {/* Bank Transfer Details & Signatory Block (Kept together on 1 page) */}
                    <div className="pt-4 border-t-2 border-purple-900 flex items-end justify-between text-xs">
                      <div className="space-y-0.5 text-[11px] text-slate-600">
                        <div className="font-bold text-purple-950 text-xs uppercase tracking-wider">
                          REMITTANCE BANK DETAILS:
                        </div>
                        <div><strong>Account Name:</strong> {settings.bankDetails.accountName}</div>
                        <div><strong>Bank Name:</strong> {settings.bankDetails.bankName}</div>
                        <div><strong>Account Number:</strong> {settings.bankDetails.accountNumber}</div>
                        <div><strong>IFSC Code:</strong> {settings.bankDetails.ifsc}</div>
                        <div><strong>Account Type:</strong> {settings.bankDetails.accountType}</div>
                      </div>

                      <div className="text-right space-y-8">
                        <div className="text-xs font-bold text-purple-950">
                          For PeoplePoint Consultants
                        </div>
                        <div>
                          <div className="font-extrabold text-xs text-slate-900">
                            {settings.signatoryName}
                          </div>
                          <div className="text-[10px] text-slate-500 font-medium">
                            {settings.signatoryDesignation}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
                  Select an invoice from the left panel to inspect or print.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: CLIENT MASTER MODULE (Section 3)                     */}
        {/* ========================================================= */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Client Master Directory</h3>
                <p className="text-xs text-slate-500">Legal entity names, billing addresses, GSTIN, and default terms</p>
              </div>
              <button
                onClick={() => setShowNewClientModal(true)}
                className="py-2.5 px-4 rounded-xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Client Master</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {clients.map((client) => (
                <div key={client.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                        {client.id}
                      </span>
                      <h4 className="font-extrabold text-sm text-slate-900 mt-1.5">
                        {client.legalName}
                      </h4>
                      {client.tradingName && client.tradingName !== client.legalName && (
                        <p className="text-xs text-slate-500 font-medium">({client.tradingName})</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                    <div><strong>Contact Person:</strong> {client.contactPerson}</div>
                    <div><strong>Phone:</strong> {client.phone}</div>
                    <div><strong>Email:</strong> {client.email}</div>
                    <div><strong>Place of Supply:</strong> {client.placeOfSupply}</div>
                    <div><strong>GSTIN:</strong> {client.gstin || 'Not Provided / Exempt'}</div>
                    <div><strong>Default Terms:</strong> {client.defaultPaymentTerms}</div>
                    <div><strong>Internal Owner:</strong> {client.internalOwner}</div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => {
                        handleCreateNewQuote();
                        if (selectedQuote) {
                          setSelectedQuote({
                            ...selectedQuote,
                            clientId: client.id,
                            companyName: client.legalName,
                            clientName: client.contactPerson,
                            phone: client.phone,
                            email: client.email,
                            address: client.billingAddress,
                            gstin: client.gstin || ''
                          });
                          setActiveTab('quotations');
                        }
                      }}
                      className="text-purple-900 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Create Quotation</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4 & 5: PAYMENTS & RECEIPTS (Section 14)                 */}
        {/* ========================================================= */}
        {(activeTab === 'payments' || activeTab === 'receipts') && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  {activeTab === 'receipts' ? 'Payment Receipts & Slips' : 'Payment Tracking'}
                </h3>
                <p className="text-xs text-slate-500">
                  Bank UTR tracking, TDS reconciliations and official branded client receipts
                </p>
              </div>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <CreditCard className="w-4 h-4" />
                <span>Record New Payment</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-3">
                {payments.map((p) => {
                  const isSelected = selectedReceipt?.id === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedReceipt(p)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-50/70 border-emerald-400 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-mono font-black text-xs text-emerald-900">
                            {p.receiptNumber}
                          </span>
                          <h4 className="font-bold text-xs text-slate-900 mt-1 line-clamp-1">
                            {p.companyName}
                          </h4>
                          <div className="text-[11px] text-slate-500">
                            Ref Invoice: {p.invoiceNumber} • {p.paymentMode}
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-black text-sm text-emerald-700">
                            ₹{p.amount.toLocaleString('en-IN')}
                          </span>
                          <div className="text-[10px] text-slate-400 mt-0.5">{p.paymentDate}</div>
                        </div>
                      </div>
                      <div className="mt-2 text-[11px] text-slate-600 font-mono">
                        UTR: {p.utrReference || 'Direct Transfer'}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="lg:col-span-7">
                {selectedReceipt ? (
                  <div className="printable-doc bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md space-y-6">
                    <div className="flex items-start justify-between pb-4 border-b-2 border-emerald-700">
                      <div>
                        <div className="font-black text-lg text-purple-950">PEOPLE POINT CONSULTANTS</div>
                        <div className="text-[11px] text-emerald-800 font-bold uppercase">Official Payment Receipt</div>
                        <div className="text-xs text-slate-500">{settings.address} | Phone: {settings.phone}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-black text-base text-emerald-800">
                          {selectedReceipt.receiptNumber}
                        </div>
                        <div className="text-xs text-slate-600">Date: {selectedReceipt.paymentDate}</div>
                      </div>
                    </div>

                    <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/60 space-y-2 text-xs">
                      <div>
                        Received with thanks from: <strong>{selectedReceipt.companyName}</strong> ({selectedReceipt.clientName})
                      </div>
                      <div>
                        Amount Received: <strong className="text-emerald-800 text-sm">₹{selectedReceipt.amount.toLocaleString('en-IN')}</strong>
                      </div>
                      <div>
                        Payment Mode: <strong>{selectedReceipt.paymentMode}</strong> | UTR: <strong>{selectedReceipt.utrReference}</strong>
                      </div>
                      <div>
                        Towards Invoice: <strong>{selectedReceipt.invoiceNumber}</strong>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-xs">
                      <div className="text-[11px] text-slate-500">
                        This is a computer-generated official receipt.
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-900">{settings.signatoryName}</div>
                        <div className="text-[10px] text-slate-500">{settings.signatoryDesignation}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
                    Select a payment from the left to view or print the receipt.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: RATE CARDS MODULE (Section 2 & 16)                   */}
        {/* ========================================================= */}
        {activeTab === 'rate_cards' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Approved Commercial Rate Cards</h3>
                <p className="text-xs text-slate-500">Standard and minimum rates by service discipline</p>
              </div>
              <span className="text-xs font-semibold text-purple-900 bg-purple-100 px-3 py-1 rounded-xl">
                Rate Governance: Admin Protected
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SEED_RATE_CARDS.map((rc) => (
                <div key={rc.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                        {rc.serviceCategory}
                      </span>
                      <h4 className="font-black text-sm text-slate-900 mt-1">{rc.packageName}</h4>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-base text-purple-950">
                        ₹{rc.standardRate.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">/{rc.defaultUnit}</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-snug">{rc.description}</p>

                  <div className="pt-2 border-t border-slate-100 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Core Inclusions:</span>
                    <ul className="list-disc pl-4 text-[11px] text-slate-600 space-y-0.5">
                      {rc.scopePreview.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 flex justify-between items-center text-[11px] text-slate-500">
                    <span>Floor / Min Rate: ₹{rc.minRate.toLocaleString('en-IN')}</span>
                    <span className="font-bold text-purple-800">{rc.billingModel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 7: TEMPLATES MODULE (Section 5)                         */}
        {/* ========================================================= */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Smart Scope Templates</h3>
                <p className="text-xs text-slate-500">Pre-approved scope modules for payroll, HR, and setup proposals</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="font-black text-sm text-purple-950 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-purple-800" />
                  <span>One-Time Payroll Setup & Review Template</span>
                </h4>
                <p className="text-xs text-slate-500">Standard scope loaded for all setup engagements:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
                  {PAYROLL_SCOPE_TEMPLATES.setupAndReview.map((it, idx) => (
                    <li key={idx}>{it}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="font-black text-sm text-purple-950 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-800" />
                  <span>Monthly Payroll & Compliance Retainer Template</span>
                </h4>
                <p className="text-xs text-slate-500">Standard monthly operations deliverables:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
                  {PAYROLL_SCOPE_TEMPLATES.monthlyPayroll.map((it, idx) => (
                    <li key={idx}>{it}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="font-black text-sm text-purple-950 flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-800" />
                  <span>Client Responsibilities & Input Milestones</span>
                </h4>
                <p className="text-xs text-slate-500">Mandatory inputs required from client management:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
                  {PAYROLL_SCOPE_TEMPLATES.clientResponsibilities.map((it, idx) => (
                    <li key={idx}>{it}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="font-black text-sm text-purple-950 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-purple-800" />
                  <span>Standard Scope Exclusions & Statutory Disclaimers</span>
                </h4>
                <p className="text-xs text-slate-500">Protective legal disclaimers:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
                  {PAYROLL_SCOPE_TEMPLATES.exclusions.map((it, idx) => (
                    <li key={idx}>{it}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 8: REPORTS & DASHBOARD MODULE (Section 15)              */}
        {/* ========================================================= */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Executive Revenue & Pipeline Dashboard</h3>
                <p className="text-xs text-slate-500">Real-time commercial metrics, conversion ratios, and receivables</p>
              </div>
            </div>

            {/* KPI Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
                  <span>Quotes This Month</span>
                  <BarChart3 className="w-4 h-4 text-purple-800" />
                </div>
                <div className="text-2xl font-black text-slate-900">{reportMetrics.quotesThisMonth}</div>
                <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <span>{reportMetrics.quotesAccepted} accepted</span>
                  <span>({reportMetrics.conversionRate}% conversion)</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
                  <span>Quoted Pipeline</span>
                  <TrendingUp className="w-4 h-4 text-purple-800" />
                </div>
                <div className="text-2xl font-black text-purple-950">
                  ₹{reportMetrics.totalQuotedValue.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-500">Across {quotations.length} total proposals</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
                  <span>Invoiced Value</span>
                  <DollarSign className="w-4 h-4 text-purple-800" />
                </div>
                <div className="text-2xl font-black text-slate-900">
                  ₹{reportMetrics.totalInvoicedValue.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-emerald-700 font-semibold">
                  Collected: ₹{reportMetrics.totalCollected.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
                  <span>Monthly Retainer MRR</span>
                  <RefreshCw className="w-4 h-4 text-purple-800" />
                </div>
                <div className="text-2xl font-black text-emerald-700">
                  ₹{reportMetrics.recurringMRR.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-500">Predictable monthly run rate</div>
              </div>
            </div>

            {/* Receivables & Balance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <h4 className="font-black text-sm text-slate-900">Receivables & Collections Breakdown</h4>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Total Billed:</span>
                    <span className="font-bold">₹{reportMetrics.totalInvoicedValue.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 text-emerald-700 font-bold">
                    <span>Total Realized (Bank Receipts):</span>
                    <span>₹{reportMetrics.totalCollected.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 text-amber-700 font-bold">
                    <span>Total Outstanding:</span>
                    <span>₹{reportMetrics.totalOutstanding.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-2 text-rose-700 font-black">
                    <span>Total Overdue:</span>
                    <span>₹{reportMetrics.totalOverdue.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <h4 className="font-black text-sm text-slate-900">Active Retainer Clients</h4>
                <div className="space-y-2.5 max-h-56 overflow-y-auto">
                  {invoices
                    .filter((i) => i.isRecurring)
                    .map((r, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-xs">
                        <div>
                          <div className="font-bold text-slate-900">{r.companyName}</div>
                          <div className="text-slate-500 text-[11px]">
                            {r.recurringHeadcount} employees @ ₹{r.recurringPerEmpRate}/mo
                          </div>
                        </div>
                        <div className="font-black text-purple-950">
                          ₹{((r.recurringHeadcount || 15) * (r.recurringPerEmpRate || 100)).toLocaleString('en-IN')}/mo
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 9: SETTINGS MODULE (Section 7, 8, 13)                   */}
        {/* ========================================================= */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <h3 className="font-extrabold text-base text-slate-900">Organization & Tax Settings</h3>
              <p className="text-xs text-slate-500">Configure bank accounts, tax rules, and document numbering</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Organization Name</label>
                  <input
                    type="text"
                    value={settings.orgName}
                    onChange={(e) => setSettings({ ...settings, orgName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Brand Tagline</label>
                  <input
                    type="text"
                    value={settings.brandTagline}
                    onChange={(e) => setSettings({ ...settings, brandTagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Non-Tax Exemption Disclaimer</label>
                <textarea
                  rows={2}
                  value={settings.nonTaxMessage}
                  onChange={(e) => setSettings({ ...settings, nonTaxMessage: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-3">
                <h4 className="font-bold text-purple-950">Primary Bank Settlement Account</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Account Name</label>
                    <input
                      type="text"
                      value={settings.bankDetails.accountName}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          bankDetails: { ...settings.bankDetails, accountName: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Bank & Branch</label>
                    <input
                      type="text"
                      value={settings.bankDetails.bankName}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          bankDetails: { ...settings.bankDetails, bankName: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Account Number</label>
                    <input
                      type="text"
                      value={settings.bankDetails.accountNumber}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          bankDetails: { ...settings.bankDetails, accountNumber: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-600 block mb-1">IFSC Code</label>
                    <input
                      type="text"
                      value={settings.bankDetails.ifsc}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          bankDetails: { ...settings.bankDetails, ifsc: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  saveSettings(settings);
                  logAuditEvent(currentUser, currentRole, 'UPDATE_SETTINGS', 'Settings', 'ORG-CONFIG', 'Updated organization settings.');
                  showToast('Organization settings updated successfully.');
                }}
                className="py-2.5 px-5 rounded-xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs"
              >
                Save Settings
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 10: AUDIT TRAIL MODULE (Section 16)                     */}
        {/* ========================================================= */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Security & Operational Audit Log</h3>
                <p className="text-xs text-slate-500">Immutable record of quote creation, price edits, and approvals</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">User & Role</th>
                    <th className="p-3">Action</th>
                    <th className="p-3">Entity</th>
                    <th className="p-3">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/80">
                      <td className="p-3 text-slate-400 font-mono text-[11px]">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{log.user}</div>
                        <span className="text-[10px] text-purple-800 bg-purple-50 px-1.5 py-0.2 rounded font-semibold">
                          {log.role}
                        </span>
                      </td>
                      <td className="p-3 font-mono font-bold text-xs text-purple-950">{log.action}</td>
                      <td className="p-3 font-medium text-slate-700">
                        {log.entityType}: {log.entityId}
                      </td>
                      <td className="p-3 text-slate-600 max-w-md leading-snug">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* MODAL: ADD CLIENT MASTER (Section 3)                      */}
      {/* ========================================================= */}
      {showNewClientModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-sm text-slate-900">Add New Client Master</h3>
              <button onClick={() => setShowNewClientModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSaveNewClient} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Company / Legal Entity Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Industrial Engineering Private Limited"
                  value={newClientForm.legalName}
                  onChange={(e) => setNewClientForm({ ...newClientForm, legalName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block mb-1">Contact Person *</label>
                  <input
                    type="text"
                    required
                    placeholder="Director / HR Head"
                    value={newClientForm.contactPerson}
                    onChange={(e) => setNewClientForm({ ...newClientForm, contactPerson: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98000 00000"
                    value={newClientForm.phone}
                    onChange={(e) => setNewClientForm({ ...newClientForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold block mb-1">Official Work Email</label>
                <input
                  type="email"
                  placeholder="accounts@acme.com"
                  value={newClientForm.email}
                  onChange={(e) => setNewClientForm({ ...newClientForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Full Billing Address</label>
                <textarea
                  rows={2}
                  placeholder="Street, Industrial Area, City, State - PIN"
                  value={newClientForm.billingAddress}
                  onChange={(e) => setNewClientForm({ ...newClientForm, billingAddress: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block mb-1">State / Place of Supply</label>
                  <input
                    type="text"
                    value={newClientForm.placeOfSupply}
                    onChange={(e) => setNewClientForm({ ...newClientForm, placeOfSupply: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">GSTIN (if registered)</label>
                  <input
                    type="text"
                    placeholder="33XXXXX1234X1ZX"
                    value={newClientForm.gstin}
                    onChange={(e) => setNewClientForm({ ...newClientForm, gstin: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs shadow-xs"
              >
                Save Client to Master
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: RECORD PAYMENT & RECEIPT (Section 14)               */}
      {/* ========================================================= */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-sm text-slate-900">Record Client Payment</h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleRecordPaymentSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Select Invoice *</label>
                <select
                  required
                  value={paymentForm.invoiceId}
                  onChange={(e) => {
                    const inv = invoices.find((i) => i.id === e.target.value);
                    setPaymentForm({
                      ...paymentForm,
                      invoiceId: e.target.value,
                      amount: inv ? inv.balanceDue : 0
                    });
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="">Select invoice to settle...</option>
                  {invoices
                    .filter((i) => i.balanceDue > 0)
                    .map((inv) => (
                      <option key={inv.id} value={inv.id}>
                        {inv.invoiceNumber} — {inv.companyName} (Due: ₹{inv.balanceDue.toLocaleString('en-IN')})
                      </option>
                    ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block mb-1">Amount Received (₹) *</label>
                  <input
                    type="number"
                    required
                    value={paymentForm.amount}
                    onChange={(e) => setPaymentForm({ ...paymentForm, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-emerald-800"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">TDS Deducted (₹)</label>
                  <input
                    type="number"
                    value={paymentForm.tdsDeducted}
                    onChange={(e) => setPaymentForm({ ...paymentForm, tdsDeducted: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block mb-1">Payment Date *</label>
                  <input
                    type="date"
                    required
                    value={paymentForm.paymentDate}
                    onChange={(e) => setPaymentForm({ ...paymentForm, paymentDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Mode *</label>
                  <select
                    value={paymentForm.paymentMode}
                    onChange={(e) =>
                      setPaymentForm({ ...paymentForm, paymentMode: e.target.value as PaymentRecord['paymentMode'] })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="NEFT / RTGS">NEFT / RTGS</option>
                    <option value="UPI / GPay">UPI / GPay</option>
                    <option value="IMPS">IMPS</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Direct Bank Transfer">Direct Bank Transfer</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-bold block mb-1">Bank UTR / Transaction Reference *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. IDIBN26090987654"
                  value={paymentForm.utrReference}
                  onChange={(e) => setPaymentForm({ ...paymentForm, utrReference: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
              >
                Record Payment & Generate Receipt
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: RUN RECURRING BATCH WITH HEADCOUNT CONFIRMATION (Sec 12) */}
      {/* ========================================================= */}
      {showRecurringModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-black text-sm text-slate-900">Monthly Recurring Payroll Generator</h3>
                <p className="text-[11px] text-slate-500">Confirm current headcount for each active client before draft creation</p>
              </div>
              <button onClick={() => setShowRecurringModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Target Billing Month</label>
                <input
                  type="text"
                  value={recurringMonth}
                  onChange={(e) => setRecurringMonth(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-purple-950"
                />
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-700 block">Confirm Active Headcount:</span>
                {invoices
                  .filter((i) => i.isRecurring)
                  .map((inv) => {
                    const currentCount = recurringHeadcountMap[inv.id] || inv.recurringHeadcount || 15;
                    const rate = inv.recurringPerEmpRate || 100;
                    return (
                      <div key={inv.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
                        <div>
                          <div className="font-bold text-slate-900">{inv.companyName}</div>
                          <div className="text-[11px] text-slate-500">Rate: ₹{rate} / emp / month</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500">Headcount:</span>
                          <input
                            type="number"
                            min={1}
                            value={currentCount}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setRecurringHeadcountMap({ ...recurringHeadcountMap, [inv.id]: val });
                            }}
                            className="w-20 px-2 py-1 rounded-lg border border-slate-300 font-black text-center"
                          />
                          <span className="font-bold text-purple-900 w-20 text-right">
                            = ₹{(currentCount * rate).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className="p-3 bg-purple-50 rounded-xl text-[11px] text-purple-900 leading-snug">
                <strong>Rule:</strong> Generated invoices will be created in <em>Draft</em> state. Admin can review, modify, or approve before formal client dispatch.
              </div>

              <button
                onClick={handleGenerateRecurringInvoices}
                className="w-full py-2.5 rounded-xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Generate Draft Invoices for {recurringMonth}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: CREATE / EDIT QUOTATION (Section 4 & 5)             */}
      {/* ========================================================= */}
      {showQuoteModal && quoteFormData && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 space-y-5 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold uppercase tracking-wider mb-1">
                  <FileText className="w-3 h-3" />
                  <span>Quotation Creator Studio</span>
                </div>
                <h3 className="font-black text-base text-slate-900">
                  {quoteFormData.revision && quoteFormData.revision > 0
                    ? `Edit Revision ${quoteFormData.revisionCode}`
                    : `Create Commercial Quotation (${quoteFormData.revisionCode})`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowQuoteModal(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuoteModal} className="space-y-4 text-xs">
              {/* Client Selection Row */}
              <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-purple-950">Select Client / Lead *</label>
                  <button
                    type="button"
                    onClick={() => {
                      setShowQuoteModal(false);
                      setShowNewClientModal(true);
                    }}
                    className="text-[11px] font-bold text-purple-700 hover:underline"
                  >
                    + Add New Client
                  </button>
                </div>
                <select
                  value={quoteFormData.clientId}
                  onChange={(e) => {
                    const c = clients.find((item) => item.id === e.target.value);
                    if (c) {
                      setQuoteFormData({
                        ...quoteFormData,
                        clientId: c.id,
                        companyName: c.legalName,
                        clientName: c.contactPerson,
                        address: c.billingAddress,
                        phone: c.phone,
                        email: c.email,
                        gstin: c.gstin || '',
                        placeOfSupply: c.placeOfSupply
                      });
                    }
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-purple-200 bg-white font-medium"
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.legalName} — Attn: {c.contactPerson} ({c.placeOfSupply})
                    </option>
                  ))}
                </select>
              </div>

              {/* Core Quotation Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Quote Reference #</label>
                  <input
                    type="text"
                    required
                    value={quoteFormData.revisionCode}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, revisionCode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold text-purple-950"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Quote Date</label>
                  <input
                    type="date"
                    required
                    value={quoteFormData.date}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Valid Until (30 Days)</label>
                  <input
                    type="date"
                    required
                    value={quoteFormData.validUntil}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, validUntil: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              {/* Subject Line & Service Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Subject / Engagement Proposal</label>
                  <input
                    type="text"
                    required
                    value={quoteFormData.subject}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Service Domain</label>
                  <select
                    value={quoteFormData.serviceCategory}
                    onChange={(e) =>
                      setQuoteFormData({
                        ...quoteFormData,
                        serviceCategory: e.target.value as QuotationRecord['serviceCategory']
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Payroll">Payroll & Compliance</option>
                    <option value="Setup">Business Setup</option>
                    <option value="HR">HR & Hiring</option>
                    <option value="Technology">Technology & Web</option>
                    <option value="Operations">Operations & SOPs</option>
                    <option value="Accounts">Accounts & Tax</option>
                    <option value="Marketing">Digital Growth</option>
                  </select>
                </div>
              </div>

              {/* Engagement Model */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Billing Model</label>
                  <select
                    value={quoteFormData.quoteType}
                    onChange={(e) =>
                      setQuoteFormData({
                        ...quoteFormData,
                        quoteType: e.target.value as QuotationRecord['quoteType']
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Per Employee">Per Employee (e.g. ₹100/emp/mo)</option>
                    <option value="Monthly">Fixed Monthly Retainer</option>
                    <option value="Fixed Price">Fixed Milestone Project</option>
                    <option value="Mixed">Mixed (Setup + Monthly Retainer)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Place of Supply</label>
                  <input
                    type="text"
                    value={quoteFormData.placeOfSupply}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, placeOfSupply: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              {/* Line Items Builder */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-purple-950">
                    Commercial Line Items
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      const newItem: LineItem = {
                        id: Date.now().toString(),
                        description: 'Custom Consultancy Service / Operational Deliverable',
                        quantity: 1,
                        unit: 'Service',
                        rate: 5000,
                        billingFrequency: quoteFormData.quoteType === 'Per Employee' ? 'Monthly' : 'One-Time',
                        discount: 0,
                        amount: 5000
                      };
                      setQuoteFormData({
                        ...quoteFormData,
                        items: [...quoteFormData.items, newItem]
                      });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-900 hover:bg-purple-200 font-bold text-[11px] flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Line Item</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {quoteFormData.items.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-12 gap-2 items-center text-xs"
                    >
                      <div className="col-span-12 sm:col-span-5">
                        <label className="text-[10px] text-slate-500 font-semibold block sm:hidden">Description</label>
                        <input
                          type="text"
                          required
                          value={item.description}
                          onChange={(e) => {
                            const updated = [...quoteFormData.items];
                            updated[idx] = { ...item, description: e.target.value };
                            setQuoteFormData({ ...quoteFormData, items: updated });
                          }}
                          placeholder="Line item description..."
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <label className="text-[10px] text-slate-500 font-semibold block sm:hidden">Qty</label>
                        <input
                          type="number"
                          min={1}
                          required
                          value={item.quantity}
                          onChange={(e) => {
                            const q = Number(e.target.value) || 0;
                            const amt = q * (item.rate || 0);
                            const updated = [...quoteFormData.items];
                            updated[idx] = { ...item, quantity: q, amount: amt };
                            setQuoteFormData({ ...quoteFormData, items: updated });
                          }}
                          className="w-full px-2 py-1.5 rounded-lg border border-slate-300 bg-white text-center font-bold"
                        />
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <label className="text-[10px] text-slate-500 font-semibold block sm:hidden">Rate (₹)</label>
                        <input
                          type="number"
                          min={0}
                          required
                          value={item.rate}
                          onChange={(e) => {
                            const r = Number(e.target.value) || 0;
                            const amt = (item.quantity || 0) * r;
                            const updated = [...quoteFormData.items];
                            updated[idx] = { ...item, rate: r, amount: amt };
                            setQuoteFormData({ ...quoteFormData, items: updated });
                          }}
                          className="w-full px-2 py-1.5 rounded-lg border border-slate-300 bg-white font-bold"
                        />
                      </div>
                      <div className="col-span-3 sm:col-span-2 text-right font-black text-slate-900">
                        ₹{(item.amount || item.quantity * item.rate).toLocaleString('en-IN')}
                      </div>
                      <div className="col-span-1 text-right">
                        {quoteFormData.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = quoteFormData.items.filter((_, i) => i !== idx);
                              setQuoteFormData({ ...quoteFormData, items: updated });
                            }}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-200"
                            title="Remove line item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Calculation Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Courtesy Discount (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={quoteFormData.discount || 0}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, discount: Number(e.target.value) || 0 })}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-bold text-rose-700"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">GST Tax Rate</label>
                  <select
                    value={quoteFormData.taxRate || 0}
                    onChange={(e) =>
                      setQuoteFormData({
                        ...quoteFormData,
                        taxRate: Number(e.target.value),
                        taxType: Number(e.target.value) > 0 ? 'cgst_sgst' : 'none'
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value={0}>0% (Presently Exempt / Pre-Registration)</option>
                    <option value={18}>18% (CGST 9% + SGST 9% / IGST)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Advance Required (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={quoteFormData.advanceRequired || 0}
                    onChange={(e) =>
                      setQuoteFormData({ ...quoteFormData, advanceRequired: Number(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white"
                  />
                </div>
              </div>

              {/* Payment Terms */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Commercial Payment Terms</label>
                <input
                  type="text"
                  value={quoteFormData.paymentTerms}
                  onChange={(e) => setQuoteFormData({ ...quoteFormData, paymentTerms: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowQuoteModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save & Generate Quotation</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: CREATE / EDIT INVOICE (Section 10 & 11)              */}
      {/* ========================================================= */}
      {showInvoiceModal && invoiceFormData && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 space-y-5 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold uppercase tracking-wider mb-1">
                  <Receipt className="w-3 h-3" />
                  <span>Invoice Generator Studio</span>
                </div>
                <h3 className="font-black text-base text-slate-900">
                  {invoiceFormData.invoiceNumber ? `Invoice ${invoiceFormData.invoiceNumber}` : 'Create New Tax Invoice'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowInvoiceModal(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveInvoiceModal} className="space-y-4 text-xs">
              {/* Client Selection Row */}
              <div className="bg-rose-50/70 p-3.5 rounded-2xl border border-rose-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-rose-950">Select Client *</label>
                  <button
                    type="button"
                    onClick={() => {
                      setShowInvoiceModal(false);
                      setShowNewClientModal(true);
                    }}
                    className="text-[11px] font-bold text-rose-700 hover:underline"
                  >
                    + Add New Client
                  </button>
                </div>
                <select
                  value={invoiceFormData.clientId}
                  onChange={(e) => {
                    const c = clients.find((item) => item.id === e.target.value);
                    if (c) {
                      setInvoiceFormData({
                        ...invoiceFormData,
                        clientId: c.id,
                        companyName: c.legalName,
                        clientName: c.contactPerson,
                        address: c.billingAddress,
                        phone: c.phone,
                        email: c.email,
                        gstin: c.gstin || '',
                        placeOfSupply: c.placeOfSupply
                      });
                    }
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-rose-200 bg-white font-medium"
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.legalName} — Attn: {c.contactPerson} ({c.placeOfSupply})
                    </option>
                  ))}
                </select>
              </div>

              {/* Core Invoice Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Invoice Number *</label>
                  <input
                    type="text"
                    required
                    value={invoiceFormData.invoiceNumber}
                    onChange={(e) => setInvoiceFormData({ ...invoiceFormData, invoiceNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold text-purple-950"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Invoice Date *</label>
                  <input
                    type="date"
                    required
                    value={invoiceFormData.date}
                    onChange={(e) => setInvoiceFormData({ ...invoiceFormData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Due Date *</label>
                  <input
                    type="date"
                    required
                    value={invoiceFormData.dueDate}
                    onChange={(e) => setInvoiceFormData({ ...invoiceFormData, dueDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Billing Period</label>
                  <input
                    type="text"
                    value={invoiceFormData.billingPeriod}
                    onChange={(e) => setInvoiceFormData({ ...invoiceFormData, billingPeriod: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              {/* Quote Ref & Invoice Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Quotation Reference</label>
                  <select
                    value={invoiceFormData.quotationRef || ''}
                    onChange={(e) => {
                      const q = quotations.find((quote) => quote.revisionCode === e.target.value);
                      if (q) {
                        setInvoiceFormData({
                          ...invoiceFormData,
                          quotationRef: q.revisionCode,
                          subject: `Invoice for ${q.subject}`,
                          items: q.items.map((it) => ({ ...it }))
                        });
                      } else {
                        setInvoiceFormData({ ...invoiceFormData, quotationRef: e.target.value });
                      }
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="">None / Standalone Invoice</option>
                    {quotations.map((q) => (
                      <option key={q.id} value={q.revisionCode}>
                        {q.revisionCode} — {q.companyName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Invoice Type</label>
                  <select
                    value={invoiceFormData.invoiceType}
                    onChange={(e) =>
                      setInvoiceFormData({
                        ...invoiceFormData,
                        invoiceType: e.target.value as InvoiceRecord['invoiceType']
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Monthly Retainer">Monthly Retainer</option>
                    <option value="Per-Employee Recurring">Per-Employee Recurring</option>
                    <option value="Advance">Advance Milestone</option>
                    <option value="Full">Full Project Invoice</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Status</label>
                  <select
                    value={invoiceFormData.status}
                    onChange={(e) =>
                      setInvoiceFormData({
                        ...invoiceFormData,
                        status: e.target.value as InvoiceRecord['status']
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Issued">Issued</option>
                    <option value="Partially Paid">Partially Paid</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>

              {/* Subject Line */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Invoice Subject / Description</label>
                <input
                  type="text"
                  required
                  value={invoiceFormData.subject}
                  onChange={(e) => setInvoiceFormData({ ...invoiceFormData, subject: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium"
                />
              </div>

              {/* Line Items Builder */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-rose-950">
                    Billed Line Items
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      const newItem: LineItem = {
                        id: Date.now().toString(),
                        description: 'Professional Managed Services & Compliance',
                        quantity: 1,
                        unit: 'Month',
                        rate: 15000,
                        billingFrequency: 'Monthly',
                        discount: 0,
                        amount: 15000
                      };
                      setInvoiceFormData({
                        ...invoiceFormData,
                        items: [...invoiceFormData.items, newItem]
                      });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-900 hover:bg-rose-200 font-bold text-[11px] flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Line Item</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {invoiceFormData.items.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-12 gap-2 items-center text-xs"
                    >
                      <div className="col-span-12 sm:col-span-5">
                        <label className="text-[10px] text-slate-500 font-semibold block sm:hidden">Description</label>
                        <input
                          type="text"
                          required
                          value={item.description}
                          onChange={(e) => {
                            const updated = [...invoiceFormData.items];
                            updated[idx] = { ...item, description: e.target.value };
                            setInvoiceFormData({ ...invoiceFormData, items: updated });
                          }}
                          placeholder="Billed item description..."
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <label className="text-[10px] text-slate-500 font-semibold block sm:hidden">Qty</label>
                        <input
                          type="number"
                          min={1}
                          required
                          value={item.quantity}
                          onChange={(e) => {
                            const q = Number(e.target.value) || 0;
                            const amt = q * (item.rate || 0);
                            const updated = [...invoiceFormData.items];
                            updated[idx] = { ...item, quantity: q, amount: amt };
                            setInvoiceFormData({ ...invoiceFormData, items: updated });
                          }}
                          className="w-full px-2 py-1.5 rounded-lg border border-slate-300 bg-white text-center font-bold"
                        />
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <label className="text-[10px] text-slate-500 font-semibold block sm:hidden">Rate (₹)</label>
                        <input
                          type="number"
                          min={0}
                          required
                          value={item.rate}
                          onChange={(e) => {
                            const r = Number(e.target.value) || 0;
                            const amt = (item.quantity || 0) * r;
                            const updated = [...invoiceFormData.items];
                            updated[idx] = { ...item, rate: r, amount: amt };
                            setInvoiceFormData({ ...invoiceFormData, items: updated });
                          }}
                          className="w-full px-2 py-1.5 rounded-lg border border-slate-300 bg-white font-bold"
                        />
                      </div>
                      <div className="col-span-3 sm:col-span-2 text-right font-black text-slate-900">
                        ₹{(item.amount || item.quantity * item.rate).toLocaleString('en-IN')}
                      </div>
                      <div className="col-span-1 text-right">
                        {invoiceFormData.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = invoiceFormData.items.filter((_, i) => i !== idx);
                              setInvoiceFormData({ ...invoiceFormData, items: updated });
                            }}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-200"
                            title="Remove line item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Calculation Row */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Courtesy Discount (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={invoiceFormData.discount || 0}
                    onChange={(e) => setInvoiceFormData({ ...invoiceFormData, discount: Number(e.target.value) || 0 })}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-bold text-rose-700"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">GST Tax Rate</label>
                  <select
                    value={invoiceFormData.taxRate || 0}
                    onChange={(e) =>
                      setInvoiceFormData({
                        ...invoiceFormData,
                        taxRate: Number(e.target.value),
                        taxType: Number(e.target.value) > 0 ? 'cgst_sgst' : 'none'
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value={0}>0% (Presently Exempt / Pre-Registration)</option>
                    <option value={18}>18% (CGST 9% + SGST 9% / IGST)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Advance Received (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={invoiceFormData.advancePaid || 0}
                    onChange={(e) =>
                      setInvoiceFormData({ ...invoiceFormData, advancePaid: Number(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white font-bold text-emerald-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">TDS Deducted (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={invoiceFormData.tdsDeducted || 0}
                    onChange={(e) =>
                      setInvoiceFormData({ ...invoiceFormData, tdsDeducted: Number(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white"
                  />
                </div>
              </div>

              {/* Payment Terms */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Payment Terms & Instructions</label>
                <input
                  type="text"
                  value={invoiceFormData.paymentTerms}
                  onChange={(e) => setInvoiceFormData({ ...invoiceFormData, paymentTerms: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowInvoiceModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save & Generate Invoice</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
