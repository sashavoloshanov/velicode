import { NextResponse } from "next/server";
import { google } from "googleapis";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, platform, deadline, description } = body;

    if (!email || !description) {
      return NextResponse.json({ error: "Email and description are required" }, { status: 400 });
    }

    const timestamp = new Date().toISOString();

    // --- Google Sheets ---
    if (process.env.GOOGLE_CREDENTIALS && process.env.GOOGLE_SHEET_ID) {
      try {
        const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
        const auth = new google.auth.GoogleAuth({
          credentials,
          scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });
        const sheets = google.sheets({ version: "v4", auth });
        await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: "Sheet1!A:E",
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [[timestamp, email, platform, deadline || "Not specified", description]],
          },
        });
      } catch (sheetError) {
        console.error("Google Sheets error:", sheetError);
      }
    } else {
      console.log("Google Sheets not configured. Submission:", { timestamp, email, platform, deadline, description });
    }

    // --- Resend: auto-reply to client ---
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Auto-reply to the client (only if email looks like an email)
        if (email.includes("@")) {
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || "Velicode <onboarding@resend.dev>",
            to: email,
            subject: "Thank you for your project request!",
            html: `<div style="font-family: sans-serif; max-width: 480px;">
              <h2>Thank you for reaching out!</h2>
              <p>I received your project request and I'm glad you're interested in working together.</p>
              <p>I'll review your details and get back to you within 24 hours.</p>
              <br/>
              <p>Best regards,<br/>Oleksandr Voloshanov<br/><a href="https://velicode.vercel.app">velicode.vercel.app</a></p>
            </div>`,
          });
        }

        // Notification to you
        if (process.env.NOTIFY_EMAIL) {
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || "Velicode <onboarding@resend.dev>",
            to: process.env.NOTIFY_EMAIL,
            subject: `New project request from ${email}`,
            html: `<div style="font-family: sans-serif;">
              <h2>New Project Request</h2>
              <p><strong>Contact:</strong> ${email}</p>
              <p><strong>Platform:</strong> ${platform}</p>
              <p><strong>Timeline:</strong> ${deadline || "Not specified"}</p>
              <p><strong>Description:</strong></p>
              <p>${description}</p>
              <br/>
              <p style="color:#888;">Received: ${timestamp}</p>
            </div>`,
          });
        }
      } catch (emailError) {
        console.error("Resend error:", emailError);
      }
    } else {
      console.log("Resend not configured. Skipping email.");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
