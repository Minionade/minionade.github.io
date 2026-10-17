import React from 'react';
import {
  Download,
  Edit3,
  CheckCircle,
  Github,
  ShieldCheck,
  Sun,
  Moon,
  Eye,
  EyeOff,
  ExternalLink,
  UploadCloud,
  LogOut,
  RefreshCw,
  Check,
  Printer,
} from 'lucide-react';
import { GitHubUser } from './GitHubAuthModal';

export type NavTab = 'resume' | 'projects' | 'blog' | 'art';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onDownloadPdf: () => void;
  onPrint?: () => void;
  onOpenEditor: () => void;
  onOpenAts: () => void;
  onOpenGitHubAuth: () => void;
  onSaveChanges: () => void;
  onRequestLogout: () => void;
  isDeploying?: boolean;
  deploySuccess?: boolean;
  gitHubUser: GitHubUser | null;
  hasCustomEdits: boolean;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isPreviewMode?: boolean;
  onTogglePreviewMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onDownloadPdf,
  onPrint,
  onOpenEditor,
  onOpenAts,
  onOpenGitHubAuth,
  onSaveChanges,
  onRequestLogout,
  isDeploying = false,
  deploySuccess = false,
  gitHubUser,
  hasCustomEdits,
  isDarkMode,
  onToggleDarkMode,
  isPreviewMode = false,
  onTogglePreviewMode,
}) => {
  const isOwner = Boolean(gitHubUser?.isOwner);
  const showAdminTools = isOwner && !isPreviewMode;

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md border-b no-print transition-colors ${
        isDarkMode
          ? 'bg-[#181e2b]/95 border-slate-700/80 text-slate-100'
          : 'bg-white/95 border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-4">
        {/* Zone 1: Standout Graphic Brand Title + Authenticator / Preview Badge */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Distinctive Graphic Brand Emblem using the uploaded site icon */}
          <button
            onClick={() => setActiveTab('resume')}
            className={`group text-left flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl border transition-all duration-200 ${
              isDarkMode
                ? 'bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/90 border-slate-700/80 hover:border-blue-500/60 shadow-sm shadow-black/40'
                : 'bg-gradient-to-r from-slate-50 via-white to-slate-50 border-slate-200 hover:border-blue-400 shadow-xs'
            }`}
            title="Trevor Barrett / Minionade • Systems & Creative Portfolio"
          >
            {/* Custom Channel Icon */}
            <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-slate-950 shadow-xs border border-slate-700 shrink-0">
              <img
                src="./channel_icon.png"
                alt="Minionade"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image path differs
                  const target = e.target as HTMLImageElement;
                  if (!target.src.endsWith('/public/channel_icon.png')) {
                    target.src = '/public/channel_icon.png';
                  }
                }}
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-slate-950" />
            </div>

            {/* Graphic Title & Subtitle */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-sm sm:text-base font-extrabold tracking-tight leading-tight transition-colors ${
                    isDarkMode
                      ? 'text-white group-hover:text-blue-300'
                      : 'text-slate-900 group-hover:text-blue-600'
                  }`}
                >
                  Trevor Barrett
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-mono font-bold tracking-wider px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Minionade
                </span>
                <span className="text-[9px] text-slate-400 hidden xl:inline font-mono">dev</span>
              </div>
            </div>
          </button>

          {/* Verified Owner Badge with integrated Visitor Preview Mode Toggle */}
          {isOwner && (
            <div
              className={`flex items-center gap-1.5 p-1 rounded-lg border transition-all ${
                isPreviewMode
                  ? isDarkMode
                    ? 'bg-amber-950/30 border-amber-800/60'
                    : 'bg-amber-50 border-amber-200'
                  : isDarkMode
                  ? 'bg-[#1e2430] border-slate-700/80'
                  : 'bg-slate-100 border-slate-200'
              }`}
            >
              <div
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  isPreviewMode
                    ? isDarkMode
                      ? 'text-amber-300'
                      : 'text-amber-800'
                    : isDarkMode
                    ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/80'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                <ShieldCheck className={`w-3.5 h-3.5 ${isPreviewMode ? 'text-amber-400' : 'text-emerald-400'}`} />
                <span className="hidden sm:inline">{isPreviewMode ? 'Visitor Preview' : 'Verified Owner'}</span>
                <span className="sm:hidden">{isPreviewMode ? 'Preview' : 'Owner'}</span>
              </div>

              {onTogglePreviewMode && (
                <button
                  onClick={onTogglePreviewMode}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                    isPreviewMode
                      ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 font-semibold shadow-xs'
                      : isDarkMode
                      ? 'text-slate-300 hover:text-white bg-slate-700/60 hover:bg-slate-600/70 border border-slate-600/60'
                      : 'text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-50 border border-slate-200'
                  }`}
                  title={
                    isPreviewMode
                      ? 'Currently previewing as public visitor. Click to exit preview and return to owner mode.'
                      : 'Toggle Preview Mode: see exactly what public visitors see with all admin tools hidden.'
                  }
                >
                  {isPreviewMode ? (
                    <>
                      <Eye className="w-3 h-3" />
                      <span>Exit Preview</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3 h-3 text-slate-400" />
                      <span>Preview</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Zone 2: Navigation Links (Resume, Projects, Art Portfolio, Blog) */}
        <nav
          className={`hidden md:flex items-center gap-5 lg:gap-6 text-sm font-medium ${
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
            Resume
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
            Projects
          </button>
          <button
            onClick={() => setActiveTab('art')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative flex items-center gap-1.5 ${
              activeTab === 'art'
                ? isDarkMode
                  ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-400'
                  : 'text-slate-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-600'
                : isDarkMode
                ? 'hover:text-white'
                : 'hover:text-slate-900'
            }`}
          >
            <span>Art Portfolio</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
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
            Blog
          </button>

          {/* ATS Scanner - Visible only when owner is logged in and not in preview */}
          {showAdminTools && (
            <button
              onClick={onOpenAts}
              className={`whitespace-nowrap shrink-0 font-semibold transition-colors flex items-center gap-1.5 ${
                isDarkMode ? 'text-emerald-300 hover:text-emerald-200' : 'text-emerald-700 hover:text-emerald-900'
              }`}
              title="Open ATS Readability Scanner"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>ATS Scanner</span>
            </button>
          )}
        </nav>

        {/* Zone 3: Primary Action & Tools */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* GitHub Profile Button/Widget */}
          <a
            href="https://github.com/minionade"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              isDarkMode
                ? 'bg-slate-800/90 hover:bg-slate-700/90 border-slate-700/90 text-slate-100 hover:text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800 shadow-xs'
            }`}
            title="Visit Minionade on GitHub"
          >
            <Github className="w-3.5 h-3.5 text-slate-200" />
            <span className="hidden sm:inline">GitHub</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          {/* Dark / Light Mode Switcher */}
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

          {/* Edit Resume Button - Visible only when owner is logged in and not in preview */}
          {showAdminTools && (
            <button
              onClick={onOpenEditor}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                isDarkMode
                  ? 'text-slate-200 bg-slate-700/70 hover:bg-slate-600/80 border border-slate-600/50'
                  : 'text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200'
              }`}
              title="Edit resume content"
            >
              <Edit3 className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Edit Resume</span>
              {hasCustomEdits && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" title="Custom edits active" />
              )}
            </button>
          )}

          {/* GitHub Sign-In Block with Save Changes & Log Out sub-buttons */}
          {gitHubUser ? (
            <div
              className={`flex items-center gap-1 sm:gap-1.5 p-1 rounded-xl border transition-all ${
                isDarkMode
                  ? 'bg-slate-800/80 border-slate-700/90 shadow-sm'
                  : 'bg-slate-100 border-slate-300 shadow-xs'
              }`}
            >
              {/* Profile sub-button */}
              <button
                onClick={onOpenGitHubAuth}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-slate-700/50 transition-colors text-xs"
                title={`Signed in as @${gitHubUser.login} (Click to view account)`}
              >
                <img
                  src={gitHubUser.avatar_url}
                  alt={gitHubUser.login}
                  className="w-4 h-4 rounded-full border border-slate-500 shrink-0"
                />
                <span className="font-mono text-[11px] font-semibold hidden lg:inline">@{gitHubUser.login}</span>
              </button>

              {/* Save Changes sub-button (deploys directly to GitHub Pages) */}
              <button
                onClick={onSaveChanges}
                disabled={isDeploying}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all shadow-xs ${
                  deploySuccess
                    ? 'bg-emerald-600 text-white'
                    : isDeploying
                    ? 'bg-blue-600/80 text-white cursor-wait'
                    : hasCustomEdits
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold'
                    : isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                title="Save changes and deploy directly to GitHub Pages"
              >
                {isDeploying ? (
                  <RefreshCw className="w-3 h-3 animate-spin shrink-0" />
                ) : deploySuccess ? (
                  <Check className="w-3 h-3 text-white shrink-0" />
                ) : (
                  <UploadCloud className="w-3 h-3 shrink-0" />
                )}
                <span>{isDeploying ? 'Deploying...' : deploySuccess ? 'Deployed!' : 'Save Changes'}</span>
              </button>

              {/* Log Out sub-button with warning modal trigger */}
              <button
                onClick={onRequestLogout}
                className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isDarkMode
                    ? 'text-slate-400 hover:text-red-400 hover:bg-red-950/40'
                    : 'text-slate-500 hover:text-red-600 hover:bg-red-50'
                }`}
                title="Log out of GitHub account"
                aria-label="Log out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenGitHubAuth}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                isDarkMode
                  ? 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
              }`}
              title="Sign in with GitHub Personal Access Token for Admin Access"
            >
              <Github className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}

          {/* Download Built Resume PDF Button */}
          <div className="flex items-center gap-1">
            <button
              onClick={onDownloadPdf}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0 ${
                isDarkMode
                  ? 'text-white bg-blue-600 hover:bg-blue-500 shadow-blue-900/30'
                  : 'text-white bg-slate-900 hover:bg-slate-800'
              }`}
              title="Download executive built resume PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>

            {onPrint && (
              <button
                onClick={onPrint}
                className={`hidden xl:inline-flex p-1.5 text-xs rounded-lg border transition-colors ${
                  isDarkMode
                    ? 'border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'
                    : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title="Open browser print preview"
              >
                <Printer className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile nav row */}
      <div
        className={`md:hidden flex items-center justify-around border-t px-2 py-2 text-xs font-medium ${
          isDarkMode
            ? 'bg-[#181e2b] border-slate-700/80 text-slate-300'
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
          onClick={() => setActiveTab('art')}
          className={activeTab === 'art' ? (isDarkMode ? 'text-amber-400 font-bold' : 'text-amber-600 font-bold') : ''}
        >
          Art
        </button>
        <button
          onClick={() => setActiveTab('blog')}
          className={activeTab === 'blog' ? (isDarkMode ? 'text-white font-bold' : 'text-blue-600 font-bold') : ''}
        >
          Blog
        </button>
        {showAdminTools && (
          <button onClick={onOpenAts} className="text-emerald-400 font-bold">
            ATS
          </button>
        )}
      </div>
    </header>
  );
};
