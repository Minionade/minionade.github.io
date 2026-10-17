import React, { useState, useEffect, useRef } from 'react';
import { ArtworkItem } from '../types';
import { getArtworkCategories, formatArtworkCategory } from '../utils/artworkCategories';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  Palette,
  Layers,
  Wrench,
  Grid,
  Check,
  Copy,
  Download,
  Info,
} from 'lucide-react';

interface ArtworkLightboxModalProps {
  artwork: ArtworkItem | null;
  artworks: ArtworkItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelectArtwork: (art: ArtworkItem) => void;
  isDarkMode: boolean;
}

export const ArtworkLightboxModal: React.FC<ArtworkLightboxModalProps> = ({
  artwork,
  artworks,
  isOpen,
  onClose,
  onSelectArtwork,
  isDarkMode,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const imageTriggerRef = useRef<HTMLButtonElement>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !artwork) return;
      if (e.key === 'Escape') { e.preventDefault(); if (isExpanded) setIsExpanded(false); else onClose(); }
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, artwork, artworks, isExpanded, onClose, onSelectArtwork]);

  useEffect(() => {
    if (!isOpen) { setIsExpanded(false); return; }
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [isOpen]);

  useEffect(() => {
    if (!isExpanded) return;
    return () => imageTriggerRef.current?.focus();
  }, [isExpanded]);

  if (!isOpen || !artwork) return null;

  const currentIndex = artworks.findIndex((a) => a.id === artwork.id);

  const handleNext = () => {
    if (currentIndex < artworks.length - 1) {
      onSelectArtwork(artworks[currentIndex + 1]);
    } else {
      onSelectArtwork(artworks[0]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectArtwork(artworks[currentIndex - 1]);
    } else {
      onSelectArtwork(artworks[artworks.length - 1]);
    }
  };

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const isAiAssisted = Boolean(artwork.promptNotes);

  return (
    <>
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
      aria-hidden={isExpanded || undefined}
    >
      <div
        className={`relative w-full max-w-5xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[92vh] ${
          isDarkMode
            ? 'bg-[#181d28] border-slate-700/80 text-slate-100'
            : 'bg-white border-slate-300 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div
          className={`flex items-center justify-between px-4 sm:px-6 py-3.5 border-b shrink-0 ${
            isDarkMode ? 'bg-[#1c2230] border-slate-700/80' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wider max-w-[50%] truncate ${
                getArtworkCategories(artwork).includes('pixel-art')
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
              }`}
            >
              {getArtworkCategories(artwork).map(formatArtworkCategory).join(' · ')}
            </span>
            <h2 className="text-sm sm:text-base font-bold truncate">{artwork.title}</h2>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg border transition-colors ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Content: Split View */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 min-h-0">
          {/* Left Canvas Area (Visual Presentation) */}
          <div className="lg:col-span-7 bg-[#0b0e14] flex flex-col items-center justify-center p-4 sm:p-6 relative select-none min-h-[320px] lg:min-h-[460px]">
            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white/80 hover:text-white border border-white/10 transition-all z-10"
              title="Previous artwork (Left arrow)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white/80 hover:text-white border border-white/10 transition-all z-10"
              title="Next artwork (Right arrow)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Artwork Frame */}
            <button ref={imageTriggerRef} type="button" onClick={() => setIsExpanded(true)} aria-label={`Enlarge ${artwork.title}`} title="Open large image preview" className="group relative max-w-full max-h-[60vh] flex items-center justify-center rounded-lg overflow-hidden shadow-2xl border border-white/10 bg-black/40 cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="max-h-[55vh] max-w-full object-contain"
              />
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-black/80 text-white px-2.5 py-1.5 text-xs">
                <Maximize2 aria-hidden="true" className="w-3.5 h-3.5" />Enlarge
              </span>
            </button>

            <div className="mt-3 flex items-center justify-between w-full text-xs text-slate-400 px-2">
              <span>
                {currentIndex + 1} of {artworks.length}
              </span>
              <span>{artwork.resolution || 'High Resolution Raster'}</span>
              <a
                href={artwork.imageUrl}
                download={`${artwork.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.jpg`}
                className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Asset</span>
              </a>
            </div>
          </div>

          {/* Right Info Column (Story, Creation Details, Tools, Palettes) */}
          <div
            className={`lg:col-span-5 p-5 sm:p-6 overflow-y-auto space-y-5 flex flex-col justify-between ${
              isDarkMode ? 'bg-[#181d28]' : 'bg-slate-50'
            }`}
          >
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-bold tracking-tight mb-1">{artwork.title}</h3>
                <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {artwork.clientOrProject || 'Personal Works'}{artwork.year ? ` • ${artwork.year}` : ''}
                </p>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-blue-400" />
                  Overview & Design Purpose
                </h4>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {artwork.description}
                </p>
              </div>

              {/* Iterative AI & Prompt Engineering Section if applicable */}
              {isAiAssisted && artwork.promptNotes && (
                <div
                  className={`p-3.5 rounded-xl border ${
                    isDarkMode
                      ? 'bg-purple-950/20 border-purple-800/40 text-purple-200'
                      : 'bg-purple-50 border-purple-200 text-purple-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-purple-400">
                      <Sparkles className="w-3.5 h-3.5" />
                      Iterative Creation Breakdown
                    </span>
                    {artwork.iterationCycles && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {artwork.iterationCycles} Refinement Passes
                      </span>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed opacity-90">{artwork.promptNotes}</p>
                </div>
              )}

              {/* Color Palette Swatches */}
              {artwork.colorPalette && artwork.colorPalette.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-amber-400" />
                      Curated Color Palette
                    </span>
                    {copiedColor && <span className="text-emerald-400 font-mono text-[11px]">Copied {copiedColor}!</span>}
                  </h4>
                  <div className="grid grid-cols-6 gap-2">
                    {artwork.colorPalette.map((hex, i) => (
                      <button
                        key={i}
                        onClick={() => handleCopyColor(hex)}
                        className="group relative flex flex-col items-center focus:outline-none"
                        title={`Click to copy ${hex}`}
                      >
                        <div
                          className="w-full h-8 rounded-md border border-black/20 shadow-xs transition-transform group-hover:scale-105"
                          style={{ backgroundColor: hex }}
                        />
                        <span className="text-[10px] font-mono mt-1 text-slate-400 group-hover:text-blue-400">
                          {hex}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools & Workflow Badges */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-blue-400" />
                  Software & Technologies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {artwork.tools.map((tool, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
                        isDarkMode
                          ? 'bg-slate-800/80 border-slate-700 text-slate-300'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom thumbnail strip */}
            <div className="pt-4 border-t border-slate-700/40">
              <span className="text-[11px] font-semibold text-slate-400 mb-2 block">All Artworks ({artworks.length})</span>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {artworks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSelectArtwork(item)}
                    className={`relative w-12 h-12 rounded-lg overflow-hidden border shrink-0 transition-all ${
                      item.id === artwork.id
                        ? 'border-blue-500 ring-2 ring-blue-500/40 scale-105'
                        : 'border-slate-700/60 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {isExpanded && <div role="dialog" aria-modal="true" aria-label={`Large preview of ${artwork.title}`}
      className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center"
      onClick={event => { if (event.target === event.currentTarget) setIsExpanded(false); }}
      onKeyDown={event => {
        if (event.key !== 'Tab') return;
        const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button'));
        const first = buttons[0], last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }}>
      <div className="w-[90vw] h-[90dvh] flex flex-col gap-3 text-white">
        <div className="flex items-center justify-between gap-4 min-h-11 shrink-0">
          <p className="text-sm font-medium truncate">{artwork.title}</p>
          <button type="button" autoFocus onClick={() => setIsExpanded(false)} aria-label="Close large image preview"
            className="flex items-center justify-center min-w-11 min-h-11 rounded-lg bg-white/10 hover:bg-white/20 focus-visible:outline-2">
            <X aria-hidden="true" className="w-5 h-5" />
          </button>
        </div>
        <div className="relative flex-1 min-h-0">
          <img src={artwork.imageUrl} alt={artwork.title} className="w-full h-full object-contain" />
          <button type="button" onClick={handlePrev} aria-label="Previous artwork"
            className="absolute left-0 top-1/2 -translate-y-1/2 flex min-w-11 min-h-11 items-center justify-center rounded-full bg-black/70 hover:bg-black/90 text-white">
            <ChevronLeft aria-hidden="true" className="w-5 h-5" />
          </button>
          <button type="button" onClick={handleNext} aria-label="Next artwork"
            className="absolute right-0 top-1/2 -translate-y-1/2 flex min-w-11 min-h-11 items-center justify-center rounded-full bg-black/70 hover:bg-black/90 text-white">
            <ChevronRight aria-hidden="true" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>}
    </>
  );
};
