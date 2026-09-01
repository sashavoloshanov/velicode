import { google } from "googleapis";

const SHEET_RANGE = "Sheet1!A:K";

export type Stage =
  | "new"
  | "taken"
  | "awaiting_client_info"
  | "in_progress"
  | "awaiting_review_decision"
  | "awaiting_revision_notes"
  | "done";

export interface RequestRow {
  rowIndex: number; // 1-based sheet row number
  timestamp: string;
  contact: string;
  platforms: string;
  workType: string;
  timeline: string;
  description: string;
  status: string;
  stage: Stage;
  clientNotes: string;
  revisionNotes: string;
  trackingMessageId: string;
}

function getSheetsClient() {
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS!);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

function rowFromArray(r: string[], rowIndex: number): RequestRow {
  return {
    rowIndex,
    timestamp: r[0] || "",
    contact: r[1] || "",
    platforms: r[2] || "",
    workType: r[3] || "",
    timeline: r[4] || "",
    description: r[5] || "",
    status: r[6] || "",
    stage: (r[7] as Stage) || "new",
    clientNotes: r[8] || "",
    revisionNotes: r[9] || "",
    trackingMessageId: r[10] || "",
  };
}

export async function findRowByTimestamp(timestamp: string): Promise<RequestRow | null> {
  const sheets = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: SHEET_RANGE,
  });
  const rows = res.data.values || [];
  for (let i = 0; i < rows.length; i++) {
    if (rows[i][0] === timestamp) return rowFromArray(rows[i] as string[], i + 1);
  }
  return null;
}

export async function findRowByTrackingMessageId(messageId: string): Promise<RequestRow | null> {
  const sheets = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: SHEET_RANGE,
  });
  const rows = res.data.values || [];
  for (let i = 0; i < rows.length; i++) {
    if (rows[i][10] === messageId) return rowFromArray(rows[i] as string[], i + 1);
  }
  return null;
}

export async function updateRow(
  rowIndex: number,
  values: { status?: string; stage?: Stage; clientNotes?: string; revisionNotes?: string; trackingMessageId?: string }
) {
  const sheets = getSheetsClient();
  const data: { range: string; values: string[][] }[] = [];
  if (values.status !== undefined) data.push({ range: `Sheet1!G${rowIndex}`, values: [[values.status]] });
  if (values.stage !== undefined) data.push({ range: `Sheet1!H${rowIndex}`, values: [[values.stage]] });
  if (values.clientNotes !== undefined) data.push({ range: `Sheet1!I${rowIndex}`, values: [[values.clientNotes]] });
  if (values.revisionNotes !== undefined) data.push({ range: `Sheet1!J${rowIndex}`, values: [[values.revisionNotes]] });
  if (values.trackingMessageId !== undefined) data.push({ range: `Sheet1!K${rowIndex}`, values: [[values.trackingMessageId]] });
  if (data.length === 0) return;
  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    requestBody: { valueInputOption: "USER_ENTERED", data },
  });
}

function escapeHtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function buildMessageText(row: RequestRow): string {
  let text =
    `🆕 <b>New project request</b>\n\n` +
    `<b>Contact:</b> ${escapeHtml(row.contact)}\n` +
    `<b>Platforms:</b> ${escapeHtml(row.platforms)}\n` +
    `<b>Type of work:</b> ${escapeHtml(row.workType)}\n` +
    `<b>Timeline:</b> ${escapeHtml(row.timeline)}\n` +
    `<b>Description:</b> ${escapeHtml(row.description)}\n\n` +
    `<i>${new Date(row.timestamp).toLocaleString("en-GB", { timeZone: "Europe/Kyiv" })}</i>`;

  if (row.clientNotes) {
    text += `\n\n📝 <b>Client info:</b>\n${escapeHtml(row.clientNotes)}`;
  }
  if (row.revisionNotes) {
    text += `\n\n🔁 <b>Revisions:</b>\n${escapeHtml(row.revisionNotes)}`;
  }

  switch (row.stage) {
    case "taken":
      text += `\n\n🟡 <b>Taken into work.</b>`;
      break;
    case "awaiting_client_info":
      text += `\n\n✍️ <i>Reply to this message with the client info you learned.</i>`;
      break;
    case "in_progress":
      text += `\n\n🔵 <b>In progress.</b>`;
      break;
    case "awaiting_review_decision":
      text += `\n\n🟣 <b>Sent for review.</b>`;
      break;
    case "awaiting_revision_notes":
      text += `\n\n✍️ <i>Reply to this message with the revisions needed.</i>`;
      break;
    case "done":
      text += `\n\n✅ <b>Completed.</b>`;
      break;
  }

  return text;
}

export function buildKeyboard(stage: Stage, timestamp: string) {
  const btn = (text: string, action: string) => ({ text, callback_data: `${action}:${timestamp}` });
  switch (stage) {
    case "new":
      return { inline_keyboard: [[btn("✅ Взяти в роботу", "take")]] };
    case "taken":
      return { inline_keyboard: [[btn("🚀 Приступаємо до роботи", "start")]] };
    case "in_progress":
      return { inline_keyboard: [[btn("📤 Відправка на перевірку", "review")]] };
    case "awaiting_review_decision":
      return { inline_keyboard: [[btn("✅ Робота завершена", "done"), btn("✏️ Потрібні правки", "revise")]] };
    default:
      return undefined;
  }
}

export async function telegramCall(method: string, payload: Record<string, unknown>) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return null;
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
