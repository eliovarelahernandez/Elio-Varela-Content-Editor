/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Extracts the 11 character YouTube video ID from standard URLs, shorts, or raw input IDs.
 */
export function getYouTubeID(url: string | undefined): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  // If it's already a clean 11 character ID, return it
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Standard or sharing YouTube URL matching
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = trimmed.match(regExp);
  if (match && match[2] && match[2].length === 11) {
    return match[2];
  }

  // Shorts YouTube URL matching: https://youtube.com/shorts/vR18K7eO_vM
  const shortsReg = /\/shorts\/([a-zA-Z0-9_-]{11})/;
  const shortsMatch = trimmed.match(shortsReg);
  if (shortsMatch && shortsMatch[1]) {
    return shortsMatch[1];
  }

  return null;
}

/**
 * Generates the official YouTube thumbnail url or fallback gracefully
 */
export function getYouTubeThumbnail(url: string | undefined, category?: string): string {
  const id = getYouTubeID(url);
  if (id) {
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }

  // Elegant fallback backgrounds depending on category to avoid broken image frames
  switch (category) {
    case 'programacion':
      return 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80';
    case 'fitness':
      return 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80';
    case 'futbol':
      return 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80';
    case 'podcast':
      return 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80';
    case 'business':
      return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80';
    default:
      return 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=600&q=80';
  }
}
