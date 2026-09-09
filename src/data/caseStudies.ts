export interface CaseStudy {
  id: string;
  clientTitle: string;
  industry: string;
  teamSize: string;
  challenge: string;
  approach: string;
  implementation: string[];
  results: string[];
  quote?: {
    text: string;
    author: string;
    role: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'b2b-supply-chain',
    clientTitle: 'Fast-Growing B2B Logistics Tech Venture',
    industry: 'Supply Chain & Logistics',
    teamSize: '15 to 45 employees over 12 months',
    challenge: 'The founders had validated strong commercial demand but were bogged down by manual incorporation delays, ad-hoc hiring without contracts, and zero payroll structure while raising institutional pre-seed capital.',
    approach: 'People Point deployed the Business Launch 360° model, appointing a dedicated SPOC to take full charge of corporate structuring, employment compliance, and cloud HRMS setup.',
    implementation: [
      'Expedited Pvt Ltd incorporation, DIN/DSC, and MSME/GST registration in 9 business days',
      'Created standardized employment contracts, NDAs, and an employee policy handbook',
      'Implemented cloud-based payroll system with automated PF, ESI, and PT deductions',
      'Built a conversion-optimized corporate web portal with automated customer inquiry forms'
    ],
    results: [
      'Successfully closed pre-seed funding on schedule with 100% clean legal diligence',
      'Consistent on-time payroll processing across 12 consecutive months of rapid hiring',
      'Founder saved approximately 20 hours per week previously spent on operational admin'
    ],
    quote: {
      text: 'People Point took the entire administrative and operational burden off our shoulders. Instead of juggling six independent agencies, we had one dependable team that got things done.',
      author: 'Managing Director',
      role: 'Founding Partner'
    }
  },
  {
    id: 'healthcare-diagnostics',
    clientTitle: 'Multi-Center Healthcare Diagnostic Network',
    industry: 'Healthcare & Clinical Diagnostics',
    teamSize: '35+ Staff across 3 branches',
    challenge: 'High frontline staff turnover, inconsistent attendance records, informal verbal appraisals, and missing SOPs resulted in customer wait-time complaints and disengaged staff.',
    approach: 'Conducted an onsite diagnostic and instituted our Operations & HR Foundation package, restructuring roles, introducing KRA/KPI scorecards, and digitizing staff shift tracking.',
    implementation: [
      'Authored standardized clinic operation SOPs covering patient check-in to sample reporting',
      'Designed objective KRA and KPI evaluation matrices for center managers and technicians',
      'Introduced cloud biometric attendance linked directly to automated monthly payroll',
      'Conducted employee induction workshops to align center staff with quality standards'
    ],
    results: [
      'Employee turnover dropped by 40% within the first 6 months of structured reviews',
      'Patient processing wait-times decreased by 25% following standard operating procedures',
      'Management received transparent weekly MIS dashboards on branch throughput'
    ],
    quote: {
      text: 'Having written SOPs and clear role KPIs transformed our clinics from disorganized daily firefighting to smooth, professional operations.',
      author: 'Operations Director',
      role: 'Healthcare Network'
    }
  },
  {
    id: 'dtc-lifestyle-brand',
    clientTitle: 'Omnichannel Direct-to-Consumer Brand',
    industry: 'Retail & E-commerce',
    teamSize: '22 Team Members',
    challenge: 'Expanding across Shopify, Amazon, and physical lifestyle popups led to scattered vendor payments, uncollected marketplace reconciliations, and unpredictable digital ad performance.',
    approach: 'Integrated Accounts & Backend Support alongside Performance Marketing to align customer acquisition with unit economics and margin clarity.',
    implementation: [
      'Centralized bookkeeping coordination across marketplace settlement sheets',
      'Implemented automated invoice matching and vendor payment aging reports',
      'Rebuilt Meta & Google Ads performance campaigns with custom landing page funnels',
      'Configured automated WhatsApp notifications for abandoned carts and order status'
    ],
    results: [
      'Identified and recovered ₹4.2 Lakhs in previously untracked marketplace deductions',
      'Cost-per-acquisition (CPA) on Meta campaigns improved by 34% with optimized funnels',
      'Audited financials delivered 3 months ahead of statutory filing deadlines'
    ],
    quote: {
      text: 'People Point provided both the backend accounting discipline and the digital marketing engine we needed to scale sustainably.',
      author: 'Co-Founder & CEO',
      role: 'D2C Retail'
    }
  }
];

export const testimonials = [
  {
    name: 'Rajesh Subramanian',
    designation: 'Founder & CEO',
    company: 'Apex Logistics Tech',
    service: 'Business Launch 360° & Payroll',
    feedback: 'People Point is the only partner that genuinely combines company registration, hiring documentation, and tech into one cohesive execution plan. They saved us months of wasted effort.',
    rating: 5
  },
  {
    name: 'Dr. Meera Krishnan',
    designation: 'Managing Director',
    company: 'ProHealth Diagnostic Centers',
    service: 'HR Operations & Process SOPs',
    feedback: 'The People Point leadership team brought incredible structure to our 35-person team. The KRA/KPI framework and SOPs gave our managers complete clarity and accountability.',
    rating: 5
  },
  {
    name: 'Arun Varma',
    designation: 'Co-Founder',
    company: 'Kavach FinTech Solutions',
    service: 'Technology & Workflow Automation',
    feedback: 'Aadhil and the tech team engineered our customer portal and automated WhatsApp notifications flawlessly. Their technical execution is clean, modern, and rapid.',
    rating: 5
  },
  {
    name: 'Pooja Anand',
    designation: 'Head of Operations',
    company: 'UrbanCraft Living',
    service: 'Accounts & Backend Support',
    feedback: 'Our books and vendor reconciliations are now updated like clockwork. The monthly MIS reports give our board exact clarity on margins and cash burn.',
    rating: 5
  }
];
