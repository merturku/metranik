"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TUM_MODULLER } from "@/lib/modules";
import {
  csvOlustur,
  dosyaIndir,
  favorileriGetir,
  kayitlariGetir,
  kaydiSil,
  yedekOlustur,
  yedekYukle,
  type KayitliHesap,
} from "@/lib/projeler";
import { ButtonSecondary, Caption, Headline, Body } from "@/components/design-system";

export default function ProjelerimSayfasi() {
  const [kayitlar, setKayitlar] = useState<KayitliHesap[]>([]);
  const [favoriler, setFavoriler] = useState<string[]>([]);
  const [hazir, setHazir] = useState(false);

  useEffect(() => {
    setKayitlar(kayitlariGetir());
    setFavoriler(favorileriGetir());
    setHazir(true);
  }, []);

  const projeler = new Map<string, KayitliHesap[]>();
  for (const k of kayitlar) projeler.set(k.proje, [...(projeler.get(k.proje) ?? []), k]);
  const favModuller = favoriler
    .map((id) => TUM_MODULLER.find((m) => m.id === id))
    .filter((m): m is (typeof TUM_MODULLER)[number] => Boolean(m));

  const [mesaj, setMesaj] = useState<string | null>(null);

  function yedekAl() {
    dosyaIndir(`metranik-yedek-${new Date().toISOString().slice(0, 10)}.json`, yedekOlustur(), "application/json");
  }

  async function yedekGeriYukle(dosya: File | undefined) {
    if (!dosya) return;
    if (!window.confirm("Mevcut kayıt ve favorilerin üzerine yazılacak. Devam edilsin mi?")) return;
    const ok = yedekYukle(await dosya.text());
    setMesaj(ok ? "Yedek geri yüklendi." : "Geçersiz yedek dosyası.");
    setKayitlar(kayitlariGetir());
    setFavoriler(favorileriGetir());
  }

  function sil(id: string) {
    kaydiSil(id);
    setKayitlar(kayitlariGetir());
  }

  function projeExcel(ad: string, liste: KayitliHesap[]) {
    const satirlar: string[][] = [["Metranik proje raporu", ad], ["Tarih", new Date().toLocaleDateString("tr-TR")], []];
    for (const k of liste) {
      satirlar.push([k.title, k.sonuc], ["Standart", k.standart]);
      if (k.durum) satirlar.push(["Değerlendirme", k.durum]);
      for (const g of k.girdiler) satirlar.push([`  ${g.etiket}`, g.deger]);
      satirlar.push([]);
    }
    satirlar.push(["Not", "Ön boyutlandırmadır; nihai karar mühendis kontrolü gerektirir."]);
    dosyaIndir(`${ad.replace(/[^\p{L}\p{N}]+/gu, "-")}.csv`, csvOlustur(satirlar));
  }

  return (
    <div className="mx-auto w-full max-w-[1140px] px-6 py-8">
      <Headline>Projelerim</Headline>
      <Body className="mt-2 text-text-secondary">
        Kaydettiğiniz hesaplar ve favori modülleriniz yalnız bu tarayıcıda saklanır; sunucuya gönderilmez. Tarayıcı
        verisini silerseniz kayıtlar da silinir — önemli hesapları PDF veya Excel olarak indirin.
      </Body>

      <div className="no-print mt-4 flex flex-wrap items-center gap-2">
        <ButtonSecondary type="button" onClick={yedekAl}>
          Yedek al
        </ButtonSecondary>
        <label className="inline-flex cursor-pointer items-center rounded-md border border-border bg-surface px-4 py-2.5 text-body font-medium text-text-primary hover:bg-surface-secondary">
          Yedeği geri yükle
          <input type="file" accept="application/json" className="sr-only" onChange={(e) => yedekGeriYukle(e.target.files?.[0])} />
        </label>
        {mesaj && <span role="status" className="text-caption text-text-secondary">{mesaj}</span>}
      </div>

      <section className="mt-8">
        <Caption className="uppercase text-text-tertiary block mb-3">Favori modüller</Caption>
        {!hazir ? null : favModuller.length === 0 ? (
          <Body className="text-text-tertiary">Henüz favori yok. Bir modülün başlığındaki ☆ simgesine basın.</Body>
        ) : (
          <div className="flex flex-wrap gap-2">
            {favModuller.map((m) => (
              <Link
                key={m.id}
                href={m.href}
                className="inline-flex rounded-[2px] border border-border px-3 py-1.5 text-caption text-text-secondary transition-colors hover:border-accent hover:text-accent-text"
              >
                ★ {m.title}
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mt-10 flex flex-col gap-8">
        <Caption className="uppercase text-text-tertiary block">Kayıtlı hesaplar</Caption>
        {hazir && projeler.size === 0 && (
          <Body className="text-text-tertiary">
            Henüz kayıt yok. Bir hesabı yaptıktan sonra sonuç kartındaki “Kaydet” düğmesini kullanın.
          </Body>
        )}
        {[...projeler.entries()].map(([ad, liste]) => (
          <div key={ad} className="rounded-lg border border-border bg-surface p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
              <h2 className="text-headline font-semibold text-text-primary">
                {ad} <span className="text-caption font-normal text-text-tertiary">· {liste.length} hesap</span>
              </h2>
              <div className="no-print flex gap-2">
                <ButtonSecondary type="button" onClick={() => window.print()}>
                  PDF rapor
                </ButtonSecondary>
                <ButtonSecondary type="button" onClick={() => projeExcel(ad, liste)}>
                  Excel
                </ButtonSecondary>
              </div>
            </div>
            <ul className="divide-y divide-border">
              {liste.map((k) => (
                <li key={k.id} className="py-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <Link href={k.href} className="font-medium text-text-primary hover:text-accent-text">
                      {k.title}
                    </Link>
                    <span className="font-mono text-accent-text">{k.sonuc}</span>
                  </div>
                  <p className="mt-1 text-caption text-text-tertiary">
                    {k.standart} · {new Date(k.tarih).toLocaleDateString("tr-TR")}
                    {k.durum ? ` · ${k.durum.toUpperCase()}` : ""}
                  </p>
                  <p className="mt-1 text-caption text-text-secondary">
                    {k.girdiler.map((g) => `${g.etiket}: ${g.deger}`).join(" · ")}
                  </p>
                  <button
                    type="button"
                    onClick={() => sil(k.id)}
                    className="no-print mt-1 text-caption text-text-tertiary underline hover:text-error"
                  >
                    Sil
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-3 border-t border-border pt-3 text-caption text-text-tertiary">
              Ön boyutlandırmadır; nihai karar mühendis kontrolü gerektirir.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
