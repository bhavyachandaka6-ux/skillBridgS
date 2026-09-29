import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CAREER_ROLES_REQUIREMENTS } from '../../data/mockData';
import {
  Compass,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  Award,
  BookOpen,
  Sparkles,
  Briefcase,
  AlertTriangle,
  PlayCircle
} from 'lucide-react';
import { CareerRoleRequirement } from '../../types';

export const SkillGapAnalyzer: React.FC = () => {
  const {
    studentProfile,
    skills,
    setSelectedSkillForLearning,
    setActiveTab,
    targetRoleForGap,
    setTargetRoleForGap,
    updateProfile,
    addNotification,
  } = useApp();

  const selectedRole: CareerRoleRequirement =
    CAREER_ROLES_REQUIREMENTS.find((r) => r.roleName === targetRoleForGap) ||
    CAREER_ROLES_REQUIREMENTS[0];

  // Evaluate matches
  // Matches student profile skills with role required skills
  const studentSkillsNormalized = studentProfile.technicalSkills.map((s) => s.toLowerCase());

  const learnedRequiredSkills = selectedRole.requiredSkills.filter((req) => {
    const reqLower = req.toLowerCase();
    // handles composite names like "HTML & CSS"
    if (reqLower === 'html & css') {
      return studentSkillsNormalized.includes('html & css') || (studentSkillsNormalized.some(s => s.includes('html')) && studentSkillsNormalized.some(s => s.includes('css')));
    }
    return studentSkillsNormalized.some(
      (ts) => ts === reqLower || ts.includes(reqLower) || reqLower.includes(ts)
    );
  });

  const missingRequiredSkills = selectedRole.requiredSkills.filter(
    (req) => !learnedRequiredSkills.includes(req)
  );

  const learnedRecommendedSkills = selectedRole.recommendedSkills.filter((rec) =>
    studentSkillsNormalized.some(
      (ts) => ts === rec.toLowerCase() || ts.includes(rec.toLowerCase()) || rec.toLowerCase().includes(ts)
    )
  );

  const missingRecommendedSkills = selectedRole.recommendedSkills.filter(
    (rec) => !learnedRecommendedSkills.includes(rec)
  );

  // Overall readiness calculation
  const totalRequired = selectedRole.requiredSkills.length;
  const readinessPercentage = Math.round(
    (learnedRequiredSkills.length / Math.max(1, totalRequired)) * 100
  );

  // Qualitative readiness message
  const getReadinessLevel = (score: number) => {
    if (score >= 80) {
      return {
        label: 'High Internship Readiness',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        advice: 'Your profile matches current tech industry expectations for this role. You are in prime condition to apply to top internships!',
      };
    }
    if (score >= 50) {
      return {
        label: 'Intermediate Readiness',
        color: 'text-blue-700 bg-blue-50 border-blue-200',
        advice: 'You have solid fundamentals! Mastering 1 or 2 missing core skills will make you competitive for tier-1 tech companies.',
      };
    }
    return {
      label: 'Early Trajectory',
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      advice: 'Target role requires additional core technologies. Follow our structured learning tracks below to close the gap rapidly.',
    };
  };

  const readinessAssessment = getReadinessLevel(readinessPercentage);

  // Action: Launch curriculum for missing skill
  const handleStartLearningMissingSkill = (skillName?: string) => {
    const targetSkillName = skillName || missingRequiredSkills[0];
    if (!targetSkillName) {
      setActiveTab('skills');
      return;
    }

    // Match with available skill in portal
    const foundSkill = skills.find(
      (s) =>
        s.name.toLowerCase().includes(targetSkillName.toLowerCase()) ||
        targetSkillName.toLowerCase().includes(s.name.toLowerCase())
    );

    if (foundSkill) {
      setSelectedSkillForLearning(foundSkill);
    } else {
      setActiveTab('skills');
      addNotification(`Navigating to learning tracks for ${targetSkillName}`, 'info');
    }
  };

  // Quick 1-click verify skill if student already knows it
  const handleQuickAddSkill = (skillName: string) => {
    if (!studentProfile.technicalSkills.includes(skillName)) {
      updateProfile({
        technicalSkills: [...studentProfile.technicalSkills, skillName],
      });
      addNotification(`Added ${skillName} to your profile skills!`, 'success');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          <span>Intelligent Career Diagnostic</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Skill Gap Analyzer
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Compare your verified student profile skills with exact real-world engineering requirements to calculate your hiring readiness score.
        </p>
      </div>

      {/* Target Role Selector Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Select Your Target Career Role
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {CAREER_ROLES_REQUIREMENTS.map((role) => {
            const isSelected = selectedRole.roleName === role.roleName;
            return (
              <button
                key={role.id}
                onClick={() => setTargetRoleForGap(role.roleName)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <div className="font-bold text-xs leading-snug line-clamp-1">{role.roleName}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{role.category.split('&')[0]}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Role Overview & Score Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Role Briefing */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-semibold text-blue-600 uppercase tracking-wider">
                {selectedRole.category}
              </span>
              <span className="font-mono font-medium text-slate-600">
                Industry Demand: <strong className="text-slate-900">{selectedRole.demandLevel}</strong>
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 leading-tight">
              {selectedRole.roleName}
            </h2>

            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {selectedRole.overview}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Average Fresher CTC</span>
                <span className="font-bold text-slate-900 font-mono">{selectedRole.averageSalary}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Core Skill Count</span>
                <span className="font-bold text-slate-900 font-mono">{selectedRole.requiredSkills.length} Core Requirements</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Recommended Tools</span>
                <span className="font-bold text-slate-900 font-mono">{selectedRole.recommendedSkills.length} Auxiliary Skills</span>
              </div>
            </div>
          </div>

          {/* Quick Trigger Button for missing skill */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              {missingRequiredSkills.length === 0
                ? '🎉 Congratulations! You have mastered all core prerequisites.'
                : `You have ${missingRequiredSkills.length} missing core skill${missingRequiredSkills.length > 1 ? 's' : ''} to learn.`}
            </span>

            {missingRequiredSkills.length > 0 && (
              <button
                onClick={() => handleStartLearningMissingSkill()}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs rounded-xl shadow-sm shadow-blue-200 transition-all flex items-center gap-2 cursor-pointer"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Start Learning Missing Skills ({missingRequiredSkills[0]})</span>
              </button>
            )}
          </div>
        </div>

        {/* Readiness Circular / Percentage Score Widget */}
        <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl border border-slate-800 p-6 flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3 mb-4">
              <span>Overall Role Readiness</span>
              <span className="font-mono text-indigo-300">ATS Match Algorithm</span>
            </div>

            <div className="text-center py-4">
              <div className="relative inline-flex items-center justify-center">
                {/* SVG circular progress ring */}
                <svg className="w-36 h-36 transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="10"
                    className="text-slate-800"
                    fill="transparent"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeDasharray={364}
                    strokeDashoffset={364 - (364 * readinessPercentage) / 100}
                    strokeLinecap="round"
                    className={`transition-all duration-1000 ease-out ${
                      readinessPercentage >= 70
                        ? 'text-emerald-400'
                        : readinessPercentage >= 40
                        ? 'text-blue-400'
                        : 'text-amber-400'
                    }`}
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-extrabold font-mono tabular-nums text-white">
                    {readinessPercentage}%
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    Readiness
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${readinessAssessment.color}`}
                >
                  {readinessAssessment.label}
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-300 text-center leading-relaxed mt-2 pt-3 border-t border-slate-800/80">
            {readinessAssessment.advice}
          </p>
        </div>
      </div>

      {/* Detailed Skill Breakdown: 3 Columns (Learned, Missing, Recommended) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: Skills Already Learned */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                Skills Already Learned
              </h3>
            </div>
            <span className="font-mono text-xs font-bold text-emerald-600">
              {learnedRequiredSkills.length} of {totalRequired}
            </span>
          </div>

          <p className="text-xs text-slate-500">
            These skills are verified on your student profile and fulfill mandatory role criteria.
          </p>

          <div className="space-y-2">
            {learnedRequiredSkills.length === 0 ? (
              <div className="text-xs text-slate-400 italic p-3 bg-slate-50 rounded-xl text-center">
                None of the core skills for this role are currently on your profile.
              </div>
            ) : (
              learnedRequiredSkills.map((sk) => (
                <div
                  key={sk}
                  className="p-3 bg-emerald-50/60 border border-emerald-200/80 rounded-xl flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2 font-medium text-emerald-950">
                    <span className="text-emerald-600 font-bold">✅</span>
                    <span>{sk}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-white/80 px-2 py-0.5 rounded border border-emerald-200">
                    Verified
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 2: Missing Skills */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                <XCircle className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                Missing Core Skills
              </h3>
            </div>
            <span className="font-mono text-xs font-bold text-rose-600">
              {missingRequiredSkills.length} Missing
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Key prerequisites not yet added to your profile. Click &quot;Learn&quot; to begin lessons.
          </p>

          <div className="space-y-2">
            {missingRequiredSkills.length === 0 ? (
              <div className="text-xs text-emerald-700 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center font-medium">
                🎉 No missing core skills! You meet all baseline technical requirements for this role.
              </div>
            ) : (
              missingRequiredSkills.map((sk) => (
                <div
                  key={sk}
                  className="p-3 bg-rose-50/40 border border-rose-200/80 rounded-xl flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2 font-medium text-slate-800">
                    <span className="text-rose-500 font-bold">❌</span>
                    <span>{sk}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleQuickAddSkill(sk)}
                      className="text-[11px] text-slate-500 hover:text-slate-800 underline decoration-slate-300"
                      title="Already know this? Add to profile"
                    >
                      I Know This
                    </button>
                    <button
                      onClick={() => handleStartLearningMissingSkill(sk)}
                      className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] rounded-md transition-colors"
                    >
                      Learn
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 3: Recommended Auxiliary Skills */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                <Lightbulb className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                Recommended Skills to Stand Out
              </h3>
            </div>
            <span className="font-mono text-xs font-bold text-amber-600">
              {missingRecommendedSkills.length} Recommended
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Secondary tools and libraries that recruiters love seeing on applicant resumes.
          </p>

          <div className="space-y-2">
            {selectedRole.recommendedSkills.map((rec) => {
              const hasIt = learnedRecommendedSkills.includes(rec);
              return (
                <div
                  key={rec}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                    hasIt
                      ? 'bg-emerald-50/30 border-emerald-200 text-slate-900'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 font-medium">
                    <span>{hasIt ? '⭐' : '💡'}</span>
                    <span>{rec}</span>
                  </div>
                  {hasIt ? (
                    <span className="text-[11px] font-semibold text-emerald-700">Learned</span>
                  ) : (
                    <button
                      onClick={() => handleQuickAddSkill(rec)}
                      className="px-2 py-0.5 text-[11px] font-semibold text-blue-600 hover:bg-blue-50 rounded"
                    >
                      + Add
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
