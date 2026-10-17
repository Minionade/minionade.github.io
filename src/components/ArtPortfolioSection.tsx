import React, { useState } from 'react';
import { TagFilter } from './TagFilter';
import { ArtworkItem } from '../types';
import { getArtworkCategories, formatArtworkCategory } from '../utils/artworkCategories';
import {
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  Palette,
  Maximize2,
  Grid,
  Layers,
  Wrench,
  RotateCcw,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import { ArtworkLightboxModal } from './ArtworkLightboxModal';
import { ArtworkEditorModal } from './ArtworkEditorModal';
import { ConfirmModal } from './ConfirmModal';

interface ArtPortfolioSectionProps {
  artworks: ArtworkItem[];
  onUpdateArtworks: (artworks: ArtworkItem[]) => void;
  onResetArtworks: () => void;
  isOwner: boolean;
  isDarkMode: boolean;
}

export const ArtPortfolioSection: React.FC<ArtPortfolioSectionProps> = ({
  artworks,
  onUpdateArtworks,
  onResetArtworks,
  isOwner,
  isDarkMode,
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkItem | null>(null);
  const [editingArtwork, setEditingArtwork] = useState<ArtworkItem | null>(null);
  const [artworkToDelete, setArtworkToDelete] = useState<ArtworkItem | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [showIterativePhilosophy, setShowIterativePhilosophy] = useState(false);

  const artworkTags = (art: ArtworkItem) => [...new Set([
    ...getArtworkCategories(art).map(formatArtworkCategory), ...(art.tools || []), ...(art.tags || []),
  ].map(tag => tag.trim()).filter(Boolean))];
  const dynamicTags = React.useMemo(() => {
    const counts = new Map<string, number>();
    artworks.forEach(art => artworkTags(art).forEach(tag => counts.set(tag, (counts.get(tag) || 0) + 1)));
    return [...counts].map(([tag, count]) => ({tag, count}));
  }, [artworks]);
  const filteredArtworks = React.useMemo(() => artworks.filter(art =>
    !selectedTags.length || artworkTags(art).some(tag => selectedTags.includes(tag))
  ), [artworks, selectedTags]);

  const handleSaveArtwork = (savedArt: ArtworkItem) => {
    const exists = artworks.some((a) => a.id === savedArt.id);
    if (exists) {
      onUpdateArtworks(artworks.map((a) => (a.id === savedArt.id ? savedArt : a)));
    } else {
      onUpdateArtworks([savedArt, ...artworks]);
    }
  };

  const handleDeleteArtwork = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const item = artworks.find((a) => a.id === id);
    if (item) {
      setArtworkToDelete(item);
    }
  };

  const handleConfirmDelete = () => {
    if (!artworkToDelete) return;
    onUpdateArtworks(artworks.filter((a) => a.id !== artworkToDelete.id));
    if (selectedArtwork?.id === artworkToDelete.id) {
      setSelectedArtwork(null);
    }
    setArtworkToDelete(null);
  };

  const handleOpenAdd = () => {
    setEditingArtwork(null);
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (art: ArtworkItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingArtwork(art);
    setIsEditorOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-700/50">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                isDarkMode
                  ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}
            >
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              Art & Visual Work
            </span>
            <span className="text-xs text-slate-400">• Logos, textures & stream graphics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Art Portfolio</h1>
          <p className={`mt-2 text-sm sm:text-base max-w-2xl ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Modpack identities, game branding, stream graphics, and Minecraft texture work. Open a piece for a closer look.
          </p>
        </div>

        {/* Owner Controls */}
        {isOwner && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-sm"
              title="Add artwork to portfolio"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Artwork</span>
            </button>
            <button
              onClick={onResetArtworks}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                isDarkMode
                  ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              title="Clear all artworks"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear All</span>
            </button>
          </div>
        )}
      </div>

      {/* Philosophy Callout: Transparent Workflows & Iterative Design */}
      {showIterativePhilosophy && (
        <div
          className={`p-4 sm:p-5 rounded-2xl border transition-all ${
            isDarkMode
              ? 'bg-gradient-to-r from-purple-950/30 via-slate-900/60 to-blue-950/30 border-purple-800/40'
              : 'bg-gradient-to-r from-purple-50 via-slate-50 to-blue-50 border-purple-200'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 mt-0.5 shrink-0">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold tracking-tight flex items-center gap-2">
                  <span>The Craft of Iteration: From 16-Bit Grids to Prompt Engineering</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Transparent Methodology
                  </span>
                </h3>
                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Crafting memorable gaming assets requires intentional direction regardless of the medium.
                  <strong> Handcrafted Pixel Art</strong> emphasizes manual pixel placement, restrictive color ramps,
                  and sub-pixel lighting for game engine sprites. Meanwhile,{' '}
                  <strong>Minecraft Modpack & Game Logos</strong> represent rigorous prompt engineering—undergoing 15 to
                  30+ iterative composition passes, negative prompt pruning, and multi-layer Photoshop typography
                  clean-up to deliver broadcast-quality community branding.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowIterativePhilosophy(false)}
              className="text-xs text-slate-400 hover:text-slate-200 shrink-0 p-1"
              title="Dismiss banner"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {artworks.length > 0 && <>
        <TagFilter options={dynamicTags} selected={selectedTags} onChange={setSelectedTags} isDarkMode={isDarkMode} />
        <p className="text-xs opacity-70" role="status">{filteredArtworks.length} artworks{selectedTags.length ? ' · matching any selected tag' : ''}</p>
      </>}

      {/* Empty State when no artworks exist */}
      {artworks.length === 0 ? (
        <div
          className={`text-center py-20 px-6 rounded-2xl border ${
            isDarkMode ? 'border-slate-800 bg-[#161a23]' : 'border-[#ded7ca] bg-[#faf8f4]'
          }`}
        >
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <Palette className="w-8 h-8" />
          </div>
          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>
            No Artwork in Portfolio
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
            There are currently no artwork pieces published. As artwork or branding pieces are uploaded, dynamic
            tag and category filters will automatically generate here.
          </p>
          {isOwner && (
            <button
              onClick={handleOpenAdd}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add First Artwork</span>
            </button>
          )}
        </div>
      ) : filteredArtworks.length === 0 ? (
        <div
          className={`text-center py-16 rounded-2xl border ${
            isDarkMode ? 'border-slate-800 bg-[#161a23]' : 'border-[#ded7ca] bg-[#faf8f4]'
          }`}
        >
          <Palette className="w-10 h-10 mx-auto text-slate-500 mb-3" />
          <h3 className="text-base font-semibold">No artworks match filter</h3>
          <p className="text-xs text-slate-400 mt-1">Try removing a selected tag.</p>
          <button
            onClick={() => {
              setSelectedTags([]);
              setSelectedTags([]);
            }}
            className="mt-3 px-3 py-1.5 text-xs rounded-lg bg-blue-600 text-white hover:bg-blue-500 font-medium"
          >
            Show All Works
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtworks.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedArtwork(item)}
              className={`group rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
                isDarkMode
                  ? 'bg-[#181d28] border-slate-700/80 hover:border-blue-500/60 shadow-lg shadow-black/20'
                  : 'bg-white border-slate-200 hover:border-blue-400 shadow-md shadow-slate-200/50'
              }`}
            >
              {/* Image Frame */}
              <div className="relative aspect-square w-full bg-[#0a0d14] overflow-hidden flex items-center justify-center">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-contain"
                />


                {/* Category badges */}
                <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap gap-1">
                  {getArtworkCategories(item).map(category => <span key={category}
                    className={`max-w-full truncate inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider backdrop-blur-md shadow-sm ${category === 'pixel-art' ? 'bg-amber-950/80 text-amber-300 border border-amber-600/60' : 'bg-purple-950/80 text-purple-300 border border-purple-600/60'}`}>
                    {formatArtworkCategory(category)}
                  </span>)}
                </div>

                {/* Inspect Hint Button */}
                <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-black/80 text-white backdrop-blur-md border border-white/20 shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Inspect</span>
                  </span>
                </div>

                {/* Owner Actions */}
                {isOwner && (
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 opacity-90 group-hover:opacity-100">
                    <button
                      onClick={(e) => handleOpenEdit(item, e)}
                      className="p-1.5 rounded-lg bg-black/75 hover:bg-blue-600 text-white border border-white/20 transition-colors shadow-sm"
                      title="Edit artwork details"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteArtwork(item.id, e)}
                      className="p-1.5 rounded-lg bg-black/75 hover:bg-red-600 text-white border border-white/20 transition-colors shadow-sm"
                      title="Delete artwork"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-bold text-base tracking-tight group-hover:text-blue-400 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <span className="text-xs text-slate-400 shrink-0">{item.year}</span>
                  </div>

                  {item.clientOrProject && (
                    <p className={`text-xs mt-0.5 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {item.clientOrProject}
                    </p>
                  )}

                  <p className={`mt-2 text-xs line-clamp-2 leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {item.description}
                  </p>
                </div>

                {/* Bottom Metadata: Tools and Color Swatches */}
                <div className="pt-2 border-t border-slate-700/40 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1">
                    {item.tools.slice(0, 2).map((t, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                          isDarkMode
                            ? 'bg-slate-800/80 border-slate-700 text-slate-300'
                            : 'bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                    {item.tools.length > 2 && (
                      <span className="text-[10px] text-slate-400 self-center">+{item.tools.length - 2}</span>
                    )}
                  </div>

                  {item.colorPalette && item.colorPalette.length > 0 && (
                    <div className="flex items-center -space-x-1" title="Color palette swatches">
                      {item.colorPalette.slice(0, 4).map((c, idx) => (
                        <div
                          key={idx}
                          className="w-3.5 h-3.5 rounded-full border border-black/30 shadow-xs"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox / Detail Modal */}
      <ArtworkLightboxModal
        artwork={selectedArtwork}
        artworks={filteredArtworks}
        isOpen={Boolean(selectedArtwork)}
        onClose={() => setSelectedArtwork(null)}
        onSelectArtwork={(art) => setSelectedArtwork(art)}
        isDarkMode={isDarkMode}
      />

      {/* Owner Editor Modal */}
      <ArtworkEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        artworkToEdit={editingArtwork}
        knownCategories={[...new Set(artworks.flatMap(getArtworkCategories))]}
        onSave={handleSaveArtwork}
        isDarkMode={isDarkMode}
      />

      {/* Custom In-App Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(artworkToDelete)}
        title="Remove Artwork"
        message={`Are you sure you want to remove "${artworkToDelete?.title}" from the portfolio? This cannot be undone.`}
        confirmLabel="Remove"
        onConfirm={handleConfirmDelete}
        onCancel={() => setArtworkToDelete(null)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};
