export interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

export const generalFaqs: FAQItem[] = [
  {
    category: 'General',
    question: 'How is People Point different from a traditional consultancy or agency?',
    answer: 'Traditional consultancies give you advisory slide decks and leave you to implement them. Agencies handle only one silo (just website design, or just tax filings, or just recruitment). People Point is an integrated Business Enablement Partner that handles both the strategy and the execution under one roof with an accountable Single Point of Contact (SPOC).'
  },
  {
    category: 'General',
    question: 'Who will be my primary contact person?',
    answer: 'Every client is assigned an accountable Single Point of Contact (SPOC) who coordinates all requirements across our internal HR, Payroll, Tech, and Operations specialists, so you never have to chase multiple vendors.'
  },
  {
    category: 'Engagement',
    question: 'Do you work on fixed-price projects or monthly retainers?',
    answer: 'We offer flexible engagement models based on your business stage: One-Time Turnkey Projects (for incorporation, SOP drafting, or web development), Monthly Retainers (for Managed HR, Payroll, Tech Maintenance, and Digital Marketing), and Dedicated Resource Allocations.'
  },
  {
    category: 'Startups',
    question: 'What is included in the Business Launch 360° package?',
    answer: 'Business Launch 360° is our flagship turnkey offering for founders. It includes legal incorporation, GST/MSME/statutory registrations, bank resolutions, standard employment contracts and HR policy pack, a high-converting Next.js website, core SOPs, and an initial growth roadmap.'
  },
  {
    category: 'Compliance',
    question: 'How do you handle statutory compliance across India and international operations?',
    answer: 'Our HR & Payroll practice, led by Working Partner Keerthika, manages complete monthly payroll computations, PF, ESI, Professional Tax, and TDS on salary. For international/US clients, we provide scope-bounded backend payroll and compliance coordination through established partner networks.'
  },
  {
    category: 'Technology',
    question: 'Can People Point build custom web applications and automate our internal workflows?',
    answer: 'Yes! Our in-house tech team, led by Aadhil and Ajith, specializes in custom web applications, Next.js portals, CRM setup (such as Frappe or HubSpot), and workflow automations (WhatsApp API, payment gateways, and automated reports).'
  },
  {
    category: 'Commercials',
    question: 'How do I get a proposal or quote for my business?',
    answer: 'You can book a free 30-minute Business Consultation directly through our website, or use our interactive Solution Builder to specify your requirements. We typically deliver a customized scope and proposal within 24 to 48 hours.'
  }
];
