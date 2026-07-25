"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  isitmaYukuTs825,
  sogutmaYuku,
  hidronikSuDebisi,
  kanalBoyutlandirmaSmacna,
  kabloKesitiIec60364,
  kompanzasyon,
  depremTabanKesmeTbdy2018,
  zeminTasimaGucuKontrolu,
} from "@metranik/core-calc";
import { TUM_MODULLER } from "@/lib/modules";

const ONERI_CIPLERI = [
  { title: "Isıtma Yükü", href: "/isitma-yuku" },
  { title: "Kablo Kesiti", href: "/kablo-kesiti" },
  { title: "Sprinkler", href: "/sprinkler" },
  { title: "Kanal Boyutlandırma", href: "/kanal-boyutlandirma" },
  { title: "Kompanzasyon", href: "/kompanzasyon" },
  { title: "Zemin Taşıma Gücü", href: "/zemin-tasima-gucu-kontrolu" },
];

const STANDARTLAR = [
  "TS 825",
  "SMACNA",
  "NFPA 13",
  "DIN 4708",
  "IEC 60364",
  "EN 12464-1",
  "ASHRAE 62.1",
  "TBDY 2018",
];

const ROLLER = [
  {
    kategori: "MEKANİK",
    title: "Mekanik Mühendisi",
    desc: "Isıtma yükünden pompa seçimine, standart atıflı hesaplar tek pencerede.",
  },
  {
    kategori: "ELEKTRİK",
    title: "Elektrik Mühendisi",
    desc: "Kablo kesiti, kısa devre ve aydınlatma hesapları hesaplamaya hazır.",
  },
  {
    kategori: "İNŞAAT",
    title: "İnşaat Mühendisi",
    desc: "TBDY 2018 taban kesme hesabı ve zemin taşıma gücü kontrolü yayında.",
  },
  {
    kategori: "DENETİM",
    title: "Müşavir / Denetçi",
    desc: "Her sonuç ara değerleriyle gelir; denetimde kara kutuya güvenmezsiniz.",
  },
  {
    kategori: "OFİS",
    title: "Teknik Ofis",
    desc: "Aynı motoru ekip genelinde standart tutarlılıkla kullanın.",
  },
  {
    kategori: "EV",
    title: "Ev Sahibi",
    desc: "Kombi ya da klima kararını mühendis diliyle, sade arayüzle anlayın.",
  },
];

const YOL_HARITASI = [
  {
    etiket: "ŞİMDİ · YAYINDA",
    title: `${TUM_MODULLER.length} modül`,
    desc: "15 çekirdek hesap modülü + test/kontrol modülleri hesaplanabiliyor; tüm testler yeşil.",
  },
  {
    etiket: "SIRADA · FAZ 2",
    title: "BIM/IFC-native metraj",
    desc: "IFC modeli yüklenince boru/kanal/kablo/ekipman otomatik okunur, hesap girdileri kendiliğinden dolar.",
  },
  {
    etiket: "SONRA · FAZ 3",
    title: "AI asistan, bulut, native iOS",
    desc: "Doğal dille modül seçimi (hesabı asla LLM yapmaz), proje bulutu, revizyon geçmişi, offline-first senkron.",
  },
];

// Gösterilen kartlar gerçek compute() çıktısı — kurgu istatistik yok.
const ornekIsitma = isitmaYukuTs825.compute({ alan: 85, sehir: "istanbul", cam: "cift" });
const ornekSogutma = sogutmaYuku.compute({ alan: 85, sehir: "istanbul", kullanim: "konut" });
const ornekHidronik = hidronikSuDebisi.compute({ isiYuku: 10, deltaT: 10 });
const ornekKanal = kanalBoyutlandirmaSmacna.compute({ debi: 0.5, hiz: 5 });
const ornekKablo = kabloKesitiIec60364.compute({
  akim_A: 20,
  uzunluk_m: 30,
  izinliGerilimDusumu_V: 5,
  faz: "tek",
});
const ornekKompanzasyon = kompanzasyon.compute({
  aktifGuc_kW: 100,
  mevcutCosPhi: 0.75,
  hedefCosPhi: 0.95,
});
const ornekDeprem = depremTabanKesmeTbdy2018.compute({
  spektralIvme_Sa: 0.5,
  binaAgirligi_kN: 10000,
  onemKatsayisi_I: 1.0,
  tasiyiciSistemKatsayisi_R: 4,
});
const ornekZemin = zeminTasimaGucuKontrolu.compute({
  uygulananGerilme_kPa: 150,
  zeminEmniyetGerilmesi_kPa: 200,
});

