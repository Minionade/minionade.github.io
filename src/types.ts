export type Persona = 'hybrid' | 'gamedev' | 'hardware' | 'equipment';

export type ToneMode = 'grounded' | 'formal';

export type ThemeId = 'slate' | 'navy' | 'emerald' | 'charcoal';

export interface Profile {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  github?: string;
  portfolio?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
  skillsUsed: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  roleSubtitle: string;
  period: string;
  stack: string[];
  summary: string;
  accomplishments: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  year: string;
  notes: string;
}

export interface ResumeData {
  profile: Profile;
  summaryByPersona: Record<Persona, string>;
  skillsByPersona: Record<Persona, SkillGroup[]>;
  projects: ProjectItem[];
  experience: ExperienceItem[];
  education: EducationItem;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readingTime: string;
  category: string;
  summary: string;
  content: {
    lead: string;
    sections: {
      heading: string;
      body: string[];
      codeSnippet?: {
        language: string;
        code: string;
        caption?: string;
      };
      diagram?: string;
      keyTakeaways?: string[];
    }[];
  };
}
