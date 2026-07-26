"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getKvkkConsent, setKvkkConsent } from "@/lib/kvkk-consent";

export function KvkkBanner() {
  const [gorunur, setGorunur] = useState(false);

  useEffect(() => {
    setGorunur(getKvkkConsent() === null);
  }, []);

  if (!gorunur) return null;

  function karar(consent: "full" | "essential-only") {
    setKvkkConsent(consent);
    setGorunur(false);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/98 px-4 py-4 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur">
      <div className="mx-auto flex max-w-[1140px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-text-secondary">
          <span className="font-semibold text-text-primary">🔒 Verileriniz bu cihazda kalır.</span>{" "}
          Metranik üyelik gerektirmez; projeleriniz ve hesap girdileriniz yalnızca tarayıcınızın
          yerel hafızasında (localStorage) saklanır, sunucuya kişisel veri gönderilmez. Hesaplar
          doğrudan tarayıcınızda çalışır. Site, işleyiş için zorunlu yerel kayıtlar ve (ileride)
          reklam çerezleri kullanır — detay:{" "}
          <Link href="/kvkk" className="font-medium text-accent hover:underline">
            Kullanım Koşulları &amp; KVKK
          </Link>
          .
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => karar("essential-only")}
            className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-text-secondary transition-colors duration-300 hover:text-text-primary"
          >
            Yalnızca Zorunlu
          </button>
          <button
            type="button"
            onClick={() => karar("full")}
            className="rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-accent-fg transition-opacity duration-300 hover:opacity-90"
          >
            Kabul Ediyorum
          </button>
        </div>
      </div>
    </div>
  );
}
