import { notFound } from "next/navigation";
import { getDictionary, hasLocale, Locale } from "../dictionaries";
import InsightsList from "@/components/InsightsList";

const INSIGHT_IMAGES = [
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80",
];

export default async function InsightsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const ip = dict.insights_page;

  const categories =
    lang === "kr"
      ? ["전체", "이민", "세무", "기업", "부동산"]
      : ["All", "Immigration", "Tax", "Corporate", "Property"];

  return (
    <>
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
            {ip.hero_eyebrow}
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-white font-light leading-tight mb-4">
            {ip.hero_title}
          </h1>
          <div className="w-12 h-px bg-gold mb-6" />
          <p className="text-white/60 max-w-xl text-lg">{ip.hero_body}</p>
        </div>
      </section>

      <InsightsList
        articles={dict.insights.articles}
        categories={categories}
        lang={lang}
        insightImages={INSIGHT_IMAGES}
      />
    </>
  );
}
