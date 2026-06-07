/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SocialLinks {
  instagram: string;
  youtube: string;
  linkedin: string;
  twitter: string;
}

export interface TechnicalSkill {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
  badgeColor: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  category: 'programacion' | 'fitness' | 'futbol' | 'podcast' | 'business' | 'entretenimiento';
  videoUrl: string;
  duration: string;
  tags: string[];
}

export interface PortfolioData {
  name: string;
  role: string;
  yearsOfExperience: string;
  projectsCompleted: string;
  clientsCount: string;
  location: string;
  email: string;
  phone: string;
  remoteAvailable: boolean;
  socials: SocialLinks;
  heroVerticalUrl: string;
  heroHorizontalUrl: string;
  videos: VideoItem[];
}
