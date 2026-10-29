import type { Metadata } from "next";
import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar";
import { KvkkBanner } from "@/components/kvkk-banner";
import "../globals.css";

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
      className="h-full antialiased"
    >
      <body className="flex h-full flex-col bp-grid font-sans text-text-primary">
        <header className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
          <Link href="/uygulama" className="flex items-center gap-2.5">
            <span className="font-display text-xl font-bold leading-none tracking-[0.04em]">
              <span className="text-white">METRA</span>
              <span className="text-accent-text">NİK</span>
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
        <KvkkBanner />
      </body>
    </html>
  );
}
