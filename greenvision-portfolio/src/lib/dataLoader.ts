// Data loader utility for handling JSON imports with Turbopack compatibility

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

// Import JSON files directly
import timelineData from '../../data/timeline.json';
import publicationsData from '../../data/publications.json';
import galleryData from '../../data/gallery.json';
import awardsData from '../../data/awards.json';
import projectsData from '../../data/projects.json';
import languageData from '../../data/language.json';
import certificatesData from '../../data/certificates.json';

// Fallback data in case JSON imports fail
const fallbackData = {
  timeline: [
    {
      id: "1",
      year: "2023",
      title: "Research Scientist",
      company: "Environmental Institute",
      description: "Leading research in environmental sustainability",
      icon: "🔬"
    }
  ] as TimelineItem[],
  publications: [
    {
      id: "1",
      title: "Environmental Impact Assessment",
      authors: "Sadidan, I.",
      journal: "Nature",
      year: "2023"
    }
  ] as Publication[],
  gallery: [
    {
      id: "1",
      title: "Research Project",
      description: "Environmental research project",
      imageUrl: "/gallery/research.jpg",
      category: "Research"
    }
  ] as GalleryItem[],
  awards: [
    {
      id: "1",
      title: "Excellence in Research",
      organization: "International Science Foundation",
      year: "2023",
      description: "Outstanding contribution to environmental research"
    }
  ] as Award[],
  projects: [
    {
      id: "1",
      title: "Environmental Monitoring System",
      description: "Advanced system for environmental data collection",
      technologies: ["Python", "GIS", "Machine Learning"]
    }
  ] as Project[],
  language: [
    { id: "1", name: "Indonesian", proficiency: 100, category: "Native" },
    { id: "2", name: "English", proficiency: 90, category: "Advanced" },
    { id: "3", name: "Russian", proficiency: 70, category: "Intermediate-Advanced" },
    { id: "4", name: "Arabic", proficiency: 40, category: "Intermediate" },
    { id: "5", name: "Japanese", proficiency: 30, category: "Beginner-Intermediate" },
  ] as LanguageSkill[],
  certificates: [
    {
      id: "1",
      title: "Environmental Science Certification",
      issuer: "International Environmental Institute",
      date: "2023"
    }
  ] as Certificate[]
};

// Safe data loading functions
export async function loadTimelineData(): Promise<TimelineItem[]> {
  try {
    return timelineData as TimelineItem[];
  } catch (error) {
    console.warn('Failed to load timeline data, using fallback:', error);
    return fallbackData.timeline;
  }
}

export async function loadPublicationsData(): Promise<Publication[]> {
  try {
    return publicationsData as Publication[];
  } catch (error) {
    console.warn('Failed to load publications data, using fallback:', error);
    return fallbackData.publications;
  }
}

export async function loadGalleryData(): Promise<GalleryItem[]> {
  try {
    return galleryData as GalleryItem[];
  } catch (error) {
    console.warn('Failed to load gallery data, using fallback:', error);
    return fallbackData.gallery;
  }
}

export async function loadAwardsData(): Promise<Award[]> {
  try {
    return awardsData as Award[];
  } catch (error) {
    console.warn('Failed to load awards data, using fallback:', error);
    return fallbackData.awards;
  }
}

export async function loadProjectsData(): Promise<Project[]> {
  try {
    return projectsData as Project[];
  } catch (error) {
    console.warn('Failed to load projects data, using fallback:', error);
    return fallbackData.projects;
  }
}

export async function loadLanguageData(): Promise<LanguageSkill[]> {
  try {
    return languageData as LanguageSkill[];
  } catch (error) {
    console.warn('Failed to load language data, using fallback:', error);
    return fallbackData.language;
  }
}

export async function loadCertificatesData(): Promise<Certificate[]> {
  try {
    return certificatesData as Certificate[];
  } catch (error) {
    console.warn('Failed to load certificates data, using fallback:', error);
    return fallbackData.certificates;
  }
}
