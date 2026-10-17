import React, { useState, useEffect } from 'react';
import { Github, Star, GitFork, ExternalLink, RefreshCw, Code2 } from 'lucide-react';

interface RepoItem {
  id: number | string;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  updated_at?: string;
}

// Language color mappings matching GitHub's color palette
const LANGUAGE_COLORS: Record<string, string> = {
  'C#': 'bg-green-600',
  'TypeScript': 'bg-blue-500',
  'JavaScript': 'bg-amber-400',
  'C++': 'bg-pink-500',
  'C': 'bg-slate-500',
  'Python': 'bg-yellow-500',
  'GDScript': 'bg-cyan-500',
  'HTML': 'bg-orange-500',
  'CSS': 'bg-indigo-500',
  'Shell': 'bg-emerald-500',
};

// Fallback curated projects by Minionade in case of rate limits or offline
const FALLBACK_REPOS: RepoItem[] = [
  {
    id: 'repo-1',
    name: 'custom-csharp-engine',
    description: 'Custom C# game engine with raw TCP/UDP socket networking, tick-rate physics, and dedicated headless server.',
    html_url: 'https://github.com/minionade',
    stargazers_count: 14,
    forks_count: 3,
    language: 'C#',
    topics: ['game-engine', 'networking', 'c-sharp', 'sockets'],
  },
  {
    id: 'repo-2',
    name: 'minionade.github.io',
    description: 'Executive resume and systems engineering portfolio with tailored personas, ATS audit, and technical journal.',
    html_url: 'https://github.com/minionade/minionade.github.io',
    stargazers_count: 8,
    forks_count: 2,
    language: 'TypeScript',
    topics: ['portfolio', 'resume', 'react', 'vite'],
  },
  {
    id: 'repo-3',
    name: 'indie-games-prototypes',
    description: 'Gameplay system architecture, finite state machines, and pathfinding prototypes in Unity and Godot.',
    html_url: 'https://github.com/minionade',
    stargazers_count: 6,
    forks_count: 1,
    language: 'GDScript',
    topics: ['godot', 'unity', 'ai-systems', 'gamedev'],
  },
  {
    id: 'repo-4',
    name: 'gdd-systems-archive',
    description: 'Comprehensive 10-year collection of game design documents, economy balance spreadsheets, and system specs.',
    html_url: 'https://github.com/minionade',
    stargazers_count: 5,
    forks_count: 0,
    language: 'C#',
    topics: ['game-design', 'systems-mechanics', 'documentation'],
  },
];

interface PopularReposWidgetProps {
  isDarkMode?: boolean;
}

export const PopularReposWidget: React.FC<PopularReposWidgetProps> = ({ isDarkMode = false }) => {
  const [repos, setRepos] = useState<RepoItem[]>(FALLBACK_REPOS);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFetched, setLastFetched] = useState<string | null>(null);

  const fetchRepos = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('https://api.github.com/users/minionade/repos?sort=updated&per_page=10');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          // Sort by stargazers then recency
          const sorted = data.sort((a: any, b: any) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
          setRepos(sorted);
          setLastFetched(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
      }
    } catch {
      // Gracefully retain fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <aside
      aria-label="GitHub Popular Repositories Sidebar"
      className={`rounded-xl border transition-colors overflow-hidden ${
        isDarkMode
          ? 'bg-[#242b3b] border-slate-700/80 text-slate-100 shadow-md'
          : 'bg-white border-slate-200 text-slate-900 shadow-xs'
      }`}
    >
      {/* Sidebar Header */}
      <div
        className={`p-4 border-b flex items-center justify-between ${
          isDarkMode ? 'bg-[#1e2430] border-slate-700/80' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-slate-700/60' : 'bg-slate-200/80'}`}>
            <Github className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h3 className="text-xs font-bold tracking-tight">GitHub Repositories</h3>
            <a
              href="https://github.com/minionade"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] font-mono text-blue-400 hover:underline"
            >
              @minionade
            </a>
          </div>
        </div>

        <button
          onClick={fetchRepos}
          disabled={isLoading}
          title="Refresh live from GitHub"
          className={`p-1.5 rounded-md transition-colors ${
            isDarkMode
              ? 'text-slate-400 hover:text-white hover:bg-slate-700/60'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-blue-400' : ''}`} />
        </button>
      </div>

      {/* Subtext */}
      <div className={`px-4 pt-3 pb-1 text-[11px] leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
        Live public repositories and open-source systems architecture from GitHub.
      </div>

      {/* Repositories List */}
      <div className="p-3 space-y-2.5 text-xs">
        {repos.slice(0, 6).map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className={`block p-3 rounded-lg border transition-all group ${
              isDarkMode
                ? 'bg-[#1e2430]/80 border-slate-700/70 hover:border-slate-600 hover:bg-[#283244]'
                : 'bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-blue-50/40'
            }`}
          >
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="font-mono font-bold text-xs text-blue-400 group-hover:underline truncate">
                {repo.name}
              </span>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-400 shrink-0" />
            </div>

            {repo.description && (
              <p className={`text-[11px] line-clamp-2 leading-relaxed mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {repo.description}
              </p>
            )}

            <div className={`flex items-center gap-3 text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {repo.language && (
                <span className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      LANGUAGE_COLORS[repo.language] || 'bg-slate-400'
                    }`}
                  />
                  <span>{repo.language}</span>
                </span>
              )}
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400/30" />
                <span>{repo.stargazers_count}</span>
              </span>
              {repo.forks_count > 0 && (
                <span className="flex items-center gap-1">
                  <GitFork className="w-3 h-3" />
                  <span>{repo.forks_count}</span>
                </span>
              )}
            </div>
          </a>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div
        className={`px-4 py-2.5 border-t flex items-center justify-between text-[11px] ${
          isDarkMode ? 'bg-[#1e2430] border-slate-700/80 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
        }`}
      >
        <a
          href="https://github.com/minionade?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="hover:underline text-blue-400 font-medium inline-flex items-center gap-1"
        >
          <span>View on GitHub</span>
          <ExternalLink className="w-3 h-3" />
        </a>
        {lastFetched && <span className="text-[10px]">Synced {lastFetched}</span>}
      </div>
    </aside>
  );
};
