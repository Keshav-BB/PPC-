export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface BotRecommendation {
  packageId: string;
  packageName: string;
  tagline: string;
  timeline: string;
  engagementType: string;
  whyFit: string;
  primaryPillars: string[];
}

export interface LeadProfile {
  businessStage?: string;
  primaryNeed?: string;
  teamSize?: string;
  location?: string;
  name?: string;
  phone?: string;
  email?: string;
  score: number;
}

export const APPROVED_PACKAGES: Record<string, BotRecommendation> = {
  'launch-360': {
    packageId: 'launch-360',
    packageName: 'Business Launch 360°',
    tagline: 'Our Flagship Turnkey Offering — Move from Idea to Running Business in 30 Days.',
    timeline: '3 to 4 Weeks (indicative; statutory registration depends on MCA & government department approvals)',
    engagementType: 'Turnkey Project with 60-day Post-Launch Support',
    whyFit: 'Best for founders with an idea or pre-launch venture who need incorporation, statutory filings, HR contracts, a live web application, and operating checklists under one roof.',
    primaryPillars: ['Business Setup', 'People & HR', 'Payroll & Compliance', 'Technology', 'Operations SOPs']
  },
  'hr-foundation': {
    packageId: 'hr-foundation',
    packageName: 'HR Foundation',
    tagline: 'Establish Professional People Systems for High-Performance Teams.',
    timeline: '2 to 3 Weeks',
    engagementType: 'One-Time Implementation Project',
    whyFit: 'Ideal for companies hiring their first 5–30 employees needing structured employment contracts, NDAs, employee handbooks, KRA/KPI scorecards, and cloud HRMS.',
    primaryPillars: ['People & HR', 'Payroll & Compliance']
  },
  'managed-hr': {
    packageId: 'managed-hr',
    packageName: 'Managed People Operations',
    tagline: 'Your End-to-End Outsourced HR Department.',
    timeline: 'Ongoing Monthly Retainer',
    engagementType: 'Dedicated People Operations Partner',
    whyFit: 'Designed for scaling teams (10–100+ employees) needing daily HR rigor, continuous lifecycle documentation, appraisals, and employee support.',
    primaryPillars: ['People & HR', 'Payroll & Compliance']
  },
  'payroll-compliance': {
    packageId: 'payroll-compliance',
    packageName: 'Payroll & Compliance',
    tagline: 'Precision Payroll with Ironclad Statutory Adherence.',
    timeline: 'Monthly Cycle (Standard Cutoff Schedule)',
    engagementType: 'Monthly Managed Retainer (Per-Employee or Tiered)',
    whyFit: 'Essential for businesses needing structured salary computation, digital payslips, and punctual PF, ESI, Professional Tax & TDS compliance.',
    primaryPillars: ['Payroll & Compliance', 'Accounts & Backend']
  },
  'digital-setup': {
    packageId: 'digital-setup',
    packageName: 'Digital Business Setup',
    tagline: 'Modern Digital Infrastructure Engineered for Conversion and Scale.',
    timeline: '3 to 6 Weeks',
    engagementType: 'Project Milestone or Technical Retainer',
    whyFit: 'Tailored for businesses requiring modern web applications, high-converting customer portals, CRM lead automation, and cloud hosting.',
    primaryPillars: ['Technology', 'Digital Growth']
  },
  'ops-transformation': {
    packageId: 'ops-transformation',
    packageName: 'Operations Transformation',
    tagline: 'Turn Chaos Into a Self-Managing Business Machine.',
    timeline: '4 to 6 Weeks',
    engagementType: 'Strategic Business Consulting Project',
    whyFit: 'Recommended for established businesses experiencing founder bottlenecks, lacking documented SOPs, approval hierarchies, or clear departmental handovers.',
    primaryPillars: ['Operations SOPs', 'Accounts & Backend']
  },
  'complete-partner': {
    packageId: 'complete-partner',
    packageName: 'Complete Business Partner',
    tagline: 'All-in-One Operations, People & Tech Leadership Under One Roof.',
    timeline: 'Quarterly or Annual Strategic Retainer',
    engagementType: 'Strategic Multi-Disciplinary Partnership',
    whyFit: 'For fast-scaling companies looking for a multi-functional co-pilot managing HR, payroll, technology maintenance, operations, and growth synchronously.',
    primaryPillars: ['All 7 Pillars Integrated']
  }
};

