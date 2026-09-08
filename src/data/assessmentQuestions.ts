export interface AssessmentQuestion {
  id: number;
  pillar: 'Setup' | 'HR' | 'Payroll' | 'Technology' | 'Operations' | 'Growth';
  pillarTitle: string;
  question: string;
  options: {
    label: string;
    points: number; // 0, 1, 2, 3
    hint?: string;
  }[];
}

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 1,
    pillar: 'Setup',
    pillarTitle: 'Legal & Entity Structure',
    question: 'How is your current business legally structured and registered?',
    options: [
      { label: 'Unregistered idea / Still planning the entity', points: 0, hint: 'High legal exposure' },
      { label: 'Sole proprietorship / Partnership without formal founder agreements', points: 1, hint: 'Basic structure' },
      { label: 'Registered Pvt Ltd or LLP, but pending some statutory licenses (GST/PT/MSME)', points: 2, hint: 'Partially compliant' },
      { label: 'Fully incorporated with active GST, MSME, bank accounts & founder agreements', points: 3, hint: 'Strong foundation' }
    ]
  },
  {
    id: 2,
    pillar: 'Setup',
    pillarTitle: 'Corporate Governance',
    question: 'Are your founder equity agreements, intellectual property assignments, and bank resolutions clearly documented?',
    options: [
      { label: 'No written agreements exist between stakeholders', points: 0 },
      { label: 'Informal email confirmations or handshake understandings', points: 1 },
      { label: 'Standard templates drafted but not legally finalized', points: 2 },
      { label: 'Legally vetted shareholder / founders agreements and IP assignment deeds in place', points: 3 }
    ]
  },
  {
    id: 3,
    pillar: 'HR',
    pillarTitle: 'Employment Contracts & Policies',
    question: 'Do all current employees and contractors have formal appointment letters, NDAs, and an employee handbook?',
    options: [
      { label: 'No formal offer letters or contracts issued', points: 0 },
      { label: 'Basic offer letters exist, but no NDAs, handbook, or leave policies', points: 1 },
      { label: 'Contracts exist for core staff, but policies are outdated or informal', points: 2 },
      { label: 'Complete documentation: appointment letters, NDAs, employee handbook & leave policies', points: 3 }
    ]
  },
  {
    id: 4,
    pillar: 'HR',
    pillarTitle: 'Role Clarity & KRA/KPIs',
    question: 'How do you measure employee accountability and performance?',
    options: [
      { label: 'Informal daily verbal check-ins with no documented metrics', points: 0 },
      { label: 'General job descriptions exist, but performance reviews are ad-hoc', points: 1 },
      { label: 'Quarterly reviews happen, but without clear quantifiable KRA/KPI rubrics', points: 2 },
      { label: 'Documented KRA/KPI matrices for every role with transparent appraisal benchmarks', points: 3 }
    ]
  },
  {
    id: 5,
    pillar: 'Payroll',
    pillarTitle: 'Payroll Processing & Payslips',
    question: 'How are monthly employee salaries calculated and disbursed?',
    options: [
      { label: 'Manual calculations on personal spreadsheets with ad-hoc bank transfers', points: 0 },
      { label: 'Spreadsheet-based payroll with frequent manual revisions and delays', points: 1 },
      { label: 'Basic software used, but manual effort needed for deductions and payslips', points: 2 },
      { label: 'Automated cloud payroll/HRMS system generating instant digital payslips', points: 3 }
    ]
  },
  {
    id: 6,
    pillar: 'Payroll',
    pillarTitle: 'Statutory Compliance (PF/ESI/PT)',
    question: 'Are your statutory employee contributions (PF, ESI, Professional Tax, TDS) deposited and filed on time every month?',
    options: [
      { label: 'Not registered or not deducting statutory components', points: 0 },
      { label: 'Occasional late filings and irregular challan reconciliations', points: 1 },
      { label: 'Filed mostly on time, but handled by ad-hoc third parties without verification', points: 2 },
      { label: '100% on-time filings with verified challans and annual return filings', points: 3 }
    ]
  },
  {
    id: 7,
    pillar: 'Technology',
    pillarTitle: 'Digital Presence & Website',
    question: 'Does your company have a modern, mobile-responsive, conversion-optimized website?',
    options: [
      { label: 'No website or only an outdated social media page', points: 0 },
      { label: 'Basic informational website that generates little to no inbound inquiries', points: 1 },
      { label: 'Decent website, but slow loading or lacking clear conversion funnels', points: 2 },
      { label: 'Lightning-fast, high-converting digital storefront with integrated lead capture', points: 3 }
    ]
  },
  {
    id: 8,
    pillar: 'Technology',
    pillarTitle: 'CRM & Workflow Automation',
    question: 'How are client inquiries and recurring operations managed inside your business?',
    options: [
      { label: 'Scattered across personal WhatsApp chats, sticky notes, and email inboxes', points: 0 },
      { label: 'Shared Google Sheets updated manually by staff', points: 1 },
      { label: 'CRM software installed, but used inconsistently without automated alerts', points: 2 },
      { label: 'Centralized CRM with automated WhatsApp/email notifications and pipeline stages', points: 3 }
    ]
  },
  {
    id: 9,
    pillar: 'Operations',
    pillarTitle: 'Standard Operating Procedures (SOPs)',
    question: 'If key team members are absent for 2 weeks, can the business operate seamlessly?',
    options: [
      { label: 'Operations stall completely; founder must personally intervene in everything', points: 0 },
      { label: 'Work continues with substantial errors and client delays', points: 1 },
      { label: 'Informal guidelines exist, but exceptions require founder guidance', points: 2 },
      { label: 'Comprehensive documented SOPs and checklists allow autonomous execution', points: 3 }
    ]
  },
  {
    id: 10,
    pillar: 'Operations',
    pillarTitle: 'Decision Matrix & MIS Reporting',
    question: 'Do you have structured financial approval limits and monthly executive MIS reports?',
    options: [
      { label: 'No financial limits; founder approves every single invoice and expense', points: 0 },
      { label: 'Verbal approval limits with delayed quarterly review of numbers', points: 1 },
      { label: 'Documented limits exist, but monthly financial reports take weeks to prepare', points: 2 },
      { label: 'Tiered approval matrix and structured monthly MIS showing margins and cash burn', points: 3 }
    ]
  },
  {
    id: 11,
    pillar: 'Growth',
    pillarTitle: 'Customer Acquisition Engine',
    question: 'Where do your new business leads and paying clients primarily come from?',
    options: [
      { label: 'Purely unpredictable word-of-mouth; zero proactive customer generation', points: 0 },
      { label: 'Occasional organic social posts with irregular inquiry volume', points: 1 },
      { label: 'Running ad campaigns, but with inconsistent lead quality or untracked costs', points: 2 },
      { label: 'Predictable multi-channel acquisition (paid ads, SEO, referrals) with clear ROI', points: 3 }
    ]
  },
  {
    id: 12,
    pillar: 'Growth',
    pillarTitle: 'Analytics & Funnel Tracking',
    question: 'Can you accurately track the exact cost per lead (CPL) and return on ad spend (ROAS)?',
    options: [
      { label: 'No marketing analytics or tracking installed', points: 0 },
      { label: 'Basic Google Analytics installed, but not tracking form submissions or sales', points: 1 },
      { label: 'Tracking leads, but unsure of conversion rates through the sales pipeline', points: 2 },
      { label: 'End-to-end UTM attribution from ad click to consultation and revenue won', points: 3 }
    ]
  }
];
