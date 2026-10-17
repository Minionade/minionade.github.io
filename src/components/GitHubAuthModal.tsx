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

  const [authMethod, setAuthMethod] = useState<'username' | 'token'>('username');
  const [usernameInput, setUsernameInput] = useState(OWNER_USERNAME);
  const [tokenInput, setTokenInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleUsernameAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    const targetUser = usernameInput.trim();

    if (!targetUser) {
      setErrorMsg('Please enter a GitHub username');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(targetUser)}`);
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error(`GitHub user "${targetUser}" not found`);
        }
        throw new Error(`GitHub API error (${res.status}): Please try again`);
      }

      const data = await res.json();
      const isOwner = data.login.toLowerCase() === OWNER_USERNAME.toLowerCase();

      const user: GitHubUser = {
        login: data.login,
        name: data.name || data.login,
        avatar_url: data.avatar_url,
        bio: data.bio || '',
        html_url: data.html_url,
        isOwner,
      };

      onLogin(user);
      setSuccessMsg(isOwner ? 'Welcome back Trevor! Verified as repository owner.' : `Signed in as @${data.login}`);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to authenticate with GitHub');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTokenAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    const token = tokenInput.trim();

    if (!token) {
      setErrorMsg('Please enter your GitHub Personal Access Token');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Invalid or expired GitHub token. Please verify token permissions (read:user).');
        }
        throw new Error(`GitHub API returned status ${res.status}`);
      }

      const data = await res.json();
      const isOwner = data.login.toLowerCase() === OWNER_USERNAME.toLowerCase();

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
      setSuccessMsg(isOwner ? 'Cryptographically verified as repository owner!' : `Authenticated as @${data.login}`);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to authenticate token with GitHub');
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
              <h2 className="text-base font-bold">GitHub Sign-In</h2>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Public repository safe · Zero stored passwords
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
        <div className="p-6 space-y-5 text-sm">
          {currentUser ? (
            /* Signed in state */
            <div className="space-y-4">
              <div
                className={`p-4 rounded-xl border flex items-center gap-3.5 ${
                  currentUser.isOwner
                    ? isDarkMode
                      ? 'bg-emerald-950/40 border-emerald-800/60'
                      : 'bg-emerald-50 border-emerald-200'
                    : isDarkMode
                    ? 'bg-slate-800/80 border-slate-700'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <img
                  src={currentUser.avatar_url}
                  alt={currentUser.login}
                  className="w-12 h-12 rounded-full border border-slate-600 shadow-xs"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-sm truncate">{currentUser.name || currentUser.login}</span>
                    {currentUser.isOwner && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <ShieldCheck className="w-3 h-3" />
                        Verified Owner
                      </span>
                    )}
                  </div>
                  <a
                    href={currentUser.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className={`text-xs font-mono flex items-center gap-1 mt-0.5 hover:underline ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}
                  >
                    <span>@{currentUser.login}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  {currentUser.bio && (
                    <p className={`text-[11px] truncate mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {currentUser.bio}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`text-xs p-3 rounded-lg ${
                  isDarkMode ? 'bg-slate-800/70 text-slate-300' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {currentUser.isOwner ? (
                  <p>
                    You are authenticated as <strong>@{currentUser.login}</strong>. All editing features, resume
                    customizations, and blog management tools are unlocked.
                  </p>
                ) : (
                  <p>
                    You are signed in with GitHub as <strong>@{currentUser.login}</strong>. Public portfolio features
                    are available.
                  </p>
                )}
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
              {/* Method tabs */}
              <div className="flex border-b border-slate-700/60 text-xs">
                <button
                  type="button"
                  onClick={() => setAuthMethod('username')}
                  className={`flex-1 pb-2 font-medium border-b-2 transition-colors ${
                    authMethod === 'username'
                      ? 'border-blue-500 text-blue-400 font-semibold'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Quick Sign-In (Username)
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('token')}
                  className={`flex-1 pb-2 font-medium border-b-2 transition-colors ${
                    authMethod === 'token'
                      ? 'border-blue-500 text-blue-400 font-semibold'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Verified Token (PAT)
                </button>
              </div>

              {authMethod === 'username' ? (
                <form onSubmit={handleUsernameAuth} className="space-y-3.5">
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      GitHub Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        @
                      </div>
                      <input
                        type="text"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        placeholder="Minionade"
                        className={`w-full pl-7 pr-3 py-2 text-xs rounded-lg border outline-none font-mono transition-colors ${
                          isDarkMode
                            ? 'bg-[#1e2430] border-slate-700 text-slate-100 focus:border-blue-500'
                            : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                        }`}
                      />
                    </div>
                    <p className={`text-[11px] mt-1.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Fetches live profile data from GitHub. The repository owner account is <strong>@minionade</strong>.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg transition-colors shadow-xs"
                  >
                    <Github className="w-4 h-4" />
                    <span>{isLoading ? 'Verifying with GitHub...' : 'Sign in as @' + (usernameInput || 'user')}</span>
                  </button>
                </form>
              ) : (
                <form onSubmit={handleTokenAuth} className="space-y-3.5">
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      GitHub Personal Access Token (PAT)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <KeyRound className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="password"
                        value={tokenInput}
                        onChange={(e) => setTokenInput(e.target.value)}
                        placeholder="github_pat_..."
                        className={`w-full pl-8 pr-3 py-2 text-xs rounded-lg border outline-none font-mono transition-colors ${
                          isDarkMode
                            ? 'bg-[#1e2430] border-slate-700 text-slate-100 focus:border-blue-500'
                            : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                        }`}
                      />
                    </div>
                    <p className={`text-[11px] mt-1.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Stored only in your browser session. Verifies your identity directly with GitHub API. Requires only{' '}
                      <code>read:user</code> scope.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg transition-colors shadow-xs"
                  >
                    <Github className="w-4 h-4" />
                    <span>{isLoading ? 'Authenticating...' : 'Authenticate Token with GitHub'}</span>
                  </button>
                </form>
              )}

              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{successMsg}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div
          className={`px-6 py-3 border-t text-[11px] flex items-center justify-between ${
            isDarkMode ? 'bg-[#1e2430] border-slate-700/80 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
          }`}
        >
          <span>Target repo: github.com/minionade</span>
          <a
            href="https://github.com/settings/tokens"
            target="_blank"
            rel="noreferrer"
            className="hover:underline text-blue-400 inline-flex items-center gap-1"
          >
            <span>GitHub Tokens</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
