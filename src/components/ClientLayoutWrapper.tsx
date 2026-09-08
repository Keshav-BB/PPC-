'use client';

import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import MobileActionBar from './MobileActionBar';
import ConsultationModal from './ConsultationModal';

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

export const ConsultationContext = React.createContext<{
  openConsultation: (service?: string) => void;
}>({
  openConsultation: () => {},
});

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const openConsultation = (service?: string) => {
    setSelectedService(service);
    setIsConsultationOpen(true);
  };

  const closeConsultation = () => {
    setIsConsultationOpen(false);
    setSelectedService(undefined);
  };

  return (
    <ConsultationContext.Provider value={{ openConsultation }}>
      <div className="min-h-screen flex flex-col justify-between selection:bg-brand-pink/20 selection:text-brand-purple pb-16 sm:pb-0">
        <Navbar onOpenConsultation={() => openConsultation()} />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
        <MobileActionBar onOpenConsultation={() => openConsultation()} />
        <ConsultationModal
          isOpen={isConsultationOpen}
          onClose={closeConsultation}
          defaultService={selectedService}
        />
      </div>
    </ConsultationContext.Provider>
  );
}
