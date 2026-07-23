import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
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
        <header className="border-b border-border px-6 py-4">
          <div className="mx-auto flex max-w-[1140px] items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-accent-fg">
                M
              </span>
              <span className="text-[17px] font-bold tracking-tight">
                <span className="text-text-primary">Metra</span>
                <span className="text-accent">nik</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-6 text-sm text-text-secondary sm:flex">
              <a href="/#moduller" className="transition-colors duration-300 hover:text-text-primary">
                Modüller
              </a>
            </nav>

            <Link
              href="/uygulama"
              className="rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-fg transition-colors duration-300 hover:bg-accent-hover"
            >
              Uygulamayı Aç
            </Link>
          </div>
        </header>
        {children}

        <footer className="border-t border-border px-6 py-8">
          <div className="mx-auto flex max-w-[1140px] flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
            <span className="text-sm font-bold tracking-tight">
              <span className="text-text-primary">Metra</span>
              <span className="text-accent">nik</span>
            </span>
            <p className="text-xs text-text-tertiary">
              Ön boyutlandırma aracıdır; nihai karar mühendis kontrolü gerektirir.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
