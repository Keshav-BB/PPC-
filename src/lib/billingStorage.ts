export interface ClientRecord {
  id: string;
  legalName: string;
  tradingName?: string;
  contactPerson: string;
  phone: string;
  email: string;
  billingAddress: string;
  state: string;
  placeOfSupply: string;
  country: string;
  gstin?: string;
  pan?: string;
  defaultPaymentTerms: string;
  internalOwner: string;
  notes?: string;
  createdAt: string;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  rate: number;
  billingFrequency: 'One-Time' | 'Monthly' | 'Per Employee' | 'Per User' | 'Milestone' | 'Annual';
  discount?: number;
  amount: number;
}

export interface ScopeSection {
  title: string;
  items: string[];
}

export interface QuotationRecord {
  id: string;
  quoteNumber: string;
  revision: number;
  revisionCode: string;
  date: string;
  validityDays: number;
  validUntil: string;
  clientId: string;
  clientName: string;
  companyName: string;
  address: string;
  phone: string;
  email: string;
  gstin?: string;
  placeOfSupply: string;
  serviceCategory: 'Payroll' | 'Business Setup' | 'HR' | 'Technology' | 'Accounts' | 'Operations' | 'Marketing' | 'Business Launch 360' | 'Custom';
  quoteType: 'One-time' | 'Monthly' | 'Per Employee' | 'Per User' | 'Project' | 'Milestone' | 'Hourly' | 'Custom';
  currency: string;
  subject: string;
  scopeSections: ScopeSection[];
  exclusions: string[];
  clientResponsibilities: string[];
  items: LineItem[];
  subtotal: number;
  discount: number;
  netAfterDiscount: number;
  taxRate: number;
  taxType: 'none' | 'cgst_sgst' | 'igst';
  taxAmount: number;
  totalAmount: number;
  annualIllustration?: number;
  advanceRequired: number;
  balanceDue: number;
  paymentTerms: string;
  notes: string;
  status: 'Draft' | 'Internal Review' | 'Approved' | 'Sent' | 'Viewed' | 'Negotiation' | 'Accepted' | 'Rejected' | 'Expired' | 'Converted to Invoice';
  preparedBy: string;
  internalApprover: string;
  convertedToInvoiceId?: string;
  acceptedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  quotationRef?: string;
  invoiceType: 'Full' | 'Advance' | 'Milestone' | 'Monthly Retainer' | 'Per-Employee Recurring' | 'Credit Note';
  billingPeriod: string;
  clientId: string;
  clientName: string;
  companyName: string;
  address: string;
  phone: string;
  email: string;
  gstin?: string;
  placeOfSupply: string;
  subject: string;
  scopeItems?: string[];
  items: LineItem[];
  subtotal: number;
  discount: number;
  netAfterDiscount: number;
  taxRate: number;
  taxType: 'none' | 'cgst_sgst' | 'igst';
  taxAmount: number;
  totalPayable: number;
  advancePaid: number;
  tdsDeducted: number;
  balanceDue: number;
  paymentTerms: string;
  notes: string;
  status: 'Draft' | 'Issued' | 'Sent' | 'Partially Paid' | 'Paid' | 'Overdue' | 'Cancelled';
  isRecurring: boolean;
  recurringHeadcount?: number;
  recurringPerEmpRate?: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentRecord {
  id: string;
  receiptNumber: string;
  invoiceId: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  companyName: string;
  amount: number;
  tdsDeducted: number;
  paymentDate: string;
  paymentMode: 'NEFT / RTGS' | 'UPI / GPay' | 'IMPS' | 'Cheque' | 'Direct Bank Transfer';
  utrReference: string;
  notes?: string;
  createdAt: string;
}

export interface RateCardItem {
  id: string;
  serviceCategory: string;
  packageName: string;
  description: string;
  defaultUnit: string;
  standardRate: number;
  minRate: number;
  billingModel: 'One-Time' | 'Per Employee / Mo' | 'Monthly Retainer' | 'Milestone';
  scopePreview: string[];
}

export interface OrgSettings {
  orgName: string;
  brandTagline: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  gstRegistered: boolean;
  gstin?: string;
  pan: string;
  stateOfSupply: string;
  stateCode: string;
  nonTaxMessage: string;
  defaultPaymentDueDays: number;
  bankDetails: {
    accountName: string;
    bankName: string;
    accountNumber: string;
    ifsc: string;
    accountType: string;
  };
  signatoryName: string;
  signatoryDesignation: string;
  qtnSequence: number;
  invSequence: number;
  recSequence: number;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: 'Sales / SPOC' | 'Manager' | 'Accounts' | 'Admin' | 'Management';
  action: string;
  entityType: 'Quotation' | 'Invoice' | 'Payment' | 'Client' | 'Settings';
  entityId: string;
  details: string;
}

// -------------------------------------------------------------
// Seed Data: Master Clients, Presets, Rate Cards, Templates
// -------------------------------------------------------------

export const DEFAULT_ORG_SETTINGS: OrgSettings = {
  orgName: 'People Point Consultants',
  brandTagline: 'Turn Ideas into Running Businesses',
  address: 'Chennai, Tamil Nadu, India',
  phone: '+91 88073 04713',
  email: 'peoplepointconsultant@gmail.com',
  website: 'peoplepointconsultants.com',
  gstRegistered: false,
  gstin: '',
  pan: 'AAECP8807P',
  stateOfSupply: 'Tamil Nadu',
  stateCode: '33',
  nonTaxMessage:
    'GST is presently not applicable under pre-registration threshold. Statutory liabilities (PF/ESIC/PT/TDS) are paid directly by client; our fee covers advisory and operational execution.',
  defaultPaymentDueDays: 10,
  bankDetails: {
    accountName: 'V Bhavani',
    bankName: 'Indian Bank, Nallambakkam Branch',
    accountNumber: '6029225486',
    ifsc: 'IDIB000N056',
    accountType: 'Savings'
  },
  signatoryName: 'V Bhavani',
  signatoryDesignation: 'Authorised Signatory / Founder',
  qtnSequence: 5,
  invSequence: 8,
  recSequence: 4
};

export const SEED_CLIENTS: ClientRecord[] = [
  {
    id: 'CLI-101',
    legalName: 'SHREE ABHI ELECTRICALS & ENGINEERING PRIVATE LIMITED',
    tradingName: 'Shree Abhi Electricals',
    contactPerson: 'Director / Management',
    phone: '+91 98400 12345',
    email: 'accounts@shreeabhi.com',
    billingAddress: 'No. 14, Industrial Estate, Guindy, Chennai, Tamil Nadu - 600032',
    state: 'Tamil Nadu',
    placeOfSupply: 'Tamil Nadu (33)',
    country: 'India',
    gstin: '33AAECS1234F1Z8',
    pan: 'AAECS1234F',
    defaultPaymentTerms: 'Net 10 Days from invoice receipt',
    internalOwner: 'Keerthika (Partner)',
    notes: 'Long-term payroll & compliance client. 15 on-roll employees.',
    createdAt: '2026-08-15T10:00:00Z'
  },
  {
    id: 'CLI-102',
    legalName: 'B-Sec Technologies Private Limited',
    tradingName: 'B-Sec Technologies',
    contactPerson: 'Leadership Team / HR Head',
    phone: '+91 98840 54321',
    email: 'hr@bsectechnologies.com',
    billingAddress: 'Level 3, OMR IT Corridor, Thoraipakkam, Chennai, Tamil Nadu - 600097',
    state: 'Tamil Nadu',
    placeOfSupply: 'Tamil Nadu (33)',
    country: 'India',
    gstin: '33AABCB5678M1ZQ',
    pan: 'AABCB5678M',
    defaultPaymentTerms: 'Net 10 Business Days',
    internalOwner: 'Bhavani (Founder)',
    notes: 'Per-employee monthly payroll retainer client. Headcount scales with expansion.',
    createdAt: '2026-07-20T11:30:00Z'
  },
  {
    id: 'CLI-103',
    legalName: 'NexWave Logistics Private Limited',
    tradingName: 'NexWave Logistics',
    contactPerson: 'Suresh Raina',
    phone: '+91 98401 23456',
    email: 'suresh@nexwavelogistics.in',
    billingAddress: '42 Ambattur Industrial Estate, Chennai, Tamil Nadu - 600058',
    state: 'Tamil Nadu',
    placeOfSupply: 'Tamil Nadu (33)',
    country: 'India',
    gstin: '',
    pan: 'AAACN9876K',
    defaultPaymentTerms: '50% advance, balance on milestone completion',
    internalOwner: 'Aadhil (Tech Lead)',
    notes: 'Imported from CRM. Transitioning from spreadsheets to Zoho Payroll & HRMS.',
    createdAt: '2026-09-06T10:15:00Z'
  }
];

export const SEED_RATE_CARDS: RateCardItem[] = [
  {
    id: 'RC-PAYROLL-SETUP',
    serviceCategory: 'Payroll',
    packageName: 'One-Time Payroll Setup & Review',
    description: 'Review and verification of employee data, CTC preparation, Zoho Payroll configuration & initial reconciliation.',
    defaultUnit: 'Setup',
    standardRate: 25000,
    minRate: 20000,
    billingModel: 'One-Time',
    scopePreview: [
      'Employee data audit & CTC structure alignment',
      'Salary components, payslip and paysheet configuration',
      'Zoho Payroll setup, employee master setup and initial calculation'
    ]
  },
  {
    id: 'RC-PAYROLL-MONTHLY',
    serviceCategory: 'Payroll',
    packageName: 'Monthly Payroll & Statutory Compliance',
    description: 'Monthly payroll run, paysheets, payslips, PF/ESI/PT/TDS challans and employee support.',
    defaultUnit: 'Emp/Mo',
    standardRate: 100,
    minRate: 85,
    billingModel: 'Per Employee / Mo',
    scopePreview: [
      'Monthly salary computation (fixed, variable, LOP, overtime)',
      'PF ECR challan, ESIC contribution, PT state returns, TDS Sec 192 computation',
      'Bank advice transfer statement and password-protected digital payslips'
    ]
  },
  {
    id: 'RC-LAUNCH-360',
    serviceCategory: 'Business Launch 360',
    packageName: 'Business Launch 360° Turnkey Program',
    description: 'Complete 30-Day Turnkey business setup across incorporation, HR, cloud payroll, web app, and SOPs.',
    defaultUnit: 'Program',
    standardRate: 45000,
    minRate: 35000,
    billingModel: 'Milestone',
    scopePreview: [
      'Private Limited / LLP MCA Incorporation & Director DINs',
      'Statutory Registrations: GST, MSME, PAN, TAN, PF, ESI, Professional Tax',
      'HR Employment Contracts, NDAs, Handbook, Cloud Payroll setup',
      'Production Web Application & Lead Management Engine'
    ]
  },
  {
    id: 'RC-HR-FOUNDATION',
    serviceCategory: 'HR',
    packageName: 'HR Foundation & People Systems',
    description: 'Structured employment contracts, non-compete agreements, policy handbooks, and leave framework.',
    defaultUnit: 'Project',
    standardRate: 22000,
    minRate: 18000,
    billingModel: 'One-Time',
    scopePreview: [
      'Employment agreement templates (Full-time, Contract, Intern)',
      'Employee Handbook & Code of Conduct',
      'Leave policy, probation guidelines, and termination protocol'
    ]
  },
  {
    id: 'RC-DIGITAL-SETUP',
    serviceCategory: 'Technology',
    packageName: 'Digital Setup & Web Infrastructure',
    description: 'Modern high-speed Next.js business website, responsive mobile design, and CRM lead integration.',
    defaultUnit: 'Project',
    standardRate: 35000,
    minRate: 28000,
    billingModel: 'Milestone',
    scopePreview: [
      'Custom web application engineered on Next.js / React',
      'Integrated contact & consultation booking funnels',
      'Automated WhatsApp lead dispatch & production SSL setup'
    ]
  }
];

export const PAYROLL_SCOPE_TEMPLATES = {
  setupAndReview: [
    'Review and verification of current employee master data and historical payroll files',
    'CTC & salary structure preparation compliant with state minimum wages and statutory thresholds',
    'Salary components / paysheet / digital payslip format setup and branding',
    'Zoho Payroll system setup, master rule configuration and workflow customization',
    'Employee master data onboarding and initial baseline payroll reconciliation',
    'Setup of required monthly statutory compliance reports, ECR formats and management MIS'
  ],
  monthlyPayroll: [
    'Monthly salary computation incorporating attendance, leave without pay (LOP), overtime, and arrears',
    'Generation of itemized monthly employee payslips and bank advice transfer statements',
    'Provident Fund (PF) electronic return and ECR challan preparation',
    'Employees State Insurance (ESIC) monthly contribution calculation and challan generation',
    'Professional Tax (PT) state compliance computation and monthly deduction reporting',
    'TDS Section 192 salary tax computations and quarterly Form 24Q reconciliation support',
    'Single Point of Contact (SPOC) coordination for employee payroll inquiries'
  ],
  clientResponsibilities: [
    'Timely submission of monthly attendance, leaves, LOP, and overtime by agreed cut-off date (e.g., 25th of month)',
    'Submission of revisions, salary increments, bonuses, and new joinee/exit paperwork',
    'Final review and written management sign-off on the computed paysheet prior to bank disbursement',
    'Direct payment of sovereign government statutory liabilities (PF, ESI, PT, TDS) using generated challans'
  ],
  exclusions: [
    'Government statutory filing fees, penalties or taxes (paid directly by client to respective government portals)',
    'Representation before statutory appellate tribunals or labor courts (available under specialized legal scope)',
    'Historical payroll reconstruction or audit for periods prior to engagement commencement'
  ]
};

// Seed Quotation 1: B-Sec Technologies (matches attached sample)
export const SEED_QUOTATIONS: QuotationRecord[] = [
  {
    id: 'QTN-001',
    quoteNumber: 'QTN/2026-27/001',
    revision: 0,
    revisionCode: 'QTN/2026-27/001',
    date: '2026-07-23',
    validityDays: 30,
    validUntil: '2026-08-22',
    clientId: 'CLI-102',
    clientName: 'Leadership Team',
    companyName: 'B-Sec Technologies Private Limited',
    address: 'Level 3, OMR IT Corridor, Thoraipakkam, Chennai, Tamil Nadu - 600097',
    phone: '+91 98840 54321',
    email: 'hr@bsectechnologies.com',
    gstin: '33AABCB5678M1ZQ',
    placeOfSupply: 'Tamil Nadu (33)',
    serviceCategory: 'Payroll',
    quoteType: 'Per Employee',
    currency: 'INR',
    subject: 'Proposal & Commercial Quotation for End-to-End Payroll & Statutory Compliance Services',
    scopeSections: [
      {
        title: 'A. Payroll Processing & Administration',
        items: [
          'Employee master data setup and ongoing updates',
          'Monthly salary computation (fixed, variable, LOP, overtime)',
          'Payslip generation & secure digital distribution',
          'Bank advice transfer statement preparation for direct salary credit',
          'New joinee documentation onboarding & full-and-final (F&F) settlement calculations'
        ]
      },
      {
        title: 'B. Statutory Compliance Support',
        items: [
          'Provident Fund (PF) monthly ECR & challan preparation',
          'Employees State Insurance (ESIC) monthly computation & filing',
          'Professional Tax (PT) state compliance & deduction reports',
          'TDS Section 192 salary tax computations and Form 16 annual generation'
        ]
      },
      {
        title: 'C. Reporting & Dedicated SPOC Advisory',
        items: [
          'Monthly Management Information System (MIS) salary cost analysis',
          'Departmental headcount & attrition reporting',
          'Dedicated Client SPOC for monthly compliance handholding'
        ]
      }
    ],
    exclusions: PAYROLL_SCOPE_TEMPLATES.exclusions,
    clientResponsibilities: PAYROLL_SCOPE_TEMPLATES.clientResponsibilities,
    items: [
      {
        id: '1',
        description:
          'Comprehensive Payroll Consultancy Services (Per Employee Per Month) – inclusive of monthly salary calculation, PF ECR, ESIC challan, PT return, TDS Sec 192 computation and employee support',
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
    taxRate: 0,
    taxType: 'none',
    taxAmount: 0,
    totalAmount: 1500,
    annualIllustration: 18000,
    advanceRequired: 0,
    balanceDue: 1500,
    paymentTerms:
      'Quote based on 15 employees. Additional employees billed at ₹100 per employee per month. Invoices raised at the beginning of each calendar month. Payment due within 10 business days.',
    notes:
      'Valid for 30 days from date of issue. Statutory duties (PF/ESIC/PT) are direct client liabilities. GST is currently not applicable under pre-registration threshold. Upon GST registration, GST will be charged at applicable rate.',
    status: 'Accepted',
    preparedBy: 'Bhavani (Founder)',
    internalApprover: 'Management Sign-off',
    convertedToInvoiceId: 'INV/2026-27/002',
    acceptedAt: '2026-07-28T14:30:00Z',
    createdAt: '2026-07-23T10:00:00Z',
    updatedAt: '2026-07-28T14:30:00Z'
  },
  {
    id: 'QTN-002',
    quoteNumber: 'QTN/2026-27/005',
    revision: 1,
    revisionCode: 'QTN/2026-27/005-R1',
    date: '2026-09-02',
    validityDays: 30,
    validUntil: '2026-10-02',
    clientId: 'CLI-103',
    clientName: 'Suresh Raina',
    companyName: 'NexWave Logistics Private Limited',
    address: '42 Ambattur Industrial Estate, Chennai, Tamil Nadu - 600058',
    phone: '+91 98401 23456',
    email: 'suresh@nexwavelogistics.in',
    gstin: '',
    placeOfSupply: 'Tamil Nadu (33)',
    serviceCategory: 'Business Launch 360',
    quoteType: 'Milestone',
    currency: 'INR',
    subject: 'Commercial Quotation for Integrated Corporate Setup, HR Foundation & Cloud Payroll (Launch 360°)',
    scopeSections: [
      {
        title: 'Phase 1: Corporate Structuring & Cloud Setup',
        items: [
          'MCA incorporation review and director compliance documentation',
          'Zoho Payroll cloud configuration & CTC component restructuring',
          'Employee handbook & employment contracts preparation'
        ]
      },
      {
        title: 'Phase 2: Monthly Execution Retainer',
        items: [
          'Monthly review-controlled payroll processing for 20 employees',
          'PF, ESI, Professional Tax, and TDS Section 192 compliance filing'
        ]
      }
    ],
    exclusions: PAYROLL_SCOPE_TEMPLATES.exclusions,
    clientResponsibilities: PAYROLL_SCOPE_TEMPLATES.clientResponsibilities,
    items: [
      {
        id: '1',
        description: 'One-Time Foundation & Cloud HR Setup (CTC restructuration, Zoho Payroll master, contracts)',
        quantity: 1,
        unit: 'Setup',
        rate: 22000,
        billingFrequency: 'One-Time',
        discount: 2000,
        amount: 20000
      },
      {
        id: '2',
        description: 'Monthly Payroll Retainer – 20 employees × ₹100 per employee per month',
        quantity: 20,
        unit: 'Emp/Mo',
        rate: 100,
        billingFrequency: 'Monthly',
        discount: 0,
        amount: 2000
      }
    ],
    subtotal: 24000,
    discount: 2000,
    netAfterDiscount: 22000,
    taxRate: 0,
    taxType: 'none',
    taxAmount: 0,
    totalAmount: 22000,
    annualIllustration: 44000,
    advanceRequired: 15000,
    balanceDue: 7000,
    paymentTerms: '₹15,000 advance on engagement; balance ₹7,000 on completion of setup. Monthly ₹2,000 billed on 1st of each calendar month.',
    notes: 'Revised scope with ₹2,000 partner courtesy discount approved by Management.',
    status: 'Approved',
    preparedBy: 'Keerthika (Partner)',
    internalApprover: 'Bhavani (Founder)',
    createdAt: '2026-09-02T11:00:00Z',
    updatedAt: '2026-09-03T15:20:00Z'
  }
];

// Seed Invoice 1: Shree Abhi Electricals (matches attached sample)
export const SEED_INVOICES: InvoiceRecord[] = [
  {
    id: 'INV-001',
    invoiceNumber: 'INV/2026-27/007',
    date: '2026-09-04',
    dueDate: '2026-09-14',
    quotationRef: 'QTN/2026-27/004',
    invoiceType: 'Advance',
    billingPeriod: 'One-Time Setup & September 2026',
    clientId: 'CLI-101',
    clientName: 'Director / Management',
    companyName: 'SHREE ABHI ELECTRICALS & ENGINEERING PRIVATE LIMITED',
    address: 'No. 14, Industrial Estate, Guindy, Chennai, Tamil Nadu - 600032',
    phone: '+91 98400 12345',
    email: 'accounts@shreeabhi.com',
    gstin: '33AAECS1234F1Z8',
    placeOfSupply: 'Tamil Nadu (33)',
    subject: 'Payroll Setup & Monthly Payroll Services – One-Time Setup Fee (Advance)',
    scopeItems: PAYROLL_SCOPE_TEMPLATES.setupAndReview,
    items: [
      {
        id: '1',
        description:
          'One-Time Payroll Setup & Review – review and verification of employee/payroll data, CTC & salary structure preparation, salary components/paysheet/payslip format setup, Zoho Payroll setup/configuration, employee master data setup, initial payroll calculation, validation and reconciliation, setup of required payroll reports and formats',
        quantity: 1,
        unit: 'Setup',
        rate: 25000,
        billingFrequency: 'One-Time',
        amount: 25000
      },
      {
        id: '2',
        description: 'Monthly Payroll & Compliance Services – 15 employees × ₹100 per employee per month',
        quantity: 15,
        unit: 'Emp/Mo',
        rate: 100,
        billingFrequency: 'Monthly',
        amount: 1500
      }
    ],
    subtotal: 26500,
    discount: 2000,
    netAfterDiscount: 24500,
    taxRate: 0,
    taxType: 'none',
    taxAmount: 0,
    totalPayable: 24500,
    advancePaid: 15000,
    tdsDeducted: 0,
    balanceDue: 9500,
    paymentTerms:
      'The One-Time Setup Fee is ₹23,000 (net of ₹2,000 discount on standard ₹25,000 fee), payable in two tranches: ₹15,000 advance payable now, and balance ₹8,000 payable upon completion of setup. Monthly payroll of ₹1,500 is billed monthly for 15 employees.',
    notes:
      'GST is presently not applicable under pre-registration threshold. Statutory liabilities (PF/ESIC/PT/TDS) are paid directly by client; our fee covers advisory and operational execution.',
    status: 'Issued',
    isRecurring: true,
    recurringHeadcount: 15,
    recurringPerEmpRate: 100,
    createdAt: '2026-09-04T09:30:00Z',
    updatedAt: '2026-09-04T09:30:00Z'
  },
  {
    id: 'INV-002',
    invoiceNumber: 'INV/2026-27/006',
    date: '2026-08-01',
    dueDate: '2026-08-11',
    quotationRef: 'QTN/2026-27/001',
    invoiceType: 'Per-Employee Recurring',
    billingPeriod: 'August 2026',
    clientId: 'CLI-102',
    clientName: 'Leadership Team',
    companyName: 'B-Sec Technologies Private Limited',
    address: 'Level 3, OMR IT Corridor, Thoraipakkam, Chennai, Tamil Nadu - 600097',
    phone: '+91 98840 54321',
    email: 'hr@bsectechnologies.com',
    gstin: '33AABCB5678M1ZQ',
    placeOfSupply: 'Tamil Nadu (33)',
    subject: 'End-to-End Monthly Payroll & Statutory Compliance Retainer – August 2026',
    scopeItems: PAYROLL_SCOPE_TEMPLATES.monthlyPayroll,
    items: [
      {
        id: '1',
        description: 'Comprehensive Monthly Payroll Consultancy Services (15 employees × ₹100/emp)',
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
    taxRate: 0,
    taxType: 'none',
    taxAmount: 0,
    totalPayable: 1500,
    advancePaid: 1500,
    tdsDeducted: 0,
    balanceDue: 0,
    paymentTerms: 'Payment due within 10 business days of monthly invoice date.',
    notes: 'Paid via NEFT on 2026-08-08. Receipt REC/2026-27/002 issued.',
    status: 'Paid',
    isRecurring: true,
    recurringHeadcount: 15,
    recurringPerEmpRate: 100,
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-08-08T16:00:00Z'
  }
];

export const SEED_PAYMENTS: PaymentRecord[] = [
  {
    id: 'PAY-001',
    receiptNumber: 'REC/2026-27/002',
    invoiceId: 'INV-002',
    invoiceNumber: 'INV/2026-27/006',
    clientId: 'CLI-102',
    clientName: 'Leadership Team',
    companyName: 'B-Sec Technologies Private Limited',
    amount: 1500,
    tdsDeducted: 0,
    paymentDate: '2026-08-08',
    paymentMode: 'NEFT / RTGS',
    utrReference: 'IDIBN26080812345',
    notes: 'Full payment for August 2026 payroll retainer.',
    createdAt: '2026-08-08T16:00:00Z'
  },
  {
    id: 'PAY-002',
    receiptNumber: 'REC/2026-27/003',
    invoiceId: 'INV-001',
    invoiceNumber: 'INV/2026-27/007',
    clientId: 'CLI-101',
    clientName: 'Director / Management',
    companyName: 'SHREE ABHI ELECTRICALS & ENGINEERING PRIVATE LIMITED',
    amount: 15000,
    tdsDeducted: 0,
    paymentDate: '2026-09-05',
    paymentMode: 'IMPS',
    utrReference: 'HDFCN26090598765',
    notes: 'Advance tranche 1 received for Payroll Setup.',
    createdAt: '2026-09-05T11:45:00Z'
  }
];

export const SEED_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'AUD-001',
    timestamp: '2026-07-23T10:00:00Z',
    user: 'Bhavani',
    role: 'Admin',
    action: 'CREATE_QUOTATION',
    entityType: 'Quotation',
    entityId: 'QTN/2026-27/001',
    details: 'Created baseline payroll quote for B-Sec Technologies (15 emps @ ₹100/mo).'
  },
  {
    id: 'AUD-002',
    timestamp: '2026-07-28T14:30:00Z',
    user: 'Bhavani',
    role: 'Admin',
    action: 'ACCEPT_QUOTATION',
    entityType: 'Quotation',
    entityId: 'QTN/2026-27/001',
    details: 'Client confirmed formal acceptance. Linked to onboarding schedule.'
  },
  {
    id: 'AUD-003',
    timestamp: '2026-08-01T10:00:00Z',
    user: 'Keerthika',
    role: 'Accounts',
    action: 'CONVERT_TO_INVOICE',
    entityType: 'Invoice',
    entityId: 'INV/2026-27/006',
    details: 'Converted QTN/2026-27/001 into August 2026 recurring invoice.'
  },
  {
    id: 'AUD-004',
    timestamp: '2026-09-04T09:30:00Z',
    user: 'Bhavani',
    role: 'Admin',
    action: 'CREATE_INVOICE',
    entityType: 'Invoice',
    entityId: 'INV/2026-27/007',
    details: 'Issued setup advance invoice to Shree Abhi Electricals with ₹2,000 courtesy discount.'
  }
];

// -------------------------------------------------------------
// Client-Side Persistence Keys & Getters / Setters
// -------------------------------------------------------------

const STORAGE_KEYS = {
  CLIENTS: 'ppc_billing_clients',
  QUOTATIONS: 'ppc_billing_quotations',
  INVOICES: 'ppc_billing_invoices',
  PAYMENTS: 'ppc_billing_payments',
  SETTINGS: 'ppc_billing_settings',
  AUDIT: 'ppc_billing_audit'
};

export function getStoredClients(): ClientRecord[] {
  if (typeof window === 'undefined') return SEED_CLIENTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CLIENTS);
    return raw ? JSON.parse(raw) : SEED_CLIENTS;
  } catch {
    return SEED_CLIENTS;
  }
}

export function saveClients(clients: ClientRecord[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
  window.dispatchEvent(new Event('ppc_clients_updated'));
}

export function getStoredQuotations(): QuotationRecord[] {
  if (typeof window === 'undefined') return SEED_QUOTATIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUOTATIONS);
    return raw ? JSON.parse(raw) : SEED_QUOTATIONS;
  } catch {
    return SEED_QUOTATIONS;
  }
}

