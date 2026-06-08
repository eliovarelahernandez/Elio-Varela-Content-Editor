/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioData } from './types';

export const initialPortfolioData: PortfolioData = {
  name: "Elio Varela Hernández",
  role: "Editor de Video & Creador de Contenido Estratégico",
  yearsOfExperience: "3+",
  projectsCompleted: "80+",
  clientsCount: "30+",
  location: "Cienfuegos, Cuba",
  email: "eliovarelahernandez7@gmail.com",
  phone: "+5356880708",
  remoteAvailable: true,
  socials: {
    instagram: "",
    youtube: "https://www.youtube.com/@eliovarela_contenteditor",
    linkedin: "",
    twitter: ""
  },
  // High quality real cinematic short/vertical video
  heroVerticalUrl: "https://www.youtube.com/shorts/eOEuEJcqLwQ",
  // High quality real epic drone/b-roll video
  heroHorizontalUrl: "https://www.youtube.com/watch?v=SYnfMAZ2buI",
  videos: [
    {
      id: "prog1",
      title: "Qué es la Programación Competitiva",
      description: "Edición dinámica con zooms de precisión, transiciones rápidas y resaltado de código en tiempo real para enganchar desarrolladores.",
      category: "programacion",
      videoUrl: "https://www.youtube.com/watch?v=u6gSSpf0XX4",
      duration: "08:24",
      tags: ["Premiere Pro", "After Effects", "Dynamic Code Zoom"]
    },
    {
      id: "prog2",
      title: "Por qué tu código es LENTO y cómo arreglarlo",
      description: "Contenido educativo de alto impacto con gráficos animados en After Effects y subtítulos súper dinámicos.",
      category: "programacion",
      videoUrl: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
      duration: "12:07",
      tags: ["Premiere", "After Effects", "Motion Graphics"]
    },
    {
      id: "fit1",
      title: "Cuánto músculo puedes ganar en un año",
      description: "Reel vertical sincronizado al ritmo de los beats con efectos de velocidad (speed ramps) y tipografías grandes.",
      category: "fitness",
      videoUrl: "https://www.youtube.com/watch?v=v9C-I8A9_jU",
      duration: "00:45",
      tags: ["CapCut Pro", "Premiere Pro", "Sound design"]
    },
    {
      id: "fit2",
      title: "Gimnasio vs Calistenia: El Veredicto Científico",
      description: "Edición tipo mini-documental de alta tensión, uso de esquemas de comparación visual y ritmo cinematográfico continuo.",
      category: "fitness",
      videoUrl: "https://www.youtube.com/watch?v=_t6f6Zfco4g",
      duration: "10:15",
      tags: ["Premiere Pro", "DaVinci Color", "Documentary Style"]
    },
    {
      id: "fut1",
      title: "Análisis Táctico de las Semifinales — Champions League",
      description: "Desglose técnico de jugadas de fútbol con flechas animadas en After Effects, círculos de seguimiento y overlays de alta precisión.",
      category: "futbol",
      videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      duration: "06:48",
      tags: ["Tactical Overlay", "After Effects", "Illustrator Tracking"]
    },
    {
      id: "fut2",
      title: "Mejores Goles de la Temporada — Edición Épica",
      description: "Recopilación con cámara lenta (optical flow), sincronización musical excelente y gradación de color dramática.",
      category: "futbol",
      videoUrl: "https://www.youtube.com/watch?v=tTzK-HnlyS0",
      duration: "03:22",
      tags: ["Color Grading", "Cinematic Beats", "Slow-Motion Zoom"]
    },
    {
      id: "pod1",
      title: "Conversaciones que Importan — Episodio Especial",
      description: "Clips de alta retención recortados estratégicamente a partir de podcasts multi-cámara con zooms automáticos e incrustación de memes.",
      category: "podcast",
      videoUrl: "https://www.youtube.com/watch?v=K4wG_S63M4E",
      duration: "04:12",
      tags: ["Multicam Edit", "Speech Enhancement", "Engagement Hooks"]
    },
    {
      id: "bus1",
      title: "Estrategia para Escalar tu Startup este Año",
      description: "Video corporativo dinámico con infografías interactivas, material de archivo de primera y narración guiada.",
      category: "business",
      videoUrl: "https://www.youtube.com/watch?v=V_Y7U986Kug",
      duration: "05:40",
      tags: ["After Effects", "Stock Overlay", "Corporate Shimmer"]
    },
    {
      id: "ent1",
      title: "Top 10 Momentos Épicos del Internet",
      description: "Review de entretenimiento con zooms de reacción rápidos, efectos de sonido cómicos y subtitulación de colores.",
      category: "entretenimiento",
      videoUrl: "https://www.youtube.com/watch?v=-qCHhYYzv1w",
      duration: "11:20",
      tags: ["Fast Cuts", "Reaction Effects", "Spanish Submarines"]
    }
  ]
};
