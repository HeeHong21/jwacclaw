"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavbarProps {
  dict: Dictionary;
  lang: string;
}

export default function Navbar({ dict, lang }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { href: `/${lang}/services`, label: dict.nav.services },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/insights`, label: dict.nav.insights },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-deep/95 backdrop-blur-sm shadow-lg"
          : "bg-navy-deep"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link
            href={`/${lang}`}
            className="flex items-center gap-3 shrink-0"
            aria-label="JW Legal & Accounting Ltd — Home"
          >
            <span className="font-display text-3xl font-bold text-slate-jw leading-none tracking-tight">
              JW
            </span>
            <div className="w-px h-8 bg-gold/60" />
            <div className="leading-tight">
              <p className="text-white text-xs font-medium tracking-wide">Legal &amp;</p>
              <p className="text-white text-xs font-medium tracking-wide">Accounting Ltd</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-wide transition-colors duration-200 relative py-1 ${
                    isActive ? "text-gold" : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right: lang switcher + CTA */}
          <div className="hidden md:flex items-center gap-5">
            <LanguageSwitcher lang={lang} />
            <Link
              href={`/${lang}/contact`}
              className="text-sm px-5 py-2 border border-gold text-gold hover:bg-gold hover:text-navy-deep transition-all duration-200 tracking-wide"
            >
              {dict.nav.contact}
            </Link>
          </div>

          {/* Mobile: lang switcher + hamburger */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageSwitcher lang={lang} />
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="text-white p-1"
            >
              <span className="block w-5 h-px bg-current mb-1.5" />
              <span className={`block w-5 h-px bg-current mb-1.5 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
              <span className="block w-5 h-px bg-current" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-navy-rich border-t border-white/10 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/80 hover:text-gold transition-colors py-1 text-sm tracking-wide"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`/${lang}/contact`}
            className="text-white/80 hover:text-gold transition-colors py-1 text-sm tracking-wide border-t border-white/10 pt-4"
          >
            {dict.nav.contact}
          </Link>
        </div>
      </div>
    </header>
  );
}
