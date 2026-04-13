
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, X, SlidersHorizontal, ChevronDown, MessageSquare, Heart, Check, ArrowRight, Trash2, Plus, Zap, ArrowLeft, Loader2, Sparkles, Wand2 } from 'lucide-react';

interface PremiumPageProps {
  onBack: () => void;
  onStartNeon: () => void;
  onStartFloro: () => void;
  onOpenBusiness: () => void;
  onOpenFAQ: () => void;
  cart: any[];
  addToCart: (item: any) => void;
  removeFromCart: (cartId: number) => void;
  currentNeonColor?: string;
}

const SORT_OPTIONS = [
  "Featured", 
  "Best selling", 
  "Alphabetically, A-Z", 
  "Alphabetically, Z-A",
  "Price, low to high", 
  "Price, high to low", 
  "Date, old to new", 
  "Date, new to old"
];

const NAV_CATEGORIES = [
  "Shop All", "Neon", "FloRo", "Cafe", "Christmas", "Gods", "Millionaire", "Wings", "Cars", 
  "Gaming", "Gym", "Kids", "Under 4000", "Diwali", "Salon", "Bar", "Wedding"
];

const MOCK_PRODUCTS = [
  ...Array.from({ length: 72 }).map((_, i) => ({
    id: i + 1,
    category: NAV_CATEGORIES[1 + (i % (NAV_CATEGORIES.length - 1))],
    type: i % 2 === 0 ? 'Neon' : 'FloRo',
    title: `${['Aura', 'Glow', 'Nova', 'Pulse', 'Vibe', 'Luxe', 'Zen', 'Cyber', 'Neon', 'Flow'][i % 10]} ${i + 1}`,
    price: 2500 + (Math.floor(Math.random() * 7500)),
    oldPrice: 15000 - (i * 120),
    sales: Math.floor(Math.random() * 5000),
    date: new Date(2024, 0, Math.floor(Math.random() * 365)),
    img: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&fit=crop',
      'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&fit=crop',
      'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?w=600&fit=crop',
      'https://images.unsplash.com/photo-1620241608701-94ef138c7ec9?w=600&fit=crop'
    ][i % 5]
  }))
];

const ITEMS_PER_PAGE = 12;

