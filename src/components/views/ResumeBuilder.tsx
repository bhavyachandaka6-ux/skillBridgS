import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Download,
  RotateCcw,
  Sparkles,
  Plus,
  Trash2,
  CheckCircle,
  Eye,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ResumeBuilder: React.FC = () => {
  const { studentProfile, addNotification } = useApp();

  // Resume form state
  const [personalInfo, setPersonalInfo] = useState({
    name: studentProfile.name,
    email: studentProfile.email,
    phone: '+91 98765 43210',
    location: studentProfile.location,
    github: studentProfile.github,
    linkedin: studentProfile.linkedin,
    portfolio: 'https://aaravsharma.dev',
    summary:
      'Proactive Computer Science undergraduate with hands-on experience in full-stack web engineering, scalable microservices, and algorithmic design. Proven ability to architect responsive interfaces and ship reliable student platforms.',
  });

  const [educationList, setEducationList] = useState([
    {
      id: '1',
      degree: 'B.Tech in Computer Science & Engineering',
      institution: studentProfile.college,
      year: '2023 - 2027',
      grade: 'CGPA: ' + studentProfile.cgpa,
      courses: 'Data Structures, Operating Systems, Computer Networks, Database Systems, Web Tech',
    },
  ]);

  const [technicalSkillsList, setTechnicalSkillsList] = useState(
    studentProfile.technicalSkills.join(', ')
  );

  const [softSkillsList, setSoftSkillsList] = useState(
    studentProfile.softSkills.join(', ')
  );

  const [projectsList, setProjectsList] = useState(
    studentProfile.projects.map((p) => ({
      id: p.id,
      title: p.title,
      tech: p.techStack.join(', '),
      description: p.description,
      link: p.githubUrl || '',
    }))
  );

  const [internshipsList, setInternshipsList] = useState([
    {
      id: '1',
      role: 'Frontend Engineering Intern',
      company: 'InnovateTech Labs',
      duration: 'May 2025 - Jul 2025',
      location: 'Bangalore (Remote)',
      bullets:
        'Engineered responsive merchant onboarding components in React and Tailwind CSS.\nOptimized bundle size by 28% through dynamic route-based code splitting.\nCollaborated directly with product managers and backend engineers in bi-weekly sprints.',
    },
  ]);

  const [certificationsList, setCertificationsList] = useState(
    studentProfile.certifications.map((c) => ({
      id: c.id,
      title: c.title,
      issuer: c.issuer,
      year: c.date,
    }))
  );

  const [achievementsList, setAchievementsList] = useState([
    'Finalist (Top 10 of 450+ teams) at Smart India University Hackathon 2025.',
    'Ranked 142nd out of 8,000+ coders in CodeChef Inter-College Algorithmic Challenge.',
    'Published technical breakdown on Web Performance Vitals read by 4,500+ student developers.',
  ]);

  const [activeSection, setActiveSection] = useState<
    'personal' | 'education' | 'skills' | 'projects' | 'internships' | 'certifications' | 'achievements'
  >('personal');

  // Sync from current profile
  const handleSyncProfile = () => {
    setPersonalInfo({
      ...personalInfo,
      name: studentProfile.name,
      email: studentProfile.email,
      location: studentProfile.location,
      github: studentProfile.github,
      linkedin: studentProfile.linkedin,
    });
    setTechnicalSkillsList(studentProfile.technicalSkills.join(', '));
    setSoftSkillsList(studentProfile.softSkills.join(', '));
    setProjectsList(
      studentProfile.projects.map((p) => ({
        id: p.id,
        title: p.title,
        tech: p.techStack.join(', '),
        description: p.description,
        link: p.githubUrl || '',
      }))
    );
    setCertificationsList(
      studentProfile.certifications.map((c) => ({
        id: c.id,
        title: c.title,
        issuer: c.issuer,
        year: c.date,
      }))
    );
    addNotification('Synchronized all details from your student profile!', 'success');
  };

  // Download Resume
  const handleDownload = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
    window.print();
  };

  // Project item handlers
  const handleAddProject = () => {
    setProjectsList([
      ...projectsList,
      {
        id: Date.now().toString(),
        title: 'New Student System',
        tech: 'React, TypeScript, Node.js',
        description: 'Engineered an end-to-end web portal solving real campus challenges.',
        link: 'https://github.com',
      },
    ]);
  };

  const handleRemoveProject = (id: string) => {
    setProjectsList(projectsList.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>ATS-Friendly Document Generator</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Student Resume Builder
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Fill your academic &amp; project credentials to preview and download a clean, ATS-optimized engineering resume.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSyncProfile}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            title="Load profile values"
          >
            <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
            <span>Sync Profile</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs rounded-lg shadow-sm shadow-blue-200 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume (PDF)</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Editor (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Resume Content Sections
            </h2>
            <span className="text-[11px] text-slate-400">Live Updating</span>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl text-xs">
            {[
              { id: 'personal', label: 'Personal' },
              { id: 'education', label: 'Education' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'internships', label: 'Internships' },
              { id: 'certifications', label: 'Certs' },
              { id: 'achievements', label: 'Awards' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  activeSection === tab.id
                    ? 'bg-white text-blue-600 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Content by Active Tab */}
          <div className="space-y-4 text-xs">
            {activeSection === 'personal' && (
              <div className="space-y-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={personalInfo.name}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                      className="w-full p-2 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                    <input
                      type="text"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                      className="w-full p-2 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={personalInfo.location}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">GitHub URL</label>
                    <input
                      type="text"
                      value={personalInfo.github}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, github: e.target.value })}
                      className="w-full p-2 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={personalInfo.linkedin}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                      className="w-full p-2 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Professional Summary</label>
                  <textarea
                    rows={4}
                    value={personalInfo.summary}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg text-slate-800 leading-relaxed"
                  />
                </div>
              </div>
            )}

            {activeSection === 'education' && (
              <div className="space-y-3">
                {educationList.map((edu, idx) => (
                  <div key={edu.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Degree Title</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[idx].degree = e.target.value;
                          setEducationList(updated);
                        }}
                        className="w-full p-2 border border-slate-200 bg-white rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[idx].institution = e.target.value;
                          setEducationList(updated);
                        }}
                        className="w-full p-2 border border-slate-200 bg-white rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Timeline</label>
                        <input
                          type="text"
                          value={edu.year}
                          onChange={(e) => {
                            const updated = [...educationList];
                            updated[idx].year = e.target.value;
                            setEducationList(updated);
                          }}
                          className="w-full p-2 border border-slate-200 bg-white rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Grade / CGPA</label>
                        <input
                          type="text"
                          value={edu.grade}
                          onChange={(e) => {
                            const updated = [...educationList];
                            updated[idx].grade = e.target.value;
                            setEducationList(updated);
                          }}
                          className="w-full p-2 border border-slate-200 bg-white rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'skills' && (
              <div className="space-y-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Technical Skills (Comma separated)
                  </label>
                  <textarea
                    rows={3}
                    value={technicalSkillsList}
                    onChange={(e) => setTechnicalSkillsList(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Soft Skills &amp; Methodologies
                  </label>
                  <textarea
                    rows={2}
                    value={softSkillsList}
                    onChange={(e) => setSoftSkillsList(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
              </div>
            )}

            {activeSection === 'projects' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Project Items</span>
                  <button
                    onClick={handleAddProject}
                    className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Project</span>
                  </button>
                </div>

                {projectsList.map((proj, idx) => (
                  <div key={proj.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative">
                    <button
                      onClick={() => handleRemoveProject(proj.id)}
                      className="absolute top-2 right-2 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="pr-6">
                      <label className="block font-semibold text-slate-700 mb-0.5">Project Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => {
                          const updated = [...projectsList];
                          updated[idx].title = e.target.value;
                          setProjectsList(updated);
                        }}
                        className="w-full p-1.5 border border-slate-200 bg-white rounded-lg font-medium"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-0.5">Tech Stack</label>
                      <input
                        type="text"
                        value={proj.tech}
                        onChange={(e) => {
                          const updated = [...projectsList];
                          updated[idx].tech = e.target.value;
                          setProjectsList(updated);
                        }}
                        className="w-full p-1.5 border border-slate-200 bg-white rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-0.5">Summary</label>
                      <textarea
                        rows={2}
                        value={proj.description}
                        onChange={(e) => {
                          const updated = [...projectsList];
                          updated[idx].description = e.target.value;
                          setProjectsList(updated);
                        }}
                        className="w-full p-1.5 border border-slate-200 bg-white rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'internships' && (
              <div className="space-y-3">
                {internshipsList.map((item, idx) => (
                  <div key={item.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-0.5">Role Title</label>
                        <input
                          type="text"
                          value={item.role}
                          onChange={(e) => {
                            const updated = [...internshipsList];
                            updated[idx].role = e.target.value;
                            setInternshipsList(updated);
                          }}
                          className="w-full p-1.5 border border-slate-200 bg-white rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-0.5">Company Name</label>
                        <input
                          type="text"
                          value={item.company}
                          onChange={(e) => {
                            const updated = [...internshipsList];
                            updated[idx].company = e.target.value;
                            setInternshipsList(updated);
                          }}
                          className="w-full p-1.5 border border-slate-200 bg-white rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-0.5">Duration</label>
                        <input
                          type="text"
                          value={item.duration}
                          onChange={(e) => {
                            const updated = [...internshipsList];
                            updated[idx].duration = e.target.value;
                            setInternshipsList(updated);
                          }}
                          className="w-full p-1.5 border border-slate-200 bg-white rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-0.5">Location</label>
                        <input
                          type="text"
                          value={item.location}
                          onChange={(e) => {
                            const updated = [...internshipsList];
                            updated[idx].location = e.target.value;
                            setInternshipsList(updated);
                          }}
                          className="w-full p-1.5 border border-slate-200 bg-white rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-0.5">
                        Key Responsibilities (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={item.bullets}
                        onChange={(e) => {
                          const updated = [...internshipsList];
                          updated[idx].bullets = e.target.value;
                          setInternshipsList(updated);
                        }}
                        className="w-full p-1.5 border border-slate-200 bg-white rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'certifications' && (
              <div className="space-y-3">
                {certificationsList.map((cert, idx) => (
                  <div key={cert.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-0.5">Certification</label>
                      <input
                        type="text"
                        value={cert.title}
                        onChange={(e) => {
                          const updated = [...certificationsList];
                          updated[idx].title = e.target.value;
                          setCertificationsList(updated);
                        }}
                        className="w-full p-1.5 border border-slate-200 bg-white rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-0.5">Issuer</label>
                        <input
                          type="text"
                          value={cert.issuer}
                          onChange={(e) => {
                            const updated = [...certificationsList];
                            updated[idx].issuer = e.target.value;
                            setCertificationsList(updated);
                          }}
                          className="w-full p-1.5 border border-slate-200 bg-white rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-0.5">Date</label>
                        <input
                          type="text"
                          value={cert.year}
                          onChange={(e) => {
                            const updated = [...certificationsList];
                            updated[idx].year = e.target.value;
                            setCertificationsList(updated);
                          }}
                          className="w-full p-1.5 border border-slate-200 bg-white rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'achievements' && (
              <div className="space-y-2">
                <label className="block font-semibold text-slate-700 mb-1">
                  Key Achievements &amp; Competitions
                </label>
                {achievementsList.map((ach, idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={ach}
                    onChange={(e) => {
                      const updated = [...achievementsList];
                      updated[idx] = e.target.value;
                      setAchievementsList(updated);
                    }}
                    className="w-full p-2 border border-slate-200 rounded-lg text-slate-800"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Printable Resume Preview (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-slate-200 p-4 sm:p-6 rounded-2xl border border-slate-300 shadow-inner flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-3 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-blue-600" />
                <span>Live ATS Document Preview (Letter / A4 Format)</span>
              </span>
              <button
                onClick={handleDownload}
                className="text-blue-700 hover:text-blue-900 font-bold underline"
              >
                Print / Save as PDF
              </button>
            </div>

            {/* Printable Resume Container */}
            <div
              id="printable-resume"
              className="bg-white text-slate-900 w-full max-w-[800px] p-8 sm:p-10 shadow-2xl rounded-sm font-sans space-y-5 text-[13px] leading-normal border border-slate-100"
            >
              {/* Header */}
              <div className="border-b-2 border-slate-800 pb-3 text-center space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">
                  {personalInfo.name}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600">
                  <span>{personalInfo.email}</span>
                  <span>|</span>
                  <span>{personalInfo.phone}</span>
                  <span>|</span>
                  <span>{personalInfo.location}</span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-blue-700 pt-0.5">
                  <a href={personalInfo.linkedin} className="hover:underline">
                    LinkedIn
                  </a>
                  <span>·</span>
                  <a href={personalInfo.github} className="hover:underline">
                    GitHub
                  </a>
                  <span>·</span>
                  <a href={personalInfo.portfolio} className="hover:underline">
                    Portfolio
                  </a>
                </div>
              </div>

              {/* Summary */}
              {personalInfo.summary && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-0.5 mb-1.5">
                    Professional Summary
                  </h3>
                  <p className="text-slate-700 text-xs leading-relaxed text-justify">
                    {personalInfo.summary}
                  </p>
                </div>
              )}

              {/* Education */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-0.5 mb-2">
                  Education
                </h3>
                {educationList.map((edu) => (
                  <div key={edu.id} className="mb-2 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{edu.degree}</span>
                      <span className="font-mono text-slate-600 font-normal">{edu.year}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700 italic">
                      <span>{edu.institution}</span>
                      <span className="font-semibold text-slate-800 not-italic">{edu.grade}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-0.5 mb-1.5">
                  Technical Expertise
                </h3>
                <div className="text-xs space-y-1">
                  <div>
                    <strong className="text-slate-900">Languages &amp; Frameworks: </strong>
                    <span className="text-slate-700">{technicalSkillsList}</span>
                  </div>
                  <div>
                    <strong className="text-slate-900">Core Concepts &amp; Soft Skills: </strong>
                    <span className="text-slate-700">{softSkillsList}</span>
                  </div>
                </div>
              </div>

              {/* Experience / Internships */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-0.5 mb-2">
                  Work Experience &amp; Internships
                </h3>
                {internshipsList.map((exp) => (
                  <div key={exp.id} className="mb-3 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>
                        {exp.role} <span className="font-normal text-slate-600">at {exp.company}</span>
                      </span>
                      <span className="font-mono text-slate-600 font-normal">{exp.duration}</span>
                    </div>
                    <div className="text-slate-500 text-[11px] mb-1">{exp.location}</div>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                      {exp.bullets.split('\n').filter(Boolean).map((line, i) => (
                        <li key={i}>{line.replace(/^-\s*/, '')}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Projects */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-0.5 mb-2">
                  Technical Projects
                </h3>
                {projectsList.map((proj) => (
                  <div key={proj.id} className="mb-2.5 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>
                        {proj.title}{' '}
                        <span className="text-[11px] font-normal text-slate-600">
                          | {proj.tech}
                        </span>
                      </span>
                      {proj.link && (
                        <span className="text-[11px] font-mono text-blue-700 font-normal">
                          {proj.link.replace('https://', '')}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-700 mt-0.5">{proj.description}</p>
                  </div>
                ))}
              </div>

              {/* Certifications & Achievements */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-0.5 mb-1.5">
                    Certifications
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
                    {certificationsList.map((c) => (
                      <li key={c.id}>
                        <span className="font-semibold text-slate-800">{c.title}</span> ({c.issuer})
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-0.5 mb-1.5">
                    Achievements
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
                    {achievementsList.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
