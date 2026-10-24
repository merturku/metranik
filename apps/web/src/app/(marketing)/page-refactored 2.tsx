"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Display1,
  Display2,
  Headline,
  Subheading,
  Body,
  BodyLarge,
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
      {/* Hero */}
      <section className="border-b border-border px-lg py-16 sm:py-24">
        <div className="mx-auto max-w-[1140px]">
          <div className="text-center mb-12">
            <Badge variant="primary" className="mb-4 justify-center">
              Beta sürümü · Tamamen ücretsiz
            </Badge>

            <Display1 className="mt-6 mb-4">
              Hesabı motor yapar.
            </Display1>
            <Subheading className="text-text-secondary mb-6">
              Kararı <em className="font-normal text-accent not-italic">mühendis</em> verir.
            </Subheading>

            <BodyLarge className="mx-auto max-w-[640px] text-text-secondary mb-8">
              Her modül standart atıflı, ara değerleri şeffaf ve tamamen deterministik bir
              hesap motoruyla çalışır. Girdiyi siz belirlersiniz, sonucu motor üretir.
            </BodyLarge>
          </div>

          {/* Search Form */}
          <form onSubmit={ara} className="mx-auto max-w-[560px] mb-8">
            <div className="flex items-center gap-sm rounded-lg border border-border bg-surface px-4 py-3 focus-within:ring-2 focus-within:ring-accent">
              <svg
                aria-hidden
                width="18"
                height="18"
                viewBox="0 0 16 16"
                fill="none"
                className="shrink-0 text-accent"
              >
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M14 14L11 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <input
                type="text"
                value={arama}
                onChange={(e) => setArama(e.target.value)}
                placeholder="Ne hesaplamak istiyorsunuz? örn: 85 m² daireye ısıtma yükü"
                className="flex-1 bg-transparent text-body text-text-primary placeholder:text-text-tertiary focus:outline-none"
              />
              <ButtonPrimary type="submit" className="shrink-0">
                Hesapla
              </ButtonPrimary>
            </div>
          </form>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-2">
            {QUICK_MODULES.slice(0, 6).map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="rounded-full border border-border px-3 py-1.5 text-caption text-text-secondary hover:border-accent hover:text-accent transition-colors duration-fast"
              >
                {m.title}
              </Link>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            <div>
              <Headline className="text-accent mb-1">{TUM_MODULLER.length}</Headline>
              <Caption className="text-text-secondary">modül yayında</Caption>
            </div>
            <div>
              <Headline className="text-accent mb-1">4</Headline>
              <Caption className="text-text-secondary">disiplin</Caption>
            </div>
            <div>
              <Headline className="text-accent mb-1">100%</Headline>
              <Caption className="text-text-secondary">test yeşil</Caption>
            </div>
            <div>
              <Headline className="text-accent mb-1">0</Headline>
              <Caption className="text-text-secondary">kara kutu</Caption>
            </div>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="px-lg py-16 sm:py-24">
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
      <section className="px-lg py-16 sm:py-24 border-t border-border">
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
