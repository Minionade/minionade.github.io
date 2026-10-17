import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, ChevronDown } from 'lucide-react';
import { artworkHref } from '../utils/routes';
import grassBlock from '../assets/images/home-grass-block.webp';
import { ArtworkItem, ResumeData } from '../types';
import { getArtworkCategories, formatArtworkCategory } from '../utils/artworkCategories';

export function LandingPage({ data, artworks, isDarkMode }: { data: ResumeData; artworks: ArtworkItem[]; isDarkMode: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeSlice, setActiveSlice] = useState(0);
  const sliceNames = ['Introduction', 'My work', 'Portfolios', 'Beyond the code'];
  const scrollToSlice = (index: number) => {
    const target = rootRef.current?.querySelectorAll<HTMLElement>('[data-landing-slice]')[index];
    target?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  };

  useEffect(() => {
    const html = document.documentElement;
    const header = document.querySelector('header');
    const previousHeight = html.style.getPropertyValue('--landing-header-height');
    const previousFooterHeight = html.style.getPropertyValue('--landing-footer-height');
    const footer = document.getElementById('site-footer');
    const measureHeader = () => {
      html.style.setProperty('--landing-header-height', `${header?.getBoundingClientRect().height || 64}px`);
      html.style.setProperty('--landing-footer-height', `${footer?.getBoundingClientRect().height || 0}px`);
    };
    html.classList.add('landing-scroll');
    measureHeader();
    const resize = new ResizeObserver(measureHeader);
    if (header) resize.observe(header);
    if (footer) resize.observe(footer);
    const sections = Array.from(rootRef.current?.querySelectorAll<HTMLElement>('[data-landing-slice]') || []);
    const slices = sections;
    const ratios = new Map<Element, number>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        ratios.set(entry.target, entry.intersectionRatio);
        // Reveal once; restarting transforms while snapping makes sections appear to jump.
        if (entry.isIntersecting) entry.target.setAttribute('data-visible', '');
      });
      const current = slices.reduce((best, slice, index) => (ratios.get(slice) || 0) > (ratios.get(slices[best]) || 0) ? index : best, 0);
      setActiveSlice(current);
    }, { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] });
    slices.forEach(slice => observer.observe(slice));
    return () => {
      observer.disconnect();
      resize.disconnect();
      html.classList.remove('landing-scroll');
      if (previousHeight) html.style.setProperty('--landing-header-height', previousHeight);
      else html.style.removeProperty('--landing-header-height');
      if (previousFooterHeight) html.style.setProperty('--landing-footer-height', previousFooterHeight);
      else html.style.removeProperty('--landing-footer-height');
    };
  }, []);

  const nextCue = (index: number) => <button type="button" onClick={() => scrollToSlice(index + 1)}
    className={`landing-scroll-cue group ${isDarkMode ? 'text-slate-400 hover:text-amber-300' : 'text-stone-600 hover:text-amber-900'}`}
    aria-label={`Scroll to ${sliceNames[index + 1]}`}>
    <span className="text-[10px] tracking-[0.15em] uppercase">{index === 0 ? 'Scroll to explore' : sliceNames[index + 1]}</span>
    <span className="landing-scroll-arrow flex h-8 w-6 items-center justify-center rounded-full border border-current/40"><ChevronDown className="h-4 w-4" /></span>
    <span className="text-[10px] tabular-nums opacity-60">{index + 1} / {sliceNames.length}</span>
  </button>;
  const muted = isDarkMode ? 'text-slate-400' : 'text-stone-600';
  const border = isDarkMode ? 'border-slate-700/70' : 'border-stone-300';
  const accent = isDarkMode ? 'text-amber-300' : 'text-amber-900';
  const portfolio = data.portfolioProjects || data.projects;
  const highlights = [
    { id: 'minecraft-mods', label: '01 / MINECRAFT', title: 'Mods & modpack development', fallback: 'Published mods, compatibility addons, and KubeJS scripting.' },
    { id: 'custom-engine', label: '02 / C#', title: 'A standalone MMO prototype', fallback: 'A tile-based C# prototype with custom network packets and its own server.' },
    { id: 'indie-games-ai', label: '03 / UNITY', title: 'Gameplay experiments', fallback: 'Movement systems, RPG mechanics, and editor tools.' },
  ];
  return (
    <div ref={rootRef} className="max-w-5xl mx-auto px-5 sm:px-8 no-print">
      <nav aria-label="Landing page sections" className={`landing-section-nav hidden md:flex ${isDarkMode ? 'text-slate-400' : 'text-stone-500'}`}>
        {sliceNames.map((name, index) => <button key={name} type="button" onClick={() => scrollToSlice(index)}
          aria-label={name} aria-current={activeSlice === index ? 'step' : undefined} title={name}
          className="flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2">
          <span className={`rounded-full border border-current transition-all ${activeSlice === index ? 'h-3 w-3 bg-current' : 'h-1.5 w-1.5'}`} />
        </button>)}
      </nav>
      <section data-landing-slice="0" className={`landing-slice border-b ${border}`}>
        <div className="landing-slice-content w-full">
        <div className="landing-illustrated-layout">
        <img src={grassBlock} alt="" aria-hidden="true" width="640" height="640" decoding="async" fetchPriority="high" className="landing-decoration" />
        <div className="min-w-0">
        <p className={`text-xs uppercase tracking-[0.2em] font-medium ${accent}`}>Trevor Barrett / Minionade</p>
        <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.12] max-w-3xl">Minecraft mods,<br />games, and experiments.</h1>
        <p className={`mt-4 text-base sm:text-lg leading-relaxed max-w-2xl ${muted}`}>I’m {data.profile.name}, a self-taught developer working on Minecraft mods, C# game prototypes, and AI-assisted projects. I like bringing old ideas into new versions and finding out what I can build next.</p>
        <div className="mt-5 flex flex-wrap items-center gap-6 text-sm font-medium">
          <a href="#resume" className={`inline-flex items-center gap-2 border-b pb-1 ${accent} border-current`}>Explore my résumé <ArrowRight className="w-4 h-4" /></a>
          <a href={`mailto:${data.profile.email}`} className="hover:underline underline-offset-4">Get in touch <ArrowUpRight className="inline w-4 h-4" /></a>
        </div>

        </div>
        </div>
        </div>
        {nextCue(0)}
      </section>
      <section data-landing-slice="1" className="landing-slice" aria-labelledby="selected-work-heading">
        <div className="landing-slice-content landing-work-content w-full">
        <div>
          <p className={`text-sm uppercase tracking-[0.2em] font-medium mb-4 ${accent}`}>Ongoing work</p>
          <h2 id="selected-work-heading" className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.12]">What I’m building.</h2>
        </div>
        <div>
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
          <span className={`text-sm ${muted}`}>A closer look, in my résumé</span>
        </div>
        <div className="grid md:grid-cols-3 gap-7 lg:gap-8">
          {highlights.map(item => {
            const project = data.projects.find(p => p.id === item.id);
            return <a key={item.id} href={project ? `#resume-project-${project.id}` : '#resume-projects'} className={`group border-t pt-5 ${border} focus-visible:outline-2 focus-visible:outline-offset-4`}>
              <p className={`text-xs tracking-[0.14em] font-mono ${accent}`}>{item.label}</p>
              <h3 className="mt-3 text-xl lg:text-2xl font-medium leading-snug tracking-tight group-hover:underline underline-offset-4">{item.title} <ArrowUpRight className="inline w-5 h-5" /></h3>
              <p className={`mt-3 text-base lg:text-lg leading-relaxed ${muted}`}>{project?.summary || item.fallback}</p>
              {project && <p className={`mt-3 text-sm leading-relaxed ${muted}`}>{project.stack.slice(0, 3).join(' / ')}</p>}
            </a>;
          })}
        </div>

        </div>
        </div>
        {nextCue(1)}
      </section>
      <section data-landing-slice="2" className={`landing-slice border-t ${border}`} aria-labelledby="portfolio-preview-heading">
        <div className="landing-slice-content w-full">
        <div className="landing-portfolio-layout">
        <div className="min-w-0">
        <h2 id="portfolio-preview-heading" className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-6">Explore the portfolios</h2>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          <div className="min-w-0">
            <div className="flex items-center justify-between gap-3 mb-3">
              <h3 className="text-xl lg:text-2xl font-medium">Projects</h3>
              <a href="#projects" className={`text-sm inline-flex items-center gap-1 hover:underline ${accent}`}>View all <ArrowUpRight className="w-3.5 h-3.5" /></a>
            </div>
            <div className="space-y-6">
              {portfolio.slice(0, 2).map(project => <a key={project.id} href="#projects" className={`block border-l-2 pl-4 group ${border}`}>
                <h4 className="text-lg lg:text-xl font-semibold leading-relaxed group-hover:underline underline-offset-4">{project.title}</h4>
                <p className={`text-base lg:text-lg leading-relaxed mt-1.5 line-clamp-3 ${muted}`}>{project.summary}</p>
                <p className={`mt-2 text-sm leading-relaxed ${accent}`}>{project.stack.slice(0, 3).join(' · ')}</p>
              </a>)}
              {portfolio.length === 0 && <p className={`text-sm ${muted}`}>New projects will appear here as they’re added.</p>}
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex items-center justify-between gap-3 mb-3">
              <h3 className="text-xl lg:text-2xl font-medium">Art & visual work</h3>
              <a href="#art" className={`text-sm inline-flex items-center gap-1 hover:underline ${accent}`}>View all <ArrowUpRight className="w-3.5 h-3.5" /></a>
            </div>
            {artworks.length > 0 ? <div className="grid grid-cols-2 gap-4">
              {[...artworks].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))).slice(0, 2).map(art => <a key={art.id} href={artworkHref(art.id)} className="min-w-0 group">
                <div className={`aspect-square rounded-lg overflow-hidden border ${border} ${isDarkMode ? 'bg-slate-900/40' : 'bg-stone-200/40'}`}>
                  <img src={art.imageUrl} alt={art.title} loading="lazy" decoding="async" className={`w-full h-full object-cover ${getArtworkCategories(art).includes('pixel-art') ? 'image-pixelated' : ''}`} />
                </div>
                <h4 className="text-base lg:text-lg font-medium mt-3 break-words group-hover:underline underline-offset-4">{art.title}</h4>
                <p className={`text-xs lg:text-sm mt-1.5 ${muted}`}>{getArtworkCategories(art).map(formatArtworkCategory).join(' · ')}</p>
              </a>)}
            </div> : <a href="#art" className={`block rounded-lg border p-4 ${border} hover:border-amber-500/50 transition-colors`}>
              <p className="text-base font-medium">Art portfolio <ArrowUpRight className="inline w-4 h-4" /></p>
              <p className={`text-base lg:text-lg leading-relaxed mt-2 ${muted}`}>New artwork will be featured here as it’s added to the portfolio.</p>
            </a>}
          </div>
        </div>

        </div>
        </div>
        </div>
        {nextCue(2)}
      </section>
      <section data-landing-slice="3" className={`landing-slice border-t ${border}`} aria-labelledby="beyond-code-heading">
        <div className="landing-slice-content landing-beyond-content w-full">
          <h2 id="beyond-code-heading" className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.12]">Beyond the code.</h2>
          <div className="landing-beyond-details min-w-0">
            <p className={`text-base sm:text-lg lg:text-xl leading-relaxed ${muted}`}>Technical work extends beyond a screen. My experience includes commercial equipment operation, mechanical troubleshooting, and customer-facing roles—bringing practical problem-solving to the systems I build.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-4 mt-6 text-base font-medium">
              <a className="inline-flex items-center gap-1.5 hover:underline underline-offset-4" href="#resume-experience">Work experience <ArrowUpRight aria-hidden="true" className="w-4 h-4" /></a>
              <a className="inline-flex items-center gap-1.5 hover:underline underline-offset-4" href="#resume-skills">Technical skills <ArrowUpRight aria-hidden="true" className="w-4 h-4" /></a>
              <a className="inline-flex items-center gap-1.5 hover:underline underline-offset-4" href="#resume-education">Education <ArrowUpRight aria-hidden="true" className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
