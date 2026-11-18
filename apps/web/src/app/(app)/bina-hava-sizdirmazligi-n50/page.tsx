"use client";

import { binaHavaSizdirmazligiN50 } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BinaHavaSizdirmazligiN50Page() {
  return (
    <CalcPage
      module={binaHavaSizdirmazligiN50}
      standardsLabel={"TS EN ISO 9972"}
      description={"Blower door (fan basınçlandırma) testinde 50 Pa'da ölçülen hava debisinden hava değişim sayısı n50'yi, zarf debisini ve yaklaşık doğal infiltrasyon oranını hesaplar; hedef sınırla karşılaştırır."}
      formula={"n50 = V̇50/V;  q50 = V̇50/Azarf;  ninf ≈ n50/N"}
      engineeringNote={"V̇50, TS EN ISO 9972'ye göre pozitif ve negatif basınç ölçümlerinin ortalamasıdır. n50/N kuralı (LBL, N ≈ 10–30) rüzgâr, bina yüksekliği ve korunmuşluğa bağlı kaba bir tahmindir; ASHRAE Fundamentals Bölüm 16'daki N tablosuyla teyit edin. n50 sınırı ulusal mevzuata/hedefe göre değişir (örn. doğal havalandırmalı binalarda 3 1/h, mekanik havalandırmalıda 1,5 1/h yaygın referanslardır); burada kullanıcı girdisidir."}
      fields={[
        { key: "q50_m3h", label: "50 Pa'daki Hava Debisi V̇50 (m³/h)", type: "number", step: 50, min: 1 },
        { key: "hacim_m3", label: "İç Hacim (m³)", type: "number", step: 10, min: 1 },
        { key: "zarfAlani_m2", label: "Bina Zarfı Alanı (m²)", type: "number", step: 10, min: 1 },
        { key: "korumaKatsayisi", label: "Korunma Katsayısı N (n50/N)", type: "number", step: 1, min: 1 },
        { key: "sinirN50", label: "Hedef Sınır n50 (1/h)", type: "number", step: 0.5, min: 0.1 },
      ]}
      defaults={{ q50_m3h: 1800, hacim_m3: 300, zarfAlani_m2: 350, korumaKatsayisi: 20, sinirN50: 3 }}
      mainUnit={"1/h"}
      mainValueKey={"n50"}
      mainDecimals={2}
      intermediateLabels={{
        zarf_debisi_q50_m3hm2: "Zarf Debisi q50 (m³/h·m²)",
        dogal_infiltrasyon_1h: "Doğal İnfiltrasyon (1/h)",
        infiltrasyon_debisi_m3h: "İnfiltrasyon Debisi (m³/h)",
      }}
    />
  );
}
