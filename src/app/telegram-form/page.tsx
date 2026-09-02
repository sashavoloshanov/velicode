"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        initData: string;
        themeParams: Record<string, string>;
        MainButton: {
          setText: (text: string) => void;
          show: () => void;
          hide: () => void;
          enable: () => void;
          disable: () => void;
          onClick: (cb: () => void) => void;
          offClick: (cb: () => void) => void;
        };
      };
    };
  }
}

function FormContent() {
  const params = useSearchParams();
  const ts = params.get("ts") || "";
  const type = params.get("type") || "clientInfo";

  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "done">("idle");
  const [ready, setReady] = useState(false);

  const title = type === "revision" ? "Що потрібно виправити?" : "Що дізнались від клієнта?";
  const placeholder =
    type === "revision"
      ? "Опишіть, що саме треба доопрацювати..."
      : "Деталі, вимоги, побажання клієнта...";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    script.onload = () => {
      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.ready();
        tg.expand();
      }
      setReady(true);
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setStatus("sending");
    const tg = window.Telegram?.WebApp;
    try {
      const res = await fetch("/api/telegram/mini-app-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ts, type, text: text.trim(), initData: tg?.initData || "" }),
      });
      if (res.ok) {
        setStatus("done");
        setTimeout(() => tg?.close(), 600);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px 16px",
        background: "var(--tg-theme-bg-color, #0a0a0b)",
        color: "var(--tg-theme-text-color, #ffffff)",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{title}</h1>

      {status === "done" ? (
        <p style={{ color: "#34d399", fontWeight: 600 }}>✅ Збережено</p>
      ) : (
        <>
          <textarea
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            rows={8}
            style={{
              width: "100%",
              boxSizing: "border-box",
              borderRadius: 12,
              border: "1px solid var(--tg-theme-hint-color, #3a3a3c)",
              background: "var(--tg-theme-secondary-bg-color, #18181b)",
              color: "var(--tg-theme-text-color, #ffffff)",
              padding: 12,
              fontSize: 15,
              resize: "vertical",
              outline: "none",
            }}
          />

          {status === "error" && (
            <p style={{ color: "#f87171", fontSize: 14 }}>Щось пішло не так. Спробуйте ще раз.</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={!ready || !text.trim() || status === "sending"}
            style={{
              padding: "14px 20px",
              borderRadius: 12,
              border: "none",
              background: "var(--tg-theme-button-color, #3b82f6)",
              color: "var(--tg-theme-button-text-color, #ffffff)",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
              opacity: !ready || !text.trim() || status === "sending" ? 0.5 : 1,
            }}
          >
            {status === "sending" ? "Надсилаємо..." : "Відправити"}
          </button>
        </>
      )}
    </div>
  );
}

export default function TelegramFormPage() {
  return (
    <Suspense fallback={null}>
      <FormContent />
    </Suspense>
  );
}
