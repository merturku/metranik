"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CalcModule, CalcResult } from "@metranik/core-calc";
import { recordCalc, bugunSayisi } from "@/lib/recent-calcs";
import { ilgiliModuller, modulKonumu } from "@/lib/modules";
import {
  Input,
  InputLabel,
  ButtonPrimary,
  Card,
  CardBody,
  Caption,
  Body,
  Headline,
  BodyLarge,
} from "@/components/design-system";

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
  formula?: string;
  engineeringNote?: string;
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
  formula,
  engineeringNote,
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

  function sayiyaCevir(v: string | number): number {
    return typeof v === "number" ? v : Number(String(v).trim().replace(",", "."));
  }

  function adimla(f: CalcField, yon: 1 | -1) {
    const mevcut = sayiyaCevir(values[f.key]) || 0;
    const adim = f.step ?? 1;
    const yeni = mevcut + yon * adim;
    setValues((v) => ({ ...v, [f.key]: f.min !== undefined ? Math.max(f.min, yeni) : yeni }));
  }

  function hesapla() {
    const payload: Record<string, string | number> = {};
    for (const f of fields) {
      payload[f.key] = f.type === "number" ? sayiyaCevir(values[f.key]) : values[f.key];
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
        <nav className="flex flex-wrap items-center gap-1.5">
          <Link href="/uygulama" className="text-caption text-text-tertiary hover:text-text-primary">
            Panel
          </Link>
          {konum && (
            <>
              <span aria-hidden className="text-caption text-text-tertiary">/</span>
              <span className="text-caption text-text-tertiary">{konum.grup}</span>
              <span aria-hidden className="text-caption text-text-tertiary">/</span>
              <span className="text-caption text-text-tertiary">
                {konum.altGrup}
              </span>
            </>
          )}
          <span aria-hidden className="text-caption text-text-tertiary">/</span>
          <Caption className="text-text-secondary">{mod.title}</Caption>
        </nav>
      </div>

      <main className="mx-auto grid w-full max-w-[1140px] flex-1 gap-10 px-6 py-6 lg:grid-cols-[380px_1fr] lg:py-8">
        <div>
          <Caption className="uppercase text-text-tertiary">
            {DISIPLIN_ETIKET[mod.discipline]} · {standardsLabel}
          </Caption>
          <Headline className="mt-2">{mod.title}</Headline>

          <Card className="mt-4">
            <Caption className="uppercase text-text-tertiary block mb-2">
              Standart &amp; Yöntem
            </Caption>
            <Body className="text-text-secondary mb-3">{description}</Body>
            {formula && (
              <code className="block mt-3 rounded-md bg-gray-100 dark:bg-gray-800 px-3 py-2 font-mono text-mono text-text-primary overflow-x-auto">
                {formula}
              </code>
            )}
            {engineeringNote && (
              <div className="mt-3 rounded-md border border-warning/30 bg-warning/[0.06] px-3 py-2">
                <Body className="text-text-secondary">
                  <span className="font-semibold text-warning">
                    Mühendislik notu:{" "}
                  </span>
                  {engineeringNote}
                </Body>
              </div>
            )}
          </Card>

          <form
            className="mt-6 flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              hesapla();
            }}
          >
            {fields.map((f) => (
              <div key={f.key}>
                <InputLabel htmlFor={f.key}>{f.label}</InputLabel>
                {f.type === "select" ? (
                  <select
                    id={f.key}
                    value={values[f.key]}
                    onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                    className="w-full rounded-md border border-border bg-surface px-4 py-3 text-body text-text-primary transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 dark:focus:ring-offset-0"
                  >
                    {f.options?.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="flex items-stretch gap-sm">
                    <button
                      type="button"
                      onClick={() => adimla(f, -1)}
                      aria-label={`${f.label} azalt`}
                      className="w-9 shrink-0 rounded-md border border-border text-text-secondary transition-colors duration-fast hover:border-accent hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      −
                    </button>
                    <Input
                      id={f.key}
                      type="text"
                      inputMode="decimal"
                      value={values[f.key]}
                      onChange={(e) => {
                        const girilen = e.target.value;
                        if (/^-?[0-9]*[.,]?[0-9]*$/.test(girilen)) {
                          setValues((v) => ({ ...v, [f.key]: girilen }));
                        }
                      }}
                      className="text-center"
                    />
                    <button
                      type="button"
                      onClick={() => adimla(f, 1)}
                      aria-label={`${f.label} artır`}
                      className="w-9 shrink-0 rounded-md border border-border text-text-secondary transition-colors duration-fast hover:border-accent hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            ))}

            {hata && <Body className="text-error">{hata}</Body>}

            <ButtonPrimary type="submit" className="w-full">
              Hesapla
            </ButtonPrimary>
          </form>

          {ilgili.length > 0 && (
            <div className="mt-6">
              <Caption className="uppercase text-text-tertiary block mb-3">
                Bununla İlgili
              </Caption>
              <div className="flex flex-wrap gap-2">
                {ilgili.map((m) => (
                  <Link
                    key={m.id}
                    href={m.href}
                    className="inline-flex rounded-full border border-border px-3 py-1.5 text-caption text-text-secondary transition-colors duration-fast hover:border-accent hover:text-accent"
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
            <Card
              className={`border-l-4 ${verdictStil ? verdictStil.border : "border-l-accent"}`}
            >
              <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                <Caption className="uppercase">Sonuç</Caption>
                <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-caption font-medium text-text-secondary">
                  {sonuc.standardsUsed.length > 0
                    ? sonuc.standardsUsed.join(", ")
                    : standardsLabel}
                </span>
              </div>

              <div>
                {verdictStil && sonuc.verdict && (
                  <p
                    className={`mb-4 text-caption font-semibold uppercase tracking-wide ${verdictStil.text}`}
                  >
                    {verdictStil.label} — {sonuc.verdict.note}
                  </p>
                )}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-mono text-4xl font-semibold tabular-nums text-text-primary">
                    {mainValue.toFixed(mainDecimals)}
                  </span>
                  <span className="text-body font-medium text-text-secondary">
                    {mainUnit}
                  </span>
                </div>
                {bugun > 0 && (
                  <Caption className="text-text-tertiary">
                    Bu hesap bugün {bugun} kez hesaplandı
                  </Caption>
                )}
              </div>

              <div className="border-t border-border mt-6 pt-4">
                <Caption className="uppercase mb-3 block">Ara Değerler</Caption>
                <dl className="divide-y divide-border">
                  {Object.entries(sonuc.intermediates).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between py-2"
                    >
                      <dt className="text-body text-text-secondary">
                        {intermediateLabels[k] ?? k}
                      </dt>
                      <dd className="font-mono tabular-nums text-text-primary text-body">
                        {typeof v === "number" ? v.toFixed(4) : v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Card>
          ) : (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-lg border border-dashed border-border px-6 py-16 text-center">
              <BodyLarge className="max-w-[32ch] text-text-tertiary">
                Girdileri doldurup Hesapla&apos;ya bastığınızda sonuç, ara değerler
                ve standart referansı burada görünecek.
              </BodyLarge>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
