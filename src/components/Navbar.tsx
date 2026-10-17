import React from 'react';
import { Download, Edit3, CheckCircle, Github, ShieldCheck, Sun, Moon } from 'lucide-react';
import { GitHubUser } from './GitHubAuthModal';

interface NavbarProps {
  activeTab: 'resume' | 'projects' | 'blog';
  setActiveTab: (tab: 'resume' | 'projects' | 'blog') => void;
  onPrint: () => void;
  onOpenEditor: () => void;
  onOpenAts: () => void;
  onOpenGitHubAuth: () => void;
  gitHubUser: GitHubUser | null;
  hasCustomEdits: boolean;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onPrint,
  onOpenEditor,
  onOpenAts,
  onOpenGitHubAuth,
  gitHubUser,
  hasCustomEdits,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const isOwner = Boolean(gitHubUser?.isOwner);

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md border-b no-print transition-colors ${
        isDarkMode
          ? 'bg-[#222938]/95 border-slate-700/80 text-slate-100'
          : 'bg-white/95 border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('resume')}
            className={`text-left text-lg font-bold tracking-tight whitespace-nowrap shrink-0 transition-colors ${
              isDarkMode ? 'text-white hover:text-blue-400' : 'text-slate-900 hover:text-blue-600'
            }`}
          >
            Trevor Barrett
          </button>

          {isOwner && (
            <button
              onClick={onOpenGitHubAuth}
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold border transition-colors ${
                isDarkMode
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80 hover:bg-emerald-900/60'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
              }`}
              title="Verified GitHub Repository Owner (@minionade)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Owner</span>
            </button>
          )}
        </div>

        {/* Zone 2: Navigation Links */}
        <nav
          className={`hidden md:flex items-center gap-6 text-sm font-medium ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          <button
            onClick={() => setActiveTab('resume')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'resume'
                ? isDarkMode
                  ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-400'
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
                  ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-400'
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
                  ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-400'
                  : 'text-slate-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                : isDarkMode
                ? 'hover:text-white'
                : 'hover:text-slate-900'
            }`}
          >
            Engineering Blog
          </button>

          {/* ATS Scanner is public - great showcase for recruiters and hiring managers */}
          <button
            onClick={onOpenAts}
            className={`whitespace-nowrap shrink-0 font-semibold transition-colors flex items-center gap-1.5 ${
              isDarkMode ? 'text-emerald-300 hover:text-emerald-200' : 'text-emerald-700 hover:text-emerald-900'
            }`}
            title="Open ATS Readability & Keyword Scanner"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>ATS Scanner</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Tools */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Dark / Light Mode Switcher with soft colors */}
          <button
            onClick={onToggleDarkMode}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              isDarkMode
                ? 'text-amber-300 hover:bg-slate-700/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme Mode"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-300" />
                <span className="hidden xl:inline text-slate-200">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-slate-600" />
                <span className="hidden xl:inline text-slate-600">Dark Mode</span>
              </>
            )}
          </button>

          {/* Edit Resume Button */}
          <button
            onClick={onOpenEditor}
            className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              isDarkMode
                ? 'text-slate-200 bg-slate-700/70 hover:bg-slate-600/80 border border-slate-600/50'
                : 'text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200'
            }`}
            title="Customize resume content (saved to your browser)"
          >
            <Edit3 className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Customize</span>
            {hasCustomEdits && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" title="Custom edits active" />
            )}
          </button>

          {/* GitHub Sign-In Button */}
          {gitHubUser ? (
            <button
              onClick={onOpenGitHubAuth}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                isDarkMode
                  ? 'bg-slate-700/70 border-slate-600/80 text-slate-100 hover:bg-slate-600/80'
                  : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
              }`}
              title={`Signed in as @${gitHubUser.login} (Click to manage)`}
            >
              <img
                src={gitHubUser.avatar_url}
                alt={gitHubUser.login}
                className="w-4 h-4 rounded-full border border-slate-500"
              />
              <span className="font-mono text-[11px] hidden sm:inline">@{gitHubUser.login}</span>
            </button>
          ) : (
            <button
              onClick={onOpenGitHubAuth}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                isDarkMode
                  ? 'bg-slate-700/60 border-slate-600/70 text-slate-200 hover:bg-slate-600/80 hover:text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
              }`}
              title="Sign in with GitHub (Public repository safe)"
            >
              <Github className="w-3.5 h-3.5 text-slate-300" />
              <span className="hidden sm:inline">Sign in with GitHub</span>
              <span className="sm:hidden">GitHub</span>
            </button>
          )}

          {/* Download / Print PDF */}
          <button
            onClick={onPrint}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0 ${
              isDarkMode
                ? 'text-white bg-blue-600 hover:bg-blue-500 shadow-blue-900/30'
                : 'text-white bg-slate-900 hover:bg-slate-800'
            }`}
            title="Download vector-clean PDF or Print to US Letter paper"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PDF Resume</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </div>

      {/* Mobile nav row */}
      <div
        className={`md:hidden flex items-center justify-around border-t px-3 py-2 text-xs font-medium ${
          isDarkMode
            ? 'bg-[#1e2430] border-slate-700/80 text-slate-300'
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
        <button onClick={onOpenAts} className="text-emerald-400 font-bold">
          ATS Scanner
        </button>
      </div>
    </header>
  );
};
