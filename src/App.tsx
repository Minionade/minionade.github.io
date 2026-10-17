import React, { useState, useEffect } from 'react';
import { BlogPost, Persona, ResumeData, ThemeId } from './types';
import { BLOG_POSTS, INITIAL_RESUME_DATA } from './data/initialData';
import { Navbar } from './components/Navbar';
import { PersonaSwitcher } from './components/PersonaSwitcher';
import { ResumeDocument } from './components/ResumeDocument';
import { ResumeEditorModal } from './components/ResumeEditorModal';
import { AtsAuditorModal } from './components/AtsAuditorModal';
import { GitHubAuthModal, GitHubUser } from './components/GitHubAuthModal';
import { ProjectsSection } from './components/ProjectsSection';
import { BlogSection } from './components/BlogSection';
import { Github, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'resume' | 'projects' | 'blog'>('resume');

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
  const [copied, setCopied] = useState(false);
  const [hasCustomEdits, setHasCustomEdits] = useState(false);

  // GitHub User authentication state (saved in browser, zero hardcoded passwords)
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

  const isOwner = Boolean(gitHubUser?.isOwner);

  const [visibleSections, setVisibleSections] = useState({
    summary: true,
    skills: true,
    projects: true,
    experience: true,
    education: true,
  });

  // Load resume data from localStorage or initial state
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem('trevor_resume_data_v5');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_RESUME_DATA;
  });

  // Blog posts state with persistence
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('trevor_blog_posts_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return BLOG_POSTS;
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

  const handleSaveData = (newData: ResumeData) => {
    setResumeData(newData);
    try {
      localStorage.setItem('trevor_resume_data_v5', JSON.stringify(newData));
    } catch {
      // ignore
    }
  };

  const handleSaveBlogPost = (post: BlogPost) => {
    setBlogPosts((prev) => {
      const exists = prev.some((p) => p.id === post.id);
      const updated = exists
        ? prev.map((p) => (p.id === post.id ? post : p))
        : [post, ...prev];
      try {
        localStorage.setItem('trevor_blog_posts_v1', JSON.stringify(updated));
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
        localStorage.setItem('trevor_blog_posts_v1', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleToggleSection = (section: keyof typeof visibleSections) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePrint = () => {
    if (activeTab !== 'resume') {
      setActiveTab('resume');
      setTimeout(() => {
        window.print();
      }, 150);
    } else {
      window.print();
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

    text += `PROFESSIONAL SUMMARY\n`;
    text += `${summary}\n\n`;

    text += `CORE COMPETENCIES\n`;
    skills.forEach((g) => {
      text += `• ${g.category}: ${g.items.join(', ')}\n`;
    });
    text += `\n`;

    text += `ENGINEERING & TECHNICAL PROJECTS\n`;
    resumeData.projects.forEach((p) => {
      text += `${p.title} (${p.period})\n`;
      text += `Role: ${p.roleSubtitle} | Technologies: ${p.stack.join(', ')}\n`;
      p.accomplishments.forEach((b) => {
        text += `  • ${b}\n`;
      });
      text += `\n`;
    });

    text += `PROFESSIONAL EXPERIENCE\n`;
    resumeData.experience.forEach((e) => {
      text += `${e.role} - ${e.company}, ${e.location} (${e.period})\n`;
      e.highlights.forEach((h) => {
        text += `  • ${h}\n`;
      });
      text += `\n`;
    });

    text += `EDUCATION\n`;
    text += `${resumeData.education.degree}\n`;
    text += `${resumeData.education.institution}, ${resumeData.education.location} (${resumeData.education.year})\n`;
    if (resumeData.education.notes) {
      text += `${resumeData.education.notes}\n`;
    }

    return text;
  };

  const handleCopyPlainText = async () => {
    const text = generatePlainTextResume();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
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
          : 'bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900'
      }`}
    >
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onPrint={handlePrint}
        onOpenEditor={() => setIsEditorOpen(true)}
        onOpenAts={() => setIsAtsOpen(true)}
        onOpenGitHubAuth={() => setIsGitHubModalOpen(true)}
        gitHubUser={gitHubUser}
        hasCustomEdits={hasCustomEdits}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'resume' && (
          <div className="space-y-6">
            {/* Interactive Persona, Target Role, Density & Palette Customizer */}
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
              isDarkMode={isDarkMode}
            />

            {/* Resume Sheet Canvas with subtle drafting container */}
            <div className="py-6 px-3 sm:px-6 lg:px-8 max-w-5xl mx-auto">
              <ResumeDocument
                data={resumeData}
                persona={currentPersona}
                theme={theme}
                fontSize={fontSize}
                visibleSections={visibleSections}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <ProjectsSection projects={resumeData.projects} isDarkMode={isDarkMode} />
        )}

        {activeTab === 'blog' && (
          <BlogSection
            posts={blogPosts}
            onSavePost={handleSaveBlogPost}
            onDeletePost={handleDeleteBlogPost}
            isOwner={isOwner}
            isDarkMode={isDarkMode}
          />
        )}
      </main>

      {/* Footer */}
      <footer
        className={`border-t py-6 px-4 text-center text-xs no-print space-y-3 transition-colors ${
          isDarkMode
            ? 'bg-[#1e2430] border-slate-700/80 text-slate-400'
            : 'bg-white border-slate-200 text-slate-500'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {resumeData.profile.name}
            </span>
            <span aria-hidden="true" className={isDarkMode ? 'text-slate-600' : 'text-slate-300'}>
              ·
            </span>
            <span>{resumeData.profile.location}</span>
            <span aria-hidden="true" className={isDarkMode ? 'text-slate-600' : 'text-slate-300'}>
              ·
            </span>
            <a
              href={`mailto:${resumeData.profile.email}`}
              className={`transition-colors ${
                isDarkMode ? 'text-slate-300 hover:text-blue-400' : 'text-slate-700 hover:text-blue-600'
              }`}
            >
              {resumeData.profile.email}
            </a>
            <span aria-hidden="true" className={isDarkMode ? 'text-slate-600' : 'text-slate-300'}>
              ·
            </span>
            <a
              href="https://github.com/minionade"
              target="_blank"
              rel="noreferrer"
              className={`font-mono transition-colors ${
                isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              github.com/minionade
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setActiveTab('resume')}
              className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}
            >
              Resume
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}
            >
              Blog
            </button>

            {/* GitHub Sign-In status */}
            <button
              onClick={() => setIsGitHubModalOpen(true)}
              className={`inline-flex items-center gap-1.5 transition-colors ${
                isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Sign in with GitHub (Ctrl+Shift+G)"
            >
              <Github className="w-3.5 h-3.5" />
              {gitHubUser ? (
                <span className="font-mono text-emerald-400 font-medium">@{gitHubUser.login}</span>
              ) : (
                <span>GitHub Sign-In</span>
              )}
            </button>
          </div>
        </div>
      </footer>

      {/* Editor Modal for Resume */}
      <ResumeEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        data={resumeData}
        onSave={handleSaveData}
        currentPersona={currentPersona}
        isDarkMode={isDarkMode}
      />

      {/* ATS Readability Auditor Modal */}
      <AtsAuditorModal
        isOpen={isAtsOpen}
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
    </div>
  );
}
