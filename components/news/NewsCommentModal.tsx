"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Heart,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle2,
  ThumbsUp,
  User,
  Sparkles,
} from "lucide-react";
import { CommentItem } from "@/lib/news-interactions";

interface NewsCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  slug: string;
  title: string;
  category?: string;
  currentLikes: number;
  userLiked: boolean;
  onToggleLike: (slug: string) => void;
  onCommentAdded?: (slug: string, newCount: number) => void;
}

export default function NewsCommentModal({
  isOpen,
  onClose,
  slug,
  title,
  category,
  currentLikes,
  userLiked,
  onToggleLike,
  onCommentAdded,
}: NewsCommentModalProps) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);

  // Fetch comments for this slug when modal opens
  useEffect(() => {
    if (!isOpen || !slug) return;
    setLoading(true);
    setError(null);
    setSuccessMsg(false);

    // Load saved author name/role from localStorage for convenience
    try {
      const savedName = localStorage.getItem("sp_comment_author_name");
      const savedRole = localStorage.getItem("sp_comment_author_role");
      if (savedName) setName(savedName);
      if (savedRole) setRole(savedRole);
    } catch {}

    fetch(`/api/news/interactions?slug=${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok && Array.isArray(data.comments)) {
          setComments(data.comments);
        }
      })
      .catch((err) => {
        console.error("Failed to load comments:", err);
      })
      .finally(() => setLoading(false));
  }, [isOpen, slug]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!content.trim() || content.trim().length < 5) {
      setError("Please write a comment (at least 5 characters).");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/news/interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "comment",
          slug,
          name: name.trim(),
          role: role.trim() || undefined,
          content: content.trim(),
        }),
      });

      const data = await res.json();
      if (data.ok && data.comment) {
        // Save name & role to localStorage for future comments
        try {
          localStorage.setItem("sp_comment_author_name", name.trim());
          if (role.trim()) localStorage.setItem("sp_comment_author_role", role.trim());
        } catch {}

        const updated = [data.comment, ...comments];
        setComments(updated);
        setContent("");
        setSuccessMsg(true);
        if (onCommentAdded) {
          onCommentAdded(slug, updated.length);
        }
        setTimeout(() => setSuccessMsg(false), 3500);
      } else {
        setError(data.error || "Failed to post comment. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    // Optimistic update
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c))
    );

    try {
      await fetch("/api/news/interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "like_comment",
          commentId,
        }),
      });
    } catch (err) {
      console.warn("Failed to like comment:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200 z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-4 flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              {category && (
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#534AB7] bg-[#EEEDFE] px-2 py-0.5 rounded-full mb-1">
                  {category}
                </span>
              )}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug line-clamp-2">
                {title}
              </h3>
              <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 font-medium">
                {/* Like Button in Header */}
                <button
                  type="button"
                  onClick={() => onToggleLike(slug)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                    userLiked
                      ? "bg-rose-50 text-rose-600 border border-rose-200"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-rose-300 hover:text-rose-600"
                  }`}
                >
                  <Heart
                    className={`h-3.5 w-3.5 ${
                      userLiked ? "fill-rose-500 text-rose-500" : ""
                    }`}
                  />
                  <span>{currentLikes} {currentLikes === 1 ? "Like" : "Likes"}</span>
                </button>

                <span className="inline-flex items-center gap-1 text-slate-500">
                  <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
                  <span>{comments.length} {comments.length === 1 ? "Comment" : "Comments"}</span>
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close comment modal"
              className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body: Scrollable Comments List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <Loader2 className="h-7 w-7 animate-spin mb-2 text-[#534AB7]" />
                <p className="text-xs font-medium">Loading community discussion...</p>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-10 px-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200">
                <Sparkles className="h-8 w-8 text-[#534AB7] mx-auto mb-2 opacity-60" />
                <p className="text-sm font-bold text-slate-700">No comments yet</p>
                <p className="text-xs text-slate-500 mt-1">
                  Be the first to share your observation or question on this SEO update.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Discussion ({comments.length})
                </p>
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:border-slate-200 transition-all"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#534AB7] to-[#7971d9] text-white text-xs font-black flex items-center justify-center shadow-sm">
                          {comment.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">
                              {comment.name}
                            </span>
                            {comment.role && (
                              <span className="text-[10px] font-semibold text-[#534AB7] bg-[#EEEDFE] px-2 py-0.5 rounded-full">
                                {comment.role}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {new Date(comment.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Comment Like Button */}
                      <button
                        type="button"
                        onClick={() => handleLikeComment(comment.id)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-slate-700 px-2 py-1 rounded-md hover:bg-slate-50 transition-colors"
                      >
                        <ThumbsUp className="h-3 w-3" />
                        <span>{comment.likes || 0}</span>
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-10">
                      {comment.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer: Post Comment Form */}
          <div className="border-t border-slate-100 bg-slate-50/90 p-4 sm:p-5">
            {successMsg && (
              <div className="mb-3 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>Your comment was posted successfully! Thank you for sharing.</span>
              </div>
            )}

            {error && (
              <div className="mb-3 rounded-xl bg-rose-50 border border-rose-200 px-3 py-2 text-xs font-bold text-rose-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name (e.g. John Doe) *"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#534AB7] focus:ring-1 focus:ring-[#534AB7]"
                />
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Role or Website (e.g. Technical SEO) (optional)"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#534AB7] focus:ring-1 focus:ring-[#534AB7]"
                />
              </div>

              <div className="relative">
                <textarea
                  rows={2}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What is your take or observation on this update? *"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#534AB7] focus:ring-1 focus:ring-[#534AB7] resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <p className="text-[10px] text-slate-400">
                  Comments are verified and published directly. Be respectful.
                </p>

                <button
                  type="submit"
                  disabled={submitting || !content.trim() || !name.trim()}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#534AB7] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#433c99] disabled:opacity-50 transition-all cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Posting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>Post Comment</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
