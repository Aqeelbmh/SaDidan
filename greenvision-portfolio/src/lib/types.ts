export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  icon: string;
  track: "education" | "experience";
}

export interface LanguageSkill {
  id: string;
  name: string;
  proficiency: number;
  category: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  doi: string;
  abstract: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  category: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  emoji: string;
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  emoji: string;
  imageUrl: string;
}

export interface HeroSettings {
  name: string;
  credential: string;
  headline: string;
  bio1: string;
  bio2: string;
  closing: string;
  profileImage: string;
  cvUrl: string;
  roleTitle: string;
  roleOrg: string;
  tags: string[];
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
}

export interface ContactSettings {
  intro: string;
  email: string;
  location: string;
  institution: string;
  formEndpoint: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
}

export interface FooterSettings {
  aboutTitle: string;
  aboutText: string;
  copyright: string;
  services: string[];
  privacyUrl: string;
  termsUrl: string;
}

export interface SiteSettings {
  hero: HeroSettings;
  contact: ContactSettings;
  footer: FooterSettings;
}

export interface ContentSections {
  timeline: TimelineItem[];
  language: LanguageSkill[];
  publications: Publication[];
  awards: Award[];
  projects: Project[];
  gallery: GalleryItem[];
}

export interface SiteContent {
  settings: SiteSettings;
  sections: ContentSections;
}