const PremiumPage: React.FC<PremiumPageProps> = ({ 
  onBack, 
  onStartNeon,
  onStartFloro,
  onOpenBusiness, 
  onOpenFAQ, 
  cart, 
  addToCart, 
  removeFromCart
}) => {
  const [activeCat, setActiveCat] = useState('Shop All');
  const [sortOrder, setSortOrder] = useState('Featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [addingId, setAddingId] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState<any | null>(null);
  const [isProcessingAdd, setIsProcessingAdd] = useState(false);
  
  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const bagListRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when overlays are active to prevent dialog moving on scroll
  useEffect(() => {
    if (showConfirm || showCart) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [showConfirm, showCart]);

  const isInCart = (id: number) => cart.some(item => item.id === id);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSort(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredAndSortedProducts = (() => {
    let list = [...MOCK_PRODUCTS];
    if (activeCat !== 'Shop All') {
      list = list.filter(p => p.category === activeCat);
    }
    
    switch (sortOrder) {
      case 'Best selling': list.sort((a, b) => b.sales - a.sales); break;
      case 'Alphabetically, A-Z': list.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'Alphabetically, Z-A': list.sort((a, b) => b.title.localeCompare(a.title)); break;
      case 'Price, low to high': list.sort((a, b) => a.price - b.price); break;
      case 'Price, high to low': list.sort((a, b) => b.price - a.price); break;
      case 'Date, new to old': list.sort((a, b) => b.date.getTime() - a.date.getTime()); break;
      case 'Date, old to new': list.sort((a, b) => a.date.getTime() - b.date.getTime()); break;
      default: break; 
    }

    const specialItems: any[] = [];
    if (activeCat === 'Shop All' || activeCat === 'Neon') {
      specialItems.push({
        id: 'special-neon',
        isSpecial: true,
        type: 'Neon',
        title: 'Customize Your Neon',
        img: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&fit=crop',
        action: onStartNeon
      });
    }
    if (activeCat === 'Shop All' || activeCat === 'FloRo') {
      specialItems.push({
        id: 'special-floro',
        isSpecial: true,
        type: 'FloRo',
        title: 'Customize Your FloRo',
        img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&fit=crop',
        action: onStartFloro
      });
    }

    return [...specialItems, ...list];
  })();

  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredAndSortedProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const confirmAddToCart = async () => {
    if (!showConfirm || isProcessingAdd) return;
    setIsProcessingAdd(true);
    setAddingId(showConfirm.id);
    addToCart(showConfirm);
    
    setTimeout(() => {
      setIsProcessingAdd(false);
      setShowConfirm(null);
      setAddingId(null);
      setShowCart(true);
      // Directly move to top of bag drawer
      if (bagListRef.current) {
        bagListRef.current.scrollTop = 0;
      }
    }, 300);
  };

  const handleHeartClick = (e: React.MouseEvent, prod: any) => {
    e.stopPropagation();
    if (!isInCart(prod.id)) {
      setAddingId(prod.id);
      addToCart(prod);
      setTimeout(() => setAddingId(null), 800);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative text-left overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-[200] w-full h-[80px] bg-black border-b border-white/5 px-4 md:px-12 flex items-center justify-between shadow-lg">
        <div onClick={onBack} className="flex items-center gap-3 cursor-pointer group">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center dream-gradient p-[1px] group-hover:scale-110 transition-transform">
             <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
               <span className="font-orbitron font-black text-[10px] text-white">DN</span>
             </div>
          </div>
          <div className="flex flex-col">
            <span className="font-orbitron font-black text-base md:text-lg tracking-tighter leading-none text-white uppercase group-hover:text-[#bfff00] transition-colors">Dream Neon</span>
            <span className="text-[8px] md:text-[10px] font-bold text-gray-500 tracking-[0.3em] uppercase">KriaTech</span>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
           <div className="relative cursor-pointer group" onClick={() => setShowCart(true)}>
              <ShoppingBag size={20} className={`text-white group-hover:text-[#bfff00] transition-all ${addingId ? 'scale-125 text-[#bfff00]' : ''}`} />
              <span className="absolute -top-2 -right-2 bg-[#bfff00] text-black text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(191,255,0,0.5)]">
                {cart.length}
              </span>
           </div>
        </div>
      </header>

      {/* Category Nav */}
      <div className="sticky top-[80px] z-[160] bg-black border-b border-white/10 w-full overflow-hidden backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center px-4 py-4 md:py-5 overflow-x-auto no-scrollbar scroll-smooth gap-8 md:gap-12">
          {NAV_CATEGORIES.map((cat) => (
            <button 
              key={cat} 
              onClick={() => { setActiveCat(cat); setCurrentPage(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`text-[10px] md:text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all ${activeCat === cat ? 'text-[#bfff00] drop-shadow-[0_0_12px_rgba(191,255,0,0.8)]' : 'text-white/60 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Utility Bar */}
      <div className="bg-white text-black py-3 md:py-4 px-4 md:px-6 relative z-[150] shadow-sm border-b border-black/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="relative" ref={filterRef}>
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 text-[9px] md:text-[11px] font-black uppercase tracking-widest text-black">
              <SlidersHorizontal size={14} className="md:size-[16px]" /> <span className="hidden sm:inline">Filters</span>
            </button>
            {showFilters && (
              <div className="absolute top-full left-0 mt-4 w-72 bg-white border border-black/10 shadow-2xl rounded-2xl p-4 md:p-6 z-[160] animate-in slide-in-from-top-2">
                <div className="max-h-[60vh] overflow-y-auto no-scrollbar">
                  {NAV_CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => { setActiveCat(cat); setShowFilters(false); }} className={`text-left w-full py-3 px-4 rounded-lg text-[10px] font-black uppercase tracking-widest border-b border-black/5 last:border-0 ${activeCat === cat ? 'bg-black text-white' : 'text-black hover:bg-gray-100'}`}>{cat}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <h2 className="text-[9px] md:text-xs font-black uppercase tracking-[0.3em] text-black text-center flex-1">{activeCat}</h2>
          <div className="relative" ref={sortRef}>
            <button onClick={() => setShowSort(!showSort)} className="flex items-center gap-2 text-[9px] md:text-[11px] font-black uppercase tracking-widest text-black">
              <span className="hidden sm:inline">Sort</span> <ChevronDown size={14} />
            </button>
            {showSort && (
              <div className="absolute top-full right-0 mt-4 w-64 bg-white border border-black/10 shadow-2xl rounded-2xl p-4 md:p-6 z-[160] animate-in slide-in-from-top-2">
                {SORT_OPTIONS.map(opt => (
                  <button key={opt} onClick={() => { setSortOrder(opt); setShowSort(false); }} className={`text-left w-full py-3 px-4 rounded-lg text-[10px] font-black uppercase tracking-widest border-b border-black/5 last:border-0 ${sortOrder === opt ? 'bg-black text-white' : 'text-black hover:bg-gray-100'}`}>{opt}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid - Responsive columns: 2 (mobile) -> 3 (tablet) -> 4 (desktop) */}
      <main className="flex-1 w-full px-3 md:px-6 py-8 md:py-12 bg-black min-h-[50vh]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
          {paginatedProducts.map((prod) => (
            <div key={prod.id} className={`product-card group flex flex-col h-full bg-[#0a0a0a] border ${prod.isSpecial ? 'border-[#bfff00]/30 dream-gradient p-[1px]' : 'border-white/5'} rounded-[1.5rem] md:rounded-[2rem] overflow-hidden hover:border-white/20 transition-all duration-500 relative`}>
              <div className={`w-full h-full flex flex-col bg-[#0a0a0a] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden`}>
                <div className="aspect-square overflow-hidden relative cursor-pointer" onClick={prod.isSpecial ? prod.action : undefined}>
                  <img src={prod.img} alt={prod.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  {!prod.isSpecial && (
                    <button 
                      onClick={(e) => handleHeartClick(e, prod)}
                      className="absolute top-3 right-3 md:top-6 md:right-6 z-10 p-2 md:p-3 bg-black/50 backdrop-blur-xl rounded-full border border-white/10 active:scale-125 transition-transform"
                    >
                      <Heart size={14} className={isInCart(prod.id) ? "text-red-500 fill-red-500" : "text-white"} />
                    </button>
                  )}
                  {prod.isSpecial && (
                    <div className="absolute top-3 left-3 md:top-6 md:left-6 px-3 py-1 bg-[#bfff00] text-black text-[7px] md:text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
                      Custom Design
                    </div>
                  )}
                </div>
                <div className="p-4 md:p-8 flex flex-col gap-1 md:gap-3 flex-1">
                  <h3 className="text-[10px] md:text-sm font-orbitron font-black uppercase tracking-tighter text-white group-hover:text-[#bfff00] transition-colors leading-tight line-clamp-1">{prod.title}</h3>
                  {!prod.isSpecial && <p className="text-xs md:text-lg font-black text-[#bfff00] tracking-tighter">₹{prod.price.toLocaleString()}</p>}
                  {prod.isSpecial && <p className="text-[7px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest">Starts from ₹2,499</p>}
                  
                  <div className="pt-4 md:pt-8 border-t border-white/5 mt-auto">
                    <button 
                      onClick={(e) => { e.stopPropagation(); prod.isSpecial ? prod.action() : setShowConfirm(prod); }}
                      className={`w-full py-2.5 md:py-4 text-[7px] md:text-[10px] font-black uppercase tracking-[0.2em] rounded-lg md:rounded-xl flex items-center justify-center gap-1 md:gap-2 transition-all ${prod.isSpecial ? 'bg-[#bfff00] text-black hover:scale-105 active:scale-95' : 'bg-white/5 group-hover:bg-[#bfff00] group-hover:text-black shadow-lg'}`}
                    >
                      {prod.isSpecial ? <>Create <ArrowRight size={10}/></> : <>Add to Bag <ArrowRight size={10}/></>}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 md:mt-24 flex justify-center items-center gap-2 md:gap-3 pb-10">
             <button onClick={() => {setCurrentPage(p => Math.max(1, p-1)); window.scrollTo({top: 0, behavior: 'smooth'});}} disabled={currentPage === 1} className="w-10 h-10 md:w-12 md:h-12 bg-white/5 disabled:opacity-20 rounded-lg md:rounded-xl flex items-center justify-center border border-white/5"><ArrowLeft size={16}/></button>
             {getPageNumbers().map((n, i) => (
               <button key={i} onClick={() => typeof n === 'number' && (setCurrentPage(n), window.scrollTo({top: 0, behavior: 'smooth'}))} className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black border ${currentPage === n ? 'bg-[#bfff00] text-black border-[#bfff00]' : 'bg-white/5 text-white border-white/5'}`}>{n}</button>
             ))}
             <button onClick={() => {setCurrentPage(p => Math.min(totalPages, p+1)); window.scrollTo({top: 0, behavior: 'smooth'});}} disabled={currentPage === totalPages} className="w-10 h-10 md:w-12 md:h-12 bg-white/5 disabled:opacity-20 rounded-lg md:rounded-xl flex items-center justify-center border border-white/5"><ArrowRight size={16}/></button>
          </div>
        )}
      </main>

      {/* VIEWPORT FIXED CENTERED DIALOG BOX */}
      {showConfirm && (
        <div className="fixed inset-0 z-[1000] w-full h-[100dvh] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6 animate-in fade-in duration-300">
           {/* Backdrop Click */}
           <div className="absolute inset-0 cursor-pointer" onClick={() => setShowConfirm(null)}></div>
           
           {/* Center Content Box */}
           <div className="w-full max-w-sm bg-[#0d0d0d] border border-white/10 p-10 rounded-[2.5rem] shadow-[0_0_120px_rgba(0,0,0,1)] animate-in zoom-in duration-300 relative z-10 text-center">
              <div className="w-28 h-28 rounded-3xl overflow-hidden border-2 border-[#bfff00]/30 mx-auto mb-8 shadow-2xl">
                 <img src={showConfirm.img} className="w-full h-full object-cover" alt="" />
              </div>
              <h3 className="text-2xl font-orbitron font-black uppercase tracking-tighter text-white mb-2">{showConfirm.title}</h3>
              <p className="text-xl text-[#bfff00] font-black tracking-tighter mb-10">₹{showConfirm.price.toLocaleString()}</p>

              <div className="grid grid-cols-2 gap-4">
                 <button onClick={() => setShowConfirm(null)} className="py-4 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/5 transition-colors">Back</button>
                 <button onClick={confirmAddToCart} disabled={isProcessingAdd} className="py-4 bg-[#bfff00] text-black rounded-xl text-[10px] font-black uppercase tracking-widest font-bold shadow-[0_0_30px_rgba(191,255,0,0.3)] flex items-center justify-center gap-2 active:scale-95 transition-transform">
                   {isProcessingAdd ? <Loader2 className="animate-spin" size={16}/> : 'Confirm'}
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* FULL VIEWPORT BAG DRAWER */}
      {showCart && (
        <div className="fixed inset-0 z-[900] w-full h-[100dvh] bg-black/90 backdrop-blur-3xl flex justify-end overflow-hidden animate-in fade-in duration-500">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setShowCart(false)}></div>
          <div className="w-full max-w-md h-full bg-[#050505] border-l border-white/10 flex flex-col relative z-10 animate-in slide-in-from-right duration-700">
            
            <div className="p-8 border-b border-white/5 flex justify-between items-center shrink-0">
               <div>
                  <h3 className="text-2xl font-orbitron font-black uppercase tracking-tighter text-white">Your Bag</h3>
                  <p className="text-[9px] font-black text-gray-500 uppercase mt-1 tracking-widest">{cart.length} ITEMS ADDED</p>
               </div>
               <button onClick={() => setShowCart(false)} className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-full hover:bg-red-500/20 hover:text-red-500 transition-all"><X size={24}/></button>
            </div>

            <div ref={bagListRef} className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-4">
               {cart.length === 0 ? (
                 <div className="flex flex-col items-center justify-center h-full opacity-20 py-20 text-center">
                    <ShoppingBag size={48} className="mb-4 mx-auto" />
                    <p className="text-[10px] font-black uppercase tracking-widest">Bag is Empty</p>
                 </div>
               ) : (
                 cart.map((item) => (
                   <div key={item.cartId} className="flex items-center gap-4 p-5 bg-white/[0.02] rounded-2xl border border-white/5 relative group hover:bg-white/[0.04] transition-all animate-in slide-in-from-bottom-2">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-lg">
                        <img src={item.img} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="flex-1 min-w-0 pr-8">
                        <p className="text-[11px] font-black uppercase text-white truncate">{item.title}</p>
                        <p className="text-sm text-[#bfff00] font-black tracking-tighter mt-1">₹{item.price?.toLocaleString()}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.cartId)} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                   </div>
                 ))
               )}
            </div>

            {cart.length > 0 && (
              <div className="shrink-0 p-8 bg-black border-t border-white/10 z-20 shadow-[0_-40px_60px_rgba(0,0,0,1)]">
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-500 mb-8">
                  <span>Grand Total</span>
                  <span className="text-[#bfff00]">₹{cart.reduce((a,c)=>a+(c.price||0),0).toLocaleString()}</span>
                </div>
                <a 
                  href={`https://wa.me/919000376792?text=Checkout: ${cart.map(i=>`${i.title} (₹${i.price})`).join(', ')}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full py-5 bg-[#bfff00] text-black font-orbitron font-black uppercase tracking-[0.15em] rounded-xl block text-center shadow-[0_0_50px_rgba(191,255,0,0.5)] hover:scale-[1.03] active:scale-95 transition-all text-sm"
                >
                  Confirm & Checkout
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Utilities */}
      <div className="fixed bottom-6 right-6 z-[110]">
        <button className="w-14 h-14 bg-[#25d366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform">
          <MessageSquare size={26} />
        </button>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-in { animation: fade-in 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .slide-in-from-right { animation: slide-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .slide-in-from-bottom-2 { animation: slide-up 0.4s ease-out forwards; }
        .zoom-in { animation: zoom-in 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-right { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes slide-up { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes zoom-in { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default PremiumPage;
