
import React from 'react';
import { Container } from './UI';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-public-card border-t border-public-light relative z-10 pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Column - Takes up 2 columns for balance */}
          <div className="col-span-1 md:col-span-2 pr-0 md:pr-12">
            <div className="flex flex-col items-start leading-none mb-6">
              <div className="font-display font-black text-2xl text-public-accent-primary tracking-widest uppercase">
                Wexedo
              </div>
              <div className="text-[10px] text-public-secondary tracking-wider font-medium mt-1 pl-1">
                by The Arbridge
              </div>
            </div>
            <p className="text-public-secondary text-sm leading-relaxed max-w-sm">
              We help ambitious businesses scale their revenue through data-driven digital marketing strategies and world-class development.
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-bold text-public-primary mb-6">Services</h4>
            <ul className="space-y-3 text-sm text-public-secondary">
              <li><a href="#" className="hover:text-public-accent-primary transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-public-accent-primary transition-colors">SEO Optimization</a></li>
              <li><a href="#" className="hover:text-public-accent-primary transition-colors">PPC Management</a></li>
              <li><a href="#" className="hover:text-public-accent-primary transition-colors">LinkedIn Outreach</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-bold text-public-primary mb-6">Contact</h4>
            <address className="not-italic text-sm text-public-secondary space-y-3">
              <p>123 Growth Avenue</p>
              <p>Tech District, NY 10010</p>
              <p className="pt-2"><a href="mailto:hello@wexedo.com" className="text-public-accent-primary hover:underline">hello@wexedo.com</a></p>
              <p><a href="tel:+15550000000" className="hover:text-public-primary">+1 (555) 000-0000</a></p>
            </address>
          </div>
        </div>

        <div className="pt-8 border-t border-public-light text-center text-xs text-public-muted">
          <p>&copy; {new Date().getFullYear()} WEXEDO Agency. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};
