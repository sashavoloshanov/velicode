"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { LinkedinIcon } from "./Icons";

export default function ContactForm() {
  const { t } = useApp();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({ email: "", platform: "iOS", deadline: "", description: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { setStatus("success"); setForm({ email: "", platform: "iOS", deadline: "", description: "" }); }
      else { setStatus("error"); }
    } catch { setStatus("error"); }
  };

  if (status === "success") {
    return (
      <section id="contact" className="scroll-mt-24 px-6 py-24">
        <div className="mx-auto max-w-2xl rounded-2xl border border-green-200 bg-green-50 p-8 text-center dark:border-green-900 dark:bg-green-950/30">
          <CheckCircle size={48} className="mx-auto text-green-600 dark:text-green-400" />
          <p className="mt-4 text-lg font-medium text-green-800 dark:text-green-300">{t.contact.success}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.contact.heading}</h2>
        <p className="mt-3 text-[var(--color-text-secondary)]">{t.contact.subtitle}</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium">{t.contact.fields.email}</label>
            <input type="text" id="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-accent)]" />
          </div>
          <div>
            <label htmlFor="platform" className="mb-1.5 block text-sm font-medium">{t.contact.fields.platform}</label>
            <select id="platform" value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-accent)]">
              {t.contact.fields.platformOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
            </select>
          </div>
          <div>
            <label htmlFor="deadline" className="mb-1.5 block text-sm font-medium">{t.contact.fields.deadline}</label>
            <input type="text" id="deadline" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} placeholder={t.contact.fields.deadlinePlaceholder} className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[var(--color-text-secondary)]/50 focus:border-[var(--color-accent)]" />
          </div>
          <div>
            <label htmlFor="description" className="mb-1.5 block text-sm font-medium">{t.contact.fields.description}</label>
            <textarea id="description" required rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder={t.contact.fields.descriptionPlaceholder} className="w-full resize-none rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[var(--color-text-secondary)]/50 focus:border-[var(--color-accent)]" />
          </div>
          {status === "error" && (<div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400"><AlertCircle size={16} />{t.contact.error}</div>)}
          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" disabled={status === "sending"} className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)] disabled:opacity-50">
              <Send size={16} />{t.contact.submit}
            </button>
            <a href="https://www.linkedin.com/in/oleksandr-v-84a067105/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]">
              <LinkedinIcon size={16} />LinkedIn
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
