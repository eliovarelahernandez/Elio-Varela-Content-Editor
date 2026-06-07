/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { X, Play, AlertCircle, ExternalLink } from 'lucide-react';
import { getYouTubeID } from '../utils';

interface VideoModalProps {
  videoUrl: string | null;
  onClose: () => void;
}

export default function VideoModal({ videoUrl, onClose }: VideoModalProps) {
  useEffect(() => {
    if (!videoUrl) return;

    // Direct key handler to close the player modal with the Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [videoUrl, onClose]);

  if (!videoUrl) return null;

  const youtubeID = getYouTubeID(videoUrl);
  const isVimeo = videoUrl.includes('vimeo.com');
  const vimeoID = isVimeo ? videoUrl.split('/').pop()?.split('?')[0] : null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-10 transition-all duration-300 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl aspect-video bg-neutral-950 border border-white/10 rounded-2xl overflow-hidden relative shadow-2xl flex flex-col justify-between"
      >
        {/* Dynamic player iframe content */}
        <div className="w-full h-full relative object-cover bg-black">
          {youtubeID ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeID}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-none"
              title="YouTube Player"
            />
          ) : isVimeo && vimeoID ? (
            <iframe
              src={`https://player.vimeo.com/video/${vimeoID}?autoplay=1`}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-none"
              title="Vimeo Player"
            />
          ) : (
            // Native player backup in case it is a direct video host URL
            <video
              src={videoUrl}
              autoPlay
              controls
              playsInline
              className="absolute inset-0 w-full h-full object-contain"
            >
              Su navegador no soporta reproducción de video nativa.
            </video>
          )}
        </div>

        {/* Floating Controls Bar */}
        <div className="absolute top-[-52px] right-0 flex items-center gap-3">
          <a
            href={videoUrl}
            target="_blank"
            rel="noreferrer noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-[10px] uppercase font-bold tracking-widest text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors"
            title="Abrir en pestaña nueva"
          >
            Ver Original <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-colors shadow-lg"
            title="Cerrar reproductor"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
