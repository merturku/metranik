"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Display2,
  Headline,
  Subheading,
  Body,
  Caption,
  ButtonPrimary,
  Card,
  CardBody,
  Badge,
} from "@/components/design-system";
import { TUM_MODULLER } from "@/lib/modules";

const QUICK_MODULES = [
  { title: "Isıtma Yükü", href: "/isitma-yuku" },
  { title: "Kablo Kesiti", href: "/kablo-kesiti" },
  { title: "Sprinkler", href: "/sprinkler" },
  { title: "Kanal Boyutlandırma", href: "/kanal-boyutlandirma" },
  { title: "Kompanzasyon", href: "/kompanzasyon" },
  { title: "Zemin Taşıma Gücü", href: "/zemin-tasima-gucu-kontrolu" },
];

const ROLES = [
  {
    title: "Mekanik Mühendisi",
    desc: "Isıtma yükünden pompa seçimine, standart atıflı hesaplar tek pencerede.",
    badge: "MEKANİK",
  },
  {
    title: "Elektrik Mühendisi",
    desc: "Kablo kesiti, kısa devre ve aydınlatma hesapları hesaplamaya hazır.",
    badge: "ELEKTRİK",
  },
  {
    title: "İnşaat Mühendisi",
    desc: "TBDY 2018 taban kesme hesabı ve zemin taşıma gücü kontrolü yayında.",
    badge: "İNŞAAT",
  },
  {
    title: "Müşavir / Denetçi",
    desc: "Her sonuç ara değerleriyle gelir; denetimde kara kutuya güvenmezsiniz.",
    badge: "DENETİM",
  },
];

const ROADMAP = [
  {
    phase: "ŞİMDİ · YAYINDA",
    title: `${TUM_MODULLER.length} modül`,
    desc: "Tüm testler yeşil, gerçek formüllerle hesaplar.",
  },
  {
    phase: "SIRADA · FAZ 2",
    title: "BIM/IFC-native metraj",
    desc: "IFC modeli yüklenince boru/kanal/kablo otomatik okunur.",
  },
  {
    phase: "SONRA · FAZ 3",
    title: "AI asistan, bulut, native iOS",
    desc: "Doğal dille modül seçimi, proje bulutu, offline-first senkron.",
  },
];

