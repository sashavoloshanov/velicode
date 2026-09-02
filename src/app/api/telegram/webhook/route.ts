import { NextResponse } from "next/server";
import { findRowByTimestamp, updateRow, buildMessageText, buildKeyboard, telegramCall, type Stage } from "@/lib/telegramBot";

const ALLOWED_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
  try {
    const update = await request.json();

    // --- Button presses (plain status transitions; input-requiring steps open the Mini App instead) ---
    if (update.callback_query) {
      const cq = update.callback_query;
      const chatId = cq.message?.chat?.id;
      const messageId = cq.message?.message_id;

      if (ALLOWED_CHAT_ID && String(chatId) !== String(ALLOWED_CHAT_ID)) {
        await telegramCall("answerCallbackQuery", { callback_query_id: cq.id });
        return NextResponse.json({ ok: true });
      }

      const data: string = cq.data || "";
      const sep = data.indexOf(":");
      const action = sep === -1 ? data : data.slice(0, sep);
      const timestamp = sep === -1 ? "" : data.slice(sep + 1);

      const row = await findRowByTimestamp(timestamp);
      if (!row) {
        await telegramCall("answerCallbackQuery", { callback_query_id: cq.id, text: "Request not found" });
        return NextResponse.json({ ok: true });
      }

      let newStage: Stage = row.stage;
      let newStatus = row.status;

      if (action === "take" && row.stage === "new") {
        newStage = "taken";
        newStatus = "Discussion";
      } else if (action === "review" && row.stage === "in_progress") {
        newStage = "awaiting_review_decision";
        newStatus = "In Progress";
      } else if (action === "done" && row.stage === "awaiting_review_decision") {
        newStage = "done";
        newStatus = "Delivered";
      } else {
        await telegramCall("answerCallbackQuery", { callback_query_id: cq.id });
        return NextResponse.json({ ok: true });
      }

      await updateRow(row.rowIndex, { stage: newStage, status: newStatus });
      const updatedRow = { ...row, stage: newStage, status: newStatus };

      await telegramCall("editMessageText", {
        chat_id: chatId,
        message_id: messageId,
        text: buildMessageText(updatedRow),
        parse_mode: "HTML",
        reply_markup: buildKeyboard(newStage, timestamp),
      });

      await telegramCall("answerCallbackQuery", { callback_query_id: cq.id });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram webhook error:", error);
    return NextResponse.json({ ok: true }); // always 200 so Telegram doesn't retry forever
  }
}
