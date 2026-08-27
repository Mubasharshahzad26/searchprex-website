import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Determine the base URL dynamically based on the request to support both dev and production
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const host = req.headers.get("host");
    const baseUrl = `${protocol}://${host}`;

    // Call the protected cron endpoint locally using the server-side secret
    const res = await fetch(`${baseUrl}/api/cron/process-leads`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${process.env.CRON_SECRET}`
      }
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch(e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
