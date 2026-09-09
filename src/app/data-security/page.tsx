import React from 'react';
import { ShieldCheck, Lock, Key, Server, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function DataSecurityPage() {
  return (
    <div className="bg-brand-bgSoft py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-card space-y-8 text-slate-700 text-xs sm:text-sm leading-relaxed">
        <div className="border-b border-slate-200 pb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Operational Controls & Governance</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1">
            Data Security & Confidentiality Framework
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            How People Point protects client documents, salary structures, corporate records, and trade secrets.
          </p>
        </div>

        {/* Real Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-brand-purple font-bold text-xs">
              <Lock className="w-4 h-4" />
              <span>Strict Need-to-Know Access</span>
            </div>
            <p className="text-xs text-slate-600">
              Only personnel actively assigned to your project or payroll processing are granted access to your employee data, financial vouchers, or code repositories.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-brand-pink font-bold text-xs">
              <FileText className="w-4 h-4" />
              <span>Mandatory Employee NDAs</span>
            </div>
            <p className="text-xs text-slate-600">
              All People Point consultants, developers, and payroll managers execute legally binding confidentiality and non-disclosure agreements prior to onboarding.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
              <Key className="w-4 h-4" />
              <span>Role-Based Access Control</span>
            </div>
            <p className="text-xs text-slate-600">
              Permissions are governed by strict role hierarchies. Team members only see the specific modules and folders required for their immediate delivery tasks.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
              <Server className="w-4 h-4" />
              <span>Encrypted Storage & Separation</span>
            </div>
            <p className="text-xs text-slate-600">
              Client data is isolated into dedicated client partitions on cloud infrastructure with encrypted data transmission (TLS/SSL) and regular automated backups.
            </p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">Backup & Disaster Recovery Procedures</h2>
          <p>
            We maintain routine, versioned cloud backups of all client deliverables and operating records. Redundant storage configurations ensure recovery capabilities in the event of accidental deletion or platform disruptions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">Data Retention & Deletion Rights</h2>
          <p>
            Upon completion or termination of an engagement, clients can request a full handover archive and permanent deletion of working drafts from our internal environments, subject to statutory record-retention requirements under Indian corporate and tax laws.
          </p>
        </section>

        {/* Credibility Notice */}
        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-800">
            <AlertCircle className="w-4 h-4" />
            <span>Transparency & Compliance Statement</span>
          </div>
          <p className="leading-relaxed">
            People Point Consultants enforces rigorous internal operational security standards and data handling best practices. Our security practices are designed around structured access control, confidentiality and responsible data handling. We strictly distinguish direct services from work coordinated through authorized regulatory bodies and certified professionals, and we do not claim third-party certifications (such as ISO or SOC 2) unless officially audited and active.
          </p>
        </div>
      </div>
    </div>
  );
}
