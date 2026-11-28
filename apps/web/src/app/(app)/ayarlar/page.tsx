"use client";

import { useEffect, useState } from "react";
import { BOS_FIRMA, LOGO_AZAMI_BAYT, firmaGetir, firmaKaydet, type FirmaBilgisi } from "@/lib/firma";

const ALANLAR: { anahtar: "ad" | "adres" | "telefon" | "eposta"; etiket: string }[] = [
  { anahtar: "ad", etiket: "Firma adı" },
  { anahtar: "adres", etiket: "Adres" },
  { anahtar: "telefon", etiket: "Telefon" },
  { anahtar: "eposta", etiket: "E-posta" },
];

export default function AyarlarSayfasi() {
  const [f, setF] = useState<FirmaBilgisi>(BOS_FIRMA);
  const [mesaj, setMesaj] = useState<string | null>(null);

  useEffect(() => setF(firmaGetir()), []);

  function logoSec(dosya: File | undefined) {
    if (!dosya) return;
    if (!dosya.type.startsWith("image/")) return setMesaj("Lütfen bir görsel dosyası seçin.");
    if (dosya.size > LOGO_AZAMI_BAYT) return setMesaj(`Logo en fazla ${LOGO_AZAMI_BAYT / 1000} KB olabilir.`);
    const okuyucu = new FileReader();
    okuyucu.onload = () => {
      const sonuc = typeof okuyucu.result === "string" ? okuyucu.result : "";
      setF((o) => ({ ...o, logo: sonuc }));
      setMesaj(null);
    };
    okuyucu.readAsDataURL(dosya);
  }

  function kaydet() {
    setMesaj(firmaKaydet(f) ? "Kaydedildi. PDF ve Excel raporlarında kullanılacak." : "Tarayıcı depolaması kullanılamıyor; kaydedilemedi.");
  }

  function temizle() {
    setF(BOS_FIRMA);
    setMesaj(firmaKaydet(BOS_FIRMA) ? "Firma bilgileri silindi." : "Silinemedi.");
  }

  return (
    <div className="mx-auto w-full max-w-[640px] px-6 py-8">
      <h1 className="text-2xl font-bold tracking-tight text-text-primary">Ayarlar</h1>
      <p className="mt-2 text-sm text-text-secondary">
        Firma bilgileriniz PDF çıktısının başında (antet) ve Excel raporlarının ilk satırlarında yer alır. Bilgiler
        yalnız bu cihazda saklanır, sunucuya gönderilmez.
      </p>

      <div className="mt-6 space-y-4">
        {ALANLAR.map((a) => (
          <label key={a.anahtar} className="block text-sm text-text-secondary">
            {a.etiket}
            <input
              value={f[a.anahtar]}
              onChange={(e) => setF((o) => ({ ...o, [a.anahtar]: e.target.value }))}
              maxLength={200}
              className="mt-1 w-full border border-border bg-surface px-3 py-2 text-text-primary"
            />
          </label>
        ))}

        <div className="text-sm text-text-secondary">
          Logo (PNG/JPG/SVG, en fazla {LOGO_AZAMI_BAYT / 1000} KB)
          <div className="mt-1 flex items-center gap-3">
            <input type="file" accept="image/*" onChange={(e) => logoSec(e.target.files?.[0])} className="text-xs" />
            {f.logo && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.logo} alt="Logo önizleme" className="h-10 w-auto max-w-[120px] border border-border bg-white object-contain p-1" />
                <button type="button" onClick={() => setF((o) => ({ ...o, logo: "" }))} className="text-xs underline">
                  Logoyu kaldır
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button type="button" onClick={kaydet} className="bg-accent px-4 py-2 text-sm font-semibold text-black">
          Kaydet
        </button>
        <button type="button" onClick={temizle} className="border border-border px-4 py-2 text-sm text-text-secondary">
          Tümünü sil
        </button>
      </div>
      {mesaj && (
        <p role="status" className="mt-3 text-sm text-text-secondary">
          {mesaj}
        </p>
      )}
    </div>
  );
}
