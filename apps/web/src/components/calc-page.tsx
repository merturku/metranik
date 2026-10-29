"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CalcModule, CalcResult } from "@metranik/core-calc";
import { recordCalc, bugunSayisi } from "@/lib/recent-calcs";
import { ilgiliModuller, modulKonumu } from "@/lib/modules";
import {
  csvOlustur,
  dosyaIndir,
  favoriDegistir,
  favoriMi,
  hesapKaydet,
  projeAdlari,
  type SatirDeger,
} from "@/lib/projeler";
import {
  Input,
  InputLabel,
  ButtonPrimary,
  ButtonSecondary,
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

  const [otoHesapla, setOtoHesapla] = useState(false);
  const [bildirim, setBildirim] = useState<string | null>(null);

  useEffect(() => {
    setBugun(bugunSayisi(mod.id));
  }, [mod.id]);

  // Paylaşılan bağlantıdaki girdiler (?alan=85&sehir=istanbul) forma yüklenir ve hesaplanır.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const gelen: Record<string, string> = {};
    for (const f of fields) {
      const v = q.get(f.key);
      if (v !== null) gelen[f.key] = v;
    }
    if (Object.keys(gelen).length > 0) {
      setValues((onceki) => ({ ...onceki, ...gelen }));
      setOtoHesapla(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (otoHesapla) {
      setOtoHesapla(false);
      hesapla();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otoHesapla]);

  function paylasimUrl(): string {
    const q = new URLSearchParams();
    for (const f of fields) q.set(f.key, String(values[f.key]));
    return `${window.location.origin}${window.location.pathname}?${q.toString()}`;
  }

  const [favori, setFavori] = useState(false);
  useEffect(() => {
    setFavori(favoriMi(mod.id));
  }, [mod.id]);

  function girdiSatirlari(): SatirDeger[] {
    return fields.map((f) => ({
      etiket: f.label,
      deger:
        f.type === "select"
          ? (f.options?.find((o) => o.value === String(values[f.key]))?.label ?? String(values[f.key]))
          : String(values[f.key]),
    }));
  }

  function araSatirlari(): SatirDeger[] {
    if (!sonuc) return [];
    return Object.entries(sonuc.intermediates).map(([k, v]) => ({
      etiket: intermediateLabels[k] ?? k,
      deger: typeof v === "number" ? v.toFixed(4) : String(v),
    }));
  }

  function excelIndir() {
    if (!sonuc) return;
    const satirlar: string[][] = [
      ["Metranik", mod.title],
      ["Standart", sonuc.standardsUsed.join(", ") || standardsLabel],
      ["Tarih", new Date().toLocaleDateString("tr-TR")],
      [],
      ["GİRDİLER", ""],
      ...girdiSatirlari().map((s) => [s.etiket, s.deger]),
      [],
      ["SONUÇ", `${anaDegerMetni(sonuc.value[mainValueKey])} ${mainUnit}`],
      ...(sonuc.verdict ? [["Değerlendirme", `${sonuc.verdict.status} — ${sonuc.verdict.note}`]] : []),
      [],
      ["ARA DEĞERLER", ""],
      ...araSatirlari().map((s) => [s.etiket, s.deger]),
      [],
      ["Not", "Ön boyutlandırmadır; nihai karar mühendis kontrolü gerektirir."],
    ];
    dosyaIndir(`${mod.id}.csv`, csvOlustur(satirlar));
  }

  function kaydet() {
    if (!sonuc) return;
    const onerilen = projeAdlari()[0] ?? "Projem";
    const proje = window.prompt("Hangi projeye kaydedilsin?", onerilen);
    if (!proje || !proje.trim()) return;
    const ok = hesapKaydet({
      proje: proje.trim(),
      moduleId: mod.id,
      title: mod.title,
      href: paylasimUrl().replace(window.location.origin, ""),
      standart: sonuc.standardsUsed.join(", ") || standardsLabel,
      sonuc: `${anaDegerMetni(sonuc.value[mainValueKey])} ${mainUnit}`,
      girdiler: girdiSatirlari(),
      araDegerler: araSatirlari(),
      durum: sonuc.verdict?.status,
    });
    setBildirim(ok ? `“${proje.trim()}” projesine kaydedildi.` : "Kaydedilemedi: tarayıcı depolaması kapalı.");
    setTimeout(() => setBildirim(null), 4000);
  }

  async function paylas() {
    const url = paylasimUrl();
    const metin = sonuc
      ? `${mod.title}: ${anaDegerMetni(sonuc.value[mainValueKey])} ${mainUnit}`
      : mod.title;
    try {
      if (navigator.share) {
        await navigator.share({ title: `Metranik — ${mod.title}`, text: metin, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setBildirim("Bağlantı panoya kopyalandı.");
    } catch {
      // Kullanıcı paylaşımı iptal ettiyse sessiz geç; pano reddedildiyse bağlantıyı göster.
      if (!navigator.share) setBildirim(url);
    }
    setTimeout(() => setBildirim(null), 4000);
  }

  function sayiyaCevir(v: string | number): number {
    return typeof v === "number" ? v : Number(String(v).trim().replace(",", "."));
  }

  // Modül ana değeri tanımsız (null) döndürebilir — örn. sıvılaşmayan zeminde FS;
  // Number(null) = 0 yanıltıcı olacağından "—" gösterilir.
  function anaDegerMetni(v: unknown): string {
    const n = v === null || v === undefined ? NaN : Number(v);
    return Number.isFinite(n) ? n.toFixed(mainDecimals) : "—";
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
      summary: `${anaDegerMetni(yeniSonuc.value[mainValueKey])} ${mainUnit}`,
    });
    setBugun((n) => n + 1);
  }

  const mainValue = sonuc ? anaDegerMetni(sonuc.value[mainValueKey]) : null;
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
          <div className="mt-2 flex items-start justify-between gap-3">
            <Headline>{mod.title}</Headline>
            <button
              type="button"
              aria-pressed={favori}
              aria-label={favori ? "Favorilerden çıkar" : "Favorilere ekle"}
              onClick={() => setFavori(favoriDegistir(mod.id))}
              className={`no-print shrink-0 rounded-[2px] border px-2 py-1 text-lg leading-none transition-colors ${
                favori
                  ? "border-accent bg-accent text-accent-fg"
                  : "border-border text-text-secondary hover:border-accent hover:text-accent-text"
              }`}
            >
              {favori ? "★" : "☆"}
            </button>
          </div>

          <Card className="mt-4">
            <Caption className="uppercase text-text-tertiary block mb-2">
              Standart &amp; Yöntem
            </Caption>
            <Body className="text-text-secondary mb-3">{description}</Body>
            {formula && (
              <code className="block mt-3 rounded-md bg-surface-secondary border border-border px-3 py-2 font-mono text-mono text-text-primary overflow-x-auto">
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
                      className="w-9 shrink-0 rounded-md border border-border text-text-secondary transition-colors duration-fast hover:border-accent hover:text-accent-text disabled:opacity-50 disabled:cursor-not-allowed"
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
                      className="w-9 shrink-0 rounded-md border border-border text-text-secondary transition-colors duration-fast hover:border-accent hover:text-accent-text disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className="inline-flex rounded-[2px] border border-border px-3 py-1.5 text-caption text-text-secondary transition-colors duration-fast hover:border-accent hover:text-accent-text"
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
                <span className="inline-flex items-center rounded-[2px] border border-border px-2.5 py-0.5 text-caption font-medium text-text-secondary">
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
                    {mainValue}
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

              <div className="print-only mt-6 border-t border-border pt-4">
                <Caption className="uppercase mb-2 block">Girdiler</Caption>
                <dl className="text-body">
                  {fields.map((f) => (
                    <div key={f.key} className="flex justify-between py-1">
                      <dt className="text-text-secondary">{f.label}</dt>
                      <dd className="font-mono text-text-primary">
                        {f.type === "select"
                          ? (f.options?.find((o) => o.value === String(values[f.key]))?.label ?? values[f.key])
                          : values[f.key]}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-2 text-caption text-text-tertiary">
                  {mod.title} · {standardsLabel} · {new Date().toLocaleDateString("tr-TR")} · metranik.vercel.app
                </p>
              </div>

              <p className="mt-6 border-t border-border pt-4 text-caption text-text-tertiary">
                Ön boyutlandırmadır; nihai karar mühendis kontrolü gerektirir.
              </p>

              <div className="no-print mt-4 flex flex-wrap items-center gap-2">
                <ButtonSecondary type="button" onClick={() => window.print()}>
                  PDF indir
                </ButtonSecondary>
                <ButtonSecondary type="button" onClick={excelIndir}>
                  Excel
                </ButtonSecondary>
                <ButtonSecondary type="button" onClick={kaydet}>
                  Kaydet
                </ButtonSecondary>
                <ButtonSecondary type="button" onClick={paylas}>
                  Paylaş
                </ButtonSecondary>
                {bildirim && (
                  <span role="status" className="text-caption text-text-secondary break-all">
                    {bildirim}
                  </span>
                )}
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
