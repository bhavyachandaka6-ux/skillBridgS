import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Plus, Trash2, Save, User, Briefcase, GraduationCap, Github, Linkedin, Award, Code } from 'lucide-react';
import { Project, Certification } from '../types';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const { studentProfile, updateProfile } = useApp();

  const [name, setName] = useState(studentProfile.name);
  const [email, setEmail] = useState(studentProfile.email);
  const [college, setCollege] = useState(studentProfile.college);
  const [branch, setBranch] = useState(studentProfile.branch);
  const [year, setYear] = useState(studentProfile.year);
  const [cgpa, setCgpa] = useState(studentProfile.cgpa);
  const [location, setLocation] = useState(studentProfile.location);
  const [bio, setBio] = useState(studentProfile.bio);
  const [github, setGithub] = useState(studentProfile.github);
  const [linkedin, setLinkedin] = useState(studentProfile.linkedin);
  const [resumeFileName, setResumeFileName] = useState(studentProfile.resumeFileName);

  const [technicalSkills, setTechnicalSkills] = useState<string[]>([...studentProfile.technicalSkills]);
  const [newTechSkill, setNewTechSkill] = useState('');

  const [softSkills, setSoftSkills] = useState<string[]>([...studentProfile.softSkills]);
  const [newSoftSkill, setNewSoftSkill] = useState('');

  const [projects, setProjects] = useState<Project[]>([...studentProfile.projects]);
  const [certifications, setCertifications] = useState<Certification[]>([...studentProfile.certifications]);

  if (!isOpen) return null;

  const handleAddTechSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTechSkill.trim() && !technicalSkills.includes(newTechSkill.trim())) {
      setTechnicalSkills([...technicalSkills, newTechSkill.trim()]);
      setNewTechSkill('');
    }
  };

  const handleRemoveTechSkill = (skill: string) => {
    setTechnicalSkills(technicalSkills.filter((s) => s !== skill));
  };

  const handleAddSoftSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSoftSkill.trim() && !softSkills.includes(newSoftSkill.trim())) {
      setSoftSkills([...softSkills, newSoftSkill.trim()]);
      setNewSoftSkill('');
    }
  };

  const handleRemoveSoftSkill = (skill: string) => {
    setSoftSkills(softSkills.filter((s) => s !== skill));
  };

  const handleAddProject = () => {
    const newProj: Project = {
      id: 'proj_' + Date.now(),
      title: 'New Student Project',
      description: 'Describe what you engineered, technologies used, and outcomes achieved.',
      techStack: ['React', 'JavaScript'],
      githubUrl: 'https://github.com',
    };
    setProjects([newProj, ...projects]);
  };

  const handleUpdateProject = (id: string, field: keyof Project, value: any) => {
    setProjects(
      projects.map((p) => {
        if (p.id === id) {
          return { ...p, [field]: value };
        }
        return p;
      })
    );
  };

  const handleRemoveProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleAddCert = () => {
    const newCert: Certification = {
      id: 'cert_' + Date.now(),
      title: 'New Certification Title',
      issuer: 'Platform / University',
      date: '2026',
    };
    setCertifications([newCert, ...certifications]);
  };

  const handleUpdateCert = (id: string, field: keyof Certification, value: string) => {
    setCertifications(
      certifications.map((c) => {
        if (c.id === id) {
          return { ...c, [field]: value };
        }
        return c;
      })
    );
  };

  const handleRemoveCert = (id: string) => {
    setCertifications(certifications.filter((c) => c.id !== id));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      college,
      branch,
      year,
      cgpa,
      location,
      bio,
      github,
      linkedin,
      resumeFileName,
      technicalSkills,
      softSkills,
      projects,
      certifications,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 rounded-xl">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Edit Student Profile</h2>
              <p className="text-xs text-slate-400">
                Update your academic credentials, technical skills, and career portfolio.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-700">
          {/* Section 1: Academic & Personal Info */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Academic &amp; Basic Information</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  College / University
                </label>
                <input
                  type="text"
                  required
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Branch / Specialization
                </label>
                <input
                  type="text"
                  required
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Academic Year
                </label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  CGPA / Grade
                </label>
                <input
                  type="text"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Location / City
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Professional Bio
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Technical Skills */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Code className="w-4 h-4 text-indigo-600" />
              <span>Technical Skills (Used in Skill Gap Analyzer)</span>
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {technicalSkills.map((sk) => (
                <span
                  key={sk}
                  className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-md font-medium text-slate-800"
                >
                  <span>{sk}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTechSkill(sk)}
                    className="text-slate-400 hover:text-rose-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add skill (e.g. Docker, TypeScript, Go)..."
                value={newTechSkill}
                onChange={(e) => setNewTechSkill(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleAddTechSkill}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800"
              >
                Add Skill
              </button>
            </div>
          </div>

          {/* Section 3: Soft Skills */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Soft Skills
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {softSkills.map((sk) => (
                <span
                  key={sk}
                  className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-md font-medium text-slate-800"
                >
                  <span>{sk}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSoftSkill(sk)}
                    className="text-slate-400 hover:text-rose-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add soft skill (e.g. Critical Thinking, Public Speaking)..."
                value={newSoftSkill}
                onChange={(e) => setNewSoftSkill(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleAddSoftSkill}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800"
              >
                Add
              </button>
            </div>
          </div>

          {/* Section 4: Projects */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span>Featured Student Projects</span>
              </h3>
              <button
                type="button"
                onClick={handleAddProject}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(proj.id)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="pr-8">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Title</label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => handleUpdateProject(proj.id, 'title', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-200 bg-white rounded-lg font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Description</label>
                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => handleUpdateProject(proj.id, 'description', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-200 bg-white rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Tech Stack (comma separated)</label>
                      <input
                        type="text"
                        value={proj.techStack.join(', ')}
                        onChange={(e) =>
                          handleUpdateProject(
                            proj.id,
                            'techStack',
                            e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                          )
                        }
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 bg-white rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">GitHub Repository URL</label>
                      <input
                        type="text"
                        value={proj.githubUrl || ''}
                        onChange={(e) => handleUpdateProject(proj.id, 'githubUrl', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 bg-white rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Certifications */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Certifications &amp; Accreditations</span>
              </h3>
              <button
                type="button"
                onClick={handleAddCert}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Certification</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-2 relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveCert(cert.id)}
                    className="absolute top-2 right-2 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="sm:col-span-2 pr-6">
                    <input
                      type="text"
                      placeholder="Certificate title..."
                      value={cert.title}
                      onChange={(e) => handleUpdateCert(cert.id, 'title', e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-slate-200 bg-white rounded-lg font-medium"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Issuer (e.g. AWS, Meta)..."
                      value={cert.issuer}
                      onChange={(e) => handleUpdateCert(cert.id, 'issuer', e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-slate-200 bg-white rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Links & Resume */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Online Profiles &amp; Resume
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Profile Link</span>
                </label>
                <input
                  type="url"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                  <span>LinkedIn Profile Link</span>
                </label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Default Resume File Name
                </label>
                <input
                  type="text"
                  value={resumeFileName}
                  onChange={(e) => setResumeFileName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-sm shadow-blue-200 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Updates</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
