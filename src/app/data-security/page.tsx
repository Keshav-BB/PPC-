import React from 'react';
import { ShieldCheck, Lock, Key, Server, FileText, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export const metadata = {
  title: 'Data Security & Confidentiality Framework | People Point Consultants',
  description:
    'Documented technical controls, role-based access governance, data segregation, encryption standards, and backup procedures at People Point Consultants.',
  alternates: {
    canonical: 'https://peoplepointconsultants.com/data-security',
  },
};

export default function DataSecurityPage() {
  return (
    <div className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-slate-700 text-xs sm:text-sm leading-relaxed">
        {/* Header */}
        <div className="border-b border-slate-200 pb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Operational Controls & Governance</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1">
            Data Security & Confidentiality Framework
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Demonstrable technical controls, role-based permissions, data segregation, and governance standards.
          </p>
        </div>

        {/* Real Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-purple-900 font-bold text-xs">
              <FileText className="w-4 h-4 text-purple-800" />
              <span>Mandatory Personnel NDAs</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every consultant, software developer, and payroll manager at People Point executes legally binding Non-Disclosure and Confidentiality Agreements prior to accessing client systems or commercial files.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-purple-900 font-bold text-xs">
              <Key className="w-4 h-4 text-purple-800" />
              <span>Role-Based Access Control (RBAC)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Internal system access is partitioned across defined operational roles (<code>Sales / SPOC</code>, <code>Manager</code>, <code>Accounts</code>, <code>Admin</code>, <code>Management</code>). Team members only access client data directly relevant to their active engagement.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-purple-900 font-bold text-xs">
              <Lock className="w-4 h-4 text-purple-800" />
              <span>TLS 1.3 / HTTPS Encryption in Transit</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              All web traffic and API endpoints are encrypted in transit using modern TLS 1.3 cryptographic protocols with automated HTTPS enforcement and HTTP Strict Transport Security (HSTS) headers via our production edge infrastructure.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-purple-900 font-bold text-xs">
              <Server className="w-4 h-4 text-purple-800" />
              <span>Client Data Segregation Model</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Client documentation, paysheet registers, and commercial agreements are isolated using dedicated Client IDs (e.g. <code>CLI-101</code>) preventing accidental data cross-pollination between independent organizations.
            </p>
          </div>
        </div>

        {/* Section: Backup and Versioning Procedures */}
        <section className="space-y-3">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
            Automated Versioning, Backups & Disaster Recovery
          </h2>
          <p>
            We maintain structured, verifiable backup and recovery mechanisms across code, content, and client records:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
            <li><strong>Code & Configuration Versioning:</strong> All website code and system templates are managed under distributed Git version control with immutable commit histories and branch protections.</li>
            <li><strong>Automated Deployment Verification:</strong> Continuous Integration (CI) and build verification gates prevent untested code or syntax regressions from reaching production.</li>
            <li><strong>Structured Data Backups:</strong> The Admin Studio supports instant standardized JSON backups (compatible with the <code>D:\Quote Create</code> QMS repository) allowing off-site archival of quotes, invoices, client masters, and audit trails.</li>
          </ul>
        </section>

        {/* Section: Data Handover & Deletion Protocol */}
        <section className="space-y-3">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
            Documented Data Handover & Deletion Protocol
          </h2>
          <p>
            We recognize that your business and employee records are your exclusive property. Upon project completion or written termination notice:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
            <li><strong>Complete Handover Archive:</strong> People Point delivers all final deliverables, payroll registers, payslip bundles, system manuals, and code assets in organized, standardized formats.</li>
            <li><strong>Deletion of Working Drafts:</strong> Upon written confirmation of handover receipt, working copies and temporary files are purged from active working environments, reserving only statutory records required by Indian corporate and tax legislation (e.g. invoices retained for 7 years).</li>
          </ul>
        </section>

        {/* Transparency Statement */}
        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <AlertCircle className="w-4 h-4" />
            <span>Honest Governance & Certification Transparency</span>
          </div>
          <p className="leading-relaxed">
            People Point Consultants enforces rigorous internal operational security standards and data handling best practices. We strictly distinguish direct operations from certified external audits, and we do not claim third-party certifications (such as ISO 27001 or SOC 2) unless actively and officially audited. Our security commitments are grounded in verifiable engineering controls, contractual NDAs, and strict role-based access.
          </p>
        </div>
      </div>
    </div>
  );
}
