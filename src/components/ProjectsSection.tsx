import React, { useState } from 'react';
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
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
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
    if (!selectedTag) return projects;
    return projects.filter((p) =>
      p.stack?.some((s) => s.toLowerCase() === selectedTag.toLowerCase())
    );
  }, [projects, selectedTag]);

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'custom-engine':
        return <Terminal className="w-5 h-5 text-blue-400" />;
      case 'indie-games-ai':
        return <FileCode2 className="w-5 h-5 text-purple-400" />;
      case 'gdd-archive':
        return <FileCode2 className="w-5 h-5 text-amber-400" />;
      case 'pc-building':
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'equipment-ops':
        return <Wrench className="w-5 h-5 text-amber-400" />;
      default:
        return <Terminal className="w-5 h-5 text-blue-400" />;
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
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1">
            Technical Portfolio
          </div>
          <h2
            className={`text-2xl sm:text-3xl font-bold tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Engineering Initiatives & Hands-On Systems
          </h2>
          <p className={`mt-2 text-sm max-w-2xl ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Detailed technical breakdowns of custom C# game engines, socket networking, AI systems in Unity & Godot,
            custom PC hardware benchmarks, and commercial equipment operations.
          </p>
        </div>

        {isOwner && (
          <button
            onClick={handleCreateNewClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0 self-start sm:self-auto"
            title="Add a new engineering project"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Project</span>
          </button>
        )}
      </div>

      {/* Dynamic Stack Tags */}
      {dynamicTags.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] font-semibold text-stone-500 dark:text-slate-400 mr-1 shrink-0">Filter by Stack:</span>
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
              selectedTag === null
                ? isDarkMode
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-stone-900 text-white font-bold'
                : isDarkMode
                ? 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60'
                : 'bg-[#eee9df] text-stone-800 hover:bg-[#e4ded2] border border-[#ded7ca]'
            }`}
          >
            <span>All ({projects.length})</span>
          </button>
          {dynamicTags.map(({ tag, count }) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
                selectedTag === tag
                  ? isDarkMode
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'bg-stone-900 text-white font-bold shadow-xs'
                  : isDarkMode
                  ? 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60'
                  : 'bg-[#eee9df] text-stone-800 hover:bg-[#e4ded2] border border-[#ded7ca]'
              }`}
            >
              <span>{tag}</span>
              <span className="text-[9px] opacity-75">({count})</span>
            </button>
          ))}
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="text-[11px] text-blue-400 hover:underline px-2 py-0.5"
            >
              Clear Filter
            </button>
          )}
        </div>
      )}

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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-[#1e2430]' : 'bg-[#eee9df]'}`}>
                        {getProjectIcon(project.id)}
                      </div>
                      <div>
                        <h3 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
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
                                ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/60'
                                : 'text-slate-500 hover:text-blue-600 hover:bg-slate-100'
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
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 transition-colors"
                  >
                    <span>View Architecture & Specs</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

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
                  className="mt-3 px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
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
                        ? 'text-blue-300 bg-blue-950/40 border-blue-800/60 hover:bg-blue-900/60'
                        : 'text-blue-700 bg-blue-50 border-blue-200 hover:bg-blue-100'
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
                  Architecture & Technologies
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
                  Accomplishments & Solutions
                </h4>
                <ul className="list-disc pl-4 space-y-2">
                  {activeProject.accomplishments.map((bullet, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              {activeProject.githubUrl && (
                <div className="pt-2">
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-blue-400 bg-blue-950/30 border border-blue-800/40 hover:bg-blue-900/40 transition-colors"
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
                  isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-slate-900 text-white hover:bg-slate-800'
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
