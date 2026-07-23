import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, Locale } from "../dictionaries";

const SERVICE_IMAGES = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
];

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const sp = dict.services_page;

  const legal = dict.services.items.filter((_, i) => i < 4);
  const accounting = dict.services.items.filter((_, i) => i >= 4);

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-deep py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">
            {sp.hero_eyebrow}
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-white leading-tight whitespace-pre-line mb-4">
            {sp.hero_title}
          </h1>
          <div className="w-12 h-px bg-gold mb-6" />
          <p className="text-white/60 max-w-xl text-lg">{sp.hero_body}</p>
        </div>
      </section>

      {/* Legal */}
      <section className="bg-frost py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl text-navy-deep mb-10 pb-4 border-b border-silver">
            {sp.legal_heading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {legal.map((item, i) => (
              <Link
                key={item.title}
                href={`/${lang}/services/${item.slug}`}
                className="bg-white border border-silver/60 group hover:shadow-lg transition-shadow duration-300 overflow-hidden block"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={SERVICE_IMAGES[i]}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-navy-deep/25 group-hover:bg-navy-deep/15 transition-colors duration-300" />
                </div>
                <div className="p-8 relative">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <h3 className="font-display text-2xl text-navy-deep group-hover:text-gold transition-colors duration-200 mb-3">{item.title}</h3>
                  <p className="text-midgray leading-relaxed">{item.desc}</p>
                  <span className="inline-block mt-4 text-sm text-gold tracking-wide">
                    {lang === "kr" ? "더 알아보기 →" : "Learn more →"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Accounting */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl text-navy-deep mb-10 pb-4 border-b border-silver">
            {sp.accounting_heading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {accounting.map((item, i) => (
              <Link
                key={item.title}
                href={`/${lang}/services/${item.slug}`}
                className="bg-frost border border-silver/60 group hover:shadow-lg transition-shadow duration-300 overflow-hidden block"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={SERVICE_IMAGES[4 + i]}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-navy-deep/25 group-hover:bg-navy-deep/15 transition-colors duration-300" />
                </div>
                <div className="p-8 relative">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <h3 className="font-display text-2xl text-navy-deep group-hover:text-gold transition-colors duration-200 mb-3">{item.title}</h3>
                  <p className="text-midgray leading-relaxed">{item.desc}</p>
                  <span className="inline-block mt-4 text-sm text-gold tracking-wide">
                    {lang === "kr" ? "더 알아보기 →" : "Learn more →"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact prompt */}
      <section className="bg-navy-deep py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/70 text-lg">{sp.contact_prompt}</p>
          <Link
            href={`/${lang}/contact`}
            className="shrink-0 px-7 py-3.5 border border-gold text-gold hover:bg-gold hover:text-navy-deep transition-all duration-200 text-sm tracking-wide"
          >
            {sp.contact_cta} →
          </Link>
        </div>
      </section>
    </>
  );
}
