
import React, { useState, useRef } from 'react';
import { ChevronLeft, ArrowRight, Upload, Briefcase, Zap, Globe, Mail, Phone, CheckCircle2, Loader2 } from 'lucide-react';
import { BackboardType } from '../types';

interface BusinessLogoPageProps {
  onBack: () => void;
}

const BusinessLogoPage: React.FC<BusinessLogoPageProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    width: '',
    height: '',
    material: BackboardType.TRANSPARENT,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-[#bfff00]/20 rounded-full flex items-center justify-center mb-8 border border-[#bfff00]/30 animate-pulse">
          <CheckCircle2 size={48} className="text-[#bfff00]" />
        </div>
        <h2 className="text-4xl font-orbitron font-black uppercase tracking-tighter mb-4">Request Sent</h2>
        <p className="text-gray-400 max-w-md uppercase tracking-widest text-xs font-bold leading-loose">
          Our specialists will contact you at {formData.email} shortly.
        </p>
        <button onClick={onBack} className="mt-12 px-10 py-4 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest">Return Home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-magenta-500/30 text-left">
      <header className="border-b border-white/10 px-6 py-6 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-xl z-50">
        <button onClick={onBack} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">
          <ChevronLeft size={16} /> Back
        </button>
        <h1 className="text-xl font-orbitron font-black uppercase tracking-[0.2em]">Business Identity</h1>
        <div className="w-16"></div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 space-y-12">
            <div>
              <span className="text-magenta-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">ILLUMINATE YOUR BRAND</span>
              <h2 className="text-4xl md:text-6xl font-orbitron font-black uppercase tracking-tighter mb-8 leading-none">Your Logo In Neon.</h2>
              <p className="text-gray-400 text-sm leading-relaxed uppercase tracking-widest font-light">
                High-precision LED Neon logos handcrafted for professional spaces.
              </p>
            </div>

            <div className="relative group">
              <div className="relative bg-[#080808] border border-white/10 rounded-3xl p-8 aspect-video flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute top-4 left-4 flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-[#bfff00]"></div>
                   <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Brand Glow Preview</span>
                </div>
                
                {previewImage ? (
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    <img src={previewImage} className="max-w-full max-h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" alt="Logo Preview" />
                  </div>
                ) : (
                  <h3 className="text-3xl font-orbitron font-black uppercase tracking-tighter text-white/40">
                    {formData.companyName || "BRAND ASSET"}
                  </h3>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#0a0a0a] border border-white/10 p-8 lg:p-12 rounded-[2rem] shadow-2xl">
             <h3 className="text-2xl font-orbitron font-black uppercase mb-10 tracking-tighter">Enquiry Details</h3>
             <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 block">Brand Name</label>
                    <input required type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-magenta-500 transition-all uppercase text-[11px] font-black tracking-widest rounded-xl" placeholder="Company Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 block">Email Address</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-magenta-500 transition-all uppercase text-[11px] font-black tracking-widest rounded-xl" placeholder="brand@email.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 block">Upload Logo to see the glow</label>
                  <div onClick={() => fileInputRef.current?.click()} className="w-full border-2 border-dashed border-white/10 p-10 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-magenta-500/50 hover:bg-magenta-500/5 transition-all cursor-pointer group/upload">
                    <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
                    <Upload size={32} className="text-gray-500 group-hover/upload:text-magenta-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Select File or Drop here</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 block">Additional Notes</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-magenta-500 transition-all h-32 uppercase text-[10px] font-black tracking-widest rounded-xl resize-none" placeholder="Dimensions, color, etc..."></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full py-6 bg-[#bfff00] text-black font-orbitron font-black uppercase tracking-tighter text-xl rounded-2xl flex items-center justify-center gap-4 shadow-xl">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <>Submit Request <ArrowRight size={24} /></>}
                </button>
             </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BusinessLogoPage;
