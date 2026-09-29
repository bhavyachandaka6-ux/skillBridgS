import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudentProfile,
  Internship,
  SkillCourse,
  HackathonEvent,
  InternshipApplication,
} from '../types';
import {
  INITIAL_STUDENT_PROFILE,
  MOCK_INTERNSHIPS,
  MOCK_SKILL_COURSES,
  MOCK_EVENTS,
  INITIAL_APPLICATIONS,
} from '../data/mockData';

export type ActiveTab =
  | 'home'
  | 'internships'
  | 'skills'
  | 'skill-gap'
  | 'events'
  | 'resume-builder'
  | 'saved'
  | 'dashboard'
  | 'profile';

interface NotificationItem {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  studentProfile: StudentProfile;
  updateProfile: (updated: Partial<StudentProfile>) => void;
  isLoggedIn: boolean;
  login: (email: string) => void;
  signup: (data: Partial<StudentProfile>) => void;
  logout: () => void;
  internships: Internship[];
  savedInternshipIds: string[];
  toggleSaveInternship: (id: string) => void;
  skills: SkillCourse[];
  savedSkillIds: string[];
  toggleSaveSkill: (id: string) => void;
  updateSkillProgress: (skillId: string, progress: number) => void;
  toggleResourceCompleted: (skillId: string, resourceId: string) => void;
  enrollSkill: (skillId: string) => void;
  events: HackathonEvent[];
  savedEventIds: string[];
  toggleSaveEvent: (id: string) => void;
  registerForEvent: (eventId: string) => void;
  applications: InternshipApplication[];
  applyForInternship: (internshipId: string, resumeName?: string) => boolean;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'signup' | 'forgot' | 'setup';
  setAuthMode: (mode: 'login' | 'signup' | 'forgot' | 'setup') => void;
  selectedSkillForLearning: SkillCourse | null;
  setSelectedSkillForLearning: (skill: SkillCourse | null) => void;
  applyingInternship: Internship | null;
  setApplyingInternship: (internship: Internship | null) => void;
  notifications: NotificationItem[];
  addNotification: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeNotification: (id: string) => void;
  targetRoleForGap: string;
  setTargetRoleForGap: (role: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Profile
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('skillbridge_profile');
      return saved ? JSON.parse(saved) : INITIAL_STUDENT_PROFILE;
    } catch {
      return INITIAL_STUDENT_PROFILE;
    }
  });

  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('skillbridge_auth') !== 'false';
    } catch {
      return true;
    }
  });

  // Saved Collections
  const [savedInternshipIds, setSavedInternshipIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('skillbridge_saved_internships');
      return saved ? JSON.parse(saved) : ['int_1', 'int_2'];
    } catch {
      return ['int_1', 'int_2'];
    }
  });

  const [savedSkillIds, setSavedSkillIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('skillbridge_saved_skills');
      return saved ? JSON.parse(saved) : ['skill_react', 'skill_dsa'];
    } catch {
      return ['skill_react', 'skill_dsa'];
    }
  });

  const [savedEventIds, setSavedEventIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('skillbridge_saved_events');
      return saved ? JSON.parse(saved) : ['evt_1', 'evt_3'];
    } catch {
      return ['evt_1', 'evt_3'];
    }
  });

  // Skills Data with Local Progress
  const [skills, setSkills] = useState<SkillCourse[]>(() => {
    try {
      const saved = localStorage.getItem('skillbridge_skills');
      return saved ? JSON.parse(saved) : MOCK_SKILL_COURSES;
    } catch {
      return MOCK_SKILL_COURSES;
    }
  });

  // Events Data
  const [events, setEvents] = useState<HackathonEvent[]>(() => {
    try {
      const saved = localStorage.getItem('skillbridge_events');
      return saved ? JSON.parse(saved) : MOCK_EVENTS;
    } catch {
      return MOCK_EVENTS;
    }
  });

  // Applications
  const [applications, setApplications] = useState<InternshipApplication[]>(() => {
    try {
      const saved = localStorage.getItem('skillbridge_applications');
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  // UI state
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot' | 'setup'>('login');
  const [selectedSkillForLearning, setSelectedSkillForLearning] = useState<SkillCourse | null>(null);
  const [applyingInternship, setApplyingInternship] = useState<Internship | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [targetRoleForGap, setTargetRoleForGap] = useState<string>('Web Developer');

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('skillbridge_profile', JSON.stringify(studentProfile));
    } catch (e) {
      console.error(e);
    }
  }, [studentProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('skillbridge_auth', String(isLoggedIn));
    } catch (e) {
      console.error(e);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    try {
      localStorage.setItem('skillbridge_saved_internships', JSON.stringify(savedInternshipIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedInternshipIds]);

  useEffect(() => {
    try {
      localStorage.setItem('skillbridge_saved_skills', JSON.stringify(savedSkillIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedSkillIds]);

  useEffect(() => {
    try {
      localStorage.setItem('skillbridge_saved_events', JSON.stringify(savedEventIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedEventIds]);

  useEffect(() => {
    try {
      localStorage.setItem('skillbridge_skills', JSON.stringify(skills));
    } catch (e) {
      console.error(e);
    }
  }, [skills]);

  useEffect(() => {
    try {
      localStorage.setItem('skillbridge_events', JSON.stringify(events));
    } catch (e) {
      console.error(e);
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem('skillbridge_applications', JSON.stringify(applications));
    } catch (e) {
      console.error(e);
    }
  }, [applications]);

  // Notification helper
  const addNotification = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Profile methods
  const updateProfile = (updated: Partial<StudentProfile>) => {
    setStudentProfile((prev) => ({
      ...prev,
      ...updated,
    }));
    addNotification('Profile updated successfully!', 'success');
  };

  // Auth methods
  const login = (email: string) => {
    setIsLoggedIn(true);
    setStudentProfile((prev) => ({ ...prev, email: email || prev.email }));
    setAuthModalOpen(false);
    addNotification('Welcome back to SkillBridge!', 'success');
  };

  const signup = (data: Partial<StudentProfile>) => {
    setIsLoggedIn(true);
    setStudentProfile((prev) => ({
      ...prev,
      ...data,
      id: 'std_' + Date.now(),
    }));
    setAuthModalOpen(false);
    addNotification('Account created successfully! Welcome to SkillBridge.', 'success');
  };

  const logout = () => {
    setIsLoggedIn(false);
    addNotification('You have been logged out.', 'info');
  };

  // Saved handlers
  const toggleSaveInternship = (id: string) => {
    setSavedInternshipIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      addNotification(exists ? 'Internship removed from saved list' : 'Internship saved for later!', 'info');
      return next;
    });
  };

  const toggleSaveSkill = (id: string) => {
    setSavedSkillIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      addNotification(exists ? 'Skill course removed from bookmarks' : 'Skill course bookmarked!', 'info');
      return next;
    });
  };

  const toggleSaveEvent = (id: string) => {
    setSavedEventIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      addNotification(exists ? 'Event removed from bookmarks' : 'Event bookmarked!', 'info');
      return next;
    });
  };

  // Skill methods
  const updateSkillProgress = (skillId: string, progress: number) => {
    setSkills((prev) =>
      prev.map((s) => {
        if (s.id === skillId) {
          const clamped = Math.min(100, Math.max(0, progress));
          return { ...s, progress: clamped };
        }
        return s;
      })
    );
  };

  const toggleResourceCompleted = (skillId: string, resourceId: string) => {
    setSkills((prev) =>
      prev.map((s) => {
        if (s.id === skillId) {
          const updatedResources = s.resources.map((r) =>
            r.id === resourceId ? { ...r, completed: !r.completed } : r
          );
          const completedCount = updatedResources.filter((r) => r.completed).length;
          const calculatedProgress = Math.round((completedCount / updatedResources.length) * 100);

          // If current profile doesn't have this skill yet and completed >= 50%, suggest adding it
          if (calculatedProgress >= 50 && !studentProfile.technicalSkills.includes(s.name)) {
            setStudentProfile((p) => ({
              ...p,
              technicalSkills: [...p.technicalSkills, s.name],
            }));
            addNotification(`🎉 New skill verified: ${s.name} added to your profile!`, 'success');
          }

          return {
            ...s,
            progress: calculatedProgress,
            resources: updatedResources,
          };
        }
        return s;
      })
    );
  };

  const enrollSkill = (skillId: string) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === skillId ? { ...s, isEnrolled: true } : s))
    );
    const target = skills.find((s) => s.id === skillId);
    if (target) {
      setSelectedSkillForLearning(target);
    }
    addNotification('Enrolled! You can now track your lessons.', 'success');
  };

  // Event registration
  const registerForEvent = (eventId: string) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === eventId ? { ...ev, isRegistered: true, spotsLeft: Math.max(0, ev.spotsLeft - 1) } : ev))
    );
    const ev = events.find((e) => e.id === eventId);
    addNotification(`Registered successfully for ${ev?.title || 'event'}!`, 'success');
  };

  // Internship application
  const applyForInternship = (internshipId: string, resumeName?: string): boolean => {
    const existing = applications.find((a) => a.internshipId === internshipId);
    if (existing) {
      addNotification('You have already submitted an application for this position.', 'warning');
      return false;
    }

    const targetInternship = MOCK_INTERNSHIPS.find((i) => i.id === internshipId);
    if (!targetInternship) return false;

    const newApp: InternshipApplication = {
      id: 'app_' + Date.now(),
      internshipId,
      internshipTitle: targetInternship.title,
      company: targetInternship.company,
      companyLogo: targetInternship.logo,
      appliedDate: 'Just now',
      status: 'Applied',
      resumeUsed: resumeName || studentProfile.resumeFileName,
      workMode: targetInternship.workMode,
      location: targetInternship.location,
      stipend: targetInternship.stipend,
    };

    setApplications((prev) => [newApp, ...prev]);
    addNotification(`Application submitted to ${targetInternship.company}!`, 'success');
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        studentProfile,
        updateProfile,
        isLoggedIn,
        login,
        signup,
        logout,
        internships: MOCK_INTERNSHIPS,
        savedInternshipIds,
        toggleSaveInternship,
        skills,
        savedSkillIds,
        toggleSaveSkill,
        updateSkillProgress,
        toggleResourceCompleted,
        enrollSkill,
        events,
        savedEventIds,
        toggleSaveEvent,
        registerForEvent,
        applications,
        applyForInternship,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        authModalOpen,
        setAuthModalOpen,
        authMode,
        setAuthMode,
        selectedSkillForLearning,
        setSelectedSkillForLearning,
        applyingInternship,
        setApplyingInternship,
        notifications,
        addNotification,
        removeNotification,
        targetRoleForGap,
        setTargetRoleForGap,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
