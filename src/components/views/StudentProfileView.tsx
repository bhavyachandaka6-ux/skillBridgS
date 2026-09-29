import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  GraduationCap,
  MapPin,
  Mail,
  Github,
  Linkedin,
  FileText,
  Edit3,
  Award,
  Briefcase,
  Code,
  CheckCircle2,
  ExternalLink,
  Plus,
  Compass,
  Download
} from 'lucide-react';
import { EditProfileModal } from '../EditProfileModal';

export const StudentProfileView: React.FC = () => {
  const { studentProfile, setActiveTab, updateProfile } = useApp();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [showAddSkill, setShowAddSkill] = useState(false);

  const handleAddSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillInput.trim() && !studentProfile.technicalSkills.includes(newSkillInput.trim())) {
      updateProfile({
        technicalSkills: [...studentProfile.technicalSkills, newSkillInput.trim()],
      });
      setNewSkillInput('');
      setShowAddSkill(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Profile Header Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Banner backdrop */}
        <div className="h-36 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 relative">
          <div className="absolute right-6 top-4 flex items-center gap-2">
            <button
              onClick={() => setEditModalOpen(true)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Profile Card Main Info */}
        <div className="px-6 sm:px-8 pb-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between -mt-16 mb-6 gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              <img
                src={studentProfile.avatar}
                alt={studentProfile.name}
                referrerPolicy="no-referrer"
                className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-xl bg-white"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-slate-900">
                    {studentProfile.name}
                  </h1>
                  <span className="text-xs px-2.5 py-0.5 bg-blue-50 text-blue-700 font-semibold rounded-full border border-blue-200">
                    Student Member
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>{studentProfile.college}</span>
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span>{studentProfile.branch}</span>
                  <span>·</span>
                  <span>{studentProfile.year}</span>
                  <span>·</span>
                  <span className="font-semibold text-slate-800 font-mono">CGPA: {studentProfile.cgpa}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {studentProfile.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('resume-builder')}
                className="flex-1 sm:flex-initial px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume Studio</span>
              </button>
              <button
                onClick={() => setActiveTab('skill-gap')}
                className="flex-1 sm:flex-initial px-4 py-2 bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-indigo-600" />
                <span>Skill Readiness</span>
              </button>
            </div>
          </div>

          {/* Bio statement */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl pt-2 border-t border-slate-100">
            {studentProfile.bio}
          </p>

          {/* Social Links & Resume */}
          <div className="flex flex-wrap items-center gap-4 text-xs pt-4 text-slate-600">
            <a
              href={`mailto:${studentProfile.email}`}
              className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
            >
              <Mail className="w-4 h-4 text-slate-400" />
              <span>{studentProfile.email}</span>
            </a>
            <span>·</span>
            <a
              href={studentProfile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-slate-900 transition-colors font-medium"
            >
              <Github className="w-4 h-4 text-slate-700" />
              <span>GitHub Profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>·</span>
            <a
              href={studentProfile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-blue-600 transition-colors font-medium text-blue-700"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn Profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>·</span>
            <button
              onClick={() => setActiveTab('resume-builder')}
              className="flex items-center gap-1.5 text-indigo-600 font-semibold hover:underline"
            >
              <FileText className="w-4 h-4" />
              <span>{studentProfile.resumeFileName}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Skills, Projects, Certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Technical & Soft Skills (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Technical Skills Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Technical Skills ({studentProfile.technicalSkills.length})
                </h3>
              </div>
              <button
                onClick={() => setShowAddSkill(!showAddSkill)}
                className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-0.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            {showAddSkill && (
              <form onSubmit={handleAddSkillSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Next.js, Docker..."
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  className="flex-1 p-1.5 text-xs border border-slate-200 rounded-lg text-slate-800"
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-lg"
                >
                  Save
                </button>
              </form>
            )}

            <div className="flex flex-wrap gap-2">
              {studentProfile.technicalSkills.map((sk) => (
                <span
                  key={sk}
                  className="text-xs px-2.5 py-1 bg-slate-100 text-slate-800 font-medium rounded-lg border border-slate-200/60"
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>

          {/* Soft Skills Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-purple-600" />
              <h3 className="font-bold text-slate-900 text-sm">
                Soft Skills &amp; Strengths
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {studentProfile.softSkills.map((sk) => (
                <span
                  key={sk}
                  className="text-xs px-2.5 py-1 bg-purple-50 text-purple-800 font-medium rounded-lg border border-purple-100"
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>

          {/* Target Role & Progression */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-100 rounded-2xl p-5 space-y-2">
            <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
              Target Career Role
            </span>
            <div className="text-base font-extrabold text-blue-950">
              {studentProfile.targetRole}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your profile is automatically compared against real recruiting criteria for this role.
            </p>
            <button
              onClick={() => setActiveTab('skill-gap')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 pt-1"
            >
              <span>Analyze Skill Gaps</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Right Column: Projects, Certifications, Experience (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Projects Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  Featured Student Projects ({studentProfile.projects.length})
                </h3>
              </div>
              <button
                onClick={() => setEditModalOpen(true)}
                className="text-xs text-blue-600 hover:underline font-semibold"
              >
                + Manage Projects
              </button>
            </div>

            <div className="space-y-4">
              {studentProfile.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-bold text-slate-900 text-sm">{proj.title}</h4>
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 bg-white rounded border border-slate-200 text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  Verified Certifications ({studentProfile.certifications.length})
                </h3>
              </div>
              <button
                onClick={() => setEditModalOpen(true)}
                className="text-xs text-blue-600 hover:underline font-semibold"
              >
                + Add Certificate
              </button>
            </div>

            <div className="space-y-3">
              {studentProfile.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs"
                >
                  <div>
                    <h4 className="font-bold text-slate-900">{cert.title}</h4>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      Issued by {cert.issuer} · {cert.date}
                    </p>
                  </div>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold text-[11px] border border-emerald-200">
                    Verified
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} />
    </div>
  );
};
