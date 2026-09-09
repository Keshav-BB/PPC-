export interface LeadMagnet {
  id: string;
  title: string;
  category: string;
  description: string;
  format: string;
  iconName: string;
  downloadCount: string;
  bullets: string[];
}

export const leadMagnets: LeadMagnet[] = [
  {
    id: 'startup-checklist',
    title: 'The Turnkey Startup Business Checklist',
    category: 'Business Setup',
    description: 'A complete step-by-step checklist for incorporating, licensing, and setting up operating bank accounts and compliance in India.',
    format: 'PDF Guide & Checklist (12 Pages)',
    iconName: 'ClipboardCheck',
    downloadCount: 'Popular Business Resource',
    bullets: [
      'Entity comparison matrix (Pvt Ltd vs LLP vs OPC)',
      'Statutory registration sequence (GST, MSME, PAN/TAN, PT)',
      'Bank resolution and initial capitalization protocol',
      'Founder vesting and IP assignment essentials'
    ]
  },
  {
    id: 'first-10-hr',
    title: 'First 10 Employees HR & Documentation Toolkit',
    category: 'HR & People',
    description: 'Practical HR documentation templates for hiring your foundational team without costly legal retainers.',
    format: 'Word & PDF Templates',
    iconName: 'Users',
    downloadCount: 'Foundational HR Toolkit',
    bullets: [
      'Standard employment agreement & NDA template',
      'Structured interview scorecard & evaluation rubrics',
      'Day 1 to Day 30 employee induction checklist',
      'Statutory declaration forms (Form 11, Form 2)'
    ]
  },
  {
    id: 'payroll-compliance',
    title: 'Annual Payroll & Statutory Compliance Calendar',
    category: 'Payroll & Compliance',
    description: 'Plan ahead for key statutory filing deadlines. Complete schedule of monthly and annual PF, ESI, Professional Tax, and TDS dates.',
    format: 'Wallchart & Digital Calendar',
    iconName: 'Calendar',
    downloadCount: 'Statutory Compliance Calendar',
    bullets: [
      'Exact monthly cutoffs for PF & ESI return submissions',
      'Quarterly TDS Form 24Q filing timelines',
      'State-wise Professional Tax schedule and slab guide',
      'Annual bonus and statutory leave audit checklist'
    ]
  },
  {
    id: 'business-sop',
    title: 'Standard Operating Procedure (SOP) Blueprint',
    category: 'Operations',
    description: 'The exact framework People Point uses to map business workflows and eliminate founder bottlenecks.',
    format: 'Interactive SOP Document Template',
    iconName: 'Workflow',
    downloadCount: 'Standard Operations Blueprint',
    bullets: [
      'Standard 5-section SOP formatting template',
      'Delegation of authority (DoA) matrix framework',
      'Departmental handover protocol template',
      'Process exception & escalation workflow'
    ]
  },
  {
    id: 'kra-kpi-framework',
    title: 'Role-Based KRA & KPI Performance Template',
    category: 'HR & Management',
    description: 'Quantifiable key result areas and performance indicators across Sales, Operations, Tech, and Customer Success.',
    format: 'Spreadsheet Matrix & Guide',
    iconName: 'Target',
    downloadCount: 'Performance Framework',
    bullets: [
      'Ready-to-use KPI rubrics for 15 core corporate roles',
      'Quarterly performance scoring formulas',
      'Self-evaluation vs manager appraisal weightings',
      'Performance improvement plan (PIP) structure'
    ]
  }
];