export function saveQuotations(quotes: QuotationRecord[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.QUOTATIONS, JSON.stringify(quotes));
  window.dispatchEvent(new Event('ppc_quotations_updated'));
}

export function getStoredInvoices(): InvoiceRecord[] {
  if (typeof window === 'undefined') return SEED_INVOICES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INVOICES);
    return raw ? JSON.parse(raw) : SEED_INVOICES;
  } catch {
    return SEED_INVOICES;
  }
}

export function saveInvoices(invoices: InvoiceRecord[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
  window.dispatchEvent(new Event('ppc_invoices_updated'));
}

export function getStoredPayments(): PaymentRecord[] {
  if (typeof window === 'undefined') return SEED_PAYMENTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
    return raw ? JSON.parse(raw) : SEED_PAYMENTS;
  } catch {
    return SEED_PAYMENTS;
  }
}

export function savePayments(payments: PaymentRecord[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
  window.dispatchEvent(new Event('ppc_payments_updated'));
}

export function getStoredSettings(): OrgSettings {
  if (typeof window === 'undefined') return DEFAULT_ORG_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return raw ? JSON.parse(raw) : DEFAULT_ORG_SETTINGS;
  } catch {
    return DEFAULT_ORG_SETTINGS;
  }
}

export function saveSettings(settings: OrgSettings) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  window.dispatchEvent(new Event('ppc_settings_updated'));
}

export function getStoredAuditLogs(): AuditLogEntry[] {
  if (typeof window === 'undefined') return SEED_AUDIT_LOGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUDIT);
    return raw ? JSON.parse(raw) : SEED_AUDIT_LOGS;
  } catch {
    return SEED_AUDIT_LOGS;
  }
}

export function logAuditEvent(
  user: string,
  role: AuditLogEntry['role'],
  action: string,
  entityType: AuditLogEntry['entityType'],
  entityId: string,
  details: string
) {
  const current = getStoredAuditLogs();
  const newEntry: AuditLogEntry = {
    id: 'AUD-' + Date.now().toString(36).toUpperCase(),
    timestamp: new Date().toISOString(),
    user,
    role,
    action,
    entityType,
    entityId,
    details
  };
  const updated = [newEntry, ...current].slice(0, 200);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(updated));
    window.dispatchEvent(new Event('ppc_audit_updated'));
  }
  return newEntry;
}
