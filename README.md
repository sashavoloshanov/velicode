# Velicode

**[velicode.vercel.app](https://velicode.vercel.app)**

Portfolio & project-request website for a native iOS, Android & Web development studio. Bilingual (EN/UA), with a live contact form that saves submissions to Google Sheets and sends automated email replies.

## Features

- Bilingual (EN / UA) with a language toggle
- Dark / light theme toggle
- Public projects section with platform-specific store links and screenshots
- Tech stack overview grouped by category (Mobile, Cross-platform, Backend, Web)
- Contact form: multi-select platforms, work type, and timeline — all button-based, no dropdowns
- Form submissions saved to Google Sheets via a service account
- Instant Telegram notification for every new project request
- Automated email auto-reply to the client + notification email via [Resend](https://resend.com)
- [Vercel Analytics](https://vercel.com/analytics) enabled
- Privacy Policy page

## Stack

- **Framework:** [Next.js](https://nextjs.org) (React, TypeScript, App Router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com)
- **Icons:** [Lucide React](https://lucide.dev) + custom inline SVGs
- **Hosting:** [Vercel](https://vercel.com)
- **Form backend:** [Google Sheets API](https://developers.google.com/sheets/api) (via a service account)
- **Email:** [Resend](https://resend.com)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Required for the contact form to save submissions and send emails. Set these in Vercel → Project → Settings → Environment Variables (or a local `.env.local` file for development):

| Variable | Description |
|---|---|
| `GOOGLE_CREDENTIALS` | Full JSON content of a Google service account key with access to Sheets API |
| `GOOGLE_SHEET_ID` | ID of the target Google Sheet (from its URL) |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) |
| `NOTIFY_EMAIL` | Email address that receives new project-request notifications |
| `TELEGRAM_BOT_TOKEN` | Bot token from [@BotFather](https://t.me/BotFather) |
| `TELEGRAM_CHAT_ID` | Chat ID that receives instant Telegram notifications for new requests |

Without these set, the form still works but submissions are only logged to the server console instead of being saved/emailed.

## Deployment

Push to `main` — Vercel auto-deploys.

## Links

- **Live site:** [velicode.vercel.app](https://velicode.vercel.app)
- **LinkedIn:** [linkedin.com/in/oleksandr-v-84a067105](https://www.linkedin.com/in/oleksandr-v-84a067105/)
- **GitHub:** [github.com/sashavoloshanov](https://github.com/sashavoloshanov)
