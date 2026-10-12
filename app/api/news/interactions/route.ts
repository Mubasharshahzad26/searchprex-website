// app/api/news/interactions/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  getNewsInteractions,
  toggleNewsLike,
  addNewsComment,
  toggleCommentLike,
} from "@/lib/news-interactions";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug") || "seo-news-hub";
    const clientId = searchParams.get("clientId") || undefined;

    const data = await getNewsInteractions(slug, clientId);
    return NextResponse.json({ ok: true, ...data });
  } catch (error) {
    console.error("[api/news/interactions] GET error:", error);
    return NextResponse.json({ ok: false, error: "Failed to fetch interactions" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid JSON payload" }, { status: 400 });
    }

    const { action, slug, clientId, name, role, content, commentId } = body;

    if (action === "like") {
      if (!slug || !clientId) {
        return NextResponse.json({ ok: false, error: "Missing slug or clientId" }, { status: 400 });
      }
      const res = await toggleNewsLike(slug, clientId);
      return NextResponse.json({ ok: true, ...res });
    }

    if (action === "comment") {
      if (!slug || !name || !content) {
        return NextResponse.json({ ok: false, error: "Name and comment content are required" }, { status: 400 });
      }
      const res = await addNewsComment(slug, name, content, role);
      if (!res.ok) {
        return NextResponse.json({ ok: false, error: res.error }, { status: 400 });
      }
      return NextResponse.json({ ok: true, comment: res.comment });
    }

    if (action === "like_comment") {
      if (!commentId) {
        return NextResponse.json({ ok: false, error: "Missing commentId" }, { status: 400 });
      }
      const res = await toggleCommentLike(commentId);
      return NextResponse.json({ ok: true, ...res });
    }

    if (action === "batch") {
      const slugs: string[] = Array.isArray(body.slugs) ? body.slugs : [];
      const results: Record<string, { likes: number; commentsCount: number; userLiked: boolean }> = {};
      for (const s of slugs) {
        const item = await getNewsInteractions(s, clientId);
        results[s] = {
          likes: item.likes,
          commentsCount: item.comments.length,
          userLiked: item.userLiked,
        };
      }
      return NextResponse.json({ ok: true, batch: results });
    }

    return NextResponse.json({ ok: false, error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("[api/news/interactions] POST error:", error);
    return NextResponse.json({ ok: false, error: "Server processing error" }, { status: 500 });
  }
}
