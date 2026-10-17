import React, { useState } from 'react';
import { BlogPost } from '../types';
import { BlogPostModal } from './BlogPostModal';
import { BlogEditorModal } from './BlogEditorModal';
import { ArrowRight, BookOpen, Clock, Plus, Edit3, Trash2 } from 'lucide-react';

interface BlogSectionProps {
  posts: BlogPost[];
  onSavePost: (post: BlogPost) => void;
  onDeletePost: (postId: string) => void;
  isOwner?: boolean;
  isDarkMode?: boolean;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  posts,
  onSavePost,
  onDeletePost,
  isOwner = false,
  isDarkMode = false,
}) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [postToEdit, setPostToEdit] = useState<BlogPost | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'Systems Engineering', 'Game Design & Systems', 'Hardware & IT', 'Field & Mechanical Insights'];

  const filteredPosts =
    activeCategory === 'all'
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  const handleEditClick = (e: React.MouseEvent, post: BlogPost) => {
    e.stopPropagation();
    setPostToEdit(post);
    setIsEditorOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent, post: BlogPost) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
      onDeletePost(post.id);
    }
  };

  const handleCreateNewClick = () => {
    setPostToEdit(null);
    setIsEditorOpen(true);
  };

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 no-print">
      {/* Section Header with New Post button for Owner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-500 mb-1">
            Technical Journal & Engineering Blog
          </div>
          <h2
            className={`text-2xl sm:text-3xl font-bold tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Software Systems, Game Design & Hardware Engineering
          </h2>
          <p className={`mt-2 text-sm max-w-2xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Detailed essays and technical postmortems by Trevor Barrett on custom socket engine architecture, decade-long game design documentation, PC hardware benchmarking, and lessons from heavy equipment operations.
          </p>
        </div>

        {isOwner && (
          <button
            onClick={handleCreateNewClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0 self-start sm:self-auto"
            title="Create and publish a new engineering article"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Write New Blog Post</span>
          </button>
        )}
      </div>

      {/* Category filter tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors capitalize font-medium ${
              activeCategory === cat
                ? isDarkMode
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-900 text-white font-semibold'
                : isDarkMode
                ? 'bg-[#242b3b] text-slate-300 hover:bg-slate-700/70 hover:text-white border border-slate-700/50'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            {cat === 'all' ? 'All Articles' : cat}
          </button>
        ))}
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className={`cursor-pointer group p-6 rounded-xl border transition-all flex flex-col justify-between ${
              isDarkMode
                ? 'bg-[#242b3b] border-slate-700/80 hover:border-slate-600/90 hover:bg-[#2b3346] text-slate-100 shadow-md'
                : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm text-slate-900'
            }`}
          >
            <div className="space-y-3">
              {/* Unboxed metadata with typographic separators */}
              <div className={`flex items-center justify-between text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-blue-400">{post.category}</span>
                  <span aria-hidden="true" className={isDarkMode ? 'text-slate-500' : 'text-slate-300'}>·</span>
                  <span>{post.date}</span>
                  <span aria-hidden="true" className={isDarkMode ? 'text-slate-500' : 'text-slate-300'}>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{post.readingTime}</span>
                  </span>
                </div>

                {/* Owner controls: Edit & Delete buttons */}
                {isOwner && (
                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => handleEditClick(e, post)}
                      className={`p-1.5 rounded transition-colors ${
                        isDarkMode
                          ? 'text-slate-300 hover:text-blue-400 hover:bg-slate-700/60'
                          : 'text-slate-500 hover:text-blue-600 hover:bg-slate-100'
                      }`}
                      title="Edit this blog post"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteClick(e, post)}
                      className={`p-1.5 rounded transition-colors ${
                        isDarkMode
                          ? 'text-slate-300 hover:text-red-400 hover:bg-slate-700/60'
                          : 'text-slate-500 hover:text-red-600 hover:bg-slate-100'
                      }`}
                      title="Delete this blog post"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <h3 className={`text-lg font-bold group-hover:text-blue-400 transition-colors leading-snug ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {post.title}
              </h3>

              <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {post.summary}
              </p>
            </div>

            <div className={`pt-4 mt-4 border-t flex items-center justify-between ${
              isDarkMode ? 'border-slate-700/60' : 'border-slate-100'
            }`}>
              <span className={`text-xs font-semibold group-hover:text-blue-400 inline-flex items-center gap-1 transition-colors ${
                isDarkMode ? 'text-slate-200' : 'text-slate-900'
              }`}>
                <span>Read Technical Essay</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <BookOpen className={`w-4 h-4 transition-colors ${
                isDarkMode ? 'text-slate-500 group-hover:text-blue-400' : 'text-slate-300 group-hover:text-blue-400'
              }`} />
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className={`p-12 text-center rounded-xl border ${
          isDarkMode ? 'bg-slate-900/50 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
        }`}>
          <BookOpen className="w-8 h-8 mx-auto mb-2 text-slate-500" />
          <p className="text-sm font-semibold">No blog posts found in this category.</p>
          {isOwner && (
            <button
              onClick={handleCreateNewClick}
              className="mt-3 px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Write First Post
            </button>
          )}
        </div>
      )}

      {/* Reader Modal */}
      <BlogPostModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        isDarkMode={isDarkMode}
      />

      {/* Editor Modal for Blog (Owner only) */}
      <BlogEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        postToEdit={postToEdit}
        onSavePost={onSavePost}
        isDarkMode={isDarkMode}
      />
    </section>
  );
};
