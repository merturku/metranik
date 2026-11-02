"use client";

import { armaturYerlesimAraligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ArmaturYerlesimAraligiPage() {
  return (
    <CalcPage
      module={armaturYerlesimAraligi}
      standardsLabel="TS EN 12464-1 (aydınlık düzgünlüğü) / üretici SHR değeri"
      description="Oda boyutları ve montaj yüksekliğinden armatür sıra sayısını, gerçek aralıkları ve duvara mesafeyi hesaplar; lüks yöntemi adediyle karşılaştırıp büyüğünü verir."
      formula="s_maks = SHR·h_m;   n = ⌈boyut/s_maks⌉;   s = boyut/n;   duvar mesafesi ≈ s/2"
      engineeringNote="SHR (azami aralık/montaj yüksekliği) armatür fotometrik verisindedir (tipik 1,0–1,5). h_m, armatür ile çalışma düzlemi arasındaki yüksekliktir. Lüks yönteminden gelen adedi (Aydınlatma Lüks Yöntemi modülü) 0 girerek geometrik ihtiyacı görebilirsiniz. Gölge, mobilya ve görev bölgesi aydınlatması ayrıca değerlendirilmelidir."
      fields={[
        { key: "odaUzunlugu_m", label: "Oda Uzunluğu (m)", type: "number", min: 1, step: 0.5 },
        { key: "odaGenisligi_m", label: "Oda Genişliği (m)", type: "number", min: 1, step: 0.5 },
        { key: "montajYuksekligi_m", label: "Armatür – Çalışma Düzlemi Yüksekliği (m)", type: "number", min: 0.5, step: 0.1 },
        { key: "shr", label: "Azami Aralık/Yükseklik Oranı SHR", type: "number", min: 0.5, step: 0.05 },
        { key: "gerekliArmaturSayisi", label: "Lüks Yöntemi Armatür Adedi (yoksa 0)", type: "number", min: 0, step: 1 },
      ]}
      defaults={{ odaUzunlugu_m: 10, odaGenisligi_m: 6, montajYuksekligi_m: 2.5, shr: 1.25, gerekliArmaturSayisi: 6 }}
      mainUnit="adet (armatür)"
      mainValueKey="armaturSayisi"
      mainDecimals={0}
      intermediateLabels={{
        azami_aralik_m: "Azami Aralık (m)",
        sira_sayisi_uzunluk: "Uzunlukta Sıra Sayısı",
        sira_sayisi_genislik: "Genişlikte Sıra Sayısı",
        geometrik_adet: "Geometrik Adet",
        gercek_aralik_uzunluk_m: "Gerçek Aralık — Uzunluk (m)",
        gercek_aralik_genislik_m: "Gerçek Aralık — Genişlik (m)",
        duvar_mesafesi_m: "Duvara Mesafe (m)",
        belirleyici: "Belirleyici Kriter",
      }}
    />
  );
}
