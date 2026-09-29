import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Trophy,
  Users,
  Search,
  CheckCircle2,
  Bookmark,
  Share2,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { HackathonEvent, EventType } from '../../types';
import confetti from 'canvas-confetti';

export const HackathonsAndEvents: React.FC = () => {
  const {
    events,
    savedEventIds,
    toggleSaveEvent,
    registerForEvent,
    studentProfile,
    addNotification,
  } = useApp();

  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedMode, setSelectedMode] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [registeringEvent, setRegisteringEvent] = useState<HackathonEvent | null>(null);

  const eventTypes: (string | EventType)[] = [
    'All',
    'Hackathon',
    'Coding Contest',
    'Workshop',
    'Webinar',
    'Tech Summit',
  ];

  const modes = ['All', 'Online', 'Hybrid', 'In-Person'];

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      if (selectedType !== 'All' && ev.type !== selectedType) {
        return false;
      }
      if (selectedMode !== 'All' && ev.mode !== selectedMode) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          ev.title.toLowerCase().includes(q) ||
          ev.organizer.toLowerCase().includes(q) ||
          ev.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [events, selectedType, selectedMode, searchQuery]);

  const handleRegisterConfirm = (event: HackathonEvent) => {
    registerForEvent(event.id);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
    setRegisteringEvent(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
          <Calendar className="w-4 h-4" />
          <span>Campus Innovation &amp; Contests</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Hackathons, Coding Battles &amp; Tech Workshops
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Participate in national coding competitions, earn verifiable certificates, network with campus recruiters, and win developer gear.
        </p>
      </div>

      {/* Spotlight Event Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-800 bg-slate-950 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Spotlight Championship</span>
              <span className="text-slate-500">·</span>
              <span>₹2,50,000 Cash Pool</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              HackNITK 2026: National Student Innovation Hackathon
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              Uniting 600+ top engineering student builders for a 36-hour sprint. Build real solutions across Web3, Generative AI, and Smart City Tech. Direct interviews with sponsor companies.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>Oct 17 - 19, 2026</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span>Hybrid (Campus Arena &amp; Discord)</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold font-mono">
                <Trophy className="w-4 h-4" />
                <span>₹2.5 Lakh Prize</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => {
                  const ev = events.find((e) => e.id === 'evt_1');
                  if (ev) setRegisteringEvent(ev);
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
              >
                Register for HackNITK 2026
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-64 lg:h-full min-h-[300px]">
            <img
              src="/src/assets/images/hackathon_event_stage_1790658228581.jpg"
              alt="Exciting tech hackathon competition arena with students coding"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hackathons, topics, organizers..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
          </div>

          {/* Mode Selector */}
          <div className="flex items-center gap-2 text-xs w-full md:w-auto">
            <span className="font-semibold text-slate-600 shrink-0">Format:</span>
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="px-3 py-1.5 text-xs border border-slate-200 bg-slate-50 rounded-lg text-slate-800 font-medium"
            >
              {modes.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100">
          {eventTypes.map((type) => {
            const isActive = selectedType === type;
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => {
          const isSaved = savedEventIds.includes(evt.id);

          return (
            <div
              key={evt.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Top Type & Bookmark */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                    {evt.type}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-slate-400">
                      {evt.spotsLeft} seats left
                    </span>
                    <button
                      onClick={() => toggleSaveEvent(evt.id)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isSaved
                          ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                          : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                      }`}
                      title={isSaved ? 'Bookmarked' : 'Bookmark event'}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-base leading-snug mb-1">
                  {evt.title}
                </h3>
                <p className="text-xs font-semibold text-slate-600 mb-3">
                  Organized by {evt.organizer}
                </p>

                {/* Details unboxed metadata */}
                <div className="space-y-1.5 text-xs text-slate-600 mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="font-medium">{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span>{evt.location} ({evt.mode})</span>
                  </div>
                  {evt.prizePool && (
                    <div className="flex items-center gap-2">
                      <Trophy className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-bold text-emerald-700 font-mono">{evt.prizePool}</span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {evt.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                  {evt.description}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400 font-mono">
                  Deadline: {evt.deadline}
                </span>

                {evt.isRegistered ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-lg">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Registered</span>
                  </span>
                ) : (
                  <button
                    onClick={() => setRegisteringEvent(evt)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-xs shadow-blue-200 transition-colors cursor-pointer"
                  >
                    Register Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Event Registration Confirmation Modal */}
      {registeringEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  Event Registration
                </span>
                <h3 className="font-bold text-slate-900 text-base leading-tight">
                  {registeringEvent.title}
                </h3>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs text-slate-600">
              <div>
                <strong>Format:</strong> {registeringEvent.mode} · {registeringEvent.location}
              </div>
              <div>
                <strong>Date:</strong> {registeringEvent.date}
              </div>
              <div>
                <strong>Student:</strong> {studentProfile.name} ({studentProfile.email})
              </div>
              <div>
                <strong>College:</strong> {studentProfile.college}
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              By confirming, your student entry badge and link will be issued to your email and synced to your dashboard calendar.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setRegisteringEvent(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleRegisterConfirm(registeringEvent)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-sm shadow-blue-200 transition-colors"
              >
                Confirm Registration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
