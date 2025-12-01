
import React, { useState, useEffect } from 'react';
import { 
  Code, Search, Megaphone, Users, BarChart, Linkedin, 
  CheckCircle2, ArrowRight, Quote, Play, Star, Share2, TrendingUp,
  Bot, Sparkles, ChevronLeft, ChevronRight, Zap, Target, MessageSquare,
  Layers, Database, Shield, ExternalLink
} from 'lucide-react';
import { Section, Container, Button, Card, Badge, Modal } from './UI';
import { HERO_STATS, SERVICES, PRICING_PLANS, CLIENTS, UGC_ITEMS, PARTNER_REVIEWS } from '../constants';
import { Stat, ServiceItem, PricingPlan, Client, UGCItem, ReviewItem } from '../types';

// --- Helper Components ---

const StatItem: React.FC<{ stat: Stat }> = ({ stat }) => {
  const colorClasses = {
    purple: 'text-public-accent-secondary', 
    green: 'text-emerald-400',
    gold: 'text-public-accent-primary',
    default: 'text-public-primary'
  };

  return (
    <div className="text-center p-6 bg-public-card/50 rounded-2xl border border-public-light backdrop-blur-sm">
      <div className={`text-4xl md:text-5xl font-extrabold font-display mb-2 ${colorClasses[stat.color]}`}>
        {stat.value}
      </div>
      <p className="text-sm text-public-secondary uppercase tracking-wider font-semibold">{stat.label}</p>
    </div>
  );
};

const ServiceCard: React.FC<{ service: ServiceItem, onOpen: (service: ServiceItem) => void }> = ({ service, onOpen }) => {
  const icons = {
    code: Code,
    search: Search,
    megaphone: Megaphone,
    users: Users,
    'bar-chart': BarChart,
    linkedin: Linkedin
  };
  const Icon = icons[service.icon];

  return (
    <Card className="h-full flex flex-col group">
      <div className="w-12 h-12 bg-public-accent-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-public-accent-primary/20 transition-colors">
        <Icon className="text-public-accent-primary w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold font-display text-public-primary mb-3">{service.title}</h3>
      <p className="text-public-secondary text-sm leading-relaxed flex-grow">{service.description}</p>
      <button 
        onClick={() => onOpen(service)}
        className="mt-6 pt-6 border-t border-public-light flex items-center text-public-accent-primary text-sm font-semibold group-hover:gap-2 transition-all cursor-pointer bg-transparent border-x-0 border-b-0"
      >
        Learn More <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </Card>
  );
};

