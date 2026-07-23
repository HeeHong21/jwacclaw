import { notFound } from "next/navigation";
import { getDictionary, hasLocale, Locale } from "../dictionaries";
import ContactForm from "@/components/ContactForm";

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const c = dict.contact;

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
            {c.eyebrow}
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-white font-light leading-tight mb-4">
            {c.title}
          </h1>
          <div className="w-12 h-px bg-gold mb-6" />
          <p className="text-white/60 max-w-xl text-lg">{c.body}</p>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-frost py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Form */}
            <div className="lg:col-span-8 bg-white p-10 border border-silver/60">
              <ContactForm dict={c} />
            </div>

            {/* Info */}
            <div className="lg:col-span-4 space-y-10">
              <div>
                <h2 className="font-display text-2xl text-navy-deep mb-6">
                  {c.office_title}
                </h2>
                <ul className="space-y-5 text-sm">
                  <li className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
                    </svg>
                    <span className="text-midgray leading-relaxed">{c.office_address}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/>
                    </svg>
                    <a href={`mailto:${c.office_email}`} className="text-midgray hover:text-navy-deep transition-colors">
                      {c.office_email}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"/>
                    </svg>
                    <a href={`tel:${c.office_phone}`} className="text-midgray hover:text-navy-deep transition-colors">
                      {c.office_phone}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="border-t border-silver pt-8">
                <p className="text-xs tracking-widest uppercase text-gold mb-2">
                  {lang === "kr" ? "언어" : "Languages"}
                </p>
                <p className="text-sm text-midgray">{c.languages_label}</p>
              </div>

              <div className="border-t border-silver pt-8">
                <p className="text-xs tracking-widest uppercase text-gold mb-2">
                  {lang === "kr" ? "영업 시간" : "Office Hours"}
                </p>
                <p className="text-sm text-midgray">{c.hours_label}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
