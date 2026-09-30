// app/api/newsletter/unsubscribe/route.ts
import { NextRequest, NextResponse } from "next/server";
import { unsubscribeFromNewsletter } from "@/lib/newsletter";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") || req.nextUrl.searchParams.get("email") || "";
  const success = await unsubscribeFromNewsletter(token);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${success ? "Unsubscribed" : "Unsubscribe"} | SearchPrex</title>
</head>
<body style="margin:0;padding:0;background:#f8f9fc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;">
  <div style="max-width:460px;width:90%;background:#ffffff;border:1px solid #e5e7eb;border-top:4px solid #534AB7;border-radius:12px;padding:36px;text-align:center;box-shadow:0 10px 25px rgba(10,15,46,0.06);">
    <h1 style="margin:0 0 12px;font-size:22px;font-weight:800;color:#0a0f2e;">
      ${success ? "You&rsquo;ve been unsubscribed" : "Unsubscribe request processed"}
    </h1>
    <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#64748b;">
      ${
        success
          ? "You will no longer receive new blog post email alerts from SearchPrex."
          : "If your email was on our active subscriber list, it has been removed."
      }
    </p>
    <a href="/blog" style="display:inline-block;background:#0a0f2e;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;padding:12px 24px;border-radius:8px;">
      &larr; Return to SearchPrex Blog
    </a>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function POST(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") || req.nextUrl.searchParams.get("email") || "";
  const success = await unsubscribeFromNewsletter(token);
  return NextResponse.json({ ok: success });
}
