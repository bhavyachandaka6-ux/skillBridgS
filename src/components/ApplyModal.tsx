import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle2, FileText, Send, Building2, MapPin, Clock, Banknote, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ApplyModal: React.FC = () => {
  const { applyingInternship, setApplyingInternship, studentProfile, applyForInternship } = useApp();
  const [selectedResume, setSelectedResume] = useState(studentProfile.resumeFileName);
  const [coverNote, setCoverNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!applyingInternship) return null;

  const matchedSkills = applyingInternship.requiredSkills.filter((req) =>
    studentProfile.technicalSkills.some(
      (ts) => ts.toLowerCase().includes(req.toLowerCase()) || req.toLowerCase().includes(ts.toLowerCase())
    )
  );

  const missingSkills = applyingInternship.requiredSkills.filter(
    (req) => !matchedSkills.includes(req)
  );

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const success = applyForInternship(applyingInternship.id, selectedResume);
      setIsSubmitting(false);
      if (success) {
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
      }
      setApplyingInternship(null);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={() => setApplyingInternship(null)}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 bg-slate-800 rounded-xl border border-slate-700">{applyingInternship.logo}</span>
            <div>
              <span className="text-xs font-semibold text-blue-400 tracking-wider uppercase">
                Direct Application
              </span>
              <h3 className="text-lg font-bold text-white leading-tight">
                {applyingInternship.title}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>{applyingInternship.company}</span>
                <span>·</span>
                <MapPin className="w-3.5 h-3.5" />
                <span>{applyingInternship.location} ({applyingInternship.workMode})</span>
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <form onSubmit={handleApplySubmit} className="p-6 overflow-y-auto space-y-5 flex-1 text-sm text-slate-700">
          {/* Compensation & Duration Quick Facts */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
            <div className="flex items-center gap-2">
              <Banknote className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-slate-500 block">Stipend</span>
                <span className="font-semibold text-slate-900">{applyingInternship.stipend}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <span className="text-slate-500 block">Duration</span>
                <span className="font-semibold text-slate-900">{applyingInternship.duration}</span>
              </div>
            </div>
          </div>

          {/* Skill Match Breakdown */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Skill Requirement Analysis</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {matchedSkills.map((sk) => (
                <span
                  key={sk}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md font-medium"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {sk} (Matched)
                </span>
              ))}
              {missingSkills.map((sk) => (
                <span
                  key={sk}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-md font-medium"
                >
                  <span className="text-amber-600 font-bold">!</span>
                  {sk} (In Training)
                </span>
              ))}
            </div>
          </div>

          {/* Candidate Profile Verification */}
          <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl space-y-1.5 text-xs">
            <div className="font-semibold text-blue-950 flex items-center justify-between">
              <span>Applying as {studentProfile.name}</span>
              <span className="text-blue-700 font-mono">{studentProfile.cgpa} CGPA</span>
            </div>
            <div className="text-slate-600">
              {studentProfile.college} · {studentProfile.branch} ({studentProfile.year})
            </div>
            <div className="text-slate-500">
              {studentProfile.email}
            </div>
          </div>

          {/* Resume Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Select Resume to Submit
            </label>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3 border border-blue-500 bg-blue-50/30 rounded-xl cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-900 block">
                      {studentProfile.resumeFileName}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Generated via SkillBridge ATS Builder · Updated
                    </span>
                  </div>
                </div>
                <input
                  type="radio"
                  name="resume"
                  checked={selectedResume === studentProfile.resumeFileName}
                  onChange={() => setSelectedResume(studentProfile.resumeFileName)}
                  className="text-blue-600 focus:ring-blue-500"
                />
              </label>
            </div>
          </div>

          {/* Quick statement / Cover pitch */}
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              Why are you excited for this role? (Optional)
            </label>
            <textarea
              rows={3}
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              placeholder="Highlight a relevant project or your passion for building technology at this company..."
              className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
            />
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setApplyingInternship(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-sm shadow-blue-200 transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Submitting Application...' : 'Confirm & Apply'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