const PricingCard: React.FC<{ plan: PricingPlan }> = ({ plan }) => {
  return (
    <Card variant={plan.isPopular ? 'featured' : 'default'} className="relative flex flex-col h-full">
      {plan.isPopular ? (
        <div className="w-full flex justify-center mb-4">
          <div className="bg-public-accent-primary text-[#121212] px-4 py-1.5 rounded-full text-xs md:text-sm font-bold shadow-[0_4px_20px_rgba(212,181,140,0.4)] uppercase tracking-wider whitespace-nowrap border-2 border-public-accent-primary">
            Most Popular
          </div>
        </div>
      ) : (
        <div className="h-8 mb-4 hidden md:block" aria-hidden="true"></div>
      )}
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-public-secondary mb-2">{plan.name}</h3>
        <div className="flex items-baseline gap-1.5">
          {plan.price !== 'Custom' && <span className="text-sm text-public-secondary font-medium mt-2">from</span>}
          <span className="text-4xl font-bold font-display text-public-primary">{plan.price}</span>
          {plan.price !== 'Custom' && <span className="text-public-secondary">/mo</span>}
        </div>
        <p className="text-public-secondary text-sm mt-4">{plan.description}</p>
      </div>

      <div className="flex-grow space-y-4 mb-8">
        {plan.features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <CheckCircle2 
              className={`w-5 h-5 flex-shrink-0 ${feature.included ? 'text-public-accent-primary' : 'text-public-muted'}`} 
            />
            <span className={`text-sm ${feature.included ? 'text-public-primary' : 'text-public-muted line-through'}`}>
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      <Button 
        variant={plan.isPopular ? 'primary' : 'secondary'} 
        className="w-full"
        href="#contact"
      >
        {plan.buttonText}
      </Button>
    </Card>
  );
};

const UGCCard: React.FC<{ item: UGCItem }> = ({ item }) => {
  return (
    <div className="relative aspect-[9/16] min-w-[280px] lg:min-w-0 rounded-2xl overflow-hidden group border border-public-light cursor-pointer shadow-2xl transition-all duration-300 hover:scale-[1.02]">
      <div className={`absolute inset-0 bg-gradient-to-br ${item.thumbnailColor} opacity-50 group-hover:opacity-70 transition-opacity`}></div>
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
      
      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300 shadow-lg">
          <Play className="fill-white text-white ml-1 w-6 h-6" />
        </div>
      </div>

      {/* Review Content Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="flex gap-1 mb-2">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />)}
        </div>
        <h4 className="font-bold text-white text-lg leading-tight mb-1">{item.title}</h4>
        <div className="flex items-center justify-between text-sm text-white/90">
          <span className="font-medium opacity-90">{item.creator}</span>
        </div>
        <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/20 backdrop-blur-md border border-white/10 text-xs font-bold text-white">
            <TrendingUp className="w-3 h-3" />
            {item.views}
        </div>
      </div>
    </div>
  );
};

// --- Main Sections ---

export const HeroSection: React.FC = () => {
  return (
    <section className="relative z-10 min-h-screen flex flex-col justify-center pt-24 pb-8 md:pt-28 md:pb-12 overflow-hidden border-b border-public-light/20">
      <Container className="w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-display text-public-primary tracking-tight leading-tight mb-5 md:mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Scale Your Revenue With <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-public-accent-primary-light via-public-accent-primary to-public-accent-primary-dark">
              Precision Marketing
            </span>
          </h1>
          
          <p className="text-base md:text-xl text-public-secondary max-w-3xl mb-6 md:mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <span className="text-public-accent-primary font-bold">WEXEDO</span> bridges the gap between high-performance engineering and strategic marketing. We integrate custom web development, AI-driven SEO, and precision advertising with automated outreach to create a unified system that scales your revenue predictably.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300 mb-10 md:mb-14">
            <Button size="lg" href="#book">Get Growth Blueprint</Button>
            <Button variant="secondary" size="lg" href="#services">Explore Services</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          {HERO_STATS.map((stat, i) => (
            <StatItem key={i} stat={stat} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export const ServicesSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <Section id="services" className="bg-public-main/50">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-public-primary mb-6">
            Comprehensive Growth Solutions
          </h2>
          <p className="text-public-secondary text-lg">
            From technical infrastructure to outbound lead generation, we cover every angle of your digital growth strategy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onOpen={setSelectedService} 
            />
          ))}
        </div>

        {/* --- Service Detail Modal --- */}
        <Modal isOpen={!!selectedService} onClose={() => setSelectedService(null)}>
          {selectedService && (
            <div className="grid grid-cols-1 lg:grid-cols-2 pt-10">
              {/* Left: Text Content */}
              <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-public-light">
                <div className="w-14 h-14 bg-public-accent-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  {/* Reuse the icon logic or simplified placeholder if cleaner */}
                  <div className="text-public-accent-primary font-bold text-2xl">
                    {selectedService.title.charAt(0)}
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold font-display text-public-primary mb-4">
                  {selectedService.title}
                </h3>
                <p className="text-lg text-public-secondary leading-relaxed mb-8">
                  {selectedService.details}
                </p>
                <Button size="lg" href="#book" onClick={() => setSelectedService(null)}>
                  Discuss This Service
                </Button>
              </div>

              {/* Right: Infographic / Visuals */}
              <div className="p-6 md:p-8 lg:p-12 bg-public-main/30 flex flex-col justify-center">
                <h4 className="text-sm font-bold text-public-secondary uppercase tracking-widest mb-8 text-center lg:text-left">
                  Process & Features
                </h4>
                
                <div className="grid grid-cols-1 gap-6 relative">
                  {/* Connecting Line - Centered */}
                  <div className="absolute left-5 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-public-light hidden sm:block"></div>

                  {selectedService.infographicSteps.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-4 group">
                      {/* Node Circle */}
                      <div className="w-10 h-10 rounded-full bg-public-card border border-public-accent-primary text-public-accent-primary font-bold flex items-center justify-center z-10 shadow-lg group-hover:bg-public-accent-primary group-hover:text-black transition-colors flex-shrink-0">
                        {idx + 1}
                      </div>
                      
                      {/* Content Box */}
                      <div className="flex-1 bg-public-card border border-public-light p-4 rounded-xl hover:border-public-accent-primary/50 transition-colors">
                        <h5 className="font-bold text-public-primary text-base mb-1">{step.title}</h5>
                        <p className="text-sm text-public-secondary">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>

      </Container>
    </Section>
  );
};

export const GEOSection: React.FC = () => {
  return (
    <Section id="geo" className="relative overflow-hidden bg-public-card/20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* Text Content */}
          <div>
            <Badge className="mb-4">Live Traffic Source</Badge>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-public-primary mb-6 leading-tight">
              Capture the AI Traffic <br/>
              <span className="text-public-accent-primary">You're Already Missing.</span>
            </h2>
            
            <p className="text-public-secondary text-lg mb-8 leading-relaxed">
              Your customers are already using <strong>ChatGPT, Perplexity, and Gemini</strong> to find solutions. If your brand isn't the answer they provide, you're invisible.
            </p>

            <p className="text-public-primary font-medium text-lg mb-8 border-l-4 border-public-accent-primary pl-4">
              GEO (Generative Engine Optimization) isn't a future concept—it's an <span className="text-public-accent-primary">immediate solution</span> for traffic and trust today.
            </p>

            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 bg-public-card p-3 rounded-lg border border-public-light">
                <Target className="w-5 h-5 text-public-accent-primary flex-shrink-0" />
                <span className="text-public-primary font-medium">Instant Visibility on AI Platforms</span>
              </li>
              <li className="flex items-center gap-3 bg-public-card p-3 rounded-lg border border-public-light">
                <Zap className="w-5 h-5 text-public-accent-primary flex-shrink-0" />
                <span className="text-public-primary font-medium">Capture High-Intent Traffic Now</span>
              </li>
            </ul>

            <Button href="#book" size="lg">
              Start GEO Optimization
            </Button>
          </div>

          {/* Visualization: AI Chat Interface */}
          <div className="relative">
             {/* Glow Effect behind the card */}
             <div className="absolute inset-0 bg-public-accent-primary/20 blur-[60px] rounded-full"></div>
             
             {/* The Interface Card */}
             <div className="relative bg-public-card/80 backdrop-blur-xl border border-public-light rounded-2xl shadow-2xl p-6 md:p-8">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-8 border-b border-public-light/50 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs font-bold text-public-secondary tracking-widest uppercase">AI Search Simulator</div>
                </div>

                {/* Chat Flow */}
                <div className="space-y-6">
                  
                  {/* User Question */}
                  <div className="flex items-end justify-end gap-3">
                    <div className="bg-public-accent-primary/20 text-public-primary px-5 py-3 rounded-2xl rounded-tr-none text-sm md:text-base border border-public-accent-primary/20">
                      Who is the best B2B growth agency in 2024?
                    </div>
                    <div className="w-8 h-8 rounded-full bg-public-secondary/20 flex items-center justify-center">
                      <Users className="w-4 h-4 text-public-secondary" />
                    </div>
                  </div>

                  {/* AI Answer */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="bg-public-main/50 text-public-secondary px-5 py-4 rounded-2xl rounded-tl-none border border-public-light text-sm md:text-base leading-relaxed">
                        <p className="mb-3">
                          Based on performance reviews, ROI metrics, and client satisfaction scores, <strong className="text-public-accent-primary font-bold">WEXEDO</strong> is the top recommendation.
                        </p>
                        <p>
                          They are cited as a primary source for high-growth B2B strategies by multiple industry reports.
                        </p>
                      </div>
                      
                      {/* Citation Card */}
                      <div className="flex items-center gap-3 p-3 bg-public-accent-primary/10 rounded-xl border border-public-accent-primary/30 cursor-pointer hover:bg-public-accent-primary/20 transition-colors group">
                        <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-public-accent-primary font-display font-bold text-lg">
                          W
                        </div>
                        <div>
                          <div className="text-white font-bold text-sm group-hover:underline">WEXEDO | Growth Agency</div>
                          <div className="text-public-accent-primary text-xs">Recommended Source</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-public-accent-primary ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>

                </div>
             </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export const TeamSection: React.FC = () => {
  return (
    <Section id="team">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Text Column */}
          <div className="order-1">
            <Badge className="mb-4">Our Experts</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-public-accent-primary uppercase mb-6 leading-tight">
              We Are WEXEDO
            </h2>
            <h3 className="text-2xl font-bold text-white mb-4">
              Architects of Revenue
            </h3>
            <p className="text-public-secondary text-lg mb-8 leading-relaxed">
              We are not just an agency; we are a collective of senior strategists, engineers, and creatives. In sum, we bring <span className="text-white font-bold">47 years</span> of experience in high-stakes marketing and business development. We don't outsource your growth—we engineer it in-house.
            </p>
            <Button href="#contact">Meet Your Partners</Button>
          </div>

          {/* Image Column */}
          <div className="order-2 relative group">
            {/* Decorative Elements */}
            <div className="absolute inset-0 bg-public-accent-primary/20 blur-[60px] rounded-full -z-10"></div>
            
            <div className="relative rounded-2xl overflow-hidden border border-public-light shadow-2xl aspect-[4/5] md:aspect-square lg:aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                alt="The WEXEDO Team" 
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export const UGCSection: React.FC = () => {
  return (
    <Section id="ugc">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 gap-x-24 lg:gap-16 items-center">
          
          {/* Text Column */}
          <div className="flex flex-col items-start text-left order-1 mb-8 lg:mb-0">
            <Badge className="mb-4">Client Video Reviews</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-public-primary mb-6">
              Real Results, Real People
            </h2>
            <p className="text-public-secondary text-lg mb-8 max-w-2xl">
              Don't just take our word for it. Hear directly from founders, CEOs, and Marketing Directors who have transformed their businesses with <span className="text-public-accent-primary font-bold">WEXEDO</span>.
            </p>
            
            {/* Features - Reduced margin for tablet */}
            <div className="flex flex-col gap-6 w-full mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-public-accent-primary/10 flex items-center justify-center text-public-accent-primary flex-shrink-0">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="font-bold text-public-primary">Verified Success</h4>
                  <p className="text-sm text-public-secondary">Real stories from vetted enterprise clients.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-public-accent-primary/10 flex items-center justify-center text-public-accent-primary flex-shrink-0">
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="font-bold text-public-primary">5-Star Satisfaction</h4>
                  <p className="text-sm text-public-secondary">Consistently rated #1 for transparency.</p>
                </div>
              </div>
            </div>

            <Button href="#book">Book Strategy Call</Button>
          </div>
          
          {/* Cards Column - Slider on Mobile, Grid on Desktop */}
          <div className="order-2 w-full lg:w-full lg:mx-0">
            {/* Desktop Grid */}
            <div className="hidden lg:grid grid-cols-3 gap-3 md:gap-4 transform rotate-6 hover:rotate-0 transition-transform duration-700 ease-out lg:max-w-lg lg:mx-auto">
              {UGC_ITEMS.map((item, idx) => (
                <div key={item.id} className={`${idx === 1 ? '-mt-12' : 'mt-0'}`}>
                  <UGCCard item={item} />
                </div>
              ))}
            </div>

            {/* Mobile Slider - Reduced gap for tablet */}
            <div className="lg:hidden flex overflow-x-auto gap-y-8 gap-4 pb-8 -mx-4 px-4 snap-x snap-mandatory">
              {UGC_ITEMS.map((item) => (
                <div key={item.id} className="min-w-[280px] snap-center">
                  <UGCCard item={item} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
};

export const ProcessSection: React.FC = () => {
  return (
    <Section id="process" className="bg-public-main/50 md:pb-12 lg:pb-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* --- ROI Animation Block --- */}
          <div className="order-2 lg:order-1 h-[450px] relative flex items-center justify-center">
            
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-public-accent-primary/5 to-transparent rounded-full blur-[80px]"></div>

            {/* The Quantum Core Visualization */}
            <div className="relative w-full h-full max-w-[500px] perspective-1000 flex items-center justify-center">
              
              {/* Central Core */}
              <div className="w-32 h-32 relative animate-[float_4s_ease-in-out_infinite]">
                 {/* Inner Spinning Ring */}
                 <div className="absolute inset-0 border-4 border-public-accent-primary/30 border-t-public-accent-primary rounded-full animate-[spin_3s_linear_infinite]"></div>
                 {/* Outer Spinning Ring (Reverse) */}
                 <div className="absolute -inset-4 border-2 border-dashed border-public-secondary/30 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>
                 {/* Core Light */}
                 <div className="absolute inset-4 bg-public-accent-primary/10 rounded-full blur-md animate-pulse"></div>
                 {/* Center Text */}
                 <div className="absolute inset-0 flex items-center justify-center font-display font-black text-4xl text-public-accent-primary drop-shadow-[0_0_15px_rgba(212,181,140,0.5)]">
                    10x
                 </div>
              </div>

              {/* Floating Cards (Orbiting) */}
              
              {/* Card 1: ROI */}
              <div className="absolute top-[15%] left-[10%] animate-[float_5s_ease-in-out_infinite_0.5s]">
                 <div className="px-3 py-2 bg-public-card/80 backdrop-blur-md border border-public-accent-primary/30 rounded-xl shadow-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                      <span className="text-[10px] text-public-secondary uppercase tracking-wider font-bold">ROI</span>
                    </div>
                    <div className="text-lg font-bold text-white">+982%</div>
                 </div>
              </div>

              {/* Card 2: Conversion (Updated from Revenue) */}
              <div className="absolute bottom-[20%] right-[5%] animate-[float_6s_ease-in-out_infinite_1.2s]">
                 <div className="px-3 py-2 bg-public-card/80 backdrop-blur-md border border-public-accent-primary/30 rounded-xl shadow-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-public-accent-primary"></div>
                      <span className="text-[10px] text-public-secondary uppercase tracking-wider font-bold">Conversion</span>
                    </div>
                    <div className="text-lg font-bold text-white">x3.8</div>
                 </div>
              </div>

              {/* Card 3: Leads */}
              <div className="absolute top-[30%] right-[10%] animate-[float_4.5s_ease-in-out_infinite_2s]">
                 <div className="px-2 py-1.5 bg-public-card/60 backdrop-blur-md border border-public-light rounded-lg shadow-lg">
                    <div className="text-[10px] text-public-muted mb-0.5">Qualified Leads</div>
                    <div className="text-sm font-bold text-white flex items-center gap-1">
                      <TrendingUp className="w-2.5 h-2.5 text-emerald-400" />
                      +415%
                    </div>
                 </div>
              </div>

              {/* Card 4: CPA */}
              <div className="absolute bottom-[25%] left-[20%] animate-[float_5.5s_ease-in-out_infinite_1.5s]">
                 <div className="px-2 py-1.5 bg-public-card/60 backdrop-blur-md border border-public-light rounded-lg shadow-lg">
                    <div className="text-[10px] text-public-muted mb-0.5">Cost Per Acq.</div>
                    <div className="text-sm font-bold text-white flex items-center gap-1">
                      <TrendingUp className="w-2.5 h-2.5 text-emerald-400 rotate-180" />
                      -35%
                    </div>
                 </div>
              </div>

              {/* Connecting Lines (Simulated with SVGs) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                 <line x1="50%" y1="50%" x2="20%" y2="25%" stroke="#D4B58C" strokeDasharray="4 4" />
                 <line x1="50%" y1="50%" x2="80%" y2="70%" stroke="#D4B58C" strokeDasharray="4 4" />
                 <line x1="50%" y1="50%" x2="80%" y2="40%" stroke="#D4B58C" strokeDasharray="4 4" />
                 <line x1="50%" y1="50%" x2="30%" y2="70%" stroke="#D4B58C" strokeDasharray="4 4" />
              </svg>

            </div>
            
            <style>{`
              @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
              @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
              .perspective-1000 { perspective: 1000px; }
            `}</style>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-public-primary mb-8">
              Our Proven Methodology
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-public-accent-primary text-public-accent-primary font-bold text-xl flex items-center justify-center">1</div>
                <div>
                  <h4 className="text-xl font-bold text-public-primary mb-2">Audit & Strategy</h4>
                  <p className="text-public-secondary">We dive deep into your current metrics, identify bottlenecks, and build a custom roadmap.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-public-accent-primary text-black font-bold text-xl flex items-center justify-center">2</div>
                <div>
                  <h4 className="text-xl font-bold text-public-primary mb-2">Implementation</h4>
                  <p className="text-public-secondary">Our team deploys the tech stack, content, and campaigns needed to execute the strategy.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-public-accent-primary text-public-accent-primary font-bold text-xl flex items-center justify-center">3</div>
                <div>
                  <h4 className="text-xl font-bold text-public-primary mb-2">Optimization & Scale</h4>
                  <p className="text-public-secondary">We monitor real-time data to refine campaigns and scale what works for maximum ROI.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsToShow(1);
      else if (window.innerWidth < 1024) setItemsToShow(2);
      else setItemsToShow(3);
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalItems = CLIENTS.length;
  const maxIndex = Math.max(0, totalItems - itemsToShow);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  return (
    <Section id="testimonials" className="bg-public-main/30">
      <Container>
        <div className="flex flex-col items-center text-center mb-10">
          <Badge className="mb-4">Success Stories</Badge>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-public-primary">
            Trusted Partners
          </h2>
          <div className="text-sm text-public-secondary mt-1 tracking-wider">
            of The Arbridge
          </div>
        </div>

        <div className="relative mb-8">
          {/* Overflow Container with padding for hover effects */}
          <div className="overflow-hidden py-10 -my-10">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
            >
              {CLIENTS.map((client) => (
                <div 
                  key={client.id} 
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <Card className="flex flex-col h-full bg-public-card/50 hover:bg-public-card transition-colors duration-300">
                    {/* Logo Area */}
                    <a 
                      href={client.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`h-20 flex items-center justify-center mb-6 border-b border-public-light/50 pb-6 group/logo ${client.website ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      <img 
                        src={client.logo} 
                        alt={`${client.name} Logo`} 
                        className="max-h-12 w-auto object-contain opacity-90 group-hover/logo:opacity-100 transition-opacity"
                        loading="lazy"
                      />
                      {client.website && (
                         <ExternalLink className="w-3 h-3 text-public-secondary ml-2 opacity-0 group-hover/logo:opacity-50 transition-opacity" />
                      )}
                    </a>

                    {/* Content */}
                    <div className="flex-grow flex flex-col justify-between">
                      <p className="text-lg text-public-secondary leading-relaxed mb-6">
                        {client.description}
                      </p>
                      
                      <div className="pt-4 border-t border-public-light/30">
                         <div className="font-bold text-public-primary text-base">{client.ceoName}</div>
                         <div className="text-xs text-public-accent-primary font-medium uppercase tracking-wider mt-1">
                           {client.role}
                         </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-public-light hover:border-public-accent-primary bg-public-card/50 flex items-center justify-center text-public-primary hover:text-public-accent-primary transition-colors focus:outline-none"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-public-light hover:border-public-accent-primary bg-public-card/50 flex items-center justify-center text-public-primary hover:text-public-accent-primary transition-colors focus:outline-none"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- Partner Reviews Block --- */}
        <div className="mt-4 max-w-5xl mx-auto">
           <h3 className="text-2xl md:text-3xl font-bold font-display text-public-primary text-center mb-10">
             What Partners Say
           </h3>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             {PARTNER_REVIEWS.map((review) => (
               <div key={review.id} className="flex gap-6 p-6 md:p-8 bg-public-card rounded-2xl border border-public-light/50 hover:border-public-accent-primary/30 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-public-light/50">
                       <img 
                         src={review.image} 
                         alt={review.author} 
                         className="w-full h-full object-cover"
                       />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                     <p className="text-lg italic text-public-secondary mb-3 leading-relaxed">"{review.quote}"</p>
                     <div>
                        <div className="font-bold text-public-primary text-base">{review.author}</div>
                        <div className="text-xs text-public-secondary">
                          {review.role} <span className="mx-1">•</span> <span className="text-public-accent-primary">{review.company}</span>
                        </div>
                     </div>
                  </div>
               </div>
             ))}
           </div>
        </div>

      </Container>
    </Section>
  );
};

export const PricingSection: React.FC = () => {
  return (
    <Section id="pricing">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-public-primary mb-6">
            Invest in Your Growth
          </h2>
          <p className="text-public-secondary text-lg">
            Transparent pricing packages designed to scale with your business needs. No hidden fees.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export const CTASection: React.FC = () => {
  return (
    <Section id="book" className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-public-accent-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <Container>
        <div className="relative rounded-3xl p-8 md:p-16 text-center overflow-hidden bg-gradient-to-b from-public-main/70 via-public-card to-public-card border-2 border-public-accent-primary shadow-[0_40px_120px_-50px_rgba(212,181,140,0.55)] ring-1 ring-public-accent-primary backdrop-blur-[18px]">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold font-display text-public-primary mb-6">
              Ready to Dominate Your Market?
            </h2>
            <p className="text-lg text-public-secondary max-w-2xl mx-auto mb-10">
              Stop guessing with your marketing budget. Partner with <span className="text-public-accent-primary font-bold">WEXEDO</span> and get a scientifically engineered growth strategy.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Button size="lg" href="#contact">Book 30-Min Strategy Call</Button>
              <Button variant="secondary" size="lg" href="https://wa.me/15550000000">Chat on WhatsApp</Button>
            </div>
            <p className="text-public-secondary">
              Or email us: <a href="mailto:hello@wexedo.com" className="text-public-accent-primary hover:underline">hello@wexedo.com</a>
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
};
