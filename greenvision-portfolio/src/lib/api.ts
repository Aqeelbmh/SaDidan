import {
  TimelineItem,
  Publication,
  GalleryItem,
  Award,
  Project,
  LanguageSkill,
  Certificate,
  loadTimelineData,
  loadPublicationsData,
  loadGalleryData,
  loadAwardsData,
  loadProjectsData,
  loadLanguageData,
  loadCertificatesData,
} from "./dataLoader";

export type {
  TimelineItem,
  Publication,
  GalleryItem,
  Award,
  Project,
  LanguageSkill,
  Certificate,
};

export async function fetchSectionData<T>(section: string): Promise<T[]> {
  try {
    // Simulate loading delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Use the safe data loader functions
    switch (section) {
      case "timeline":
        return (await loadTimelineData()) as T[];
      case "publications":
        return (await loadPublicationsData()) as T[];
      case "gallery":
        return (await loadGalleryData()) as T[];
      case "awards":
        return (await loadAwardsData()) as T[];
      case "projects":
        return (await loadProjectsData()) as T[];
      case "language":
        return (await loadLanguageData()) as T[];
      case "certificates":
        return (await loadCertificatesData()) as T[];
      default:
        return [];
    }
  } catch (error) {
    console.error(`Error fetching ${section} data:`, error);
    return [];
  }
}

export const api = {
  timeline: () => fetchSectionData<TimelineItem>("timeline"),
  publications: () => fetchSectionData<Publication>("publications"),
  gallery: () => fetchSectionData<GalleryItem>("gallery"),
  awards: () => fetchSectionData<Award>("awards"),
  projects: () => fetchSectionData<Project>("projects"),
  language: () => fetchSectionData<LanguageSkill>("language"),
  certificates: () => fetchSectionData<Certificate>("certificates"),
};
