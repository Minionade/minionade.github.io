import React, { useState } from 'react';
import { TagFilter } from './TagFilter';
import { BlogPost } from '../types';
import { BlogPostModal } from './BlogPostModal';
import { BlogEditorModal } from './BlogEditorModal';
import { ConfirmModal } from './ConfirmModal';
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
  const accent = isDarkMode ? 'text-amber-300' : 'text-amber-900';
  const groupAccent = isDarkMode ? 'group-hover:text-amber-300' : 'group-hover:text-amber-800';
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [postToEdit, setPostToEdit] = useState<BlogPost | null>(null);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const postTags = (post: BlogPost) => [...new Set([post.category, ...(post.tags || [])].map(tag => tag?.trim()).filter(Boolean))];
  const dynamicTags = React.useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach(post => postTags(post).forEach(tag => counts.set(tag, (counts.get(tag) || 0) + 1)));
    return [...counts].map(([tag, count]) => ({ tag, count }));
  }, [posts]);
  const filteredPosts = React.useMemo(() => posts.filter(post =>
    !selectedTags.length || postTags(post).some(tag => selectedTags.includes(tag))
  ), [posts, selectedTags]);

  const handleEditClick = (e: React.MouseEvent, post: BlogPost) => {
    e.stopPropagation();
    setPostToEdit(post);
    setIsEditorOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent, post: BlogPost) => {
    e.stopPropagation();
    setPostToDelete(post);
  };

  const handleConfirmDelete = () => {
    if (!postToDelete) return;
    onDeletePost(postToDelete.id);
    if (selectedPost?.id === postToDelete.id) {
      setSelectedPost(null);
    }
    setPostToDelete(null);
  };

  const handleCreateNewClick = () => {
    setPostToEdit(null);
    setIsEditorOpen(true);
  };

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 no-print">
      {/* Section Header with New Post button for Owner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-current/15">
        <div className="min-w-0">
          <div className={`text-xs font-semibold uppercase tracking-wider ${accent} mb-1`}>
            Dev Blog & Notes
          </div>
          <h2
            className={`text-2xl sm:text-3xl font-bold tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Software, Game Design & Field Notes
          </h2>
          <p className={`mt-2 text-sm max-w-2xl ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Notes on Minecraft mods, game prototypes, AI-assisted development, and what I’m learning along the way.
          </p>
        </div>

        {isOwner && (
          <button
            onClick={handleCreateNewClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-300 hover:bg-amber-200 rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0 self-start sm:self-auto"
            title="Write a new article"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Post</span>
          </button>
        )}
      </div>

      {posts.length > 0 && <TagFilter accent="amber" options={dynamicTags} selected={selectedTags} onChange={setSelectedTags} isDarkMode={isDarkMode} />}

      {/* Blog Cards Grid or Empty State */}
      {posts.length === 0 ? (
        <div
          className={`p-16 text-center rounded-2xl border ${
            isDarkMode ? 'bg-[#242b3b] border-slate-700/80 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
          }`}
        >
          <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-amber-500/10 ${accent} border border-amber-500/20`}>
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            No Blog Posts Published
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
            There are currently no articles published. When you write and publish dev blog posts, dynamic
            category and tag filters will automatically appear above.
          </p>
          {isOwner && (
            <button
              onClick={handleCreateNewClick}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl bg-amber-300 hover:bg-amber-200 text-slate-950 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add First Post</span>
            </button>
          )}
        </div>
      ) : filteredPosts.length === 0 ? (
        <div
          className={`p-12 text-center rounded-xl border ${
            isDarkMode ? 'bg-slate-900/50 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
          }`}
        >
          <BookOpen className="w-8 h-8 mx-auto mb-2 text-slate-500" />
          <p className="text-sm font-semibold">No blog posts found matching this filter.</p>
          <button
            onClick={() => {
              setSelectedTags([]);
            }}
            className="mt-3 px-3 py-1.5 text-xs rounded-lg bg-amber-300 text-slate-950 hover:bg-amber-200 font-medium"
          >
            Show All Posts
          </button>
        </div>
      ) : (
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
                  <span className={`font-semibold ${accent}`}>{post.category}</span>
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
                          ? 'text-slate-300 hover:text-amber-300 hover:bg-slate-700/60'
                          : 'text-slate-500 hover:text-amber-800 hover:bg-slate-100'
                      }`}
                      title="Edit this post"
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
                      title="Delete this post"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <h3 className={`text-lg font-bold ${groupAccent} transition-colors leading-snug ${
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
              <span className={`text-xs font-semibold ${groupAccent} inline-flex items-center gap-1 transition-colors ${
                isDarkMode ? 'text-slate-200' : 'text-slate-900'
              }`}>
                <span>Read post</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <BookOpen className={`w-4 h-4 transition-colors ${
                isDarkMode ? 'text-slate-500 group-hover:text-amber-300' : 'text-slate-300 group-hover:text-amber-800'
              }`} />
            </div>
          </article>
        ))}
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
        isOpen={isEditorOpen && isOwner}
        onClose={() => setIsEditorOpen(false)}
        postToEdit={postToEdit}
        knownTags={dynamicTags.map(({tag}) => tag)}
        onSavePost={onSavePost}
        isDarkMode={isDarkMode}
      />

      {/* In-App Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(postToDelete)}
        title="Delete Blog Post"
        message={`Are you sure you want to delete "${postToDelete?.title}"? This cannot be undone.`}
        confirmLabel="Delete Post"
        onConfirm={handleConfirmDelete}
        onCancel={() => setPostToDelete(null)}
        isDarkMode={isDarkMode}
      />
    </section>
  );
};
