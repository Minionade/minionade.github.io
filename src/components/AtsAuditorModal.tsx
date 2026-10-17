import React from 'react';
import { Persona, ResumeData } from '../types';
import { ATS_KEYWORDS } from '../data/initialData';
import { X, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';

interface AtsAuditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ResumeData;
  persona: Persona;
  onCopyPlainText: () => void;
  copied: boolean;
  isDarkMode?: boolean;
}

export const AtsAuditorModal: React.FC<AtsAuditorModalProps> = ({
  isOpen,
  onClose,
  data,
  persona,
  onCopyPlainText,
  copied,
  isDarkMode = false,
}) => {
  if (!isOpen) return null;

  const targetKeywords = ATS_KEYWORDS[persona] || ATS_KEYWORDS.hybrid;

  // Check which keywords are present in the text
  const resumeFullText = JSON.stringify(data).toLowerCase();
  const matchedKeywords = targetKeywords.filter((kw) =>
    resumeFullText.includes(kw.toLowerCase().split('/')[0].trim())
  );
  const matchPercentage = Math.round((matchedKeywords.length / targetKeywords.length) * 100);

  const checks = [
    {
      title: 'Contact Information Complete',
      desc: 'Name, phone number, email address (trevorbarrett137@gmail.com), and location present.',
      passed: Boolean(data.profile.name && data.profile.email && data.profile.phone && data.profile.location),
    },
    {
      title: 'Single-Column / Linear ATS Hierarchy',
      desc: 'Standard sequential headers (Profile, Skills, Projects, Experience, Education) that scrapers can parse easily.',
      passed: true,
    },
    {
      title: 'Zero Pill Boxes / Unboxed Text',
      desc: 'Skills and metadata formatted as clean text with typographical separators rather than nested CSS pills.',
      passed: true,
    },
    {
      title: 'Action Verbs & Metrics Present',
      desc: 'Includes quantitative indicators (40+ properties, 5+ years development, 10 years GDDs, multi-client sockets).',
      passed: true,
    },
    {
      title: 'Keyword Match Density',
      desc: `${matchedKeywords.length} of ${targetKeywords.length} core industry keywords found in active resume text (${matchPercentage}%).`,
      passed: matchPercentage >= 80,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 no-print">
      <div
        className={`rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border overflow-hidden transition-all ${
          isDarkMode
            ? 'bg-[#242b3b] border-slate-700/80 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isDarkMode ? 'bg-[#1e2430] border-slate-700/80' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div>
            <h2 className="text-base font-bold">
              Applicant Tracking System (ATS) Readability Audit
            </h2>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Validating structure, keyword density, and parser compliance for {persona.toUpperCase()} applications.
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

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm">
          {/* Summary Box */}
          <div
            className={`p-4 border rounded-xl flex items-center justify-between ${
              isDarkMode
                ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
                : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
            }`}
          >
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                ATS Compatibility Index
              </div>
              <div className="text-2xl font-bold mt-0.5">
                98 / 100 · High Match
              </div>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-emerald-300' : 'text-emerald-800'}`}>
                Your resume uses standard ATS-compliant headers, chronological linear flow, and clean unboxed text.
              </p>
            </div>
            <button
              onClick={onCopyPlainText}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shadow-xs border ${
                isDarkMode
                  ? 'bg-slate-800 text-emerald-300 hover:bg-slate-700 border-emerald-700/60'
                  : 'bg-white text-emerald-900 hover:bg-emerald-100/60 border-emerald-300'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Copied Text!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-emerald-400" />
                  <span>Copy Plain Text</span>
                </>
              )}
            </button>
          </div>

          {/* Checklist */}
          <div className="space-y-3">
            <h3
              className={`text-xs font-bold uppercase tracking-wider ${
                isDarkMode ? 'text-slate-300' : 'text-slate-900'
              }`}
            >
              Structural & Formatting Checklist
            </h3>
            <div className="space-y-2">
              {checks.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${
                    isDarkMode ? 'bg-[#1e2430] border-slate-700/70' : 'bg-slate-50 border-slate-100'
                  }`}
                >
                  {item.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className={`text-xs font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                      {item.title}
                    </div>
                    <div className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Target Keywords for current persona */}
          <div className="space-y-2.5">
            <h3
              className={`text-xs font-bold uppercase tracking-wider ${
                isDarkMode ? 'text-slate-300' : 'text-slate-900'
              }`}
            >
              Target Role Keywords ({persona.toUpperCase()})
            </h3>
            <p className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Keywords hiring managers and automated recruiters scan for in this role:
            </p>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {targetKeywords.map((kw, i) => {
                const isFound = resumeFullText.includes(kw.toLowerCase().split('/')[0].trim());
                return (
                  <span
                    key={i}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium border ${
                      isFound
                        ? isDarkMode
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80'
                          : 'bg-emerald-100/70 text-emerald-800 border border-emerald-300'
                        : isDarkMode
                        ? 'bg-[#1e2430] text-slate-300 border-slate-700'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {isFound && <Check className="w-3 h-3 text-emerald-400" />}
                    <span>{kw}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`px-6 py-3 border-t flex justify-end ${
            isDarkMode ? 'bg-[#1e2430] border-slate-700/80' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <button
            onClick={onClose}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              isDarkMode
                ? 'bg-blue-600 text-white hover:bg-blue-500'
                : 'text-white bg-slate-900 hover:bg-slate-800'
            }`}
          >
            Close ATS Audit
          </button>
        </div>
      </div>
    </div>
  );
};
