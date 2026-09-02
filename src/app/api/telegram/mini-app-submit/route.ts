import { NextResponse } from "next/server";
import { findRowByTimestamp, updateRow, buildMessageText, buildKeyboard, telegramCall, validateInitData } from "@/lib/telegramBot";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ts, type, text, initData } = body as { ts?: string; type?: string; text?: string; initData?: string };

    if (!ts || !type || !text || !initData) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const valid = await validateInitData(initData);
    if (!valid) {
      return NextResponse.json({ error: "Invalid Telegram data" }, { status: 401 });
    }

    const row = await findRowByTimestamp(ts);
    if (!row) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    let clientNotes = row.clientNotes;
    let revisionNotes = row.revisionNotes;

    if (type === "clientInfo" && row.stage === "taken") {
      clientNotes = text;
    } else if (type === "revision" && row.stage === "awaiting_review_decision") {
      const roundNum = revisionNotes ? revisionNotes.split("\n---\n").length + 1 : 1;
      revisionNotes = revisionNotes ? `${revisionNotes}\n---\n#${roundNum}: ${text}` : `#1: ${text}`;
    } else {
      return NextResponse.json({ error: "Unexpected stage for this form" }, { status: 409 });
    }

    const newStage = "in_progress" as const;
    const newStatus = "In Progress";

    await updateRow(row.rowIndex, { stage: newStage, status: newStatus, clientNotes, revisionNotes });
    const updatedRow = { ...row, stage: newStage, status: newStatus, clientNotes, revisionNotes };

    if (row.trackingMessageId && process.env.TELEGRAM_CHAT_ID) {
      await telegramCall("editMessageText", {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        message_id: Number(row.trackingMessageId),
        text: buildMessageText(updatedRow),
        parse_mode: "HTML",
        reply_markup: buildKeyboard(newStage, row.timestamp),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Mini app submit error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
