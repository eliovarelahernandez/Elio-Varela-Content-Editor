/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  MapPin, Mail, Phone, Globe, Instagram, Youtube, Linkedin, Twitter,
  Scissors, Wand2, Smartphone, Image as ImageIcon, TrendingUp, Zap, Layers, Target
} from 'lucide-react';
import { PortfolioData } from '../types';

interface ProfileProps {
  data: PortfolioData;
}

export default function Profile({ data }: ProfileProps) {
  // Render corresponding icon based on skill ID or type
  const renderSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'scissors':
        return <Scissors className="w-4 h-4 text-indigo-400" />;
      case 'wand-2':
        return <Wand2 className="w-4 h-4 text-purple-400" />;
      case 'smartphone':
        return <Smartphone className="w-4 h-4 text-emerald-400" />;
      case 'image':
        return <ImageIcon className="w-4 h-4 text-amber-400" />;
      default:
        return <TrendingUp className="w-4 h-4 text-rose-400" />;
    }
  };

  return (
    <section id="perfil" className="py-20 border-t border-white/[0.05] relative px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Personal Intro Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-white">{data.name}</h2>
              <div className="space-y-1">
                <p className="text-indigo-400 text-sm font-semibold tracking-wide leading-snug uppercase">
                  {data.role}
                </p>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] text-white/50 tracking-wider">
                    {data.remoteAvailable ? "Disponible Remoto Global" : "Soporte Local"}
                  </span>
                </div>
              </div>

              <p className="text-xs text-white/40 leading-relaxed pt-2">
                Más de <span className="text-white font-medium">{data.yearsOfExperience}</span> editando contenido audiovisual de alto octanaje para marcas, creadores digitales y canales de YouTube a nivel mundial.
              </p>

              {/* Direct Contacts Info */}
              <div className="space-y-3 pt-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-3 text-xs text-white/60 hover:text-white transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
                  <span>{data.location}</span>
                </div>
                {data.email && (
                  <a
                    href={`mailto:${data.email}`}
                    className="flex items-center gap-3 text-xs text-white/60 hover:text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
                    <span className="break-all">{data.email}</span>
                  </a>
                )}
                {data.phone && (
                  <a
                    href={`tel:${data.phone}`}
                    className="flex items-center gap-3 text-xs text-white/60 hover:text-white transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
                    <span>{data.phone}</span>
                  </a>
                )}
                <div className="flex items-center gap-3 text-xs text-white/60">
                  <Globe className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
                  <span>Disponible para todo el mundo</span>
                </div>
              </div>

              {/* Editable Social Handles */}
              <div className="flex gap-2.5 pt-4">
                {data.socials.instagram && (
                  <a
                    href={data.socials.instagram}
                    target="_blank"
                    rel="noreferrer noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/55 hover:text-white hover:bg-indigo-600/20 hover:border-indigo-500/30 transition-all duration-300"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {data.socials.youtube && (
                  <a
                    href={data.socials.youtube}
                    target="_blank"
                    rel="noreferrer noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/55 hover:text-white hover:bg-rose-600/20 hover:border-rose-500/30 transition-all duration-300"
                    title="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                )}
                {data.socials.linkedin && (
                  <a
                    href={data.socials.linkedin}
                    target="_blank"
                    rel="noreferrer noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/55 hover:text-white hover:bg-sky-600/20 hover:border-sky-500/30 transition-all duration-300"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {data.socials.twitter && (
                  <a
                    href={data.socials.twitter}
                    target="_blank"
                    rel="noreferrer noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/55 hover:text-white hover:bg-[#1DA1F2]/20 hover:border-[#1DA1F2]/30 transition-all duration-300"
                    title="Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Dynamic Counters Metrics */}
              <div className="flex gap-8 pt-6 border-t border-white/[0.06] mt-6">
                <div>
                  <div className="text-3xl font-bold tracking-tight text-white">
                    {data.yearsOfExperience}
                  </div>
                  <div className="text-[9px] text-white/35 font-semibold tracking-widest uppercase mt-0.5">
                    Años de Exp
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold tracking-tight text-white">
                    {data.projectsCompleted}
                  </div>
                  <div className="text-[9px] text-white/35 font-semibold tracking-widest uppercase mt-0.5">
                    Proyectos
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold tracking-tight text-white">
                    {data.clientsCount}
                  </div>
                  <div className="text-[9px] text-white/35 font-semibold tracking-widest uppercase mt-0.5">
                    Clientes
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Skillset & Background */}
          <div className="lg:col-span-8 space-y-10">
            {/* Technical Skills and Specialties */}
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase text-indigo-400 mb-5 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400/20" />
                Habilidades técnicas & Especialidad
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                
                <div className="p-5 rounded-xl bg-[#080808] border border-white/[0.06] hover:border-indigo-500/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300 group">
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-colors duration-300">
                      <Scissors className="w-4 h-4 text-indigo-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm font-semibold tracking-tight text-white">Montaje Cinematográfico</span>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed pl-12">
                    Montaje fluido y narrativo optimizado en Premiere Pro. Manejo obsesivo del ritmo para capturar leads y enganchar curiosos.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#080808] border border-white/[0.06] hover:border-purple-500/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300 group">
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-600/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600 group-hover:border-purple-500 transition-colors duration-300">
                      <Wand2 className="w-4 h-4 text-purple-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm font-semibold tracking-tight text-white">VFX & Motion Graphics</span>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed pl-12">
                    Animaciones fluidas, títulos 3D expresivos, transiciones personalizadas y efectos visuales modernos en After Effects.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#080808] border border-white/[0.06] hover:border-emerald-500/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300 group">
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:border-emerald-500 transition-colors duration-300">
                      <Smartphone className="w-4 h-4 text-emerald-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm font-semibold tracking-tight text-white">Edición Vertical Experta</span>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed pl-12">
                    Formatos cortos ultrarrápidos listos para viralizar en TikTok, Instagram Reels y YouTube Shorts con alta densidad emocional.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#080808] border border-white/[0.06] hover:border-amber-500/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300 group">
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-600/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-600 group-hover:border-amber-500 transition-colors duration-300">
                      <ImageIcon className="w-4 h-4 text-amber-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm font-semibold tracking-tight text-white">Miniaturas Irresistibles</span>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed pl-12">
                    Diseño gráfico enfocado puramente en catapultar el CTR. Miniaturas que gritan para recibir clics directos sobre el lienzo.
                  </p>
                </div>

                <div className="sm:col-span-2 p-5 rounded-xl bg-[#080808] border border-white/[0.06] hover:border-rose-500/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300 group">
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-rose-600/10 border border-rose-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-600 group-hover:border-rose-500 transition-colors duration-300">
                      <TrendingUp className="w-4 h-4 text-rose-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm font-semibold tracking-tight text-white">SEO & Psicología Algorítmica</span>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed pl-12">
                    Estructuración de contenido basada en picos de retención (retention curves). Edito pensando tanto en el espectador de carne y hueso como en los vectores de recomendación del algoritmo.
                  </p>
                </div>
              </div>
            </div>

            {/* Software Environment Tools */}
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase text-indigo-400 mb-4 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                Software & Ecosistema
              </h3>
              <div className="flex flex-wrap gap-2.5">
                <span className="px-3.5 py-2 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs font-medium text-white/70 hover:text-white hover:bg-indigo-600/10 hover:border-indigo-500/20 transition-all cursor-default flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  Premiere Pro
                </span>
                <span className="px-3.5 py-2 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs font-medium text-white/70 hover:text-white hover:bg-purple-600/10 hover:border-purple-500/20 transition-all cursor-default flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  After Effects
                </span>
                <span className="px-3.5 py-2 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs font-medium text-white/70 hover:text-white hover:bg-emerald-600/10 hover:border-emerald-500/20 transition-all cursor-default flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  CapCut Pro
                </span>
                <span className="px-3.5 py-2 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs font-medium text-white/70 hover:text-white hover:bg-sky-600/10 hover:border-sky-500/20 transition-all cursor-default flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  Photoshop
                </span>
                <span className="px-3.5 py-2 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs font-medium text-white/70 hover:text-white hover:bg-amber-600/10 hover:border-amber-500/20 transition-all cursor-default flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  DaVinci Resolve
                </span>
              </div>
            </div>

            {/* Philosophy of Editing */}
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase text-indigo-400 mb-4 flex items-center gap-2">
                <Target className="w-3.5 h-3.5 text-indigo-400" />
                Filosofía de Trabajo
              </h3>
              <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-600/[0.08] to-purple-600/[0.02] border border-indigo-500/15 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-indigo-600" />
                <p className="text-sm md:text-base leading-relaxed text-white/80 font-medium">
                  Combino el <span className="text-indigo-300 font-semibold">ojo creativo</span> de un editor cinematográfico con la <span className="text-indigo-300 font-semibold">estrategia comercial</span> de quien entiende los vectores de retención de las plataformas de video.
                </p>
                <div className="my-4 h-[1px] bg-white/[0.05]" />
                <p className="text-xs text-white/50 leading-relaxed">
                  No te entrego un video crudo o una edición genérica; te armo un <span className="text-white font-medium">arma de crecimiento</span> estratégica lista para enamorar a tu audiencia, captar su atención y nutrir los leads de tu negocio digital.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