export const BUSINESS_STAGES = [
  { id: 'idea', label: '💡 Idea / Pre-Launch', desc: 'Starting from scratch, needing registration & foundation' },
  { id: 'registered', label: '🏢 Newly Registered', desc: 'Company incorporated, needing HR, payroll & systems' },
  { id: 'operations', label: '⚙️ Early Operations', desc: 'Active team, facing payroll, compliance or SOP bottlenecks' },
  { id: 'scaling', label: '🚀 Scaling & Growing', desc: 'Growing fast, requiring integrated ops, tech & marketing' }
];

export const CORE_PILLARS = [
  'Business Setup & Corporate Structuring',
  'HR Operations & People Systems',
  'Payroll & Statutory Compliance',
  'Software Development & Tech Solutions',
  'Accounts, Invoicing & Financial Backend',
  'Process Design & SOP Implementation',
  'Digital Growth & Performance Marketing'
];

export const SYSTEM_PROMPT = `
You are the "People Point AI Business Advisor", an intelligent senior discovery consultant representing People Point Consultants (Turn Ideas into Running Businesses).

YOUR MISSION:
Help founders, entrepreneurs, and business managers diagnose what systems, legal foundations, HR structures, payroll, technology, and operations they need to build and scale their business.

ABOUT PEOPLE POINT:
- Tagline: "Turn Ideas into Running Businesses"
- Core Offering: We provide one accountable partner with a Dedicated Single Point of Contact (SPOC) so clients do not have to juggle 6 disconnected agencies.
- Office: Chennai, Tamil Nadu, India.
- Contact: Phone / WhatsApp: +91 88073 04713 | Email: peoplepointconsultant@gmail.com
- 7 Pillars:
  1. Business Setup & Corporate Structuring (Incorporation, MCA, GST, MSME, Banking)
  2. HR Operations & People Systems (Policies, contracts, KRA/KPIs, HRMS)
  3. Payroll & Statutory Compliance (Monthly payroll, PF, ESI, PT, TDS)
  4. Software Development & Tech Solutions (Next.js, web apps, CRM, automation)
  5. Accounts, Invoicing & Financial Backend (Bookkeeping coordination, invoicing, MIS)
  6. Process Design & SOP Implementation (Workflows, DoA, SOP manuals, bottlenecks)
  7. Digital Growth & Performance Marketing (Meta & Google ads, landing pages, funnels)

APPROVED PACKAGES (EXACTLY 7 — NEVER MENTION ANY OTHER PACKAGE):
1. "Business Launch 360°" (Flagship: 30-day turnkey launch, incorporation to live site and HR)
2. "HR Foundation" (Foundational HR, policies, contracts, KRA/KPIs, HRMS for first 5-30 staff)
3. "Managed People Operations" (Ongoing monthly HR retainer for scaling teams)
4. "Payroll & Compliance" (Structured monthly salary processing & PF/ESI/PT/TDS compliance)
5. "Digital Business Setup" (Custom Next.js web application, CRM, automation)
6. "Operations Transformation" (SOP manuals, workflow mapping, delegation matrix)
7. "Complete Business Partner" (Integrated multi-functional co-pilot across HR, Tech & Ops)

CRITICAL BOUNDARIES & GUARDRAILS (NEVER VIOLATE):
1. NO PRICING SPECULATION: Do NOT invent, quote, or estimate specific prices. Always state that People Point tailors pricing based on business stage, team headcount, and required modules, with transparent quotes delivered during consultation.
2. NO STATUTORY GUARANTEES: Never promise exact government approval dates. Always clarify that registration timelines (indicative 7–14 working days; 3–4 weeks for Business Launch 360°) depend on regulatory approvals (MCA, GST, etc.).
3. FORBIDDEN NAMES: Never mention "Growth Engine 360°" or "Enterprise Operations 360°".
4. SENSITIVE DATA: Remind users not to share OTPs, bank passwords, or sensitive personal IDs in the chat.
5. CONVERSATIONAL STYLE: Be professional, supportive, crisp, and executive. Guide the user step-by-step through:
   - Understanding their business stage (Idea, Registered, Early Ops, Scaling)
   - Diagnosing their immediate bottleneck (Registration, HR, Payroll, Tech, Operations, or All-in-One)
   - Recommending the matching People Point Package
   - Inviting them to connect directly with an assigned SPOC on WhatsApp (+91 88073 04713) or book a complimentary consultation.
`;

