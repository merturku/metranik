"use client";

import { kabloKisaDevreTermikKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KabloKisaDevreTermikKontroluPage() {
  return (
    <CalcPage
      module={kabloKisaDevreTermikKontrolu}
      standardsLabel="IEC 60364-4-43 / IEC 60949"
      description="Kısa devre akımına ve koruma cihazının kesme süresine göre kablonun adyabatik termik dayanımı için gereken minimum kesiti hesaplar ve mevcut kesitle karşılaştırır."
      formula="Smin = I × √t / k"
      engineeringNote="k sabiti iletken ve izolasyon malzemesine bağlıdır (bakır+PVC ≈115, bakır+XLPE ≈143, alüminyum+PVC ≈76); kesin değer IEC 60364-5-54 tablosundan teyit edilmelidir."
      fields={[
        {
          key: "kisaDevreAkimi_I_kA",
          label: "Kısa Devre Akımı I (kA)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "kesmeSuresi_t_s",
          label: "Koruma Cihazı Kesme Süresi t (s)",
          type: "number",
          min: 0.01,
          step: 0.05,
        },
        {
          key: "malzemeSabiti_k",
          label: "Malzeme Sabiti k",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "mevcutKesit_S_mm2",
          label: "Mevcut Kablo Kesiti S (mm²)",
          type: "number",
          min: 0.5,
          step: 0.5,
        },
      ]}
      defaults={{
        kisaDevreAkimi_I_kA: 10,
        kesmeSuresi_t_s: 0.5,
        malzemeSabiti_k: 115,
        mevcutKesit_S_mm2: 70,
      }}
      mainUnit="mm²"
      mainValueKey="gerekliMinKesit_mm2"
      intermediateLabels={{
        mevcutKesit_S_mm2: "Mevcut Kesit (mm²)",
        marj_mm2: "Marj (mm²)",
      }}
    />
  );
}
