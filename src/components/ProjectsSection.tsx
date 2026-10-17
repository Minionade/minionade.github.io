import React, { useState } from 'react';
import { TagFilter } from './TagFilter';
import { ProjectItem } from '../types';
import { Terminal, Cpu, FileCode2, Wrench, ChevronRight, ExternalLink, Plus, Edit3, Trash2 } from 'lucide-react';
import { ProjectEditorModal } from './ProjectEditorModal';
import { PopularReposWidget } from './PopularReposWidget';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  isOwner?: boolean;
  onSaveProject?: (project: ProjectItem) => void;
  onDeleteProject?: (projectId: string) => void;
  isDarkMode?: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  isOwner = false,
  onSaveProject,
  onDeleteProject,
  isDarkMode = false,
}) => {
  const accent = isDarkMode ? 'text-amber-300' : 'text-amber-900';
  const accentHover = isDarkMode ? 'hover:text-amber-200' : 'hover:text-amber-700';
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [projectToEdit, setProjectToEdit] = useState<ProjectItem | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Dynamic tags derived from all projects
  const dynamicTags = React.useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p) => {
      p.stack?.forEach((s) => {
        const clean = s.trim();
        if (clean) counts.set(clean, (counts.get(clean) || 0) + 1);
      });
    });
    return Array.from(counts.entries()).map(([tag, count]) => ({ tag, count }));
  }, [projects]);

  const filteredProjects = React.useMemo(() => {
    if (!selectedTags.length) return projects;
    return projects.filter(p => p.stack?.some(s => selectedTags.includes(s.trim())));
  }, [projects, selectedTags]);

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'custom-engine':
        return <Terminal className={`w-5 h-5 ${accent}`} />;
      case 'indie-games-ai':
        return <FileCode2 className={`w-5 h-5 ${accent}`} />;
      case 'gdd-archive':
        return <FileCode2 className={`w-5 h-5 ${accent}`} />;
      case 'pc-building':
        return <Cpu className={`w-5 h-5 ${accent}`} />;
      case 'equipment-ops':
        return <Wrench className={`w-5 h-5 ${accent}`} />;
      default:
        return <Terminal className={`w-5 h-5 ${accent}`} />;
    }
  };

  const handleEditClick = (e: React.MouseEvent, project: ProjectItem) => {
    e.stopPropagation();
    setProjectToEdit(project);
    setIsEditorOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent, project: ProjectItem) => {
    e.stopPropagation();
    if (onDeleteProject && confirm(`Are you sure you want to delete "${project.title}"?`)) {
      onDeleteProject(project.id);
      if (selectedProjectId === project.id) {
        setSelectedProjectId(null);
      }
    }
  };

  const handleCreateNewClick = () => {
    setProjectToEdit(null);
    setIsEditorOpen(true);
  };

  const activeProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 projects-layout no-print">
      {/* Section Header with Add Project button for Owner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className={`text-xs font-semibold uppercase tracking-wider ${accent} mb-1`}>
            Technical Portfolio
          </div>
          <h2
            className={`text-2xl sm:text-3xl font-bold tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Projects
          </h2>
          <p className={`mt-2 text-sm max-w-2xl ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Published Minecraft mods, Infinity Redux and Project Atmos, C# game prototypes, and AI-assisted projects. I also coordinate multiple AI agents within projects, guiding their work toward a shared goal.
          </p>
        </div>

        {isOwner && (
          <button
            onClick={handleCreateNewClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-300 hover:bg-amber-200 rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0 self-start sm:self-auto"
            title="Add a new project"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Project</span>
          </button>
        )}
      </div>

      <TagFilter accent="amber" options={dynamicTags} selected={selectedTags} onChange={setSelectedTags} isDarkMode={isDarkMode} />
      <p className="text-xs opacity-70" role="status">{filteredProjects.length} projects{selectedTags.length ? ' · matching any selected tag' : ''}</p>

      {/* Main Content Area: Projects Grid + GitHub Repos Sidebar */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Main Projects Feed */}
        <div className="flex-1 min-w-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`p-6 rounded-xl border transition-all flex flex-col justify-between ${
                  isDarkMode
                    ? 'bg-[#242b3b] border-slate-700/80 hover:border-slate-600/90 hover:bg-[#2b3346] text-slate-100 shadow-md'
                    : 'bg-[#faf8f4] border-[#ded7ca] hover:border-stone-400 hover:shadow-sm text-stone-900'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5 min-w-0 flex-1">
                      <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-[#1e2430]' : 'bg-[#eee9df]'}`}>
                        {getProjectIcon(project.id)}
                      </div>
                      <div>
                        <h3 className={`font-bold text-base break-words ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {project.title}
                        </h3>
                        <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>
                          {project.roleSubtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium whitespace-nowrap ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>
                        {project.period}
                      </span>

                      {/* Owner Controls */}
                      {isOwner && (
                        <div className="flex items-center gap-1 ml-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={(e) => handleEditClick(e, project)}
                            className={`p-1.5 rounded transition-colors ${
                              isDarkMode
                                ? 'text-slate-300 hover:text-amber-300 hover:bg-slate-700/60'
                                : 'text-slate-500 hover:text-amber-800 hover:bg-slate-100'
                            }`}
                            title="Edit project details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteClick(e, project)}
                            className={`p-1.5 rounded transition-colors ${
                              isDarkMode
                                ? 'text-slate-300 hover:text-red-400 hover:bg-slate-700/60'
                                : 'text-slate-500 hover:text-red-600 hover:bg-slate-100'
                            }`}
                            title="Delete this project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Technologies unboxed list */}
                  <div className={`text-xs flex flex-wrap items-center gap-1.5 pt-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {project.stack.map((item, idx) => (
                      <React.Fragment key={idx}>
                        <span className={`font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{item}</span>
                        {idx < project.stack.length - 1 && (
                          <span aria-hidden="true" className={isDarkMode ? 'text-slate-500' : 'text-slate-300'}>·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {project.summary}
                  </p>

                  {/* Bullet points */}
                  <ul className={`text-xs space-y-1.5 list-disc pl-4 pt-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {project.accomplishments.slice(0, 3).map((bullet, bIdx) => (
                      <li key={bIdx} className="leading-normal">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`pt-4 mt-4 border-t flex items-center justify-between ${isDarkMode ? 'border-slate-700/60' : 'border-slate-100'}`}>
                  <button
                    onClick={() => setSelectedProjectId(project.id)}
                    className={`text-xs font-semibold ${accent} ${accentHover} inline-flex items-center gap-1 transition-colors`}
                  >
                    <span>Project details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer"
                    className={`text-xs inline-flex items-center gap-1 ${accent} hover:underline`}>
                    <ExternalLink className="w-3 h-3" />
                    {project.demoUrl.includes('curseforge.com') ? 'CurseForge' : 'Project page'}
                  </a>}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`text-xs inline-flex items-center gap-1 font-mono transition-colors ${
                        isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {projects.length === 0 && (
            <div
              className={`p-12 text-center rounded-xl border ${
                isDarkMode ? 'bg-[#242b3b]/50 border-slate-700/80 text-slate-300' : 'bg-white border-slate-200 text-slate-500'
              }`}
            >
              <Terminal className="w-8 h-8 mx-auto mb-2 text-slate-400" />
              <p className="text-sm font-semibold">No technical projects listed yet.</p>
              {isOwner && (
                <button
                  onClick={handleCreateNewClick}
                  className="mt-3 px-4 py-1.5 text-xs font-semibold text-slate-950 bg-amber-300 rounded-lg hover:bg-amber-200 transition-colors"
                >
                  Add First Project
                </button>
              )}
            </div>
          )}
        </div>

        {/* Sidebar: Popular Repositories on GitHub */}
        <div className="repo-sidebar w-full lg:w-80 xl:w-96 shrink-0 lg:sticky lg:top-24">
          <PopularReposWidget isDarkMode={isDarkMode} />
        </div>
      </div>

      {/* Project Modal Deep Dive */}
      {activeProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`rounded-xl shadow-2xl max-w-2xl w-full border overflow-hidden ${
            isDarkMode ? 'bg-[#242b3b] border-slate-700/80 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className={`px-6 py-4 border-b flex items-center justify-between ${
              isDarkMode ? 'bg-[#1e2430] border-slate-700/80' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-lg border ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                }`}>
                  {getProjectIcon(activeProject.id)}
                </div>
                <div>
                  <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {activeProject.title}
                  </h3>
                  <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {activeProject.roleSubtitle} · {activeProject.period}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isOwner && (
                  <button
                    onClick={() => {
                      setProjectToEdit(activeProject);
                      setIsEditorOpen(true);
                      setSelectedProjectId(null);
                    }}
                    className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded border transition-colors ${
                      isDarkMode
                        ? 'text-amber-300 bg-amber-950/40 border-amber-800/60 hover:bg-amber-900/60'
                        : 'text-amber-800 bg-amber-50 border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                )}
                <button
                  onClick={() => setSelectedProjectId(null)}
                  className={`text-xs font-medium px-2 py-1 rounded transition-colors ${
                    isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700/60' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Close
                </button>
              </div>
            </div>

            <div className={`p-6 space-y-4 text-xs leading-relaxed ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
              <div>
                <h4 className={`font-bold text-xs uppercase tracking-wider mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Tools & technologies
                </h4>
                <p className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                  {activeProject.stack.join(' · ')}
                </p>
              </div>

              <div>
                <h4 className={`font-bold text-xs uppercase tracking-wider mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Overview
                </h4>
                <p>{activeProject.summary}</p>
              </div>

              <div>
                <h4 className={`font-bold text-xs uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  What I worked on
                </h4>
                <ul className="list-disc pl-4 space-y-2">
                  {activeProject.accomplishments.map((bullet, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              {activeProject.demoUrl && <a href={activeProject.demoUrl} target="_blank" rel="noreferrer"
                className={`inline-flex items-center gap-1.5 text-sm ${accent} hover:underline`}>
                <ExternalLink className="w-4 h-4" />
                {activeProject.demoUrl.includes('curseforge.com') ? 'View on CurseForge' : 'Visit project page'}
              </a>}
              {activeProject.githubUrl && (
                <div className="pt-2">
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium ${accent} bg-amber-950/30 border border-amber-800/40 hover:bg-amber-900/40 transition-colors`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View GitHub Repository: {activeProject.githubUrl}</span>
                  </a>
                </div>
              )}
            </div>

            <div className={`px-6 py-3 border-t flex justify-end ${
              isDarkMode ? 'bg-[#1e2430] border-slate-700/80' : 'bg-slate-50 border-slate-200'
            }`}>
              <button
                onClick={() => setSelectedProjectId(null)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  isDarkMode ? 'bg-amber-300 text-slate-950 hover:bg-amber-200' : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                Close Project Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Editor Modal (Owner Admin tool) */}
      {isOwner && onSaveProject && (
        <ProjectEditorModal
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          projectToEdit={projectToEdit}
          onSaveProject={onSaveProject}
          onDeleteProject={onDeleteProject}
          isDarkMode={isDarkMode}
        />
      )}
    </section>
  );
};
