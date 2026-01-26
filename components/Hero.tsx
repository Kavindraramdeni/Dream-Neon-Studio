import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, Facebook, Instagram, Twitter, Linkedin, ArrowRight, Menu, X, ShoppingBag, Type, Layers, Briefcase, Gem, ChevronRight as ChevronIcon, Camera } from 'lucide-react';

interface HeroProps {
  onStartNeon: () => void;
  onStartFloro: () => void;
  onOpenPremium: () => void;
  onOpenBusiness: () => void;
  onOpenContact: () => void;
  onOpenFAQ: () => void;
  onOpenBlog: () => void;
  onGoHome: () => void;
  currentNeonColor?: string;
  cart?: any[];
  onOpenCart?: () => void;
}

const RAINBOW_GRADIENT = "linear-gradient(90deg, #ff00ff, #ec4899, #f97316, #eab308, #84cc16, #10b981, #06b6d4)";
const BUTTON_GRADIENT = "linear-gradient(to right, #d946ef, #ec4899, #f97316, #84cc16, #06b6d4, #3b82f6)";

const STUDIO_COLLECTIONS = [
  { 
    id: 'cafe', 
    title: 'Cafe &\nBar', 
    description: 'Bespoke lighting for social hubs and late-night vibes.', 
    img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&fit=crop' 
  },
  { 
    id: 'gaming', 
    title: 'Cyber\nGaming', 
    description: 'Immersive setups designed for elite battlestations.', 
    img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&fit=crop' 
  },
  { 
    id: 'luxe', 
    title: 'Modern\nLuxe', 
    description: 'Elegant accents that define premium contemporary living.', 
    img: 'https://images.unsplash.com/photo-1620241608701-94ef138c7ec9?w=800&fit=crop' 
  },
  { 
    id: 'street', 
    title: 'Street\nArt', 
    description: 'Raw energy and urban culture captured in vibrant light.', 
    img: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&fit=crop' 
  },
  { 
    id: 'minimal', 
    title: 'Minimalist', 
    description: 'Clean geometric lines for maximum aesthetic impact.', 
    img: 'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?w=800&fit=crop' 
  },
  { 
    id: 'corporate', 
    title: 'Corporate', 
    description: 'Identity redefined through high-precision illumination.', 
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&fit=crop' 
  }
];

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&fit=crop',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&fit=crop',
  'https://images.unsplash.com/photo-1620241608701-94ef138c7ec9?w=800&fit=crop',
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&fit=crop',
  'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?w=800&fit=crop',
];

