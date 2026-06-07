/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Eye, Film, Search, AlertCircle } from 'lucide-react';
import { VideoItem } from '../types';
import { getYouTubeThumbnail } from '../utils';

interface VideoGridProps {
  videos: VideoItem[];
  onVideoClick: (url: string) => void;
}

const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'programacion', name: 'Programación' },
  { id: 'fitness', name: 'Fitness' },
  { id: 'futbol', name: 'Fútbol' },
  { id: 'podcast', name: 'Podcast' },
  { id: 'business', name: 'Business' },
  { id: 'entretenimiento', name: 'Entretenimiento' }
];

export default function VideoGrid({ videos, onVideoClick }: VideoGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter video list based on selected category tag and optional text search query
  const filteredVideos = videos.filter((video) => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'programacion':
        return 'bg-sky-600/10 text-sky-400 border-sky-500/20';
      case 'fitness':
        return 'bg-emerald-600/10 text-emerald-400 border-emerald-500/20';
      case 'futbol':
        return 'bg-green-600/10 text-green-400 border-green-500/20';
      case 'podcast':
        return 'bg-purple-600/10 text-purple-400 border-purple-500/20';
      case 'business':
        return 'bg-indigo-600/10 text-indigo-400 border-indigo-500/20';
      default:
        return 'bg-rose-600/10 text-rose-400 border-rose-500/20';
    }
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <section id="videos" className="py-20 border-t border-white/[0.05] bg-[#040404]/30 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Caption */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-400">
            PORTAFOLIO AVANZADO
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-2">
            Trabajos por <span className="text-shimmer">categoría</span>
          </h2>
          <p className="text-xs text-white/40 mt-2">
            Haz clic en cualquier proyecto para iniciar la reproducción sin errores en alta definición.
          </p>
        </div>

        {/* Filters and search deck */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-white/[0.01] border border-white/[0.04] p-4 rounded-xl">
          {/* Tabs */}
          <div className="flex flex-wrap gap-1.5 justify-center md:justify-start w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-[10px] sm:text-xs font-semibold tracking-wider uppercase rounded-lg border transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600/20 border-indigo-500/45 text-indigo-300'
                    : 'bg-[#0a0a0all] border-white/5 text-white/45 hover:text-white hover:bg-white/[0.03] hover:border-white/10'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Quick search */}
          <div className="relative w-full md:w-64">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-3.5 w-3.5 text-white/30" />
            </span>
            <input
              type="text"
              placeholder="Buscar proyectos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/40 focus:bg-white/[0.05] transition-all"
            />
          </div>
        </div>

        {/* Video Catalog Items list */}
        <motion.div 
          layout 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredVideos.map((video) => {
              const thumbUrl = getYouTubeThumbnail(video.videoUrl, video.category);
              return (
                <motion.div
                  key={video.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => onVideoClick(video.videoUrl)}
                  className="group cursor-pointer rounded-xl overflow-hidden bg-[#080808] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
                >
                  <div className="relative overflow-hidden aspect-video bg-[#0a0a0all]">
                    {/* Cover image parsed safely */}
                    <img
                      src={thumbUrl}
                      alt={video.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Shadow overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent pointer-events-none" />
                    
                    {/* Hover Pulse play circle */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                      <div className="w-14 h-14 rounded-full bg-indigo-600/90 backdrop-blur-sm flex items-center justify-center animate-play-pulse">
                        <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                      </div>
                    </div>

                    {/* Category overlay tags */}
                    <span className="absolute top-3 left-3 z-10 px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase bg-black/75 backdrop-blur-md rounded text-white border border-white/5">
                      {video.category}
                    </span>

                    {/* Duration badge overlay */}
                    <span className="absolute bottom-3 right-3 z-10 font-mono text-[9px] px-1.5 py-0.5 rounded bg-black/60 text-white/60">
                      {video.duration}
                    </span>
                  </div>

                  {/* Body textual content */}
                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-[11px] text-white/40 mt-1.5 leading-relaxed line-clamp-2">
                        {video.description}
                      </p>
                    </div>

                    {/* Badge skill items tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/[0.04]">
                      {video.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04] text-white/40 border border-white/[0.03] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty placeholder */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-16 bg-[#080808] border border-white/[0.05] rounded-xl max-w-xl mx-auto">
            <AlertCircle className="w-10 h-10 text-white/20 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-white">Ningún video encontrado</h4>
            <p className="text-xs text-white/40 mt-1 max-w-xs mx-auto">
              No hay proyectos en la categoría "{capitalize(selectedCategory)}"" que coincidan con tu búsqueda. Añade o configura videos ingresando al Panel de Control.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
