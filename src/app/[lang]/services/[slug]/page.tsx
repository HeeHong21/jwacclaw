import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, Locale } from "../../dictionaries";

const SERVICE_IMAGES: Record<string, string> = {
  "corporate-commercial":
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80",
  "property-law":
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1920&q=80",
  immigration:
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80",
  "wills-probate":
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1920&q=80",
  "tax-advisory":
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1920&q=80",
  "accounting-audit":
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80",
};

const SLUGS = [
  "corporate-commercial",
  "property-law",
  "immigration",
  "wills-probate",
  "tax-advisory",
  "accounting-audit",
];

export async function generateStaticParams() {
  return ["en", "kr"].flatMap((lang) =>
    SLUGS.map((slug) => ({ lang, slug }))
  );
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const service = dict.services.items.find((item) => item.slug === slug);
  if (!service) notFound();

  const heroImage = SERVICE_IMAGES[slug] ?? SERVICE_IMAGES["corporate-commercial"];

  // Other services for cross-links
  const others = dict.services.items.filter((item) => item.slug !== slug).slice(0, 3);

  const backLabel = lang === "kr" ? "← 전체 서비스" : "← All Services";
  const keyAreasLabel = lang === "kr" ? "주요 서비스 영역" : "Key Areas";
  const relatedLabel = lang === "kr" ? "관련 서비스" : "Related Services";
  const contactLabel = lang === "kr" ? "문의하기 →" : "Get in Touch →";
  const contactBodyLabel =
    lang === "kr"
      ? "본 서비스에 대해 궁금하신 사항이 있으시면 언제든지 문의해 주세요."
      : "Have a question about this service? We would love to hear from you.";

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy-deep min-h-[50vh] flex items-end overflow-hidden">
        <Image
          src={heroImage}
          alt={service.title}
          fill
          priority
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy-deep/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-16 pt-32 w-full">
          <Link
            href={`/${lang}/services`}
            className="text-white/60 hover:text-gold text-sm tracking-wide transition-colors mb-6 inline-block"
          >
            {backLabel}
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] tracking-widest uppercase text-gold border border-gold/40 px-2 py-0.5">
              {service.tag}
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white leading-tight">
            {service.title}
          </h1>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Overview */}
            <div className="lg:col-span-7">
              <div className="w-12 h-px bg-gold mb-8" />
              <p className="text-charcoal text-lg leading-relaxed mb-8">
                {service.extended_desc}
              </p>
              <p className="text-midgray leading-relaxed">{service.desc}</p>
            </div>

            {/* Key Areas sidebar */}
            <div className="lg:col-span-5">
              <div className="bg-frost border border-silver p-8">
                <h2 className="font-display text-2xl text-navy-deep mb-6">
                  {keyAreasLabel}
                </h2>
                <ul className="space-y-3">
                  {service.key_areas.map((area) => (
                    <li key={area} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0" />
                      <span className="text-charcoal text-sm leading-relaxed">
                        {area}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-deep py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl text-white mb-2">
              {service.title}
            </h2>
            <p className="text-white/70">{contactBodyLabel}</p>
          </div>
          <Link
            href={`/${lang}/contact`}
            className="shrink-0 px-7 py-3.5 border border-gold text-gold hover:bg-gold hover:text-navy-deep transition-all duration-200 text-sm tracking-wide font-medium"
          >
            {contactLabel}
          </Link>
        </div>
      </section>

      {/* Related services */}
      <section className="bg-frost py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-2xl text-navy-deep mb-8">
            {relatedLabel}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {others.map((item) => (
              <Link
                key={item.slug}
                href={`/${lang}/services/${item.slug}`}
                className="bg-white border border-silver p-6 group hover:shadow-md transition-shadow duration-200 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <span className="text-[10px] tracking-widest uppercase text-gold/80 border border-gold/30 px-2 py-0.5 mb-4 inline-block">
                  {item.tag}
                </span>
                <h3 className="font-display text-xl text-navy-deep group-hover:text-gold transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-midgray text-sm mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
