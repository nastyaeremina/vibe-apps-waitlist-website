"use client";

import { useState } from "react";
import { TYPEFORM_URL } from "../config/site";

// Email-capture CTA for the final section. A unified pill that holds an
// email input on the left and a lime "Request early access" button on
// the right — single focal surface, one clear action.
//
// On submit, we append the email to TYPEFORM_URL as a query param so the
// Typeform can pre-fill (Typeform supports this via `?email=…` when the
// form has a matching hidden field). If the Typeform URL is still the
// placeholder, submission just opens whatever TYPEFORM_URL resolves to —
// the wiring will start working the moment the real URL is plugged in.

export function EmailCTA() {
  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    // Basic sanity check — the native type="email" already does most of
    // the work; this just guards against accidental empty submits.
    if (!trimmed) return;
    const url = new URL(TYPEFORM_URL);
    url.searchParams.set("email", trimmed);
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-md items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] p-1.5 pl-4 backdrop-blur-sm focus-within:border-white/25 transition-colors duration-200"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@firm.com"
        aria-label="Email address"
        className="flex-1 bg-transparent text-[14px] text-white placeholder:text-white/40 outline-none"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#D9ED92] px-4 py-2 text-[13px] font-medium text-[#101010] transition-colors duration-200 hover:bg-[#C7DA86]"
      >
        Request early access
        <svg
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="M13 5l7 7-7 7" />
        </svg>
      </button>
    </form>
  );
}
