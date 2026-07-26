"use client";

import { kirisBoyutlandirma } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KirisBoyutlandirmaPage() {
  return (
    <CalcPage
      module={kirisBoyutlandirma}
      standardsLabel="TS 500 / TBDY 2018"
      description="Tek donatılı dikdörtgen kesitli kirişin moment taşıma kapasitesini hesaplar."
      formula="a = As·fyd/(0.85·fcd·b), Mu = As·fyd·(d − a/2)"
      engineeringNote="Basınç donatısı ve kesme kuvveti etkisi bu modülde kapsanmaz; sadece tek donatılı eğilme kapasitesi hesaplanır."
      fields={[
        {
          key: "betonKarakteristikDayanim_fck_MPa",
          label: "Beton Karakteristik Dayanımı fck (MPa)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "celikAkmaDayanimi_fyk_MPa",
          label: "Çelik Akma Dayanımı fyk (MPa)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "donatiAlani_As_mm2",
          label: "Donatı Alanı As (mm²)",
          type: "number",
          min: 1,
          step: 10,
        },
        { key: "kirisGenisligi_b_mm", label: "Kiriş Genişliği b (mm)", type: "number", min: 50, step: 10 },
        {
          key: "faydaliYukseklik_d_mm",
          label: "Faydalı Yükseklik d (mm)",
          type: "number",
          min: 50,
          step: 10,
        },
      ]}
      defaults={{
        betonKarakteristikDayanim_fck_MPa: 25,
        celikAkmaDayanimi_fyk_MPa: 420,
        donatiAlani_As_mm2: 1000,
        kirisGenisligi_b_mm: 300,
        faydaliYukseklik_d_mm: 450,
      }}
      mainUnit="kNm"
      mainValueKey="momentKapasitesi_kNm"
      intermediateLabels={{
        basincBlokuYuksekligi_a_mm: "Basınç Bloku Yüksekliği (a, mm)",
        celikHesapDayanimi_fyd_MPa: "Çelik Hesap Dayanımı (fyd, MPa)",
      }}
    />
  );
}
