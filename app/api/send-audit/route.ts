import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, website, business } = await req.json();

    const result = await resend.emails.send({
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

    console.log("Resend result:", JSON.stringify(result));
    return NextResponse.json({ success: true, result });

  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}