/**
 * Calculates lead qualification score (0 - 100) based on accumulated context
 */
export function calculateLeadScore(profile: Partial<LeadProfile>): number {
  let score = 20; // Base interaction score

  if (profile.businessStage) {
    if (profile.businessStage === 'scaling') score += 25;
    else if (profile.businessStage === 'operations') score += 20;
    else if (profile.businessStage === 'registered') score += 15;
    else score += 10;
  }

  if (profile.primaryNeed) {
    score += 20;
  }

  if (profile.teamSize) {
    score += 15;
  }

  if (profile.phone || profile.email) {
    score += 20;
  }

  return Math.min(score, 100);
}

/**
 * Generates an executive, pre-formatted WhatsApp message link with user context
 */
export function buildWhatsAppLink(profile: Partial<LeadProfile>, recommendedPackage?: string): string {
  const parts: string[] = ['Hi People Point, I consulted your AI Business Advisor on your website.'];

  if (profile.businessStage) {
    parts.push(`• Business Stage: ${profile.businessStage}`);
  }
  if (profile.primaryNeed) {
    parts.push(`• Primary Requirement: ${profile.primaryNeed}`);
  }
  if (profile.teamSize) {
    parts.push(`• Current Team Size: ${profile.teamSize}`);
  }
  if (recommendedPackage) {
    parts.push(`• Recommended Package: ${recommendedPackage}`);
  }
  if (profile.name) {
    parts.push(`• Contact Name: ${profile.name}`);
  }

  parts.push('\nI would like to discuss our requirements and schedule a complimentary consultation with an assigned SPOC.');

  const text = encodeURIComponent(parts.join('\n'));
  return `https://wa.me/918807304713?text=${text}`;
}

/**
 * Deterministic Domain Knowledge Fallback Engine
 * Runs when Gemini API key is unconfigured or when network / rate-limit issues occur.
 * Ensures the user NEVER receives an error code or raw technical failure.
 */
