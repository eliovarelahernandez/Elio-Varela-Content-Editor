/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Send, CheckCircle, Flame, Mail, Sparkles } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', projectType: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate reliable contact form API transmission
    setTimeout(() => {
      setLoading(false);
      setShowToast(true);
      setForm({ name: '', email: '', projectType: '', message: '' });
      
      // Auto-expire success toast alerts
      setTimeout(() => {
        setShowToast(false);
      }, 3500);
    }, 1200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contacto" className="py-20 border-t border-white/[0.05] relative px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Caption Header */}
        <div className="text-center mb-10">
          <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-400 block mb-1">
            CONTRATACIONES & NEGOCIOS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            ¿Tienes un <span className="text-shimmer">proyecto</span> en mente?
          </h2>
          <p className="text-xs text-white/45 mt-2">
            Cuéntame tu visión y elevemos juntos la retención orgánica de tu canal de video.
          </p>
        </div>

        {/* Form elements container */}
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 rounded-2xl bg-[#080808] border border-white/[0.06] space-y-5 shadow-2xl relative"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-widest font-semibold block mb-1.5">
                Nombre Completo
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleInputChange}
                placeholder="Tu nombre"
                className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs sm:text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all"
              />
            </div>
            
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-widest font-semibold block mb-1.5">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleInputChange}
                placeholder="tu@correo.com"
                className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs sm:text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-white/40 uppercase tracking-widest font-semibold block mb-1.5">
              Tipo de Proyecto
            </label>
            <select
              name="projectType"
              required
              value={form.projectType}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs sm:text-sm text-white/60 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22rgba(255%2C255%2C255%2C0.3)%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20d%3D%22M4.646%204.646a.5.5%200%200%201%20.708%200L8%207.293l2.646-2.647a.5.5%200%200%201%20.708.708l-3%203a.5.5%200%200%201-.708%200l-3-3a.5.5%200%200%201%200-.708z%22%2F%3E%3C%2Fsvg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '16px'
              }}
            >
              <option value="" className="bg-[#0A0A0A]">Selecciona una categoría de video</option>
              <option value="programacion" className="bg-[#0A0A0A]">Programación / Contenido Tech</option>
              <option value="fitness" className="bg-[#0A0A0A]">Fitness / Nutrición y Deporte</option>
              <option value="futbol" className="bg-[#0A0A0A]">Fútbol / Resúmenes y Clips Deportivos</option>
              <option value="podcast" className="bg-[#0A0A0A]">Clips de Podcast / Entrevistas</option>
              <option value="business" className="bg-[#0A0A0A]">Business / Publicidades y Corporativos</option>
              <option value="entretenimiento" className="bg-[#0A0A0A]">Entretenimiento / Virales y Reacciones</option>
              <option value="otro" className="bg-[#0A0A0A]">Otro tipo de edición audiovisual</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] text-white/40 uppercase tracking-widest font-semibold block mb-1.5">
              Mensaje & Alcance de la Idea
            </label>
            <textarea
              name="message"
              required
              rows={4}
              value={form.message}
              onChange={handleInputChange}
              placeholder="Cuéntame sobre la duración aproximada, plazos, presupuesto y ejemplos de edits que te inspiran..."
              className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs sm:text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_25px_rgba(99,102,241,0.4)]"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <Send className="w-4 h-4" /> Enviar Mensaje Estratégico
              </>
            )}
          </button>
        </form>
      </div>

      {/* Floating success toast alerts */}
      <div
        id="toast-notif"
        className={`fixed bottom-6 right-6 z-[120] px-5 py-3 rounded-xl bg-indigo-600/90 backdrop-blur-md border border-indigo-400/40 flex items-center gap-3 shadow-2xl transition-all duration-300 transform ${
          showToast ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
          <CheckCircle className="w-4 h-4 text-white" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-white leading-tight">¡Mensaje Enviado con éxito!</h4>
          <p className="text-[10px] text-indigo-200 mt-0.5">Elio te responderá en menos de 24 horas.</p>
        </div>
      </div>
    </section>
  );
}
