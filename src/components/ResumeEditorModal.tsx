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
}

export const ResumeEditorModal: React.FC<ResumeEditorModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
  currentPersona,
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 no-print">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Customize Resume Content
            </h2>
            <p className="text-xs text-slate-500">
              Edits apply live to your printable resume document.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Editor Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50/50 gap-2 overflow-x-auto text-xs font-semibold">
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
                  ? 'border-blue-600 text-blue-600 font-bold'
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.profile.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.profile.location}
                  onChange={(e) => handleProfileChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.profile.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={formData.profile.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub / Code Repository</label>
                <input
                  type="text"
                  value={formData.profile.github || ''}
                  onChange={(e) => handleProfileChange('github', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Portfolio Domain</label>
                <input
                  type="text"
                  value={formData.profile.portfolio || ''}
                  onChange={(e) => handleProfileChange('portfolio', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-mono"
                />
              </div>
            </div>
          )}

          {activeTab === 'summary' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-700">
                  Professional Summary ({currentPersona.toUpperCase()} Persona)
                </label>
                <span className="text-[11px] text-slate-500">
                  Tailored to the active target role
                </span>
              </div>
              <textarea
                rows={6}
                value={formData.summaryByPersona[currentPersona] || ''}
                onChange={(e) => handleSummaryChange(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg text-xs leading-relaxed focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                placeholder="Write your professional summary here..."
              />
              <p className="text-[11px] text-slate-500">
                Tip: Keep summaries between 3 to 4 impactful sentences focusing on your unique blend of software engineering, PC building, and mechanical reliability.
              </p>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Edit accomplishments and descriptions for your key engineering initiatives:
              </p>
              {formData.projects.map((proj, idx) => (
                <div key={proj.id} className="p-3.5 border border-slate-200 rounded-lg bg-slate-50/50 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-slate-900">{proj.title}</span>
                    <span className="text-[10px] text-slate-500">{proj.period}</span>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1">Role Subtitle</label>
                    <input
                      type="text"
                      value={proj.roleSubtitle}
                      onChange={(e) => {
                        const next = [...formData.projects];
                        next[idx].roleSubtitle = e.target.value;
                        setFormData({ ...formData, projects: next });
                      }}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1">Key Accomplishments (One bullet per line)</label>
                    <textarea
                      rows={3}
                      value={proj.accomplishments.join('\n')}
                      onChange={(e) => {
                        const next = [...formData.projects];
                        next[idx].accomplishments = e.target.value.split('\n').filter((l) => l.trim() !== '');
                        setFormData({ ...formData, projects: next });
                      }}
                      className="w-full p-2.5 border border-slate-300 rounded text-xs leading-normal bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Edit bullet points and metrics for your work experience:
              </p>
              {formData.experience.map((job, idx) => (
                <div key={job.id} className="p-3.5 border border-slate-200 rounded-lg bg-slate-50/50 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-slate-900">{job.role}</span>
                    <span className="text-[10px] text-slate-500">{job.company}</span>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1">Highlights (One bullet per line)</label>
                    <textarea
                      rows={4}
                      value={job.highlights.join('\n')}
                      onChange={(e) => {
                        const next = [...formData.experience];
                        next[idx].highlights = e.target.value.split('\n').filter((l) => l.trim() !== '');
                        setFormData({ ...formData, experience: next });
                      }}
                      className="w-full p-2.5 border border-slate-300 rounded text-xs leading-normal bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Skills are categorized for clean unboxed presentation (no ugly pills). Edit items comma-separated:
              </p>
              {(formData.skillsByPersona[currentPersona] || []).map((group, idx) => (
                <div key={idx} className="p-3 border border-slate-200 rounded-lg bg-slate-50/50 space-y-1">
                  <label className="block text-xs font-semibold text-slate-800">{group.category}</label>
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
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs bg-white"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restore Original Resume</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel & Discard
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save & Apply to Resume</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