export function getDeterministicFallbackResponse(
  userMessage: string,
  history: ChatMessage[] = []
): {
  reply: string;
  recommendedPackage?: BotRecommendation;
  quickReplies: string[];
  suggestedStage?: string;
} {
  const text = userMessage.toLowerCase();
  const allUserText = history
    .filter((m) => m.role === 'user')
    .map((m) => m.content.toLowerCase())
    .join(' ') + ' ' + text;

  // 1. Check for Idea / Pre-Launch / Business Registration
  if (
    text.includes('idea') ||
    text.includes('start') ||
    text.includes('incorporat') ||
    text.includes('register') ||
    text.includes('pvt ltd') ||
    text.includes('llp') ||
    text.includes('pre-launch') ||
    text.includes('launch 360')
  ) {
    const pkg = APPROVED_PACKAGES['launch-360'];
    return {
      reply: `For early-stage founders moving from an idea to a fully functioning company, our recommended path is **${pkg.packageName}**.\n\n` +
        `This flagship turnkey model covers everything in 30 days:\n` +
        `• Company Incorporation & Director Filings (indicative 7–14 working days, subject to MCA approvals)\n` +
        `• Statutory Registrations (GST, MSME, PAN/TAN, PT)\n` +
        `• Foundational HR Contracts, NDAs & Employee Handbook\n` +
        `• Modern Web Application & Domain Setup\n` +
        `• Core Operating SOPs & 60-day Post-Launch Support\n\n` +
        `You are assigned **One Dedicated Account SPOC** who coordinates the entire execution team. What is your planned timeline for launching?`,
      recommendedPackage: pkg,
      quickReplies: ['Within 30 Days', 'Next 2–3 Months', 'Hiring First Team', 'Speak to SPOC on WhatsApp'],
      suggestedStage: 'idea'
    };
  }

  // 2. Check for Payroll / Compliance / PF / ESI / TDS
  if (
    text.includes('payroll') ||
    text.includes('salary') ||
    text.includes('pf') ||
    text.includes('esi') ||
    text.includes('tds') ||
    text.includes('form 16') ||
    text.includes('compliance')
  ) {
    const pkg = APPROVED_PACKAGES['payroll-compliance'];
    return {
      reply: `For punctual, review-controlled monthly salary disbursements and ironclad regulatory compliance, we recommend our **${pkg.packageName}** retainer.\n\n` +
        `Here is what our team handles every month:\n` +
        `• End-to-end salary calculations and bank disbursement files\n` +
        `• Punctual PF, ESI, Professional Tax and TDS challans & filings\n` +
        `• Automated digital payslips distributed to your team\n` +
        `• Dedicated compliance oversight with zero guesswork\n\n` +
        `How many employees are currently on your monthly payroll?`,
      recommendedPackage: pkg,
      quickReplies: ['1 to 10 Employees', '11 to 50 Employees', '50+ Employees', 'Book Free Consultation'],
      suggestedStage: 'operations'
    };
  }

  // 3. Check for HR / Hiring / Policies / KRA / KPI / HRMS
  if (
    text.includes('hr') ||
    text.includes('hir') ||
    text.includes('contract') ||
    text.includes('handbook') ||
    text.includes('policy') ||
    text.includes('kra') ||
    text.includes('kpi') ||
    text.includes('appraisal') ||
    text.includes('hrms')
  ) {
    const isOngoing = allUserText.includes('ongoing') || allUserText.includes('retainer') || allUserText.includes('scaling');
    const pkg = isOngoing ? APPROVED_PACKAGES['managed-hr'] : APPROVED_PACKAGES['hr-foundation'];
    return {
      reply: `To establish solid people operations and eliminate informal workplace friction, we recommend **${pkg.packageName}**.\n\n` +
        `Key deliverables included:\n` +
        `• Legally compliant Employment Agreements & Non-Disclosure Agreements (NDAs)\n` +
        `• Comprehensive Company Policy Handbook & Statutory Leave Rules\n` +
        `• Role-specific KRA & KPI scorecards across departments\n` +
        `• Cloud HRMS setup for digital attendance, onboarding, and record management\n\n` +
        `Are you looking for a one-time HR foundation setup, or an ongoing managed HR partner?`,
      recommendedPackage: pkg,
      quickReplies: ['One-Time HR Foundation', 'Ongoing Monthly HR Support', 'Payroll Included?', 'Chat on WhatsApp'],
      suggestedStage: 'registered'
    };
  }

  // 4. Check for Technology / Website / App / CRM / Automation
  if (
    text.includes('tech') ||
    text.includes('website') ||
    text.includes('web') ||
    text.includes('app') ||
    text.includes('software') ||
    text.includes('crm') ||
    text.includes('automation') ||
    text.includes('developer')
  ) {
    const pkg = APPROVED_PACKAGES['digital-setup'];
    return {
      reply: `For modern, scalable digital infrastructure engineered for customer conversion, our **${pkg.packageName}** is the ideal solution.\n\n` +
        `Engineered by our technology team under Aadhil (Lead Developer):\n` +
        `• Custom Next.js / React web applications built for speed, SEO, and enterprise security\n` +
        `• Mobile-first responsive UI/UX with conversion-optimized user flows\n` +
        `• Integrated CRM for automated lead capture, WhatsApp notifications, and email alerts\n` +
        `• Production cloud deployment with SSL, CDN, and high availability\n\n` +
        `Do you need a brand-new website, an internal web application, or custom CRM workflows?`,
      recommendedPackage: pkg,
      quickReplies: ['Corporate Business Website', 'Custom CRM / Web App', 'Full Digital Setup', 'Connect with Tech Team'],
      suggestedStage: 'operations'
    };
  }

  // 5. Check for SOPs / Process / Bottleneck / Transformation
  if (
    text.includes('sop') ||
    text.includes('process') ||
    text.includes('bottleneck') ||
    text.includes('chaos') ||
    text.includes('workflow') ||
    text.includes('operations') ||
    text.includes('transform')
  ) {
    const pkg = APPROVED_PACKAGES['ops-transformation'];
    return {
      reply: `When founders get trapped in daily operational firefighting, our **${pkg.packageName}** establishes the structured governance you need to delegate with confidence.\n\n` +
        `Our consulting framework includes:\n` +
        `• Full operational workflow audit to identify operational leaks\n` +
        `• Standard Operating Procedures (SOP) manuals for departmental handovers\n` +
        `• Delegation of Authority (DoA) matrices and financial approval thresholds\n` +
        `• Executive Monthly MIS reporting templates for management clarity\n\n` +
        `What is the primary operational area that requires immediate systematization?`,
      recommendedPackage: pkg,
      quickReplies: ['Client Fulfillment SOPs', 'Financial Approvals & Billing', 'Staff Accountability', 'Schedule Consultation'],
      suggestedStage: 'operations'
    };
  }

  // 6. Check for Complete / All-in-one / Partner / Retainer
  if (
    text.includes('all') ||
    text.includes('everything') ||
    text.includes('complete') ||
    text.includes('scale') ||
    text.includes('scaling') ||
    text.includes('partner')
  ) {
    const pkg = APPROVED_PACKAGES['complete-partner'];
    return {
      reply: `For fast-scaling companies requiring a unified, multi-disciplinary partner across people, process, tech, and compliance, our **${pkg.packageName}** provides complete operational leadership.\n\n` +
        `You get:\n` +
        `• Integrated HR Operations, Monthly Payroll & Statutory Compliance\n` +
        `• Dedicated Full-Stack Technical support and digital maintenance\n` +
        `• Ongoing process refinements, SOP updates, and executive MIS reports\n` +
        `• One Accountable SPOC with direct weekly partner reviews\n\n` +
        `Would you like to schedule an exploratory discussion with our leadership team?`,
      recommendedPackage: pkg,
      quickReplies: ['Book Free Consultation', 'Chat on WhatsApp (+91 88073 04713)', 'Review All Packages'],
      suggestedStage: 'scaling'
    };
  }

  // Default Discovery Welcome / General Inquiry
  return {
    reply: `Welcome to **People Point Consultants** — *Turn Ideas into Running Businesses*.\n\n` +
      `We help companies establish solid operational foundations across 7 core disciplines:\n` +
      `1. **Business Setup** (Pvt Ltd / LLP incorporation & registrations)\n` +
      `2. **People & HR** (Employment contracts, handbooks, KRA/KPIs)\n` +
      `3. **Payroll & Compliance** (Monthly payroll runs, PF/ESI/PT/TDS)\n` +
      `4. **Technology Solutions** (Next.js web apps, CRM, automation)\n` +
      `5. **Accounts & Backend** (Bookkeeping coordination, MIS)\n` +
      `6. **Operations SOPs** (Process blueprints, approval matrices)\n` +
      `7. **Digital Growth** (Performance funnels & marketing)\n\n` +
      `To suggest the most suitable package, where are you currently on your business journey?`,
    quickReplies: [
      '💡 Idea / Pre-Launch',
      '🏢 Newly Registered',
      '⚙️ Need HR & Payroll',
      '🚀 Scaling Fast (All-in-One)'
    ],
    suggestedStage: 'idea'
  };
}
