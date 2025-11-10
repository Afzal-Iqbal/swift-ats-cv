export interface ContactInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin?: string;
  location?: string;
  customLinks?: Array<{
    id: string;
    label: string;
    url: string;
  }>;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies?: string;
  link?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface Certification {
  id: string;
  name: string;
  provider: string;
}

export interface ResumeData {
  contactInfo: ContactInfo;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];
  skills: string[];
  certifications: Certification[];
  additionalItems: string[];
}

export type ResumeTemplate = 'professional' | 'modern' | 'ats';
