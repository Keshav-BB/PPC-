export interface LeadRecord {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  city: string;
  businessStage: string;
  teamSize: string;
  servicesNeeded: string[];
  challenge: string;
  expectedTimeline: string;
  consultationMode: string;
  source: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  status: 'New Lead' | 'Contacted' | 'Qualified' | 'Consultation Scheduled' | 'Proposal Sent' | 'Won';
  estimatedValue?: string;
  leadScore?: number;
  conversationId?: string;
  recommendedPackage?: string;
  entityStatus?: string;
  createdAt: string;
  notes?: string;
}

const STORAGE_KEY = 'people_point_crm_leads';

// Security sanitization helper to strip potentially hazardous characters
function sanitizeInput(str: string): string {
  if (!str) return '';
  return str
    .replace(/[<>]/g, '') // remove HTML tags
    .trim()
    .slice(0, 1000); // enforce maximum length
}

export const initialMockLeads: LeadRecord[] = [
  {
    id: 'PP-1001',
    fullName: 'Suresh Raina',
    companyName: 'NexWave Logistics',
    email: 'suresh@nexwavelogistics.in',
    phone: '+91 98401 23456',
    city: 'Chennai',
    businessStage: 'Startup / Scaling',
    teamSize: '11 - 25',
    servicesNeeded: ['HR & People Operations', 'Payroll & Compliance', 'Technology Services'],
    challenge: 'Need to replace manual spreadsheets with an automated HRMS and outsource monthly PF/ESI compliance.',
    expectedTimeline: 'Immediately (within 7 days)',
    consultationMode: 'Google Meet Video Call',
    source: 'Business Readiness Assessment',
    status: 'Consultation Scheduled',
    estimatedValue: '₹45,000 / mo',
    createdAt: '2026-09-06T10:15:00Z'
  },
  {
    id: 'PP-1002',
    fullName: 'Priya Sundaram',
    companyName: 'Aura Organic Foods',
    email: 'priya@aurafoods.co',
    phone: '+91 98840 55678',
    city: 'Bangalore',
    businessStage: 'Early Founder',
    teamSize: '1 - 5',
    servicesNeeded: ['Business Setup & Registration', 'Technology Services'],
    challenge: 'Need Private Limited incorporation, GST registration, and a custom web platform.',
    expectedTimeline: 'Within 2 to 4 weeks',
    consultationMode: 'Phone Call',
    source: 'Website Hero Form',
    status: 'Proposal Sent',
    estimatedValue: '₹1,20,000 One-Time',
    createdAt: '2026-09-07T14:30:00Z'
  },
  {
    id: 'PP-1003',
    fullName: 'Vikram Malhotra',
    companyName: 'Precision Engineering Tools',
    email: 'vikram@precisionengg.com',
    phone: '+91 94440 98712',
    city: 'Coimbatore',
    businessStage: 'Established SME',
    teamSize: '26 - 50',
    servicesNeeded: ['Business Process & Operations', 'Accounts & Backend Support'],
    challenge: 'Founder bottleneck in daily purchase approvals; need comprehensive SOPs and role-based KRA/KPIs.',
    expectedTimeline: 'Next Month',
    consultationMode: 'In-Person Meeting (Office)',
    source: 'Solution Builder',
    status: 'Qualified',
    estimatedValue: '₹85,000 One-Time',
    createdAt: '2026-09-08T09:45:00Z'
  }
];

export function getStoredLeads(): LeadRecord[] {
  if (typeof window === 'undefined') return initialMockLeads;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMockLeads));
      return initialMockLeads;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading leads from localStorage', err);
    return initialMockLeads;
  }
}

export function saveNewLead(lead: Omit<LeadRecord, 'id' | 'createdAt' | 'status'>): LeadRecord {
  const current = getStoredLeads();
  const sanitizedRecord: LeadRecord = {
    id: `PP-${Math.floor(1000 + Math.random() * 9000)}`,
    fullName: sanitizeInput(lead.fullName),
    companyName: sanitizeInput(lead.companyName),
    email: sanitizeInput(lead.email),
    phone: sanitizeInput(lead.phone),
    city: sanitizeInput(lead.city),
    businessStage: sanitizeInput(lead.businessStage),
    teamSize: sanitizeInput(lead.teamSize),
    servicesNeeded: lead.servicesNeeded.map((s) => sanitizeInput(s)),
    challenge: sanitizeInput(lead.challenge),
    expectedTimeline: sanitizeInput(lead.expectedTimeline),
    consultationMode: sanitizeInput(lead.consultationMode),
    source: sanitizeInput(lead.source),
    utmSource: lead.utmSource ? sanitizeInput(lead.utmSource) : undefined,
    utmMedium: lead.utmMedium ? sanitizeInput(lead.utmMedium) : undefined,
    utmCampaign: lead.utmCampaign ? sanitizeInput(lead.utmCampaign) : undefined,
    estimatedValue: lead.estimatedValue ? sanitizeInput(lead.estimatedValue) : undefined,
    leadScore: typeof lead.leadScore === 'number' ? lead.leadScore : undefined,
    conversationId: lead.conversationId ? sanitizeInput(lead.conversationId) : undefined,
    recommendedPackage: lead.recommendedPackage ? sanitizeInput(lead.recommendedPackage) : undefined,
    entityStatus: lead.entityStatus ? sanitizeInput(lead.entityStatus) : undefined,
    status: 'New Lead',
    createdAt: new Date().toISOString()
  };

  const updated = [sanitizedRecord, ...current];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('pp_leads_updated'));
    } catch (e) {
      console.error(e);
    }
  }
  return sanitizedRecord;
}

export function updateLeadStatus(id: string, newStatus: LeadRecord['status']) {
  const current = getStoredLeads();
  const updated = current.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead));
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('pp_leads_updated'));
    } catch (e) {
      console.error(e);
    }
  }
}
