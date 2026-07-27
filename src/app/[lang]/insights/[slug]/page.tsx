import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, Locale } from "../../dictionaries";

// Hero/thumbnail image per article slug.
const ARTICLE_IMAGES: Record<string, string> = {
  "uk-visa-changes-2025":
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=85",
  "self-assessment-deadline-guide":
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1920&q=85",
  "setting-up-a-business-uk":
    "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1920&q=85",
};

const FALLBACK_IMAGE = ARTICLE_IMAGES["uk-visa-changes-2025"];

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of ["en", "kr"] as const) {
    const dict = await getDictionary(lang);
    for (const article of dict.insights.articles) {
      params.push({ lang, slug: article.slug });
    }
  }
  return params;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const articles = dict.insights.articles;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const heroImage = ARTICLE_IMAGES[slug] ?? FALLBACK_IMAGE;

  // Up to two other articles for further reading.
  const others = articles.filter((a) => a.slug !== slug).slice(0, 2);

  const backLabel = lang === "kr" ? "← 최신 소식" : "← All Insights";
  const shareLabel = lang === "kr" ? "이 글 공유하기" : "Share this article";
  const moreLabel = lang === "kr" ? "다른 글 더 보기" : "Continue reading";
  const ctaTitle =
    lang === "kr" ? "도움이 필요하신가요?" : "Need advice on this?";
  const ctaBody =
    lang === "kr"
      ? "본 주제에 관한 구체적인 상담이 필요하시면, 영어·한국어 이중 언어 팀이 도와드리겠습니다."
      : "For advice tailored to your situation, our bilingual team is here to help — in English or Korean.";
  const ctaButton = lang === "kr" ? "문의하기 →" : "Get in Touch →";

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy-deep min-h-[52vh] flex items-end overflow-hidden">
        <Image
          src={heroImage}
          alt={article.title}
          fill
          priority
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy-deep/20" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 pb-16 pt-32 w-full">
          <Link
            href={`/${lang}/insights`}
            className="text-white/60 hover:text-gold text-sm tracking-wide transition-colors mb-6 inline-block"
          >
            {backLabel}
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] tracking-widest uppercase text-gold border border-gold/40 px-2 py-0.5">
              {article.category}
            </span>
            <span className="text-white/50 text-xs tracking-wide">
              {article.date}
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-white leading-tight">
            {article.title}
          </h1>
        </div>
      </section>

      {/* Article body */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="w-12 h-px bg-gold mb-10" />

          <p className="text-charcoal text-xl leading-relaxed mb-10 font-light">
            {article.excerpt}
          </p>

          <div className="space-y-6">
            {article.body.map((paragraph, i) => (
              <p key={i} className="text-charcoal/90 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Share */}
          <div className="mt-14 pt-8 border-t border-silver flex items-center justify-between">
            <span className="text-xs tracking-widest uppercase text-midgray">
              {shareLabel}
            </span>
            <div className="flex gap-4 text-midgray">
              <span className="w-9 h-9 border border-silver rounded-full flex items-center justify-center text-xs hover:border-navy-deep hover:text-navy-deep transition-colors">
                in
              </span>
              <span className="w-9 h-9 border border-silver rounded-full flex items-center justify-center text-xs hover:border-navy-deep hover:text-navy-deep transition-colors">
                f
              </span>
              <span className="w-9 h-9 border border-silver rounded-full flex items-center justify-center text-xs hover:border-navy-deep hover:text-navy-deep transition-colors">
                ✉
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-deep py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl text-white mb-2">{ctaTitle}</h2>
            <p className="text-white/70">{ctaBody}</p>
          </div>
          <Link
            href={`/${lang}/contact`}
            className="shrink-0 px-7 py-3.5 border border-gold text-gold hover:bg-gold hover:text-navy-deep transition-all duration-200 text-sm tracking-wide font-medium"
          >
            {ctaButton}
          </Link>
        </div>
      </section>

      {/* Continue reading */}
      {others.length > 0 && (
        <section className="bg-frost py-16">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h2 className="font-display text-2xl text-navy-deep mb-8">
              {moreLabel}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {others.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${lang}/insights/${item.slug}`}
                  className="bg-white border border-silver p-6 group hover:shadow-md transition-shadow duration-200 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <span className="text-[10px] tracking-widest uppercase text-gold/80 border border-gold/30 px-2 py-0.5 mb-4 inline-block">
                    {item.category}
                  </span>
                  <h3 className="font-display text-xl text-navy-deep group-hover:text-gold transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-midgray text-sm mt-2 leading-relaxed">
                    {item.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
