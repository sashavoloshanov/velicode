# Velicode

**[velicode.app](https://www.velicode.app)**

Portfolio & project-request website for a native iOS, Android & Web development studio. Bilingual (EN/UA), with a live contact form that saves submissions to Google Sheets, sends automated email replies, and drives an interactive Telegram workflow for managing incoming leads.

## Features

- Bilingual (EN / UA) with a language toggle
- Dark / light theme toggle
- Public projects section with platform-specific store links and screenshots
- Tech stack overview grouped by category (Mobile, Cross-platform, Backend, Web)
- Contact form: multi-select platforms, work type, and timeline — all button-based, no dropdowns
- Form submissions saved to Google Sheets via a service account
- **Interactive Telegram bot workflow** for managing each request end-to-end (see below)
- Automated email auto-reply to the client + notification email via [Resend](https://resend.com)
- [Vercel Analytics](https://vercel.com/analytics) enabled
- Privacy Policy page

## Telegram request workflow

Every new submission sends a message to a private Telegram chat with a button that walks the request through its lifecycle. Each step edits the same message in place — no chat clutter.

1. **New request** → `✅ Взяти в роботу` — marks the request as taken (Sheets status: `Discussion`).
2. **Taken** → `🚀 Приступаємо до роботи` — opens a Telegram Mini App (a small form that appears over the chat) to record what you learned from the client. Submitting moves status to `In Progress`.
3. **In progress** → `📤 Відправка на перевірку` — marks the request as sent for review.
4. **Sent for review** → two options:
   - `✅ Робота завершена` — marks the request `Delivered` and finalizes the message.
   - `✏️ Потрібні правки` — opens the same Mini App to record revision notes, then returns to step 3. This loop can repeat any number of times.

All state (stage, client notes, revision history, and which Telegram message to update) is stored directly in the Google Sheet — no separate database.

### Sheet columns

| Column | Field | Notes |
|---|---|---|
| A | Timestamp | Also used as the unique request ID |
| B | Contact | Email or phone from the form |
| C | Platforms | Comma-separated |
| D | Type of work | |
| E | Timeline | |
| F | Description | |
| G | Status | Dropdown: `New`, `Discussion`, `Estimate`, `In Progress`, `Delivered` |
| H | Stage | Internal bot state machine value — don't edit manually |
| I | Client notes | Filled via the Mini App |
| J | Revision notes | Filled via the Mini App; accumulates across rounds |
| K | Tracking message ID | Telegram message the bot keeps editing |

### One-time setup

After deploying, register the webhook once (replace `<TOKEN>` with your bot token):

```
https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://www.velicode.app/api/telegram/webhook
```

## Stack

- **Framework:** [Next.js](https://nextjs.org) (React, TypeScript, App Router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com)
- **Icons:** [Lucide React](https://lucide.dev) + custom inline SVGs
- **Hosting:** [Vercel](https://vercel.com)
- **Form backend:** [Google Sheets API](https://developers.google.com/sheets/api) (via a service account)
- **Email:** [Resend](https://resend.com)
- **Bot:** [Telegram Bot API](https://core.telegram.org/bots/api) + [Telegram Mini Apps](https://core.telegram.org/bots/webapps)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Set these in Vercel → Project → Settings → Environment Variables (or a local `.env.local` file for development):

| Variable | Description |
|---|---|
| `GOOGLE_CREDENTIALS` | Full JSON content of a Google service account key with access to Sheets API |
| `GOOGLE_SHEET_ID` | ID of the target Google Sheet (from its URL) |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) |
| `NOTIFY_EMAIL` | Email address that receives new project-request notifications |
| `TELEGRAM_BOT_TOKEN` | Bot token from [@BotFather](https://t.me/BotFather) — also used to validate Mini App requests |
| `TELEGRAM_CHAT_ID` | Chat ID that receives requests and is the only chat the bot will act on |

Without these set, the form still works but submissions are only logged to the server console instead of being saved/emailed/notified.

## Deployment

Push to `main` — Vercel auto-deploys.

## Links

- **Live site:** [velicode.app](https://www.velicode.app)
- **LinkedIn:** [linkedin.com/company/velicode-app](https://www.linkedin.com/company/velicode-app)
- **GitHub:** [github.com/sashavoloshanov](https://github.com/sashavoloshanov)
