import React, { useState } from 'react';
import { X, Github, CheckCircle2, AlertCircle, LogOut, KeyRound, ExternalLink, ShieldCheck } from 'lucide-react';

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  html_url: string;
  isOwner: boolean;
  token?: string;
}

interface GitHubAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: GitHubUser | null;
  onLogin: (user: GitHubUser) => void;
  onLogout: () => void;
  isDarkMode?: boolean;
}

const OWNER_USERNAME = 'minionade';

export const GitHubAuthModal: React.FC<GitHubAuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  isDarkMode = false,
}) => {
  if (!isOpen) return null;

  const [tokenInput, setTokenInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleTokenAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    const token = tokenInput.trim();

    if (!token) {
      setErrorMsg('Please enter your GitHub Personal Access Token.');
      return;
    }

    setIsLoading(true);
    try {
      // Verify identity with GitHub's API
      const res = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Invalid or expired GitHub token.');
        }
        throw new Error(`GitHub API returned status ${res.status}`);
      }

      const data = await res.json();
      const authenticatedLogin = data.login.toLowerCase();
      const isOwner = authenticatedLogin === OWNER_USERNAME.toLowerCase();

      const user: GitHubUser = {
        login: data.login,
        name: data.name || data.login,
        avatar_url: data.avatar_url,
        bio: data.bio || '',
        html_url: data.html_url,
        isOwner,
        token,
      };

      onLogin(user);
      setSuccessMsg(`Signed in as @${data.login}.`);

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to authenticate with GitHub');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 no-print">
      <div
        className={`rounded-xl shadow-2xl max-w-md w-full border overflow-hidden transition-all ${
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
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-slate-700/60' : 'bg-slate-100'}`}>
              <Github className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-base font-bold">GitHub Sign In</h2>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Sign in with your GitHub account
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded-lg transition-colors ${
              isDarkMode
                ? 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-sm">
          {currentUser ? (
            /* Signed in view */
            <div className="space-y-4">
              <div
                className={`p-4 rounded-xl border flex items-center gap-3.5 ${
                  isDarkMode
                    ? 'bg-[#1e2430] border-slate-700/70 text-slate-100'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                <img
                  src={currentUser.avatar_url}
                  alt={currentUser.login}
                  className="w-11 h-11 rounded-full border border-slate-500 shadow-xs"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-sm truncate">{currentUser.name || currentUser.login}</span>
                    {currentUser.isOwner && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <ShieldCheck className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  <a
                    href={currentUser.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono flex items-center gap-1 mt-0.5 text-blue-400 hover:underline"
                  >
                    <span>@{currentUser.login}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={onLogout}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/30 border border-red-900/40 rounded-lg transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* Sign in form */
            <div className="space-y-4">
              <form onSubmit={handleTokenAuth} className="space-y-3.5">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className={`block text-xs font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      GitHub Personal Access Token
                    </label>
                    <a
                      href="https://github.com/settings/tokens"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-blue-400 hover:underline inline-flex items-center gap-0.5"
                    >
                      <span>Get token</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <KeyRound className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="password"
                      value={tokenInput}
                      onChange={(e) => setTokenInput(e.target.value)}
                      placeholder="ghp_... or github_pat_..."
                      className={`w-full pl-8 pr-3 py-2 text-xs rounded-lg border outline-none font-mono transition-colors ${
                        isDarkMode
                          ? 'bg-[#1e2430] border-slate-700 text-slate-100 focus:border-blue-500'
                          : 'bg-white border-slate-300 text-slate-900 focus:border-blue-600'
                      }`}
                    />
                  </div>
                  <p className={`text-[11px] mt-1.5 leading-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Requires read-only <code>read:user</code> scope. The token is stored only in your local browser session.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg transition-colors shadow-xs"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>{isLoading ? 'Signing in...' : 'Sign In with GitHub'}</span>
                </button>
              </form>

              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>{successMsg}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
