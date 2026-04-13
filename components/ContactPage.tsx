
import React, { useState } from 'react';
import { ChevronLeft, Send, Phone, Mail, MessageSquare, ShieldCheck, CheckCircle2, Loader2, Globe, Menu, X } from 'lucide-react';

interface ContactPageProps {
  onBack: () => void;
  onGoHome: () => void;
  onOpenPremium: () => void;
  onOpenFAQ: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack, onGoHome, onOpenPremium, onOpenFAQ }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    details: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const menuItems = [
    { label: 'Home', action: onGoHome },
    { label: 'Collection', action: onOpenPremium },
    { label: 'FAQ', action: onOpenFAQ },
    { label: 'Contact Us', action: () => setIsMobileMenuOpen(false) },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-700">
        <div className="w-24 h-24 bg-magenta-500/20 rounded-full flex items-center justify-center mb-8 border border-magenta-500/30 animate-pulse">
          <CheckCircle2 size={48} className="text-magenta-500" />
        </div>
        <h2 className="text-4xl font-orbitron font-black uppercase tracking-tighter mb-4">Message Sent</h2>
        <p className="text-gray-400 max-w-md uppercase tracking-widest text-xs font-bold leading-loose">
          Thank you for reaching out. A Dream Neon specialist will contact you at {formData.email} within 24 hours.
        </p>
        <button 
          onClick={onBack}
          className="mt-12 px-10 py-4 border border-white/10 hover:border-magenta-500 hover:text-magenta-500 transition-all text-[10px] font-black uppercase tracking-widest rounded-full"
        >
          Return to Studio
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-magenta-500/30">
      {/* Mobile Sidebar Menu */}
      <div className={`fixed inset-0 z-[300] transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className="absolute top-0 right-0 w-[85%] max-w-[420px] h-full bg-[#0a0a0a] border-l border-white/10 p-10 flex flex-col shadow-2xl">
          <div className="flex justify-between items-center mb-12">
            <span className="font-orbitron font-black text-2xl text-magenta-500 tracking-tighter">STUDIO</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-white/5 rounded-full hover:bg-magenta-500/20 transition-all">
              <X size={28} />
            </button>
          </div>
          <nav className="flex flex-col gap-8">
            {menuItems.map((item, idx) => (
              <button key={idx} onClick={() => { item.action(); setIsMobileMenuOpen(false); }} className="text-4xl font-orbitron font-black uppercase text-left hover:text-magenta-500 transition-all hover:translate-x-4 duration-300 tracking-tighter">
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-white/10 px-8 py-6 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-xl z-[200]">
        <div onClick={onGoHome} className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 rounded-full flex items-center justify-center border border-white/20 group-hover:border-magenta-500 transition-all">
             <span className="font-orbitron font-black text-xs text-white">DN</span>
          </div>
          <div className="flex flex-col">
            <span className="font-orbitron font-black text-lg tracking-tighter leading-none text-white uppercase">Dream Neon</span>
            <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Studio</span>
          </div>
        </div>
        
        <div className="hidden lg:flex gap-12 text-[11px] font-black uppercase tracking-[0.2em] items-center">
          <button onClick={onGoHome} className="hover:text-[#bfff00] transition-colors">Home</button>
          <button onClick={onOpenPremium} className="hover:text-[#bfff00] transition-colors">Shop Collection</button>
          <button onClick={onOpenFAQ} className="hover:text-[#bfff00] transition-colors">FAQ</button>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 hover:bg-white/5 rounded-full transition-all text-white">
            <Menu size={28} />
          </button>
        </div>
      </header>

      <main className="bg-gradient-to-b from-magenta-500/5 via-black to-black min-h-[calc(100vh-80px)]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-orbitron font-black uppercase tracking-tighter mb-6 text-white">
              Contact Us & Get a Quote
            </h2>
            <p className="text-gray-400 uppercase tracking-[0.2em] text-[10px] font-black max-w-xl mx-auto leading-relaxed">
              Ready to start your project? Send us your details below and we'll get back to you shortly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 bg-[#0a0a0a] border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">
               <h3 className="text-2xl font-orbitron font-black uppercase mb-10 tracking-tighter">Request a quote</h3>
               <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 block">Name *</label>
                      <input 
                        required
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-magenta-500 transition-all uppercase text-[11px] font-black tracking-widest rounded-lg" 
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 block">Phone *</label>
                      <input 
                        required
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-magenta-500 transition-all uppercase text-[11px] font-black tracking-widest rounded-lg" 
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 block">Email *</label>
                    <input 
                      required
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-magenta-500 transition-all uppercase text-[11px] font-black tracking-widest rounded-lg" 
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 block">Service Required</label>
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-magenta-500 transition-all uppercase text-[11px] font-black tracking-widest rounded-lg appearance-none cursor-pointer text-gray-300"
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="custom-neon">Custom Neon Sign</option>
                      <option value="floro">Custom FloRo Sign</option>
                      <option value="business">Business Logo</option>
                      <option value="events">Events & Weddings</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 block">Project Details *</label>
                    <textarea 
                      required
                      name="details"
                      value={formData.details}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-magenta-500 transition-all h-32 uppercase text-[10px] font-black tracking-widest rounded-lg resize-none" 
                      placeholder="Describe your project requirements, materials, dimensions, quantity, etc."
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-5 bg-magenta-500 text-white font-orbitron font-black uppercase tracking-tighter text-xl rounded-xl hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-4 shadow-xl disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                    Send Quote Request
                  </button>
               </form>
            </div>
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-[#0a0a0a] border border-white/10 p-10 rounded-3xl space-y-10 shadow-2xl">
                <h3 className="text-xl font-orbitron font-black uppercase tracking-tighter">Get in Touch</h3>
                <div className="flex items-start gap-6 group">
                  <div className="p-4 bg-magenta-500/10 rounded-xl text-magenta-500 group-hover:bg-magenta-500/20 transition-colors"><Phone size={24} /></div>
                  <div>
                     <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1">Phone</p>
                     <p className="text-sm font-bold tracking-widest">+91 90003 76792</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="p-4 bg-magenta-500/10 rounded-xl text-magenta-500 group-hover:bg-magenta-500/20 transition-colors"><Mail size={24} /></div>
                  <div>
                     <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1">Email</p>
                     <p className="text-sm font-bold tracking-widest lowercase">KriaTech@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
