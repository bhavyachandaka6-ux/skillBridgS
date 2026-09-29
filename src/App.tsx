import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastNotifications } from './components/ToastNotifications';
import { AuthModal } from './components/AuthModal';
import { ApplyModal } from './components/ApplyModal';
import { SkillLearningModal } from './components/SkillLearningModal';

// Views
import { HomePage } from './components/views/HomePage';
import { InternshipPortal } from './components/views/InternshipPortal';
import { SkillDevelopment } from './components/views/SkillDevelopment';
import { SkillGapAnalyzer } from './components/views/SkillGapAnalyzer';
import { HackathonsAndEvents } from './components/views/HackathonsAndEvents';
import { ResumeBuilder } from './components/views/ResumeBuilder';
import { SavedOpportunities } from './components/views/SavedOpportunities';
import { StudentDashboard } from './components/views/StudentDashboard';
import { StudentProfileView } from './components/views/StudentProfileView';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="flex-1">
      {activeTab === 'home' && <HomePage />}
      {activeTab === 'internships' && <InternshipPortal />}
      {activeTab === 'skills' && <SkillDevelopment />}
      {activeTab === 'skill-gap' && <SkillGapAnalyzer />}
      {activeTab === 'events' && <HackathonsAndEvents />}
      {activeTab === 'resume-builder' && <ResumeBuilder />}
      {activeTab === 'saved' && <SavedOpportunities />}
      {activeTab === 'dashboard' && <StudentDashboard />}
      {activeTab === 'profile' && <StudentProfileView />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <MainContent />
        <Footer />

        {/* Global Modals & Notifications */}
        <AuthModal />
        <ApplyModal />
        <SkillLearningModal />
        <ToastNotifications />
      </div>
    </AppProvider>
  );
}
