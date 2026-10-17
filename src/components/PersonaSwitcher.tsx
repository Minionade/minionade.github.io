import React from 'react';
import { Persona, ThemeId } from '../types';
import { Copy, Check, CheckCircle, Edit3, SlidersHorizontal } from 'lucide-react';

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
  const personas: { id: Persona; label: string; tag: string }[] = [
    {
      id: 'hybrid',
      label: 'Hybrid Focus',
      tag: 'Software + Systems + Ops',
    },
    {
      id: 'gamedev',
      label: 'Game & Engine Dev',
      tag: 'C# Engine & Architecture',
    },
    {
      id: 'hardware',
      label: 'IT & Hardware Tech',
      tag: 'PC Builds & Diagnostics',
    },
    {
      id: 'equipment',
      label: 'Equipment & Grounds',
      tag: 'Heavy Machinery & Fleet',
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
      className={`rounded-xl border no-print transition-colors shadow-xs p-3.5 sm:p-4 space-y-3 ${
        isDarkMode
          ? 'bg-[#242b3b] border-slate-700/80 text-slate-100'
          : 'bg-[#faf8f4] border-[#e2ddd3] text-stone-900'
      }`}
    >
      {/* Row 1: Header / Admin Quick Actions */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b ${
        isDarkMode ? 'border-slate-700/40' : 'border-[#e8e3d8]'
      }`}>
        <div className="flex items-center gap-2">
          <span className={`p-1 rounded shrink-0 ${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-800'}`}>
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </span>
          <span className="text-xs font-bold tracking-tight">Resume Admin Controls</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onOpenEditor}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors ${
              isDarkMode
                ? 'text-blue-300 bg-blue-950/40 hover:bg-blue-900/60 border-blue-800/60'
                : 'text-stone-800 bg-[#eee9df] hover:bg-[#e4ded2] border-[#d8d0c2]'
            }`}
            title="Edit resume text and details"
          >
            <Edit3 className="w-3.5 h-3.5 text-blue-500" />
            <span>Edit Resume</span>
          </button>



          <button
            onClick={onOpenAts}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors ${
              isDarkMode
                ? 'text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/60 border-emerald-800/60'
                : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border-emerald-200'
            }`}
            title="Audit against ATS keyword scanners"
          >
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span>ATS Scanner</span>
          </button>

          <button
            onClick={onCopyPlainText}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors ${
              isDarkMode
                ? 'text-slate-200 bg-[#1e2430] hover:bg-slate-700/70 border-slate-700/70'
                : 'text-stone-700 bg-[#f3efe6] hover:bg-[#e8e2d6] border-[#dad2c4]'
            }`}
            title="Copy plain text formatted for job application boards"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-500" />
                <span>Copy Text</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Row 2: Target Role Selector Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {personas.map((p) => {
          const isActive = currentPersona === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelectPersona(p.id)}
              className={`p-2 rounded-lg border text-left transition-all ${
                isActive
                  ? isDarkMode
                    ? 'bg-blue-600/20 border-blue-500 text-white shadow-xs'
                    : 'bg-blue-50 border-blue-500 text-blue-950 shadow-xs'
                  : isDarkMode
                  ? 'bg-[#1e2430] border-slate-700/70 text-slate-300 hover:border-slate-600 hover:bg-[#202736]'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="font-bold text-xs truncate">{p.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />}
              </div>
              <span className={`block text-[10px] mt-0.5 truncate ${isActive ? 'text-blue-300 font-medium' : 'text-slate-400'}`}>
                {p.tag}
              </span>
            </button>
          );
        })}
      </div>

      {/* Row 3: Document Spacing, Accent Palette & Section Toggles */}
      <div
        className={`pt-2.5 border-t flex flex-wrap items-center justify-between gap-3 text-xs ${
          isDarkMode ? 'border-slate-700/40' : 'border-slate-100'
        }`}
      >
        {/* Fit / Spacing and Theme Accent */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Density scale */}
          <div className="flex items-center gap-1.5">
            <span className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Fit:</span>
            <div className={`flex items-center p-0.5 rounded-md ${isDarkMode ? 'bg-[#1e2430]' : 'bg-slate-100'}`}>
              {(['compact', 'standard', 'spacious'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => onSelectFontSize(size)}
                  className={`px-2 py-0.5 rounded text-[11px] capitalize transition-colors ${
                    fontSize === size
                      ? isDarkMode
                        ? 'bg-slate-700 font-semibold text-white shadow-xs'
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

          {/* Accent palette */}
          <div className="flex items-center gap-1.5">
            <span className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Accent:</span>
            <div className="flex items-center gap-1.5">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onSelectTheme(t.id)}
                  className={`w-3.5 h-3.5 rounded-full ${t.color} border border-slate-500 transition-all ${
                    theme === t.id
                      ? 'ring-2 ring-blue-400 ring-offset-1 scale-110 ' +
                        (isDarkMode ? 'ring-offset-[#242b3b]' : 'ring-offset-white')
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  title={t.label}
                  aria-label={t.label}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Section visibility toggles */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Sections:</span>
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
              className={`px-2 py-0.5 rounded text-[11px] border transition-colors ${
                visibleSections[key]
                  ? isDarkMode
                    ? 'bg-blue-950/40 border-blue-800/60 text-blue-300 font-medium'
                    : 'bg-blue-50 border-blue-200 text-blue-700 font-medium'
                  : isDarkMode
                  ? 'bg-[#1e2430] border-slate-700/60 text-slate-500 line-through'
                  : 'bg-slate-100 border-slate-200 text-slate-400 line-through'
              }`}
              title={`Toggle ${label} visibility`}
            >
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