const Hero: React.FC<HeroProps> = ({ 
  onStartNeon, 
  onStartFloro, 
  onOpenPremium, 
  onOpenBusiness, 
  onOpenContact, 
  onOpenFAQ, 
  onOpenBlog, 
  onGoHome, 
  cart = [],
  onOpenCart
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const productPillars = [
    { 
      id: 'custom', 
      title: 'CUSTOMISE\nNEON SIGN', 
      description: 'Handcrafted fixed-color signs. Timeless, durable, and perfect for that classic glow.',
      btnText: 'Customize Now',
      icon: <Type size={28} />, 
      action: onStartNeon, 
      img: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&fit=crop' 
    },
    { 
      id: 'floro', 
      title: 'CUSTOMISE\nFLORO SIGN', 
      description: '200+ dynamic flow modes controlled via smartphone for a living atmosphere.',
      btnText: 'Customize Now',
      icon: <Layers size={28} />, 
      action: onStartFloro, 
      img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&fit=crop' 
    },
    { 
      id: 'business', 
      title: 'BUSINESS\nLOGO', 
      description: 'High-precision LED replicas of your logo for offices and corporate branding.',
      btnText: 'Enquiry Now',
      icon: <Briefcase size={28} />, 
      action: onOpenBusiness, 
      img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&crop=faces&fit=crop' 
    },
    { 
      id: 'premium', 
      title: 'PREMIUM\nCOLLECTION', 
      description: 'Curated masterpieces. Ready-to-ship designs that define modern luxury lighting.',
      btnText: 'Shop Now',
      icon: <Gem size={28} />, 
      action: onOpenPremium, 
      img: 'https://images.unsplash.com/photo-1620241608701-94ef138c7ec9?w=800&fit=crop' 
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative text-left selection:bg-[#bfff00]/30 overflow-x-hidden">
      {/* Mobile Sidebar Menu */}
      <div className={`fixed inset-0 z-[300] transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className="absolute top-0 right-0 w-[85%] max-w-[420px] h-full bg-[#0a0a0a] border-l border-white/10 p-10 flex flex-col shadow-2xl">
          <div className="flex justify-between items-center mb-12">
            <span className="font-orbitron font-black text-2xl text-[#bfff00] tracking-tighter">STUDIO</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all">
              <X size={28} />
            </button>
          </div>
          <nav className="flex flex-col gap-8">
            <button onClick={() => { onGoHome(); setIsMobileMenuOpen(false); }} className="text-4xl font-orbitron font-black uppercase text-left hover:text-[#bfff00] transition-all tracking-tighter">Home</button>
            <button onClick={() => { onOpenPremium(); setIsMobileMenuOpen(false); }} className="text-4xl font-orbitron font-black uppercase text-left hover:text-[#bfff00] transition-all tracking-tighter">Collection</button>
            <button onClick={() => { onOpenBlog(); setIsMobileMenuOpen(false); }} className="text-4xl font-orbitron font-black uppercase text-left hover:text-[#bfff00] transition-all tracking-tighter">Journal</button>
            <button onClick={() => { onOpenContact(); setIsMobileMenuOpen(false); }} className="text-4xl font-orbitron font-black uppercase text-left hover:text-[#bfff00] transition-all tracking-tighter">Contact</button>
            <button onClick={() => { onOpenFAQ(); setIsMobileMenuOpen(false); }} className="text-4xl font-orbitron font-black uppercase text-left hover:text-[#bfff00] transition-all tracking-tighter">FAQ</button>
          </nav>
        </div>
      </div>

      {/* Powerhouse Navbar */}
      <nav className="sticky top-0 z-[200] w-full bg-black/80 backdrop-blur-2xl border-b border-white/5 px-6 md:px-12 py-5 flex items-center justify-between">
        <div onClick={onGoHome} className="flex flex-col cursor-pointer group shrink-0">
          <span className="font-orbitron font-black text-2xl md:text-3xl tracking-tighter leading-tight text-white uppercase group-hover:text-[#bfff00] transition-colors">Dream Neon</span>
          <div className="flex items-center gap-2 -mt-1">
             <span className="text-[10px] md:text-[11px] font-black text-white/40 tracking-[0.8em] uppercase">Studio</span>
             <div className="h-[2px] flex-1" style={{ background: RAINBOW_GRADIENT }}></div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-12 text-[11px] font-black uppercase tracking-widest">
          <button onClick={onStartNeon} className="hover:text-[#bfff00] transition-colors py-4 border-b-2 border-transparent hover:border-[#bfff00] pb-1">Customise Your Neon Light</button>
          <button onClick={onOpenPremium} className="hover:text-[#bfff00] transition-colors py-4 border-b-2 border-transparent hover:border-[#bfff00] pb-1">Shop Neon Collection</button>
          <button onClick={onOpenBusiness} className="hover:text-[#bfff00] transition-colors py-4 border-b-2 border-transparent hover:border-[#bfff00] pb-1">Business Logo</button>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative cursor-pointer group" onClick={onOpenCart}>
            <ShoppingBag size={24} className="text-white group-hover:text-[#bfff00] transition-colors" />
            {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-[#bfff00] text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-black shadow-lg">{cart.length}</span>}
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 hover:bg-white/5 rounded-xl transition-all border border-white/10"><Menu size={28} /></button>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="relative flex flex-col items-center justify-center text-center px-6 min-h-[92vh] overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 dot-grid opacity-[0.12]"></div>
          <div 
            className="absolute -top-1/4 -left-1/4 w-[80%] h-[80%] rounded-full blur-[160px] opacity-15 animate-glow-slow"
            style={{ background: 'radial-gradient(circle, #8b0000 0%, transparent 70%)' }}
          ></div>
          <div 
            className="absolute -bottom-1/4 -right-1/4 w-[80%] h-[80%] rounded-full blur-[160px] opacity-15 animate-glow-reverse"
            style={{ background: 'radial-gradient(circle, #064e3b 0%, transparent 70%)' }}
          ></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl pt-10">
          <h1 
            className="text-6xl md:text-[9rem] lg:text-[11rem] font-orbitron font-black tracking-tighter uppercase leading-[0.85] mb-12 select-none"
            style={{ 
              backgroundImage: RAINBOW_GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% auto',
              animation: 'rainbow-move 8s linear infinite'
            }}
          >
            Dream in <br /> light
          </h1>

          <div className="flex flex-col items-center mb-16 space-y-2 opacity-90">
             <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.8em] text-white/60">C R A F T I N G</p>
             <div className="flex items-center gap-4">
                <div className="h-[1px] w-8 md:w-16 bg-[#bfff00]/40"></div>
                <p className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-white">
                  <span className="text-[#bfff00]">ELECTRIFYING</span> ARTISTRY
                </p>
                <div className="h-[1px] w-8 md:w-16 bg-[#bfff00]/40"></div>
             </div>
             <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white/40">FOR GLOBAL SPACES.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button 
              onClick={onStartNeon} 
              className="group relative px-12 py-7 md:px-18 md:py-9 text-white font-orbitron font-black text-[10px] md:text-xs rounded-[2rem] hover:scale-105 active:scale-95 transition-all shadow-[0_25px_50px_rgba(0,0,0,0.6)] uppercase tracking-[0.3em] overflow-hidden flex items-center gap-4"
              style={{ background: BUTTON_GRADIENT }}
            >
              <span className="relative z-10">START DESIGNING</span> 
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button 
              onClick={onOpenPremium} 
              className="group relative px-12 py-7 md:px-18 md:py-9 text-white font-orbitron font-black text-[10px] md:text-xs rounded-[2rem] hover:scale-105 active:scale-95 transition-all shadow-[0_25px_50px_rgba(0,0,0,0.6)] uppercase tracking-[0.3em] overflow-hidden border border-white/20 hover:bg-white/5 flex items-center gap-4"
            >
              <span className="relative z-10">BROWSE COLLECTION</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* EXPLORE OUR PRODUCTS */}
      <section className="bg-black py-12 md:py-16 px-8 relative overflow-hidden text-left border-t border-white/5">
        <div className="max-w-7xl mx-auto mb-12">
          <h2 className="text-4xl md:text-6xl font-orbitron font-black uppercase tracking-tighter mb-2 leading-none text-white">EXPLORE OUR PRODUCTS</h2>
          <p className="text-gray-500 uppercase tracking-[0.4em] text-[10px] md:text-[12px] font-black opacity-80">ELASTIC PILLARS OF LIGHT</p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="product-elastic-grid grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 min-h-[500px] md:min-h-[600px]">
            {productPillars.map((pillar) => (
              <div key={pillar.id} onClick={pillar.action} className="product-pillar-panel relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-white/5 group cursor-pointer transition-all duration-1000 ease-[cubic-bezier(0.16, 1, 0.3, 1)] bg-[#0a0a0a]">
                <img src={pillar.img} alt={pillar.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-30 group-hover:opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">
                   <div className="mb-6 text-white group-hover:text-[#bfff00] transition-colors">{pillar.icon}</div>
                   <h3 className="text-xl md:text-2xl font-orbitron font-black uppercase tracking-tighter text-white mb-4 leading-[0.9] whitespace-pre-line group-hover:text-[#bfff00] transition-colors">
                     {pillar.title}
                   </h3>
                   <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-700 opacity-0 group-hover:opacity-100">
                      <p className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-6 max-w-[200px] leading-relaxed">
                        {pillar.description}
                      </p>
                      <div className="flex items-center gap-3 text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] text-[#bfff00]">
                        {pillar.btnText} <ArrowRight size={16} />
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Collections - Renamed per Request */}
      <section className="bg-black py-16 md:py-20 px-6 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto mb-12 text-center">
          <h2 className="text-4xl md:text-7xl font-orbitron font-black uppercase tracking-tighter mb-4 text-white">Premium Artisan Collections</h2>
          <p className="text-[#bfff00] uppercase tracking-[0.4em] md:tracking-[0.6em] text-[10px] md:text-[14px] font-black">For Every Space & Occasion</p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="studio-elastic-grid grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-6 min-h-[400px] md:min-h-[650px]">
            {STUDIO_COLLECTIONS.map((item) => (
              <div 
                key={item.id} 
                onClick={onOpenPremium} 
                className="studio-pillar-panel relative aspect-[3/5] md:aspect-auto rounded-[2rem] md:rounded-[4.5rem] overflow-hidden border border-white/10 group cursor-pointer transition-all duration-1000 ease-[cubic-bezier(0.16, 1, 0.3, 1)] bg-[#111]"
              >
                <div className="absolute inset-0 transition-all duration-1000 group-hover:scale-110">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                </div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-14 text-center">
                   <h3 className="text-[10px] md:text-xl font-orbitron font-black uppercase tracking-widest md:tracking-tighter text-white leading-tight mb-2 md:mb-6 whitespace-pre-line group-hover:text-[#bfff00] transition-colors">
                     {item.title}
                   </h3>
                   
                   <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-700 h-0 group-hover:h-auto overflow-hidden">
                      <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-300 mb-8 max-w-[240px] mx-auto leading-relaxed">{item.description}</p>
                      <p className="text-[14px] font-black uppercase tracking-[0.3em] text-[#bfff00]">Explore <ArrowRight size={20} className="inline ml-3" /></p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STUDIO GALLERY - INFINITE MARQUEE */}
      <section className="bg-black py-12 md:py-16 overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="text-left">
             <h2 className="text-4xl md:text-6xl font-orbitron font-black uppercase tracking-tighter text-white leading-none">STUDIO<br/>GALLERY</h2>
             <p className="text-[#bfff00] uppercase tracking-[0.4em] text-[10px] md:text-[12px] font-black mt-3">CURATED INSTALLATIONS IN MOTION</p>
          </div>
        </div>

        {/* Marquee Track */}
        <div className="relative group/marquee">
          {/* Gradient Masks */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex animate-marquee gap-4 md:gap-8 px-4">
            {/* Double the array for seamless loop */}
            {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((url, i) => (
              <div key={i} className="relative shrink-0 w-[280px] md:w-[450px] aspect-[4/3] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/5 group/card transition-all duration-500">
                 <img src={url} alt="Installation" className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110" />
                 <div className="absolute inset-0 bg-black/30 group-hover/card:bg-transparent transition-all"></div>
                 <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 opacity-0 group-hover/card:opacity-100 transition-all translate-y-4 group-hover/card:translate-y-0">
                    <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                      <Camera size={14} className="text-[#bfff00]" />
                      <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest">Verified Work</span>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Concierge */}
      <section className="bg-black py-12 md:py-16 px-6 md:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-orbitron font-black uppercase tracking-tighter text-white">Studio Concierge</h2>
            <div className="w-16 md:w-24 h-1.5 md:h-2 bg-[#bfff00] mt-3 md:mt-4"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <div className="col-span-2 md:col-span-1 bg-[#0a0a0a] rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 border border-white/5 group hover:border-white/10 transition-all">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white/5 rounded-2xl md:rounded-3xl flex items-center justify-center text-white mb-8 md:mb-10 border border-white/10 shadow-xl group-hover:bg-[#bfff00]/5 group-hover:border-[#bfff00]/20 transition-all">
                <MessageSquare size={24} className="md:size-[28px]" />
              </div>
              <h3 className="text-xl md:text-3xl font-orbitron font-black uppercase tracking-tighter text-white mb-3 md:mb-4">Instant Chat</h3>
              <p className="text-gray-500 text-[10px] md:text-[11px] font-black uppercase tracking-widest leading-relaxed mb-8 md:mb-12 max-w-[240px]">
                Direct line to our design consultant for rapid project updates.
              </p>
              <a href="https://wa.me/919000376792" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-[#bfff00] text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] group/link hover:gap-5 transition-all">
                WhatsApp Studio <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="col-span-1 bg-[#0a0a0a] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 border border-white/5 group hover:border-white/10 transition-all">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-[#bfff00]/10 rounded-2xl md:rounded-3xl flex items-center justify-center text-[#bfff00] mb-6 md:mb-10 border border-[#bfff00]/20">
                <Phone size={18} className="md:size-[28px]" />
              </div>
              <h3 className="text-sm md:text-3xl font-orbitron font-black uppercase tracking-tighter text-white mb-2 md:mb-4 leading-tight">Consult Voice</h3>
              <p className="text-gray-500 text-[8px] md:text-[11px] font-black uppercase tracking-widest leading-tight md:leading-relaxed mb-6 md:mb-10 max-w-[140px] md:max-w-[200px]">
                Discuss specs and integration.
              </p>
              <a href="tel:+919000376792" className="flex items-center gap-2 text-white text-[8px] md:text-[12px] font-black uppercase tracking-[0.2em] group/link hover:gap-4 transition-all">
                Voice <ArrowRight size={12} className="md:size-[14px] group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="col-span-1 bg-[#0a0a0a] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 border border-white/5 group hover:border-white/10 transition-all">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-white/5 rounded-2xl md:rounded-3xl flex items-center justify-center text-white mb-6 md:mb-10 border border-white/10">
                <Mail size={18} className="md:size-[28px]" />
              </div>
              <h3 className="text-sm md:text-3xl font-orbitron font-black uppercase tracking-tighter text-white mb-2 md:mb-4 leading-tight">Studio Inbox</h3>
              <p className="text-gray-500 text-[8px] md:text-[11px] font-black uppercase tracking-widest leading-tight md:leading-relaxed mb-6 md:mb-10 max-w-[140px] md:max-w-[200px]">
                Submit professional briefs.
              </p>
              <a href="mailto:studio@dreamneon.com" className="flex items-center gap-2 text-white text-[8px] md:text-[12px] font-black uppercase tracking-[0.2em] group/link hover:gap-4 transition-all">
                Email <ArrowRight size={12} className="md:size-[14px] group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black pt-16 pb-12 px-8 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-10 md:gap-16 mb-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-4 flex flex-col gap-8">
            <div onClick={onGoHome} className="flex items-center gap-4 cursor-pointer group">
              <div className="w-12 h-12 rounded-full flex items-center justify-center dream-gradient p-[1px] shadow-[0_0_20px_rgba(255,0,255,0.3)]">
                 <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                   <span className="font-orbitron font-black text-[10px] text-white">DN</span>
                 </div>
              </div>
              <span className="font-orbitron font-black text-2xl tracking-tighter text-white uppercase group-hover:text-[#bfff00] transition-colors">Dream Neon</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed uppercase tracking-widest font-black max-w-xs">
              Handcrafting the world's most elegant neon art. High-precision signage for premium spaces.
            </p>
            <div className="flex gap-8">
              <Facebook size={18} className="text-gray-600 hover:text-white cursor-pointer transition-all" />
              <Instagram size={18} className="text-gray-600 hover:text-white cursor-pointer transition-all" />
              <Twitter size={18} className="text-gray-600 hover:text-white cursor-pointer transition-all" />
              <Linkedin size={18} className="text-gray-600 hover:text-white cursor-pointer transition-all" />
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="text-[10px] font-black mb-6 uppercase tracking-[0.6em] text-white/40">Our Services</h4>
            <ul className="space-y-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">
              <li><button onClick={onStartNeon} className="hover:text-white transition-colors">Custom Neon</button></li>
              <li><button onClick={onStartFloro} className="hover:text-white transition-colors">FloRo Light</button></li>
              <li><button onClick={onOpenBusiness} className="hover:text-white transition-colors">Business Logo</button></li>
              <li><button onClick={onOpenPremium} className="hover:text-white transition-colors">Collection</button></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="text-[10px] font-black mb-6 uppercase tracking-[0.6em] text-white/40">Quick Links</h4>
            <ul className="space-y-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">
              <li><button onClick={onOpenBlog} className="hover:text-white transition-colors">Studio Journal</button></li>
              <li><button onClick={onOpenFAQ} className="hover:text-white transition-colors">Help Center</button></li>
              <li><button className="hover:text-white transition-colors">Shipping Policy</button></li>
              <li><button className="hover:text-white transition-colors">Privacy Terms</button></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Floating Utilities */}
      <div className="fixed bottom-10 right-10 z-[110]">
        <a href="https://wa.me/919000376792" target="_blank" rel="noreferrer" className="w-16 h-16 bg-[#22c55e] text-white rounded-[1.25rem] flex items-center justify-center shadow-[0_20px_40px_rgba(34,197,94,0.3)] hover:scale-110 transition-transform active:scale-95 border border-white/10">
          <div className="w-8 h-8 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
               <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.2A8.38 8.38 0 0 1 11.5 3H12a8.5 8.5 0 0 1 8.5 8.5z" />
               <rect x="7" y="10" width="10" height="2" rx="1" fill="currentColor" stroke="none" />
               <rect x="7" y="14" width="6" height="2" rx="1" fill="currentColor" stroke="none" />
            </svg>
          </div>
        </a>
      </div>

      <style>{`
        @keyframes rainbow-move { to { background-position: 200% center; } }
        @keyframes glow-float {
          0% { transform: translate(0, 0) scale(1); opacity: 0.15; }
          33% { transform: translate(50px, -30px) scale(1.05); opacity: 0.22; }
          66% { transform: translate(-30px, 40px) scale(0.95); opacity: 0.18; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.15; }
        }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 35s linear infinite; width: max-content; }
        .group\/marquee:hover .animate-marquee { animation-play-state: paused; }

        .animate-glow-slow { animation: glow-float 20s infinite ease-in-out; }
        .animate-glow-reverse { animation: glow-float 25s infinite ease-in-out reverse; }
        .dot-grid { background-image: radial-gradient(circle, #ffffff 1.2px, transparent 1.2px); background-size: 35px 35px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .product-elastic-grid { display: grid; grid-template-columns: repeat(2, 1fr); transition: grid-template-columns 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        @media (min-width: 768px) {
           .product-elastic-grid { grid-template-columns: repeat(4, 1fr); }
           .product-elastic-grid:has(.product-pillar-panel:nth-child(1):hover) { grid-template-columns: 4fr 1fr 1fr 1fr; }
           .product-elastic-grid:has(.product-pillar-panel:nth-child(2):hover) { grid-template-columns: 1fr 4fr 1fr 1fr; }
           .product-elastic-grid:has(.product-pillar-panel:nth-child(3):hover) { grid-template-columns: 1fr 1fr 4fr 1fr; }
           .product-elastic-grid:has(.product-pillar-panel:nth-child(4):hover) { grid-template-columns: 1fr 1fr 1fr 4fr; }
        }
        
        .studio-elastic-grid { transition: grid-template-columns 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        @media (min-width: 768px) {
          .studio-elastic-grid { grid-template-columns: repeat(6, 1fr); }
          .studio-elastic-grid:has(.studio-pillar-panel:nth-child(1):hover) { grid-template-columns: 4fr 1fr 1fr 1fr 1fr 1fr; }
          .studio-elastic-grid:has(.studio-pillar-panel:nth-child(2):hover) { grid-template-columns: 1fr 4fr 1fr 1fr 1fr 1fr; }
          .studio-elastic-grid:has(.studio-pillar-panel:nth-child(3):hover) { grid-template-columns: 1fr 1fr 4fr 1fr 1fr 1fr; }
          .studio-elastic-grid:has(.studio-pillar-panel:nth-child(4):hover) { grid-template-columns: 1fr 1fr 1fr 4fr 1fr 1fr; }
          .studio-elastic-grid:has(.studio-pillar-panel:nth-child(5):hover) { grid-template-columns: 1fr 1fr 1fr 1fr 4fr 1fr; }
          .studio-elastic-grid:has(.studio-pillar-panel:nth-child(6):hover) { grid-template-columns: 1fr 1fr 1fr 1fr 1fr 4fr; }
        }
      `}</style>
    </div>
  );
};

export default Hero;