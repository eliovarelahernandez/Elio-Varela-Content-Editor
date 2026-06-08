/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Play, Menu, X, Settings } from 'lucide-react';

interface HeaderProps {
  onToggleEditor: () => void;
  isEditorOpen: boolean;
}

export default function Header({ onToggleEditor, isEditorOpen }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav
        id="navbar-nav"
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(2, 2, 2, 0.92)' : 'rgba(2, 2, 2, 0.75)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
              <Play className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-sm font-semibold tracking-tight">
              EVH<span className="text-indigo-400">.</span>EDIT
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#perfil"
              className="relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-indigo-400 hover:after:w-full after:transition-all after:duration-300 text-[11px] font-medium tracking-widest uppercase text-white/60 hover:text-white transition-colors"
            >
              Perfil
            </a>
            <a
              href="#videos"
              className="relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-indigo-400 hover:after:w-full after:transition-all after:duration-300 text-[11px] font-medium tracking-widest uppercase text-white/60 hover:text-white transition-colors"
            >
              Videos
            </a>
            
            <button style = {{display: 'none'}} 
              onClick={onToggleEditor}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium tracking-widest uppercase border transition-all ${
                isEditorOpen
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                  : 'bg-white/[0.04] border-white/10 text-white/70 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              <Settings className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              Configurar
            </button>
          </div>

          {/* Hamburger toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={onToggleEditor}
              className={`p-1.5 rounded-lg border transition-all ${
                isEditorOpen ? 'text-indigo-400 border-indigo-500/30' : 'text-white/60 border-white/10'
              }`}
              title="Configurar Portafolio"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="text-white/70 hover:text-white transition-colors"
              id="burger-btn"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile nav drawer */}
      <div
        id="drawer-container"
        className={`fixed inset-0 z-50 bg-[#020202]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-6 text-white/70 hover:text-white transition-colors"
          id="close-drawer-btn"
        >
          <X className="w-6 h-6" />
        </button>
        <a
          href="#perfil"
          onClick={handleLinkClick}
          className="text-2xl font-light text-white/70 hover:text-white transition-colors tracking-wide"
        >
          Perfil
        </a>
        <a
          href="#videos"
          onClick={handleLinkClick}
          className="text-2xl font-light text-white/70 hover:text-white transition-colors tracking-wide"
        >
          Videos
        </a>
        <a
          href="#contacto"
          onClick={handleLinkClick}
          className="text-2xl font-light text-white/70 hover:text-white transition-colors tracking-wide"
        >
          Contacto
        </a>
        <button
          onClick={() => {
            setIsOpen(false);
            onToggleEditor();
          }}
          className="mt-4 px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-500 transition-colors flex items-center gap-2"
        >
          <Settings className="w-4 h-4" /> Modificar Videos
        </button>
      </div>
    </>
  );
}
