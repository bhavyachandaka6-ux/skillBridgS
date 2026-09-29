import React, { useState } from 'react';
import { useApp, ActiveTab } from '../context/AppContext';
import {
  Bookmark,
  Menu,
  X,
  User,
  LayoutDashboard,
  Search,
  Sparkles,
  Briefcase,
  BookOpen,
  Calendar,
  FileText,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    savedInternshipIds,
    savedSkillIds,
    savedEventIds,
    studentProfile,
    isLoggedIn,
    setAuthModalOpen,
    setAuthMode,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalSavedCount =
    savedInternshipIds.length + savedSkillIds.length + savedEventIds.length;

  const navLinks: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'internships', label: 'Internships', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: BookOpen },
    { id: 'skill-gap', label: 'Skill Gap', icon: Sparkles },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'resume-builder', label: 'Resume', icon: FileText },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 group text-left cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform">
                <span className="font-bold text-lg tracking-tight">S</span>
              </div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent">
                SkillBridge
              </span>
            </button>
          </div>

          {/* Zone 2: 4-6 clean text navigation links (single line) */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-blue-600 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Quick Search Bar */}
            <div className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Search portal..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab === 'home') {
                    setActiveTab('internships');
                  }
                }}
                className="w-40 lg:w-48 pl-8 pr-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200/70 focus:bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
            </div>

            {/* Saved shortcut */}
            <button
              onClick={() => handleNavClick('saved')}
              className={`relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors ${
                activeTab === 'saved' ? 'bg-slate-100 text-blue-600' : ''
              }`}
              title="Saved Opportunities"
              aria-label="Saved Opportunities"
            >
              <Bookmark className="w-5 h-5" />
              {totalSavedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalSavedCount}
                </span>
              )}
            </button>

            {/* Dashboard Shortcut */}
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-slate-700 hover:bg-slate-100 border border-transparent'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-blue-600" />
              <span>Dashboard</span>
            </button>

            {/* Student Profile / Login */}
            {isLoggedIn ? (
              <button
                onClick={() => handleNavClick('profile')}
                className={`flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-full border transition-all ${
                  activeTab === 'profile'
                    ? 'border-blue-500 bg-blue-50/50'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
                title="View Profile"
              >
                <img
                  src={studentProfile.avatar}
                  alt={studentProfile.name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover border border-slate-200"
                  onError={(e) => {
                    // Fallback to avatar placeholder
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="text-xs font-semibold text-slate-800 hidden sm:inline max-w-[100px] truncate">
                  {studentProfile.name.split(' ')[0]}
                </span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setAuthMode('login');
                  setAuthModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-200 transition-colors whitespace-nowrap"
              >
                <User className="w-3.5 h-3.5" />
                <span>Student Login</span>
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Search internships, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg ${
                activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <div className="w-2" />
            <button
              onClick={() => handleNavClick('profile')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg ${
                activeTab === 'profile' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-800'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Student Profile</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
