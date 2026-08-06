import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, platform, deadline, description } = body;

    if (!email || !description) {
      return NextResponse.json({ error: "Email and description are required" }, { status: 400 });
    }

    // TODO: Integrate with Google Sheets API
    // TODO: Send auto-reply email via Resend

    console.log("New contact form submission:", { email, platform, deadline, description, timestamp: new Date().toISOString() });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
