import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { Terminal, Cpu, FileCode2, Wrench, ChevronRight, ExternalLink } from 'lucide-react';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  isDarkMode?: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, isDarkMode = false }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

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
      default:
        return <Wrench className="w-5 h-5 text-slate-400" />;
    }
  };

  const detailedCards = [
    ...projects,
    {
      id: 'equipment-ops',
      title: 'Commercial Equipment & Grounds Operations',
      roleSubtitle: 'Equipment Operator & Facilities Specialist',
      period: '2025 – 2026',
      stack: ['Commercial Riding Mowers', 'Mini Excavator', 'Mini Skid Steer', 'Rototiller', 'Preventative Fleet Maintenance'],
      summary:
        'Professional hands-on experience piloting heavy equipment, earthmoving machinery, and commercial riding mowers across municipal grounds and 40+ residential/commercial estates weekly.',
      accomplishments: [
        'Maintained high operational safety standards while operating zero-turn mowers, mini excavators, and mini skids (bucket and pallet fork attachments).',
        'Directly assisted municipal fleet mechanic with diagnosing small engine faults, changing oil/filters, leveling mower decks, and inspecting hydraulic lines.',
        'Executed ground grading, earthmoving, and landscape demolition projects requiring spatial coordination and physical stamina.',
      ],
    },
  ];

  const activeProject = detailedCards.find((p) => p.id === selectedProjectId);

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 no-print">
      {/* Section Header */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-500 mb-1">
          Technical Portfolio
        </div>
        <h2
          className={`text-2xl sm:text-3xl font-bold tracking-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          Engineering Initiatives & Hands-On Systems
        </h2>
        <p className={`mt-2 text-sm max-w-2xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Detailed technical breakdowns of 5+ years of custom C# game engine and server programming, AI systems in Unity & Godot, custom PC hardware builds, and commercial equipment operations.
        </p>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {detailedCards.map((project) => (
          <div
            key={project.id}
            className={`p-6 rounded-xl border transition-all flex flex-col justify-between ${
              isDarkMode
                ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-100 shadow-lg'
                : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm text-slate-900'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                    {getProjectIcon(project.id)}
                  </div>
                  <div>
                    <h3 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {project.title}
                    </h3>
                    <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {project.roleSubtitle}
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-medium whitespace-nowrap ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  {project.period}
                </span>
              </div>

              {/* Technologies unboxed list */}
              <div className={`text-xs flex flex-wrap items-center gap-1.5 pt-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {project.stack.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <span className={`font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{item}</span>
                    {idx < project.stack.length - 1 && (
                      <span aria-hidden="true" className={isDarkMode ? 'text-slate-700' : 'text-slate-300'}>·</span>
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

            <div className={`pt-4 mt-4 border-t flex items-center justify-between ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
              <button
                onClick={() => setSelectedProjectId(project.id)}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 transition-colors"
              >
                <span>View Project Architecture & Specs</span>
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
                  <span>View GitHub Repo</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Project Modal Deep Dive */}
      {activeProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`rounded-xl shadow-2xl max-w-2xl w-full border overflow-hidden ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className={`px-6 py-4 border-b flex items-center justify-between ${
              isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
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
              <button
                onClick={() => setSelectedProjectId(null)}
                className={`text-xs font-medium px-2 py-1 rounded transition-colors ${
                  isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Close (ESC)
              </button>
            </div>

            <div className={`p-6 space-y-4 text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              <div>
                <h4 className={`font-bold text-xs uppercase tracking-wider mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Architecture & Technologies
                </h4>
                <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
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
                  Detailed Accomplishments & Solutions
                </h4>
                <ul className="list-disc pl-4 space-y-2">
                  {activeProject.accomplishments.map((bullet, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={`px-6 py-3 border-t flex justify-end ${
              isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <button
                onClick={() => setSelectedProjectId(null)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  isDarkMode ? 'bg-white text-slate-950 hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                Close Project Details
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
