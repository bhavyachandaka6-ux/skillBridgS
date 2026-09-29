import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bookmark,
  Briefcase,
  BookOpen,
  Calendar,
  Trash2,
  ExternalLink,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const SavedOpportunities: React.FC = () => {
  const {
    savedInternshipIds,
    toggleSaveInternship,
    internships,
    savedSkillIds,
    toggleSaveSkill,
    skills,
    savedEventIds,
    toggleSaveEvent,
    events,
    setApplyingInternship,
    setSelectedSkillForLearning,
    setActiveTab,
  } = useApp();

  const [activeTab, setLocalTab] = useState<'internships' | 'skills' | 'events'>('internships');

  const savedInternships = internships.filter((i) => savedInternshipIds.includes(i.id));
  const savedCourses = skills.filter((s) => savedSkillIds.includes(s.id));
  const savedEventsList = events.filter((e) => savedEventIds.includes(e.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 uppercase tracking-wider">
          <Bookmark className="w-4 h-4" />
          <span>Curated Student Watchlist</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Saved Opportunities
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Keep track of promising internships, bookmarked learning tracks, and registered tech events.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit text-xs font-semibold">
        <button
          onClick={() => setLocalTab('internships')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'internships'
              ? 'bg-white text-blue-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Saved Internships</span>
          <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-[10px] font-mono">
            {savedInternships.length}
          </span>
        </button>

        <button
          onClick={() => setLocalTab('skills')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'skills'
              ? 'bg-white text-blue-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Saved Courses</span>
          <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-[10px] font-mono">
            {savedCourses.length}
          </span>
        </button>

        <button
          onClick={() => setLocalTab('events')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'events'
              ? 'bg-white text-blue-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Saved Events</span>
          <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-[10px] font-mono">
            {savedEventsList.length}
          </span>
        </button>
      </div>

      {/* 1. Saved Internships Tab */}
      {activeTab === 'internships' && (
        <div>
          {savedInternships.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <Bookmark className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">No saved internships yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Browse our curated listings and click the bookmark icon on any card to save it for later.
              </p>
              <button
                onClick={() => setActiveTab('internships')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Internships
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedInternships.map((internship) => (
                <div
                  key={internship.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl p-2 bg-slate-50 rounded-xl border border-slate-100">
                          {internship.logo}
                        </span>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm line-clamp-1">
                            {internship.title}
                          </h3>
                          <p className="text-xs text-slate-500 font-semibold">{internship.company}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleSaveInternship(internship.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                      <span>{internship.location}</span>
                      <span>·</span>
                      <span>{internship.workMode}</span>
                      <span>·</span>
                      <span className="font-semibold text-slate-800">{internship.stipend}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {internship.requiredSkills.map((sk) => (
                        <span key={sk} className="text-[11px] px-2 py-0.5 bg-slate-100 rounded text-slate-600">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">
                      Deadline: {internship.deadline}
                    </span>
                    <button
                      onClick={() => setApplyingInternship(internship)}
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. Saved Courses Tab */}
      {activeTab === 'skills' && (
        <div>
          {savedCourses.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">No bookmarked skill courses</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore our core engineering languages and framework roadmaps to start learning.
              </p>
              <button
                onClick={() => setActiveTab('skills')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
              >
                Explore Skills
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedCourses.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                          {skill.level}
                        </span>
                        <h3 className="font-bold text-slate-900 text-base mt-1.5">{skill.name}</h3>
                      </div>
                      <button
                        onClick={() => toggleSaveSkill(skill.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">{skill.description}</p>

                    <div className="space-y-1 mb-3">
                      <div className="flex justify-between text-[11px] text-slate-600">
                        <span>Progress</span>
                        <span className="font-bold font-mono">{skill.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${skill.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedSkillForLearning(skill)}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors text-center"
                  >
                    Resume Learning
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. Saved Events Tab */}
      {activeTab === 'events' && (
        <div>
          {savedEventsList.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg">No bookmarked campus events</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Find upcoming hackathons, coding contests, and developer summits to participate in.
              </p>
              <button
                onClick={() => setActiveTab('events')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Events
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedEventsList.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                        {evt.type}
                      </span>
                      <button
                        onClick={() => toggleSaveEvent(evt.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-1">{evt.title}</h3>
                    <p className="text-xs text-slate-500 mb-3">By {evt.organizer}</p>

                    <div className="space-y-1 text-xs text-slate-600 mb-4">
                      <div>
                        <strong>Date:</strong> {evt.date}
                      </div>
                      <div>
                        <strong>Location:</strong> {evt.location} ({evt.mode})
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono">
                      Deadline: {evt.deadline}
                    </span>
                    <button
                      onClick={() => setActiveTab('events')}
                      className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors"
                    >
                      {evt.isRegistered ? 'View Status' : 'Register Now'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
