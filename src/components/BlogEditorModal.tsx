import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { X, Plus, Trash2, Save, FileText, Code2, Sparkles } from 'lucide-react';

interface BlogEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  postToEdit: BlogPost | null;
  onSavePost: (post: BlogPost) => void;
  isDarkMode?: boolean;
}

export const BlogEditorModal: React.FC<BlogEditorModalProps> = ({
  isOpen,
  onClose,
  postToEdit,
  onSavePost,
  isDarkMode = false,
}) => {
  if (!isOpen) return null;

  const isEditing = Boolean(postToEdit);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Systems Engineering');
  const [readingTime, setReadingTime] = useState('5 min read');
  const [date, setDate] = useState('October 2026');
  const [summary, setSummary] = useState('');
  const [lead, setLead] = useState('');
  const [sections, setSections] = useState<
    {
      heading: string;
      bodyText: string;
      hasCode: boolean;
      codeLang: string;
      codeText: string;
      codeCaption: string;
      diagram: string;
      takeawaysText: string;
    }[]
  >([]);

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title);
      setSubtitle(postToEdit.subtitle);
      setCategory(postToEdit.category);
      setReadingTime(postToEdit.readingTime);
      setDate(postToEdit.date);
      setSummary(postToEdit.summary);
      setLead(postToEdit.content.lead);
      setSections(
        postToEdit.content.sections.map((s) => ({
          heading: s.heading,
          bodyText: s.body.join('\n\n'),
          hasCode: Boolean(s.codeSnippet),
          codeLang: s.codeSnippet?.language || 'csharp',
          codeText: s.codeSnippet?.code || '',
          codeCaption: s.codeSnippet?.caption || '',
          diagram: s.diagram || '',
          takeawaysText: (s.keyTakeaways || []).join('\n'),
        }))
      );
    } else {
      // New blank post template
      setTitle('');
      setSubtitle('');
      setCategory('Systems Engineering');
      setReadingTime('5 min read');
      setDate('October 2026');
      setSummary('');
      setLead('');
      setSections([
        {
          heading: '1. Introduction & Core Concept',
          bodyText: '',
          hasCode: false,
          codeLang: 'csharp',
          codeText: '',
          codeCaption: '',
          diagram: '',
          takeawaysText: '',
        },
      ]);
    }
  }, [postToEdit]);

  const handleAddSection = () => {
    setSections((prev) => [
      ...prev,
      {
        heading: `${prev.length + 1}. New Technical Section`,
        bodyText: '',
        hasCode: false,
        codeLang: 'csharp',
        codeText: '',
        codeCaption: '',
        diagram: '',
        takeawaysText: '',
      },
    ]);
  };

  const handleRemoveSection = (index: number) => {
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a title for the blog post.');
      return;
    }

    const slug = (postToEdit?.slug || title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const savedPost: BlogPost = {
      id: postToEdit?.id || `post-${Date.now()}`,
      slug,
      title: title.trim(),
      subtitle: subtitle.trim(),
      category: category.trim(),
      date: date.trim(),
      readingTime: readingTime.trim(),
      summary: summary.trim(),
      content: {
        lead: lead.trim(),
        sections: sections.map((s) => ({
          heading: s.heading.trim(),
          body: s.bodyText.split('\n\n').map((p) => p.trim()).filter(Boolean),
          codeSnippet:
            s.hasCode && s.codeText.trim()
              ? {
                  language: s.codeLang.trim(),
                  code: s.codeText.trim(),
                  caption: s.codeCaption.trim() || undefined,
                }
              : undefined,
          diagram: s.diagram.trim() || undefined,
          keyTakeaways: s.takeawaysText
            ? s.takeawaysText
                .split('\n')
                .map((t) => t.trim())
                .filter(Boolean)
            : undefined,
        })),
      },
    };

    onSavePost(savedPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 no-print">
      <div
        className={`rounded-xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col border overflow-hidden ${
          isDarkMode
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between sticky top-0 z-10 ${
            isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {isEditing ? 'Edit Blog Post' : 'Write New Technical Blog Post'}
              </h2>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Publish or update articles on systems engineering, GDDs, hardware, and field work.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isDarkMode
                ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {/* Top metadata grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-semibold mb-1">Essay Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Designing a Custom C# Game & Dedicated Server Engine"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden ${
                  isDarkMode
                    ? 'bg-slate-950 border-slate-800 text-white'
                    : 'bg-white border-slate-300 text-slate-900'
                }`}
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold mb-1">Subtitle / Subheading</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Architectural trade-offs of building socket networking from scratch"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden ${
                  isDarkMode
                    ? 'bg-slate-950 border-slate-800 text-white'
                    : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Systems Engineering, Game Design & Systems, Hardware & IT"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden ${
                  isDarkMode
                    ? 'bg-slate-950 border-slate-800 text-white'
                    : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Publication Date</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. October 2026"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden ${
                  isDarkMode
                    ? 'bg-slate-950 border-slate-800 text-white'
                    : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Reading Time</label>
              <input
                type="text"
                value={readingTime}
                onChange={(e) => setReadingTime(e.target.value)}
                placeholder="e.g. 6 min read"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden ${
                  isDarkMode
                    ? 'bg-slate-950 border-slate-800 text-white'
                    : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Card Summary (Short Excerpt)</label>
              <textarea
                rows={2}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Brief 1-2 sentence overview shown on blog list cards"
                className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden ${
                  isDarkMode
                    ? 'bg-slate-950 border-slate-800 text-white'
                    : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>
          </div>

          {/* Lead paragraph */}
          <div>
            <label className="block font-semibold mb-1">Lead Introductory Statement</label>
            <textarea
              rows={2}
              value={lead}
              onChange={(e) => setLead(e.target.value)}
              placeholder="Bold opening paragraph introducing the central problem or theme"
              className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden italic ${
                isDarkMode
                  ? 'bg-slate-950 border-slate-800 text-white'
                  : 'bg-white border-slate-300 text-slate-900'
              }`}
            />
          </div>

          {/* Sections List */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h3 className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Essay Sections ({sections.length})
              </h3>
              <button
                type="button"
                onClick={handleAddSection}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-400 bg-blue-950/40 border border-blue-800/60 hover:bg-blue-900/40 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Section</span>
              </button>
            </div>

            {sections.map((sec, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border space-y-3 ${
                  isDarkMode
                    ? 'bg-slate-950/60 border-slate-800'
                    : 'bg-slate-50/80 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <input
                    type="text"
                    value={sec.heading}
                    onChange={(e) => {
                      const next = [...sections];
                      next[idx].heading = e.target.value;
                      setSections(next);
                    }}
                    placeholder="Section Heading"
                    className={`font-bold px-2.5 py-1.5 border rounded flex-1 text-xs focus:ring-2 focus:ring-blue-500 ${
                      isDarkMode
                        ? 'bg-slate-900 border-slate-700 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                  {sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSection(idx)}
                      className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                      title="Delete this section"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Body Paragraphs (Separate paragraphs with double enter)
                  </label>
                  <textarea
                    rows={4}
                    value={sec.bodyText}
                    onChange={(e) => {
                      const next = [...sections];
                      next[idx].bodyText = e.target.value;
                      setSections(next);
                    }}
                    placeholder="Write detailed technical explanation here..."
                    className={`w-full p-2.5 border rounded-lg text-xs leading-relaxed ${
                      isDarkMode
                        ? 'bg-slate-900 border-slate-700 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                {/* Optional ASCII Diagram */}
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Optional ASCII Architecture Diagram (Rendered in monospace box)
                  </label>
                  <textarea
                    rows={3}
                    value={sec.diagram}
                    onChange={(e) => {
                      const next = [...sections];
                      next[idx].diagram = e.target.value;
                      setSections(next);
                    }}
                    placeholder={`[Client] ──TCP Sockets──> [Game Server]\n       <──UDP Snapshots──`}
                    className={`w-full p-2.5 border rounded-lg font-mono text-[11px] leading-tight ${
                      isDarkMode
                        ? 'bg-slate-900 border-slate-700 text-emerald-400'
                        : 'bg-slate-900 text-emerald-400 border-slate-700'
                    }`}
                  />
                </div>

                {/* Code Snippet Toggle */}
                <div className="space-y-2 pt-1 border-t border-slate-800">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={sec.hasCode}
                      onChange={(e) => {
                        const next = [...sections];
                        next[idx].hasCode = e.target.checked;
                        setSections(next);
                      }}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="font-semibold text-slate-300">Include Code Snippet</span>
                  </label>

                  {sec.hasCode && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <div>
                        <label className="block text-[10px] text-slate-400 mb-0.5">Language</label>
                        <input
                          type="text"
                          value={sec.codeLang}
                          onChange={(e) => {
                            const next = [...sections];
                            next[idx].codeLang = e.target.value;
                            setSections(next);
                          }}
                          placeholder="csharp, json, bash, etc."
                          className={`w-full px-2.5 py-1.5 border rounded text-xs font-mono ${
                            isDarkMode
                              ? 'bg-slate-900 border-slate-700 text-white'
                              : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 mb-0.5">Caption (Optional)</label>
                        <input
                          type="text"
                          value={sec.codeCaption}
                          onChange={(e) => {
                            const next = [...sections];
                            next[idx].codeCaption = e.target.value;
                            setSections(next);
                          }}
                          placeholder="e.g. Sockets initialization loop"
                          className={`w-full px-2.5 py-1.5 border rounded text-xs ${
                            isDarkMode
                              ? 'bg-slate-900 border-slate-700 text-white'
                              : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] text-slate-400 mb-0.5">Code</label>
                        <textarea
                          rows={4}
                          value={sec.codeText}
                          onChange={(e) => {
                            const next = [...sections];
                            next[idx].codeText = e.target.value;
                            setSections(next);
                          }}
                          placeholder="// Paste code snippet here"
                          className={`w-full p-2.5 border rounded-lg font-mono text-[11px] leading-relaxed ${
                            isDarkMode
                              ? 'bg-slate-900 border-slate-700 text-emerald-400'
                              : 'bg-slate-900 text-emerald-400 border-slate-700'
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Optional Key Takeaways */}
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Key Takeaways (One bullet per line)
                  </label>
                  <textarea
                    rows={2}
                    value={sec.takeawaysText}
                    onChange={(e) => {
                      const next = [...sections];
                      next[idx].takeawaysText = e.target.value;
                      setSections(next);
                    }}
                    placeholder="Takeaway 1&#10;Takeaway 2"
                    className={`w-full p-2 border rounded text-xs ${
                      isDarkMode
                        ? 'bg-slate-900 border-slate-700 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Modal Footer Controls */}
          <div
            className={`pt-4 border-t flex items-center justify-between sticky bottom-0 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Cancel & Discard
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Save & Update Post' : 'Publish New Blog Post'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
