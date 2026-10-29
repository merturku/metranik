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
      {/* Hero — teknik çizim pafta */}
      <section className="relative -mt-[100px] flex min-h-[100svh] flex-col overflow-hidden">
        <div className="relative z-10 mx-auto grid w-full max-w-[1240px] flex-1 items-center gap-10 px-8 pb-6 pt-[132px] lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:px-14">
          <div className="os-stack">
            <div className="font-mono text-[12px] tracking-[0.2em] text-line">PAFTA 01 / HESAP MOTORU · BETA</div>
            <h1 className="mt-4 font-display text-[clamp(3rem,7vw,5.25rem)] font-bold uppercase leading-[0.95] text-white">
              Hesap<br />motorun.
              <span className="block text-accent-text">Karar senin.</span>
            </h1>
            <p className="mt-6 max-w-[470px] font-mono text-[15px] leading-[1.7] text-text-secondary">
              Girdiyi yaz, motor hesaplasın; her ara değer çizimdeki ölçü çizgisi gibi görünür kalsın. Denetçi neyin nereden geldiğini okur.
            </p>

            <form
              onSubmit={ara}
              role="search"
              aria-label="Hesap ara"
              className="mt-7 flex w-full max-w-[520px] items-center gap-2 border-[1.5px] border-accent bg-surface py-1.5 pl-4 pr-1.5 shadow-[0_0_0_4px_var(--accent-glow)] max-[520px]:flex-wrap max-[520px]:p-2"
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
                placeholder="Ne hesaplamak istiyorsunuz?"
                className="min-w-0 flex-1 bg-transparent py-2.5 font-mono text-[14px] text-text-primary placeholder:text-text-tertiary focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 bg-accent px-5 py-3 font-mono text-[13px] font-semibold tracking-[0.06em] text-accent-fg transition-colors hover:bg-accent-hover max-[520px]:w-full"
              >
                HESAPLA
              </button>
            </form>

            <div className="mt-4 flex max-w-[520px] flex-wrap gap-2" aria-label="Popüler hesaplar">
              {QUICK_MODULES.map((m) => (
                <Link
                  key={m.href}
                  href={m.href}
                  className="border border-border px-3 py-1.5 font-mono text-[12px] text-text-secondary transition-colors hover:border-accent hover:text-accent-text"
                >
                  {m.title}
                </Link>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3.5">
              <Link
                href="/yagmur-olugu-kapasitesi"
                className="bg-accent px-6 py-4 font-mono text-[13.5px] font-semibold tracking-[0.06em] text-accent-fg transition-colors hover:bg-accent-hover"
              >
                ÖRNEK HESABI AÇ
              </Link>
              <Link
                href="/uygulama"
                className="border-[1.5px] border-line px-6 py-4 font-mono text-[13.5px] tracking-[0.06em] text-text-primary transition-colors hover:bg-line/10"
              >
                {TUM_MODULLER.length} MODÜL
              </Link>
            </div>
          </div>

          <figure className="m-0 justify-self-center lg:justify-self-end" style={{ width: "100%", maxWidth: 610 }}>
            <svg
              viewBox="0 0 560 420"
              width="100%"
              role="img"
              aria-label="Yarım daire yağmur oluğu enine kesiti: çap 125 mm, tam dolu, kapasite 3,913 litre/saniye"
              className="block"
            >
              <defs>
                <pattern id="tarama" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#8fd8ff" strokeWidth="1" opacity=".5" />
                </pattern>
              </defs>
              <path d="M140 150 A140 140 0 0 0 420 150 Z" fill="url(#tarama)" />
              <path d="M140 150 A140 140 0 0 0 420 150" fill="none" stroke="#fff" strokeWidth="4" />
              <line x1="120" y1="150" x2="440" y2="150" stroke="#8fd8ff" strokeWidth="1.5" strokeDasharray="10 5 2 5" />
              <g stroke="#ffd166" fill="#ffd166" strokeWidth="1.5">
                <line x1="140" y1="150" x2="140" y2="86" />
                <line x1="420" y1="150" x2="420" y2="86" />
                <line x1="140" y1="100" x2="420" y2="100" />
                <path d="M140 100l12-5v10zM420 100l-12-5v10z" stroke="none" />
              </g>
              <text x="280" y="88" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="16" fontWeight="600" fill="#ffd166">Ø125 mm</text>
              <line x1="280" y1="150" x2="280" y2="290" stroke="#8fd8ff" strokeWidth="1.5" />
              <circle cx="280" cy="150" r="4" fill="#8fd8ff" />
              <text x="292" y="228" fontFamily="IBM Plex Mono" fontSize="15" fill="#d9ecff">r = 62,5</text>
              <g stroke="#ffd166" strokeWidth="1.5" fill="#ffd166">
                <line x1="450" y1="150" x2="540" y2="162" />
                <path d="M540 162l-10-6 -2 10z" stroke="none" />
              </g>
              <text x="462" y="190" fontFamily="IBM Plex Mono" fontSize="15" fill="#ffd166">S = %0,5</text>
              <polyline points="215,250 170,330 120,330" fill="none" stroke="#8fd8ff" strokeWidth="1.5" />
              <rect x="10" y="300" width="112" height="60" fill="#0a2342" stroke="#8fd8ff" strokeWidth="1.5" />
              <text x="20" y="322" fontFamily="IBM Plex Mono" fontSize="12.5" fill="#b4cce4">n = 0,011</text>
              <text x="20" y="344" fontFamily="IBM Plex Mono" fontSize="12.5" fill="#b4cce4">R = r/2 = 31,25</text>
            </svg>
            <figcaption className="mt-2 font-mono text-[11px] tracking-[0.14em] text-text-tertiary">ÖRNEK HESAP · YAĞMUR OLUĞU KESİTİ</figcaption>
          </figure>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-wrap items-end gap-x-9 gap-y-4 px-8 pb-24 lg:px-14">
          <div className="pb-3 font-mono text-[12px] tracking-[0.2em] text-line">SONUÇ</div>
          <div className="font-display text-[clamp(3.5rem,7vw,5.75rem)] font-bold leading-[0.9] text-white">
            3,913<span className="ml-3 text-[2.1rem] text-accent-text">L/s</span>
          </div>
          <div className="pb-1.5 font-mono text-[13.5px] leading-[1.8] text-text-secondary">
            Q = (1/n)·A·R<sup>2/3</sup>·S<sup>1/2</sup>
            <br />
            Manning · tam dolu yarım daire kesit
          </div>
          <dl className="ml-auto grid w-full max-w-[640px] grid-cols-2 border-[1.5px] border-line bg-background/90 font-mono text-[12px] sm:grid-cols-[2fr_1fr_1fr_1fr]">
            {[
              ["HESAP", "Yağmur oluğu taşıma kapasitesi"],
              ["YÖNTEM", "Manning"],
              ["DURUM", "UYGUN"],
              ["NOT", "Ön boyutlandırma"],
            ].map(([k, v], i) => (
              <div key={k} className={`px-3.5 py-2.5 ${i > 0 ? "border-l border-line/50" : ""}`}>
                <dt className="text-[10.5px] tracking-[0.14em] text-text-secondary">{k}</dt>
                <dd className={`mt-1 font-semibold ${k === "DURUM" ? "text-accent-text" : "text-white"}`}>{v}</dd>
              </div>
            ))}
          </dl>
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
