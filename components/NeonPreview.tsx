import React from 'react';
import { DesignConfig, FONTS, CustomizerMode, BackboardType } from '../types';

interface NeonPreviewProps {
  config: DesignConfig;
  className?: string;
}

const NeonPreview: React.FC<NeonPreviewProps> = ({ config, className = "" }) => {
  const fontOption = FONTS.find(f => f.name === config.font) || FONTS[0];
  const fontStyle = fontOption.style;
  const isFloro = config.mode === CustomizerMode.FLORO;
  
  const getCalculatedScale = () => {
    const userScale = config.textSize / 100;
    let presetScale = 1.0;
    if (config.size.label === 'Medium') presetScale = 1.35;
    if (config.size.label === 'Large') presetScale = 1.8;
    
    const isMobile = window.innerWidth < 768;
    const responsiveFactor = isMobile ? 0.75 : 1.0;
    
    return userScale * presetScale * responsiveFactor;
  };

  const scale = getCalculatedScale();
  const fontSize = `clamp(0.6rem, ${4.2 * scale}vw, ${10 * scale}rem)`;

  const getBackboardStyle = () => {
    switch (config.backboard) {
      case BackboardType.BLACK:
        return 'bg-black/85 border-white/20 shadow-2xl';
      case BackboardType.MIRRORED:
        return 'bg-gradient-to-tr from-gray-200/20 via-white/50 to-gray-200/20 border-white/30 backdrop-blur-md shadow-[inset_0_0_30px_rgba(255,255,255,0.4)]';
      default:
        return 'bg-white/10 border-white/10 backdrop-blur-[6px]';
    }
  };

  const getNeonStyle = () => {
    const baseStyle: React.CSSProperties = {
      fontFamily: fontStyle,
      fontSize: fontSize,
      lineHeight: 1.05,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      textAlign: 'center',
      padding: '0.1em 0.2em',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
    };

    if (isFloro) {
      return {
        ...baseStyle,
        backgroundImage: 'linear-gradient(90deg, #8b5cf6, #ec4899, #f97316, #8b5cf6)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: 'dream-sweep 3s linear infinite',
        filter: `drop-shadow(0 0 2px rgba(255,255,255,0.8)) drop-shadow(0 0 12px rgba(236, 72, 153, 0.6))`,
      };
    }
    
    return {
      ...baseStyle,
      color: 'white',
      textShadow: `
        0 0 4px #fff,
        0 0 8px #fff,
        0 0 16px ${config.color},
        0 0 32px ${config.color},
        0 0 60px ${config.color}
      `,
      fontWeight: 400,
    };
  };

  return (
    <div 
      className={`inline-flex flex-col items-center justify-center text-center select-none transition-all duration-500 rounded-[1rem] md:rounded-[2.5rem] border relative ${getBackboardStyle()} ${className}`}
      style={{ 
        maxWidth: '94vw',
        minWidth: '120px',
        padding: `${1.8 * scale}rem ${2.5 * scale}rem`,
        boxShadow: config.backboard === BackboardType.MIRRORED ? '0 30px 60px -15px rgba(255,255,255,0.1)' : '0 10px 40px rgba(0,0,0,0.6)'
      }}
    >
      <h2 style={getNeonStyle()} className="tracking-tight relative z-10">
        {config.text || "Text Preview"}
      </h2>

      <style>{`
        @keyframes dream-sweep {
          to { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
};

export default NeonPreview;