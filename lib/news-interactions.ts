// lib/news-interactions.ts
// Robust storage for News Hub & Article Likes & Comments
// Works with Neon PostgreSQL (via auto-table creation) with fallback to JSON storage

import fs from "fs";
import path from "path";
import { db } from "@/lib/db";

export interface CommentItem {
  id: string;
  slug: string;
  name: string;
  role?: string;
  content: string;
  likes: number;
  createdAt: string;
}

export interface NewsInteractionState {
  slug: string;
  likes: number;
  comments: CommentItem[];
}

const FALLBACK_DIR = path.join(process.cwd(), "scratch");
const FALLBACK_FILE = path.join(FALLBACK_DIR, "news-interactions.json");

// No seeded / demo data: every like and comment count shown on the site is real.
const INITIAL_SEEDS: Record<string, { likes: number; comments: CommentItem[] }> = {};

let tableEnsured = false;

// Auto-create database tables if not already present
export async function ensureInteractionsTable(): Promise<boolean> {
  if (tableEnsured) return true;
  try {
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "NewsInteractionComment" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "slug" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "role" TEXT,
        "content" TEXT NOT NULL,
        "likes" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await db.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "NewsInteractionComment_slug_idx" ON "NewsInteractionComment"("slug");
    `);
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "NewsInteractionLike" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "slug" TEXT NOT NULL,
        "clientId" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "NewsInteractionLike_slug_clientId_key" UNIQUE ("slug", "clientId")
      );
    `);
    await db.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "NewsInteractionLike_slug_idx" ON "NewsInteractionLike"("slug");
    `);
    tableEnsured = true;
    return true;
  } catch (err) {
    console.warn("[news-interactions] DB table creation fallback triggered:", err);
    return false;
  }
}

// Fallback JSON disk storage reader
function getFallbackStore(): Record<string, { likes: number; comments: CommentItem[]; clientLikes: Record<string, boolean> }> {
  try {
    if (fs.existsSync(FALLBACK_FILE)) {
      const data = fs.readFileSync(FALLBACK_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("[news-interactions] Failed to read fallback store:", e);
  }
  return {};
}

// Fallback JSON disk storage writer
function saveFallbackStore(data: Record<string, { likes: number; comments: CommentItem[]; clientLikes: Record<string, boolean> }>) {
  try {
    if (!fs.existsSync(FALLBACK_DIR)) {
      fs.mkdirSync(FALLBACK_DIR, { recursive: true });
    }
    fs.writeFileSync(FALLBACK_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("[news-interactions] Failed to write fallback store:", e);
  }
}

// Get interactions (Likes & Comments) for a given slug
export async function getNewsInteractions(slug: string, clientId?: string): Promise<{ likes: number; userLiked: boolean; comments: CommentItem[] }> {
  const normSlug = slug.trim().toLowerCase();
  const seed = INITIAL_SEEDS[normSlug] || { likes: 0, comments: [] };

  const dbReady = await ensureInteractionsTable();
  if (dbReady) {
    try {
      const dbLikesCountRaw: any = await db.$queryRawUnsafe(
        `SELECT COUNT(*)::int as count FROM "NewsInteractionLike" WHERE "slug" = $1`,
        normSlug
      );
      const dbLikes = (dbLikesCountRaw?.[0]?.count ?? 0) + seed.likes;

      let userLiked = false;
      if (clientId) {
        const userLikeRaw: any = await db.$queryRawUnsafe(
          `SELECT "id" FROM "NewsInteractionLike" WHERE "slug" = $1 AND "clientId" = $2 LIMIT 1`,
          normSlug,
          clientId
        );
        userLiked = Boolean(userLikeRaw && userLikeRaw.length > 0);
      }

      const dbCommentsRaw: any = await db.$queryRawUnsafe(
        `SELECT "id", "slug", "name", "role", "content", "likes", "createdAt" FROM "NewsInteractionComment" WHERE "slug" = $1 ORDER BY "createdAt" DESC`,
        normSlug
      );

      const dbComments: CommentItem[] = (dbCommentsRaw || []).map((c: any) => ({
        id: c.id,
        slug: c.slug,
        name: c.name,
        role: c.role || undefined,
        content: c.content,
        likes: c.likes || 0,
        createdAt: new Date(c.createdAt).toISOString(),
      }));

      // Combine user comments with seeds (avoiding id duplicates)
      const allComments = [...dbComments];
      for (const s of seed.comments) {
        if (!allComments.some((c) => c.id === s.id)) {
          allComments.push(s);
        }
      }

      return {
        likes: dbLikes,
        userLiked,
        comments: allComments,
      };
    } catch (err) {
      console.warn("[news-interactions] DB fetch failed, falling back to local store:", err);
    }
  }

  // Fallback to local store
  const store = getFallbackStore();
  const entry = store[normSlug] || {
    likes: seed.likes,
    comments: [...seed.comments],
    clientLikes: {},
  };

  return {
    likes: entry.likes,
    userLiked: clientId ? Boolean(entry.clientLikes?.[clientId]) : false,
    comments: entry.comments || [],
  };
}

// Toggle Like on a news post
export async function toggleNewsLike(slug: string, clientId: string): Promise<{ likes: number; userLiked: boolean }> {
  const normSlug = slug.trim().toLowerCase();
  const seed = INITIAL_SEEDS[normSlug] || { likes: 0, comments: [] };

  const dbReady = await ensureInteractionsTable();
  if (dbReady) {
    try {
      const existing: any = await db.$queryRawUnsafe(
        `SELECT "id" FROM "NewsInteractionLike" WHERE "slug" = $1 AND "clientId" = $2`,
        normSlug,
        clientId
      );

      let userLiked = false;
      if (existing && existing.length > 0) {
        // Already liked -> remove like
        await db.$executeRawUnsafe(
          `DELETE FROM "NewsInteractionLike" WHERE "slug" = $1 AND "clientId" = $2`,
          normSlug,
          clientId
        );
        userLiked = false;
      } else {
        // Not liked -> insert like
        const id = `like-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        await db.$executeRawUnsafe(
          `INSERT INTO "NewsInteractionLike" ("id", "slug", "clientId") VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`,
          id,
          normSlug,
          clientId
        );
        userLiked = true;
      }

      const dbLikesCountRaw: any = await db.$queryRawUnsafe(
        `SELECT COUNT(*)::int as count FROM "NewsInteractionLike" WHERE "slug" = $1`,
        normSlug
      );
      const totalLikes = (dbLikesCountRaw?.[0]?.count ?? 0) + seed.likes;

      return { likes: totalLikes, userLiked };
    } catch (err) {
      console.warn("[news-interactions] DB like toggle failed, falling back:", err);
    }
  }

  // Fallback
  const store = getFallbackStore();
  if (!store[normSlug]) {
    store[normSlug] = {
      likes: seed.likes,
      comments: [...seed.comments],
      clientLikes: {},
    };
  }

  const current = store[normSlug];
  const isLiked = Boolean(current.clientLikes?.[clientId]);
  if (isLiked) {
    current.likes = Math.max(0, current.likes - 1);
    delete current.clientLikes[clientId];
  } else {
    current.likes += 1;
    current.clientLikes[clientId] = true;
  }
  saveFallbackStore(store);

  return {
    likes: current.likes,
    userLiked: !isLiked,
  };
}

