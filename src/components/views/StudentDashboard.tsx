import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  CheckCircle2,
  Clock,
  Briefcase,
  BookOpen,
  Calendar,
  Compass,
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles,
  Bookmark,
  FileText,
  User,
  ExternalLink
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    studentProfile,
    skills,
    applications,
    savedInternshipIds,
    internships,
    events,
    setActiveTab,
    setSelectedSkillForLearning,
    targetRoleForGap,
  } = useApp();

  // Profile completion calculation
  const profileFields = [
    Boolean(studentProfile.name),
    Boolean(studentProfile.email),
    Boolean(studentProfile.college),
    Boolean(studentProfile.branch),
    Boolean(studentProfile.cgpa),
    Boolean(studentProfile.bio),
    studentProfile.technicalSkills.length >= 3,
    studentProfile.projects.length >= 1,
    studentProfile.certifications.length >= 1,
    Boolean(studentProfile.github),
    Boolean(studentProfile.linkedin),
    Boolean(studentProfile.resumeFileName),
  ];
  const profileCompletionPercentage = Math.round(
    (profileFields.filter(Boolean).length / profileFields.length) * 100
  );

  // Skills in progress
  const skillsInProgress = skills.filter((s) => s.progress > 0 && s.progress < 100);
  const masteredSkills = skills.filter((s) => s.progress === 100 || studentProfile.technicalSkills.includes(s.name));

  // Registered events
  const registeredEvents = events.filter((e) => e.isRegistered);

  // Status badge style helper
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Interview Scheduled':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Under Review':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Offer Extended':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Applied':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Student Welcome Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-blue-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={studentProfile.avatar}
            alt={studentProfile.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/30 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                Student Career Console
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-xs text-emerald-400 font-medium">Summer 2026 Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mt-0.5">
              Welcome back, {studentProfile.name}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {studentProfile.college} · {studentProfile.branch} ({studentProfile.year})
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab('resume-builder')}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-semibold rounded-xl transition-colors flex items-center gap-2"
          >
            <FileText className="w-3.5 h-3.5 text-blue-300" />
            <span>Update Resume</span>
          </button>
          <button
            onClick={() => setActiveTab('skill-gap')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Target: {targetRoleForGap}</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Profile Completion */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold text-slate-700">Profile Strength</span>
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {profileCompletionPercentage}%
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-700"
                style={{ width: `${profileCompletionPercentage}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => setActiveTab('profile')}
            className="text-[11px] text-blue-600 hover:underline font-semibold mt-3 text-left"
          >
            Complete remaining details →
          </button>
        </div>

        {/* Skills Mastered */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold text-slate-700">Skills Verified</span>
            <Award className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {masteredSkills.length}
            </div>
            <div className="text-xs text-slate-500">
              {skillsInProgress.length} currently in progress
            </div>
          </div>
          <button
            onClick={() => setActiveTab('skills')}
            className="text-[11px] text-blue-600 hover:underline font-semibold mt-3 text-left"
          >
            Explore new skill modules →
          </button>
        </div>

        {/* Active Applications */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold text-slate-700">Internship Submissions</span>
            <Briefcase className="w-4 h-4 text-purple-600" />
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {applications.length}
            </div>
            <div className="text-xs text-emerald-600 font-medium">
              1 Interview Scheduled
            </div>
          </div>
          <button
            onClick={() => setActiveTab('internships')}
            className="text-[11px] text-blue-600 hover:underline font-semibold mt-3 text-left"
          >
            Browse matching openings →
          </button>
        </div>

        {/* Target Role Readiness */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold text-slate-700">Role Readiness Score</span>
            <Compass className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono tabular-nums">
              78%
            </div>
            <div className="text-xs text-slate-500 truncate">
              Target: {targetRoleForGap}
            </div>
          </div>
          <button
            onClick={() => setActiveTab('skill-gap')}
            className="text-[11px] text-blue-600 hover:underline font-semibold mt-3 text-left"
          >
            View gap diagnostics →
          </button>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Internship Applications & Skill Meters (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Internship Applications Pipeline */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <h2 className="font-bold text-slate-900 text-base">
                  Internship Applications Tracker
                </h2>
              </div>
              <span className="text-xs font-mono font-bold text-slate-500">
                {applications.length} Active
              </span>
            </div>

            <div className="space-y-3">
              {applications.length === 0 ? (
                <div className="text-xs text-slate-400 text-center py-6">
                  No submitted applications yet.
                </div>
              ) : (
                applications.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl p-2 bg-white rounded-xl border border-slate-200 shadow-2xs">
                          {app.companyLogo}
                        </span>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{app.internshipTitle}</h4>
                          <p className="text-xs text-slate-600 font-semibold">{app.company} · {app.location}</p>
                        </div>
                      </div>

                      <span
                        className={`text-xs px-2.5 py-1 rounded-md font-semibold border ${getStatusBadge(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/60">
                      <span>Applied: {app.appliedDate}</span>
                      <span>Stipend: <strong className="text-slate-800 font-mono">{app.stipend}</strong></span>
                      <span className="font-mono text-[11px] text-slate-400">Via {app.resumeUsed}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Active Course Progress Meters */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <h2 className="font-bold text-slate-900 text-base">
                  Active Course Progress
                </h2>
              </div>
              <button
                onClick={() => setActiveTab('skills')}
                className="text-xs text-blue-600 hover:underline font-semibold"
              >
                View All Courses
              </button>
            </div>

            <div className="space-y-4">
              {skills.slice(0, 4).map((skill) => (
                <div key={skill.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{skill.name}</span>
                    <span className="font-mono font-bold text-slate-600">{skill.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming Registered Events & Saved Bookmarks (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Registered Campus Events */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                <h2 className="font-bold text-slate-900 text-base">
                  Upcoming Registered Events
                </h2>
              </div>
              <button
                onClick={() => setActiveTab('events')}
                className="text-xs text-blue-600 hover:underline font-semibold"
              >
                Browse Events
              </button>
            </div>

            <div className="space-y-3">
              {registeredEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {evt.type}
                    </span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Confirmed</span>
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs">{evt.title}</h4>
                  <p className="text-[11px] text-slate-500">{evt.date} · {evt.location}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Skill Diagnostic Preview Card */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-indigo-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
                Skill Readiness Score
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">78% Match</span>
            </div>

            <h3 className="text-base font-bold leading-tight">
              Ready for {targetRoleForGap} Roles
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Your HTML &amp; CSS, JavaScript, React, and Data Structures skills meet entry criteria. Close the gap by completing the Git and Cloud modules.
            </p>

            <button
              onClick={() => setActiveTab('skill-gap')}
              className="w-full py-2 px-3 bg-white text-slate-900 hover:bg-slate-100 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Open Skill Gap Breakdown</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
