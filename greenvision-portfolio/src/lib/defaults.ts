import type { SectionSlug, SettingsKey } from "./sections";

type SeedRecord = Record<string, unknown>;

export const SEED_CONTENT: Record<SectionSlug, SeedRecord[]> = {
  timeline: [
    {
      track: "education",
      year: "2017–2019",
      title: "M.Sc. in Ecology & Environmental Management",
      company: "Tomsk Polytechnic University, Russia",
      description: "GPA 4.82/5.0",
      icon: "🎓",
    },
    {
      track: "education",
      year: "2016–2017",
      title: "Preparatory Program (Russian Language & Science)",
      company: "Tyumen State University, Russia",
      description: "",
      icon: "🎓",
    },
    {
      track: "education",
      year: "2011–2015",
      title: "B.Sc. in Animal Science",
      company: "Universitas Padjadjaran, Indonesia",
      description: "GPA 3.24/4.0",
      icon: "🎓",
    },
    {
      track: "experience",
      year: "2022–Present",
      title: "Lecturer, Environmental Engineering",
      company: "UNSIKA",
      description:
        "Courses: Environmental Ecology, GIS, Environmental Management Systems, Digital Literacy, Artificial Intelligence",
      icon: "💼",
    },
    {
      track: "experience",
      year: "",
      title: "International Affairs Coordinator",
      company: "UNSIKA",
      description: "Facilitating student exchanges and global partnerships",
      icon: "🌍",
    },
    {
      track: "experience",
      year: "2023–Present",
      title: "Freelance",
      company: "PT Djaya Enviro Consulting",
      description:
        "Conducting environmental impact assessments & compliance documentation",
      icon: "🌱",
    },
    {
      track: "experience",
      year: "2020–2022",
      title: "Customer Specialist",
      company: "LATOKEN",
      description: "Handling user support in a fintech platform",
      icon: "💼",
    },
    {
      track: "experience",
      year: "2019–2020",
      title: "Website Admin & Content Creator",
      company: "MagicBit Inc.",
      description: "Building Indonesian outreach & content strategy",
      icon: "📝",
    },
    {
      track: "experience",
      year: "2016–2019",
      title: "Citizen Journalist",
      company: "Freelance",
      description: "Reporting and writing news",
      icon: "📰",
    },
    {
      track: "experience",
      year: "2016",
      title: "Animal Keeper",
      company: "Ragunan Zoo",
      description: "Wildlife care, environmental enrichment, and education",
      icon: "🐾",
    },
  ],
  language: [
    { name: "Indonesian", proficiency: 100, category: "Native" },
    { name: "English", proficiency: 90, category: "Advanced" },
    { name: "Russian", proficiency: 70, category: "Intermediate-Advanced" },
    { name: "Arabic", proficiency: 40, category: "Intermediate" },
    { name: "Japanese", proficiency: 30, category: "Beginner-Intermediate" },
  ],
  publications: [
    {
      title:
        "Heavy metal contamination in swiftlet feathers: A comparative study of chromium and arsenic levels in industrial and non-industrial areas of East Java, Indonesia",
      journal: "BIS Energy and Engineering",
      year: "2025",
      doi: "https://doi.org/10.31603/biseeng.348",
      abstract:
        "A comparative study measuring chromium and arsenic concentrations in swiftlet feathers from industrial and non-industrial areas in East Java, showing bioaccumulation as a result of environmental pollution.",
      authors: "Ikhwanussafa Sadidan, Sunu Kuntjoro, Nurul Amri Komarudin",
    },
    {
      title:
        "Utilization of machine learning to predict the correlation between color of river water and other water quality characters",
      journal: "Borobudur Symposium on IT & Computer Science",
      year: "2024",
      doi: "https://doi.org/10.31603/bistycs.136",
      abstract:
        "Machine learning (SVR & DTR) used to analyze correlations between water color and other parameters like TDS, pH, DO, COD, and Fe in environmental monitoring.",
      authors: "I Sadidan, GL Sari, EU Armin, FI Alifin, AR Budiarto",
    },
    {
      title: "Sustainable Reconstruction Plan in Abrasion-Affected Areas",
      journal: "BIS Health and Environmental Science",
      year: "2024",
      doi: "https://doi.org/10.31603/bishes.21",
      abstract:
        "Case study in Karawang's northern coast proposing spatial planning and risk-based reconstruction after coastal erosion, dividing land into strategic development zones.",
      authors: "AR Sugiarto, MR Fitrianto, I Sadidan, F Nurkhaerani, IP Sary",
    },
    {
      title:
        "A Development of Deep Learning Approach to Estimate Blue Carbon Stock on Mangrove Habitats",
      journal: "IEEE ICE3IS Conference Proceedings",
      year: "2024",
      doi: "10.1109/ICE3IS62977.2024.10775455",
      abstract:
        "YOLOv8-based drone image analysis to estimate mangrove structure and blue carbon stock, with high precision results outperforming previous methods.",
      authors:
        "Edmund U Armin, Fakhri I Alifin, Budi Arif Dermawan, Ikhwanussafa Sadidan",
    },
    {
      title:
        "Exploring the Use of ChatGPT in Academic Assignments: Frequency, Benefits, and Perceptions among University Students",
      journal: "IC-ITECHS Journal",
      year: "2024",
      doi: "https://doi.org/10.32664/ic-itechs.v5i1.1669",
      abstract:
        "Mixed-methods study examining university students' usage patterns, benefits, and perceptions of ChatGPT in academic tasks, highlighting both utility and ethical concerns.",
      authors:
        "Hasan Rabiev, Ikhwanussafa Sadidan, Novi Anthika Suci Nurhidayah",
    },
    {
      title:
        "Study of Physical and Chemical Properties of Drinking Water Sources on the Citarum River Irrigation Area in Karawang, West Java, Indonesia",
      journal: "E3S Web of Conferences",
      year: "2024",
      doi: "https://doi.org/10.1051/e3sconf/202450002002",
      abstract:
        "Assessment of 33 water samples showed high pollution levels in the Citarum River. Chemical tests revealed excessive turbidity and iron content above national standards.",
      authors: "Ikhwanussafa Sadidan et al.",
    },
    {
      title:
        "Oil and Grease Contamination of Raw Water for Drinking Purposes in Karawang Regency, Indonesia",
      journal: "E3S Web of Conferences",
      year: "2024",
      doi: "https://doi.org/10.1051/e3sconf/202450002001",
      abstract:
        "The study detected oil, grease, and toxic metals in irrigation canals supplying drinking water, indicating pollution from industrial and domestic waste.",
      authors: "Ikhwanussafa Sadidan et al.",
    },
    {
      title:
        "Quality Improvement of Food Products Using Taguchi Method: A Study in a Bread Product SME",
      journal: "Vol Journal",
      year: "Unknown",
      doi: "N/A",
      abstract:
        "A Taguchi method-based study conducted at a bread SME in Bandung to identify and optimize factors contributing to defective Kadet bread. The research achieved improved process design and reduced product defects using Analysis of Variance.",
      authors: "Ikhwanussafa Sadidan et al.",
    },
    {
      title:
        "Road Condition Monitoring with Drones and LiDAR in Infrastructure Technology",
      journal: "Semesta Teknika",
      year: "2025",
      doi: "https://doi.org/10.18196/st.v28i1.25170",
      abstract:
        "This study uses drone-based LiDAR technology for road condition monitoring in Karawang, Indonesia. It achieved 93.7% accuracy in detecting road damage and validated the effectiveness of drone-LiDAR systems for efficient infrastructure assessment and predictive maintenance.",
      authors: "Ikhwanussafa Sadidan et al.",
    },
  ],
  awards: [
    {
      title: "Best Pitch Presenter",
      organization:
        "SEARCA Agro Innovator Program, University of the Philippines Los Banos",
      year: "2025",
      description:
        "Recognized for outstanding presentation skills and innovative pitch in agricultural innovation program.",
      category: "Presentation",
    },
    {
      title: "Best Presenter",
      organization:
        "6th Borobudur International Symposium on Science and Technology, UNIMMA",
      year: "2024",
      description:
        "Awarded for exceptional presentation at international symposium on science and technology.",
      category: "Presentation",
    },
    {
      title: "Supervising Lecturer for PIMNAS 2024",
      organization: "PKM Video Constructive Ideas",
      year: "2024",
      description:
        "Successfully supervised students for PIMNAS 2024 in PKM Video Constructive Ideas category.",
      category: "Supervision",
    },
    {
      title: "SPADA Documentary Video Grant",
      organization: "Indonesian Ministry of Culture, Research and Technology",
      year: "2023",
      description:
        "Received grant for Learning Video Innovation Competition from the Indonesian Ministry of Culture, Research and Technology.",
      category: "Grant",
    },
    {
      title: "Best Presenter",
      organization:
        "4th Borobudur International Symposium on Science and Technology, UNIMMA",
      year: "2022",
      description:
        "Recognized for outstanding presentation at international symposium on science and technology.",
      category: "Presentation",
    },
    {
      title: "Second Best Paper",
      organization:
        "XIII International Scientific Symposium, Tomsk Polytechnic University",
      year: "2019",
      description:
        "Awarded second place for research paper on 'Geoecological Problem of Subsoil Development'.",
      category: "Research",
    },
    {
      title: "Third Best Paper",
      organization:
        "XIII International Scientific Symposium, Tomsk Polytechnic University",
      year: "2018",
      description:
        "Awarded third place for research paper on 'Geoecological Problem of Subsoil Development'.",
      category: "Research",
    },
    {
      title: "Russian Government Scholarship",
      organization: "Russian Government",
      year: "2016-2019",
      description:
        "Full scholarship awardee for master's degree studies in Russia.",
      category: "Scholarship",
    },
    {
      title: "Pikiran Rakyat Scholarship",
      organization: "Pikiran Rakyat",
      year: "2012-2013",
      description: "Scholarship awardee for undergraduate studies.",
      category: "Scholarship",
    },
  ],
  projects: [
    {
      title: "Environmental Impact Assessment",
      category: "Consulting",
      description:
        "Comprehensive EIA for major infrastructure projects, ensuring compliance with environmental regulations and sustainable development practices.",
      technologies: ["GIS", "Environmental Modeling", "Stakeholder Analysis"],
      emoji: "🌱",
      imageUrl: "",
      githubUrl: "",
      liveUrl: "",
    },
    {
      title: "Waste Management System Design",
      category: "Research",
      description:
        "Developed sustainable waste management solutions for urban areas, focusing on circular economy principles and community engagement.",
      technologies: [
        "Waste Analysis",
        "Community Planning",
        "Sustainability Metrics",
      ],
      emoji: "♻️",
      imageUrl: "",
      githubUrl: "",
      liveUrl: "",
    },
    {
      title: "Biodiversity Conservation Program",
      category: "Conservation",
      description:
        "Led conservation initiatives for endangered species, implementing habitat restoration and monitoring programs in protected areas.",
      technologies: [
        "Species Monitoring",
        "Habitat Mapping",
        "Conservation Planning",
      ],
      emoji: "🦋",
      imageUrl: "",
      githubUrl: "",
      liveUrl: "",
    },
    {
      title: "Climate Adaptation Strategy",
      category: "Policy",
      description:
        "Designed climate resilience strategies for coastal communities, incorporating traditional knowledge with modern scientific approaches.",
      technologies: [
        "Climate Modeling",
        "Risk Assessment",
        "Community Engagement",
      ],
      emoji: "🌊",
      imageUrl: "",
      githubUrl: "",
      liveUrl: "",
    },
    {
      title: "Environmental Education Platform",
      category: "Education",
      description:
        "Created digital learning resources for environmental education, making complex ecological concepts accessible to diverse audiences.",
      technologies: [
        "Digital Learning",
        "Content Creation",
        "Educational Technology",
      ],
      emoji: "📚",
      imageUrl: "",
      githubUrl: "",
      liveUrl: "",
    },
    {
      title: "Green Infrastructure Planning",
      category: "Urban Planning",
      description:
        "Planned and implemented green infrastructure projects in urban areas, enhancing ecosystem services and community well-being.",
      technologies: ["Urban Planning", "Ecosystem Services", "Green Design"],
      emoji: "🏙️",
      imageUrl: "",
      githubUrl: "",
      liveUrl: "",
    },
  ],
  gallery: [
    {
      title: "Field Research in Mangrove Ecosystems",
      description:
        "Conducting biodiversity surveys and carbon stock assessments in coastal mangrove habitats.",
      category: "Research",
      emoji: "🌊",
      imageUrl: "",
    },
    {
      title: "Environmental Impact Assessment",
      description:
        "Leading comprehensive EIA studies for sustainable infrastructure development projects.",
      category: "Consulting",
      emoji: "📊",
      imageUrl: "",
    },
    {
      title: "Community Environmental Education",
      description:
        "Engaging with local communities to promote environmental awareness and sustainable practices.",
      category: "Education",
      emoji: "👥",
      imageUrl: "",
    },
    {
      title: "Waste Management Innovation",
      description:
        "Developing and implementing sustainable waste management solutions for urban areas.",
      category: "Innovation",
      emoji: "♻️",
      imageUrl: "",
    },
    {
      title: "Biodiversity Conservation",
      description:
        "Working on species protection and habitat restoration in protected areas.",
      category: "Conservation",
      emoji: "🦋",
      imageUrl: "",
    },
    {
      title: "Climate Adaptation Planning",
      description:
        "Designing resilience strategies for communities vulnerable to climate change impacts.",
      category: "Policy",
      emoji: "🌱",
      imageUrl: "",
    },
    {
      title: "Academic Research Collaboration",
      description:
        "Collaborating with international researchers on environmental science projects.",
      category: "Research",
      emoji: "🔬",
      imageUrl: "",
    },
    {
      title: "Sustainable Development Projects",
      description:
        "Implementing green infrastructure and sustainable development initiatives.",
      category: "Development",
      emoji: "🏗️",
      imageUrl: "",
    },
  ],
};

