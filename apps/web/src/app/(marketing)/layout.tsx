import type { Metadata } from "next";
import Link from "next/link";
import { MarketingNav } from "@/components/marketing-nav";
import { KvkkBanner } from "@/components/kvkk-banner";
import "../globals.css";

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
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bp-grid font-sans text-text-primary">
        <div aria-hidden className="pointer-events-none fixed inset-5 z-[90] border-2 border-line" />
        <div aria-hidden className="pointer-events-none fixed inset-7 z-[90] border border-line/55" />
        <MarketingNav />
        <div className="pt-[100px]">{children}</div>

        <footer className="border-t border-border px-10 py-10">
          <div className="mx-auto flex max-w-[1140px] flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <span className="font-display text-xl font-bold tracking-[0.04em]">
              <span className="text-white">METRA</span>
              <span className="text-accent-text">NİK</span>
            </span>
            <nav className="flex flex-wrap items-center justify-center gap-4 text-xs text-text-secondary">
              <a href="/#kimin-icin" className="transition-colors duration-300 hover:text-text-primary">
                Kimin İçin
              </a>
              <a href="/#yol-haritasi" className="transition-colors duration-300 hover:text-text-primary">
                Yol Haritası
              </a>
              <Link href="/uygulama" className="transition-colors duration-300 hover:text-text-primary">
                Modüller
              </Link>
              <Link href="/kvkk" className="transition-colors duration-300 hover:text-text-primary">
                KVKK
              </Link>
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