const MOCK_KARTLAR = [
  {
    icon: "🌡️",
    title: "Isıtma Yükü",
    badge: "TS 825",
    value: `${ornekIsitma.value.kW.toFixed(2)}`,
    unit: "kW",
    subtext: "85 m² · İstanbul · çift cam",
    footer: "MEKANİK · HESAP",
    rotate: -2.4,
    translateY: -6,
  },
  {
    icon: "❄️",
    title: "Soğutma Yükü",
    badge: "Pratisyen",
    value: `${ornekSogutma.value.kW.toFixed(2)}`,
    unit: "kW",
    subtext: "85 m² · İstanbul · konut",
    footer: "MEKANİK · HESAP",
    rotate: 1.8,
    translateY: 10,
  },
  {
    icon: "💧",
    title: "Hidronik Su Debisi",
    badge: "Enerji Korunumu",
    value: `${ornekHidronik.value.debi_m3h.toFixed(2)}`,
    unit: "m³/h",
    subtext: "10 kW yük · ΔT 10°C",
    footer: "MEKANİK · HESAP",
    rotate: -1.2,
    translateY: 2,
  },
  {
    icon: "🌀",
    title: "Kanal Boyutlandırma",
    badge: "SMACNA",
    value: `${ornekKanal.value.capD_mm.toFixed(0)}`,
    unit: "mm",
    subtext: "0.5 m³/s · 5 m/s hedef hız",
    footer: "MEKANİK · HESAP",
    rotate: 1.4,
    translateY: -3,
  },
  {
    icon: "⚡",
    title: "Kablo Kesiti",
    badge: "IEC 60364",
    value: `${ornekKablo.value.kesit_mm2.toFixed(1)}`,
    unit: "mm²",
    subtext: "20 A · 30 m · tek faz",
    footer: "ELEKTRİK · HESAP",
    rotate: -1.6,
    translateY: 8,
  },
  {
    icon: "🔋",
    title: "Kompanzasyon",
    badge: "cosφ 0.75→0.95",
    value: `${ornekKompanzasyon.value.kapasitorGucu_kVAr.toFixed(1)}`,
    unit: "kVAr",
    subtext: "100 kW aktif güç",
    footer: "ELEKTRİK · HESAP",
    rotate: 2.2,
    translateY: 4,
  },
  {
    icon: "🏛️",
    title: "Deprem Taban Kesme",
    badge: "TBDY 2018",
    value: `${ornekDeprem.value.tabanKesmeKuvveti_kN.toFixed(0)}`,
    unit: "kN",
    subtext: "Sa=0.5g · W=10.000 kN · R=4",
    footer: "İNŞAAT · HESAP",
    rotate: -2,
    translateY: -5,
  },
  {
    icon: "✅",
    title: "Zemin Taşıma Gücü",
    badge: ornekZemin.verdict?.status === "uygun" ? "UYGUN" : "UYGUNSUZ",
    badgeTone: ornekZemin.verdict?.status === "uygun" ? "success" : "danger",
    value: `${ornekZemin.value.marj_kPa.toFixed(0)}`,
    unit: "kPa marj",
    subtext: "150 kPa uygulanan / 200 kPa emniyet",
    footer: "İNŞAAT · TEST & KONTROL",
    rotate: 1.2,
    translateY: 6,
  },
] as const;

