"use client";

import { suDeposuHacmiHesabi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SuDeposuHacmiHesabiPage() {
  return (
    <CalcPage
      module={suDeposuHacmiHesabi}
      standardsLabel="Fiziksel Formül"
      description="Kişi sayısına ve yedek gün sayısına göre gerekli su deposu hacmini hesaplar."
      formula="V = Kişi Sayısı × Kişi Başı Günlük Tüketim × Yedek Gün"
      engineeringNote="Kişi başı günlük tüketim tipik olarak 150-200 L/gün alınır; yerel su idaresi verileriyle teyit edin."
      fields={[
        { key: "kisiSayisi", label: "Kişi Sayısı", type: "number", min: 1, step: 1 },
        {
          key: "gunlukKisiBasiTuketim_Lgun",
          label: "Kişi Başı Günlük Tüketim (L/gün)",
          type: "number",
          min: 10,
          step: 10,
        },
        { key: "yedekGunSayisi", label: "Yedek Gün Sayısı", type: "number", min: 0.5, step: 0.5 },
      ]}
      defaults={{ kisiSayisi: 4, gunlukKisiBasiTuketim_Lgun: 150, yedekGunSayisi: 1 }}
      mainUnit="L"
      mainValueKey="gerekliHacim_L"
      intermediateLabels={{ gerekliHacim_m3: "Gerekli Hacim (m³)" }}
    />
  );
}
