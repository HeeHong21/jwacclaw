import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface FooterProps {
  dict: Dictionary;
  lang: string;
}

export default function Footer({ dict, lang }: FooterProps) {
  const serviceLinks = [
    { label: dict.services.items[0].title, href: `/${lang}/services` },
    { label: dict.services.items[1].title, href: `/${lang}/services` },
    { label: dict.services.items[2].title, href: `/${lang}/services` },
    { label: dict.services.items[4].title, href: `/${lang}/services` },
    { label: dict.services.items[5].title, href: `/${lang}/services` },
  ];

  const companyLinks = [
    { label: dict.nav.about, href: `/${lang}/about` },
    { label: dict.nav.insights, href: `/${lang}/insights` },
    { label: dict.nav.contact, href: `/${lang}/contact` },
  ];

  return (
    <footer className="bg-navy-deep text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-display text-3xl font-bold text-slate-jw leading-none">
                JW
              </span>
              <div className="w-px h-8 bg-gold/50" />
              <div className="leading-tight">
                <p className="text-white text-sm font-medium">Legal &amp;</p>
                <p className="text-white text-sm font-medium">Accounting Ltd</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed whitespace-pre-line">
              {dict.footer.tagline}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs tracking-widest uppercase text-gold mb-4">
              {dict.footer.services_title}
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs tracking-widest uppercase text-gold mb-4">
              {dict.footer.company_title}
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs tracking-widest uppercase text-gold mb-4">
              {dict.contact.office_title}
            </h3>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>{dict.contact.office_address}</li>
              <li>
                <a
                  href={`mailto:${dict.contact.office_email}`}
                  className="hover:text-white transition-colors"
                >
                  {dict.contact.office_email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${dict.contact.office_phone}`}
                  className="hover:text-white transition-colors"
                >
                  {dict.contact.office_phone}
                </a>
              </li>
              <li className="text-gold/80">{dict.contact.languages_label}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="text-xs text-white/40 space-y-1">
            <p>{dict.footer.copyright}</p>
            <p>{dict.footer.registered}</p>
          </div>
          <div className="flex gap-6">
            {[dict.footer.privacy, dict.footer.terms, dict.footer.disclaimer].map(
              (label) => (
                <Link
                  key={label}
                  href={`/${lang}/contact`}
                  className="text-xs text-white/40 hover:text-white/70 transition-colors"
                >
                  {label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
