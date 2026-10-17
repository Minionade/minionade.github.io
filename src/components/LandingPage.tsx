import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { ArtworkItem, ResumeData } from '../types';

export function LandingPage({ data, artworks, isDarkMode }: { data: ResumeData; artworks: ArtworkItem[]; isDarkMode: boolean }) {
  const muted = isDarkMode ? 'text-slate-400' : 'text-stone-600';
  const border = isDarkMode ? 'border-slate-700/70' : 'border-stone-300';
  const accent = isDarkMode ? 'text-amber-300' : 'text-amber-900';
  const highlights = [
    { id: 'custom-engine', label: '01 / ENGINEERING', title: 'Building from the ground up', fallback: 'Custom engines and networked systems in C#.' },
    { id: 'indie-games-ai', label: '02 / GAMEPLAY', title: 'Systems that bring games to life', fallback: 'Gameplay prototypes, AI behaviors, and tools in Unity and Godot.' },
    { id: 'pc-building', label: '03 / HARDWARE', title: 'A hands-on approach to technology', fallback: 'PC assembly, diagnostics, and hardware troubleshooting.' },
  ];
  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 no-print">
      <section className={`pt-16 sm:pt-24 pb-12 sm:pb-16 border-b ${border}`}>
        <p className={`text-xs uppercase tracking-[0.2em] font-medium ${accent}`}>Trevor Barrett / Minionade</p>
        <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.12] max-w-3xl">Software, systems,<br />and a practical mindset.</h1>
        <p className={`mt-6 text-base sm:text-lg leading-relaxed max-w-2xl ${muted}`}>I’m {data.profile.name}, a systems programmer and technical specialist. My work connects custom game engines, multiplayer networking, and gameplay design with hands-on hardware and field experience.</p>
        <div className="mt-8 flex flex-wrap items-center gap-6 text-sm font-medium">
          <a href="#resume" className={`inline-flex items-center gap-2 border-b pb-1 ${accent} border-current`}>Explore my résumé <ArrowRight className="w-4 h-4" /></a>
          <a href={`mailto:${data.profile.email}`} className="hover:underline underline-offset-4">Get in touch <ArrowUpRight className="inline w-4 h-4" /></a>
        </div>
      </section>
      <section className="py-10 sm:py-14" aria-labelledby="selected-work-heading">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-7">
          <h2 id="selected-work-heading" className="text-xl font-semibold tracking-tight">Selected areas of work</h2>
          <span className={`text-xs ${muted}`}>A closer look, in my résumé</span>
        </div>
        <div className="grid sm:grid-cols-3 gap-8">
          {highlights.map(item => {
            const project = data.projects.find(p => p.id === item.id);
            return <a key={item.id} href={project ? `#resume-project-${project.id}` : '#resume-projects'} className={`group border-t pt-5 ${border} focus-visible:outline-2 focus-visible:outline-offset-4`}>
              <p className={`text-[10px] tracking-[0.14em] font-mono ${accent}`}>{item.label}</p>
              <h3 className="mt-3 text-lg font-medium leading-snug tracking-tight group-hover:underline underline-offset-4">{item.title} <ArrowUpRight className="inline w-4 h-4" /></h3>
              <p className={`mt-3 text-sm leading-relaxed ${muted}`}>{project?.summary || item.fallback}</p>
              {project && <p className={`mt-4 text-xs leading-relaxed ${muted}`}>{project.stack.slice(0, 3).join(' / ')}</p>}
            </a>;
          })}
        </div>
      </section>
      <section className={`border-t ${border} py-10 sm:py-14`} aria-labelledby="portfolio-preview-heading">
        <h2 id="portfolio-preview-heading" className="text-xl font-semibold tracking-tight mb-7">Explore the portfolios</h2>
        <div className="grid md:grid-cols-2 gap-10 md:gap-12">
          <div className="min-w-0">
            <div className="flex items-center justify-between gap-3 mb-5">
              <h3 className="text-base font-medium">Projects</h3>
              <a href="#projects" className={`text-xs inline-flex items-center gap-1 hover:underline ${accent}`}>View all <ArrowUpRight className="w-3.5 h-3.5" /></a>
            </div>
            <div className="space-y-5">
              {data.projects.slice(0, 2).map(project => <a key={project.id} href="#projects" className={`block border-l-2 pl-4 group ${border}`}>
                <h4 className="text-sm font-semibold leading-relaxed group-hover:underline underline-offset-4">{project.title}</h4>
                <p className={`text-xs leading-relaxed mt-1.5 line-clamp-3 ${muted}`}>{project.summary}</p>
                <p className={`mt-2 text-[11px] leading-relaxed ${accent}`}>{project.stack.slice(0, 3).join(' · ')}</p>
              </a>)}
              {data.projects.length === 0 && <p className={`text-sm ${muted}`}>New projects will appear here as they’re added.</p>}
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex items-center justify-between gap-3 mb-5">
              <h3 className="text-base font-medium">Art & visual work</h3>
              <a href="#art" className={`text-xs inline-flex items-center gap-1 hover:underline ${accent}`}>View all <ArrowUpRight className="w-3.5 h-3.5" /></a>
            </div>
            {artworks.length > 0 ? <div className="grid grid-cols-2 gap-4">
              {[...artworks].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))).slice(0, 2).map(art => <a key={art.id} href="#art" className="min-w-0 group">
                <div className={`aspect-square rounded-lg overflow-hidden border ${border} ${isDarkMode ? 'bg-slate-900/40' : 'bg-stone-200/40'}`}>
                  <img src={art.imageUrl} alt={art.title} loading="lazy" className={`w-full h-full object-contain p-2 ${art.category === 'pixel-art' ? 'image-pixelated' : ''}`} />
                </div>
                <h4 className="text-xs font-medium mt-2 break-words group-hover:underline underline-offset-4">{art.title}</h4>
                <p className={`text-[11px] mt-1 ${muted}`}>{art.category.replaceAll('-', ' ')}</p>
              </a>)}
            </div> : <a href="#art" className={`block rounded-lg border p-6 ${border} hover:border-amber-500/50 transition-colors`}>
              <p className="text-sm font-medium">Art portfolio <ArrowUpRight className="inline w-4 h-4" /></p>
              <p className={`text-xs leading-relaxed mt-2 ${muted}`}>New artwork will be featured here as it’s added to the portfolio.</p>
            </a>}
          </div>
        </div>
      </section>
      <section className={`border-t ${border} py-9 mb-8 grid sm:grid-cols-[1fr_1.5fr] gap-6`}>
        <h2 className="text-xl font-semibold tracking-tight">Beyond the code</h2>
        <div>
          <p className={`text-sm leading-relaxed ${muted}`}>Technical work extends beyond a screen. My experience includes commercial equipment operation, mechanical troubleshooting, and customer-facing roles—bringing practical problem-solving to the systems I build.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 mt-5 text-sm">
            <a className="hover:underline underline-offset-4" href="#resume-experience">Work experience ↗</a>
            <a className="hover:underline underline-offset-4" href="#resume-skills">Technical skills ↗</a>
            <a className="hover:underline underline-offset-4" href="#resume-education">Education ↗</a>
          </div>
        </div>
      </section>
    </div>
  );
}
