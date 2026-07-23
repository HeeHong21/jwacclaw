"use client";

import { useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ContactFormProps {
  dict: Dictionary["contact"];
}

export default function ContactForm({ dict }: ContactFormProps) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "done" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      service: fd.get("service"),
      message: fd.get("message"),
      website: fd.get("website"), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
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
            name="name"
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
            name="email"
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
            name="phone"
            type="tel"
            className="w-full border border-silver px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-navy-deep transition-colors bg-white"
          />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase text-midgray mb-2">
            {dict.service_label}
          </label>
          <select
            name="service"
            className="w-full border border-silver px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-navy-deep transition-colors bg-white appearance-none"
          >
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
          name="message"
          rows={5}
          className="w-full border border-silver px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-navy-deep transition-colors bg-white resize-none"
        />
      </div>

      {/* Honeypot — hidden from real users, catches bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {status === "error" && (
        <p className="text-sm text-red-600">{dict.error}</p>
      )}

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
