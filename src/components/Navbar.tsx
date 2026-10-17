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
  onPrintPreview?: () => void;
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
  onPrintPreview,
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
  const handlePrintAction = onPrintPreview || onPrint;

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md border-b no-print transition-colors ${
        isDarkMode
          ? 'bg-[#181e2b]/95 border-slate-700/80 text-slate-100'
          : 'bg-[#faf8f4]/95 border-[#e2ddd3] text-stone-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Graphic Brand Title + GitHub Button next to Title (Desktop Only) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Distinctive Graphic Brand Emblem using the uploaded site icon */}
          <button
            onClick={() => setActiveTab('resume')}
            className={`group text-left flex items-center gap-2 px-2 py-1.5 sm:px-2.5 rounded-xl border transition-all duration-200 ${
              isDarkMode
                ? 'bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/90 border-slate-700/80 hover:border-blue-500/60 shadow-sm'
                : 'bg-gradient-to-r from-[#f4eee4] via-[#fdfcf9] to-[#f4eee4] border-[#ded7ca] hover:border-amber-600/50 shadow-xs'
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
                      : 'text-stone-900 group-hover:text-amber-800'
                  }`}
                >
                  Trevor Barrett
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-mono font-bold tracking-wider px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                  Minionade
                </span>
                <span className="text-[9px] text-stone-400 dark:text-slate-400 hidden xl:inline font-mono">dev</span>
              </div>
            </div>
          </button>

          {/* GitHub Sign-In Block with Save Changes & Log Out sub-buttons (DESKTOP ONLY, directly beside title) */}
          <div className="hidden md:flex items-center">
            {gitHubUser ? (
              <div
                className={`flex items-center gap-1 sm:gap-1.5 p-1 rounded-xl border transition-all ${
                  isDarkMode
                    ? 'bg-slate-800/80 border-slate-700/90 shadow-sm'
                    : 'bg-[#f0ebe0] border-[#ded7ca] shadow-xs'
                }`}
              >
                {/* Profile sub-button */}
                <button
                  onClick={onOpenGitHubAuth}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-black/10 dark:hover:bg-slate-700/50 transition-colors text-xs"
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
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white font-bold'
                      : isDarkMode
                      ? 'bg-blue-600 hover:bg-blue-500 text-white'
                      : 'bg-stone-800 hover:bg-stone-700 text-white'
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
                      : 'text-stone-500 hover:text-red-600 hover:bg-red-100/60'
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
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  isDarkMode
                    ? 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                    : 'bg-[#eee9df] border-[#ded7ca] text-stone-800 hover:bg-[#e4ded2]'
                }`}
                title="Sign in with GitHub Personal Access Token for Admin Access"
              >
                <Github className="w-3.5 h-3.5 text-stone-600 dark:text-slate-400" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Verified Owner Badge with integrated Visitor Preview Mode Toggle (Desktop only) */}
          {isOwner && (
            <div
              className={`hidden lg:flex items-center gap-1.5 p-1 rounded-lg border transition-all ${
                isPreviewMode
                  ? isDarkMode
                    ? 'bg-amber-950/30 border-amber-800/60'
                    : 'bg-amber-100/60 border-amber-300'
                  : isDarkMode
                  ? 'bg-[#1e2430] border-slate-700/80'
                  : 'bg-[#eee9df] border-[#ded7ca]'
              }`}
            >
              <div
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  isPreviewMode
                    ? isDarkMode
                      ? 'text-amber-300'
                      : 'text-amber-900'
                    : isDarkMode
                    ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/80'
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                }`}
              >
                <ShieldCheck className={`w-3.5 h-3.5 ${isPreviewMode ? 'text-amber-500' : 'text-emerald-600'}`} />
                <span>{isPreviewMode ? 'Visitor Preview' : 'Owner'}</span>
              </div>

              {onTogglePreviewMode && (
                <button
                  onClick={onTogglePreviewMode}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                    isPreviewMode
                      ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 font-semibold shadow-xs'
                      : isDarkMode
                      ? 'text-slate-300 hover:text-white bg-slate-700/60 hover:bg-slate-600/70 border border-slate-600/60'
                      : 'text-stone-800 hover:text-black bg-white hover:bg-stone-50 border border-stone-300'
                  }`}
                  title={
                    isPreviewMode
                      ? 'Currently previewing as public visitor. Click to exit preview and return to owner mode.'
                      : 'Toggle Preview Mode: see exactly what public visitors see.'
                  }
                >
                  {isPreviewMode ? (
                    <>
                      <Eye className="w-3 h-3" />
                      <span>Exit Preview</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3 h-3 text-stone-400" />
                      <span>Preview</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Zone 2: Navigation Links (Desktop Only: Resume, Projects, Art Portfolio, Blog) */}
        <nav
          className={`hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium ${
            isDarkMode ? 'text-slate-300' : 'text-stone-700'
          }`}
        >
          <a
            href="#resume"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('resume');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'resume'
                ? isDarkMode
                  ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-400'
                  : 'text-stone-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-700'
                : isDarkMode
                ? 'hover:text-white'
                : 'hover:text-stone-950'
            }`}
          >
            Resume
          </a>
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('projects');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'projects'
                ? isDarkMode
                  ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-400'
                  : 'text-stone-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-700'
                : isDarkMode
                ? 'hover:text-white'
                : 'hover:text-stone-950'
            }`}
          >
            Projects
          </a>
          <a
            href="#art"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('art');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative flex items-center gap-1.5 ${
              activeTab === 'art'
                ? isDarkMode
                  ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-400'
                  : 'text-stone-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-700'
                : isDarkMode
                ? 'hover:text-white'
                : 'hover:text-stone-950'
            }`}
          >
            <span>Art Portfolio</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          </a>
          <a
            href="#blog"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('blog');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'blog'
                ? isDarkMode
                  ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-400'
                  : 'text-stone-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-700'
                : isDarkMode
                ? 'hover:text-white'
                : 'hover:text-stone-950'
            }`}
          >
            Blog
          </a>

          {/* ATS Scanner - Visible only when owner is logged in and not in preview */}
          {showAdminTools && (
            <button
              onClick={onOpenAts}
              className={`whitespace-nowrap shrink-0 font-semibold transition-colors flex items-center gap-1.5 ${
                isDarkMode ? 'text-emerald-300 hover:text-emerald-200' : 'text-emerald-800 hover:text-emerald-950'
              }`}
              title="Open ATS Readability Scanner"
            >
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>ATS Scanner</span>
            </button>
          )}
        </nav>

        {/* Zone 3: Actions (Theme Toggle, Edit Resume [Desktop], Print Preview, Download PDF) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* GitHub External Link Icon Button */}
          <a
            href="https://github.com/minionade"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              isDarkMode
                ? 'bg-slate-800/90 hover:bg-slate-700/90 border-slate-700/90 text-slate-100 hover:text-white shadow-xs'
                : 'bg-[#eee9df] hover:bg-[#e4ded2] border-[#ded7ca] text-stone-800 shadow-xs'
            }`}
            title="Visit Minionade on GitHub"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </a>

          {/* Dark / Light Mode Switcher (Toasted tan in light mode) */}
          <button
            onClick={onToggleDarkMode}
            className={`inline-flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              isDarkMode
                ? 'border-slate-700 bg-slate-800/70 text-amber-300 hover:text-amber-200 hover:bg-slate-700'
                : 'border-[#ded7ca] bg-[#eee9df] text-stone-700 hover:text-stone-900 hover:bg-[#e4ded2]'
            }`}
            title={isDarkMode ? 'Switch to Toasted Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme Mode"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-300" />
                <span className="hidden xl:inline text-slate-200">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-stone-700" />
                <span className="hidden xl:inline text-stone-800">Dark Mode</span>
              </>
            )}
          </button>

          {/* Edit Resume Button (Desktop only when owner admin mode is active) */}
          {showAdminTools && (
            <button
              onClick={onOpenEditor}
              className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                isDarkMode
                  ? 'text-slate-200 bg-slate-700/70 hover:bg-slate-600/80 border border-slate-600/50'
                  : 'text-stone-800 bg-[#eee9df] hover:bg-[#e4ded2] border border-[#ded7ca]'
              }`}
              title="Edit resume content"
            >
              <Edit3 className="w-3.5 h-3.5 text-blue-500" />
              <span>Edit Resume</span>
              {hasCustomEdits && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" title="Custom edits active" />
              )}
            </button>
          )}

          {/* Print Preview Button - opens PrintPreviewModal */}
          {handlePrintAction && (
            <button
              onClick={handlePrintAction}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors shadow-xs whitespace-nowrap shrink-0 ${
                isDarkMode
                  ? 'border-slate-700 bg-slate-800/80 text-slate-200 hover:text-white hover:bg-slate-700'
                  : 'border-[#cfc6b6] bg-[#fdfcf9] text-stone-800 hover:bg-[#ede7dc] hover:text-stone-950'
              }`}
              title="Open full print and export preview modal"
            >
              <Printer className="w-3.5 h-3.5 text-stone-600 dark:text-blue-400" />
              <span className="hidden sm:inline">Print Preview</span>
              <span className="sm:hidden text-[11px]">Preview</span>
            </button>
          )}

          {/* Download Built Resume PDF Button */}
          <button
            onClick={onDownloadPdf}
            className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0 ${
              isDarkMode
                ? 'text-white bg-blue-600 hover:bg-blue-500 shadow-blue-900/30'
                : 'text-white bg-stone-900 hover:bg-stone-800 shadow-stone-800/20'
            }`}
            title="Download executive built resume PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden text-[11px]">PDF</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Row (Clean, dedicated tab row; no sign-in or admin clutter) */}
      <div
        className={`md:hidden flex items-center justify-around border-t px-2 py-2 text-xs font-medium ${
          isDarkMode
            ? 'bg-[#181e2b] border-slate-700/80 text-slate-300'
            : 'bg-[#f4efe6] border-[#ded7ca] text-stone-700'
        }`}
      >
        <a
          href="#resume"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('resume');
          }}
          className={`px-3 py-1 rounded-md transition-colors ${
            activeTab === 'resume'
              ? isDarkMode
                ? 'text-white font-bold bg-slate-800'
                : 'text-stone-950 font-bold bg-[#e6dfd1]'
              : ''
          }`}
        >
          Resume
        </a>
        <a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('projects');
          }}
          className={`px-3 py-1 rounded-md transition-colors ${
            activeTab === 'projects'
              ? isDarkMode
                ? 'text-white font-bold bg-slate-800'
                : 'text-stone-950 font-bold bg-[#e6dfd1]'
              : ''
          }`}
        >
          Projects
        </a>
        <a
          href="#art"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('art');
          }}
          className={`px-3 py-1 rounded-md transition-colors ${
            activeTab === 'art'
              ? isDarkMode
                ? 'text-amber-400 font-bold bg-slate-800'
                : 'text-amber-900 font-bold bg-amber-200/60'
              : ''
          }`}
        >
          Art
        </a>
        <a
          href="#blog"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('blog');
          }}
          className={`px-3 py-1 rounded-md transition-colors ${
            activeTab === 'blog'
              ? isDarkMode
                ? 'text-white font-bold bg-slate-800'
                : 'text-stone-950 font-bold bg-[#e6dfd1]'
              : ''
          }`}
        >
          Blog
        </a>
      </div>
    </header>
  );
};
