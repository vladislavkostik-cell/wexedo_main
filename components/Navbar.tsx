import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Container, Button } from './UI';
import { NAV_LINKS } from '../constants';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 py-4 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? 'bg-public-main/80 backdrop-blur-[20px] border-b border-public-light' : 'bg-transparent'
      }`}
    >
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-start leading-none">
            <div className="font-display font-black text-3xl text-public-accent-primary tracking-widest uppercase hover:text-white transition-colors cursor-pointer">
              Wexedo
            </div>
            <div className="text-[10px] text-public-secondary tracking-wider font-medium mt-1 pl-1">
              by The Arbridge
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-public-secondary hover:text-public-primary transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex gap-3">
             <Button variant="secondary" size="sm" href="https://wa.me/15550000000">
               WhatsApp
             </Button>
            <Button variant="primary" size="sm" href="#book">
              Book Strategy Call
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-public-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-6 pb-4 border-t border-public-light mt-4 bg-public-main animate-in fade-in slide-in-from-top-5 duration-200">
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-public-primary text-lg font-medium px-2 py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                <Button variant="secondary" href="https://wa.me/15550000000" onClick={() => setIsMobileMenuOpen(false)}>
                  WhatsApp
                </Button>
                <Button variant="primary" href="#book" onClick={() => setIsMobileMenuOpen(false)}>
                  Book Strategy Call
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
};