
import React, { useState } from 'react';
import { ChevronLeft, Plus, Minus } from 'lucide-react';

interface FAQPageProps {
  onBack: () => void;
}

const FAQ_DATA = [
  { question: "How much does a custom neon signs cost?", answer: "Custom neon sign costs vary based on size, complexity, and materials. Our standard signs start from ₹2,499. The price depends on the length of the neon tubing and the complexity of the design." },
  { question: "I have my own design/logo. Can I get it customised into a neon signs?", answer: "Absolutely! We specialize in transforming brand logos into vibrant neon artworks. Upload your file in the Business section or send us a high-res PDF/Vector for a precise mockup and custom quote." },
  { question: "How long will it take to deliver my neon sign?", answer: "Production typically takes 3-5 days. Shipping takes another 2-4 business days. You will receive a tracking number as soon as your light leaves our studio." },
  { question: "Can you do a rush order?", answer: "Yes, we offer priority manufacturing for urgent requirements (events, launches, gifts). Contact our support team directly via WhatsApp for expedited options." },
  { question: "If I customise a sign using the online neon sign maker, what will be its exact size?", answer: "The dimensions displayed in the editor are accurate. We build based on the total width. Regular is approx 20\", Medium is 30\", and Large is 40\"." },
  { question: "What are the small marks on my sign?", answer: "LED neon is handcrafted. Microscopic glue marks or tiny scratches on the acrylic are sometimes inherent to the hand-bonding process but are invisible when the sign is illuminated." },
  { question: "Does the neon sign buzz?", answer: "No. Unlike traditional gas neon, our high-quality LED neon is completely silent, remains cool to the touch, and is significantly more energy-efficient." },
  { question: "How do I make sure that I mount my neon lights/signs in a safe and secure manner?", answer: "Each sign comes with pre-drilled holes and a mounting kit. We recommend using a stable wall surface. For large installations, professional wall anchors are suggested." },
  { question: "Can you have quality LED neon signs without the cords?", answer: "Currently, our signs require a power cord for consistent high brightness. We use transparent cables for a nearly invisible look that blends into your decor." },
  { question: "What if my custom neon signs is damaged in transit?", answer: "We provide full replacement insurance. If your sign arrives damaged, please take photos/video of the packaging and the sign immediately and contact us within 24 hours." }
];

const FAQPage: React.FC<FAQPageProps> = ({ onBack }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#bfff00]/30">
      <header className="border-b border-white/10 px-8 py-6 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-xl z-[200]">
        <button onClick={onBack} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">
          <ChevronLeft size={16} /> Back
        </button>
        <h1 className="text-xl font-orbitron font-black uppercase tracking-[0.2em]">Dream FAQ</h1>
        <div className="w-16"></div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl md:text-7xl font-orbitron font-black uppercase tracking-tighter mb-20 text-white">
          FAQ
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-2 text-left items-start">
          {FAQ_DATA.map((item, idx) => (
            <div key={idx} className="border-b border-white/10">
              <button 
                onClick={() => toggleAccordion(idx)}
                className="w-full py-8 flex items-center justify-between group text-left"
              >
                <span className={`text-[12px] md:text-sm font-bold uppercase tracking-widest transition-colors ${openIndex === idx ? 'text-[#bfff00]' : 'text-gray-300 group-hover:text-white'}`}>
                  {item.question}
                </span>
                {openIndex === idx ? (
                  <Minus size={18} className="text-[#bfff00] shrink-0" />
                ) : (
                  <Plus size={18} className="text-gray-500 group-hover:text-[#bfff00] shrink-0 transition-transform group-hover:rotate-90" />
                )}
              </button>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === idx ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-medium uppercase tracking-widest">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <button className="px-12 py-4 bg-[#bfff00] text-black font-orbitron font-black text-xs uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-xl active:scale-95">
            View All Questions
          </button>
        </div>
      </main>
    </div>
  );
};

export default FAQPage;
