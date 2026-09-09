'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  X,
  Send,
  MessageCircle,
  Calendar,
  RotateCcw,
  Bot,
  User,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronRight,
  Shield,
  Phone,
  HelpCircle,
  Building2,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import {
  ChatMessage,
  BotRecommendation,
  LeadProfile,
  APPROVED_PACKAGES,
  BUSINESS_STAGES,
  buildWhatsAppLink,
  calculateLeadScore,
  getLeadScoreTier
} from '@/lib/botKnowledge';
import { saveNewLead } from '@/lib/leadStorage';

interface AIChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation?: (serviceName?: string) => void;
  initialContext?: {
    stage?: string;
    need?: string;
    message?: string;
  } | null;
}

const INITIAL_QUICK_OPTIONS = [
  'Start a New Business',
  'Hire & Set Up HR',
  'Payroll & Compliance',
  'Website/Software/Automation',
  'Accounts',
  'SOP/Processes',
  'Marketing',
  'Complete Business Support'
];

export default function AIChatBot({
  isOpen,
  onClose,
  onOpenConsultation,
  initialContext
}: AIChatBotProps) {
  const [conversationId, setConversationId] = useState<string>(() =>
    'PP-CONV-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6)
  );
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        '👋 Welcome to **People Point Consultants**! I am your **AI Business Advisor**.\n\n' +
        'We help founders and growing companies **Turn Ideas into Running Businesses** across 7 core operating pillars: Setup, HR, Payroll, Tech, Accounts, SOPs, and Growth.\n\n' +
        'Which business area would you like to explore first?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quickReplies, setQuickReplies] = useState<string[]>(INITIAL_QUICK_OPTIONS);
  const [leadProfile, setLeadProfile] = useState<Partial<LeadProfile>>({ score: 20 });
  const [activeRecommendation, setActiveRecommendation] = useState<BotRecommendation | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', email: '', company: '', city: '' });
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [showHandoffActions, setShowHandoffActions] = useState(false);
  const [showPrivacyBanner, setShowPrivacyBanner] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Client-side analytics event dispatcher (UAT Section 10)
  const trackChatEvent = (eventName: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      try {
        const payload = {
          event: eventName,
          conversationId,
          timestamp: new Date().toISOString(),
          ...params
        };
        window.dispatchEvent(new CustomEvent('pp_analytics', { detail: payload }));
        if ((window as any).dataLayer && Array.isArray((window as any).dataLayer)) {
          (window as any).dataLayer.push(payload);
        }
      } catch (e) {
        console.error('Analytics tracking error:', e);
      }
    }
  };

  // Track chat opening
  useEffect(() => {
    if (isOpen) {
      trackChatEvent('chatbot_opened');
    }
  }, [isOpen]);

  const handleClose = () => {
    if (messages.length > 1 && !leadCaptured) {
      trackChatEvent('chat_abandoned', { messageCount: messages.length });
    }
    onClose();
  };

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen, showLeadForm, showHandoffActions]);

  // Handle initial context injection if triggered from external buttons (Hero / Journey Selector)
  useEffect(() => {
    if (initialContext && isOpen) {
      if (initialContext.stage) {
        setLeadProfile((prev) => ({ ...prev, businessStage: initialContext.stage }));
      }
      if (initialContext.need) {
        setLeadProfile((prev) => ({ ...prev, primaryNeed: initialContext.need }));
      }
      if (initialContext.message) {
        handleSendMessage(initialContext.message);
      }
    }
  }, [initialContext, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    if (messages.length === 1) {
      trackChatEvent('chat_started', { firstMessage: text });
    }

    // Check for user intent triggers that mandate immediate human handoff options
    const handoffTriggers = /price|pricing|cost|quote|quotation|how much|charges|fee|call me|callback|phone|call back|urgent|talk to human|speak to someone|spoc/i;
    if (handoffTriggers.test(text)) {
      setShowHandoffActions(true);
      trackChatEvent('human_handoff_requested', { triggerText: text });
    }

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);
    setQuickReplies([]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          profile: leadProfile,
          conversationId
        })
      });

      const data = await res.json();

      if (data && data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);

        if (data.recommendedPackage) {
          setActiveRecommendation(data.recommendedPackage);
          trackChatEvent('package_recommended', { package: data.recommendedPackage.packageName });
        }

        if (data.quickReplies && Array.isArray(data.quickReplies)) {
          setQuickReplies(data.quickReplies);
        }

        if (data.leadScore) {
          setLeadProfile((prev) => ({ ...prev, score: data.leadScore }));
        }

        // Trigger lead form if user has engaged in deep discovery or handoff is needed
        if (newMessages.length >= 6 && !leadCaptured) {
          setShowLeadForm(true);
          trackChatEvent('lead_capture_started');
        }
      } else {
        throw new Error('No reply received');
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'I can directly connect you with our designated Single Point of Contact (SPOC) on WhatsApp at **+91 88073 04713** or help you book a free consultation.'
        }
      ]);
      setShowHandoffActions(true);
      setQuickReplies(['Chat on WhatsApp (+91 88073 04713)', 'Book Free Consultation']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    const newId = 'PP-CONV-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6);
    setConversationId(newId);
    setMessages([
      {
        role: 'assistant',
        content:
          '👋 Welcome to **People Point Consultants**! I am your **AI Business Advisor**.\n\n' +
          'We help founders and growing companies **Turn Ideas into Running Businesses** across 7 core operating pillars: Setup, HR, Payroll, Tech, Accounts, SOPs, and Growth.\n\n' +
          'Which business area would you like to explore first?'
      }
    ]);
    setInputValue('');
    setQuickReplies(INITIAL_QUICK_OPTIONS);
    setActiveRecommendation(null);
    setShowLeadForm(false);
    setLeadCaptured(false);
    setShowHandoffActions(false);
    setLeadProfile({ score: 20 });
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;

    setLeadSubmitting(true);
    try {
      const calculatedScore = calculateLeadScore(
        {
          ...leadProfile,
          name: leadForm.name,
          phone: leadForm.phone,
          email: leadForm.email,
          company: leadForm.company,
          location: leadForm.city
        },
        'Form Submitted'
      );

      const leadPayload = {
        fullName: leadForm.name,
        companyName: leadForm.company || 'Not specified',
        email: leadForm.email || 'Not provided',
        phone: leadForm.phone,
        city: leadForm.city || 'Not specified',
        businessStage: leadProfile.businessStage || 'Early Stage',
        teamSize: leadProfile.teamSize || '1-10',
        servicesNeeded: leadProfile.primaryNeed
          ? [leadProfile.primaryNeed]
          : activeRecommendation
          ? [activeRecommendation.packageName]
          : ['AI Business Advisory Inquiry'],
        challenge:
          leadProfile.notes ||
          messages
            .filter((m) => m.role === 'user')
            .map((m) => m.content)
            .slice(-2)
            .join('; ') ||
          'Inquired via AI Advisor',
        expectedTimeline: leadProfile.timeline || 'Immediate',
        consultationMode: 'Phone / WhatsApp / Video Call',
        source: 'AI Business Advisor Chat',
        leadScore: calculatedScore,
        conversationId,
        recommendedPackage: activeRecommendation?.packageName,
        entityStatus: leadProfile.entityStatus
      };

      // 1. Save locally so /admin/leads is immediately populated in client session
      saveNewLead(leadPayload);

      // 2. Transmit to backend API for centralized CRM logging
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload)
      });

      trackChatEvent('lead_captured', {
        name: leadForm.name,
        phone: leadForm.phone,
        email: leadForm.email,
        company: leadForm.company,
        score: calculatedScore
      });

      setLeadCaptured(true);
      setShowLeadForm(false);
      setLeadProfile((prev) => ({
        ...prev,
        name: leadForm.name,
        phone: leadForm.phone,
        email: leadForm.email,
        company: leadForm.company,
        location: leadForm.city,
        score: calculatedScore
      }));

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `✅ Thank you, **${leadForm.name}**! Your requirements have been logged under Reference ID **${conversationId}**.\n\nAn assigned People Point SPOC will review your business scope and reach out. You can also tap below to connect immediately on WhatsApp.`
        }
      ]);
    } catch (err) {
      console.error('Lead submit error:', err);
    } finally {
      setLeadSubmitting(false);
    }
  };

  const whatsAppUrl = buildWhatsAppLink(
    { ...leadProfile, ...leadForm },
    activeRecommendation?.packageName
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:p-6 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Main Chat Drawer Container */}
      <div className="w-full sm:w-[480px] h-[92vh] sm:h-[680px] max-h-[92vh] bg-white sm:rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 sm:slide-in-from-right-6 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-rose-700 text-white p-4 sm:p-5 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-rose-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white tracking-tight">
                  People Point AI Advisor
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <p className="text-[11px] text-purple-200 font-medium">
                Turn Ideas into Running Businesses
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleReset}
              className="p-2 rounded-xl text-purple-200 hover:text-white hover:bg-white/10 transition-colors"
              title="Reset conversation"
              aria-label="Reset conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handleClose}
              className="p-2 rounded-xl text-purple-200 hover:text-white hover:bg-white/10 transition-colors"
              title="Close chat"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* First-Use Privacy Banner (UAT Section 9) */}
        {showPrivacyBanner && (
          <div className="bg-purple-50/90 border-b border-purple-200/80 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-slate-700 shrink-0">
            <div className="flex items-center gap-1.5 pr-2">
              <ShieldAlert className="w-3.5 h-3.5 text-purple-700 shrink-0" />
              <span>
                🔒 <strong>Privacy Notice:</strong> We do not store sensitive credentials or payment data. Chat transcript is processed to assist advisory. Read our{' '}
                <Link href="/privacy" target="_blank" className="text-purple-800 underline font-semibold hover:text-purple-950">
                  Privacy Policy
                </Link>.
              </span>
            </div>
            <button
              onClick={() => setShowPrivacyBanner(false)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer shrink-0"
              aria-label="Dismiss privacy notice"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Lead Readiness Status Pill (Real-time Diagnostic Progress) */}
        <div className="bg-slate-50 px-4 py-2 border-b border-slate-200/80 flex items-center justify-between text-xs text-slate-600 shrink-0">
          <div className="flex items-center gap-1.5 font-medium">
            <Shield className="w-3.5 h-3.5 text-purple-700" />
            <span>Operational Diagnostic:</span>
            <span className="font-bold text-purple-900">
              {leadProfile.score || 20}% Complete ({getLeadScoreTier(leadProfile.score || 20).label})
            </span>
          </div>
          <div className="w-24 bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-700 to-rose-600 h-full transition-all duration-500"
              style={{ width: `${leadProfile.score || 20}%` }}
            ></div>
          </div>
        </div>

        {/* Scrollable Message Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {messages.map((msg, index) => {
            const isBot = msg.role === 'assistant';
            return (
              <div
                key={index}
                className={`flex items-start gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
              >
                {isBot && (
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-800 to-rose-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed shadow-xs ${
                    isBot
                      ? 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none'
                      : 'bg-purple-900 text-white rounded-tr-none'
                  }`}
                >
                  <div className="space-y-2 whitespace-pre-line">
                    {msg.content}
                  </div>
                </div>

                {!isBot && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 pl-9">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-[11px] font-medium text-slate-400">
                People Point Advisor is analyzing...
              </span>
            </div>
          )}

          {/* Immediate Human Handoff Action Block (UAT Section 6) */}
          {showHandoffActions && (
            <div className="my-2.5 p-3.5 bg-gradient-to-br from-purple-50 via-white to-rose-50 border border-purple-200 rounded-2xl space-y-2.5 animate-in fade-in duration-200 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-purple-800" />
                  <span className="text-xs font-bold text-purple-950">
                    Connect Directly with Human Advisory / SPOC
                  </span>
                </div>
                <button
                  onClick={() => setShowHandoffActions(false)}
                  className="text-[11px] font-semibold text-purple-700 hover:text-purple-900 cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                For commercial quotations, statutory timelines, or custom multi-service scopes, connect directly with our designated partner team:
              </p>
              <div className="grid grid-cols-2 gap-2 pt-0.5">
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackChatEvent('whatsapp_clicked')}
                  className="py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    trackChatEvent('consultation_clicked');
                    onClose();
                    onOpenConsultation?.(activeRecommendation?.packageName);
                  }}
                  className="py-2 px-2.5 rounded-xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Consultation</span>
                </button>
                <button
                  onClick={() => {
                    trackChatEvent('callback_requested');
                    setShowLeadForm(true);
                  }}
                  className="py-2 px-2.5 rounded-xl bg-white hover:bg-purple-100 text-purple-950 border border-purple-300 font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-purple-800" />
                  <span>Request Callback</span>
                </button>
                <button
                  onClick={() => setShowHandoffActions(false)}
                  className="py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] flex items-center justify-center gap-1 transition-colors"
                >
                  <span>Continue Chatting</span>
                </button>
              </div>
            </div>
          )}

          {/* Recommended Package Card Highlight */}
          {activeRecommendation && (
            <div className="my-3 p-4 rounded-2xl bg-gradient-to-br from-purple-50 via-white to-pink-50 border border-purple-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 px-2 py-0.5 rounded-md bg-rose-100/70">
                  Recommended Fit
                </span>
                <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3 text-purple-700" />
                  {activeRecommendation.timeline.split('(')[0]}
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-sm text-slate-900">
                  {activeRecommendation.packageName}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                  {activeRecommendation.tagline}
                </p>
              </div>

              <div className="text-[11px] text-purple-900 bg-purple-100/60 p-2.5 rounded-xl border border-purple-200/60 leading-relaxed">
                <strong>Why it fits:</strong> {activeRecommendation.whyFit}
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => {
                    trackChatEvent('consultation_clicked', { package: activeRecommendation.packageName });
                    onClose();
                    onOpenConsultation?.(activeRecommendation.packageName);
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-purple-800 to-rose-600 text-white font-bold text-xs shadow-xs hover:opacity-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Consultation</span>
                </button>
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackChatEvent('whatsapp_clicked', { package: activeRecommendation.packageName })}
                  className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp SPOC</span>
                </a>
              </div>
            </div>
          )}

          {/* Inline Lead Capture Form */}
          {showLeadForm && !leadCaptured && (
            <div className="my-3 p-4 rounded-2xl bg-white border border-slate-300 shadow-md space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-purple-800" />
                  <span className="text-xs font-bold text-slate-900">
                    Connect with Your Dedicated SPOC
                  </span>
                </div>
                <button
                  onClick={() => setShowLeadForm(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs"
                >
                  Skip
                </button>
              </div>
              <p className="text-[11px] text-slate-600">
                Leave your contact details to receive a customized scope summary, official proposal, or fast-track callback.
              </p>
              <form onSubmit={handleLeadSubmit} className="space-y-2.5">
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  required
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-700"
                />
                <input
                  type="tel"
                  placeholder="Phone / WhatsApp Number *"
                  required
                  value={leadForm.phone}
                  onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-700"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Company / Brand"
                    value={leadForm.company}
                    onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                    className="text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-700"
                  />
                  <input
                    type="text"
                    placeholder="City (e.g., Chennai)"
                    value={leadForm.city}
                    onChange={(e) => setLeadForm({ ...leadForm, city: e.target.value })}
                    className="text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-700"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Work Email (optional)"
                  value={leadForm.email}
                  onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-700"
                />
                <div className="flex items-start gap-2 pt-0.5 pb-1">
                  <input
                    type="checkbox"
                    id="consent-bot"
                    required
                    defaultChecked
                    className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-purple-700 focus:ring-purple-600 cursor-pointer"
                  />
                  <label htmlFor="consent-bot" className="text-[10px] text-slate-500 leading-snug cursor-pointer select-none">
                    I agree to the <Link href="/terms" target="_blank" className="underline hover:text-purple-700 font-medium">Terms</Link> & <Link href="/privacy" target="_blank" className="underline hover:text-purple-700 font-medium">Privacy Policy</Link>, and consent to communication via Phone/WhatsApp.
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={leadSubmitting}
                  className="w-full py-2.5 rounded-xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {leadSubmitting ? 'Saving...' : 'Submit Requirements to SPOC'}
                </button>
              </form>
            </div>
          )}

          {/* Interactive Quick Reply Chips */}
          {quickReplies.length > 0 && !isLoading && (
            <div className="pt-2 flex flex-wrap gap-1.5">
              {quickReplies.map((reply, i) => (
                <button
                  key={i}
                  onClick={() => {
                    trackChatEvent('quick_prompt_clicked', { prompt: reply });
                    if (reply.includes('WhatsApp')) {
                      trackChatEvent('whatsapp_clicked');
                      window.open(whatsAppUrl, '_blank');
                    } else if (reply.includes('Book Free Consultation') || reply.includes('Book Consultation')) {
                      trackChatEvent('consultation_clicked');
                      onClose();
                      onOpenConsultation?.(activeRecommendation?.packageName);
                    } else {
                      trackChatEvent('service_selected', { service: reply });
                      handleSendMessage(reply);
                    }
                  }}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-800 border border-slate-200 hover:border-purple-300 shadow-2xs transition-all flex items-center gap-1"
                >
                  <span>{reply}</span>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Persistent Handoff Bar */}
        <div className="bg-white p-2.5 border-t border-slate-200/80 flex items-center justify-between gap-2 text-xs shrink-0">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackChatEvent('whatsapp_clicked')}
            className="flex-1 py-1.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold transition-colors flex items-center justify-center gap-1.5 text-[11px]"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
            <span>Chat on WhatsApp</span>
          </a>

          <button
            onClick={() => {
              trackChatEvent('consultation_clicked');
              onClose();
              onOpenConsultation?.(activeRecommendation?.packageName);
            }}
            className="flex-1 py-1.5 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-bold transition-colors flex items-center justify-center gap-1.5 text-[11px]"
          >
            <Calendar className="w-3.5 h-3.5 text-purple-700" />
            <span>Book Consultation</span>
          </button>
        </div>

        {/* Input Form */}
        <div className="p-3 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about company setup, HR, payroll, tech..."
              disabled={isLoading}
              className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-700 bg-slate-50 focus:bg-white transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-2.5 rounded-xl bg-gradient-to-r from-purple-800 to-rose-600 text-white hover:opacity-95 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-[10px] text-center text-slate-400 mt-2">
            Informational advisory. Direct proposals finalized with assigned SPOC.
          </div>
        </div>
      </div>
    </div>
  );
}
