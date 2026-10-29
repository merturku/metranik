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
      <body className="min-h-full flex flex-col bg-background font-sans text-text-primary">
        <MarketingNav />
        <div className="pt-[100px]">{children}</div>

        <footer className="border-t border-border px-6 py-8">
          <div className="mx-auto flex max-w-[1140px] flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <span className="text-sm font-bold tracking-tight">
              <span className="text-text-primary">Metra</span>
              <span className="text-accent-text">nik</span>
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
