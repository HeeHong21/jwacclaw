import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, Locale } from "../dictionaries";

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const ap = dict.about_page;

  const statsRows: [string, string][] = [
    [dict.about.stat1_value, dict.about.stat1_label],
    [dict.about.stat2_value, dict.about.stat2_label],
    [dict.about.stat3_value, dict.about.stat3_label],
  ];

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
            {ap.hero_eyebrow}
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-white font-light leading-tight whitespace-pre-line mb-4">
            {ap.hero_title}
          </h1>
          <div className="w-12 h-px bg-gold mb-6" />
          <p className="text-white/60 max-w-xl text-lg">{ap.hero_body}</p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="font-display text-3xl text-navy-deep font-light sticky top-28">
                {ap.story_title}
              </h2>
            </div>
            <div className="lg:col-span-8">
              {ap.story_body.split("\n\n").map((para, i) => (
                <p key={i} className="text-midgray leading-relaxed mb-6 last:mb-0 text-lg">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy-deep py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {statsRows.map(([value, label]) => (
              <div key={label} className="text-center px-8 py-10">
                <p className="font-display text-5xl text-gold font-light mb-2">
                  {value}
                </p>
                <p className="text-white/50 text-sm tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-frost py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-4xl text-navy-deep font-light mb-12">
            {ap.values_title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ap.values.map((v, i) => (
              <div key={v.title} className="bg-white p-8 border border-silver/60">
                <div className="text-2xl font-display text-gold/40 mb-4 font-light">
                  0{i + 1}
                </div>
                <h3 className="font-display text-xl text-navy-deep mb-3">{v.title}</h3>
                <p className="text-midgray text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">
            {ap.team_eyebrow}
          </p>
          <h2 className="font-display text-4xl text-navy-deep mb-4">
            {ap.team_title}
          </h2>
          <p className="text-midgray max-w-2xl mb-14">{ap.team_body}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ap.team_members.map((member) => (
              <div
                key={member.name}
                className="border border-silver p-10 flex flex-col gap-6"
              >
                <div className="flex items-center gap-6">
                  {/* Monogram avatar */}
                  <div className="w-20 h-20 rounded-full bg-navy-deep flex items-center justify-center shrink-0 border-2 border-gold/30">
                    <span className="font-display text-2xl text-gold font-semibold">
                      {member.initials}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-navy-deep leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-gold text-sm tracking-wide mt-1">
                      {member.role}
                    </p>
                  </div>
                </div>
                <div className="w-8 h-px bg-gold/40" />
                <p className="text-midgray leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-rich py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/70 text-lg">{dict.cta_banner.body}</p>
          <Link
            href={`/${lang}/contact`}
            className="shrink-0 px-7 py-3.5 border border-gold text-gold hover:bg-gold hover:text-navy-deep transition-all duration-200 text-sm tracking-wide"
          >
            {dict.cta_banner.button} →
          </Link>
        </div>
      </section>
    </>
  );
}
