import React from 'react';
import { useApp, ActiveTab } from '../context/AppContext';
import { GraduationCap, Award, Compass, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  const handleNav = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                SkillBridge
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Empowering college students with practical engineering skills, verified internship placements, university hackathons, and AI-driven career trajectory analysis.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-blue-400" />
                <span>350+ Partner Campuses</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Employers</span>
              </div>
            </div>
          </div>

          {/* Column 1: Internships */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Internships
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => handleNav('internships')}
                  className="hover:text-white transition-colors"
                >
                  Frontend & React Roles
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('internships')}
                  className="hover:text-white transition-colors"
                >
                  Software Engineering
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('internships')}
                  className="hover:text-white transition-colors"
                >
                  AI & Machine Learning
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('internships')}
                  className="hover:text-white transition-colors"
                >
                  Remote Internships
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('internships')}
                  className="hover:text-white transition-colors"
                >
                  High Stipend Opportunities
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Skill Tracks */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Skill Learning
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => handleNav('skills')}
                  className="hover:text-white transition-colors"
                >
                  Data Structures & Algorithms
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('skills')}
                  className="hover:text-white transition-colors"
                >
                  Full Stack Web Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('skills')}
                  className="hover:text-white transition-colors"
                >
                  C++ & System Programming
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('skills')}
                  className="hover:text-white transition-colors"
                >
                  Cloud Computing & AWS
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('skills')}
                  className="hover:text-white transition-colors"
                >
                  Cyber Security Foundations
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Student Tools */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Career Tools
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => handleNav('skill-gap')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Skill Gap Analyzer</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('resume-builder')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5 text-blue-400" />
                  <span>ATS Resume Builder</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('events')}
                  className="hover:text-white transition-colors"
                >
                  Hackathons & Contests
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('dashboard')}
                  className="hover:text-white transition-colors"
                >
                  Progress Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('saved')}
                  className="hover:text-white transition-colors"
                >
                  Saved Bookmarks
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 mt-10 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 SkillBridge Inc. All rights reserved. Built for engineering and college students.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Campus Terms</span>
            <span className="hover:text-slate-400 cursor-pointer">Student Privacy Code</span>
            <span className="hover:text-slate-400 cursor-pointer">Employer Verification</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
