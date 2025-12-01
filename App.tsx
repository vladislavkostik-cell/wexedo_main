
import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AnimatedBackground } from './components/Background';
import { 
  HeroSection, 
  ServicesSection, 
  ProcessSection, 
  TestimonialsSection, 
  PricingSection, 
  CTASection,
  UGCSection,
  GEOSection,
  TeamSection
} from './components/Sections';

const App: React.FC = () => {
  return (
    <div className="bg-public-main min-h-screen text-public-primary font-inter relative selection:bg-public-accent-primary/30 selection:text-white">
      
      <AnimatedBackground />
      <Navbar />
      
      <main className="relative">
        <HeroSection />
        <ServicesSection />
        <GEOSection />
        <UGCSection />
        <ProcessSection />
        <PricingSection />
        <TeamSection />
        <TestimonialsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default App;
