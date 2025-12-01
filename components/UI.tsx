
import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

// --- Container ---
interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}
export const Container: React.FC<ContainerProps> = ({ className = '', children }) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}
export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  href,
  ...props 
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-4 lg:px-8 py-3.5 text-base',
    lg: 'px-5 lg:px-10 py-4 text-base lg:text-lg',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-b from-public-accent-primary-light to-public-accent-primary-dark text-black shadow-[0_14px_40px_-12px_var(--color-public-accent-glow)] hover:shadow-[0_20px_55px_-14px_var(--color-public-accent-glow)] hover:brightness-105 border-0',
    secondary: 'bg-transparent border border-public-light text-public-primary hover:border-public-white hover:bg-white/10',
  };

  const baseClasses = `inline-flex items-center justify-center rounded-lg font-bold font-display transition-all duration-300 hover:-translate-y-0.5 cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {children}
      </a>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {children}
    </button>
  );
};

// --- Card ---
interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'featured';
  className?: string;
  hoverEffect?: boolean;
}
export const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'default', 
  className = '', 
  hoverEffect = true 
}) => {
  const variants = {
    default: 'bg-public-card border border-public-light shadow-[0_20px_60px_-40px_rgba(0,0,0,0.6)] backdrop-blur-[15px]',
    featured: 'bg-gradient-to-b from-public-main/70 via-public-card to-public-card border-2 border-public-accent-primary shadow-[0_40px_120px_-50px_rgba(212,181,140,0.55)] ring-1 ring-public-accent-primary backdrop-blur-[18px]',
  };

  const hoverClasses = hoverEffect 
    ? (variant === 'featured' ? 'hover:-translate-y-1 hover:shadow-[0_45px_130px_-60px_rgba(212,181,140,0.6)]' : 'hover:border-public-white hover:-translate-y-1 hover:bg-public-card-hover')
    : '';

  return (
    <div className={`rounded-3xl transition-all duration-400 p-6 md:p-8 ${variants[variant]} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

// --- Section ---
interface SectionProps {
  className?: string;
  id?: string;
  children: React.ReactNode;
}
export const Section: React.FC<SectionProps> = ({ className = '', id, children }) => {
  return (
    <section id={id} className={`py-16 md:py-24 border-b border-public-light/20 relative z-10 ${className}`}>
      {children}
    </section>
  );
};

// --- Badge ---
interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}
export const Badge: React.FC<BadgeProps> = ({ children, className = '' }) => {
  return (
    <span className={`inline-block bg-public-accent-primary/20 text-public-accent-primary px-3 py-1 rounded-full text-xs md:text-sm font-bold whitespace-nowrap ${className}`}>
      {children}
    </span>
  );
};

// --- Modal ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      {/* Content Wrapper (Frame) */}
      <div className="relative bg-public-card border border-public-light rounded-2xl w-full max-w-5xl max-h-[85vh] md:max-h-[90vh] shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col overflow-hidden">
        
        {/* Scrollable Area */}
        <div className="overflow-y-auto flex-1 w-full h-full">
          {/* Close Button Area */}
          <div className="sticky top-0 right-0 z-50 flex justify-end p-4 pointer-events-none">
            <button 
              onClick={onClose}
              className="p-2 bg-black/40 backdrop-blur-md rounded-full text-public-secondary hover:text-white transition-colors border border-white/10 pointer-events-auto shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Children Content - Negative margin to pull content under the floating button area */}
          <div className="-mt-[4.5rem]">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
