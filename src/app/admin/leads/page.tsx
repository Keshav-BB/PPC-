'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  getStoredLeads,
  updateLeadStatus,
  LeadRecord
} from '@/lib/leadStorage';
import {
  Users,
  CheckCircle2,
  Calendar,
  DollarSign,
  TrendingUp,
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  Building,
  RefreshCw,
  Clock,
  Sparkles,
  FileText
} from 'lucide-react';

const statusOptions: LeadRecord['status'][] = [
  'New Lead',
  'Contacted',
  'Qualified',
  'Consultation Scheduled',
  'Proposal Sent',
  'Won'
];

export default function LeadsDashboardPage() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);

  const loadLeads = () => {
    setLeads(getStoredLeads());
  };

  useEffect(() => {
    loadLeads();
    const handleUpdate = () => loadLeads();
    window.addEventListener('pp_leads_updated', handleUpdate);
    return () => window.removeEventListener('pp_leads_updated', handleUpdate);
  }, []);

  const handleStatusChange = (id: string, newStatus: LeadRecord['status']) => {
    updateLeadStatus(id, newStatus);
    loadLeads();
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = filterStatus === 'All' || lead.status === filterStatus;
    const matchesSearch =
      lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const countByStatus = (status: string) => leads.filter((l) => l.status === status).length;

  const exportCSV = () => {
    const headers = ['ID,Name,Company,Phone,Email,Stage,Services,Status,Source,Date'];
    const rows = leads.map(
      (l) =>
        `"${l.id}","${l.fullName}","${l.companyName}","${l.phone}","${l.email}","${l.businessStage}","${l.servicesNeeded.join('; ')}","${l.status}","${l.source}","${new Date(l.createdAt).toLocaleDateString()}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `people_point_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-brand-bgSoft min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3 text-brand-pink" />
              <span>Executive CRM & Business Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Lead Pipeline & Inquiry Management
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Live inquiries captured across Consultation Booking, Business Readiness Assessment, and Solution Builder.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/billing"
              className="px-4 py-2 rounded-xl bg-purple-900 hover:bg-purple-950 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Quotations & Invoices</span>
            </Link>
            <button
              onClick={loadLeads}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
            <button
              onClick={exportCSV}
              className="px-4 py-2 rounded-xl bg-brand-navy hover:bg-brand-navyLight text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Pipeline Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Inquiries</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">{leads.length}</span>
            <span className="text-[10px] text-emerald-600 font-semibold">Active In Pipeline</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">New Leads</span>
            <span className="text-2xl font-black text-brand-purple mt-1 block">{countByStatus('New Lead')}</span>
            <span className="text-[10px] text-slate-400">Needs contact</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Qualified</span>
            <span className="text-2xl font-black text-indigo-600 mt-1 block">{countByStatus('Qualified')}</span>
            <span className="text-[10px] text-slate-400">Scope fit validated</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Consultation Booked</span>
            <span className="text-2xl font-black text-brand-pink mt-1 block">{countByStatus('Consultation Scheduled')}</span>
            <span className="text-[10px] text-brand-pink font-semibold">Call in calendar</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Proposals Sent</span>
            <span className="text-2xl font-black text-amber-600 mt-1 block">{countByStatus('Proposal Sent')}</span>
            <span className="text-[10px] text-slate-400">Commercial review</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Clients Won</span>
            <span className="text-2xl font-black text-emerald-600 mt-1 block">{countByStatus('Won')}</span>
            <span className="text-[10px] text-emerald-600 font-semibold">In onboarding</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by name, company, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-purple outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold text-slate-500 shrink-0">Status:</span>
            {['All', ...statusOptions].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-colors ${
                  filterStatus === st
                    ? 'bg-brand-purple text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Leads Table & Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Table (8 cols on lg) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="p-4">Lead / Company</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Services</th>
                    <th className="p-4">Pipeline Status</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className={`hover:bg-purple-50/40 cursor-pointer transition-colors ${
                        selectedLead?.id === lead.id ? 'bg-purple-50/70' : ''
                      }`}
                    >
                      <td className="p-4">
                        <span className="font-bold text-slate-900 block">{lead.fullName}</span>
                        <span className="text-[11px] text-slate-500 block">{lead.companyName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{lead.id} • {lead.source}</span>
                      </td>
                      <td className="p-4">
                        <span className="block font-medium text-slate-800">{lead.phone}</span>
                        <span className="block text-[11px] text-slate-500">{lead.email}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {lead.servicesNeeded.slice(0, 2).map((s, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] text-slate-700 font-medium">
                              {s.split(' ')[0]}
                            </span>
                          ))}
                          {lead.servicesNeeded.length > 2 && (
                            <span className="text-[10px] text-slate-400">+{lead.servicesNeeded.length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <select
                          value={lead.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadRecord['status'])}
                          className="px-2 py-1 rounded-md text-[11px] font-bold border border-slate-200 bg-white focus:outline-none"
                        >
                          {statusOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLead(lead);
                          }}
                          className="text-[11px] font-bold text-brand-purple hover:text-brand-pink"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredLeads.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-400">
                        No leads matching current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Selected Lead Card (4 cols on lg) */}
          <div className="lg:col-span-4">
            {selectedLead ? (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-5 sticky top-24">
                <div className="flex justify-between items-start pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                      Lead ID: {selectedLead.id}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 mt-0.5">
                      {selectedLead.fullName}
                    </h3>
                    <span className="text-xs text-brand-purple font-semibold">
                      {selectedLead.companyName}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-brand-purple font-bold text-[10px]">
                    {selectedLead.status}
                  </span>
                </div>

                <div className="space-y-3 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <a href={`tel:${selectedLead.phone}`} className="hover:underline font-medium">
                      {selectedLead.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <a href={`mailto:${selectedLead.email}`} className="hover:underline font-medium">
                      {selectedLead.email}
                    </a>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Business Context</div>
                    <div><strong>Stage:</strong> {selectedLead.businessStage}</div>
                    <div><strong>Team Size:</strong> {selectedLead.teamSize}</div>
                    <div><strong>Timeline:</strong> {selectedLead.expectedTimeline}</div>
                    <div><strong>Mode:</strong> {selectedLead.consultationMode}</div>
                    {selectedLead.leadScore && (
                      <div><strong>Lead Qualification:</strong> <span className="font-bold text-purple-900">{selectedLead.leadScore}/100</span></div>
                    )}
                    {selectedLead.recommendedPackage && (
                      <div><strong>Recommended Fit:</strong> <span className="font-semibold text-rose-700">{selectedLead.recommendedPackage}</span></div>
                    )}
                    {selectedLead.entityStatus && (
                      <div><strong>Entity Status:</strong> {selectedLead.entityStatus}</div>
                    )}
                    {selectedLead.conversationId && (
                      <div className="text-[10px] text-slate-500 font-mono pt-1"><strong>Session:</strong> {selectedLead.conversationId}</div>
                    )}
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Requirements / Challenge</div>
                    <p className="text-slate-600 leading-relaxed">{selectedLead.challenge}</p>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Services Needed</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedLead.servicesNeeded.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-purple-50 text-brand-purple text-[10px] font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                  <Link
                    href={`/admin/billing`}
                    className="w-full py-2.5 rounded-xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <FileText className="w-3.5 h-3.5 text-brand-pink" />
                    <span>Create Official Quote / Invoice</span>
                  </Link>
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(selectedLead.fullName)}%2C%20this%20is%20the%20team%20at%20People%20Point%20Consultants.%20I%20reviewed%20your%20inquiry%20regarding%20${encodeURIComponent(selectedLead.servicesNeeded[0] || 'business setup')}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <span>Message on WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="w-full py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs text-center transition-colors"
                  >
                    Call Candidate
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center text-slate-400 text-xs shadow-card">
                Select a lead from the table to view complete details, requirement notes, and quick WhatsApp follow-up actions.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
