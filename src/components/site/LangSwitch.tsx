"use client";

import { useLang, LANGS, type Lang } from "@/lib/i18n";

export function LangSwitch({ light = false }: { light?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={`inline-flex items-center rounded-full border p-0.5 transition-all ${
        light
          ? "border-paper/40 bg-black/15 backdrop-blur-sm"
          : "border-[rgba(0,98,65,0.22)] bg-white/70 backdrop-blur-sm shadow-xs"
      }`}
    >
      {LANGS.map((l: Lang) => {
        const active = l === lang;
        return (
          <button
            key={l}
            onClick={() => setLang(l)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] transition-all ${
              active
                ? light
                  ? "bg-paper text-[#1e3932] shadow-xs"
                  : "bg-[#006241] text-white shadow-xs"
                : light
                  ? "text-paper/75 hover:text-paper"
                  : "text-[#1e3932]/70 hover:text-[#006241]"
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
