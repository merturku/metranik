"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CalcModule, CalcResult } from "@metranik/core-calc";
import { recordCalc, bugunSayisi } from "@/lib/recent-calcs";
import { ilgiliModuller, modulKonumu } from "@/lib/modules";

const DISIPLIN_ETIKET: Record<string, string> = {
  mekanik: "Mekanik",
  elektrik: "Elektrik",
  insaat: "İnşaat",
  ev: "Ev",
};

const VERDICT_STIL: Record<string, { border: string; text: string; label: string }> = {
  uygun: { border: "border-l-success", text: "text-success", label: "UYGUN" },
  sinirda: { border: "border-l-warning", text: "text-warning", label: "SINIRDA" },
  uygunsuz: { border: "border-l-danger", text: "text-danger", label: "UYGUNSUZ" },
};

export interface CalcField {
  key: string;
  label: string;
  type: "number" | "select";
  options?: { value: string; label: string }[];
  step?: number;
  min?: number;
}

interface CalcPageProps<I extends Record<string, unknown>, O> {
  module: CalcModule<I, O>;
  standardsLabel: string;
  description: string;
  fields: CalcField[];
  defaults: Record<string, string | number>;
  mainUnit: string;
  mainValueKey: keyof O;
  mainDecimals?: number;
  intermediateLabels?: Record<string, string>;
}

