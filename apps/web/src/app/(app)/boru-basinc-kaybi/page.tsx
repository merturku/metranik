"use client";

import { useState } from "react";
import {
  boruBasincKaybi,
  type CalcResult,
  type BoruBasincKaybiOutput,
} from "@metranik/core-calc";

const ARA_DEGER_ETIKET: Record<string, string> = {
  kesitAlani_m2: "Kesit Alanı (m²)",
  hiz_m_s: "Hız (m/s)",
  basincKaybi_Pa: "Basınç Kaybı (Pa)",
};

export default function BoruBasincKaybiPage() {
  const [debi, setDebi] = useState(0.01);
  const [capD, setCapD] = useState(0.1);
  const [uzunluk, setUzunluk] = useState(50);
  const [f, setF] = useState(0.02);
  const [sonuc, setSonuc] = useState<CalcResult<BoruBasincKaybiOutput> | null>(null);
  const [hata, setHata] = useState<string | null>(null);

  function hesapla() {
    const ayristirilmis = boruBasincKaybi.inputSchema.safeParse({
      debi,
      capD,
      uzunluk,
      surtunmeKatsayisi: f,
    });
    if (!ayristirilmis.success) {
      setSonuc(null);
      setHata("Tüm girdiler pozitif bir sayı olmalı.");
      return;
    }
    setHata(null);
    setSonuc(boruBasincKaybi.compute(ayristirilmis.data));
  }

  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto grid w-full max-w-[1140px] flex-1 gap-10 px-6 py-10 lg:grid-cols-[380px_1fr] lg:py-12">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-text-tertiary">
            Mekanik · Darcy-Weisbach
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-text-primary">
            {boruBasincKaybi.title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            Debi, çap, uzunluk ve sürtünme katsayısına göre boru hattındaki basınç
            kaybını hesaplar.
          </p>

          <form
            className="mt-8 flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              hesapla();
            }}
          >
            <div>
              <label htmlFor="debi" className="mb-1.5 block text-sm font-medium text-text-primary">
                Debi (m³/s)
              </label>
              <input
                id="debi"
                type="number"
                min={0.001}
                step={0.001}
                value={debi}
                onChange={(e) => setDebi(Number(e.target.value))}
                className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text-primary transition-colors duration-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>

            <div>
              <label htmlFor="capD" className="mb-1.5 block text-sm font-medium text-text-primary">
                Boru İç Çapı (m)
              </label>
              <input
                id="capD"
                type="number"
                min={0.01}
                step={0.01}
                value={capD}
                onChange={(e) => setCapD(Number(e.target.value))}
                className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text-primary transition-colors duration-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>

            <div>
              <label htmlFor="uzunluk" className="mb-1.5 block text-sm font-medium text-text-primary">
                Boru Uzunluğu (m)
              </label>
              <input
                id="uzunluk"
                type="number"
                min={1}
                step={1}
                value={uzunluk}
                onChange={(e) => setUzunluk(Number(e.target.value))}
                className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text-primary transition-colors duration-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>

            <div>
              <label htmlFor="f" className="mb-1.5 block text-sm font-medium text-text-primary">
                Sürtünme Katsayısı (f)
              </label>
              <input
                id="f"
                type="number"
                min={0.001}
                step={0.001}
                value={f}
                onChange={(e) => setF(Number(e.target.value))}
                className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text-primary transition-colors duration-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>

            {hata && <p className="text-sm text-danger">{hata}</p>}

            <button
              type="submit"
              className="w-full rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-accent-fg transition-colors duration-300 hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-surface"
            >
              Hesapla
            </button>
          </form>
        </div>

        <div>
          {sonuc ? (
            <div className="rounded-2xl border border-border bg-surface-secondary">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <span className="text-xs font-medium uppercase tracking-wide text-text-tertiary">
                  Sonuç
                </span>
                <span className="inline-flex items-center rounded-full border border-border-strong px-2.5 py-0.5 text-xs font-medium text-text-secondary">
                  Darcy-Weisbach
                </span>
              </div>

              <div className="px-6 py-6">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-4xl font-semibold tabular-nums text-text-primary">
                    {sonuc.value.basincKaybi_kPa.toFixed(3)}
                  </span>
                  <span className="text-sm font-medium text-text-secondary">kPa</span>
                </div>
              </div>

              <div className="border-t border-border px-6 py-4">
                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-text-tertiary">
                  Ara Değerler
                </p>
                <dl className="divide-y divide-border">
                  {Object.entries(sonuc.intermediates).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between py-2 text-sm">
                      <dt className="text-text-secondary">{ARA_DEGER_ETIKET[k] ?? k}</dt>
                      <dd className="font-mono tabular-nums text-text-primary">
                        {typeof v === "number" ? v.toFixed(4) : v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-border-strong px-6 py-16 text-center">
              <p className="max-w-[32ch] text-sm text-text-tertiary">
                Girdileri doldurup Hesapla&apos;ya bastığınızda sonuç, ara değerler ve standart
                referansı burada görünecek.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
