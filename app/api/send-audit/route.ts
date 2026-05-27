import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, website, business } = await req.json();

  await resend.emails.send({
    from: "SearchPrex <noreply@searchprex.com>",
    to: "mubasharshahzad726@gmail.com",
    subject: `🔍 New SEO Audit Request — ${website}`,
    html: `
      <h2>New Free Audit Request!</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Website:</strong> ${website}</p>
      <p><strong>Business:</strong> ${business}</p>
    `,
  });

  return NextResponse.json({ success: true });
}