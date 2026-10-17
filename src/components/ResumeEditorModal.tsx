import React, { useState } from 'react';
import { Persona, ResumeData } from '../types';
import { X, RotateCcw, Check, Save } from 'lucide-react';
import { INITIAL_RESUME_DATA } from '../data/initialData';

interface ResumeEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ResumeData;
  onSave: (newData: ResumeData) => void;
  currentPersona: Persona;
  isDarkMode?: boolean;
}

export const ResumeEditorModal: React.FC<ResumeEditorModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
  currentPersona,
  isDarkMode = false,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<ResumeData>(JSON.parse(JSON.stringify(data)));
  const [activeTab, setActiveTab] = useState<'profile' | 'summary' | 'projects' | 'experience' | 'skills'>('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleProfileChange = (field: keyof typeof formData.profile, value: string) => {
    setFormData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }));
  };

  const handleSummaryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      summaryByPersona: {
        ...prev.summaryByPersona,
        [currentPersona]: value,
      },
    }));
  };

  const handleSave = () => {
    onSave(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 400);
  };

  const handleReset = () => {
    if (confirm('Reset all resume fields back to the initial professional draft?')) {
      const fresh = JSON.parse(JSON.stringify(INITIAL_RESUME_DATA));
      setFormData(fresh);
      onSave(fresh);
    }
  };

  const inputClass = `w-full px-3 py-2 border rounded-lg text-xs outline-none transition-colors ${
    isDarkMode
      ? 'bg-[#1e2430] border-slate-700 text-slate-100 focus:border-blue-500'
      : 'bg-white border-slate-300 text-slate-900 focus:border-blue-600'
  }`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 no-print">
      <div
        className={`rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col border overflow-hidden transition-all ${
          isDarkMode
            ? 'bg-[#242b3b] border-slate-700/80 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isDarkMode ? 'bg-[#1e2430] border-slate-700/80' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div>
            <h2 className="text-base font-bold">Customize Resume Content</h2>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Edits apply live to your printable resume document (saved in browser).
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded-lg transition-colors ${
              isDarkMode
                ? 'text-slate-400 hover:text-white hover:bg-slate-700/60'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Editor Tab Navigation */}
        <div
          className={`flex border-b px-6 gap-2 overflow-x-auto text-xs font-semibold ${
            isDarkMode ? 'bg-[#1e2430]/70 border-slate-700/80' : 'bg-slate-50/50 border-slate-200'
          }`}
        >
          {(
            [
              ['profile', 'Edit Contact & Links'],
              ['summary', 'Edit Professional Summary'],
              ['projects', 'Edit Projects'],
              ['experience', 'Edit Job History'],
              ['skills', 'Edit Skills & Tools'],
            ] as const
          ).map(([tabKey, label]) => (
            <button
              key={tabKey}
              onClick={() => setActiveTab(tabKey)}
              className={`py-2.5 px-3 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tabKey
                  ? isDarkMode
                    ? 'border-blue-400 text-blue-400 font-bold'
                    : 'border-blue-600 text-blue-600 font-bold'
                  : isDarkMode
                  ? 'border-transparent text-slate-400 hover:text-slate-200'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 text-sm space-y-4">
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.profile.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Location
                </label>
                <input
                  type="text"
                  value={formData.profile.location}
                  onChange={(e) => handleProfileChange('location', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.profile.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Phone Number
                </label>
                <input
                  type="text"
                  value={formData.profile.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  GitHub / Code Repository
                </label>
                <input
                  type="text"
                  value={formData.profile.github || ''}
                  onChange={(e) => handleProfileChange('github', e.target.value)}
                  className={`${inputClass} font-mono`}
                />
              </div>
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Portfolio Domain
                </label>
                <input
                  type="text"
                  value={formData.profile.portfolio || ''}
                  onChange={(e) => handleProfileChange('portfolio', e.target.value)}
                  className={`${inputClass} font-mono`}
                />
              </div>
            </div>
          )}

          {activeTab === 'summary' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className={`block text-xs font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Professional Summary ({currentPersona.toUpperCase()} Persona)
                </label>
                <span className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Tailored to the active target role
                </span>
              </div>
              <textarea
                rows={6}
                value={formData.summaryByPersona[currentPersona] || ''}
                onChange={(e) => handleSummaryChange(e.target.value)}
                className={`${inputClass} leading-relaxed`}
                placeholder="Write your professional summary here..."
              />
              <p className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Tip: Keep summaries between 3 to 4 impactful sentences focusing on your unique blend of software
                engineering, PC building, and mechanical reliability.
              </p>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4">
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Edit accomplishments and descriptions for your key engineering initiatives:
              </p>
              {formData.projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className={`p-3.5 border rounded-lg space-y-2 ${
                    isDarkMode ? 'bg-[#1e2430] border-slate-700' : 'bg-slate-50/50 border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {proj.title}
                    </span>
                    <span className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {proj.period}
                    </span>
                  </div>
                  <div>
                    <label className={`block text-[11px] mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Role Subtitle
                    </label>
                    <input
                      type="text"
                      value={proj.roleSubtitle}
                      onChange={(e) => {
                        const next = [...formData.projects];
                        next[idx].roleSubtitle = e.target.value;
                        setFormData({ ...formData, projects: next });
                      }}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={`block text-[11px] mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Key Accomplishments (One bullet per line)
                    </label>
                    <textarea
                      rows={3}
                      value={proj.accomplishments.join('\n')}
                      onChange={(e) => {
                        const next = [...formData.projects];
                        next[idx].accomplishments = e.target.value.split('\n').filter((l) => l.trim() !== '');
                        setFormData({ ...formData, projects: next });
                      }}
                      className={`${inputClass} leading-normal`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-4">
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Edit bullet points and metrics for your work experience:
              </p>
              {formData.experience.map((job, idx) => (
                <div
                  key={job.id}
                  className={`p-3.5 border rounded-lg space-y-2 ${
                    isDarkMode ? 'bg-[#1e2430] border-slate-700' : 'bg-slate-50/50 border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {job.role}
                    </span>
                    <span className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {job.company}
                    </span>
                  </div>
                  <div>
                    <label className={`block text-[11px] mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Highlights (One bullet per line)
                    </label>
                    <textarea
                      rows={4}
                      value={job.highlights.join('\n')}
                      onChange={(e) => {
                        const next = [...formData.experience];
                        next[idx].highlights = e.target.value.split('\n').filter((l) => l.trim() !== '');
                        setFormData({ ...formData, experience: next });
                      }}
                      className={`${inputClass} leading-normal`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-4">
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Skills are categorized for clean unboxed presentation (no ugly pills). Edit items comma-separated:
              </p>
              {(formData.skillsByPersona[currentPersona] || []).map((group, idx) => (
                <div
                  key={idx}
                  className={`p-3 border rounded-lg space-y-1 ${
                    isDarkMode ? 'bg-[#1e2430] border-slate-700' : 'bg-slate-50/50 border-slate-200'
                  }`}
                >
                  <label className={`block text-xs font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    {group.category}
                  </label>
                  <input
                    type="text"
                    value={group.items.join(', ')}
                    onChange={(e) => {
                      const updatedGroup = {
                        ...group,
                        items: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      };
                      const nextSkills = [...formData.skillsByPersona[currentPersona]];
                      nextSkills[idx] = updatedGroup;
                      setFormData({
                        ...formData,
                        skillsByPersona: {
                          ...formData.skillsByPersona,
                          [currentPersona]: nextSkills,
                        },
                      });
                    }}
                    className={inputClass}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          className={`px-6 py-3 border-t flex items-center justify-between ${
            isDarkMode ? 'bg-[#1e2430] border-slate-700/80' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <button
            onClick={handleReset}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              isDarkMode
                ? 'text-slate-400 hover:text-red-400 hover:bg-slate-700/60'
                : 'text-slate-600 hover:text-red-700 hover:bg-red-50'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restore Original Draft</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                isDarkMode
                  ? 'text-slate-300 hover:bg-slate-700/60'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-xs"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save to Browser</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
