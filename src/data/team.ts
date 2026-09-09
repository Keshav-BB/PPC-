export interface TeamMember {
  name: string;
  role: string;
  headline: string;
  summary: string;
  expertise: string[];
  initials: string;
  avatarBg: string;
}

export const coreTeam: TeamMember[] = [
  {
    name: 'Bhavani',
    role: 'Founder',
    headline: 'Entrepreneurial Vision & Institutional Foundation',
    summary: 'Founder of Chennai Filings & People Point, providing the strategic vision, governance, and foundational leadership behind the entire organization.',
    expertise: ['Business Strategy', 'Entrepreneurship', 'Corporate Structuring', 'Governance'],
    initials: 'BH',
    avatarBg: 'bg-brand-purple'
  },
  {
    name: 'Keerthika',
    role: 'Working Partner – HR, Payroll & Compliance',
    headline: 'People Systems, Statutory Rigor & Global Operations',
    summary: 'Leads complete HR operations, monthly payroll processing, statutory compliance frameworks across India and international cross-border operations, and backend excellence.',
    expertise: ['HR Operations', 'Statutory Compliance', 'India & US Payroll', 'HRMS Architecture', 'People Culture'],
    initials: 'KE',
    avatarBg: 'bg-brand-pink'
  },
  {
    name: 'Aadhil',
    role: 'Lead Developer',
    headline: 'Technical Architecture, Systems & Automation',
    summary: 'Heads software development, robust technical architecture, modern web applications, API integrations, and workflow automation systems that power client businesses.',
    expertise: ['Full-Stack Architecture', 'Next.js & React', 'Workflow Automation', 'API Integrations', 'System Security'],
    initials: 'AA',
    avatarBg: 'bg-purple-700'
  },
  {
    name: 'Ajith',
    role: 'Senior Developer',
    headline: 'Software Engineering & Scalable Implementation',
    summary: 'Drives hands-on software development, front-end precision, technical execution, implementation support, and high-performance project delivery.',
    expertise: ['Web Engineering', 'UI/UX Implementation', 'Database Systems', 'Performance Tuning', 'Technical Support'],
    initials: 'AJ',
    avatarBg: 'bg-pink-600'
  }
];
