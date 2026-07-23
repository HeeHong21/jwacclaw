"use client";

import { useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ContactFormProps {
  dict: Dictionary["contact"];
}

export default function ContactForm({ dict }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="flex items-center justify-center py-16 text-center">
        <div>
          <div className="w-12 h-12 border-2 border-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-gold text-xl">✓</span>
          </div>
          <p className="text-navy-deep font-display text-2xl mb-2">{dict.success}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs tracking-widest uppercase text-midgray mb-2">
            {dict.name_label}
          </label>
          <input
            required
            type="text"
            className="w-full border border-silver px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-navy-deep transition-colors bg-white"
          />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase text-midgray mb-2">
            {dict.email_label}
          </label>
          <input
            required
            type="email"
            className="w-full border border-silver px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-navy-deep transition-colors bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs tracking-widest uppercase text-midgray mb-2">
            {dict.phone_label}
          </label>
          <input
            type="tel"
            className="w-full border border-silver px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-navy-deep transition-colors bg-white"
          />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase text-midgray mb-2">
            {dict.service_label}
          </label>
          <select className="w-full border border-silver px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-navy-deep transition-colors bg-white appearance-none">
            <option value="">—</option>
            {dict.service_options.map((opt: string) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs tracking-widest uppercase text-midgray mb-2">
          {dict.message_label}
        </label>
        <textarea
          required
          rows={5}
          className="w-full border border-silver px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-navy-deep transition-colors bg-white resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full md:w-auto px-10 py-3.5 bg-navy-deep text-white text-sm tracking-wide hover:bg-navy-rich transition-colors duration-200 disabled:opacity-60"
      >
        {status === "sending" ? dict.sending : dict.submit}
      </button>
    </form>
  );
}
