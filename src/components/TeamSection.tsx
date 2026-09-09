import React from 'react';
import { coreTeam } from '@/data/team';
import { ShieldCheck, UserCheck, Linkedin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TeamSection() {
  return (
    <section id="team" className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-brand-purple text-xs font-bold uppercase tracking-wider mb-2">
            The Leadership & Execution Team
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Meet the Minds Behind Your Business Systems
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Real people with hands-on expertise across business setup, human resources, statutory payroll, full-stack technology, and operational execution.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreTeam.map((member) => (
            <div
              key={member.name}
              className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 hover:bg-white hover:shadow-hover hover:border-brand-purple/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  {/* Initials Avatar */}
                  <div className={`w-16 h-16 rounded-2xl ${member.avatarBg} text-white flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform`}>
                    {member.initials}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white text-slate-700 border border-slate-200">
                    {member.role.split('–')[0].split('|')[0].trim()}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 group-hover:text-brand-purple transition-colors">
                  {member.name}
                </h3>
                <div className="text-xs font-bold text-brand-pink mt-0.5">
                  {member.role}
                </div>
                <div className="text-xs font-semibold text-slate-500 mt-1 italic">
                  {member.headline}
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {member.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Core Specializations:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {member.expertise.map((skill, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* SPOC Highlight Box */}
          <div className="bg-gradient-to-br from-brand-navy via-slate-900 to-purple-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-slate-800 shadow-xl">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold uppercase tracking-wider mb-4 border border-pink-500/30">
                <ShieldCheck className="w-4 h-4" />
                <span>Accountability Guarantee</span>
              </div>
              <h3 className="text-2xl font-black text-white">
                One Accountable SPOC for Every Client
              </h3>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                You never have to chase multiple developers, HR coordinators, or tax filers. Your assigned Single Point of Contact (SPOC) takes direct responsibility for requirements gathering, team synchronization, and milestone delivery.
              </p>

              <div className="mt-5 p-4 rounded-2xl bg-white/10 text-xs space-y-1.5 text-slate-200">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span>Direct Leadership Access</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Weekly reviews, transparent status updates, and clear SLA turnaround times.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <Link
                href="/about"
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>Read Full Company Story & Vision</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Master Motto Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 border border-purple-100 text-center max-w-4xl mx-auto">
          <p className="text-sm sm:text-base font-bold text-brand-navy uppercase tracking-wider">
            One Team. Multiple Capabilities. One Business Objective.
          </p>
          <p className="text-xl sm:text-3xl font-black gradient-text mt-1">
            TURN IDEAS INTO RUNNING BUSINESSES.
          </p>
        </div>
      </div>
    </section>
  );
}
