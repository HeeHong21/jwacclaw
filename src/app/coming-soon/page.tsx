import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JW Legal & Accounting Ltd — Coming Soon",
  description:
    "Expert legal and accounting services in the United Kingdom. Our new website is coming soon.",
  robots: { index: false, follow: false },
};

export default function ComingSoonPage() {
  return (
    <main className="relative flex-1 min-h-screen bg-navy-deep flex items-center justify-center overflow-hidden px-6">
      {/* Gold vertical accent */}
      <div className="absolute right-0 top-24 bottom-24 w-1 bg-gradient-to-b from-transparent via-gold/40 to-transparent" />

      <div className="relative text-center max-w-2xl">
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-6">
          JW Legal &amp; Accounting Ltd
        </p>
        <h1 className="font-display text-5xl md:text-7xl text-white leading-[1.1] mb-6">
          Coming Soon
        </h1>
        <div className="w-16 h-px bg-gold mx-auto mb-8" />
        <p className="text-white/80 text-lg leading-relaxed mb-3">
          Our new website is on its way.
        </p>
        <p className="text-white/60 leading-relaxed break-keep">
          새로운 웹사이트를 준비하고 있습니다. 곧 찾아뵙겠습니다.
        </p>
      </div>
    </main>
  );
}