export default function Home() {
  const [arama, setArama] = useState("");
  const router = useRouter();

  function ara(e: React.FormEvent) {
    e.preventDefault();
    router.push(
      arama.trim()
        ? `/uygulama?q=${encodeURIComponent(arama.trim())}`
        : "/uygulama"
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero — tek ekran, sıcak ışımalı zemin */}
      <section className="relative -mt-[100px] flex min-h-[100svh] flex-col overflow-hidden border-b border-border">
        <div aria-hidden className="os-bg pointer-events-none absolute inset-0" />
        <div aria-hidden className="dotted pointer-events-none absolute inset-0 opacity-60" />

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-8 pt-[132px] text-center">
          <div className="os-stack flex w-full max-w-[1100px] flex-col items-center">
            <div className="mb-[22px] inline-flex items-center gap-[9px] rounded-full border border-border bg-text-primary/[0.03] px-4 py-[7px] font-mono text-[0.74rem] tracking-[0.1em] text-text-secondary">
              <span className="animate-pulse-dot h-[7px] w-[7px] rounded-full bg-success" aria-hidden />
              Beta sürümü · Tamamen ücretsiz
            </div>

            <h1 className="mx-auto font-serif text-[clamp(2.3rem,6.2vw,4.9rem)] font-normal leading-[1.04] tracking-[-0.02em] text-text-primary">
              Hesabı motor yapar.
              <span className="block text-text-secondary">
                Kararı <b className="font-normal italic text-accent-text">mühendis</b> verir.
              </span>
            </h1>

            <p className="mx-auto mt-[18px] max-w-[600px] text-[1.02rem] leading-[1.65] text-text-secondary">
              Her modül ara değerlerini gösterir ve tamamen deterministik bir hesap motoruyla çalışır.
              Girdiyi siz belirlersiniz, sonucu motor üretir.
            </p>

            <form
              onSubmit={ara}
              role="search"
              aria-label="Hesap ara"
              className="mx-auto mb-3 mt-[26px] flex w-full max-w-[640px] items-center gap-2.5 rounded-[14px] border-[1.5px] border-accent bg-surface/90 py-1.5 pl-4 pr-1.5 shadow-[0_0_0_4px_var(--accent-glow)] backdrop-blur-[6px] transition-colors focus-within:border-accent-text max-[560px]:flex-wrap max-[560px]:p-2.5"
            >
              <svg aria-hidden width="18" height="18" viewBox="0 0 16 16" fill="none" className="shrink-0 text-accent-text">
                <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.8" />
                <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                value={arama}
                onChange={(e) => setArama(e.target.value)}
                aria-label="Hesap sorusu"
                autoComplete="off"
                placeholder="Ne hesaplamak istiyorsunuz? örn: 85 m² daireye ısıtma yükü"
                className="min-w-0 flex-1 bg-transparent py-2.5 text-[15px] text-text-primary placeholder:text-text-tertiary focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-[10px] bg-accent px-[22px] py-3 text-[14px] font-bold text-accent-fg transition-colors hover:bg-accent-hover max-[560px]:w-full"
              >
                Hesapla
              </button>
            </form>

            <div className="mx-auto mb-5 flex max-w-[680px] flex-wrap justify-center gap-2" aria-label="Popüler hesaplar">
              {QUICK_MODULES.map((m) => (
                <Link
                  key={m.href}
                  href={m.href}
                  className="rounded-full border border-border-strong bg-background/45 px-3.5 py-1.5 text-[12.5px] text-text-secondary transition-colors hover:border-accent hover:text-accent-text"
                >
                  {m.title}
                </Link>
              ))}
            </div>

            <div className="mt-1.5 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/uygulama"
                className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-4 text-[1.02rem] font-semibold text-accent-fg shadow-[0_8px_28px_-8px_var(--accent-glow)] transition-all duration-200 hover:-translate-y-0.5 hover:gap-[18px] hover:bg-accent-hover"
              >
                Uygulamayı Aç
                <svg aria-hidden viewBox="0 0 16 16" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 8h11M9.5 4l4 4-4 4" />
                </svg>
              </Link>
              <a
                href="#kimin-icin"
                className="inline-flex items-center rounded-full border border-border-strong bg-text-primary/[0.03] px-8 py-4 text-[1.02rem] font-semibold text-text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-text-primary/25 hover:text-text-primary"
              >
                Kimler kullanır
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-10 border-t border-border/60 bg-gradient-to-t from-background/85 to-background/35 px-7 pb-[18px] pt-3.5">
          <div className="mx-auto flex max-w-[1140px] flex-wrap items-center justify-between gap-4">
            <dl className="flex flex-wrap">
              {[
                [String(TUM_MODULLER.length), "hesap modülü"],
                ["4", "disiplin"],
                ["Ara değerler", "şeffaf sonuç"],
                ["Ön boyutlandırma", "mühendis kontrolü şart"],
              ].map(([b, t], i) => (
                <div key={t} className={`px-[22px] py-0.5 text-center ${i > 0 ? "border-l border-border/60" : ""}`}>
                  <dt className="font-serif text-[1.3rem] leading-tight text-text-primary">{b}</dt>
                  <dd className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-text-tertiary">{t}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="kimin-icin" className="scroll-mt-24 px-lg py-16 sm:py-24">
        <div className="mx-auto max-w-[1140px]">
          <div className="text-center mb-12">
            <Caption className="text-text-tertiary uppercase mb-2">Kimin için</Caption>
            <Display2>Rol bazlı arayüz</Display2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROLES.map((role) => (
              <Card key={role.title}>
                <CardBody>
                  <Badge variant="primary" className="mb-3">
                    {role.badge}
                  </Badge>
                  <Subheading className="mb-2">{role.title}</Subheading>
                  <Body className="text-text-secondary">{role.desc}</Body>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="yol-haritasi" className="scroll-mt-24 px-lg py-16 sm:py-24 border-t border-border">
        <div className="mx-auto max-w-[1140px]">
          <div className="text-center mb-12">
            <Caption className="text-text-tertiary uppercase mb-2">Yol Haritası</Caption>
            <Display2>Ne geliyor</Display2>
          </div>

          <div className="space-y-6">
            {ROADMAP.map((item) => (
              <Card key={item.phase}>
                <CardBody>
                  <Caption className="text-text-tertiary uppercase mb-2">
                    {item.phase}
                  </Caption>
                  <Headline className="mb-2">{item.title}</Headline>
                  <Body className="text-text-secondary">{item.desc}</Body>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-lg py-16 sm:py-24 bg-surface">
        <div className="mx-auto max-w-[1140px] text-center">
          <Headline className="mb-4">Başlamaya hazır mısınız?</Headline>
          <Body className="text-text-secondary mb-8">
            330+ modül ile mühendislik hesaplarınıza başlayın.
          </Body>
          <ButtonPrimary onClick={() => router.push("/uygulama")}>
            Uygulamaya Git
          </ButtonPrimary>
        </div>
      </section>
    </div>
  );
}
