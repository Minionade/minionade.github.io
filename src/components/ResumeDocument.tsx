import React from 'react';
import { Persona, ResumeData, ThemeId } from '../types';

interface ResumeDocumentProps {
  data: ResumeData;
  persona: Persona;
  theme: ThemeId;
  fontSize: 'compact' | 'standard' | 'spacious';
  visibleSections: {
    summary: boolean;
    skills: boolean;
    projects: boolean;
    experience: boolean;
    education: boolean;
  };
  isDarkMode?: boolean;
}

export const ResumeDocument: React.FC<ResumeDocumentProps> = ({
  data,
  persona,
  theme,
  fontSize,
  visibleSections,
  isDarkMode = false,
}) => {
  const { profile, summaryByPersona, skillsByPersona, projects, experience, education } = data;

  // Title tailored per persona
  const getPersonaTitle = () => {
    switch (persona) {
      case 'gamedev':
        return 'Game & Systems Developer';
      case 'hardware':
        return 'PC Building & Troubleshooting';
      case 'equipment':
        return 'Grounds Maintenance & Equipment Operation';
      case 'hybrid':
      default:
        return 'Software Development & Technical Work';
    }
  };

  // Font sizing scale classes
  const fontClasses = {
    compact: {
      name: 'text-2xl',
      title: 'text-xs',
      sectionHeading: 'text-xs',
      body: 'text-[11px] leading-[1.35]',
      subBody: 'text-[10px] leading-[1.3]',
      itemTitle: 'text-xs',
      spacing: 'space-y-3',
      sectionMargin: 'mb-3',
      itemMargin: 'mb-2.5',
    },
    standard: {
      name: 'text-3xl',
      title: 'text-sm',
      sectionHeading: 'text-xs',
      body: 'text-[12.5px] leading-relaxed',
      subBody: 'text-[11px] leading-normal',
      itemTitle: 'text-[13px]',
      spacing: 'space-y-4',
      sectionMargin: 'mb-4',
      itemMargin: 'mb-3',
    },
    spacious: {
      name: 'text-3xl',
      title: 'text-sm',
      sectionHeading: 'text-sm',
      body: 'text-sm leading-relaxed',
      subBody: 'text-xs leading-normal',
      itemTitle: 'text-sm',
      spacing: 'space-y-5',
      sectionMargin: 'mb-5',
      itemMargin: 'mb-4',
    },
  }[fontSize];

  // Theme styling tokens (light mode and print-optimized defaults)
  const themeStyles = {
    slate: {
      accentText: isDarkMode ? 'text-slate-200 print:text-slate-900' : 'text-stone-900',
      divider: isDarkMode ? 'border-slate-600/70 print:border-slate-300' : 'border-[#d8d1c2]',
      metaText: isDarkMode ? 'text-slate-300 print:text-slate-600' : 'text-stone-600',
      headerBorder: isDarkMode ? 'border-slate-500/80 print:border-slate-800' : 'border-stone-800',
    },
    navy: {
      accentText: isDarkMode ? 'text-blue-400 print:text-blue-900' : 'text-blue-900',
      divider: isDarkMode ? 'border-blue-700/60 print:border-blue-200' : 'border-[#cfd8e3]',
      metaText: isDarkMode ? 'text-slate-300 print:text-slate-600' : 'text-stone-600',
      headerBorder: isDarkMode ? 'border-blue-500/70 print:border-blue-800' : 'border-blue-900',
    },
    emerald: {
      accentText: isDarkMode ? 'text-emerald-400 print:text-emerald-950' : 'text-emerald-950',
      divider: isDarkMode ? 'border-emerald-700/60 print:border-emerald-200' : 'border-[#cfdecb]',
      metaText: isDarkMode ? 'text-slate-300 print:text-slate-600' : 'text-stone-600',
      headerBorder: isDarkMode ? 'border-emerald-500/70 print:border-emerald-800' : 'border-emerald-900',
    },
    charcoal: {
      accentText: isDarkMode ? 'text-neutral-200 print:text-neutral-900' : 'text-stone-900',
      divider: isDarkMode ? 'border-neutral-600 print:border-neutral-300' : 'border-[#d4cdc0]',
      metaText: isDarkMode ? 'text-neutral-300 print:text-neutral-600' : 'text-stone-600',
      headerBorder: isDarkMode ? 'border-neutral-500 print:border-neutral-900' : 'border-stone-900',
    },
  }[theme];

  const currentSummary = summaryByPersona[persona] || summaryByPersona.hybrid;
  const currentSkills = skillsByPersona[persona] || skillsByPersona.hybrid;

  // Filter or re-order projects depending on persona
  const displayedProjects = [...projects].sort((a, b) => {
    if (persona === 'gamedev') {
      if (a.id === 'custom-engine') return -1;
      if (b.id === 'custom-engine') return 1;
      if (a.id === 'indie-games-ai') return -1;
      if (b.id === 'indie-games-ai') return 1;
    }
    if (persona === 'hardware') {
      if (a.id === 'pc-building') return -1;
      if (b.id === 'pc-building') return 1;
      if (a.id === 'custom-engine') return -1;
    }
    return 0;
  });

  return (
    <article
      id="printable-resume"
      className={`w-full max-w-[850px] mx-auto p-8 sm:p-12 transition-all font-sans print:p-0 print:border-none print:shadow-none print:bg-white print:text-slate-900 ${
        isDarkMode
          ? 'bg-[#242b3b] text-slate-100 border border-slate-700/80 shadow-xl backdrop-blur-xs'
          : 'bg-[#faf8f4] text-stone-900 border border-[#ded7ca] shadow-md'
      }`}
    >
      {/* 1. Header / Contact Block */}
      <header className={`border-b ${themeStyles.headerBorder} pb-3.5 mb-4`}>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <h1
            className={`${fontClasses.name} font-bold tracking-tight ${
              isDarkMode ? 'text-white print:text-slate-950' : 'text-slate-950'
            }`}
          >
            {profile.name}
          </h1>
          <p className={`${fontClasses.title} font-medium ${themeStyles.accentText}`}>
            {getPersonaTitle()}
          </p>
        </div>

        {/* Clean Unboxed Metadata with Typographic Separators */}
        <div
          className={`mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 ${fontClasses.subBody} ${
            isDarkMode ? 'text-slate-400 print:text-slate-600' : 'text-slate-600'
          }`}
        >
          <span>{profile.location}</span>
          <span aria-hidden="true" className={isDarkMode ? 'text-slate-700 print:text-slate-300' : 'text-slate-300'}>
            ·
          </span>
          <span>{profile.phone}</span>
          <span aria-hidden="true" className={isDarkMode ? 'text-slate-700 print:text-slate-300' : 'text-slate-300'}>
            ·
          </span>
          <a
            href={`mailto:${profile.email}`}
            className={`font-medium hover:underline print:no-underline ${
              isDarkMode ? 'text-slate-200 hover:text-white print:text-slate-800' : 'text-slate-800'
            }`}
          >
            {profile.email}
          </a>
          {profile.github && (
            <>
              <span
                aria-hidden="true"
                className={isDarkMode ? 'text-slate-700 print:text-slate-300' : 'text-slate-300'}
              >
                ·
              </span>
              <a
                href={`https://${profile.github.replace(/^https?:\/\//, '')}`}
                target="_blank"
                rel="noreferrer"
                className={`font-mono hover:underline print:no-underline ${
                  isDarkMode ? 'text-slate-200 hover:text-white print:text-slate-800' : 'text-slate-800'
                }`}
              >
                {profile.github}
              </a>
            </>
          )}
        </div>
        <a href="https://minionade.github.io" target="_blank" rel="noreferrer"
          className={`inline-block mt-2 ${fontClasses.subBody} underline underline-offset-2 ${isDarkMode ? 'text-blue-300 print:text-slate-800' : 'text-blue-800'}`}>
          https://minionade.github.io
        </a>
      </header>

      {/* 2. Professional Summary */}
      {visibleSections.summary && currentSummary && (
        <section id="resume-summary" className={`scroll-mt-28 ${fontClasses.sectionMargin}`}>
          <h2
            className={`${fontClasses.sectionHeading} font-semibold tracking-normal border-b ${themeStyles.divider} pb-1 mb-2 ${
              isDarkMode ? 'text-slate-200 print:text-slate-900' : 'text-slate-900'
            }`}
          >
            Profile
          </h2>
          <p
            className={`${fontClasses.body} text-left ${
              isDarkMode ? 'text-slate-300 print:text-slate-700' : 'text-slate-700'
            }`}
          >
            {currentSummary}
          </p>
        </section>
      )}

      {/* 3. Skills (Clean Unboxed Grouping) */}
      {visibleSections.skills && currentSkills.length > 0 && (
        <section id="resume-skills" className={`scroll-mt-28 ${fontClasses.sectionMargin}`}>
          <h2
            className={`${fontClasses.sectionHeading} font-semibold tracking-normal border-b ${themeStyles.divider} pb-1 mb-2 ${
              isDarkMode ? 'text-slate-200 print:text-slate-900' : 'text-slate-900'
            }`}
          >
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            {currentSkills.map((group, idx) => (
              <div key={idx} className={fontClasses.body}>
                <span
                  className={`font-semibold ${
                    isDarkMode ? 'text-slate-100 print:text-slate-900' : 'text-slate-900'
                  }`}
                >
                  {group.category}:{' '}
                </span>
                <span className={isDarkMode ? 'text-slate-300 print:text-slate-700' : 'text-slate-700'}>
                  {group.items.join(' · ')}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Technical & Software Projects */}
      {visibleSections.projects && displayedProjects.length > 0 && (
        <section id="resume-projects" className={`scroll-mt-28 ${fontClasses.sectionMargin}`}>
          <h2
            className={`${fontClasses.sectionHeading} font-semibold tracking-normal border-b ${themeStyles.divider} pb-1 mb-2.5 ${
              isDarkMode ? 'text-slate-200 print:text-slate-900' : 'text-slate-900'
            }`}
          >
            Personal Projects
          </h2>
          <div className="space-y-3">
            {displayedProjects.map((project) => (
              <div key={project.id} id={`resume-project-${project.id}`} className="resume-section-item scroll-mt-28">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <h3
                      className={`${fontClasses.itemTitle} font-bold ${
                        isDarkMode ? 'text-white print:text-slate-900' : 'text-slate-900'
                      }`}
                    >
                      {project.title}
                    </h3>
                    <span
                      className={`font-normal text-xs ${
                        isDarkMode ? 'text-slate-400 print:text-slate-500' : 'text-slate-500'
                      }`}
                    >
                      | {project.roleSubtitle}
                    </span>
                  </div>
                  <span
                    className={`${fontClasses.subBody} font-medium whitespace-nowrap ${
                      isDarkMode ? 'text-slate-400 print:text-slate-500' : 'text-slate-500'
                    }`}
                  >
                    {project.period}
                  </span>
                </div>

                {/* Stack line */}
                <div
                  className={`mt-0.5 ${fontClasses.subBody} ${
                    isDarkMode ? 'text-slate-400 print:text-slate-600' : 'text-slate-600'
                  }`}
                >
                  <span
                    className={`font-medium ${
                      isDarkMode ? 'text-slate-200 print:text-slate-800' : 'text-slate-800'
                    }`}
                  >
                    Tools:{' '}
                  </span>
                  <span>{project.stack.join(' · ')}</span>
                </div>

                {project.summary && <p className={`mt-2 ${fontClasses.body} ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{project.summary}</p>}

                {/* Project bullet points */}
                <ul
                  className={`mt-1.5 list-disc pl-4 space-y-1 ${fontClasses.body} ${
                    isDarkMode ? 'text-slate-300 print:text-slate-700' : 'text-slate-700'
                  }`}
                >
                  {project.accomplishments.map((bullet, bIdx) => (
                    <li key={bIdx} className="pl-0.5">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Professional Work Experience */}
      {visibleSections.experience && experience.length > 0 && (
        <section id="resume-experience" className={`scroll-mt-28 ${fontClasses.sectionMargin}`}>
          <h2
            className={`${fontClasses.sectionHeading} font-semibold tracking-normal border-b ${themeStyles.divider} pb-1 mb-2.5 ${
              isDarkMode ? 'text-slate-200 print:text-slate-900' : 'text-slate-900'
            }`}
          >
            Work Experience
          </h2>
          <div className="space-y-3">
            {experience.map((job) => (
              <div key={job.id} className="resume-section-item">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3
                      className={`${fontClasses.itemTitle} font-bold ${
                        isDarkMode ? 'text-white print:text-slate-900' : 'text-slate-900'
                      }`}
                    >
                      {job.role}
                    </h3>
                    <div
                      className={`${fontClasses.subBody} font-medium ${
                        isDarkMode ? 'text-slate-400 print:text-slate-600' : 'text-slate-600'
                      }`}
                    >
                      {job.company} · {job.location}
                    </div>
                  </div>
                  <span
                    className={`${fontClasses.subBody} font-medium whitespace-nowrap ${
                      isDarkMode ? 'text-slate-400 print:text-slate-500' : 'text-slate-500'
                    }`}
                  >
                    {job.period}
                  </span>
                </div>

                {/* Bullet points */}
                <ul
                  className={`mt-1.5 list-disc pl-4 space-y-1 ${fontClasses.body} ${
                    isDarkMode ? 'text-slate-300 print:text-slate-700' : 'text-slate-700'
                  }`}
                >
                  {job.highlights.map((bullet, hIdx) => (
                    <li key={hIdx} className="pl-0.5">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Education */}
      {visibleSections.education && education && (
        <section id="resume-education" className="resume-section-item scroll-mt-28">
          <h2
            className={`${fontClasses.sectionHeading} font-semibold tracking-normal border-b ${themeStyles.divider} pb-1 mb-2 ${
              isDarkMode ? 'text-slate-200 print:text-slate-900' : 'text-slate-900'
            }`}
          >
            Education
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <div>
              <h3
                className={`${fontClasses.itemTitle} font-bold ${
                  isDarkMode ? 'text-white print:text-slate-900' : 'text-slate-900'
                }`}
              >
                {education.degree}
              </h3>
              <div
                className={`${fontClasses.subBody} ${
                  isDarkMode ? 'text-slate-400 print:text-slate-600' : 'text-slate-600'
                }`}
              >
                {education.institution} · {education.location}
              </div>
            </div>
            <span
              className={`${fontClasses.subBody} font-medium whitespace-nowrap ${
                isDarkMode ? 'text-slate-400 print:text-slate-500' : 'text-slate-500'
              }`}
            >
              {education.year}
            </span>
          </div>
          {education.notes && (
            <p
              className={`mt-1 ${fontClasses.subBody} ${
                isDarkMode ? 'text-slate-400 print:text-slate-600' : 'text-slate-600'
              }`}
            >
              {education.notes}
            </p>
          )}
        </section>
      )}
    </article>
  );
};
