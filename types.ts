
export enum MoodType {
  ELEGANT = 'Elegant',
  GAMER = 'Gamer',
  BUSINESS = 'Business',
  RETRO = 'Retro'
}

export enum CustomizerMode {
  NEON = 'Neon',
  FLORO = 'FloRo'
}

export enum BackboardType {
  TRANSPARENT = 'Transparent Acrylic',
  BLACK = 'Black Acrylic',
  MIRRORED = 'Mirrored Acrylic'
}

export interface SizeOption {
  label: string;
  width: string;
  height: string;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
}

export interface DesignConfig {
  text: string;
  font: string;
  mood: MoodType;
  color: string;
  mode: CustomizerMode;
  room: string;
  size: SizeOption;
  backboard: BackboardType;
  addOns: string[];
  textSize: number; // Added for dynamic text scaling
}

export interface FontOption {
  name: string;
  mood: MoodType;
  style: string;
}

export const ROOMS = [
  { id: 'living', name: 'Living Room', url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&fit=crop' },
  { id: 'bedroom', name: 'Bedroom', url: 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?w=1200&fit=crop' },
  { id: 'cafe', name: 'Cafe', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&fit=crop' },
  { id: 'office', name: 'Office', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&fit=crop' },
  { id: 'gaming', name: 'Gaming Room', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&fit=crop' }
];

export const SIZES: SizeOption[] = [
  { label: 'Regular', width: '20"', height: '8"' },
  { label: 'Medium', width: '30"', height: '12"' },
  { label: 'Large', width: '40"', height: '16"' }
];

export const ACCESSORIES: AddOn[] = [
  { id: 'dimmer', name: 'Wireless Dimmer Remote', description: 'Brightness control' },
  { id: 'waterproof', name: 'Waterproof IP67', description: 'Outdoor safe' },
  { id: 'controller', name: 'Smart App Controller', description: 'WiFi + Bluetooth' }
];

export const FONTS: FontOption[] = [
  { name: 'Signature', mood: MoodType.ELEGANT, style: "'Dancing Script', cursive" },
  { name: 'Dreamy', mood: MoodType.ELEGANT, style: "'Pacifico', cursive" },
  { name: 'Handwritten', mood: MoodType.ELEGANT, style: "'Caveat', cursive" },
  { name: 'Retro Glow', mood: MoodType.RETRO, style: "'Monoton', cursive" },
  { name: 'Minimalist', mood: MoodType.BUSINESS, style: "'Montserrat', sans-serif" },
  { name: 'Cyberpunk', mood: MoodType.GAMER, style: "'Orbitron', sans-serif" },
  { name: 'Street Art', mood: MoodType.RETRO, style: "'Permanent Marker', cursive" },
  { name: 'Serenity', mood: MoodType.ELEGANT, style: "'Satisfy', cursive" },
  { name: 'Classy', mood: MoodType.BUSINESS, style: "'Playfair Display', serif" },
  { name: 'Electric', mood: MoodType.GAMER, style: "'Bungee', sans-serif" },
  { name: 'Sleek', mood: MoodType.BUSINESS, style: "'Inter', sans-serif" },
  { name: 'Vintage', mood: MoodType.RETRO, style: "'Yellowtail', cursive" },
  { name: 'Modernist', mood: MoodType.BUSINESS, style: "'Inter', sans-serif" },
  { name: 'Luxe', mood: MoodType.ELEGANT, style: "'Playfair Display', serif" },
  { name: 'Marker', mood: MoodType.RETRO, style: "'Permanent Marker', cursive" }
];