function Eyebrow({ children, center = false }: { children: string; center?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-accent-hover ${center ? "justify-center" : ""}`}
    >
      <span aria-hidden className="h-px w-[26px] bg-accent/70" />
      {children}
    </p>
  );
}

export default function Home() {
  const [arama, setArama] = useState("");
  const router = useRouter();

  function ara(e: React.FormEvent) {
    e.preventDefault();
    router.push(arama.trim() ? `/uygulama?q=${encodeURIComponent(arama.trim())}` : "/uygulama");
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="border-b border-border px-6 pt-16 pb-20 sm:pt-20 sm:pb-24">
        <div className="mx-auto max-w-[1140px] text-center">
          <span className="mb-[34px] inline-flex items-center gap-2.5 rounded-full border border-border bg-text-primary/[0.03] px-4 py-1.5 font-mono text-[0.74rem] tracking-[0.1em] text-text-secondary">
            <span aria-hidden className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-success" />
            Beta sürümü · şu an tamamen ücretsiz · üyeliksiz kullanın
          </span>

          <h1 className="mx-auto max-w-3xl text-[clamp(2.9rem,7.2vw,5.6rem)] font-normal leading-[1.04] tracking-tight text-text-primary [font-family:var(--font-serif)]">
            Hesabı motor yapar.
            <span className="block text-text-secondary">
              Kararı <em className="font-normal text-accent-hover italic">mühendis</em> verir.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-[620px] text-[1.08rem] leading-[1.7] text-text-secondary">
            Her modül standart atıflı, ara değerleri şeffaf ve tamamen deterministik bir hesap
            motoruyla çalışır. Girdiyi siz belirlersiniz, sonucu motor üretir.
          </p>

          <form onSubmit={ara} className="mx-auto mt-10 max-w-[560px]">
            <div className="flex items-center gap-2.5 rounded-[14px] border-[1.5px] border-accent bg-surface-secondary py-1.5 pr-1.5 pl-4 shadow-[0_0_0_4px_var(--accent-glow)] focus-within:border-accent-hover">
              <svg
                aria-hidden
                width="18"
                height="18"
                viewBox="0 0 16 16"
                fill="none"
                className="shrink-0 text-accent-hover"
              >
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M14 14L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                value={arama}
                onChange={(e) => setArama(e.target.value)}
                placeholder="Ne hesaplamak istiyorsunuz? örn: 85 m² daireye ısıtma yükü"
                className="min-w-0 flex-1 bg-transparent py-2.5 text-[15px] text-text-primary placeholder:text-text-tertiary focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-[10px] bg-accent px-[22px] py-3 text-sm font-bold text-accent-fg transition-colors duration-150 hover:bg-accent-hover"
              >
                Hesapla
              </button>
            </div>
          </form>

          <div className="mx-auto mt-4 flex max-w-[560px] flex-wrap items-center justify-center gap-2">
            {ONERI_CIPLERI.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-text-secondary transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                {m.title}
              </Link>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap justify-center">
            {[
              { value: `${TUM_MODULLER.length}`, label: "modül yayında" },
              { value: "4", label: "disiplin" },
              { value: "42", label: "test yeşil" },
              { value: "0", label: "kara kutu hesap" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`px-8 py-1.5 text-center ${i > 0 ? "border-l border-border" : ""}`}
              >
                <b className="block font-normal tracking-tight text-text-primary [font-family:var(--font-serif)] text-[1.9rem]">
                  {stat.value}
                </b>
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-text-tertiary">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary">
            Süslü görsel değil — gerçek modüllerin gerçek çıktısı
          </p>
          <div className="mt-10 flex flex-wrap items-start justify-center gap-6 px-6">
            {MOCK_KARTLAR.map((kart) => (
              <div
                key={kart.title}
                style={{ transform: `rotate(${kart.rotate}deg) translateY(${kart.translateY}px)` }}
                className="w-[240px] rounded-2xl border border-border bg-surface-secondary p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-text-primary">
                    <span aria-hidden>{kart.icon}</span>
                    {kart.title}
                  </span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] ${
                      "badgeTone" in kart && kart.badgeTone === "success"
                        ? "border-success/40 text-success"
                        : "badgeTone" in kart && kart.badgeTone === "danger"
                          ? "border-danger/40 text-danger"
                          : "border-border-strong text-text-tertiary"
                    }`}
                  >
                    {kart.badge}
                  </span>
                </div>
                <p className="mt-4 font-mono text-2xl font-semibold tabular-nums text-text-primary">
                  {kart.value} <span className="text-sm text-text-secondary">{kart.unit}</span>
                </p>
                <p className="mt-1 text-xs text-text-tertiary">{kart.subtext}</p>
                <p className="mt-4 text-[10px] uppercase tracking-wide text-text-tertiary">
                  {kart.footer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standart marquee */}
      <section className="border-b border-border py-6">
        <p className="mb-4 text-center text-[11px] uppercase tracking-[0.2em] text-text-tertiary">
          Hesaplar bu standartlara dayanır
        </p>
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee gap-3">
            {[...STANDARTLAR, ...STANDARTLAR].map((s, i) => (
              <span
                key={`${s}-${i}`}
                className="whitespace-nowrap rounded-full border border-border px-4 py-1.5 font-mono text-xs text-text-secondary"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Özellik: Isıtma Yükü */}
      <section id="nasil-calisir" className="border-b border-border px-6 py-20">
        <div className="mx-auto grid max-w-[1140px] gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Biliyor muydunuz?</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.6rem,3.2vw,2.4rem)] leading-tight text-text-primary [font-family:var(--font-serif)]">
              Bir dairenin ısıtma yükünü <em className="text-accent">saniyeler içinde</em>{" "}
              çıkarabileceğinizi biliyor muydunuz?
            </h2>
            <p className="mt-4 max-w-[55ch] text-sm leading-relaxed text-text-secondary">
              Alan, şehir ve cam tipini girin; motor TS 825 tabanlı yöntemle ara değerleriyle
              birlikte kW cinsinden sonucu versin. Kara kutu yok — her adım görünür.
            </p>
            <Link
              href="/isitma-yuku"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors duration-300 hover:text-accent-hover"
            >
              Isıtma Yükü&apos;nü deneyin
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-surface-secondary p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-text-primary">Isıtma Yükü</span>
              <span className="rounded-full border border-border-strong px-2.5 py-0.5 text-[11px] text-text-tertiary">
                TS 825
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["85 m²", "İstanbul", "Çift Cam"].map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-accent bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                >
                  {p}
                </span>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-border-strong bg-surface p-4">
              <p className="font-mono text-2xl font-semibold tabular-nums text-text-primary">
                {ornekIsitma.value.kW.toFixed(2)}{" "}
                <span className="text-sm font-normal text-text-secondary">kW</span>
              </p>
              <dl className="mt-3 divide-y divide-border text-xs">
                {Object.entries(ornekIsitma.intermediates).map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1.5 text-text-tertiary">
                    <dt>{k}</dt>
                    <dd className="font-mono text-text-secondary">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Özellik: Hidronik Su Debisi */}
      <section className="border-b border-border px-6 py-20">
        <div className="mx-auto grid max-w-[1140px] gap-12 lg:grid-cols-2 lg:items-center">
          <div className="order-2 rounded-2xl border border-border bg-surface-secondary p-6 lg:order-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-text-primary">Hidronik Su Debisi</span>
              <span className="rounded-full border border-border-strong px-2.5 py-0.5 text-[11px] text-text-tertiary">
                Enerji Korunumu
              </span>
            </div>
            <dl className="mt-4 divide-y divide-border text-sm">
              <div className="flex justify-between py-2">
                <dt className="text-text-secondary">Isı Yükü</dt>
                <dd className="font-mono text-text-primary">10 kW</dd>
              </div>
              <div className="flex justify-between py-2">
                <dt className="text-text-secondary">ΔT</dt>
                <dd className="font-mono text-text-primary">10 °C</dd>
              </div>
              {Object.entries(ornekHidronik.intermediates).map(([k, v]) => (
                <div key={k} className="flex justify-between py-2 text-xs">
                  <dt className="text-text-tertiary">{k}</dt>
                  <dd className="font-mono text-text-tertiary">
                    {typeof v === "number" ? v.toFixed(3) : v}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 rounded-xl border border-accent bg-accent/10 p-4">
              <p className="font-mono text-2xl font-semibold tabular-nums text-text-primary">
                {ornekHidronik.value.debi_m3h.toFixed(2)}{" "}
                <span className="text-sm font-normal text-text-secondary">m³/h</span>
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Eyebrow>Biliyor muydunuz?</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.6rem,3.2vw,2.4rem)] leading-tight text-text-primary [font-family:var(--font-serif)]">
              Isı yükünden debiye geçişin <em className="text-accent">tek fizik formülüyle</em>{" "}
              çözüldüğünü biliyor muydunuz?
            </h2>
            <p className="mt-4 max-w-[55ch] text-sm leading-relaxed text-text-secondary">
              Enerji korunumu kanunu (Q = ṁ · cp · ΔT) motoru çalıştırır — bir standart
              tablosundan değil, suyun fiziksel özelliklerinden gelir.
            </p>
            <Link
              href="/hidronik-su-debisi"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors duration-300 hover:text-accent-hover"
            >
              Hidronik Su Debisi&apos;ni deneyin
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Roller */}
      <section id="kimin-icin" className="border-b border-border px-6 py-20">
        <div className="mx-auto max-w-[1140px]">
          <h2 className="max-w-2xl text-[clamp(1.8rem,3.6vw,2.6rem)] leading-tight text-text-primary [font-family:var(--font-serif)]">
            Sahadaki herkese göre bir yüzü var.
          </h2>
          <p className="mt-3 max-w-[55ch] text-sm text-text-secondary">
            Rolünüze göre önem sırası değişir; modüller yine herkese açık.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ROLLER.map((rol, i) => (
              <div
                key={rol.title}
                className="relative overflow-hidden rounded-2xl border border-border p-6"
              >
                <span className="absolute right-4 top-4 font-mono text-3xl text-border-strong">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  Metranik · {rol.kategori}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-text-primary">{rol.title}</h3>
                <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-text-secondary">
                  {rol.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Yol haritası */}
      <section className="border-b border-border px-6 py-20">
        <div className="mx-auto max-w-[1140px]">
          <Eyebrow>Yol Haritası</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-[clamp(1.8rem,3.6vw,2.6rem)] leading-tight text-text-primary [font-family:var(--font-serif)]">
            Milestone 0 tamam. Sırada standart doğrulaması var.
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {YOL_HARITASI.map((adim) => (
              <div key={adim.etiket} className="rounded-2xl border border-border p-6">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-accent">
                  {adim.etiket}
                </p>
                <h3 className="mt-3 text-base font-semibold text-text-primary">{adim.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{adim.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reklam Verin */}
      <section id="reklam-verin" className="border-b border-border px-6 py-20">
        <div className="mx-auto max-w-[1140px]">
          <Eyebrow>Reklam Verin</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-[clamp(1.8rem,3.6vw,2.6rem)] leading-tight text-text-primary [font-family:var(--font-serif)]">
            Doğru anda, doğru mühendise reklam verin.
          </h2>
          <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-text-secondary">
            Metranik beta sürümünde; kullanıcılar gerçek bir hesap yapıp karar verirken
            markanız tam o anda görünür. Malzeme, ekipman ve yazılım üreticileri için
            sponsorluk alanları ayrılabilir.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Ana Sponsor Bandı",
                desc: "Anasayfa üst bandında sürekli marka görünürlüğü.",
              },
              {
                title: "Kategori Sponsorluğu",
                desc: "Belirli bir disiplin veya modül grubunda (örn. Elektrik Tesisat) öne çıkın.",
              },
              {
                title: "Sonuç Yanı Kart",
                desc: "Hesap sonuç ekranında bağlamsal, ilgili markanın kartı.",
              },
            ].map((k) => (
              <div key={k.title} className="rounded-2xl border border-dashed border-border-strong p-6">
                <p className="text-sm font-semibold text-text-primary">{k.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{k.desc}</p>
              </div>
            ))}
          </div>

          <a
            href="mailto:erturkuludasdemir@gmail.com?subject=Metranik%20Reklam%20%2F%20Sponsorluk"
            className="mt-8 inline-flex items-center justify-center rounded-xl border border-accent px-5 py-2.5 text-sm font-semibold text-accent transition-colors duration-300 hover:bg-accent hover:text-accent-fg"
          >
            Reklam İçin İletişime Geçin
          </a>
        </div>
      </section>

      {/* Kapanış CTA */}
      <section className="flex-1 px-6 py-20 text-center">
        <Eyebrow center>Hazır mısınız?</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-xl text-[clamp(1.6rem,3.2vw,2.2rem)] leading-tight text-text-primary [font-family:var(--font-serif)]">
          20 modülün tamamı bir tık uzağınızda.
        </h2>
        <Link
          href="/uygulama"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-fg shadow-[0_8px_28px_-8px_var(--accent-glow)] transition-colors duration-300 hover:bg-accent-hover"
        >
          Uygulamayı Aç
        </Link>
      </section>
    </div>
  );
}
