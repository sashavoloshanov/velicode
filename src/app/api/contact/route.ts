import { NextResponse } from "next/server";
import { google } from "googleapis";
import { Resend } from "resend";
import { buildMessageText, buildKeyboard, telegramCall, findRowByTimestamp, updateRow, type RequestRow } from "@/lib/telegramBot";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, platforms, workType, timeline, description } = body;

    if (!email) {
      return NextResponse.json({ error: "Email or phone is required" }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const platformsStr = Array.isArray(platforms) ? platforms.join(", ") : platforms || "Not specified";
    const workTypeStr = workType || "Not specified";
    const timelineStr = timeline || "Not specified";
    const descriptionStr = description || "Not specified";
    const statusStr = "New";

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
          range: "Sheet1!A:K",
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [[timestamp, email, platformsStr, workTypeStr, timelineStr, descriptionStr, statusStr, "new", "", "", ""]],
          },
        });
      } catch (sheetError) {
        console.error("Google Sheets error:", sheetError);
      }
    } else {
      console.log("Google Sheets not configured. Submission:", { timestamp, email, platformsStr, workTypeStr, timelineStr, descriptionStr, statusStr });
    }

    // --- Telegram: instant notification with interactive workflow buttons ---
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      try {
        const row: RequestRow = {
          rowIndex: -1,
          timestamp,
          contact: email,
          platforms: platformsStr,
          workType: workTypeStr,
          timeline: timelineStr,
          description: descriptionStr,
          status: statusStr,
          stage: "new",
          clientNotes: "",
          revisionNotes: "",
          trackingMessageId: "",
        };

        const result = await telegramCall("sendMessage", {
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: buildMessageText(row),
          parse_mode: "HTML",
          reply_markup: buildKeyboard("new", timestamp),
        });

        const messageId = result?.result?.message_id;
        if (messageId && process.env.GOOGLE_CREDENTIALS && process.env.GOOGLE_SHEET_ID) {
          const savedRow = await findRowByTimestamp(timestamp);
          if (savedRow) {
            await updateRow(savedRow.rowIndex, { trackingMessageId: String(messageId) });
          }
        }
      } catch (telegramError) {
        console.error("Telegram error:", telegramError);
      }
    } else {
      console.log("Telegram not configured. Skipping notification.");
    }

    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        if (email.includes("@")) {
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || "Velicode <onboarding@resend.dev>",
            to: email,
            subject: "Thank you for your project request!",
            html: `<div style="font-family: sans-serif; max-width: 480px;"><h2>Thank you for reaching out!</h2><p>We received your project request and we're glad you're interested in working with us.</p><p>We'll review your details and get back to you within 24 hours.</p><br/><p>Best regards,<br/>Velicode<br/><a href="https://www.velicode.app">velicode.app</a></p></div>`,
          });
        }

        if (process.env.NOTIFY_EMAIL) {
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || "Velicode <onboarding@resend.dev>",
            to: process.env.NOTIFY_EMAIL,
            subject: `New project request from ${email}`,
            html: `<div style="font-family: sans-serif;"><h2>New Project Request</h2><p><strong>Contact:</strong> ${email}</p><p><strong>Platforms:</strong> ${platformsStr}</p><p><strong>Type of work:</strong> ${workTypeStr}</p><p><strong>Timeline:</strong> ${timelineStr}</p><p><strong>Description:</strong></p><p>${descriptionStr}</p><br/><p style="color:#888;">Received: ${timestamp}</p></div>`,
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
