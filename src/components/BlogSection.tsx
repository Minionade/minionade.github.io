import React, { useState } from 'react';
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
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [postToEdit, setPostToEdit] = useState<BlogPost | null>(null);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Dynamically derive categories and counts from current posts
  const dynamicCategories = React.useMemo(() => {
    const catMap = new Map<string, number>();
    posts.forEach((p) => {
      if (p.category && p.category.trim()) {
        const cat = p.category.trim();
        catMap.set(cat, (catMap.get(cat) || 0) + 1);
      }
    });
    return Array.from(catMap.entries()).map(([cat, count]) => ({ cat, count }));
  }, [posts]);

  // Dynamically derive tags from current posts
  const dynamicTags = React.useMemo(() => {
    const tagMap = new Map<string, number>();
    posts.forEach((p) => {
      (p.tags || []).forEach((t) => {
        const clean = t.trim();
        if (clean) tagMap.set(clean, (tagMap.get(clean) || 0) + 1);
      });
    });
    return Array.from(tagMap.entries()).map(([tag, count]) => ({ tag, count }));
  }, [posts]);

  // Filter posts based on active dynamic category and active tag
  const filteredPosts = React.useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
      const matchesTag =
        !activeTag ||
        post.tags?.some((t) => t.toLowerCase() === activeTag.toLowerCase()) ||
        post.category.toLowerCase() === activeTag.toLowerCase();
      return matchesCategory && matchesTag;
    });
  }, [posts, activeCategory, activeTag]);

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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1">
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
            Write-ups and technical notes on systems architecture, custom C# game engines, PC hardware assembly, and
            mechanical operations.
          </p>
        </div>

        {isOwner && (
          <button
            onClick={handleCreateNewClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0 self-start sm:self-auto"
            title="Write a new article"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Write a Post</span>
          </button>
        )}
      </div>

      {/* Dynamic Category & Tag Filter Tabs (Only shown when there are posts) */}
      {posts.length > 0 && (
        <div className="space-y-2.5">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveTag(null);
              }}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors capitalize font-medium flex items-center gap-1.5 ${
                activeCategory === 'all' && !activeTag
                  ? isDarkMode
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-slate-900 text-white font-semibold'
                  : isDarkMode
                  ? 'bg-[#242b3b] text-slate-300 hover:bg-slate-700/70 hover:text-white border border-slate-700/50'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <span>All Posts</span>
              <span className="text-[10px] opacity-75">({posts.length})</span>
            </button>

            {dynamicCategories.map(({ cat, count }) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveTag(null);
                }}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors capitalize font-medium flex items-center gap-1.5 ${
                  activeCategory === cat && !activeTag
                    ? isDarkMode
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-slate-900 text-white font-semibold'
                    : isDarkMode
                    ? 'bg-[#242b3b] text-slate-300 hover:bg-slate-700/70 hover:text-white border border-slate-700/50'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <span>{cat}</span>
                <span className="text-[10px] opacity-75">({count})</span>
              </button>
            ))}
          </div>

          {/* Dynamic Tags */}
          {dynamicTags.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] font-semibold text-slate-400 mr-1 shrink-0">Tags:</span>
              {dynamicTags.map(({ tag, count }) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    activeTag === tag
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : isDarkMode
                      ? 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <span>#{tag}</span>
                  <span className="text-[9px] opacity-75">({count})</span>
                </button>
              ))}
              {activeTag && (
                <button
                  onClick={() => setActiveTag(null)}
                  className="text-[11px] text-blue-400 hover:underline px-2 py-0.5"
                >
                  Clear Tag
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Blog Cards Grid or Empty State */}
      {posts.length === 0 ? (
        <div
          className={`p-16 text-center rounded-2xl border ${
            isDarkMode ? 'bg-[#242b3b] border-slate-700/80 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
          }`}
        >
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-blue-500/10 text-blue-400 border border-blue-500/20">
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
              className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Write First Post</span>
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
              setActiveCategory('all');
              setActiveTag(null);
            }}
            className="mt-3 px-3 py-1.5 text-xs rounded-lg bg-blue-600 text-white hover:bg-blue-500 font-medium"
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
                <span>Read Button</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <BookOpen className={`w-4 h-4 transition-colors ${
                isDarkMode ? 'text-slate-500 group-hover:text-blue-400' : 'text-slate-300 group-hover:text-blue-400'
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
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        postToEdit={postToEdit}
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