export const DEFAULT_SETTINGS: Record<SettingsKey, SeedRecord> = {
  hero: {
    name: "Ikhwanussafa Sadidan",
    credential: ", M.Sc.",
    headline: "Ecology & Environmental Management",
    bio1: "A passionate university lecturer and researcher dedicated to sustainability and ecological innovation. With an academic foundation in Ecology and Environmental Management from Tomsk Polytechnic University (Russia) and years of teaching, researching, and consulting experience, I aim to inspire change through science and education.",
    bio2: "My research focuses on environmental pollution, Geographic Information Systems (GIS), and the integration of Artificial Intelligence in ecological analysis. I currently serve as a lecturer in Faculty of Engineering at Universitas Singaperbangsa Karawang (UNSIKA), where I also responsible to coordinate international collaborations and affairs.",
    closing: "Let's work together to build a healthier, greener planet.",
    profileImage: "/profile/didan.jpeg",
    cvUrl: "/CV-Ikhwanussafa-Sadidan.pdf",
    roleTitle: "Lecturer of Environmental Engineering Study Program",
    roleOrg: "Universitas Singaperbangsa Karawang (UNSIKA)",
    tags: ["GIS", "AI", "Pollution", "Research"],
    stat1Value: "5+",
    stat1Label: "Years Experience",
    stat2Value: "10+",
    stat2Label: "Research Papers",
    stat3Value: "100+",
    stat3Label: "Students Mentored",
  },
  contact: {
    intro:
      "Whether you're interested in environmental consulting, research collaboration, or educational partnerships, I'm always open to discussing new opportunities and innovative projects.",
    email: "ikhwanussafa.sadidan@unsika.ac.id",
    location: "Karawang, West Java, Indonesia",
    institution: "Universitas Singaperbangsa Karawang",
    formEndpoint: "https://formspree.io/f/xwpqngrw",
    facebook: "https://www.facebook.com/ikhwanussafa.sadidan/",
    instagram: "https://www.instagram.com/sadidun",
    linkedin:
      "https://www.linkedin.com/in/sadidan-ikhwanussafa-9624b990/",
    youtube: "https://youtube.com/@sadidan26",
  },
  footer: {
    aboutTitle: "Ikhwanussafa Sadidan, M.Sc.",
    aboutText:
      "Lecturer of Environmental Engineering Study Program, consultant, and researcher dedicated to sustainable development and environmental conservation. Specializing in environmental impact assessment, biodiversity conservation, and climate adaptation strategies.",
    copyright: "H.K Freelance Studio. All rights reserved.",
    services: [
      "Environmental Consulting",
      "Research Collaboration",
      "Academic Mentoring",
      "GIS Analysis",
    ],
    privacyUrl: "/Privacy%20Policy_h.k.pdf",
    termsUrl: "/Terms%20of%20Service_hk.pdf",
  },
};
