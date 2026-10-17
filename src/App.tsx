import React, { useState, useEffect } from 'react';
import { ArtworkItem, BlogPost, Persona, ProjectItem, ResumeData, ThemeId } from './types';
import { BLOG_POSTS, INITIAL_RESUME_DATA } from './data/initialData';
import { INITIAL_ARTWORKS } from './data/artData';
import { LandingPage } from './components/LandingPage';
import { SocialLinks } from './components/SocialLinks';
import { Navbar, NavTab } from './components/Navbar';
import { PersonaSwitcher } from './components/PersonaSwitcher';
import { ResumeDocument } from './components/ResumeDocument';
import { ResumeEditorModal } from './components/ResumeEditorModal';
import { AtsAuditorModal } from './components/AtsAuditorModal';
import { GitHubAuthModal, GitHubUser } from './components/GitHubAuthModal';
import { ConfirmModal } from './components/ConfirmModal';
import { ProjectsSection } from './components/ProjectsSection';
import { BlogSection } from './components/BlogSection';
import { ArtPortfolioSection } from './components/ArtPortfolioSection';
import { PrintPreviewModal } from './components/PrintPreviewModal';
import { loadResumeData, RESUME_STORAGE_KEY } from './utils/resumeStorage';
import { generateResumePdf } from './utils/generateResumePdf';
import { deployToGitHubPages, DeployResult } from './utils/githubDeployService';
import { Github, ShieldCheck, CheckCircle2, AlertTriangle, ExternalLink, X } from 'lucide-react';

