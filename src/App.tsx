/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Profile from './components/Profile';
import VideoGrid from './components/VideoGrid';
import Contact from './components/Contact';
import VideoModal from './components/VideoModal';
import EditorPanel from './components/EditorPanel';
import { initialPortfolioData } from './initialData';
import { PortfolioData } from './types';
import { Play } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activePlayUrl, setActivePlayUrl] = useState<string | null>(null);

  // Sync state data with localStorage safely on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('elio_portfolio_data_v2');
      if (saved) {
        const parsed = JSON.parse(saved) as PortfolioData;
        if (parsed && typeof parsed === 'object' && parsed.name) {
          // Auto migrate old defaults to provide the newly requested hero videos instantly
          if (parsed.heroVerticalUrl === "https://www.youtube.com/watch?v=nDM8xZ9kREI" || !parsed.heroVerticalUrl) {
            parsed.heroVerticalUrl = "https://www.youtube.com/shorts/cN1AxSmKkxY";
          }
          if (parsed.heroHorizontalUrl === "https://www.youtube.com/watch?v=EngW7tLk6r8" || !parsed.heroHorizontalUrl) {
            parsed.heroHorizontalUrl = "https://www.youtube.com/watch?v=SYnfMAZ2buI";
          }
          setData(parsed);
        }
      }
    } catch (e) {
      console.warn("Could not load custom portfolio data from localStorage:", e);
    }
  }, []);

  const handleSaveData = (newData: PortfolioData) => {
    setData(newData);
    try {
      localStorage.setItem('elio_portfolio_data_v2', JSON.stringify(newData));
    } catch (e) {
      console.error("Could not write portfolio changes to localStorage:", e);
    }
  };

  const handleResetData = () => {
    if (window.confirm("¿Estás seguro de que deseas restablecer todo el portafolio comercial a los videos y textos por defecto? Esto borrará tus enlaces guardados.")) {
      setData(initialPortfolioData);
      try {
        localStorage.removeItem('elio_portfolio_data_v2');
      } catch (e) {
        console.error("Could not wipe custom portfolio cache:", e);
      }
      setIsEditorOpen(false);
    }
  };

  const handleOpenPlay = (url: string) => {
    setActivePlayUrl(url);
  };

  const handleClosePlay = () => {
    setActivePlayUrl(null);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-[#ededed] relative grid-overlay selection:bg-indigo-600 selection:text-white">
      {/* Visual top status glow bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      
      {/* Background radial soft light glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full bg-indigo-500/[0.03] blur-[120px]" 
          style={{ animation: 'pulseGlow 10s ease-in-out infinite' }}
        />
      </div>

      {/* Header section (Navbar + Mobile) */}
      <Header
        onToggleEditor={() => setIsEditorOpen(!isEditorOpen)}
        isEditorOpen={isEditorOpen}
      />

      {/* Hero Header Device Frame section */}
      <Hero 
        heroVerticalUrl={data.heroVerticalUrl} 
        heroHorizontalUrl={data.heroHorizontalUrl} 
      />

      {/* Profile bio + Skill cards section */}
      <Profile data={data} />

      {/* Portfolio interactive filters & dynamic Catalog Cards */}
      <VideoGrid 
        videos={data.videos} 
        onVideoClick={handleOpenPlay} 
      />

      {/* Interactive lead contact form */}
      

      {/* Universal Footer section */}
      <footer className="py-10 border-t border-white/[0.05] bg-black/40 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
              <Play className="w-3 h-3 text-white fill-white ml-0.5" />
            </div>
            <span className="text-xs font-bold tracking-tight">
              EG<span className="text-indigo-400">.</span>EDIT
            </span>
          </a>
          <span className="text-[10px] sm:text-xs text-white/30 tracking-wide">
            © {new Date().getFullYear()} Elio Gabriel. Todos los derechos reservados · Hecho con alta densidad de retención.
          </span>
        </div>
      </footer>

      {/* Universal Lightbox Video Player Modal (Escape support, handles YouTube, Vimeo, MP4 natively) */}
      {activePlayUrl && (
        <VideoModal 
          videoUrl={activePlayUrl} 
          onClose={handleClosePlay} 
        />
      )}

      {/* Admin Editor Settings deck slider drawer */}
      {isEditorOpen && (
        <EditorPanel
          data={data}
          onSave={handleSaveData}
          onReset={handleResetData}
          onClose={() => setIsEditorOpen(false)}
        />
      )}
    </div>
  );
}
