
import React, { useState } from 'react';
import Hero from './components/Hero';
import Customizer from './components/Customizer';
import PremiumPage from './components/PremiumPage';
import BusinessLogoPage from './components/BusinessLogoPage';
import ContactPage from './components/ContactPage';
import FAQPage from './components/FAQPage';
import BlogPage from './components/BlogPage';
import { DesignConfig, MoodType, SIZES, CustomizerMode, ROOMS, BackboardType } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'custom_neon' | 'custom_floro' | 'premium' | 'business' | 'contact' | 'faq' | 'blog'>('landing');
  const [cart, setCart] = useState<any[]>([]);
  
  const [config, setConfig] = useState<DesignConfig>({
    text: 'Dream Neon',
    font: 'Signature',
    mood: MoodType.ELEGANT,
    color: '#ff0000', // Powerhouse Default: Red
    mode: CustomizerMode.NEON,
    room: ROOMS[0].id,
    size: SIZES[0],
    backboard: BackboardType.TRANSPARENT,
    addOns: [],
    textSize: 175 // Powerhouse Default: 175%
  });

  const goToLanding = () => setView('landing');
  const goToPremium = () => setView('premium');
  const goToBusiness = () => setView('business');
  const goToContact = () => setView('contact');
  const goToFAQ = () => setView('faq');
  const goToBlog = () => setView('blog');
  
  const startCustomNeon = () => {
    setConfig(prev => ({ ...prev, mode: CustomizerMode.NEON, color: '#ff0000', textSize: 175 }));
    setView('custom_neon');
  };
  
  const startCustomFloro = () => {
    setConfig(prev => ({ ...prev, mode: CustomizerMode.FLORO, color: '#ff0000', textSize: 175 }));
    setView('custom_floro');
  };

  const addToCart = (item: any) => {
    setCart(prev => [...prev, { ...item, cartId: Date.now() + Math.random() }]);
  };

  const removeFromCart = (cartId: number) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const openCartView = () => {
    setView('premium');
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-500/30">
      {view === 'landing' && (
        <Hero 
          onStartNeon={startCustomNeon} 
          onStartFloro={startCustomFloro} 
          onOpenPremium={goToPremium} 
          onOpenBusiness={goToBusiness}
          onOpenContact={goToContact}
          onOpenFAQ={goToFAQ}
          onOpenBlog={goToBlog}
          onGoHome={goToLanding}
          currentNeonColor={config.color}
          cart={cart}
          onOpenCart={openCartView}
        />
      )}
      {(view === 'custom_neon' || view === 'custom_floro') && (
        <div className="animate-in fade-in duration-500 bg-black h-screen overflow-hidden">
          <Customizer 
            config={config} 
            setConfig={setConfig} 
            onBack={goToLanding} 
            addToCart={addToCart}
          />
        </div>
      )}
      {view === 'premium' && (
        <div className="animate-in fade-in duration-500 bg-black min-h-screen">
          <PremiumPage 
            onBack={goToLanding} 
            onStartNeon={startCustomNeon} 
            onStartFloro={startCustomFloro} 
            onOpenBusiness={goToBusiness}
            onOpenFAQ={goToFAQ}
            cart={cart} 
            addToCart={addToCart} 
            removeFromCart={removeFromCart}
            currentNeonColor={config.color}
          />
        </div>
      )}
      {view === 'business' && (
        <div className="animate-in fade-in duration-500 bg-black">
          <BusinessLogoPage onBack={goToLanding} />
        </div>
      )}
      {view === 'contact' && (
        <div className="animate-in fade-in duration-500 bg-black">
          <ContactPage 
            onBack={goToLanding} 
            onGoHome={goToLanding}
            onOpenPremium={goToPremium}
            onOpenFAQ={goToFAQ}
          />
        </div>
      )}
      {view === 'faq' && (
        <div className="animate-in fade-in duration-500 bg-black">
          <FAQPage onBack={goToLanding} />
        </div>
      )}
      {view === 'blog' && (
        <div className="animate-in fade-in duration-500 bg-black">
          <BlogPage onBack={goToLanding} />
        </div>
      )}
    </div>
  );
};

export default App;