export default function App() {
  const [activeTab, updateActiveTab] = useState<NavTab>('home');
  const setActiveTab = (tab: NavTab) => { window.location.hash = tab; };

  useEffect(() => {
    const syncRoute = () => {
      const route = window.location.hash.slice(1) || 'home';
      const tab = route.startsWith('resume-') ? 'resume' : route;
      updateActiveTab(['home', 'resume', 'projects', 'art', 'blog'].includes(tab) ? tab as NavTab : 'home');
      requestAnimationFrame(() => {
        if (route.startsWith('resume-')) document.getElementById(route)?.scrollIntoView({ block: 'start' });
        else window.scrollTo(0, 0);
      });
    };
    syncRoute();
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  // Dark Mode state: DEFAULT IS TRUE (Softened Dark Mode by default)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('trevor_dark_mode');
      if (saved !== null) return saved === 'true';
    } catch {
      // ignore
    }
    return true;
  });

  // Load saved default configuration
  const [currentPersona, setCurrentPersona] = useState<Persona>(() => {
    try {
      return (localStorage.getItem('trevor_saved_persona') as Persona) || 'hybrid';
    } catch {
      return 'hybrid';
    }
  });

  const [theme, setTheme] = useState<ThemeId>(() => {
    try {
      return (localStorage.getItem('trevor_saved_theme') as ThemeId) || 'slate';
    } catch {
      return 'slate';
    }
  });

  const [fontSize, setFontSize] = useState<'compact' | 'standard' | 'spacious'>(() => {
    try {
      return (localStorage.getItem('trevor_saved_font_size') as any) || 'standard';
    } catch {
      return 'standard';
    }
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isAtsOpen, setIsAtsOpen] = useState(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const [isLogoutWarningOpen, setIsLogoutWarningOpen] = useState(false);
  const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasCustomEdits, setHasCustomEdits] = useState(false);

  // Deploy to GitHub Pages state
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploySuccess, setDeploySuccess] = useState(false);
  const [deployFeedback, setDeployFeedback] = useState<DeployResult | null>(null);

  // GitHub User authentication state
  const [gitHubUser, setGitHubUser] = useState<GitHubUser | null>(() => {
    try {
      const saved = localStorage.getItem('trevor_github_user_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return null;
  });

  // Owner status
  const isOwner = Boolean(gitHubUser?.isOwner);

  // Preview Mode: Allows owner to preview the site as a regular visitor
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('trevor_preview_mode') === 'true';
    } catch {
      return false;
    }
  });

  const showAdminTools = isOwner && !isPreviewMode;

  const [visibleSections, setVisibleSections] = useState({
    summary: true,
    skills: true,
    projects: true,
    experience: true,
    education: true,
  });

  const handleTogglePreviewMode = () => {
    setIsPreviewMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('trevor_preview_mode', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Load resume data from localStorage or initial state
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      return loadResumeData(localStorage, INITIAL_RESUME_DATA);
    } catch {
      // ignore
    }
    return INITIAL_RESUME_DATA;
  });

  // Blog posts state with persistence (clean v2 without placeholders)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      // Clean up legacy v1 storage if needed
      localStorage.removeItem('trevor_blog_posts_v1');
      const saved = localStorage.getItem('trevor_blog_posts_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return BLOG_POSTS;
  });

  // Art portfolio artworks state with persistence (clean v2 without placeholders)
  const [artworks, setArtworks] = useState<ArtworkItem[]>(() => {
    try {
      // Clean up legacy v1 storage if needed
      localStorage.removeItem('trevor_artworks_v1');
      const saved = localStorage.getItem('trevor_artworks_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_ARTWORKS;
  });

  // Track if custom edits differ from initial
  useEffect(() => {
    setHasCustomEdits(JSON.stringify(resumeData) !== JSON.stringify(INITIAL_RESUME_DATA));
  }, [resumeData]);

  // Keyboard shortcut Ctrl+Shift+G or Cmd+Shift+G / Ctrl+Shift+A to open GitHub Auth Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'G' || e.key === 'g' || e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsGitHubModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('trevor_dark_mode', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleSelectPersona = (p: Persona) => {
    setCurrentPersona(p);
    try {
      localStorage.setItem('trevor_saved_persona', p);
    } catch {
      // ignore
    }
  };

  const handleSelectTheme = (t: ThemeId) => {
    setTheme(t);
    try {
      localStorage.setItem('trevor_saved_theme', t);
    } catch {
      // ignore
    }
  };

  const handleSelectFontSize = (size: 'compact' | 'standard' | 'spacious') => {
    setFontSize(size);
    try {
      localStorage.setItem('trevor_saved_font_size', size);
    } catch {
      // ignore
    }
  };

  const handleGitHubLogin = (user: GitHubUser) => {
    setGitHubUser(user);
    try {
      localStorage.setItem('trevor_github_user_v1', JSON.stringify(user));
    } catch {
      // ignore
    }
  };

  const handleGitHubLogout = () => {
    setGitHubUser(null);
    try {
      localStorage.removeItem('trevor_github_user_v1');
    } catch {
      // ignore
    }
  };

  const handleRequestLogout = () => {
    setIsLogoutWarningOpen(true);
  };

  const handleConfirmLogout = () => {
    handleGitHubLogout();
    setIsLogoutWarningOpen(false);
  };

  const handleSaveData = (newData: ResumeData) => {
    setResumeData(newData);
    try {
      localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(newData));
    } catch {
      // ignore
    }
  };

  const handleSaveProject = (project: ProjectItem) => {
    setResumeData((prev) => {
      const portfolio = prev.portfolioProjects || prev.projects;
      const exists = portfolio.some((p) => p.id === project.id);
      const updated = exists
        ? portfolio.map((p) => (p.id === project.id ? project : p))
        : [project, ...portfolio];
      const nextData = { ...prev, portfolioProjects: updated };
      try {
        localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(nextData));
      } catch {
        // ignore
      }
      return nextData;
    });
  };

  const handleDeleteProject = (projectId: string) => {
    setResumeData((prev) => {
      const updated = (prev.portfolioProjects || prev.projects).filter((p) => p.id !== projectId);
      const nextData = { ...prev, portfolioProjects: updated };
      try {
        localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(nextData));
      } catch {
        // ignore
      }
      return nextData;
    });
  };

  const handleSaveBlogPost = (post: BlogPost) => {
    setBlogPosts((prev) => {
      const exists = prev.some((p) => p.id === post.id);
      const updated = exists
        ? prev.map((p) => (p.id === post.id ? post : p))
        : [post, ...prev];
      try {
        localStorage.setItem('trevor_blog_posts_v2', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleDeleteBlogPost = (postId: string) => {
    setBlogPosts((prev) => {
      const updated = prev.filter((p) => p.id !== postId);
      try {
        localStorage.setItem('trevor_blog_posts_v2', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleUpdateArtworks = (updated: ArtworkItem[]) => {
    setArtworks(updated);
    try {
      localStorage.setItem('trevor_artworks_v2', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleResetArtworks = () => {
    setArtworks(INITIAL_ARTWORKS);
    try {
      localStorage.setItem('trevor_artworks_v2', JSON.stringify(INITIAL_ARTWORKS));
    } catch {
      // ignore
    }
  };

  const handleToggleSection = (section: keyof typeof visibleSections) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Download executive built resume PDF using jsPDF
  const handleDownloadPdf = () => {
    generateResumePdf({
      data: resumeData,
      persona: currentPersona,
      visibleSections,
    });
  };

  const handlePrint = () => {
    setIsPrintPreviewOpen(true);
  };

  // Save changes and deploy directly to GitHub Pages
  const handleSaveChangesAndDeploy = async () => {
    // 1. Persist everything locally
    try {
      localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(resumeData));
      localStorage.setItem('trevor_blog_posts_v2', JSON.stringify(blogPosts));
      localStorage.setItem('trevor_artworks_v2', JSON.stringify(artworks));
    } catch {
      // ignore
    }

    // 2. If user is signed in with token, deploy directly to GitHub Pages
    if (!gitHubUser || !gitHubUser.token) {
      setDeployFeedback({
        success: false,
        message: 'GitHub Token Required to Deploy',
        details: 'To deploy directly to your GitHub Page, please sign in with a GitHub Personal Access Token that has repo or workflow permissions.',
      });
      setIsGitHubModalOpen(true);
      return;
    }

    setIsDeploying(true);
    setDeployFeedback(null);

    const payload = {
      resumeData,
      blogPosts,
      artworks,
      savedAt: new Date().toISOString(),
    };

    const result = await deployToGitHubPages(gitHubUser.token, payload, 'minionade', 'minionade.github.io');

    setIsDeploying(false);
    setDeployFeedback(result);

    if (result.success) {
      setDeploySuccess(true);
      setTimeout(() => setDeploySuccess(false), 4000);
      setHasCustomEdits(false);
    }
  };

  // Plain-text generator for ATS portals
  const generatePlainTextResume = () => {
    const summary = resumeData.summaryByPersona[currentPersona] || resumeData.summaryByPersona.hybrid;
    const skills = resumeData.skillsByPersona[currentPersona] || resumeData.skillsByPersona.hybrid;

    let text = `${resumeData.profile.name.toUpperCase()}\n`;
    text += `${resumeData.profile.location} | ${resumeData.profile.phone} | ${resumeData.profile.email}`;
    if (resumeData.profile.github) text += ` | https://${resumeData.profile.github.replace(/^https?:\/\//, '')}`;
    text += `\n\n`;

    text += `PROFILE\n`;
    text += `${summary}\n\n`;

    text += `SKILLS\n`;
    skills.forEach((g) => {
      text += `• ${g.category}: ${g.items.join(', ')}\n`;
    });
    text += `\n`;

    text += `PERSONAL PROJECTS\n`;
    resumeData.projects.forEach((p) => {
      text += `${p.title} (${p.period})\n`;
      text += `Role: ${p.roleSubtitle} | Technologies: ${p.stack.join(', ')}\n`;
      p.accomplishments.forEach((b) => {
        text += `  • ${b}\n`;
      });
      text += `\n`;
    });

    text += `WORK EXPERIENCE\n`;
    resumeData.experience.forEach((e) => {
      text += `${e.role} - ${e.company}, ${e.location} (${e.period})\n`;
      e.highlights.forEach((h) => {
        text += `  • ${h}\n`;
      });
      text += `\n`;
    });

    text += `EDUCATION\n`;
    text += `${resumeData.education.degree}\n`;
    text += `${resumeData.education.institution} - ${resumeData.education.location} (${resumeData.education.year})\n`;
    if (resumeData.education.notes) text += `${resumeData.education.notes}\n`;

    return text;
  };

  const handleCopyPlainText = () => {
    const text = generatePlainTextResume();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors ${
        isDarkMode
          ? 'bg-[#1e2430] text-slate-100 selection:bg-blue-600/30 selection:text-blue-200'
          : 'bg-[#f5f2ec] text-stone-900 selection:bg-amber-200/50 selection:text-stone-900'
      }`}
    >
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onDownloadPdf={handleDownloadPdf}
        onPrintPreview={() => setIsPrintPreviewOpen(true)}
        onPrint={() => setIsPrintPreviewOpen(true)}
        onOpenEditor={() => setIsEditorOpen(true)}
        onOpenAts={() => setIsAtsOpen(true)}
        onOpenGitHubAuth={() => setIsGitHubModalOpen(true)}
        onSaveChanges={handleSaveChangesAndDeploy}
        onRequestLogout={handleRequestLogout}
        isDeploying={isDeploying}
        deploySuccess={deploySuccess}
        gitHubUser={gitHubUser}
        hasCustomEdits={hasCustomEdits}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        isPreviewMode={isPreviewMode}
        onTogglePreviewMode={handleTogglePreviewMode}
      />

      {/* Deployment Notification Banner / Toast */}
      {deployFeedback && (
        <aside
          aria-label="Deployment status notification"
          className={`mx-auto max-w-4xl w-[94%] mt-3 p-3.5 rounded-xl border flex items-start justify-between gap-3 shadow-lg animate-in slide-in-from-top-2 duration-300 no-print ${
            deployFeedback.success
              ? 'bg-emerald-950/80 border-emerald-700/80 text-emerald-200'
              : 'bg-amber-950/80 border-amber-700/80 text-amber-200'
          }`}
        >
          <div className="flex items-start gap-2.5">
            {deployFeedback.success ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-0.5">
              <p className="font-bold text-xs sm:text-sm">{deployFeedback.message}</p>
              {deployFeedback.details && (
                <p className="text-[11px] text-slate-300 leading-relaxed">{deployFeedback.details}</p>
              )}
              {deployFeedback.workflowRunUrl && (
                <a
                  href={deployFeedback.workflowRunUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-300 hover:underline pt-0.5"
                >
                  <span>View GitHub Actions Deployment Workflow</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
          <button
            onClick={() => setDeployFeedback(null)}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors"
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        </aside>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && <LandingPage data={resumeData} artworks={artworks} isDarkMode={isDarkMode} />}
        {activeTab === 'resume' && (
          <div className="py-6 px-3 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-4">
            {/* Resume Admin Toolbar - OWNER ONLY (hidden when in preview mode) */}
            {showAdminTools && (
              <PersonaSwitcher
                currentPersona={currentPersona}
                onSelectPersona={handleSelectPersona}
                theme={theme}
                onSelectTheme={handleSelectTheme}
                fontSize={fontSize}
                onSelectFontSize={handleSelectFontSize}
                visibleSections={visibleSections}
                onToggleSection={handleToggleSection}
                onCopyPlainText={handleCopyPlainText}
                copied={copied}
                onOpenAts={() => setIsAtsOpen(true)}
                onOpenEditor={() => setIsEditorOpen(true)}
                onOpenPrintPreview={() => setIsPrintPreviewOpen(true)}
                isDarkMode={isDarkMode}
              />
            )}

            {/* Resume Sheet Canvas */}
            <ResumeDocument
              data={resumeData}
              persona={currentPersona}
              theme={theme}
              fontSize={fontSize}
              visibleSections={visibleSections}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {activeTab === 'projects' && (
          <ProjectsSection
            projects={resumeData.portfolioProjects || resumeData.projects}
            isOwner={showAdminTools}
            onSaveProject={handleSaveProject}
            onDeleteProject={handleDeleteProject}
            isDarkMode={isDarkMode}
          />
        )}

        {activeTab === 'art' && (
          <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto no-print">
            <ArtPortfolioSection
              artworks={artworks}
              onUpdateArtworks={handleUpdateArtworks}
              onResetArtworks={handleResetArtworks}
              isOwner={showAdminTools}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {activeTab === 'blog' && (
          <BlogSection
            posts={blogPosts}
            onSavePost={handleSaveBlogPost}
            onDeletePost={handleDeleteBlogPost}
            isOwner={showAdminTools}
            isDarkMode={isDarkMode}
          />
        )}
      </main>

      {activeTab !== 'resume' && <div className="hidden print-only"><ResumeDocument data={resumeData} persona={currentPersona} theme={theme} fontSize={fontSize} visibleSections={visibleSections} /></div>}
      <SocialLinks isDarkMode={isDarkMode} />
      {/* Bottom Footer */}
      <footer
        className={`border-t pt-8 pb-24 px-4 sm:px-6 lg:px-8 text-xs transition-colors no-print ${
          isDarkMode
            ? 'bg-[#181e2b] border-slate-700/80 text-slate-400'
            : 'bg-[#faf8f4] border-[#ded7ca] text-stone-600'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className={`font-semibold ${isDarkMode ? 'text-slate-300' : 'text-stone-800'}`}>Trevor Barrett</span>
            <span>•</span>
            <span>Bloomsburg, PA</span>
            <span>•</span>
            <a
              href="mailto:trevorbarrett137@gmail.com"
              className={`hover:underline ${isDarkMode ? 'text-blue-400' : 'text-amber-800'}`}
            >
              trevorbarrett137@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setActiveTab('resume')}
              className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-stone-950'}`}
            >
              Resume
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-stone-950'}`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('art')}
              className={`transition-colors ${isDarkMode ? 'hover:text-amber-300' : 'hover:text-amber-800'}`}
            >
              Art Portfolio
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-stone-950'}`}
            >
              Blog
            </button>

            {/* Discrete Account Link */}
            <button
              onClick={() => setIsGitHubModalOpen(true)}
              className={`inline-flex items-center gap-1.5 transition-colors ${
                isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-stone-500 hover:text-stone-900'
              }`}
              title={isOwner ? `Signed in as @${gitHubUser?.login}` : 'Sign in with GitHub'}
            >
              {isOwner ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-mono text-emerald-400 font-medium">@{gitHubUser?.login}</span>
                </>
              ) : (
                <>
                  <Github className="w-3.5 h-3.5 text-stone-400 dark:text-slate-400" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </div>
        </div>
      </footer>

      {/* Print & Export Preview Modal */}
      <PrintPreviewModal
        isOpen={isPrintPreviewOpen}
        onClose={() => setIsPrintPreviewOpen(false)}
        onDownloadPdf={handleDownloadPdf}
        data={resumeData}
        persona={currentPersona}
        theme={theme}
        fontSize={fontSize}
        visibleSections={visibleSections}
        isDarkMode={isDarkMode}
      />

      {/* Editor Modal for Resume - OWNER ONLY */}
      <ResumeEditorModal
        isOpen={isEditorOpen && showAdminTools}
        onClose={() => setIsEditorOpen(false)}
        data={resumeData}
        onSave={handleSaveData}
        currentPersona={currentPersona}
        isDarkMode={isDarkMode}
      />

      {/* ATS Readability Auditor Modal - OWNER ONLY */}
      <AtsAuditorModal
        isOpen={isAtsOpen && showAdminTools}
        onClose={() => setIsAtsOpen(false)}
        data={resumeData}
        persona={currentPersona}
        onCopyPlainText={handleCopyPlainText}
        copied={copied}
        isDarkMode={isDarkMode}
      />

      {/* GitHub Authentication Modal */}
      <GitHubAuthModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
        currentUser={gitHubUser}
        onLogin={handleGitHubLogin}
        onLogout={handleGitHubLogout}
        isDarkMode={isDarkMode}
      />

      {/* Sign-out Warning Confirmation Modal */}
      <ConfirmModal
        isOpen={isLogoutWarningOpen}
        title="Sign Out of GitHub"
        message="Warning: Signing out will clear your active GitHub session token from this browser. You will need to generate or enter a new GitHub Personal Access Key to sign back in. Are you sure you want to sign out?"
        confirmLabel="Yes, Sign Out"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={handleConfirmLogout}
        onCancel={() => setIsLogoutWarningOpen(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
