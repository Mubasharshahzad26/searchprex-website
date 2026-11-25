import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { requireAdmin } from "@/lib/auth/require-admin";
import { db } from "@/lib/db";
import { ensureAdminMediaTable, listGalleryMedia } from "@/lib/admin-media";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // 4 MB limit for serverless + DB storage

function adminErrorResponse(err: unknown) {
  const message = err instanceof Error ? err.message : "Unauthorized";
  const status = /not signed in|admin role|auth/i.test(message) ? 401 : 500;
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function GET() {
  try {
    await requireAdmin();
  } catch (err) {
    return adminErrorResponse(err);
  }

  try {
    const items = await listGalleryMedia();
    return NextResponse.json({ ok: true, items });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not load gallery images.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch (err) {
    return adminErrorResponse(err);
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "Select an image file to upload." }, { status: 400 });
    }

    const mimeType = (file.type || "").toLowerCase();
    if (!ALLOWED_MIME_TYPES.has(mimeType)) {
      return NextResponse.json(
        { ok: false, error: "Unsupported image format. Upload JPG, PNG, WebP, GIF, or AVIF." },
        { status: 400 }
      );
    }

    if (file.size <= 0) {
      return NextResponse.json({ ok: false, error: "Uploaded file is empty." }, { status: 400 });
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { ok: false, error: "Image is too large (max 4 MB). Please resize or compress it first." },
        { status: 413 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    const ext = (file.name.split(".").pop() || "webp").toLowerCase().replace(/[^a-z0-9]/g, "") || "webp";
    const safeName = file.name
      .replace(/[^a-zA-Z0-9._-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || `image.${ext}`;
    const id = `${Date.now().toString(36)}-${randomUUID().slice(0, 8)}.${ext}`;

    await ensureAdminMediaTable();
    await db.$executeRaw`
      INSERT INTO admin_media_assets (id, filename, mime_type, data_base64, size_bytes)
      VALUES (${id}, ${safeName}, ${mimeType}, ${base64}, ${buffer.length})
    `;

    return NextResponse.json({
      ok: true,
      url: `/api/media/${id}`,
      name: safeName,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Image upload failed.";
    console.error("[api/admin/media] Upload error:", err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
