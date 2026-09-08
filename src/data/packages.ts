export interface PackageItem {
  id: string;
  name: string;
  tagline: string;
  bestFor: string;
  isPopular?: boolean;
  indicativeScope: string[];
  timeline: string;
  engagementType: string;
  deliverables: string[];
}

export const packages: PackageItem[] = [
  {
    id: 'launch-360',
    name: 'Business Launch 360°',
    tagline: 'Our Flagship Turnkey Offering — Move from Idea to Running Business in 30 Days.',
    bestFor: 'First-time founders and entrepreneurs who need an execution-ready business without coordinating 6 different vendors.',
    isPopular: true,
    indicativeScope: [
      'Company Incorporation & Entity Structuring (Pvt Ltd / LLP)',
      'Statutory Registrations: GST, MSME, PAN/TAN, PT',
      'Banking Resolutions & Financial Setup',
      'Foundational HR Structure: Employment Contracts, Policies & Onboarding Deck',
      'High-Converting Corporate Website & Professional Email Setup',
      'Core Process Blueprint & Master Operating Checklist',
      'Initial Lead Generation & Growth Roadmap'
    ],
    timeline: '3 to 4 Weeks',
    engagementType: 'Turnkey Project with 60-day Post-Launch Support',
    deliverables: [
      'Incorporation Certificate & Registered Compliance Kit',
      'Live, High-Converting Business Website & Domain Setup',
      'Standard Employment Agreements & Onboarding Pack',
      'Dedicated Account SPOC coordinating all internal delivery'
    ]
  },
  {
    id: 'hr-foundation',
    name: 'HR Foundation',
    tagline: 'Establish Professional People Systems for High-Performance Teams.',
    bestFor: 'Startups and SMEs hiring their first 5–30 employees without an internal HR department.',
    indicativeScope: [
      'Comprehensive Employee Policy Handbook',
      'Standard Offer Letters, NDAs & Employment Contracts',
      'Structured Onboarding & Induction Framework',
      'Department-wise KRA & KPI Rubrics',
      'Cloud HRMS Selection & System Configuration',
      'Attendance, Leave & Exit Process Setup'
    ],
    timeline: '2 to 3 Weeks',
    engagementType: 'One-Time Implementation Project',
    deliverables: [
      'Tailored Employee Handbook & Policy Repository',
      'Custom KRA / KPI Scorecards for all active roles',
      'Fully configured HRMS database & employee records'
    ]
  },
  {
    id: 'managed-hr',
    name: 'Managed People Operations',
    tagline: 'Your End-to-End Outsourced HR Department.',
    bestFor: 'Growing teams (10 to 100+ employees) needing daily HR rigor, documentation, and employee support.',
    indicativeScope: [
      'Ongoing Employee Lifecycle Management',
      'Candidate Sourcing & Initial Screening Support',
      'Documentation of Promotions, Appraisals & Role Changes',
      'Quarterly Performance Review Coordination',
      'Employee Grievance Handling & Engagement Touchpoints',
      'Offboarding & Exit Interview Management'
    ],
    timeline: 'Ongoing Monthly Retainer',
    engagementType: 'Dedicated People Operations Partner',
    deliverables: [
      'Dedicated HR Business Partner assigned to your account',
      'Monthly HR Metrics Report (Turnover, Attendance, Appraisals)',
      'Zero-delay documentation for all employee requests'
    ]
  },
  {
    id: 'payroll-compliance',
    name: 'Payroll & Compliance',
    tagline: 'Precision Payroll with Ironclad Statutory Adherence.',
    bestFor: 'Employers of any size looking for zero payroll errors and timely PF/ESI/PT/TDS compliance.',
    indicativeScope: [
      'Monthly Payroll Run & Salary Computations',
      'PF, ESI & Professional Tax Challan Generation & Filings',
      'TDS on Salary Deductions & Form 24Q Support',
      'Automated Digital Payslip Distribution',
      'Year-End Form 16 Preparation',
      'Employee Tax & Deduction Query Support'
    ],
    timeline: 'Monthly Cycle (Standard Cutoff Schedule)',
    engagementType: 'Monthly Managed Retainer (Per-Employee or Tiered)',
    deliverables: [
      'Bank disbursement file ready on scheduled date',
      'Official statutory filing receipts and challans',
      'Cloud payslip portal for all employees'
    ]
  },
  {
    id: 'digital-setup',
    name: 'Digital Business Setup',
    tagline: 'Modern Digital Infrastructure Engineered for Conversion and Scale.',
    bestFor: 'Companies ready to modernize their digital presence, automate lead flows, and implement custom CRM.',
    indicativeScope: [
      'Custom Next.js Business Website / Web Application',
      'Mobile-First Responsive UI/UX with High Conversion CTAs',
      'CRM Setup & Lead Automation (WhatsApp & Email Alerts)',
      'Business Intelligence Dashboards for Sales & Operations',
      'Payment Gateway, Analytics & Cloud Hosting Architecture'
    ],
    timeline: '3 to 6 Weeks',
    engagementType: 'Project Milestone or Technical Retainer',
    deliverables: [
      'Production-deployed web application with SSL & CDN',
      'Live CRM capturing website leads instantly',
      'Executive dashboard tracking site metrics and inquiries'
    ]
  },
  {
    id: 'ops-transformation',
    name: 'Operations Transformation',
    tagline: 'Turn Chaos Into a Self-Managing Business Machine.',
    bestFor: 'Founders caught in daily operational bottlenecks who want to delegate with confidence.',
    indicativeScope: [
      'End-to-End Operational Workflow Audit',
      'Comprehensive Standard Operating Procedures (SOPs)',
      'Departmental Handovers & Communication Protocols',
      'Delegation of Authority & Approval Gateways',
      'Monthly Management Information System (MIS) Framework',
      'Automation Opportunities Analysis'
    ],
    timeline: '4 to 6 Weeks',
    engagementType: 'Strategic Business Consulting Project',
    deliverables: [
      'Standard Operating Procedures (SOP) Manual',
      'Organization Matrix with explicit decision boundaries',
      'Actionable Efficiency & Automation Roadmap'
    ]
  },
  {
    id: 'complete-partner',
    name: 'Complete Business Partner',
    tagline: 'All-in-One Operations, People & Tech Leadership Under One Roof.',
    bestFor: 'Fast-scaling companies requiring a unified, multi-functional co-pilot across HR, Tech, Ops, and Growth.',
    indicativeScope: [
      'Integrated People Operations + Payroll & Compliance',
      'Custom Software Development & Ongoing Tech AMC',
      'Continuous Process Refinement & MIS Reporting',
      'Performance Marketing & Lead Generation Support',
      'Direct Weekly Leadership Sync with People Point Partners'
    ],
    timeline: 'Quarterly or Annual Strategic Retainer',
    engagementType: 'Strategic Multi-Disciplinary Partnership',
    deliverables: [
      'Unified Single Point of Contact (SPOC) coordination',
      'Cross-functional team allocated to your business',
      'Monthly Executive Strategic Review & Roadmap Tuning'
    ]
  }
];

export const engagementModels = [
  {
    title: 'One-Time Turnkey Project',
    description: 'Fixed-scope, milestone-driven delivery with clear deadlines and upfront deliverables. Ideal for Business Setup, SOP authoring, or Website launches.',
    icon: 'CheckCircle2'
  },
  {
    title: 'Monthly Retainer',
    description: 'Consistent, ongoing management of essential recurring functions such as Payroll, Managed HR, Technical AMC, and Performance Marketing.',
    icon: 'CalendarClock'
  },
  {
    title: 'Dedicated Resource Allocation',
    description: 'A dedicated specialist (such as an HR Manager or Full-Stack Developer) integrated into your daily workflow under People Point supervision.',
    icon: 'UserCheck'
  },
  {
    title: 'Managed Business Function',
    description: 'We take full operational responsibility for a complete department (e.g., complete HR & Payroll or entire Backend Operations), backed by SLAs.',
    icon: 'Briefcase'
  },
  {
    title: 'Transformation / Multi-Function Partner',
    description: 'Our most integrated model: we embed across People, Process, and Technology simultaneously to accelerate business scale.',
    icon: 'Layers'
  }
];
