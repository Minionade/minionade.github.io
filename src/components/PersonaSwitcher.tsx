import React from 'react';
import { Persona, ThemeId } from '../types';
import { Copy, Check, ShieldCheck, CheckCircle, Edit3, LogOut } from 'lucide-react';

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
  onLogout: () => void;
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
  onLogout,
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
    { id: 'slate', label: 'Slate Titanium', color: 'bg-slate-800' },
    { id: 'navy', label: 'Navy Executive', color: 'bg-blue-900' },
    { id: 'emerald', label: 'Forest Emerald', color: 'bg-emerald-900' },
    { id: 'charcoal', label: 'Monochrome', color: 'bg-neutral-900' },
  ];

  return (
    <div className="bg-slate-900 text-white border-b border-slate-800 py-3.5 px-4 sm:px-6 lg:px-8 no-print transition-all shadow-md">
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Admin Header Line */}
        <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Owner Mode Active</span>
            </span>
            <span className="text-slate-400 hidden sm:inline">
              Only you see this toolbar. Visitors see the clean finished resume.
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenEditor}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
              title="Open Resume Content Customizer"
            >
              <Edit3 className="w-3.5 h-3.5 text-blue-400" />
              <span>Edit Resume Content</span>
            </button>
            <button
              onClick={onOpenAts}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800/60 rounded-md transition-colors"
              title="Audit resume against applicant tracking systems"
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Run ATS Scanner</span>
            </button>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-md transition-colors ml-1"
              title="Lock Admin Session and hide this toolbar"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lock Owner Session</span>
            </button>
          </div>
        </div>

        {/* Row: Target Role & Display Options */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap shrink-0 mr-1">
              Select Target Role:
            </span>
            <div className="flex items-center gap-1.5 p-1 bg-slate-800 rounded-lg shrink-0">
              {personas.map((p) => {
                const isActive = currentPersona === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => onSelectPersona(p.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Density, Palette, Plain text */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            {/* Spacing Density */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium">Page Fit / Density:</span>
              <div className="flex items-center p-0.5 bg-slate-800 rounded-md">
                {(['compact', 'standard', 'spacious'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => onSelectFontSize(size)}
                    className={`px-2 py-1 rounded capitalize ${
                      fontSize === size ? 'bg-slate-700 font-semibold text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Palette */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium">Accent Palette:</span>
              <div className="flex items-center gap-1">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onSelectTheme(t.id)}
                    className={`w-4 h-4 rounded-full ${t.color} border border-slate-600 transition-all ${
                      theme === t.id ? 'ring-2 ring-blue-400 ring-offset-1 ring-offset-slate-900 scale-110' : 'opacity-60 hover:opacity-100'
                    }`}
                    title={t.label}
                    aria-label={t.label}
                  />
                ))}
              </div>
            </div>

            {/* Copy Plain Text ATS */}
            <button
              onClick={onCopyPlainText}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
              title="Copy plain text formatted for job application boards"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-medium">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Plain Text Resume</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sub-bar: Active persona description & Section toggles */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-2 gap-2">
          <div>
            <span className="font-medium text-slate-300">Preset Focus: </span>
            <span>{personas.find((p) => p.id === currentPersona)?.desc}</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-500">Toggle Resume Sections:</span>
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
                  visibleSections[key] ? 'text-blue-400 font-medium' : 'text-slate-600 line-through'
                }`}
                title={`Toggle ${label} visibility`}
              >
                <span>{visibleSections[key] ? `Hide ${label}` : `Show ${label}`}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
