export type WorkMode = 'Remote' | 'Hybrid' | 'On-site';
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type EventType = 'Hackathon' | 'Coding Contest' | 'Workshop' | 'Webinar' | 'Tech Summit';
export type ApplicationStatus = 'Applied' | 'Under Review' | 'Interview Scheduled' | 'Offer Extended' | 'Not Selected';

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  college: string;
  branch: string;
  year: string;
  cgpa: string;
  location: string;
  bio: string;
  technicalSkills: string[];
  softSkills: string[];
  certifications: Certification[];
  projects: Project[];
  experience: Experience[];
  github: string;
  linkedin: string;
  resumeFileName: string;
  targetRole: string;
}

export interface Internship {
  id: string;
  company: string;
  logo: string;
  title: string;
  location: string;
  workMode: WorkMode;
  duration: string;
  stipend: string;
  numericStipend: number; // for filtering
  deadline: string;
  domain: string;
  requiredSkills: string[];
  description: string;
  perks: string[];
  applicantsCount: number;
  postedDate: string;
  isFeatured?: boolean;
}

export interface LearningResource {
  id: string;
  title: string;
  type: 'video' | 'doc' | 'practice' | 'project';
  durationOrPages: string;
  url: string;
  completed?: boolean;
}

export interface SkillCourse {
  id: string;
  name: string;
  category: string;
  level: SkillLevel;
  iconName: string;
  description: string;
  estimatedHours: string;
  progress: number; // 0 to 100
  isEnrolled: boolean;
  resources: LearningResource[];
}

export interface CareerRoleRequirement {
  id: string;
  roleName: string;
  category: string;
  description: string;
  averageSalary: string;
  demandLevel: 'High' | 'Very High' | 'Critical Demand';
  requiredSkills: string[];
  recommendedSkills: string[];
  overview: string;
}

export interface HackathonEvent {
  id: string;
  title: string;
  type: EventType;
  organizer: string;
  organizerLogo?: string;
  date: string;
  mode: 'Online' | 'Hybrid' | 'In-Person';
  location: string;
  deadline: string;
  prizePool?: string;
  spotsLeft: number;
  tags: string[];
  description: string;
  isRegistered?: boolean;
}

export interface InternshipApplication {
  id: string;
  internshipId: string;
  internshipTitle: string;
  company: string;
  companyLogo: string;
  appliedDate: string;
  status: ApplicationStatus;
  resumeUsed: string;
  workMode: WorkMode;
  location: string;
  stipend: string;
}
