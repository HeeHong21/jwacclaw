import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary, hasLocale, Locale } from "./dictionaries";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "kr" }];
}

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <main className="flex-1 pt-[72px]">{children}</main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
