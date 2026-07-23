import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar";
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
  title: "Metranik — Uygulama",
  description: "Hesap modülleri",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${sora.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex h-full flex-col bg-surface font-sans text-text-primary">
        <header className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
          <Link href="/uygulama" className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-xs font-bold text-accent-fg">
              M
            </span>
            <span className="text-sm font-bold tracking-tight">
              <span className="text-text-primary">Metra</span>
              <span className="text-accent">nik</span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-xs font-medium text-text-tertiary transition-colors duration-300 hover:text-text-primary"
          >
            Siteye Dön
          </Link>
        </header>

        <div className="flex min-h-0 flex-1">
          <AppSidebar />
          <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
