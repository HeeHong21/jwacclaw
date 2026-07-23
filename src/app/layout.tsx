import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JW Legal & Accounting Ltd",
  description:
    "Expert legal and accounting services in the United Kingdom. Bilingual English and Korean services.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${notoSansKR.variable}`}
    >
      <body className="font-sans antialiased bg-white text-charcoal flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}
