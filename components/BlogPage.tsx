
import React from 'react';
import { ChevronLeft, ArrowRight, Calendar, User, Tag } from 'lucide-react';

interface BlogPageProps {
  onBack: () => void;
}

const BLOG_POSTS = [
  {
    title: "Top 10 Neon Sign Trends for 2024",
    excerpt: "Discover how neon lighting is evolving this year. From minimalist line art to multi-color flow modes, find out what's lighting up luxury spaces and modern homes.",
    date: "Dec 15, 2023",
    author: "Studio Design Lead",
    category: "Trends",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&fit=crop"
  },
  {
    title: "How to Choose the Right Neon for Your Business",
    excerpt: "Branding matters. Learn how to translate your company identity into a glowing masterpiece that captures customer attention and defines your professional aesthetic.",
    date: "Jan 10, 2024",
    author: "Creative Director",
    category: "Business",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&fit=crop"
  },
  {
    title: "The Science of Light: LED vs Traditional Gas Neon",
    excerpt: "Why is everyone switching to LED neon? We break down the energy efficiency, lifespan, and safety benefits of modern light technology in a detailed comparison.",
    date: "Feb 05, 2024",
    author: "Technical Specialist",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&fit=crop"
  }
];

const BlogPage: React.FC<BlogPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#bfff00]/30">
      <header className="border-b border-white/10 px-8 py-6 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-xl z-[200]">
        <button onClick={onBack} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">
          <ChevronLeft size={16} /> Back
        </button>
        <h1 className="text-xl font-orbitron font-black uppercase tracking-[0.2em]">Studio Insights</h1>
        <div className="w-16"></div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <header className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-orbitron font-black uppercase tracking-tighter mb-6 text-white leading-none">
            Neon <br className="md:hidden" /> Perspectives
          </h2>
          <p className="text-gray-400 uppercase tracking-[0.2em] text-[10px] font-black max-w-xl mx-auto leading-relaxed">
            Expert insights into neon craftsmanship, interior design aesthetics, and the future of light technology.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {BLOG_POSTS.map((post, idx) => (
            <article key={idx} className="bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden group hover:border-[#bfff00]/50 transition-all flex flex-col shadow-lg hover:shadow-[#bfff00]/5 text-left">
              <div className="h-64 overflow-hidden relative">
                <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={post.title} />
                <div className="absolute top-4 left-4">
                  <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-white/10">{post.category}</span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <header className="mb-4">
                   <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-[#bfff00] mb-3">
                    <span className="flex items-center gap-1"><Calendar size={12} /> <time>{post.date}</time></span>
                    <span className="flex items-center gap-1 opacity-50"><User size={12} /> {post.author}</span>
                  </div>
                  <h3 className="text-xl font-orbitron font-black uppercase tracking-tighter group-hover:text-[#bfff00] transition-colors leading-snug">
                    {post.title}
                  </h3>
                </header>
                <p className="text-xs text-gray-500 leading-relaxed font-bold uppercase tracking-widest mb-8 flex-1">
                  {post.excerpt}
                </p>
                <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-tighter text-white group-hover:gap-5 transition-all w-fit">
                  Read Full Article <ArrowRight size={14} className="text-[#bfff00]" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="bg-black py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[8px] uppercase font-black text-gray-600 tracking-[0.5em]">DREAM NEON STUDIO JOURNAL © 2024</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;
