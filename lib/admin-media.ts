import { db } from "@/lib/db";
import fs from "node:fs/promises";
import path from "node:path";

const IMAGE_EXT_RE = /\.(avif|gif|jpe?g|png|webp|svg)$/i;
let mediaTableReady = false;

export async function ensureAdminMediaTable(): Promise<void> {
  if (mediaTableReady) return;
  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS admin_media_assets (
      id TEXT PRIMARY KEY,
      filename TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      data_base64 TEXT NOT NULL,
      size_bytes INTEGER NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  mediaTableReady = true;
}

export interface GalleryMediaItem {
  url: string;
  name: string;
  source: "uploaded" | "site";
}

async function scanPublicImages(dir: string, baseDir: string, out: GalleryMediaItem[]): Promise<void> {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await scanPublicImages(fullPath, baseDir, out);
    } else if (entry.isFile() && IMAGE_EXT_RE.test(entry.name)) {
      const rel = path.relative(baseDir, fullPath).split(path.sep).join("/");
      out.push({
        url: `/images/${rel}`,
        name: rel,
        source: "site",
      });
    }
  }
}

export async function listGalleryMedia(): Promise<GalleryMediaItem[]> {
  const uploaded: GalleryMediaItem[] = [];
  try {
    await ensureAdminMediaTable();
    const rows = await db.$queryRaw<Array<{ id: string; filename: string }>>`
      SELECT id, filename
      FROM admin_media_assets
      ORDER BY created_at DESC
      LIMIT 60
    `;
    for (const row of rows) {
      uploaded.push({
        url: `/api/media/${row.id}`,
        name: row.filename,
        source: "uploaded",
      });
    }
  } catch (err) {
    console.warn("[admin-media] Could not list DB media assets:", err);
  }

  const siteImages: GalleryMediaItem[] = [];
  const publicImagesDir = path.join(process.cwd(), "public", "images");
  await scanPublicImages(publicImagesDir, publicImagesDir, siteImages);
  siteImages.sort((a, b) => a.name.localeCompare(b.name));

  return [...uploaded, ...siteImages];
}
