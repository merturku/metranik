"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MODUL_GRUPLARI, TUM_MODULLER, grupBasinaModulSayisi } from "@/lib/modules";
import { getEnCokKullanilanlar, getRecentCalcs, type RecentCalc } from "@/lib/recent-calcs";

function KontrolMerkeziIcerik() {
  const searchParams = useSearchParams();
  const [arama, setArama] = useState(searchParams.get("q") ?? "");
  const [gecmis, setGecmis] = useState<RecentCalc[]>([]);
  const [enCok, setEnCok] = useState<ReturnType<typeof getEnCokKullanilanlar>>([]);

  useEffect(() => {
    setGecmis(getRecentCalcs());
    setEnCok(getEnCokKullanilanlar());
  }, []);

  const sonuclar =
    arama.trim().length > 0
      ? TUM_MODULLER.filter((m) => m.title.toLocaleLowerCase("tr").includes(arama.toLocaleLowerCase("tr")))
      : [];

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <p className="text-xs font-medium uppercase tracking-wide text-text-tertiary">
        Kontrol Merkezi
      </p>
      <h1 className="mt-1 text-2xl font-semibold text-text-primary">Bir hesap seçin</h1>

      <div className="relative mt-6">
        <input
          type="text"
          value={arama}
          onChange={(e) => setArama(e.target.value)}
          placeholder="Modül ara…"
          className="w-full rounded-xl border border-border bg-surface-secondary px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
        />
        {sonuclar.length > 0 && (
          <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-border bg-surface-secondary shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]">
            {sonuclar.map((m) => (
              <Link
                key={m.id}
                href={m.href}
                className="flex items-center justify-between px-4 py-2.5 text-sm text-text-primary transition-colors duration-300 hover:bg-surface-tertiary"
              >
                {m.title}
                <span className="font-mono text-xs text-text-tertiary">{m.standard}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <section className="mt-10">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">
          Son Hesaplar
        </h2>
        {gecmis.length === 0 ? (
          <p className="mt-3 text-sm text-text-tertiary">
            Henüz hesaplama yapmadınız. Soldaki listeden bir modül seçin.
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {gecmis.slice(0, 8).map((kayit, i) => (
              <li key={`${kayit.moduleId}-${kayit.timestamp}-${i}`}>
                <Link
                  href={kayit.href}
                  className="flex items-center justify-between gap-4 px-3 py-3 text-sm transition-colors duration-300 hover:bg-surface-secondary"
                >
                  <span className="text-text-primary">{kayit.title}</span>
                  <span className="font-mono text-xs text-accent">{kayit.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {enCok.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">
            En Çok Kullanılanlar
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {enCok.map((m) => (
              <Link
                key={m.moduleId}
                href={m.href}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-text-secondary transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                {m.title} <span className="text-text-tertiary">· {m.adet}×</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">
          Tüm Modüller · {TUM_MODULLER.length}
        </h2>
        <div className="mt-4 flex flex-col gap-8">
          {MODUL_GRUPLARI.map((grup) => (
            <div key={grup.label}>
              <p className="text-sm font-semibold text-text-primary">
                {grup.label}{" "}
                <span className="font-mono text-xs font-normal text-text-tertiary">
                  {grupBasinaModulSayisi(grup)}
                </span>
              </p>
              <div className="mt-2.5 flex flex-col gap-3">
                {grup.subgroups.map((sg) => (
                  <div key={sg.label}>
                    {grup.subgroups.length > 1 && (
                      <p className="text-[10px] uppercase tracking-wide text-text-tertiary/70">
                        {sg.label}
                      </p>
                    )}
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {sg.modules.map((m) => (
                        <Link
                          key={m.id}
                          href={m.href}
                          className="rounded-full border border-border px-3 py-1.5 text-xs text-text-secondary transition-colors duration-300 hover:border-accent hover:text-accent"
                        >
                          {m.title}
                          {m.standard !== "—" && (
                            <span className="ml-1.5 text-text-tertiary">· {m.standard}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function KontrolMerkeziPage() {
  return (
    <Suspense>
      <KontrolMerkeziIcerik />
    </Suspense>
  );
}
