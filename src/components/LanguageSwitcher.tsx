"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

function UKFlag() {
  return (
    <svg width="22" height="16" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" className="rounded-sm flex-shrink-0">
      <rect width="60" height="40" fill="#012169" />
      {/* St Andrew's cross — white diagonals */}
      <line x1="0" y1="0" x2="60" y2="40" stroke="white" strokeWidth="13" />
      <line x1="60" y1="0" x2="0" y2="40" stroke="white" strokeWidth="13" />
      {/* St Patrick's cross — red diagonals, offset */}
      <line x1="0" y1="0" x2="60" y2="40" stroke="#C8102E" strokeWidth="5" />
      <line x1="60" y1="0" x2="35" y2="17" stroke="#C8102E" strokeWidth="5" />
      <line x1="25" y1="23" x2="0" y2="40" stroke="#C8102E" strokeWidth="5" />
      {/* St George's cross — white */}
      <rect x="0" y="13.5" width="60" height="13" fill="white" />
      <rect x="23.5" y="0" width="13" height="40" fill="white" />
      {/* St George's cross — red */}
      <rect x="0" y="16.5" width="60" height="7" fill="#C8102E" />
      <rect x="26.5" y="0" width="7" height="40" fill="#C8102E" />
    </svg>
  );
}

function KRFlag() {
  return (
    <svg width="22" height="16" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" className="rounded-sm flex-shrink-0">
      <rect width="60" height="40" fill="white" />
      {/* Taegeuk — blue lower half drawn first */}
      <path
        d="M30,20 m-10,0 a10,10 0 1,1 20,0 a5,5 0 1,1 -10,0 a5,5 0 1,0 -10,0z"
        fill="#003478"
      />
      {/* Taegeuk — red upper half drawn on top */}
      <path
        d="M30,20 m-10,0 a10,10 0 1,0 20,0 a5,5 0 1,0 -10,0 a5,5 0 1,1 -10,0z"
        fill="#CD2E3A"
      />
      {/* Top-left trigram (건) — 3 solid lines */}
      <line x1="7" y1="7"  x2="14" y2="7"  stroke="black" strokeWidth="1.5"/>
      <line x1="7" y1="10" x2="14" y2="10" stroke="black" strokeWidth="1.5"/>
      <line x1="7" y1="13" x2="14" y2="13" stroke="black" strokeWidth="1.5"/>
      {/* Top-right trigram (이) — broken middle line */}
      <line x1="46" y1="7"  x2="53" y2="7"  stroke="black" strokeWidth="1.5"/>
      <line x1="46" y1="10" x2="49" y2="10" stroke="black" strokeWidth="1.5"/>
      <line x1="50" y1="10" x2="53" y2="10" stroke="black" strokeWidth="1.5"/>
      <line x1="46" y1="13" x2="53" y2="13" stroke="black" strokeWidth="1.5"/>
      {/* Bottom-left trigram (감) — broken top & bottom */}
      <line x1="7" y1="27" x2="10" y2="27" stroke="black" strokeWidth="1.5"/>
      <line x1="11" y1="27" x2="14" y2="27" stroke="black" strokeWidth="1.5"/>
      <line x1="7" y1="30" x2="14" y2="30" stroke="black" strokeWidth="1.5"/>
      <line x1="7" y1="33" x2="10" y2="33" stroke="black" strokeWidth="1.5"/>
      <line x1="11" y1="33" x2="14" y2="33" stroke="black" strokeWidth="1.5"/>
      {/* Bottom-right trigram (곤) — all broken */}
      <line x1="46" y1="27" x2="49" y2="27" stroke="black" strokeWidth="1.5"/>
      <line x1="50" y1="27" x2="53" y2="27" stroke="black" strokeWidth="1.5"/>
      <line x1="46" y1="30" x2="49" y2="30" stroke="black" strokeWidth="1.5"/>
      <line x1="50" y1="30" x2="53" y2="30" stroke="black" strokeWidth="1.5"/>
      <line x1="46" y1="33" x2="49" y2="33" stroke="black" strokeWidth="1.5"/>
      <line x1="50" y1="33" x2="53" y2="33" stroke="black" strokeWidth="1.5"/>
    </svg>
  );
}

const FLAGS: Record<string, React.FC> = { en: UKFlag, kr: KRFlag };
const LABELS: Record<string, string> = { en: "English", kr: "한국어" };

interface Props {
  lang: string;
}

export default function LanguageSwitcher({ lang }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const options = [
    { locale: "en", Flag: UKFlag },
    { locale: "kr", Flag: KRFlag },
  ];

  const CurrentFlag = FLAGS[lang] ?? UKFlag;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 py-1"
        aria-label="Select language"
      >
        <CurrentFlag />
        <span className="text-xs tracking-wide hidden lg:block">{LABELS[lang]}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          className={`transition-transform duration-200 opacity-60 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white shadow-xl border border-silver z-50 min-w-[160px]">
          {options.map(({ locale, Flag }) => {
            const target = pathname.replace(
              new RegExp(`^/${lang}(?=/|$)`),
              `/${locale}`
            );
            return (
              <Link
                key={locale}
                href={target}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-frost ${
                  locale === lang
                    ? "text-gold font-medium bg-frost/60"
                    : "text-charcoal"
                }`}
              >
                <Flag />
                <span>{LABELS[locale]}</span>
                {locale === lang && (
                  <svg width="12" height="12" viewBox="0 0 12 12" className="ml-auto text-gold">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
