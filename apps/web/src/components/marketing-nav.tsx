"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
      className={`fixed left-1/2 top-[18px] z-[100] flex w-[min(1140px,calc(100%-32px))] -translate-x-1/2 items-center justify-between gap-4 rounded-full border border-border px-2.5 py-2.5 pl-5 backdrop-blur-[14px] transition-[background-color,box-shadow] duration-300 ${
        scrolled ? "bg-surface-secondary/[0.92] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)]" : "bg-surface-secondary/[0.72]"
      }`}
    >
      <Link href="/" className="flex items-center gap-2.5">
        <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-gradient-to-br from-accent to-[#8f3e20] text-sm text-accent-fg">
          M
        </span>
        <span className="text-[1.08rem] font-extrabold tracking-tight">
          <span className="text-text-primary">Metra</span>
          <span className="not-italic text-accent-hover">nik</span>
        </span>
        <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-hover">
          Beta
        </span>
      </Link>

      <nav className="hidden items-center gap-1 sm:flex">
        <a
          href="/#nasil-calisir"
          className="rounded-full px-3.5 py-2 text-[0.88rem] text-text-secondary transition-colors duration-150 hover:bg-text-primary/[0.06] hover:text-text-primary"
        >
          Nasıl Çalışır
        </a>
        <a
          href="/#kimin-icin"
          className="rounded-full px-3.5 py-2 text-[0.88rem] text-text-secondary transition-colors duration-150 hover:bg-text-primary/[0.06] hover:text-text-primary"
        >
          Kimin İçin
        </a>
        <Link
          href="/uygulama"
          className="rounded-full px-3.5 py-2 text-[0.88rem] text-text-secondary transition-colors duration-150 hover:bg-text-primary/[0.06] hover:text-text-primary"
        >
          Modüller
        </Link>
        <a
          href="/#reklam-verin"
          className="rounded-full px-3.5 py-2 text-[0.88rem] text-text-secondary transition-colors duration-150 hover:bg-text-primary/[0.06] hover:text-text-primary"
        >
          Reklam Verin
        </a>
      </nav>

      <Link
        href="/uygulama"
        className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-[0.88rem] font-semibold text-accent-fg shadow-[0_8px_28px_-8px_var(--accent-glow)] transition-transform duration-150 hover:-translate-y-0.5 hover:bg-accent-hover"
      >
        Uygulamayı Aç
      </Link>
    </header>
  );
}
