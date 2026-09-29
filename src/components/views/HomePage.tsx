import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  ArrowRight,
  Sparkles,
  Users,
  Briefcase,
  BookOpen,
  Building,
  Bookmark,
  Calendar,
  ChevronRight,
  TrendingUp,
  MapPin,
  Clock,
  Compass
} from 'lucide-react';
import { Internship, SkillCourse, HackathonEvent } from '../../types';

export const HomePage: React.FC = () => {
  const {
    setActiveTab,
    searchQuery,
    setSearchQuery,
    internships,
    skills,
    events,
    savedInternshipIds,
    toggleSaveInternship,
    setApplyingInternship,
    setSelectedSkillForLearning,
  } = useApp();

  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setActiveTab('internships');
  };

  const featuredInternships = internships.slice(0, 3);
  const popularSkills = skills.slice(0, 4);
  const upcomingEvents = events.slice(0, 2);

  return (
    <div className="space-y-16 pb-12">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Call to Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-300 tracking-wide">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span>Next-Gen Student Career Portal</span>
                <span className="text-slate-500">·</span>
                <span>Summer 2026 Batch Open</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance leading-tight">
                Build Your Skills.{' '}
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
                  Find Your Opportunity.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Learn new skills, discover internships, join tech events, and build your career.
              </p>

              {/* Integrated Search Bar */}
              <form
                onSubmit={handleHeroSearch}
                className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-2 max-w-xl"
              >
                <div className="relative flex-1 w-full">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    placeholder="Search internships, skills, or opportunities"
                    className="w-full pl-11 pr-4 py-2.5 bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-blue-600/30 whitespace-nowrap"
                >
                  Search
                </button>
              </form>

              {/* Primary Dual CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setActiveTab('internships')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-900/40 transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <span>Explore Internships</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setActiveTab('skills')}
                  className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Improve Your Skills</span>
                  <BookOpen className="w-4 h-4 text-blue-300" />
                </button>

                <button
                  onClick={() => setActiveTab('skill-gap')}
                  className="px-4 py-3 text-indigo-300 hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5"
                >
                  <Compass className="w-4 h-4" />
                  <span>Analyze Skill Gap</span>
                </button>
              </div>

              {/* Popular quick searches */}
              <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                <span>Trending:</span>
                {['React', 'Python', 'AI/ML', 'Remote Internships', 'Hackathons'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearchQuery(tag);
                      setActiveTab('internships');
                    }}
                    className="hover:text-blue-300 transition-colors underline decoration-slate-600 underline-offset-2"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                <img
                  src="/src/assets/images/hero_student_collaboration_1790658201378.jpg"
                  alt="College students collaborating on software projects in modern university lab"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
                
                {/* Overlay Card: Real Time Placement */}
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-700/60 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg">
                      ✓
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">
                        Razorpay &amp; Swiggy Drives Active
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Average Stipend: ₹45,000 / month · 140+ Offers rolled
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('internships')}
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    <span>View</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Bar (Students, Internships, Courses, Companies) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t border-slate-800">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-500/20 text-blue-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                    48,500+
                  </div>
                  <div className="text-xs text-slate-400 font-medium">Students Enrolled</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                    3,200+
                  </div>
                  <div className="text-xs text-slate-400 font-medium">Verified Internships</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-purple-500/20 text-purple-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                    180+
                  </div>
                  <div className="text-xs text-slate-400 font-medium">Interactive Courses</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                    650+
                  </div>
                  <div className="text-xs text-slate-400 font-medium">Hiring Companies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Internships Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Career Opportunities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Featured Internships
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Hand-picked verified summer and pre-placement opportunities from top tech teams.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('internships')}
            className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors shrink-0"
          >
            <span>View All Internships</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredInternships.map((internship: Internship) => {
            const isSaved = savedInternshipIds.includes(internship.id);
            return (
              <div
                key={internship.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-2xl shadow-xs">
                        {internship.logo}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-base line-clamp-1">
                          {internship.title}
                        </h3>
                        <p className="text-xs font-medium text-slate-600">
                          {internship.company}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleSaveInternship(internship.id)}
                      className={`p-2 rounded-lg transition-colors cursor-pointer ${
                        isSaved
                          ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                          : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                      }`}
                      title={isSaved ? 'Remove from saved' : 'Save internship'}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Clean unboxed metadata with separators (Anti-Slop rule) */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {internship.location}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{internship.workMode}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {internship.duration}
                    </span>
                  </div>

                  {/* Stipend highlight */}
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 mb-4 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Monthly Stipend</span>
                    <span className="font-semibold text-slate-900 font-mono">
                      {internship.stipend}
                    </span>
                  </div>

                  {/* Required skills */}
                  <div className="mb-4">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Required Skills
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {internship.requiredSkills.map((sk) => (
                        <span
                          key={sk}
                          className="text-xs px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-md font-medium"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Deadline: {internship.deadline}
                  </span>

                  <button
                    onClick={() => setApplyingInternship(internship)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-xs shadow-blue-200 transition-colors cursor-pointer"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Skill Gap Analyzer Feature Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white p-8 sm:p-12 shadow-xl border border-indigo-800/50 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-300">
                <Compass className="w-4 h-4 text-indigo-400" />
                <span>Proprietary Feature</span>
                <span className="text-slate-500">·</span>
                <span>Role Readiness Engine</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Benchmark Your Skills with the Skill Gap Analyzer
              </h3>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Select your target career role (Web Developer, AI Engineer, Cyber Analyst). Our engine evaluates your current coursework against real recruiter requirements, computes readiness percentage, and maps the exact skills to learn next.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setActiveTab('skill-gap')}
                  className="px-6 py-3 bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Launch Skill Gap Analyzer</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                </button>
                <div className="text-xs text-indigo-200 flex items-center gap-2">
                  <span>✓ 6 Curated Engineering Tracks</span>
                  <span>·</span>
                  <span>Instant Curriculum Match</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                <span className="text-slate-300">Target Role Preview</span>
                <span className="font-bold text-white font-mono">Web Developer</span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-200">
                  <span>HTML &amp; CSS</span>
                  <span className="text-emerald-400 font-bold">✓ Ready</span>
                </div>
                <div className="flex items-center justify-between text-slate-200">
                  <span>JavaScript &amp; React</span>
                  <span className="text-emerald-400 font-bold">✓ Ready</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Git Version Control</span>
                  <span className="text-amber-300">! Next Step</span>
                </div>
              </div>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-300">Overall Readiness:</span>
                <span className="font-bold text-emerald-400 font-mono text-sm">78%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Popular Skills Development Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Skill Curriculum</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Popular Engineering Skills
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Structured modules from beginner fundamentals to advanced production capstones.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('skills')}
            className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors shrink-0"
          >
            <span>Explore All 11 Skills</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularSkills.map((skill: SkillCourse) => (
            <div
              key={skill.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                    {skill.level}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {skill.estimatedHours}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-1">
                  {skill.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                  {skill.description}
                </p>

                {/* Progress bar */}
                <div className="space-y-1 mb-4">
                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
                    <span>Curriculum Progress</span>
                    <span className="font-mono font-bold text-slate-800">{skill.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedSkillForLearning(skill)}
                className="w-full py-2 px-3 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{skill.progress > 0 ? 'Continue Learning' : 'Start Learning'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Upcoming Hackathons & Workshops */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
              <Calendar className="w-4 h-4" />
              <span>Campus Events &amp; Competitions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Upcoming Hackathons &amp; Workshops
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Compete for cash rewards, earn verifiable credentials, and build with peers.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('events')}
            className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors shrink-0"
          >
            <span>View All Events</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.map((evt: HackathonEvent) => (
            <div
              key={evt.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                    {evt.type}
                  </span>
                  <span className="font-mono text-slate-400">
                    Deadline: {evt.deadline}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1 leading-snug">
                  {evt.title}
                </h3>
                <p className="text-xs text-slate-600 font-medium mb-3">
                  Organized by {evt.organizer}
                </p>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                  {evt.description}
                </p>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs mb-4">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Event Date</span>
                    <span className="font-semibold text-slate-800">{evt.date}</span>
                  </div>
                  {evt.prizePool && (
                    <div className="text-right">
                      <span className="text-slate-400 block text-[11px]">Prize Pool / Perks</span>
                      <span className="font-bold text-emerald-600 font-mono">{evt.prizePool}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <span className="text-xs text-slate-500">
                  Format: <strong className="text-slate-700">{evt.mode}</strong>
                </span>

                <button
                  onClick={() => setActiveTab('events')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-xs shadow-blue-200 transition-colors"
                >
                  {evt.isRegistered ? 'View Registration' : 'Register Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
