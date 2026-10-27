"use client";

import { yanginSuyuDeposuHacmi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YanginSuyuDeposuHacmiPage() {
  return (
    <CalcPage
      module={yanginSuyuDeposuHacmi}
      standardsLabel="TS EN 12845 · NFPA 13 — yoğunluk/alan yöntemi"
      description="Tehlike sınıfının tasarım yoğunluğu ve tasarım alanından çalışan sprinkler sayısını, sprinkler başına asgari debi ve basıncı, sprinkler + hortum (yangın dolabı/hidrant) toplam debisini ve çalışma süresi boyunca gereken yangın suyu deposu hacmini hesaplar."
      formula="n = ⌈A/As⌉,   q = max(D·As; K·√Pmin),   P = (q/K)²,   Q = n·q + Qhortum,   V = Q·t"
      engineeringNote="Yoğunluk, tasarım alanı ve süre tehlike sınıfına göre standart tablosundan alınır — örn. TS EN 12845: Hafif Tehlike 2,25 mm/dk · 84 m² · 30 dk; OH1/OH2/OH3/OH4 5 mm/dk · 72/144/216/360 m² · 60 dk; NFPA 13 eğrisinde OH2 0,20 gpm/ft² · 1500 ft². Asgari sprinkler basıncı TS EN 12845'te OH için 0,35 bar, LH için 0,70 bar; NFPA 13'te 7 psi (0,48 bar). Hortum/dolap payı ve süreler kullanılan standarda ve Binaların Yangından Korunması Hakkında Yönetmelik'e göre belirlenir; değerleri yürürlükteki baskıdan teyit edin. Bu modül teorik asgari debiyi verir: hidrolik hesapta en uzak sprinkler asgari basınçta, pompaya yakın olanlar daha yüksek basınçta çalıştığından gerçek debi bu teorik asgariden büyüktür — depo hacmini hidrolik hesap sonucuyla güncelleyin."
      fields={[
        { key: "tasarimYogunlugu_mm_dk", label: "Tasarım Yoğunluğu D (mm/dk = L/dk·m²)", type: "number", min: 0.5, step: 0.25 },
        { key: "tasarimAlani_m2", label: "Tasarım (Çalışma) Alanı A (m²)", type: "number", min: 1, step: 12 },
        { key: "sprinklerKorumaAlani_m2", label: "Sprinkler Başına Koruma Alanı As (m²)", type: "number", min: 1, step: 0.5 },
        { key: "kFaktoru_Ldk_bar05", label: "K Faktörü (L/dk·bar^0,5)", type: "number", min: 10, step: 1 },
        { key: "asgariSprinklerBasinci_bar", label: "Asgari Sprinkler Basıncı Pmin (bar)", type: "number", min: 0.1, step: 0.05 },
        { key: "hortumDebisi_Ldk", label: "Hortum / Yangın Dolabı Payı (L/dk)", type: "number", min: 0, step: 50 },
        { key: "calismaSuresi_dk", label: "Çalışma Süresi t (dk)", type: "number", min: 10, step: 10 },
      ]}
      defaults={{
        tasarimYogunlugu_mm_dk: 5,
        tasarimAlani_m2: 216,
        sprinklerKorumaAlani_m2: 12,
        kFaktoru_Ldk_bar05: 80,
        asgariSprinklerBasinci_bar: 0.35,
        hortumDebisi_Ldk: 0,
        calismaSuresi_dk: 60,
      }}
      mainUnit="m³ (yangın suyu deposu)"
      mainValueKey="depoHacmi_m3"
      mainDecimals={1}
      intermediateLabels={{
        calisan_sprinkler_sayisi: "Çalışan Sprinkler Sayısı",
        yogunluk_alan_debisi_DxA_Ldk: "Yoğunluk × Alan Debisi (L/dk)",
        sprinkler_basina_debi_Ldk: "Sprinkler Başına Debi (L/dk)",
        sprinkler_basinci_bar: "Sprinkler Basıncı (bar)",
        belirleyici: "Belirleyici Koşul",
        sprinkler_toplam_debisi_Ldk: "Sprinkler Toplam Debisi (L/dk)",
        toplam_debi_Ldk: "Toplam Debi (L/dk)",
        toplam_debi_m3h: "Toplam Debi (m³/h)",
      }}
    />
  );
}
