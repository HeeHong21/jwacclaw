import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, Locale } from "./dictionaries";

const SERVICE_IMAGES = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
];

const INSIGHT_IMAGES = [
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80", // immigration / travel
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80", // documents / tax
  "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80", // business meeting / corporate
];

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-navy-deep min-h-[90vh] flex items-center overflow-hidden">
        {/* Background photo */}
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-50"
          sizes="100vw"
        />
        {/* Solid navy on left — fully covers the photo behind text */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep from-50% via-navy-deep/80 to-navy-deep/30" />
        {/* Gold vertical bar — far right */}
        <div className="absolute right-0 top-24 bottom-24 w-1 bg-gradient-to-b from-transparent via-gold/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-6">
              {dict.hero.eyebrow}
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6 whitespace-pre-line">
              {dict.hero.headline}
            </h1>
            <div className="w-16 h-px bg-gold mb-8" />
            <p className="text-white text-lg leading-relaxed mb-10 max-w-xl opacity-90">
              {dict.hero.subheadline}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${lang}/services`}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-navy-deep text-sm font-semibold tracking-wide hover:bg-gold-light transition-colors duration-200"
              >
                {dict.hero.cta_primary}
                <span>→</span>
              </Link>
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white text-white text-sm font-medium tracking-wide hover:bg-white hover:text-navy-deep transition-colors duration-200"
              >
                {dict.hero.cta_secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-navy-rich border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {(
              [
                [dict.stats.item1_value, dict.stats.item1_label],
                [dict.stats.item2_value, dict.stats.item2_label],
                [dict.stats.item3_value, dict.stats.item3_label],
                [dict.stats.item4_value, dict.stats.item4_label],
              ] as [string, string][]
            ).map(([value, label]) => (
              <div key={label} className="text-center">
                <p className="font-display text-3xl text-gold font-medium">
                  {value}
                </p>
                <p className="text-white/50 text-xs tracking-wide mt-1">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="bg-frost py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">
              {dict.services.eyebrow}
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-navy-deep font-light mb-4">
              {dict.services.title}
            </h2>
            <p className="text-midgray max-w-xl">{dict.services.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {dict.services.items.map((item, i) => (
              <Link
                key={item.title}
                href={`/${lang}/services/${item.slug}`}
                className="bg-white group hover:shadow-lg transition-shadow duration-300 border border-silver/60 overflow-hidden block"
              >
                {/* Card image */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={SERVICE_IMAGES[i]}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-navy-deep/30 group-hover:bg-navy-deep/20 transition-colors duration-300" />
                  <span className="absolute bottom-3 left-3 text-[10px] tracking-widest uppercase text-white border border-white/50 px-2 py-0.5 bg-navy-deep/50 backdrop-blur-sm">
                    {item.tag}
                  </span>
                </div>
                {/* Card body */}
                <div className="p-6 relative">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <h3 className="font-display text-xl text-navy-deep mb-3">
                    {item.title}
                  </h3>
                  <p className="text-midgray text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href={`/${lang}/services`}
              className="inline-flex items-center gap-2 text-navy-deep text-sm tracking-wide border-b border-navy-deep/30 hover:border-gold hover:text-gold transition-colors duration-200 pb-0.5"
            >
              {dict.services.cta} →
            </Link>
          </div>
        </div>
      </section>

      {/* ── About teaser ── */}
      <section className="bg-navy-deep overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image panel */}
            <div className="relative min-h-[420px] lg:min-h-[580px]">
              <Image
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=85"
                alt="Advisors reviewing documents with a client"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-navy-deep/25" />
            </div>

            {/* Text */}
            <div className="py-20 lg:pl-16">
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">
                {dict.about.eyebrow}
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-white font-light leading-tight mb-6 whitespace-pre-line">
                {dict.about.title}
              </h2>
              <div className="w-12 h-px bg-gold mb-6" />
              <p className="text-white/60 leading-relaxed mb-8">
                {dict.about.body}
              </p>
              <Link
                href={`/${lang}/about`}
                className="inline-flex items-center gap-2 text-gold text-sm tracking-wide border-b border-gold/40 hover:border-gold transition-colors pb-0.5"
              >
                {dict.about.cta} →
              </Link>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-white/10">
                {(
                  [
                    [dict.about.stat1_value, dict.about.stat1_label],
                    [dict.about.stat2_value, dict.about.stat2_label],
                    [dict.about.stat3_value, dict.about.stat3_label],
                  ] as [string, string][]
                ).map(([value, label]) => (
                  <div key={label}>
                    <p className="font-display text-3xl text-gold font-light">
                      {value}
                    </p>
                    <p className="text-white/50 text-xs mt-1 leading-relaxed">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Insights ── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">
                {dict.insights.eyebrow}
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-navy-deep font-light">
                {dict.insights.title}
              </h2>
            </div>
            <Link
              href={`/${lang}/insights`}
              className="text-sm text-navy-deep/60 hover:text-gold transition-colors shrink-0 pb-0.5 border-b border-transparent hover:border-gold"
            >
              {dict.insights.cta} →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dict.insights.articles.map((article, i) => (
              <Link
                key={article.title}
                href={`/${lang}/insights`}
                className="group block"
              >
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden mb-5">
                  <Image
                    src={INSIGHT_IMAGES[i]}
                    alt={article.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-navy-deep/20 group-hover:bg-navy-deep/10 transition-colors duration-300" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] tracking-widest uppercase text-white border border-white/50 px-2 py-0.5 bg-navy-deep/60 backdrop-blur-sm">
                      {article.category}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-midgray block mb-2">{article.date}</span>
                <h3 className="font-display text-xl text-navy-deep group-hover:text-gold transition-colors duration-200 mb-3 leading-snug">
                  {article.title}
                </h3>
                <p className="text-midgray text-sm leading-relaxed">
                  {article.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-navy-rich py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-white font-light mb-4">
            {dict.cta_banner.title}
          </h2>
          <p className="text-white/60 mb-10 max-w-lg mx-auto">
            {dict.cta_banner.body}
          </p>
          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-2 px-8 py-4 border border-gold text-gold hover:bg-gold hover:text-navy-deep transition-all duration-200 text-sm tracking-wide"
          >
            {dict.cta_banner.button} →
          </Link>
        </div>
      </section>
    </>
  );
}
