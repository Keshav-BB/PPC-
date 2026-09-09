'use client';

import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import MobileActionBar from './MobileActionBar';
import ConsultationModal from './ConsultationModal';
import AIChatBot from './AIChatBot';
import { Sparkles } from 'lucide-react';

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

export const ConsultationContext = React.createContext<{
  openConsultation: (service?: string) => void;
}>({
  openConsultation: () => {},
});

export const ChatBotContext = React.createContext<{
  openChat: (initialContext?: { stage?: string; need?: string; message?: string }) => void;
  closeChat: () => void;
  isChatOpen: boolean;
}>({
  openChat: () => {},
  closeChat: () => {},
  isChatOpen: false,
});

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatContext, setChatContext] = useState<{
    stage?: string;
    need?: string;
    message?: string;
  } | null>(null);

  const openConsultation = (service?: string) => {
    setSelectedService(service);
    setIsConsultationOpen(true);
  };

  const closeConsultation = () => {
    setIsConsultationOpen(false);
    setSelectedService(undefined);
  };

  const openChat = (context?: { stage?: string; need?: string; message?: string }) => {
    if (context) {
      setChatContext(context);
    }
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setChatContext(null);
  };

  return (
    <ConsultationContext.Provider value={{ openConsultation }}>
      <ChatBotContext.Provider value={{ openChat, closeChat, isChatOpen }}>
        <div className="min-h-screen flex flex-col justify-between selection:bg-brand-pink/20 selection:text-brand-purple pb-16 sm:pb-0">
          <Navbar onOpenConsultation={() => openConsultation()} />
          <main className="flex-grow">{children}</main>
          <Footer />

          {/* Desktop Floating Launchers */}
          <WhatsAppButton />

          <aside aria-label="AI Business Advisor" className="fixed bottom-20 right-6 z-40 hidden sm:block">
            <button
              onClick={() => openChat()}
              className="group flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-purple-900 via-purple-800 to-rose-700 hover:opacity-95 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5 border border-white/20"
              title="Ask People Point AI Business Advisor"
            >
              <Sparkles className="w-4 h-4 text-rose-300 animate-pulse" />
              <span className="text-xs font-bold tracking-wide">
                ✨ Ask AI Advisor
              </span>
            </button>
          </aside>

          {/* Mobile Floating Launcher */}
          <aside aria-label="AI Business Advisor mobile launcher" className="fixed bottom-16 right-4 z-40 sm:hidden">
            <button
              onClick={() => openChat()}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-purple-900 via-purple-800 to-rose-700 text-white rounded-full shadow-lg text-xs font-bold border border-white/20 active:scale-95 transition-transform"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-300" />
              <span>✨ Ask AI</span>
            </button>
          </aside>

          <MobileActionBar onOpenConsultation={() => openConsultation()} />

          <ConsultationModal
            isOpen={isConsultationOpen}
            onClose={closeConsultation}
            defaultService={selectedService}
          />

          <AIChatBot
            isOpen={isChatOpen}
            onClose={closeChat}
            onOpenConsultation={openConsultation}
            initialContext={chatContext}
          />
        </div>
      </ChatBotContext.Provider>
    </ConsultationContext.Provider>
  );
}
