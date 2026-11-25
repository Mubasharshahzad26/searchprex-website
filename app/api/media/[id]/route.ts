import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  if (!id || !/^[a-zA-Z0-9._-]+$/.test(id)) {
    return new NextResponse("Invalid media ID", { status: 400 });
  }

  try {
    const rows = await db.$queryRaw<Array<{ mime_type: string; data_base64: string }>>`
      SELECT mime_type, data_base64
      FROM admin_media_assets
      WHERE id = ${id}
      LIMIT 1
    `;

    const asset = rows?.[0];
    if (!asset) {
      return new NextResponse("Not found", { status: 404 });
    }

    const bytes = Buffer.from(asset.data_base64, "base64");
    return new NextResponse(bytes, {
      status: 200,
      headers: {
        "Content-Type": asset.mime_type || "application/octet-stream",
        "Content-Length": String(bytes.length),
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("[api/media] Failed to load asset:", id, err);
    return new NextResponse("Not found", { status: 404 });
  }
}
