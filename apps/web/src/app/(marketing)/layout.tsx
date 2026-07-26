import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { MarketingNav } from "@/components/marketing-nav";
import { KvkkBanner } from "@/components/kvkk-banner";
import "../globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Metranik",
  description: "Mühendislik hesap platformu",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${sora.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface font-sans text-text-primary">
        <MarketingNav />
        <div className="pt-[100px]">{children}</div>

        <footer className="border-t border-border px-6 py-8">
          <div className="mx-auto flex max-w-[1140px] flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <span className="text-sm font-bold tracking-tight">
              <span className="text-text-primary">Metra</span>
              <span className="text-accent">nik</span>
            </span>
            <nav className="flex flex-wrap items-center justify-center gap-4 text-xs text-text-secondary">
              <a href="/#nasil-calisir" className="transition-colors duration-300 hover:text-text-primary">
                Nasıl Çalışır
              </a>
              <a href="/#kimin-icin" className="transition-colors duration-300 hover:text-text-primary">
                Kimin İçin
              </a>
              <Link href="/uygulama" className="transition-colors duration-300 hover:text-text-primary">
                Modüller
              </Link>
              <a href="/#reklam-verin" className="transition-colors duration-300 hover:text-text-primary">
                Reklam Verin
              </a>
            </nav>
            <p className="text-xs text-text-tertiary">
              Beta sürümü · Ön boyutlandırma aracıdır; nihai karar mühendis kontrolü gerektirir.
            </p>
          </div>
        </footer>
        <KvkkBanner />
      </body>
    </html>
  );
}
