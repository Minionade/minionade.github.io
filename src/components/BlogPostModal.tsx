import React from 'react';
import { BlogPost } from '../types';
import { X } from 'lucide-react';

interface BlogPostModalProps {
  post: BlogPost | null;
  onClose: () => void;
  isDarkMode?: boolean;
}

export const BlogPostModal: React.FC<BlogPostModalProps> = ({ post, onClose, isDarkMode = false }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 no-print">
      <div
        className={`rounded-xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col border overflow-hidden ${
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
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-blue-400">{post.category}</span>
            <span aria-hidden="true" className={isDarkMode ? 'text-slate-700' : 'text-slate-300'}>
              ·
            </span>
            <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>{post.date}</span>
            <span aria-hidden="true" className={isDarkMode ? 'text-slate-700' : 'text-slate-300'}>
              ·
            </span>
            <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>{post.readingTime}</span>
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded-lg transition-colors ${
              isDarkMode
                ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* Post Header */}
          <div className={`border-b pb-5 ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
            <h1
              className={`text-xl sm:text-2xl font-bold tracking-tight leading-snug ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              {post.title}
            </h1>
            <p
              className={`mt-2 text-sm leading-relaxed font-normal ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {post.subtitle}
            </p>
          </div>

          {/* Lead Paragraph */}
          <p
            className={`text-sm font-medium leading-relaxed italic border-l-2 border-blue-500 pl-3 py-0.5 ${
              isDarkMode ? 'text-slate-200' : 'text-slate-800'
            }`}
          >
            {post.content.lead}
          </p>

          {/* Sections */}
          <div className={`space-y-6 text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            {post.content.sections.map((sec, sIdx) => (
              <div key={sIdx} className="space-y-3">
                <h2 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {sec.heading}
                </h2>

                {sec.body.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}

                {/* ASCII Diagram if present */}
                {sec.diagram && (
                  <div className="p-4 bg-slate-950 text-slate-100 rounded-lg font-mono text-xs overflow-x-auto whitespace-pre leading-tight my-3 border border-slate-800 shadow-inner">
                    {sec.diagram}
                  </div>
                )}

                {/* Code Snippet if present */}
                {sec.codeSnippet && (
                  <div className="my-3 rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
                    <div className="px-3 py-1.5 bg-slate-900 text-[11px] font-mono text-slate-400 border-b border-slate-800 flex justify-between">
                      <span>{sec.codeSnippet.language.toUpperCase()}</span>
                      {sec.codeSnippet.caption && <span>{sec.codeSnippet.caption}</span>}
                    </div>
                    <pre className="p-3 text-xs font-mono text-emerald-400 overflow-x-auto">
                      <code>{sec.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}

                {/* Key Takeaways */}
                {sec.keyTakeaways && sec.keyTakeaways.length > 0 && (
                  <div
                    className={`p-3.5 border rounded-lg space-y-1.5 my-3 ${
                      isDarkMode
                        ? 'bg-slate-950/60 border-slate-800 text-slate-300'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span
                      className={`text-xs font-bold uppercase tracking-wider block ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      Key Engineering Takeaways:
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-xs">
                      {sec.keyTakeaways.map((item, tIdx) => (
                        <li key={tIdx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          className={`px-6 py-3.5 border-t flex items-center justify-between ${
            isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Author: <span className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Trevor Barrett</span>
          </div>
          <button
            onClick={onClose}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              isDarkMode
                ? 'bg-white text-slate-950 hover:bg-slate-100'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            Close Post
          </button>
        </div>
      </div>
    </div>
  );
};
