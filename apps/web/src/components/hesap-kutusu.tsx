"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { girisAktif, supabaseIstemci } from "@/lib/supabase";

// Kenar çubuğundaki hesap alanı. Üyelik yapılandırılmamışsa hiçbir şey çizmez.
export function HesapKutusu({ onNavigate }: { onNavigate?: () => void }) {
  const [eposta, setEposta] = useState<string | null>(null);
  const [hazir, setHazir] = useState(false);

  useEffect(() => {
    const sb = supabaseIstemci();
    if (!sb) return;
    let iptal = false;
    sb.auth.getSession().then(({ data }) => {
      if (iptal) return;
      setEposta(data.session?.user.email ?? null);
      setHazir(true);
    });
    const { data: abone } = sb.auth.onAuthStateChange((_olay, oturum) => {
      setEposta(oturum?.user.email ?? null);
    });
    return () => {
      iptal = true;
      abone.subscription.unsubscribe();
    };
  }, []);

  if (!girisAktif || !hazir) return null;

  if (!eposta) {
    return (
      <Link
        href="/giris"
        onClick={onNavigate}
        className="rounded-lg border border-border px-3 py-2 text-body font-medium text-text-secondary transition-colors duration-fast hover:text-text-primary"
      >
        Giriş yap
      </Link>
    );
  }

  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2">
      <span className="min-w-0 truncate text-caption text-text-secondary" title={eposta}>
        {eposta}
      </span>
      <button
        onClick={() => supabaseIstemci()?.auth.signOut()}
        className="shrink-0 text-caption font-medium text-accent-text hover:underline"
      >
        Çıkış
      </button>
    </div>
  );
}