// Add a comment to a news post
export async function addNewsComment(slug: string, name: string, content: string, role?: string): Promise<{ ok: boolean; comment?: CommentItem; error?: string }> {
  const normSlug = slug.trim().toLowerCase();
  const cleanName = name.trim();
  const cleanContent = content.trim();

  if (!cleanName || cleanName.length < 2) {
    return { ok: false, error: "Please provide a valid name (at least 2 characters)." };
  }
  if (!cleanContent || cleanContent.length < 5) {
    return { ok: false, error: "Comment must be at least 5 characters long." };
  }

  const newComment: CommentItem = {
    id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    slug: normSlug,
    name: cleanName.slice(0, 80),
    role: role ? role.trim().slice(0, 80) : undefined,
    content: cleanContent.slice(0, 2000),
    likes: 0,
    createdAt: new Date().toISOString(),
  };

  const dbReady = await ensureInteractionsTable();
  if (dbReady) {
    try {
      await db.$executeRawUnsafe(
        `INSERT INTO "NewsInteractionComment" ("id", "slug", "name", "role", "content", "likes", "createdAt") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        newComment.id,
        newComment.slug,
        newComment.name,
        newComment.role || null,
        newComment.content,
        newComment.likes,
        new Date(newComment.createdAt)
      );
      return { ok: true, comment: newComment };
    } catch (err) {
      console.warn("[news-interactions] DB comment save failed, saving to fallback:", err);
    }
  }

  // Fallback
  const store = getFallbackStore();
  const seed = INITIAL_SEEDS[normSlug] || { likes: 0, comments: [] };
  if (!store[normSlug]) {
    store[normSlug] = {
      likes: seed.likes,
      comments: [...seed.comments],
      clientLikes: {},
    };
  }

  store[normSlug].comments.unshift(newComment);
  saveFallbackStore(store);

  return { ok: true, comment: newComment };
}

// Like an individual comment
export async function toggleCommentLike(commentId: string): Promise<{ ok: boolean; likes: number }> {
  const dbReady = await ensureInteractionsTable();
  if (dbReady) {
    try {
      await db.$executeRawUnsafe(
        `UPDATE "NewsInteractionComment" SET "likes" = "likes" + 1 WHERE "id" = $1`,
        commentId
      );
      const res: any = await db.$queryRawUnsafe(
        `SELECT "likes" FROM "NewsInteractionComment" WHERE "id" = $1`,
        commentId
      );
      return { ok: true, likes: res?.[0]?.likes ?? 1 };
    } catch (err) {
      console.warn("[news-interactions] DB comment like failed, fallback:", err);
    }
  }

  // Fallback
  const store = getFallbackStore();
  for (const slug in store) {
    const c = store[slug].comments.find((item) => item.id === commentId);
    if (c) {
      c.likes = (c.likes || 0) + 1;
      saveFallbackStore(store);
      return { ok: true, likes: c.likes };
    }
  }

  return { ok: true, likes: 1 };
}

/* ─────────────────────────────────────────────────────────────
 * Reader feedback (News Hub "Share your feedback" form)
 * Stored in Postgres (auto-created table) with JSON fallback.
 * ───────────────────────────────────────────────────────────── */
export interface NewsFeedbackInput {
  name: string;
  email: string;
  industry?: string;
  lookingFor?: string;
  likes?: string;
  page?: string;
}

const FEEDBACK_FALLBACK_FILE = path.join(FALLBACK_DIR, "news-feedback.json");
let feedbackTableEnsured = false;

async function ensureFeedbackTable(): Promise<boolean> {
  if (feedbackTableEnsured) return true;
  try {
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "NewsReaderFeedback" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "industry" TEXT,
        "lookingFor" TEXT,
        "likes" TEXT,
        "page" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    feedbackTableEnsured = true;
    return true;
  } catch (err) {
    console.warn("[news-feedback] DB table creation fallback triggered:", err);
    return false;
  }
}

export async function saveNewsFeedback(input: NewsFeedbackInput): Promise<{ ok: boolean; error?: string }> {
  const name = (input.name || "").trim().slice(0, 100);
  const email = (input.email || "").trim().toLowerCase().slice(0, 200);
  const industry = (input.industry || "").trim().slice(0, 100) || null;
  const lookingFor = (input.lookingFor || "").trim().slice(0, 2000) || null;
  const likes = (input.likes || "").trim().slice(0, 2000) || null;
  const page = (input.page || "").trim().slice(0, 300) || null;

  if (name.length < 2) return { ok: false, error: "Please enter your name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "Please enter a valid email address." };
  if (!lookingFor && !likes) return { ok: false, error: "Tell us what you're looking for or what you like." };

  const id = `fb-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  if (await ensureFeedbackTable()) {
    try {
      await db.$executeRawUnsafe(
        `INSERT INTO "NewsReaderFeedback" ("id", "name", "email", "industry", "lookingFor", "likes", "page") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        id, name, email, industry, lookingFor, likes, page
      );
      return { ok: true };
    } catch (err) {
      console.warn("[news-feedback] DB insert failed, using fallback:", err);
    }
  }

  try {
    if (!fs.existsSync(FALLBACK_DIR)) fs.mkdirSync(FALLBACK_DIR, { recursive: true });
    const existing = fs.existsSync(FEEDBACK_FALLBACK_FILE)
      ? JSON.parse(fs.readFileSync(FEEDBACK_FALLBACK_FILE, "utf-8"))
      : [];
    existing.unshift({ id, name, email, industry, lookingFor, likes, page, createdAt: new Date().toISOString() });
    fs.writeFileSync(FEEDBACK_FALLBACK_FILE, JSON.stringify(existing, null, 2), "utf-8");
    return { ok: true };
  } catch (e) {
    console.error("[news-feedback] Fallback write failed:", e);
    return { ok: false, error: "Could not save feedback. Please try again." };
  }
}
