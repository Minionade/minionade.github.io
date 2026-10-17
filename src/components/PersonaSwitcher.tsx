import React from 'react';
import { Persona, ThemeId } from '../types';
import { Copy, Check, CheckCircle, Edit3, Sparkles } from 'lucide-react';

interface PersonaSwitcherProps {
  currentPersona: Persona;
  onSelectPersona: (persona: Persona) => void;
  theme: ThemeId;
  onSelectTheme: (theme: ThemeId) => void;
  fontSize: 'compact' | 'standard' | 'spacious';
  onSelectFontSize: (size: 'compact' | 'standard' | 'spacious') => void;
  visibleSections: {
    summary: boolean;
    skills: boolean;
    projects: boolean;
    experience: boolean;
    education: boolean;
  };
  onToggleSection: (section: 'summary' | 'skills' | 'projects' | 'experience' | 'education') => void;
  onCopyPlainText: () => void;
  copied: boolean;
  onOpenAts: () => void;
  onOpenEditor: () => void;
  isDarkMode?: boolean;
}

export const PersonaSwitcher: React.FC<PersonaSwitcherProps> = ({
  currentPersona,
  onSelectPersona,
  theme,
  onSelectTheme,
  fontSize,
  onSelectFontSize,
  visibleSections,
  onToggleSection,
  onCopyPlainText,
  copied,
  onOpenAts,
  onOpenEditor,
  isDarkMode = false,
}) => {
  const personas: { id: Persona; label: string; desc: string }[] = [
    {
      id: 'hybrid',
      label: 'Hybrid Focus',
      desc: 'Balanced software systems, hardware, and commercial machinery',
    },
    {
      id: 'gamedev',
      label: 'Game & Software Dev',
      desc: '5+ yrs C# engine/server, Unity, Godot, and 10 yrs GDDs',
    },
    {
      id: 'hardware',
      label: 'IT & Hardware Tech',
      desc: 'Custom PC assembly, BIOS, Windows diagnostics, small engine mechanics',
    },
    {
      id: 'equipment',
      label: 'Equipment & Grounds',
      desc: 'Commercial mowers, mini excavators, skid steer, and fleet maintenance',
    },
  ];

  const themes: { id: ThemeId; label: string; color: string }[] = [
    { id: 'slate', label: 'Slate Titanium', color: 'bg-slate-700' },
    { id: 'navy', label: 'Navy Executive', color: 'bg-blue-800' },
    { id: 'emerald', label: 'Forest Emerald', color: 'bg-emerald-800' },
    { id: 'charcoal', label: 'Monochrome', color: 'bg-neutral-800' },
  ];

  return (
    <div
      className={`border-b py-3 px-4 sm:px-6 lg:px-8 no-print transition-colors shadow-xs ${
        isDarkMode
          ? 'bg-[#222938] border-slate-700/80 text-slate-100'
          : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Top Control Bar: Role Selection and Quick Tools */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
            <span
              className={`text-xs font-semibold uppercase tracking-wider whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-500'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Target Role:</span>
            </span>
            <div
              className={`flex items-center gap-1 p-1 rounded-lg shrink-0 ${
                isDarkMode ? 'bg-[#1a202c]' : 'bg-slate-100'
              }`}
            >
              {personas.map((p) => {
                const isActive = currentPersona === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => onSelectPersona(p.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                      isActive
                        ? isDarkMode
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white text-slate-900 shadow-xs'
                        : isDarkMode
                        ? 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Density, Palette, Plain text */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
            {/* Spacing Density */}
            <div className="flex items-center gap-1.5">
              <span className={isDarkMode ? 'text-slate-400 font-medium' : 'text-slate-500 font-medium'}>
                Density:
              </span>
              <div
                className={`flex items-center p-0.5 rounded-md ${
                  isDarkMode ? 'bg-[#1a202c]' : 'bg-slate-100'
                }`}
              >
                {(['compact', 'standard', 'spacious'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => onSelectFontSize(size)}
                    className={`px-2 py-0.5 rounded capitalize transition-colors ${
                      fontSize === size
                        ? isDarkMode
                          ? 'bg-slate-700 font-semibold text-white'
                          : 'bg-white font-semibold text-slate-900 shadow-xs'
                        : isDarkMode
                        ? 'text-slate-400 hover:text-slate-200'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Palette */}
            <div className="flex items-center gap-1.5">
              <span className={isDarkMode ? 'text-slate-400 font-medium' : 'text-slate-500 font-medium'}>
                Palette:
              </span>
              <div className="flex items-center gap-1.5">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onSelectTheme(t.id)}
                    className={`w-4 h-4 rounded-full ${t.color} border border-slate-500 transition-all ${
                      theme === t.id
                        ? 'ring-2 ring-blue-400 ring-offset-1 scale-110 ' + (isDarkMode ? 'ring-offset-[#222938]' : 'ring-offset-white')
                        : 'opacity-60 hover:opacity-100'
                    }`}
                    title={t.label}
                    aria-label={t.label}
                  />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1.5">
              {/* ATS Scanner */}
              <button
                onClick={onOpenAts}
                className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors ${
                  isDarkMode
                    ? 'text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/60 border-emerald-800/60'
                    : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border-emerald-200'
                }`}
                title="Scan resume for ATS compliance and keywords"
              >
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>ATS Scan</span>
              </button>

              {/* Copy Plain Text ATS */}
              <button
                onClick={onCopyPlainText}
                className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-md border transition-colors ${
                  isDarkMode
                    ? 'text-slate-200 bg-[#2a3344] hover:bg-[#323d52] border-slate-600/60'
                    : 'text-slate-700 bg-slate-100 hover:bg-slate-200 border-slate-200'
                }`}
                title="Copy plain text formatted for job application boards"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Sub-bar: Active persona description & Section toggles */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between text-xs border-t pt-2 gap-2 ${
            isDarkMode ? 'text-slate-300 border-slate-700/80' : 'text-slate-600 border-slate-200'
          }`}
        >
          <div>
            <span className={isDarkMode ? 'font-medium text-slate-200' : 'font-medium text-slate-900'}>
              Active Lens:{' '}
            </span>
            <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
              {personas.find((p) => p.id === currentPersona)?.desc}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className={isDarkMode ? 'text-slate-400' : 'text-slate-400'}>Sections:</span>
            {(
              [
                ['summary', 'Summary'],
                ['skills', 'Skills'],
                ['projects', 'Projects'],
                ['experience', 'Experience'],
                ['education', 'Education'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => onToggleSection(key)}
                className={`transition-colors flex items-center gap-1 ${
                  visibleSections[key]
                    ? isDarkMode
                      ? 'text-blue-400 font-medium hover:text-blue-300'
                      : 'text-blue-600 font-medium hover:text-blue-700'
                    : isDarkMode
                    ? 'text-slate-500 line-through hover:text-slate-400'
                    : 'text-slate-400 line-through hover:text-slate-600'
                }`}
                title={`Toggle ${label} visibility`}
              >
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
