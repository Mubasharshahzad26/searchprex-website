"use client";

import React, { useState, useEffect } from "react";
import {
  Heart,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle2,
  ThumbsUp,
  Sparkles,
} from "lucide-react";
import { CommentItem } from "@/lib/news-interactions";

interface NewsDiscussionSectionProps {
  slug: string;
  title: string;
  category?: string;
}

export default function NewsDiscussionSection({
  slug,
  title,
  category,
}: NewsDiscussionSectionProps) {
  const [likes, setLikes] = useState(24);
  const [userLiked, setUserLiked] = useState(false);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);
  const [clientId, setClientId] = useState("");

  useEffect(() => {
    // Generate or fetch anonymous clientId for persistent like state
    let cid = "";
    try {
      cid = localStorage.getItem("sp_news_client_id") || "";
      if (!cid) {
        cid = `usr_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
        localStorage.setItem("sp_news_client_id", cid);
      }
      setClientId(cid);

      const savedName = localStorage.getItem("sp_comment_author_name");
      const savedRole = localStorage.getItem("sp_comment_author_role");
      if (savedName) setName(savedName);
      if (savedRole) setRole(savedRole);
    } catch {}

    fetch(`/api/news/interactions?slug=${encodeURIComponent(slug)}&clientId=${encodeURIComponent(cid)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setLikes(data.likes || 0);
          setUserLiked(Boolean(data.userLiked));
          if (Array.isArray(data.comments)) {
            setComments(data.comments);
          }
        }
      })
      .catch((err) => console.error("Error fetching discussion:", err))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleToggleLike = async () => {
    const nextLiked = !userLiked;
    setUserLiked(nextLiked);
    setLikes((prev) => (nextLiked ? prev + 1 : Math.max(0, prev - 1)));

    try {
      const res = await fetch("/api/news/interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "like",
          slug,
          clientId,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setLikes(data.likes);
        setUserLiked(data.userLiked);
      }
    } catch (e) {
      console.warn("Like update error:", e);
    }
  };

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
        try {
          localStorage.setItem("sp_comment_author_name", name.trim());
          if (role.trim()) localStorage.setItem("sp_comment_author_role", role.trim());
        } catch {}

        setComments([data.comment, ...comments]);
        setContent("");
        setSuccessMsg(true);
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

  return (
    <section className="my-12 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      {/* Header & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#534AB7] bg-[#EEEDFE] px-2.5 py-0.5 rounded-full">
              Community Discussion
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Verified SEO Insights
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Reader Reactions & Discussion
          </h2>
        </div>

        {/* Reaction Action Bar */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleToggleLike}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
              userLiked
                ? "bg-rose-50 text-rose-600 border border-rose-200 shadow-rose-100"
                : "bg-slate-50 text-slate-700 border border-slate-200 hover:border-rose-300 hover:text-rose-600"
            }`}
          >
            <Heart
              className={`h-4 w-4 ${
                userLiked ? "fill-rose-500 text-rose-500 scale-110" : ""
              } transition-transform`}
            />
            <span>{likes} {likes === 1 ? "Like" : "Likes"}</span>
          </button>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-600">
            <MessageSquare className="h-4 w-4 text-[#534AB7]" />
            <span>{comments.length} {comments.length === 1 ? "Comment" : "Comments"}</span>
          </div>
        </div>
      </div>

      {/* Post a Comment Form */}
      <div className="pt-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
          Leave a Perspective or Case Study
        </h3>

        {successMsg && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-xs font-bold text-emerald-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
            <span>Your comment was posted successfully! Thank you for sharing your experience.</span>
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-xs font-bold text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name (e.g. Alex Mercer) *"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#534AB7] focus:bg-white focus:ring-1 focus:ring-[#534AB7]"
            />
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Your Role or Company (e.g. SEO Director at Agency) (optional)"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#534AB7] focus:bg-white focus:ring-1 focus:ring-[#534AB7]"
            />
          </div>

          <textarea
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts, observations, or what you experienced during this rollout... *"
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#534AB7] focus:bg-white focus:ring-1 focus:ring-[#534AB7] resize-none"
          />

          <div className="flex items-center justify-between pt-1">
            <p className="text-[11px] text-slate-400">
              Directly published to the community thread.
            </p>

            <button
              type="submit"
              disabled={submitting || !content.trim() || !name.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-[#534AB7] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#433c99] disabled:opacity-50 transition-all cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Submit Comment</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-400">
            <Loader2 className="h-6 w-6 animate-spin mb-2 text-[#534AB7]" />
            <p className="text-xs font-medium">Loading comments...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 rounded-2xl bg-slate-50 border border-dashed border-slate-200">
            <Sparkles className="h-6 w-6 text-[#534AB7] mx-auto mb-2 opacity-50" />
            <p className="text-xs font-bold text-slate-700">No comments yet</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Be the first to share your observations on this article.
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-2xl border border-slate-100 bg-slate-50/40 p-4 sm:p-5 transition-all hover:bg-white hover:border-slate-200 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#534AB7] to-[#7971d9] text-white text-xs font-black flex items-center justify-center shadow-sm">
                    {comment.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        {comment.name}
                      </span>
                      {comment.role && (
                        <span className="text-[10px] font-semibold text-[#534AB7] bg-[#EEEDFE] px-2.5 py-0.5 rounded-full">
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

                <button
                  type="button"
                  onClick={() => handleLikeComment(comment.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-800 px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>{comment.likes || 0}</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-12">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
