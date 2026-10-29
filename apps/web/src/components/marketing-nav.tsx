"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/#kimin-icin", label: "Kimin İçin" },
  { href: "/#yol-haritasi", label: "Yol Haritası" },
  { href: "/uygulama", label: "Modüller" },
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
      className={`fixed left-1/2 top-[18px] z-[100] flex w-[min(1140px,calc(100%-32px))] -translate-x-1/2 items-center justify-between gap-4 rounded-full border border-border py-[9px] pl-5 pr-2.5 backdrop-blur-[14px] transition-[background-color,box-shadow] duration-300 ${
        scrolled
          ? "bg-[rgba(20,15,12,0.92)] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)]"
          : "bg-[rgba(20,15,12,0.72)]"
      }`}
    >
      <Link href="/" className="flex items-center text-[1.08rem] font-extrabold tracking-[-0.01em]">
        <span
          aria-hidden
          className="mr-[9px] grid h-[30px] w-[30px] place-items-center rounded-[9px] bg-gradient-to-br from-accent-text to-[#8f3e20] text-accent-fg"
        >
          <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor">
            <path d="M9.7 1.2 3.2 9.1h3.3L5.9 14.8l6.9-8.4H9.2l.5-5.2z" />
          </svg>
        </span>
        <span className="text-text-primary">Metra</span>
        <span className="text-accent-text">nik</span>
      </Link>

      <nav aria-label="Ana menü" className="hidden items-center gap-1 sm:flex">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-full px-3.5 py-2 text-[0.88rem] text-text-secondary transition-colors duration-150 hover:bg-text-primary/[0.06] hover:text-text-primary"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/uygulama"
        className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-[0.88rem] font-semibold text-accent-fg shadow-[0_8px_28px_-8px_var(--accent-glow)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-accent-hover"
      >
        Uygulamayı Aç
      </Link>
    </header>
  );
}
