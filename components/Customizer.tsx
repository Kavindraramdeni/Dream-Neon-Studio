
import React, { useState } from 'react';
import { ChevronLeft, X, MessageSquare, Box, Plus, Info, Waves, Palette, Smartphone, MessageCircle } from 'lucide-react';
import { DesignConfig, FONTS, SIZES, ROOMS, BackboardType, SizeOption, CustomizerMode } from '../types';
import NeonPreview from './NeonPreview';

interface CustomizerProps {
  config: DesignConfig;
  setConfig: React.Dispatch<React.SetStateAction<DesignConfig>>;
  onBack: () => void;
  addToCart: (item: any) => void;
}

const PRESET_COLORS = [
  '#ff0000', '#ffffff', '#ff00ff', '#0000ff', '#00ffff', '#bfff00', '#ff8800', '#ffff00',
];

const RAINBOW_GRADIENT = "linear-gradient(90deg, #a855f7, #ec4899, #f43f5e, #f97316, #eab308, #84cc16, #10b981, #06b6d4, #3b82f6)";

const Customizer: React.FC<CustomizerProps> = ({ config, setConfig, onBack, addToCart }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAllFonts, setShowAllFonts] = useState(false);
  const currentRoom = ROOMS.find(r => r.id === config.room) || ROOMS[0];
  const isFloro = config.mode === CustomizerMode.FLORO;

  const handleExit = () => {
    localStorage.setItem('dream_neon_draft', JSON.stringify(config));
    onBack();
  };

  const handleAddToCart = () => {
    addToCart({ ...config, type: 'custom', id: Date.now() });
    setShowCheckout(true);
  };

  const updateSize = (s: SizeOption) => {
    setConfig(prev => ({ ...prev, size: s }));
  };

  const displayedFonts = showAllFonts ? FONTS : FONTS.slice(0, 12);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-black overflow-hidden relative">
      {/* Added to Cart Modal */}
      {showCheckout && (
        <div className="absolute inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 text-left">
          <div className="max-w-md w-full bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10 text-center shadow-2xl animate-in zoom-in duration-300">
             <div className="flex justify-end mb-4">
                <button onClick={() => setShowCheckout(false)} className="text-gray-500 hover:text-white transition-colors"><X size={28} /></button>
             </div>
             <h3 className="text-3xl font-orbitron font-black uppercase mb-6 tracking-tighter text-white">Added to Cart</h3>
             <div className="bg-white/5 rounded-2xl p-6 mb-10 text-left space-y-3 border border-white/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Text: <span className="text-white ml-2">"{config.text || 'N/A'}"</span></p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Font: <span className="text-white ml-2">{config.font}</span></p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Size: <span className="text-white ml-2">{config.size.label}</span></p>
             </div>
             <a href={`https://wa.me/919000376792?text=I've added a custom ${config.mode} sign to my cart: ${config.text}`} target="_blank" rel="noreferrer" className="w-full py-5 bg-[#25d366] text-white font-orbitron font-black uppercase rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:scale-[1.02] transition-all">
                <MessageSquare size={20} /> WhatsApp for Details
             </a>
          </div>
        </div>
      )}

      {/* Preview Section */}
      <div className="relative h-[40vh] lg:h-full lg:flex-1 bg-black overflow-hidden flex flex-col items-center justify-center shrink-0 border-b lg:border-b-0 lg:border-r border-white/5 p-8">
        <button onClick={handleExit} className="absolute top-4 left-4 z-[110] bg-black/60 backdrop-blur-lg p-3 rounded-full border border-white/10 text-white shadow-2xl hover:bg-black transition-all">
           <ChevronLeft size={20} />
        </button>

        <div className="absolute inset-0 z-0">
          <img src={currentRoom.url} className="w-full h-full object-cover opacity-80" alt="Scene" />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Room Switching */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3 p-2 bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10">
          {ROOMS.map(room => (
            <button key={room.id} onClick={() => setConfig(prev => ({ ...prev, room: room.id }))} className={`w-10 h-10 md:w-14 md:h-12 rounded-xl overflow-hidden border-2 transition-all ${config.room === room.id ? 'border-[#bfff00] scale-105 shadow-[0_0_15px_rgba(191,255,0,0.4)]' : 'border-transparent opacity-60 hover:opacity-100'}`}>
              <img src={room.url} className="w-full h-full object-cover" alt={room.name} />
            </button>
          ))}
        </div>

        {/* Neon Preview */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center p-4 pointer-events-none overflow-visible">
          <NeonPreview config={config} />
        </div>
      </div>

      {/* Config Panel */}
      <div className="flex-1 lg:flex-none lg:w-[520px] bg-white text-black overflow-y-auto no-scrollbar p-6 md:p-10 space-y-8 text-left shadow-2xl z-[50]">
        <header className="mb-6">
            <h1 className="text-3xl md:text-4xl font-orbitron font-black uppercase tracking-tighter leading-tight text-black">Customise {config.mode} Sign</h1>
        </header>

        {isFloro && (
          <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-100 mb-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-[#bfff00] mb-3 border border-gray-100 shadow-sm">
                <Waves size={24} />
              </div>
              <p className="text-[9px] font-black uppercase tracking-widest leading-tight text-gray-500">200+ flow<br/>modes</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-[#ec4899] mb-3 border border-gray-100 shadow-sm">
                <Palette size={24} />
              </div>
              <p className="text-[9px] font-black uppercase tracking-widest leading-tight text-gray-500">Unlimited color<br/>changing options</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-[#3b82f6] mb-3 border border-gray-100 shadow-sm">
                <Smartphone size={24} />
              </div>
              <p className="text-[9px] font-black uppercase tracking-widest leading-tight text-gray-500">Smart phone app<br/>control</p>
            </div>
          </div>
        )}

        <section>
          <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-800 block mb-3">Type Your Text</label>
          <textarea 
            value={config.text}
            onChange={(e) => setConfig(prev => ({ ...prev, text: e.target.value }))}
            className="w-full bg-white border-2 border-gray-100 p-5 rounded-2xl text-base font-medium focus:border-black outline-none transition-all text-black min-h-[80px] resize-none shadow-sm"
            placeholder="Your Text Here"
          />
        </section>

        <section>
          <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-800 block mb-4">Pick Your Font</label>
          <div className="grid grid-cols-3 gap-3">
            {displayedFonts.map(f => {
              const isSelected = config.font === f.name;
              return (
                <button 
                  key={f.name} 
                  onClick={() => setConfig(prev => ({ ...prev, font: f.name }))} 
                  className={`p-4 border rounded-xl transition-all text-center flex flex-col items-center justify-center min-h-[70px] overflow-hidden relative shadow-sm ${isSelected ? 'border-transparent text-white' : 'border-gray-100 text-gray-700 bg-white hover:border-black'}`}
                  style={isSelected ? { background: RAINBOW_GRADIENT } : {}}
                >
                  <span className="text-base leading-none block truncate w-full" style={{ fontFamily: f.style }}>
                    {f.name}
                  </span>
                </button>
              );
            })}
          </div>
          {!showAllFonts && FONTS.length > 12 && (
            <button onClick={() => setShowAllFonts(true)} className="w-full mt-6 py-3 border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black hover:border-black transition-all flex items-center justify-center gap-2">
              <Plus size={14} /> Load More Fonts
            </button>
          )}
        </section>

        <section>
          <div className="flex items-center gap-2 mb-5">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-800">Select Size</label>
            <Info size={16} className="text-gray-300" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {SIZES.map(s => {
              const isSelected = config.size.label === s.label;
              return (
                <button 
                  key={s.label} 
                  onClick={() => updateSize(s)} 
                  className={`border-2 rounded-2xl transition-all flex flex-col overflow-hidden text-center group bg-white shadow-md ${isSelected ? 'border-transparent scale-105 shadow-xl' : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <div 
                    className={`py-2 text-[10px] font-black uppercase tracking-widest ${isSelected ? 'text-white' : 'bg-gray-50 text-gray-500 border-b border-gray-100'}`}
                    style={isSelected ? { background: RAINBOW_GRADIENT } : {}}
                  >
                    {s.label}
                  </div>
                  <div className="p-4 bg-white flex flex-col gap-1">
                    <p className="text-[10px] font-black text-gray-800">Width: <span className="font-bold">{s.width}</span></p>
                    <p className="text-[10px] font-black text-gray-800">Height: <span className="font-bold">{s.height}</span></p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-800">Adjust Text Size</label>
            <span className="text-xs font-black text-black">{config.textSize}%</span>
          </div>
          <input 
            type="range" min="30" max="250" value={config.textSize}
            onChange={(e) => setConfig(prev => ({ ...prev, textSize: parseInt(e.target.value) }))}
            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-black"
          />
        </section>

        {!isFloro && (
          <section>
            <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-800 block mb-5">Select Colour</label>
            <div className="flex flex-wrap gap-4 items-center">
              {PRESET_COLORS.map(c => (
                <button key={c} onClick={() => setConfig(prev => ({ ...prev, color: c }))} className={`w-10 h-10 rounded-full border-4 transition-all shadow-md ${config.color === c ? 'border-white scale-110 shadow-xl' : 'border-transparent opacity-80'}`} style={{ backgroundColor: c }} />
              ))}
              <div className={`relative w-10 h-10 rounded-full border-4 overflow-hidden transition-all shadow-md ${!PRESET_COLORS.includes(config.color) ? 'border-white scale-110' : 'border-transparent opacity-80'}`}>
                <input type="color" value={config.color} onChange={(e) => setConfig(prev => ({ ...prev, color: e.target.value }))} className="absolute inset-0 w-full h-full p-0 border-none cursor-pointer bg-transparent scale-150" />
              </div>
            </div>
          </section>
        )}

        <section>
          <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-800 block mb-3">Backboard Type</label>
          <div className="grid grid-cols-1 gap-3">
            {Object.values(BackboardType).map((type) => (
              <button 
                key={type} 
                onClick={() => setConfig(prev => ({ ...prev, backboard: type }))} 
                className={`p-5 border-2 rounded-2xl transition-all text-left flex items-center gap-4 ${config.backboard === type ? 'border-black bg-gray-50' : 'border-gray-100 text-gray-500 hover:border-gray-200'}`}
              >
                <Box size={22} className={config.backboard === type ? 'text-black' : 'text-gray-300'} />
                <span className="text-[11px] font-black uppercase tracking-widest">{type}</span>
              </button>
            ))}
          </div>
        </section>

        <footer className="pt-10 border-t border-gray-100 pb-20 space-y-5">
           <a href={`https://wa.me/919000376792?text=Design Enquiry: "${config.text || 'Preview'}"`} target="_blank" rel="noreferrer" className="w-full py-5 border-2 border-gray-100 text-black font-orbitron font-black text-xs rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all uppercase tracking-tighter shadow-sm">
             <MessageCircle size={20} className="text-[#25d366]" /> WhatsApp now for details
           </a>
           <button onClick={handleAddToCart} className="w-full py-6 text-white font-orbitron font-black text-xl rounded-2xl shadow-2xl active:scale-95 transition-all uppercase tracking-tighter hover:opacity-90" style={{ background: RAINBOW_GRADIENT }}>
             Add to Cart
           </button>
        </footer>
      </div>
    </div>
  );
};

export default Customizer;
