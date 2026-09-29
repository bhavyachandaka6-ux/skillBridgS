import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Search,
  Bookmark,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Code,
  Terminal,
  Layers,
  Award,
  Filter
} from 'lucide-react';
import { SkillCourse, SkillLevel } from '../../types';

export const SkillDevelopment: React.FC = () => {
  const {
    skills,
    savedSkillIds,
    toggleSaveSkill,
    setSelectedSkillForLearning,
    studentProfile,
  } = useApp();

  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [skillSearch, setSkillSearch] = useState<string>('');

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredSkills = useMemo(() => {
    return skills.filter((s) => {
      if (selectedLevel !== 'All' && s.level !== selectedLevel) {
        return false;
      }
      if (skillSearch.trim()) {
        const q = skillSearch.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [skills, selectedLevel, skillSearch]);

  const verifiedSkillsCount = skills.filter((s) =>
    studentProfile.technicalSkills.some(
      (ts) => ts.toLowerCase() === s.name.toLowerCase()
    )
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Structured Technical Curriculum</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Skill Development &amp; Learning Hub
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Master fundamental languages, algorithms, modern web frameworks, and cloud architectures required by top tech recruiters.
          </p>
        </div>

        {/* Verified Stats banner */}
        <div className="p-3 bg-blue-50 border border-blue-200/80 rounded-xl flex items-center gap-3 shrink-0">
          <div className="p-2 bg-blue-600 text-white rounded-lg">
            <Award className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <span className="text-slate-600 block">Verified on Your Profile</span>
            <span className="font-bold text-blue-900 font-mono tabular-nums">
              {verifiedSkillsCount} of {skills.length} Core Skills Mastered
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={skillSearch}
            onChange={(e) => setSkillSearch(e.target.value)}
            placeholder="Search skills (e.g. React, C++, AI)..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
          />
        </div>

        {/* Level Segmented Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-full sm:w-auto overflow-x-auto">
          {levels.map((lvl) => {
            const isActive = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lvl} {lvl !== 'All' ? 'Level' : 'Tracks'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => {
          const isSaved = savedSkillIds.includes(skill.id);
          const isVerifiedOnProfile = studentProfile.technicalSkills.some(
            (ts) => ts.toLowerCase() === skill.name.toLowerCase()
          );
          const completedModules = skill.resources.filter((r) => r.completed).length;

          return (
            <div
              key={skill.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Top Row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-50 to-indigo-50 border border-blue-200/60 flex items-center justify-center text-blue-600 font-bold">
                      <Code className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSaveSkill(skill.id)}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isSaved
                        ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                        : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                    }`}
                    title={isSaved ? 'Bookmarked' : 'Bookmark course'}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                {/* Unboxed Metadata Line (Anti-Slop rule) */}
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {skill.level}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {skill.estimatedHours}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{skill.resources.length} Modules</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {skill.description}
                </p>

                {/* Progress Bar Container */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 mb-4 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">Course Progress</span>
                    <span className="font-mono font-bold text-slate-900">
                      {skill.progress}% ({completedModules}/{skill.resources.length})
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        skill.progress === 100
                          ? 'bg-emerald-500'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600'
                      }`}
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                </div>

                {/* Verification badge if on profile */}
                {isVerifiedOnProfile && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium mb-4">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Active skill verified on your student profile</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400">
                  {skill.resources.filter((r) => r.type === 'project').length} Hands-on Capstone
                </span>

                <button
                  onClick={() => setSelectedSkillForLearning(skill)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-xs shadow-blue-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{skill.progress > 0 ? 'Continue Learning' : 'Start Learning'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
