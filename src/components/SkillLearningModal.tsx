import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  PlayCircle,
  FileText,
  Terminal,
  Code,
  CheckCircle,
  ExternalLink,
  Award,
  Sparkles,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SkillLearningModal: React.FC = () => {
  const {
    selectedSkillForLearning,
    setSelectedSkillForLearning,
    toggleResourceCompleted,
    updateProfile,
    studentProfile,
    addNotification,
  } = useApp();

  if (!selectedSkillForLearning) return null;

  const skill = selectedSkillForLearning;
  const isSkillInProfile = studentProfile.technicalSkills.includes(skill.name);

  const completedCount = skill.resources.filter((r) => r.completed).length;
  const totalCount = skill.resources.length;

  const handleToggle = (resourceId: string) => {
    toggleResourceCompleted(skill.id, resourceId);
  };

  const handleAddDirectlyToProfile = () => {
    if (!isSkillInProfile) {
      updateProfile({
        technicalSkills: [...studentProfile.technicalSkills, skill.name],
      });
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {
        // ignore
      }
    } else {
      addNotification(`${skill.name} is already active on your profile.`, 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 relative">
          <button
            onClick={() => setSelectedSkillForLearning(null)}
            className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <Code className="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-blue-200 uppercase tracking-wider">
                  {skill.category}
                </span>
                <span className="text-[11px] text-blue-300">·</span>
                <span className="text-[11px] text-indigo-200 font-medium">
                  {skill.level} Level
                </span>
                <span className="text-[11px] text-blue-300">·</span>
                <span className="text-[11px] text-blue-200 font-mono">
                  {skill.estimatedHours}
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-white mt-0.5">
                {skill.name} Learning Track
              </h2>
            </div>
          </div>
          <p className="text-xs text-slate-300 mt-2.5 max-w-xl leading-relaxed">
            {skill.description}
          </p>

          {/* Progress Bar Container */}
          <div className="mt-4 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              <span className="text-slate-300">Curriculum Progress</span>
              <span className="text-white font-mono font-bold">{skill.progress}% Complete ({completedCount}/{totalCount} modules)</span>
            </div>
            <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${skill.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Learning Modules List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Syllabus &amp; Practical Milestones</span>
            </h3>
            <span className="text-xs text-slate-500">
              Click checkbox to mark milestone completed
            </span>
          </div>

          <div className="space-y-2.5">
            {skill.resources.map((item, idx) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border transition-all flex items-start gap-3.5 ${
                  item.completed
                    ? 'bg-emerald-50/50 border-emerald-200 text-slate-900'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Checkbox */}
                <button
                  type="button"
                  onClick={() => handleToggle(item.id)}
                  className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                    item.completed
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300 bg-white hover:border-blue-500 text-transparent'
                  }`}
                  title={item.completed ? 'Mark incomplete' : 'Mark complete'}
                >
                  <CheckCircle className="w-4 h-4" />
                </button>

                {/* Type Icon */}
                <div className="p-2 rounded-lg bg-slate-100 text-slate-600 shrink-0">
                  {item.type === 'video' && <PlayCircle className="w-4 h-4 text-blue-600" />}
                  {item.type === 'practice' && <Terminal className="w-4 h-4 text-indigo-600" />}
                  {item.type === 'project' && <Code className="w-4 h-4 text-purple-600" />}
                  {item.type === 'doc' && <FileText className="w-4 h-4 text-slate-600" />}
                </div>

                {/* Content Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={`text-sm font-semibold truncate ${
                        item.completed ? 'text-slate-800 line-through opacity-85' : 'text-slate-900'
                      }`}
                    >
                      {idx + 1}. {item.title}
                    </h4>
                    <span className="text-[11px] font-mono text-slate-500 shrink-0">
                      {item.durationOrPages}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                    <span className="capitalize">{item.type} Module</span>
                    <span>·</span>
                    <a
                      href={item.url}
                      onClick={(e) => {
                        e.preventDefault();
                        addNotification(`Opening lesson materials for ${item.title}`, 'info');
                      }}
                      className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
                    >
                      <span>Access Interactive Resource</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Skill Profile Status */}
          <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  Skill Verification on Profile
                </h4>
                <p className="text-xs text-slate-500">
                  {isSkillInProfile
                    ? `✓ Verified! ${skill.name} is listed in your profile technical skills.`
                    : `Complete lessons or verify this skill to boost your Skill Gap Analyzer score.`}
                </p>
              </div>
            </div>

            {!isSkillInProfile && (
              <button
                type="button"
                onClick={handleAddDirectlyToProfile}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Add to My Profile</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Progress is automatically saved to your student dashboard.
          </span>
          <button
            onClick={() => setSelectedSkillForLearning(null)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors"
          >
            Done Learning
          </button>
        </div>
      </div>
    </div>
  );
};
