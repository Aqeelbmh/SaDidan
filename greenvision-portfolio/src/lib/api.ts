export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  icon: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  doi?: string;
  link?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface LanguageSkill {
  id: string;
  name: string;
  proficiency: number;
  category: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  imageUrl?: string;
  link?: string;
}

export async function fetchSectionData<T>(section: string): Promise<T[]> {
  try {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      const response = await fetch(`/api/admin?section=${section}`);
      if (!response.ok) {
        return [];
      }
      return await response.json();
    } else {
      // In static export or production, always return [] (or fallback data if you want)
      return [];
    }
  } catch {
    return [];
  }
}

export const api = {
  timeline: () => fetchSectionData<TimelineItem>('timeline'),
  publications: () => fetchSectionData<Publication>('publications'),
  gallery: () => fetchSectionData<GalleryItem>('gallery'),
  awards: () => fetchSectionData<Award>('awards'),
  projects: () => fetchSectionData<Project>('projects'),
  language: () => fetchSectionData<LanguageSkill>('language'),
  certificates: () => fetchSectionData<Certificate>('certificates'),
}; 