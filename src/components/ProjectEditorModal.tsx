import React, { useState, useEffect } from 'react';
import { ProjectItem } from '../types';
import { X, Save, Trash2, FolderPlus, Terminal, Wrench } from 'lucide-react';

interface ProjectEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectToEdit: ProjectItem | null;
  onSaveProject: (project: ProjectItem) => void;
  onDeleteProject?: (projectId: string) => void;
  isDarkMode?: boolean;
}

export const ProjectEditorModal: React.FC<ProjectEditorModalProps> = ({
  isOpen,
  onClose,
  projectToEdit,
  onSaveProject,
  onDeleteProject,
  isDarkMode = false,
}) => {
  if (!isOpen) return null;

  const isEditing = Boolean(projectToEdit);

  const [title, setTitle] = useState('');
  const [roleSubtitle, setRoleSubtitle] = useState('');
  const [period, setPeriod] = useState('');
  const [stackInput, setStackInput] = useState('');
  const [summary, setSummary] = useState('');
  const [accomplishmentsInput, setAccomplishmentsInput] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');

  useEffect(() => {
    if (projectToEdit) {
      setTitle(projectToEdit.title || '');
      setRoleSubtitle(projectToEdit.roleSubtitle || '');
      setPeriod(projectToEdit.period || '');
      setStackInput(projectToEdit.stack ? projectToEdit.stack.join(', ') : '');
      setSummary(projectToEdit.summary || '');
      setAccomplishmentsInput(
        projectToEdit.accomplishments ? projectToEdit.accomplishments.join('\n') : ''
      );
      setGithubUrl(projectToEdit.githubUrl || '');
      setDemoUrl(projectToEdit.demoUrl || '');
    } else {
      setTitle('');
      setRoleSubtitle('');
      setPeriod('2025 – Present');
      setStackInput('C#, .NET, Sockets');
      setSummary('');
      setAccomplishmentsInput('');
      setGithubUrl('https://github.com/minionade');
      setDemoUrl('');
    }
  }, [projectToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a project title');
      return;
    }

    const stack = stackInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const accomplishments = accomplishmentsInput
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    const savedProject: ProjectItem = {
      id: projectToEdit?.id || `proj-${Date.now()}`,
      title: title.trim(),
      roleSubtitle: roleSubtitle.trim() || 'Software Engineer',
      period: period.trim() || '2025 – Present',
      stack: stack.length > 0 ? stack : ['Systems Engineering'],
      summary: summary.trim(),
      accomplishments: accomplishments.length > 0 ? accomplishments : ['Architected modular system components.'],
      githubUrl: githubUrl.trim() || undefined,
      demoUrl: demoUrl.trim() || undefined,
    };

    onSaveProject(savedProject);
    onClose();
  };

  const handleDelete = () => {
    if (projectToEdit && onDeleteProject) {
      if (confirm(`Are you sure you want to delete "${projectToEdit.title}"?`)) {
        onDeleteProject(projectToEdit.id);
        onClose();
      }
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
        className={`rounded-xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col border overflow-hidden transition-all ${
          isDarkMode
            ? 'bg-[#242b3b] border-slate-700/80 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between sticky top-0 z-10 ${
            isDarkMode ? 'bg-[#1e2430] border-slate-700/80' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold">
                {isEditing ? 'Edit Technical Project' : 'Add New Technical Project'}
              </h2>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Owner Admin Tool · Saves directly to your engineering portfolio
              </p>
            </div>
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={`block font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Project Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Custom C# Game & Dedicated Server Engine"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={`block font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Role Subtitle
              </label>
              <input
                type="text"
                value={roleSubtitle}
                onChange={(e) => setRoleSubtitle(e.target.value)}
                placeholder="e.g. Lead Systems Architect & Engine Programmer"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={`block font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Timeline / Period
              </label>
              <input
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="e.g. 2021 – Present"
                className={inputClass}
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className={`block font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Technologies & Stack (Comma-separated)
              </label>
              <input
                type="text"
                value={stackInput}
                onChange={(e) => setStackInput(e.target.value)}
                placeholder="e.g. C#, .NET 8, Raw TCP/UDP Sockets, Multi-threading, Windows Server"
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={`block font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                GitHub Repository URL
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/minionade/..."
                className={`${inputClass} font-mono`}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={`block font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Summary / Architecture Overview
              </label>
              <textarea
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="High-level overview of the engineering challenges solved and architecture designed..."
                className={`${inputClass} leading-relaxed`}
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className={`block font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Key Accomplishments & Technical Metrics (One per line)
              </label>
              <textarea
                rows={4}
                value={accomplishmentsInput}
                onChange={(e) => setAccomplishmentsInput(e.target.value)}
                placeholder="Built low-overhead TCP/UDP binary packet serialization pipeline&#10;Engineered deterministic simulation tick loop&#10;Optimized garbage collector allocations for steady 60 FPS"
                className={`${inputClass} leading-relaxed`}
                required
              />
              <p className={`text-[11px] mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Tip: Use action verbs and quantifiable engineering results.
              </p>
            </div>
          </div>

          {/* Footer Controls */}
          <div
            className={`pt-4 border-t flex items-center justify-between sticky bottom-0 ${
              isDarkMode ? 'bg-[#242b3b] border-slate-700/80' : 'bg-white border-slate-200'
            }`}
          >
            {isEditing && onDeleteProject ? (
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/30 border border-red-900/40 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Project</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  isDarkMode ? 'text-slate-300 hover:bg-slate-700/60' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Save Changes' : 'Add to Projects'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
