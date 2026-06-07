/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X, Save, Undo, Plus, Trash2, Edit3, Settings, Youtube, Play,
  User, Link, Grid, Sparkles, FileText, Check, AlertTriangle
} from 'lucide-react';
import { PortfolioData, VideoItem } from '../types';
import { getYouTubeID } from '../utils';

interface EditorPanelProps {
  data: PortfolioData;
  onSave: (newData: PortfolioData) => void;
  onReset: () => void;
  onClose: () => void;
}

export default function EditorPanel({ data, onSave, onReset, onClose }: EditorPanelProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'hero' | 'catalog'>('profile');
  
  // Local state for all fields
  const [profile, setProfile] = useState({
    name: data.name,
    role: data.role,
    yearsOfExperience: data.yearsOfExperience,
    projectsCompleted: data.projectsCompleted,
    clientsCount: data.clientsCount,
    location: data.location,
    email: data.email,
    phone: data.phone,
    remoteAvailable: data.remoteAvailable,
  });

  const [socials, setSocials] = useState({ ...data.socials });
  const [heroVerticalUrl, setHeroVerticalUrl] = useState(data.heroVerticalUrl);
  const [heroHorizontalUrl, setHeroHorizontalUrl] = useState(data.heroHorizontalUrl);
  const [videos, setVideos] = useState<VideoItem[]>([...data.videos]);

  // Form for new video addition
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    category: 'programacion' as VideoItem['category'],
    videoUrl: '',
    duration: '02:30',
    tagsRaw: 'Premiere Pro, After Effects'
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveAll = () => {
    const updatedData: PortfolioData = {
      ...profile,
      socials,
      heroVerticalUrl,
      heroHorizontalUrl,
      videos
    };
    onSave(updatedData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideo.title || !newVideo.videoUrl) return;

    const tags = newVideo.tagsRaw
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const created: VideoItem = {
      id: 'custom_' + Date.now(),
      title: newVideo.title,
      description: newVideo.description || 'Sin descripción',
      category: newVideo.category,
      videoUrl: newVideo.videoUrl,
      duration: newVideo.duration || '01:00',
      tags: tags.length > 0 ? tags : ['Cortometraje']
    };

    setVideos(prev => [created, ...prev]);
    // Clear form inputs
    setNewVideo({
      title: '',
      description: '',
      category: 'programacion',
      videoUrl: '',
      duration: '02:30',
      tagsRaw: 'Premiere Pro, After Effects'
    });
  };

  const handleDeleteVideo = (id: string) => {
    setVideos(prev => prev.filter(v => v.id !== id));
  };

  const handleUpdateVideoField = (index: number, field: keyof VideoItem, value: any) => {
    setVideos(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  // Convert comma separated string to tags array
  const handleUpdateVideoTags = (index: number, value: string) => {
    const tags = value.split(',').map(t => t.trim());
    handleUpdateVideoField(index, 'tags', tags);
  };

  const isUrlValidYoutube = (url: string) => {
    return getYouTubeID(url) !== null;
  };

  return (
    <div className="fixed inset-0 z-[90] bg-[#020202]/90 backdrop-blur-md flex justify-end transition-all">
      <div className="w-full max-w-2xl bg-[#080808] border-l border-white/10 h-full flex flex-col justify-between overflow-hidden shadow-2xl">
        
        {/* Header segment of standard panel */}
        <div className="p-5 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.01]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Settings className="w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                Panel de Control / Modo Editor
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/25 uppercase">
                  Beta
                </span>
              </h3>
              <p className="text-[10px] text-white/40">Personaliza los videos, textos y vínculos en tiempo real.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-white/55 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-white/[0.06] bg-black/40">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'profile'
                ? 'border-indigo-500 text-indigo-400 bg-white/[0.01]'
                : 'border-transparent text-white/45 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Datos de Elio
          </button>
          
          <button
            onClick={() => setActiveTab('hero')}
            className={`flex-1 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'hero'
                ? 'border-indigo-500 text-indigo-400 bg-white/[0.01]'
                : 'border-transparent text-white/45 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <Link className="w-3.5 h-3.5" />
            Videos del Hero
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex-1 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'catalog'
                ? 'border-indigo-500 text-indigo-400 bg-white/[0.01]'
                : 'border-transparent text-white/45 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            Catálogo ({videos.length})
          </button>
        </div>

        {/* Dynamic Inner Forms */}
        <div className="flex-grow p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-5 animate-fadeIn">
              <h4 className="text-xs font-bold text-white/70 uppercase tracking-widest flex items-center gap-2 mb-3">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                Información del Consultor
              </h4>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-white/40 uppercase tracking-widest font-semibold block mb-1">Nombre</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))}
                    className="w-full px-3 py-2 rounded bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-white/40 uppercase tracking-widest font-semibold block mb-1">Rol / Especialización</label>
                  <input
                    type="text"
                    value={profile.role}
                    onChange={(e) => setProfile(p => ({ ...p, role: e.target.value }))}
                    className="w-full px-3 py-2 rounded bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] text-white/40 uppercase tracking-widest font-semibold block mb-1">Años de Exp.</label>
                  <input
                    type="text"
                    value={profile.yearsOfExperience}
                    onChange={(e) => setProfile(p => ({ ...p, yearsOfExperience: e.target.value }))}
                    placeholder="3+"
                    className="w-full px-3 py-2 rounded bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500 text-center"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-white/40 uppercase tracking-widest font-semibold block mb-1">Proyectos Completados</label>
                  <input
                    type="text"
                    value={profile.projectsCompleted}
                    onChange={(e) => setProfile(p => ({ ...p, projectsCompleted: e.target.value }))}
                    placeholder="80+"
                    className="w-full px-3 py-2 rounded bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500 text-center"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-white/40 uppercase tracking-widest font-semibold block mb-1">Clientes Satisfechos</label>
                  <input
                    type="text"
                    value={profile.clientsCount}
                    onChange={(e) => setProfile(p => ({ ...p, clientsCount: e.target.value }))}
                    placeholder="30+"
                    className="w-full px-3 py-2 rounded bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500 text-center"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-white/40 uppercase tracking-widest font-semibold block mb-1">Ubicación</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile(p => ({ ...p, location: e.target.value }))}
                    className="w-full px-3 py-2 rounded bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-white/40 uppercase tracking-widest font-semibold block mb-1">Correo Electrónico</label>
                  <input
                    type="text"
                    value={profile.email}
                    onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))}
                    className="w-full px-3 py-2 rounded bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-white/40 uppercase tracking-widest font-semibold block mb-1">WhatsApp / Teléfono</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile(p => ({ ...p, phone: e.target.value }))}
                    className="w-full px-3 py-2 rounded bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <input
                    type="checkbox"
                    id="remoteBox"
                    checked={profile.remoteAvailable}
                    onChange={(e) => setProfile(p => ({ ...p, remoteAvailable: e.target.checked }))}
                    className="w-4 h-4 rounded bg-[#020202] border border-white/10 text-indigo-600 focus:ring-0 focus:outline-none mr-2.5 cursor-pointer"
                  />
                  <label htmlFor="remoteBox" className="text-xs text-white/60 select-none cursor-pointer">
                    Disponible para trabajo Remoto Global
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] space-y-4">
                <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Vínculos de Redes Sociales</h4>
                
                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[9px] text-white/35 uppercase block mb-1">Instagram URL</label>
                    <input
                      type="text"
                      value={socials.instagram}
                      onChange={(e) => setSocials(s => ({ ...s, instagram: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded bg-white/[0.01] border border-white/15 text-xs text-white/70 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-white/35 uppercase block mb-1">YouTube URL</label>
                    <input
                      type="text"
                      value={socials.youtube}
                      onChange={(e) => setSocials(s => ({ ...s, youtube: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded bg-white/[0.01] border border-white/15 text-xs text-white/70 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-white/35 uppercase block mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={socials.linkedin}
                      onChange={(e) => setSocials(s => ({ ...s, linkedin: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded bg-white/[0.01] border border-white/15 text-xs text-white/70 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-white/35 uppercase block mb-1">Twitter URL</label>
                    <input
                      type="text"
                      value={socials.twitter}
                      onChange={(e) => setSocials(s => ({ ...s, twitter: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded bg-white/[0.01] border border-white/15 text-xs text-white/70 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* HERO TAB */}
          {activeTab === 'hero' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-4 rounded-lg bg-indigo-900/10 border border-indigo-500/20 text-indigo-300 text-xs">
                Aquí pones los videos de demostración principales que se reproducen silenciosamente e integrados dentro de los marcos del teléfono y la laptop en la parte de arriba del portafolio.
              </div>

              {/* Phone video embed */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.05] space-y-3">
                <div className="flex items-center gap-2">
                  <div className="p-1 px-1.5 rounded bg-rose-600/20 text-rose-400 text-[9px] font-bold">9:16 VERTICAL</div>
                  <h4 className="text-xs font-bold text-white">Video del Teléfono (Reels / Shorts)</h4>
                </div>
                <input
                  type="text"
                  value={heroVerticalUrl}
                  onChange={(e) => setHeroVerticalUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 rounded bg-white/[0.02] border border-white/10 text-xs text-white placeholder-white/25 focus:outline-none focus:border-indigo-500"
                />
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-white/40">ID de YouTube detectado:</span>
                  <span className={`font-mono font-semibold ${isUrlValidYoutube(heroVerticalUrl) ? 'text-emerald-400' : 'text-amber-500'}`}>
                    {getYouTubeID(heroVerticalUrl) || 'Ninguno (Error de reproducción)'}
                  </span>
                </div>
              </div>

              {/* Laptop video embed */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.05] space-y-3">
                <div className="flex items-center gap-2">
                  <div className="p-1 px-1.5 rounded bg-indigo-600/20 text-indigo-400 text-[9px] font-bold">16:9 HORIZONTAL</div>
                  <h4 className="text-xs font-bold text-white">Video de la Laptop (YouTube / B-Roll)</h4>
                </div>
                <input
                  type="text"
                  value={heroHorizontalUrl}
                  onChange={(e) => setHeroHorizontalUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 rounded bg-white/[0.02] border border-white/10 text-xs text-white placeholder-white/25 focus:outline-none focus:border-indigo-500"
                />
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-white/40">ID de YouTube detectado:</span>
                  <span className={`font-mono font-semibold ${isUrlValidYoutube(heroHorizontalUrl) ? 'text-emerald-400' : 'text-amber-500'}`}>
                    {getYouTubeID(heroHorizontalUrl) || 'Ninguno (Error de reproducción)'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* CATALOG TAB (THE COMPLEX GRID) */}
          {activeTab === 'catalog' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Form to Append a New Video */}
              <form onSubmit={handleAddVideo} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-4">
                <h4 className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 mb-1">
                  <Plus className="w-4 h-4" /> Añadir nuevo video al catálogo
                </h4>
                
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] text-white/40 uppercase block mb-1">Título del Video</label>
                    <input
                      type="text"
                      value={newVideo.title}
                      onChange={(e) => setNewVideo(v => ({ ...v, title: e.target.value }))}
                      required
                      placeholder="Ej: B-Roll de comida rápida"
                      className="w-full px-3 py-1.5 rounded bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-white/40 uppercase block mb-1">Categoría</label>
                    <select
                      value={newVideo.category}
                      onChange={(e) => setNewVideo(v => ({ ...v, category: e.target.value as VideoItem['category'] }))}
                      className="w-full px-3 py-1.5 rounded bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="programacion" className="bg-[#0A0A0A]">Programación</option>
                      <option value="fitness" className="bg-[#0A0A0A]">Fitness</option>
                      <option value="futbol" className="bg-[#0A0A0A]">Fútbol</option>
                      <option value="podcast" className="bg-[#0A0A0A]">Podcast</option>
                      <option value="business" className="bg-[#0A0A0A]">Business</option>
                      <option value="entretenimiento" className="bg-[#0A0A0A]">Entretenimiento</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-[9px] text-white/40 uppercase block mb-1">Enlace de YouTube</label>
                    <input
                      type="text"
                      value={newVideo.videoUrl}
                      onChange={(e) => setNewVideo(v => ({ ...v, videoUrl: e.target.value }))}
                      required
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-3 py-1.5 rounded bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-white/40 uppercase block mb-1">Duración (MM:SS)</label>
                    <input
                      type="text"
                      value={newVideo.duration}
                      onChange={(e) => setNewVideo(v => ({ ...v, duration: e.target.value }))}
                      placeholder="01:30"
                      className="w-full px-3 py-1.5 rounded bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none md:text-center"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] text-white/40 uppercase block mb-1">Tags (Separados por coma)</label>
                  <input
                    type="text"
                    value={newVideo.tagsRaw}
                    onChange={(e) => setNewVideo(v => ({ ...v, tagsRaw: e.target.value }))}
                    placeholder="Premiere Pro, After Effects, VFX, Sound design"
                    className="w-full px-3 py-1.5 rounded bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[9px] text-white/40 uppercase block mb-1">Descripción del trabajo</label>
                  <textarea
                    rows={2}
                    value={newVideo.description}
                    onChange={(e) => setNewVideo(v => ({ ...v, description: e.target.value }))}
                    placeholder="Describe los efectos o el ritmo de edición aplicado..."
                    className="w-full px-3 py-1.5 rounded bg-white/[0.02] border border-white/10 text-xs text-white focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Añadir al Portafolio
                </button>
              </form>

              {/* LIST OF CURRENT VIDEOS */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold text-white/70 uppercase tracking-widest flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 text-indigo-400" />
                  Listado de videos actuales ({videos.length})
                </h4>

                <div className="space-y-3.5">
                  {videos.map((vid, index) => {
                    const ytId = getYouTubeID(vid.videoUrl);
                    return (
                      <div
                        key={vid.id}
                        className="p-3 rounded-lg bg-black/40 border border-white/[0.04] space-y-3 relative group"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-grow space-y-2">
                            <input
                              type="text"
                              value={vid.title}
                              onChange={(e) => handleUpdateVideoField(index, 'title', e.target.value)}
                              className="bg-transparent text-xs font-semibold text-white focus:bg-white/[0.03] p-1 rounded border border-transparent focus:border-white/10 w-full"
                            />
                            
                            <input
                              type="text"
                              value={vid.videoUrl}
                              onChange={(e) => handleUpdateVideoField(index, 'videoUrl', e.target.value)}
                              className="bg-transparent text-[11px] text-indigo-400 focus:bg-white/[0.03] p-1 rounded border border-transparent focus:border-indigo-500/20 w-full font-mono"
                              placeholder="YouTube link"
                            />
                          </div>

                          <button
                            onClick={() => handleDeleteVideo(vid.id)}
                            className="text-white/20 hover:text-rose-400 p-1 rounded hover:bg-rose-500/15 transition-colors flex-shrink-0"
                            title="Eliminar este video"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Secondary edit options */}
                        <div className="grid sm:grid-cols-2 gap-2 text-[10px]">
                          <div>
                            <span className="text-white/30 block mb-0.5">Categoría</span>
                            <select
                              value={vid.category}
                              onChange={(e) => handleUpdateVideoField(index, 'category', e.target.value)}
                              className="bg-zinc-900 border border-white/10 text-white p-1 rounded w-full"
                            >
                              <option value="programacion">Programación</option>
                              <option value="fitness">Fitness</option>
                              <option value="futbol">Fútbol</option>
                              <option value="podcast">Podcast</option>
                              <option value="business">Business</option>
                              <option value="entretenimiento">Entretenimiento</option>
                            </select>
                          </div>
                          <div>
                            <span className="text-white/30 block mb-0.5">Duración</span>
                            <input
                              type="text"
                              value={vid.duration}
                              onChange={(e) => handleUpdateVideoField(index, 'duration', e.target.value)}
                              className="bg-zinc-900 border border-white/10 text-white p-1 rounded w-full text-center"
                            />
                          </div>
                        </div>

                        <div>
                          <span className="text-white/30 text-[10px] block mb-0.5">Etiquetas (separadas por coma)</span>
                          <input
                            type="text"
                            value={vid.tags.join(', ')}
                            onChange={(e) => handleUpdateVideoTags(index, e.target.value)}
                            className="bg-zinc-900 border border-white/10 text-white text-[10px] p-1 rounded w-full"
                            placeholder="Etiquetas"
                          />
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-white/30 pt-1 border-t border-white/[0.02]">
                          <span>Thumbnail detectado:</span>
                          <span className={ytId ? 'text-emerald-400 font-semibold' : 'text-amber-500 font-semibold'}>
                            {ytId ? 'YouTube Oficial OK' : 'Gradiente de Categoría (Fallback)'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Global actions at bottom */}
        <div className="p-5 border-t border-white/[0.06] bg-black/80 space-y-3.5">
          {saveSuccess && (
            <div className="text-center text-xs py-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center gap-1.5">
              <Check className="w-4 h-4" /> ¡Configuración guardada y aplicada exitosamente!
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onReset}
              className="py-2.5 rounded-xl border border-white/15 hover:border-white/20 text-white/70 hover:text-white bg-transparent hover:bg-white/[0.03] text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              title="Volver a los valores de diseño predeterminados"
            >
              <Undo className="w-3.5 h-3.5" /> Reestablecer todo
            </button>
            
            <button
              onClick={handleSaveAll}
              className="py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-[0_4px_15px_rgba(99,102,241,0.3)]"
            >
              <Save className="w-3.5 h-3.5" /> Guardar Cambios
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
