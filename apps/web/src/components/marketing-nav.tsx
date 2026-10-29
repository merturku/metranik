"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/uygulama", label: "MODÜLLER" },
  { href: "/#kimin-icin", label: "KİMİN İÇİN" },
  { href: "/#yol-haritasi", label: "YOL HARİTASI" },
  { href: "/kvkk", label: "KVKK" },
];

export function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-300 ${
        scrolled ? "border-b border-border bg-background/95 backdrop-blur" : ""
      }`}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-8 pb-4 pt-12 font-mono text-[13px] lg:px-14">
        <Link href="/" className="font-display text-[26px] font-bold leading-none tracking-[0.04em] text-white">
          METRA<span className="text-accent-text">NİK</span>
        </Link>

        <nav aria-label="Ana menü" className="hidden items-center gap-8 tracking-[0.1em] text-text-secondary md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/uygulama"
          className="shrink-0 border-[1.5px] border-accent px-5 py-2.5 font-semibold tracking-[0.08em] text-accent-text transition-colors hover:bg-accent hover:text-accent-fg"
        >
          UYGULAMAYI AÇ →
        </Link>
      </div>
    </header>
  );
}
