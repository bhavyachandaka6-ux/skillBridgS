import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Filter,
  Bookmark,
  MapPin,
  Clock,
  Sparkles,
  Building2,
  Calendar,
  DollarSign,
  ChevronDown,
  X,
  ExternalLink,
  Users
} from 'lucide-react';
import { Internship, WorkMode } from '../../types';

export const InternshipPortal: React.FC = () => {
  const {
    internships,
    savedInternshipIds,
    toggleSaveInternship,
    setApplyingInternship,
    searchQuery,
    setSearchQuery,
    studentProfile,
  } = useApp();

  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedWorkMode, setSelectedWorkMode] = useState<string>('All');
  const [selectedDuration, setSelectedDuration] = useState<string>('All');
  const [minStipend, setMinStipend] = useState<number>(0);
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [selectedInternshipForDetails, setSelectedInternshipForDetails] = useState<Internship | null>(null);

  // Domains list
  const domains = ['All', 'Web Development', 'Software Engineering', 'AI/ML', 'Cyber Security', 'Cloud Computing', 'Data Science'];
  const locations = ['All', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai', 'Remote'];
  const workModes = ['All', 'Remote', 'Hybrid', 'On-site'];
  const durations = ['All', '2 Months', '3 Months', '6 Months'];
  const skillsList = ['All', 'React', 'JavaScript', 'Python', 'C++', 'Java', 'Data Structures', 'Cloud Computing', 'SQL'];

  // Filtered internships
  const filteredInternships = useMemo(() => {
    return internships.filter((item) => {
      // Search text filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesQuery =
          item.title.toLowerCase().includes(query) ||
          item.company.toLowerCase().includes(query) ||
          item.domain.toLowerCase().includes(query) ||
          item.requiredSkills.some((s) => s.toLowerCase().includes(query)) ||
          item.location.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // Domain
      if (selectedDomain !== 'All' && item.domain !== selectedDomain) {
        return false;
      }

      // Location
      if (selectedLocation !== 'All' && !item.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }

      // Work Mode
      if (selectedWorkMode !== 'All' && item.workMode !== selectedWorkMode) {
        return false;
      }

      // Duration
      if (selectedDuration !== 'All' && !item.duration.includes(selectedDuration)) {
        return false;
      }

      // Stipend
      if (minStipend > 0 && item.numericStipend < minStipend) {
        return false;
      }

      // Skill
      if (selectedSkill !== 'All' && !item.requiredSkills.some((s) => s.toLowerCase() === selectedSkill.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [
    internships,
    searchQuery,
    selectedDomain,
    selectedLocation,
    selectedWorkMode,
    selectedDuration,
    minStipend,
    selectedSkill,
  ]);

  const resetFilters = () => {
    setSelectedDomain('All');
    setSelectedLocation('All');
    setSelectedWorkMode('All');
    setSelectedDuration('All');
    setMinStipend(0);
    setSelectedSkill('All');
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedDomain !== 'All' ||
    selectedLocation !== 'All' ||
    selectedWorkMode !== 'All' ||
    selectedDuration !== 'All' ||
    minStipend > 0 ||
    selectedSkill !== 'All' ||
    searchQuery.trim().length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
          <Building2 className="w-4 h-4" />
          <span>Curated Campus Recruiting</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Explore Student Internships
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Search and apply to verified software engineering, web, cloud, and AI internships.
        </p>
      </div>

      {/* Main Search & Filters Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        {/* Search Bar Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by role, company name, skill (e.g. React, C++, AWS), or location..."
            className="w-full pl-11 pr-10 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 placeholder:text-slate-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1 text-xs">
          {/* Domain Filter */}
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Domain</label>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-blue-500"
            >
              {domains.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-blue-500"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Work Mode Filter */}
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Work Mode</label>
            <select
              value={selectedWorkMode}
              onChange={(e) => setSelectedWorkMode(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-blue-500"
            >
              {workModes.map((wm) => (
                <option key={wm} value={wm}>
                  {wm}
                </option>
              ))}
            </select>
          </div>

          {/* Duration Filter */}
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Duration</label>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-blue-500"
            >
              {durations.map((dur) => (
                <option key={dur} value={dur}>
                  {dur}
                </option>
              ))}
            </select>
          </div>

          {/* Min Stipend Filter */}
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Min Stipend</label>
            <select
              value={minStipend}
              onChange={(e) => setMinStipend(Number(e.target.value))}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-blue-500"
            >
              <option value={0}>Any Stipend</option>
              <option value={35000}>≥ ₹35,000 / mo</option>
              <option value={45000}>≥ ₹45,000 / mo</option>
              <option value={60000}>≥ ₹60,000 / mo</option>
              <option value={100000}>≥ ₹1,00,000 / mo</option>
            </select>
          </div>

          {/* Skill Filter */}
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Required Skill</label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-blue-500"
            >
              {skillsList.map((sk) => (
                <option key={sk} value={sk}>
                  {sk}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Summary & Reset Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="text-slate-600 font-medium">
            Showing <span className="font-bold text-slate-900 font-mono tabular-nums">{filteredInternships.length}</span> verified internships
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Internships Grid */}
      {filteredInternships.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No matching internships found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search criteria, domain, or stipend filters to discover more open positions.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.map((internship) => {
            const isSaved = savedInternshipIds.includes(internship.id);
            const userHasMatchedSkills = internship.requiredSkills.filter((req) =>
              studentProfile.technicalSkills.some(
                (ts) => ts.toLowerCase().includes(req.toLowerCase()) || req.toLowerCase().includes(ts.toLowerCase())
              )
            );

            return (
              <div
                key={internship.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Logo, Title & Save */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-2xl shadow-xs shrink-0">
                        {internship.logo}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-base line-clamp-1">
                          {internship.title}
                        </h3>
                        <p className="text-xs font-semibold text-slate-600">
                          {internship.company}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleSaveInternship(internship.id)}
                      className={`p-2 rounded-lg transition-colors cursor-pointer ${
                        isSaved
                          ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                          : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                      }`}
                      title={isSaved ? 'Remove from saved' : 'Save internship'}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Clean unboxed metadata with separators (Anti-Slop rule) */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {internship.location}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-slate-700">{internship.workMode}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {internship.duration}
                    </span>
                  </div>

                  {/* Stipend Card */}
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 mb-4 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Monthly Stipend</span>
                    <span className="font-bold text-slate-900 font-mono">
                      {internship.stipend}
                    </span>
                  </div>

                  {/* Required Skills */}
                  <div className="mb-4">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Required Skills
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {internship.requiredSkills.map((sk) => {
                        const isMatched = userHasMatchedSkills.includes(sk);
                        return (
                          <span
                            key={sk}
                            className={`text-xs px-2.5 py-0.5 rounded-md font-medium border ${
                              isMatched
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : 'bg-slate-100 text-slate-700 border-slate-200/60'
                            }`}
                          >
                            {sk} {isMatched ? '✓' : ''}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Description preview */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {internship.description}
                  </p>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-400 font-mono">
                    Deadline: {internship.deadline}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedInternshipForDetails(internship)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => setApplyingInternship(internship)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-xs shadow-blue-200 transition-colors"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Internship Full Details Modal / Drawer */}
      {selectedInternshipForDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col">
            <div className="bg-slate-900 text-white p-6 relative">
              <button
                onClick={() => setSelectedInternshipForDetails(null)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 bg-slate-800 rounded-xl">{selectedInternshipForDetails.logo}</span>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {selectedInternshipForDetails.title}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {selectedInternshipForDetails.company} · {selectedInternshipForDetails.location} ({selectedInternshipForDetails.workMode})
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-700 flex-1">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <div>
                  <span className="text-slate-500 block">Stipend</span>
                  <span className="font-bold text-slate-900 font-mono">{selectedInternshipForDetails.stipend}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Duration</span>
                  <span className="font-bold text-slate-900">{selectedInternshipForDetails.duration}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Application Deadline</span>
                  <span className="font-semibold text-slate-900 font-mono">{selectedInternshipForDetails.deadline}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Current Applicants</span>
                  <span className="font-semibold text-slate-900 font-mono tabular-nums">{selectedInternshipForDetails.applicantsCount} students</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Role Overview
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedInternshipForDetails.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Key Skills &amp; Qualifications
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedInternshipForDetails.requiredSkills.map((sk) => (
                    <span key={sk} className="text-xs px-2.5 py-1 bg-slate-100 rounded-md font-medium text-slate-800">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Student Perks &amp; Benefits
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {selectedInternshipForDetails.perks.map((perk, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <button
                onClick={() => {
                  toggleSaveInternship(selectedInternshipForDetails.id);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200/80 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Bookmark className="w-4 h-4" />
                <span>
                  {savedInternshipIds.includes(selectedInternshipForDetails.id)
                    ? 'Saved'
                    : 'Save'}
                </span>
              </button>

              <button
                onClick={() => {
                  const target = selectedInternshipForDetails;
                  setSelectedInternshipForDetails(null);
                  setApplyingInternship(target);
                }}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-sm shadow-blue-200 transition-colors"
              >
                Apply for Position
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
