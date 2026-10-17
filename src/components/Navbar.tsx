import React from 'react';
import { Download, Edit3, CheckCircle, Lock, ShieldCheck, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  activeTab: 'resume' | 'projects' | 'blog';
  setActiveTab: (tab: 'resume' | 'projects' | 'blog') => void;
  onPrint: () => void;
  onOpenEditor: () => void;
  onOpenAts: () => void;
  onOpenAuth: () => void;
  hasCustomEdits: boolean;
  isOwner: boolean;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onPrint,
  onOpenEditor,
  onOpenAts,
  onOpenAuth,
  hasCustomEdits,
  isOwner,
  isDarkMode,
  onToggleDarkMode,
}) => {
  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md border-b no-print transition-colors ${
        isDarkMode
          ? 'bg-slate-950/90 border-slate-800 text-slate-100'
          : 'bg-white/95 border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6 sm:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('resume')}
            className={`text-left text-lg font-bold tracking-tight whitespace-nowrap shrink-0 transition-colors ${
              isDarkMode
                ? 'text-white hover:text-blue-400'
                : 'text-slate-900 hover:text-blue-600'
            }`}
          >
            Trevor Barrett
          </button>
          {isOwner && (
            <button
              onClick={onOpenAuth}
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold border transition-colors ${
                isDarkMode
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80 hover:bg-emerald-900/60'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
              }`}
              title="Manage Owner Session & Settings"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Owner Mode</span>
            </button>
          )}
        </div>

        {/* Zone 2: Navigation Links */}
        <nav
          className={`hidden md:flex items-center gap-7 text-sm font-medium ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          <button
            onClick={() => setActiveTab('resume')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'resume'
                ? isDarkMode
                  ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-500'
                  : 'text-slate-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                : isDarkMode
                ? 'hover:text-white'
                : 'hover:text-slate-900'
            }`}
          >
            Resume Document
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'projects'
                ? isDarkMode
                  ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-500'
                  : 'text-slate-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                : isDarkMode
                ? 'hover:text-white'
                : 'hover:text-slate-900'
            }`}
          >
            Technical Projects
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'blog'
                ? isDarkMode
                  ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-500'
                  : 'text-slate-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                : isDarkMode
                ? 'hover:text-white'
                : 'hover:text-slate-900'
            }`}
          >
            Engineering Blog
          </button>

          {/* ATS Checker is an Admin action - visible only to owner */}
          {isOwner && (
            <button
              onClick={onOpenAts}
              className={`whitespace-nowrap shrink-0 font-semibold transition-colors flex items-center gap-1.5 ${
                isDarkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-700 hover:text-emerald-900'
              }`}
              title="Open ATS Readability & Keyword Scanner"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>ATS Keyword Scanner</span>
            </button>
          )}
        </nav>

        {/* Zone 3: Primary Action & Tools */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Dark / Light Mode Switcher with clear indicator */}
          <button
            onClick={onToggleDarkMode}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              isDarkMode
                ? 'text-amber-400 hover:bg-slate-800'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme Mode"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden lg:inline text-slate-300">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-slate-600" />
                <span className="hidden lg:inline text-slate-600">Dark Mode</span>
              </>
            )}
          </button>

          {/* Admin Edit Resume Button */}
          {isOwner ? (
            <button
              onClick={onOpenEditor}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                isDarkMode
                  ? 'text-slate-200 bg-slate-800 hover:bg-slate-700'
                  : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
              }`}
              title="Open Resume Content Customizer"
            >
              <Edit3 className="w-3.5 h-3.5 text-blue-400" />
              <span>Edit Resume</span>
              {hasCustomEdits && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" title="Custom edits active" />
              )}
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isDarkMode
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
              title="Owner Login (Trevor Only - Ctrl+Shift+A)"
              aria-label="Owner Login"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Owner Login</span>
            </button>
          )}

          {/* Public & Owner Action: Download / Print PDF */}
          <button
            onClick={onPrint}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0 ${
              isDarkMode
                ? 'text-slate-950 bg-white hover:bg-slate-100'
                : 'text-white bg-slate-900 hover:bg-slate-800'
            }`}
            title="Download vector-clean PDF or Print to US Letter paper"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Resume PDF</span>
          </button>
        </div>
      </div>

      {/* Mobile nav row */}
      <div
        className={`md:hidden flex items-center justify-around border-t px-3 py-2 text-xs font-medium ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800 text-slate-400'
            : 'bg-slate-50 border-slate-100 text-slate-600'
        }`}
      >
        <button
          onClick={() => setActiveTab('resume')}
          className={activeTab === 'resume' ? (isDarkMode ? 'text-white font-bold' : 'text-blue-600 font-bold') : ''}
        >
          Resume
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={activeTab === 'projects' ? (isDarkMode ? 'text-white font-bold' : 'text-blue-600 font-bold') : ''}
        >
          Projects
        </button>
        <button
          onClick={() => setActiveTab('blog')}
          className={activeTab === 'blog' ? (isDarkMode ? 'text-white font-bold' : 'text-blue-600 font-bold') : ''}
        >
          Dev Blog
        </button>
        {isOwner ? (
          <>
            <button onClick={onOpenAts} className="text-emerald-400 font-bold">
              ATS Scanner
            </button>
            <button onClick={onOpenEditor} className="text-blue-400 font-bold">
              Edit Resume
            </button>
          </>
        ) : (
          <button onClick={onOpenAuth} className="text-slate-400 flex items-center gap-0.5">
            <Lock className="w-3 h-3" />
            <span>Owner</span>
          </button>
        )}
      </div>
    </header>
  );
};
