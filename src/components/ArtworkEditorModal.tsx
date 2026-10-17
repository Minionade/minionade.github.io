import React, { useState } from 'react';
import { ArtworkItem } from '../types';
import { X, Sparkles, Image, Check, AlertCircle } from 'lucide-react';

interface ArtworkEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  artworkToEdit: ArtworkItem | null;
  onSave: (art: ArtworkItem) => void;
  isDarkMode: boolean;
}

export const ArtworkEditorModal: React.FC<ArtworkEditorModalProps> = ({
  isOpen,
  onClose,
  artworkToEdit,
  onSave,
  isDarkMode,
}) => {
  const [title, setTitle] = useState(artworkToEdit?.title || '');
  const [category, setCategory] = useState<string>(
    artworkToEdit?.category || 'pixel-art'
  );
  const [imageUrl, setImageUrl] = useState(artworkToEdit?.imageUrl || '');
  const [description, setDescription] = useState(artworkToEdit?.description || '');
  const [promptNotes, setPromptNotes] = useState(artworkToEdit?.promptNotes || '');
  const [toolsStr, setToolsStr] = useState(artworkToEdit?.tools.join(', ') || 'Aseprite, Photoshop');
  const [resolution, setResolution] = useState(artworkToEdit?.resolution || '256 × 256 Native');
  const [year, setYear] = useState(artworkToEdit?.year || new Date().getFullYear().toString());
  const [clientOrProject, setClientOrProject] = useState(artworkToEdit?.clientOrProject || 'Personal Works');
  const [colorPaletteStr, setColorPaletteStr] = useState(
    artworkToEdit?.colorPalette?.join(', ') || '#1a1016, #3b2027, #8a4b38, #e5823a'
  );
  const [iterationCycles, setIterationCycles] = useState<number>(artworkToEdit?.iterationCycles || 15);
  const [error, setError] = useState<string | null>(null);

  // Sync state if artworkToEdit changes
  React.useEffect(() => {
    if (artworkToEdit) {
      setTitle(artworkToEdit.title);
      setCategory(artworkToEdit.category);
      setImageUrl(artworkToEdit.imageUrl);
      setDescription(artworkToEdit.description);
      setPromptNotes(artworkToEdit.promptNotes || '');
      setToolsStr(artworkToEdit.tools.join(', '));
      setResolution(artworkToEdit.resolution || '');
      setYear(artworkToEdit.year);
      setClientOrProject(artworkToEdit.clientOrProject || '');
      setColorPaletteStr(artworkToEdit.colorPalette?.join(', ') || '');
      setIterationCycles(artworkToEdit.iterationCycles || 15);
    } else {
      setTitle('');
      setCategory('pixel-art');
      setImageUrl('');
      setDescription('');
      setPromptNotes('');
      setToolsStr('Aseprite, Photoshop');
      setResolution('256 × 256 Native');
      setYear(new Date().getFullYear().toString());
      setClientOrProject('Personal Game Project');
      setColorPaletteStr('#1a1016, #3b2027, #8a4b38, #e5823a');
      setIterationCycles(15);
    }
    setError(null);
  }, [artworkToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!imageUrl.trim()) {
      setError('Image URL is required.');
      return;
    }

    const tools = toolsStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const colorPalette = colorPaletteStr
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c.startsWith('#'));

    const updatedArt: ArtworkItem = {
      id: artworkToEdit ? artworkToEdit.id : `art-${Date.now()}`,
      title: title.trim(),
      category,
      imageUrl: imageUrl.trim(),
      description: description.trim(),
      promptNotes: category === 'modpack-logo' || promptNotes ? promptNotes.trim() : undefined,
      tools: tools.length > 0 ? tools : ['Digital Art'],
      resolution: resolution.trim() || undefined,
      year: year.trim() || new Date().getFullYear().toString(),
      clientOrProject: clientOrProject.trim() || undefined,
      featured: artworkToEdit ? artworkToEdit.featured : false,
      colorPalette: colorPalette.length > 0 ? colorPalette : undefined,
      iterationCycles: category === 'modpack-logo' ? iterationCycles : undefined,
    };

    onSave(updatedArt);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden p-6 ${
          isDarkMode
            ? 'bg-[#1b2230] border-slate-700/80 text-slate-100'
            : 'bg-white border-slate-300 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-700/60 mb-5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                {artworkToEdit ? 'Edit Artwork' : 'Add New Portfolio Piece'}
              </h2>
              <p className="text-xs text-slate-400">
                Showcase handcrafted pixel art or heavily iterated Minecraft modpack branding
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-transparent hover:border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-900/30 border border-red-700/60 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-300">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Void Genesis Modpack"
                className={`w-full px-3 py-2 text-sm rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  isDarkMode
                    ? 'bg-slate-800/80 border-slate-700 text-white'
                    : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-300">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className={`w-full px-3 py-2 text-sm rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  isDarkMode
                    ? 'bg-slate-800/80 border-slate-700 text-white'
                    : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <option value="pixel-art">Handcrafted Pixel Art</option>
                <option value="modpack-logo">Minecraft Modpack Logo (Iterative AI)</option>
                <option value="illustration">Concept & Worldbuilding</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-300">Image Source (URL or Path)</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://... or /src/assets/images/..."
                className={`flex-1 px-3 py-2 text-sm rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  isDarkMode
                    ? 'bg-slate-800/80 border-slate-700 text-white'
                    : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
                required
              />
              {imageUrl && (
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-700 shrink-0 bg-black">
                  <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-300">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Design intention, visual elements, aesthetic choices..."
              className={`w-full px-3 py-2 text-sm rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                isDarkMode
                  ? 'bg-slate-800/80 border-slate-700 text-white'
                  : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          {/* Iteration & AI Prompting Notes (Especially for logos) */}
          <div
            className={`p-3.5 rounded-xl border ${
              category === 'modpack-logo'
                ? isDarkMode
                  ? 'bg-purple-950/20 border-purple-800/50'
                  : 'bg-purple-50 border-purple-200'
                : isDarkMode
                ? 'bg-slate-800/40 border-slate-700/60'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-purple-400">
                <Sparkles className="w-3.5 h-3.5" />
                Prompt Iteration & Post-Processing Notes
              </label>
              {category === 'modpack-logo' && (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400">Cycles:</span>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={iterationCycles}
                    onChange={(e) => setIterationCycles(Number(e.target.value))}
                    className="w-16 px-2 py-0.5 text-xs rounded bg-slate-800 border border-slate-700 text-white text-center"
                  />
                </div>
              )}
            </div>
            <textarea
              rows={2}
              value={promptNotes}
              onChange={(e) => setPromptNotes(e.target.value)}
              placeholder="Explain seed exploration, negative prompts, typography masking, manual vector clean-up, etc."
              className={`w-full px-3 py-2 text-xs rounded-lg border focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                isDarkMode
                  ? 'bg-slate-900/80 border-slate-700 text-slate-200'
                  : 'bg-white border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-300">Software / Tools (comma separated)</label>
              <input
                type="text"
                value={toolsStr}
                onChange={(e) => setToolsStr(e.target.value)}
                placeholder="Aseprite, Photoshop"
                className={`w-full px-3 py-2 text-sm rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  isDarkMode
                    ? 'bg-slate-800/80 border-slate-700 text-white'
                    : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-300">Native Resolution</label>
              <input
                type="text"
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                placeholder="256 × 256 Native"
                className={`w-full px-3 py-2 text-sm rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  isDarkMode
                    ? 'bg-slate-800/80 border-slate-700 text-white'
                    : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-300">Year / Era</label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2024"
                className={`w-full px-3 py-2 text-sm rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  isDarkMode
                    ? 'bg-slate-800/80 border-slate-700 text-white'
                    : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-300">
              Palette Hex Codes (comma separated, e.g. #112233, #aabbcc)
            </label>
            <input
              type="text"
              value={colorPaletteStr}
              onChange={(e) => setColorPaletteStr(e.target.value)}
              placeholder="#1a1016, #3b2027, #8a4b38, #e5823a"
              className={`w-full px-3 py-2 text-sm font-mono rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                isDarkMode
                  ? 'bg-slate-800/80 border-slate-700 text-white'
                  : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <div className="pt-3 flex justify-end gap-3 border-t border-slate-700/60">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                isDarkMode
                  ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{artworkToEdit ? 'Save Changes' : 'Publish Artwork'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