export function CalcPage<I extends Record<string, unknown>, O>({
  module: mod,
  standardsLabel,
  description,
  fields,
  defaults,
  mainUnit,
  mainValueKey,
  mainDecimals = 2,
  intermediateLabels = {},
}: CalcPageProps<I, O>) {
  const [values, setValues] = useState<Record<string, string | number>>(defaults);
  const [sonuc, setSonuc] = useState<CalcResult<O> | null>(null);
  const [hata, setHata] = useState<string | null>(null);
  const [bugun, setBugun] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setBugun(bugunSayisi(mod.id));
  }, [mod.id]);

  function adimla(f: CalcField, yon: 1 | -1) {
    const mevcut = Number(values[f.key]) || 0;
    const adim = f.step ?? 1;
    const yeni = mevcut + yon * adim;
    setValues((v) => ({ ...v, [f.key]: f.min !== undefined ? Math.max(f.min, yeni) : yeni }));
  }

  function hesapla() {
    const payload: Record<string, string | number> = {};
    for (const f of fields) {
      payload[f.key] = f.type === "number" ? Number(values[f.key]) : values[f.key];
    }
    const ayristirilmis = mod.inputSchema.safeParse(payload);
    if (!ayristirilmis.success) {
      setSonuc(null);
      setHata("Girdileri kontrol edin — geçerli değerler gerekli.");
      return;
    }
    setHata(null);
    const yeniSonuc = mod.compute(ayristirilmis.data);
    setSonuc(yeniSonuc);
    recordCalc({
      moduleId: mod.id,
      title: mod.title,
      href: pathname,
      summary: `${Number(yeniSonuc.value[mainValueKey]).toFixed(mainDecimals)} ${mainUnit}`,
    });
    setBugun((n) => n + 1);
  }

  const mainValue = sonuc ? Number(sonuc.value[mainValueKey]) : null;
  const konum = modulKonumu(mod.id);
  const ilgili = ilgiliModuller(mod.id);
  const verdictStil = sonuc?.verdict ? VERDICT_STIL[sonuc.verdict.status] : null;

  return (
    <div className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-[1140px] px-6 pt-6">
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-text-tertiary">
          <Link href="/uygulama" className="hover:text-text-primary">
            Panel
          </Link>
          {konum && (
            <>
              <span aria-hidden>/</span>
              <span>{konum.grup}</span>
              <span aria-hidden>/</span>
              <span>{konum.altGrup}</span>
            </>
          )}
          <span aria-hidden>/</span>
          <span className="text-text-secondary">{mod.title}</span>
        </nav>
      </div>

      <main className="mx-auto grid w-full max-w-[1140px] flex-1 gap-10 px-6 py-6 lg:grid-cols-[380px_1fr] lg:py-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-text-tertiary">
            {DISIPLIN_ETIKET[mod.discipline]} · {standardsLabel}
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-text-primary">{mod.title}</h1>

          <div className="mt-3 rounded-xl border border-border bg-surface-secondary/60 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
              Yöntem
            </p>
            <p className="mt-1 text-xs leading-relaxed text-text-secondary">{description}</p>
          </div>

          <form
            className="mt-6 flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              hesapla();
            }}
          >
            {fields.map((f) => (
              <div key={f.key}>
                <label
                  htmlFor={f.key}
                  className="mb-1.5 block text-sm font-medium text-text-primary"
                >
                  {f.label}
                </label>
                {f.type === "select" ? (
                  <select
                    id={f.key}
                    value={values[f.key]}
                    onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                    className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text-primary transition-colors duration-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
                  >
                    {f.options?.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="flex items-stretch gap-1.5">
                    <button
                      type="button"
                      onClick={() => adimla(f, -1)}
                      aria-label={`${f.label} azalt`}
                      className="w-9 shrink-0 rounded-xl border border-border text-text-secondary transition-colors duration-300 hover:border-accent hover:text-accent"
                    >
                      −
                    </button>
                    <input
                      id={f.key}
                      type="number"
                      min={f.min}
                      step={f.step ?? "any"}
                      value={values[f.key]}
                      onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                      className="w-full min-w-0 rounded-xl border border-border bg-surface px-3 py-2 text-center text-sm text-text-primary transition-colors duration-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
                    />
                    <button
                      type="button"
                      onClick={() => adimla(f, 1)}
                      aria-label={`${f.label} artır`}
                      className="w-9 shrink-0 rounded-xl border border-border text-text-secondary transition-colors duration-300 hover:border-accent hover:text-accent"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            ))}

            {hata && <p className="text-sm text-danger">{hata}</p>}

            <button
              type="submit"
              className="w-full rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-accent-fg transition-colors duration-300 hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-surface"
            >
              Hesapla
            </button>
          </form>

          {ilgili.length > 0 && (
            <div className="mt-6">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
                Bununla İlgili
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {ilgili.map((m) => (
                  <Link
                    key={m.id}
                    href={m.href}
                    className="rounded-full border border-border px-2.5 py-1 text-xs text-text-secondary transition-colors duration-300 hover:border-accent hover:text-accent"
                  >
                    {m.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          {sonuc && mainValue !== null ? (
            <div
              className={`rounded-2xl border border-border bg-surface-secondary ${verdictStil ? `border-l-4 ${verdictStil.border}` : ""}`}
            >
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <span className="text-xs font-medium uppercase tracking-wide text-text-tertiary">
                  Sonuç
                </span>
                <span className="inline-flex items-center rounded-full border border-border-strong px-2.5 py-0.5 text-xs font-medium text-text-secondary">
                  {sonuc.standardsUsed.length > 0 ? sonuc.standardsUsed.join(", ") : standardsLabel}
                </span>
              </div>

              <div className="px-6 py-6">
                {verdictStil && sonuc.verdict && (
                  <p className={`mb-2 text-xs font-bold uppercase tracking-wide ${verdictStil.text}`}>
                    {verdictStil.label} — {sonuc.verdict.note}
                  </p>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-4xl font-semibold tabular-nums text-text-primary">
                    {mainValue.toFixed(mainDecimals)}
                  </span>
                  <span className="text-sm font-medium text-text-secondary">{mainUnit}</span>
                </div>
                {bugun > 0 && (
                  <p className="mt-2 text-xs text-text-tertiary">
                    Bu hesap bugün {bugun} kez hesaplandı
                  </p>
                )}
              </div>

              <div className="border-t border-border px-6 py-4">
                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-text-tertiary">
                  Ara Değerler
                </p>
                <dl className="divide-y divide-border">
                  {Object.entries(sonuc.intermediates).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between py-2 text-sm">
                      <dt className="text-text-secondary">{intermediateLabels[k] ?? k}</dt>
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
