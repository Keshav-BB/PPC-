export interface SolutionItem {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  headline: string;
  subheadline: string;
  iconName: string;
  category: string;
  painPoints: string[];
  howWeHelp: string[];
  servicesIncluded: string[];
  deliverables: string[];
  targetAudience: string[];
  timeline: string;
  engagementModels: string[];
  caseStudyHighlight: {
    client: string;
    industry: string;
    challenge: string;
    solution: string;
    result: string;
  };
  faqs: { question: string; answer: string }[];
}

export const solutions: SolutionItem[] = [
  {
    id: 'business-setup',
    slug: 'business-setup',
    title: 'Business Setup & Registration',
    shortTitle: 'Business Setup',
    headline: 'Start Your Business With the Right Foundation.',
    subheadline: 'From entity structuring and incorporation to initial operations, we transform business ideas into legally solid, running enterprises.',
    iconName: 'Building2',
    category: 'Start',
    painPoints: [
      'Uncertainty about the right legal entity (Pvt Ltd, LLP, Sole Proprietorship).',
      'Complex regulatory filings, digital signatures, PAN/TAN and GST registration delays.',
      'Lack of an initial operating structure, leaving the founder overwhelmed with admin.',
      'Disjointed advice from isolated agents with no long-term business roadmap.'
    ],
    howWeHelp: [
      'End-to-end entity incorporation with expert structuring guidance.',
      'Complete statutory registrations (GST, MSME, Professional Tax, Shop & Establishment).',
      'Turnkey business launch checklist covering banking, compliance, and systems.',
      'Seamless handover to initial hiring, technology, and operating processes.'
    ],
    servicesIncluded: [
      'Company Incorporation (Private Limited, LLP, OPC, Partnership)',
      'Entity Structuring & Director DIN / DSC Filings',
      'Statutory Registrations: GST, MSME, PAN/TAN, PT',
      'Bank Account Opening Assistance & Resolution Drafting',
      'Initial Founders Agreement & MOA/AOA Alignment',
      'Turnkey Business Launch Operating Roadmap'
    ],
    deliverables: [
      'Certificate of Incorporation (COI) & Corporate Identification Number',
      'Official PAN & TAN cards and documentation folder',
      'GST Registration Certificate & MSME Udyam Certificate',
      'Master Launch Checklist & 90-day Operating Blueprint'
    ],
    targetAudience: [
      'First-time entrepreneurs launching a startup',
      'Freelancers or sole proprietorships transitioning into registered private companies',
      'International businesses incorporating an Indian subsidiary'
    ],
    timeline: '7 – 14 working days (subject to regulatory portal approvals)',
    engagementModels: ['One-Time Turnkey Project', 'Business Launch 360° Package'],
    caseStudyHighlight: {
      client: 'B2B Logistics Tech Venture',
      industry: 'Supply Chain & Logistics',
      challenge: 'Founders needed swift entity incorporation and tax approvals to close an institutional pre-seed round within 2 weeks.',
      solution: 'People Point expedited name reservation, DIN/DSC, Pvt Ltd registration, and banking resolutions in under 9 business days.',
      result: 'Incorporated smoothly on schedule, allowing prompt execution of investor agreements and bank account capitalization.'
    },
    faqs: [
      {
        question: 'Should I register as a Private Limited Company or an LLP?',
        answer: 'If you plan to raise equity funding or issue ESOPs, a Private Limited Company is the standard choice. For professional firms or bootstrap businesses prioritizing lower annual compliance overhead, an LLP is often more suitable. We evaluate your 3-year vision before recommending.'
      },
      {
        question: 'What documents are required to start?',
        answer: 'PAN card, Aadhaar / Passport, bank statement with current address, passport photos for directors, and electricity bill / rent agreement for the registered office premises.'
      }
    ]
  },
  {
    id: 'hr-people',
    slug: 'hr-people',
    title: 'HR & People Operations',
    shortTitle: 'HR & People',
    headline: 'Build the Team and People Systems Your Business Needs.',
    subheadline: 'End-to-end recruitment, compliant documentation, robust KRA/KPIs, and an empowering employee lifecycle architecture.',
    iconName: 'Users',
    category: 'Build',
    painPoints: [
      'Struggling to hire dependable talent without structured sourcing and screening.',
      'Informal or missing offer letters, non-disclosure agreements, and employment contracts.',
      'Unclear employee roles leading to accountability lapses, overlap, and finger-pointing.',
      'Absence of an employee handbook, leave policy, or performance assessment system.'
    ],
    howWeHelp: [
      'Full-funnel recruitment support from role definition to candidate onboarding.',
      'Standardized documentation: offer letters, contracts, NDAs, and company policy handbooks.',
      'Clear organization chart with measurable KRA/KPI frameworks for every role.',
      'Managed HR operations providing an objective, professional employee experience.'
    ],
    servicesIncluded: [
      'Talent Acquisition & Executive Search',
      'Job Descriptions & Structured Interview Scorecards',
      'Offer Letters, Non-Disclosure & Employment Agreements',
      'Employee Onboarding & Verification Systems',
      'HR Policy Formulation & Employee Handbook Creation',
      'Performance Management Systems (KRA & KPI Design)',
      'Attendance, Leave & Exit Management Frameworks'
    ],
    deliverables: [
      'Comprehensive Employee Handbook tailored to your culture',
      'Legally validated offer letter and employment contract templates',
      'Department-wise KRA / KPI matrices and evaluation scorecards',
      'Digital onboarding checklist and induction deck'
    ],
    targetAudience: [
      'Growing startups hiring their first 5 to 50 employees',
      'Established SMEs replacing informal verbal arrangements with professional HR',
      'Companies expanding departments needing structured hiring and performance rigor'
    ],
    timeline: '2 – 4 weeks for full HR Foundation setup; ongoing for Managed HR',
    engagementModels: ['HR Foundation Package', 'Monthly Retainer (Managed HR)', 'Recruitment Success Fee'],
    caseStudyHighlight: {
      client: 'Healthcare Services Provider (35 Employees)',
      industry: 'Healthcare & Diagnostics',
      challenge: 'High early turnover, informal verbal reviews, and zero documented policies caused confusion and misaligned incentives.',
      solution: 'People Point deployed standard job descriptions, KRA/KPI evaluation rubrics, an official handbook, and structured onboarding.',
      result: 'Employee attrition reduced by 40% in 6 months; quarterly performance reviews are now 100% data-backed and transparent.'
    },
    faqs: [
      {
        question: 'Can People Point manage our ongoing HR operations without us hiring an in-house HR Manager?',
        answer: 'Yes! Our Managed People Operations model serves as your dedicated, outsourced HR department handling documentation, employee queries, leave tracking, and appraisals at a fraction of an internal hire cost.'
      },
      {
        question: 'Do you assist with specialized technical or leadership hiring?',
        answer: 'Yes. We run specialized search campaigns with customized screening interviews to deliver pre-vetted, high-quality candidates.'
      }
    ]
  },
  {
    id: 'payroll-compliance',
    slug: 'payroll-compliance',
    title: 'Payroll & Compliance',
    shortTitle: 'Payroll & Compliance',
    headline: 'Accurate Payroll. Structured Compliance.',
    subheadline: 'Zero-defect monthly payroll processing, statutory deductions (PF, ESI, PT, TDS), automated payslips, and compliance peace-of-mind.',
    iconName: 'Receipt',
    category: 'Manage',
    painPoints: [
      'Manual spreadsheets causing salary miscalculations and late disbursement frustrations.',
      'Risk of severe penalties and notices due to delayed PF, ESI, or Professional Tax filings.',
      'Difficulty coordinating salary structures with tax savings and statutory allowances.',
      'Lack of a unified HRMS portal for employees to access payslips and tax sheets.'
    ],
    howWeHelp: [
      'Automated, error-free monthly payroll runs with built-in statutory computations.',
      'Punctual monthly PF, ESI, and PT return preparation and challan generation.',
      'Employee self-service setup for digital payslips and Form 16 / tax computation.',
      'Multi-currency / US-India cross-border payroll coordination with strict scope boundaries.'
    ],
    servicesIncluded: [
      'Monthly Payroll Processing & Salary Register Preparation',
      'Provident Fund (PF) & Employee State Insurance (ESI) Return Filings',
      'Professional Tax (PT) Deductions & Local Remittances',
      'TDS on Salary (Section 192) Computation & Form 24Q Support',
      'Digital Payslip Generation & Employee Query Support',
      'Cloud HRMS Implementation (GreytHR, Keka, Zoho People, or Custom)',
      'Scope-Bounded US / Cross-Border Payroll Support'
    ],
    deliverables: [
      'Monthly Bank Disbursement File & Detailed Payroll Summary',
      'Individual PDF Payslips with detailed earnings and deduction splits',
      'Statutory Challan receipts (PF, ESI, PT)',
      'Annual Form 16 preparation and Year-End Tax Statements'
    ],
    targetAudience: [
      'Companies with 5 to 500+ employees seeking comprehensive statutory compliance',
      'Founders currently wasting days each month calculating salaries manually',
      'Overseas entities needing disciplined India-based payroll and backend execution'
    ],
    timeline: 'Onboarding within 5 working days; monthly processing on standard cutoff',
    engagementModels: ['Monthly Retainer (Per-Employee-Per-Month or Fixed Tier)'],
    caseStudyHighlight: {
      client: 'SaaS Development Studio (55 Team Members)',
      industry: 'Software & Technology',
      challenge: 'Managing salaries via Excel sheets led to recurring errors in PF calculations, unpaid PT, and employee discontent.',
      solution: 'People Point deployed a cloud HRMS, restructured CTCs for tax efficiency, and took over end-to-end monthly processing.',
      result: 'Consistent on-time salary credit on the 1st of every month with proactive compliance filings across two fiscal years.'
    },
    faqs: [
      {
        question: 'How do you ensure confidentiality of sensitive employee salary data?',
        answer: 'We maintain strict role-based access, signed non-disclosure agreements, encrypted cloud storage, and dedicated account managers with need-to-know access.'
      },
      {
        question: 'Do you help migrate our existing payroll records from Excel into a modern HRMS?',
        answer: 'Yes, we handle complete historical data cleansing, leave balance adjustments, employee master verification, and smooth HRMS onboarding.'
      }
    ]
  },
  {
    id: 'technology',
    slug: 'technology',
    title: 'Technology Services',
    shortTitle: 'Technology',
    headline: 'Technology Built Around How Your Business Actually Works.',
    subheadline: 'High-performance web applications, custom business portals, CRM/HRMS integrations, and workflow automation engineered for real operations.',
    iconName: 'Code2',
    category: 'Digitize',
    painPoints: [
      'Using disconnected, generic software tools that don’t align with actual business workflows.',
      'Manual, repetitive copy-pasting of customer data between leads, spreadsheets, and emails.',
      'Outdated or slow websites that fail to convert high-intent commercial visitors.',
      'Lack of custom executive dashboards to view sales, leads, and operational health in real time.'
    ],
    howWeHelp: [
      'Tailor-made software and modern web applications built on robust tech stacks.',
      'Custom CRM implementation and WhatsApp/SMS notification automations.',
      'API integrations connecting sales, finance, inventory, and delivery pipelines.',
      'Ongoing technical maintenance, hosting architecture, and feature enhancements.'
    ],
    servicesIncluded: [
      'Custom Web Application Development (Next.js, React, Node, Python)',
      'Enterprise Business Websites & Conversion-Optimized Landing Pages',
      'CRM System Implementation & Customization (Frappe, HubSpot, Custom)',
      'Workflow Automation (Zapier, Make, n8n, Custom Webhooks)',
      'Real-Time Business Intelligence & Operational Dashboards',
      'Payment Gateway, SMS & WhatsApp Business API Integrations',
      'Cloud Hosting, SSL Security & Ongoing Technical Support'
    ],
    deliverables: [
      'Fully responsive, lightning-fast web application or website',
      'Clean, documented codebase with version control repository access',
      'Integrated CRM pipeline capturing incoming leads automatically',
      'Admin dashboard with role-based access control and analytics'
    ],
    targetAudience: [
      'Businesses requiring custom software to scale without hiring full-time developers',
      'Companies upgrading legacy portals to modern, mobile-friendly platforms',
      'Founders seeking end-to-end technical execution for digital products and platforms'
    ],
    timeline: '2 – 8 weeks depending on scope and feature complexity',
    engagementModels: ['Fixed-Scope Project', 'Dedicated Developer Retainer', 'Technical Maintenance AMC'],
    caseStudyHighlight: {
      client: 'Regional Commercial Distribution Network',
      industry: 'Wholesale & B2B Trade',
      challenge: 'Sales reps took orders on paper receipts and WhatsApp messages, resulting in dispatch delays and inventory mismatch.',
      solution: 'People Point engineered a responsive Next.js field-order app with real-time stock sync and automated WhatsApp notifications.',
      result: 'Order fulfillment cycle collapsed from 36 hours to 4 hours; order loss reduced to zero.'
    },
    faqs: [
      {
        question: 'Who owns the intellectual property and code of our custom software?',
        answer: 'You retain 100% intellectual property ownership upon milestone completion. We deliver full repository access and documentation.'
      },
      {
        question: 'Can you maintain and upgrade the application after launch?',
        answer: 'Yes! We offer monthly technical support retainers covering server uptime, security patches, backups, and ongoing feature updates.'
      }
    ]
  },
  {
    id: 'accounts-backend',
    slug: 'accounts-backend',
    title: 'Accounts & Backend Support',
    shortTitle: 'Accounts & Backend',
    headline: 'The Operational Backbone Behind Your Business.',
    subheadline: 'Dependable bookkeeping coordination, vendor invoice verification, record retention, and executive MIS reporting.',
    iconName: 'FileSpreadsheet',
    category: 'Manage',
    painPoints: [
      'Unorganized invoices and missing vendor payment records creating year-end chaos.',
      'Founders having no instant clarity on monthly gross margins or cash burn.',
      'Backlogged administrative paperwork distracting key leaders from revenue activities.',
      'Unreconciled bank statements resulting in delayed tax audits.'
    ],
    howWeHelp: [
      'Systematic recording of sales, purchase invoices, and expense vouchers.',
      'Rigorous monthly bank reconciliations and vendor ledger reviews.',
      'Monthly Management Information System (MIS) reports showing profit, burn, and runway.',
      'Centralized digital document archive for instant audit readiness.'
    ],
    servicesIncluded: [
      'Bookkeeping Coordination & Ledger Accounting Support',
      'Bank Reconciliation & Cash Flow Monitoring',
      'Accounts Payable & Vendor Documentation Management',
      'Accounts Receivable Tracking & Aging Analysis',
      'Monthly Management Information System (MIS) Reports',
      'Internal Record Management & Digital Archival Systems'
    ],
    deliverables: [
      'Monthly Financial Summary (P&L snapshot, cash balance, aging summary)',
      'Reconciled bank statements and cleared ledger reports',
      'Vendor balance confirmation statements',
      'Organized cloud document vault indexed for audit'
    ],
    targetAudience: [
      'Startups and SMEs that need structured accounting coordination without a full in-house team',
      'Multi-branch businesses requiring centralized invoice auditing and expense control',
      'Firms preparing for external audits, investor due diligence, or loan applications'
    ],
    timeline: 'Continuous monthly cycle with weekly or bi-weekly syncs',
    engagementModels: ['Monthly Retainer (Tiered based on transaction volume)'],
    caseStudyHighlight: {
      client: 'Direct-to-Consumer Apparel Brand',
      industry: 'Retail & E-commerce',
      challenge: 'Multiple sales channels (Shopify, Amazon, retail stalls) caused untracked returns, missing payments, and skewed tax calculations.',
      solution: 'People Point instituted centralized invoice tracking, channel-wise reconciliations, and weekly MIS dashboards.',
      result: 'Recovered ₹4.2 Lakhs in untracked marketplace deductions and delivered audit-ready books 3 months ahead of statutory deadlines.'
    },
    faqs: [
      {
        question: 'Do you work alongside our existing Chartered Accountant / Auditor?',
        answer: 'Absolutely. We act as your day-to-day accounts and backend operational bridge, preparing books, vouchers, and reconciliations so your statutory auditor can file annual returns swiftly.'
      },
      {
        question: 'Which accounting software do you support?',
        answer: 'We work across Tally Prime, Zoho Books, QuickBooks, and custom ERP systems based on your current setup.'
      }
    ]
  },
  {
    id: 'process-operations',
    slug: 'process-operations',
    title: 'Business Process & Operations',
    shortTitle: 'Operations & SOPs',
    headline: 'Replace Informal Operations With Repeatable Business Systems.',
    subheadline: 'Standard Operating Procedures (SOPs), organization hierarchy mapping, decision approval matrices, and operational performance audits.',
    iconName: 'Workflow',
    category: 'Operate',
    painPoints: [
      'The business cannot function when key individuals take leave or resign.',
      'Every minor decision gets escalated to the founder, creating a massive bottleneck.',
      'Inconsistent quality in client delivery and irregular service timelines.',
      'Tribal knowledge trapped in employees heads rather than documented processes.'
    ],
    howWeHelp: [
      'Complete workflow mapping to identify operational bottlenecks and redundancies.',
      'Creation of clear, step-by-step Standard Operating Procedures (SOPs).',
      'Design of hierarchical approval matrices that empower middle management.',
      'Periodic operational audits to ensure consistent execution and continuous improvement.'
    ],
    servicesIncluded: [
      'End-to-End Process Mapping & Flowcharting',
      'Standard Operating Procedure (SOP) Development & Documentation',
      'Departmental Workflow & Handover Protocols',
      'Delegation of Authority & Financial Approval Matrices',
      'Organization Structure Design & Role Clarity Blueprints',
      'Operational Waste Reduction & Efficiency Audits'
    ],
    deliverables: [
      'Comprehensive Operations Manual & Departmental SOP Binder',
      'Visual Process Flowcharts (BPMN standard)',
      'Approval Matrix Document detailing authority levels',
      'Process KPI Dashboard for tracking operational throughput'
    ],
    targetAudience: [
      'Founders trapped in daily firefighting who want their company to run on auto-pilot',
      'Growing SMEs scaling from 15 to 100+ team members',
      'Enterprises standardizing multi-location branch operations'
    ],
    timeline: '3 – 6 weeks for full process audit and SOP manual authoring',
    engagementModels: ['Operations Transformation Package', 'Project-Based Process Consulting'],
    caseStudyHighlight: {
      client: 'Industrial Equipment Fabrication Firm',
      industry: 'Manufacturing & Engineering',
      challenge: 'Client orders suffered repeated delays due to undocumented design approvals, uncoordinated inventory releases, and founder bottlenecks.',
      solution: 'People Point mapped the 14-step fulfillment cycle, authored role-based SOPs, and introduced a 3-tier digital approval gate.',
      result: 'On-time delivery climbed from 58% to 94%; founder operational time dropped by 18 hours per week.'
    },
    faqs: [
      {
        question: 'How do you ensure employees actually follow the SOPs instead of ignoring them?',
        answer: 'We design SOPs collaboratively with the employees who do the work daily, using simple visual checklists, video walkthroughs, and tie them directly to monthly KRA/KPI assessments.'
      },
      {
        question: 'Can SOPs be digitized and embedded into our project management software?',
        answer: 'Yes! We configure SOP checklists directly into platforms like Notion, ClickUp, Asana, or custom dashboards.'
      }
    ]
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    title: 'Digital Marketing & Growth',
    shortTitle: 'Digital Growth',
    headline: 'Turn Marketing Activity Into Measurable Business Growth.',
    subheadline: 'Performance advertising (Meta & Google Ads), conversion funnel optimization, SEO authority, and measurable revenue generation.',
    iconName: 'TrendingUp',
    category: 'Grow',
    painPoints: [
      'Spending money on digital ads with zero clear lead tracking or return on ad spend (ROAS).',
      'Website visitors leaving without submitting inquiries or phone numbers.',
      'Relying purely on word-of-mouth with no predictable customer acquisition engine.',
      'Confusing vanity metrics (likes, impressions) with actual qualified commercial leads.'
    ],
    howWeHelp: [
      'Data-driven performance campaigns on Meta (Facebook/Instagram) and Google Search.',
      'High-converting landing pages built with clear value propositions and strong CTAs.',
      'Search Engine Optimization (SEO) targeting high-intent commercial keywords.',
      'End-to-end UTM attribution connecting lead sources directly to closed sales.'
    ],
    servicesIncluded: [
      'Growth Strategy & Target Audience Profiling',
      'Performance Marketing (Meta Ads & Google Ads Management)',
      'High-Converting Landing Page Design & A/B Testing',
      'Technical & Commercial SEO Strategy',
      'Lead Generation Funnel Architecture & Nurture Sequences',
      'Campaign Analytics, ROAS Tracking & Executive Growth Dashboards'
    ],
    deliverables: [
      'Targeted ad campaigns launched across selected ad networks',
      'Conversion-optimized, mobile-responsive landing pages',
      'Real-time lead tracking dashboard with cost-per-lead (CPL) analytics',
      'Monthly performance review with actionable growth insights'
    ],
    targetAudience: [
      'B2B service firms seeking consistent qualified inquiries every week',
      'Direct-to-consumer and retail brands looking to scale customer acquisition profitably',
      'Startups needing predictable customer acquisition to prove unit economics'
    ],
    timeline: 'Campaign setup in 7 days; continuous optimization on 30-day cycles',
    engagementModels: ['Monthly Performance Retainer + Ad Spend Management'],
    caseStudyHighlight: {
      client: 'B2B Corporate Training Academy',
      industry: 'Education & Professional Services',
      challenge: 'High cost per lead (₹1,850/lead) on generic Google search ads with low conversion to paid corporate workshops.',
      solution: 'People Point redesigned the landing page, built audience retargeting funnels, and optimized search intent keywords.',
      result: 'Qualified cost-per-lead dropped by 62% to ₹703/lead, generating 84 high-value enterprise inquiries in the first quarter.'
    },
    faqs: [
      {
        question: 'Do you manage our ad budget directly, or do we pay the ad networks directly?',
        answer: 'You pay Google and Meta directly through your own ad account. This gives you 100% transparency on ad spend. We charge a management and optimization fee.'
      },
      {
        question: 'How quickly can we expect qualified leads once campaigns go live?',
        answer: 'Paid search and social ads typically start driving inbound inquiries within 48 to 72 hours of launch. We optimize iteratively based on lead quality.'
      }
    ]
  }
];
