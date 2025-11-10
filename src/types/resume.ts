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
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface ResumeData {
  contactInfo: ContactInfo;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  certifications: string[];
  languages: string[];
}

export type ResumeTemplate = 'professional' | 'modern' | 'ats';
