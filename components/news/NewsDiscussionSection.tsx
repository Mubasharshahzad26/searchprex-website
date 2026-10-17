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
  Mail,
} from "lucide-react";
import { CommentItem } from "@/lib/news-interactions";

interface NewsDiscussionSectionProps {
  slug: string;
  title: string;
  category?: string;
  pagePath?: string;
  externalLikes?: number;
  externalUserLiked?: boolean;
  onExternalToggleLike?: () => void;
}

export default function NewsDiscussionSection({
  slug,
  title,
  category,
  pagePath,
  externalLikes,
  externalUserLiked,
  onExternalToggleLike,
}: NewsDiscussionSectionProps) {
  const [likes, setLikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Unified mode: "comment" (public comment + optional editorial note) or "feedback" (direct topic request / feedback)
  const [mode, setMode] = useState<"comment" | "feedback">("comment");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [clientId, setClientId] = useState("");

  useEffect(() => {
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

  const effectiveLikes = externalLikes !== undefined ? externalLikes : likes;
  const effectiveUserLiked = externalUserLiked !== undefined ? externalUserLiked : userLiked;

  const handleToggleLike = async () => {
    if (onExternalToggleLike) {
      onExternalToggleLike();
      return;
    }
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
    if (mode === "feedback" && !email.trim()) {
      setError("Please enter your email so we can follow up on your topic request.");
      return;
    }
    if (!content.trim() || content.trim().length < 5) {
      setError("Please write at least 5 characters.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccessMsg(null);

    try {
      if (mode === "comment") {
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

          // Also forward to editorial feedback if the user provided an email
          if (email.trim()) {
            fetch("/api/news/feedback", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: name.trim(),
                email: email.trim(),
                industry: role.trim() || "Reader",
                lookingFor: content.trim(),
                likes: "",
                website: honeypot,
                page: pagePath || `/resources/news/${slug}`,
              }),
            }).catch(() => {});
          }

          setComments([data.comment, ...comments]);
          setContent("");
          setSuccessMsg("Your comment was published to the discussion thread! Thank you for sharing your perspective.");
          setTimeout(() => setSuccessMsg(null), 4500);
        } else {
          setError(data.error || "Failed to post comment. Please try again.");
        }
      } else {
        const res = await fetch("/api/news/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            industry: role.trim() || "Reader",
            lookingFor: content.trim(),
            likes: "",
            website: honeypot,
            page: pagePath || `/resources/news/${slug}`,
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.ok) {
          setError(data.error || "Something went wrong. Please try again.");
        } else {
          try {
            localStorage.setItem("sp_comment_author_name", name.trim());
            if (role.trim()) localStorage.setItem("sp_comment_author_role", role.trim());
          } catch {}
          setContent("");
          setSuccessMsg(
            `Thank you, ${name.trim().split(" ")[0] || "friend"}! Your feedback and topic request were sent directly to our editorial team.`
          );
          setTimeout(() => setSuccessMsg(null), 5000);
        }
      }
    } catch {
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
    <section
      aria-label="Community Discussion and Reader Feedback"
      className="my-12 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm"
    >
      {/* Unified Header & Reaction Actions */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="max-w-xl">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-900 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
              Community Discussion &amp; Reader Feedback
            </span>
            {category && (
              <span className="text-xs text-slate-400 font-medium">
                {category}
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Join the Discussion or Request Our Next Topic
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Share your perspective in the public thread below, or tell us what SEO teardown, case study, or update regarding{" "}
            <span className="font-semibold text-slate-800">{title}</span> you want us to cover next.
          </p>
        </div>

        {/* Reaction Action Bar */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleToggleLike}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-2xs cursor-pointer ${
              effectiveUserLiked
                ? "bg-rose-50 text-rose-600 border border-rose-200"
                : "bg-slate-50 text-slate-700 border border-slate-200 hover:border-rose-300 hover:text-rose-600"
            }`}
          >
            <Heart
              className={`h-4 w-4 ${
                effectiveUserLiked ? "fill-rose-500 text-rose-500 scale-110" : ""
              } transition-transform`}
            />
            <span>
              {effectiveLikes} {effectiveLikes === 1 ? "Like" : "Likes"}
            </span>
          </button>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-slate-600">
            <MessageSquare className="h-4 w-4 text-neutral-900" />
            <span>
              {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
            </span>
          </div>
        </div>
      </div>

      {/* Unified Form with Mode Switcher */}
      <div className="pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100/80 p-1">
            <button
              type="button"
              onClick={() => {
                setMode("comment");
                setError(null);
              }}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                mode === "comment"
                  ? "bg-neutral-900 text-white shadow-2xs"
                  : "text-slate-600 hover:text-neutral-900"
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Public Comment</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("feedback");
                setError(null);
              }}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                mode === "feedback"
                  ? "bg-neutral-900 text-white shadow-2xs"
                  : "text-slate-600 hover:text-neutral-900"
              }`}
            >
              <Mail className="h-3.5 w-3.5" />
              <span>What Do You Want to Hear Next? (Feedback)</span>
            </button>
          </div>

          <span className="text-[11px] font-medium text-slate-400">
            {mode === "comment"
              ? "Posts immediately to the article discussion thread"
              : "Sent directly to Mubashar Sharif's editorial inbox"}
          </span>
        </div>

        {successMsg && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-xs font-bold text-emerald-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-xs font-bold text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-slate-700">
                Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name (e.g. Alex Mercer)"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-neutral-900 focus:bg-white focus:ring-1 focus:ring-neutral-900"
              />
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-semibold text-slate-700">
                Profession / Role
              </label>
              <input
                type="text"
                list="unified-profession-options"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. SEO Director, Founder, Attorney"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-neutral-900 focus:bg-white focus:ring-1 focus:ring-neutral-900"
              />
              <datalist id="unified-profession-options">
                <option value="SEO Specialist / Strategist" />
                <option value="Agency Owner / Director" />
                <option value="Founder / CEO" />
                <option value="Marketing Manager / CMO" />
                <option value="Ecommerce Manager" />
                <option value="Attorney / Law Firm Partner" />
                <option value="Local Business Owner" />
                <option value="Software Engineer / Developer" />
                <option value="Content Strategist" />
              </datalist>
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-semibold text-slate-700">
                Email {mode === "feedback" ? "*" : "(optional — for follow-up)"}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={mode === "feedback"}
                placeholder="you@company.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-neutral-900 focus:bg-white focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-semibold text-slate-700">
              {mode === "comment"
                ? "Your Comment, Perspective, or Topic Request *"
                : "What SEO topics, technical teardowns, or case studies should we cover next? *"}
            </label>
            <textarea
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                mode === "comment"
                  ? "Share your thoughts on this article, observations from your own site, or what topic you want us to cover next..."
                  : "Tell us what SEO topics, technical guides, or industry case studies you want to hear from us next..."
              }
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-neutral-900 focus:bg-white focus:ring-1 focus:ring-neutral-900 resize-y"
            />
          </div>

          {/* Honeypot */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            aria-hidden="true"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="text-[11px] text-slate-400">
              {mode === "comment"
                ? "Your email is never displayed publicly."
                : "We never share your email. Used only to reply to your topic request."}
            </p>

            <button
              type="submit"
              disabled={submitting || !content.trim() || !name.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-neutral-800 disabled:opacity-50 transition-all cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>
                    {mode === "comment" ? "Post Comment" : "Send Editorial Feedback"}
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Community Perspectives ({comments.length})
          </h3>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 text-slate-400">
            <Loader2 className="h-5 w-5 animate-spin mb-2 text-neutral-900" />
            <p className="text-xs font-medium">Loading discussion...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-7 rounded-2xl bg-slate-50 border border-dashed border-slate-200">
            <Sparkles className="h-5 w-5 text-neutral-900 mx-auto mb-1.5 opacity-50" />
            <p className="text-xs font-bold text-slate-700">No comments yet</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Be the first to share your observations or request a follow-up teardown above.
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
                  <div className="h-9 w-9 rounded-full bg-neutral-900 text-white text-xs font-black flex items-center justify-center shadow-sm">
                    {comment.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        {comment.name}
                      </span>
                      {comment.role && (
                        <span className="text-[10px] font-semibold text-neutral-900 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
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
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-800 px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
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
