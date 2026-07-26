"use client";

import { topraklamaIletkeniKesiti } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TopraklamaIletkeniKesitiPage() {
  return (
    <CalcPage
      module={topraklamaIletkeniKesiti}
      standardsLabel="IEC 60364-5-54"
      description="Hata akımına ve koruma cihazının kesme süresine göre gerekli topraklama/koruma iletkeni kesitini adyabatik formülle hesaplar."
      formula="S = I × √t / k"
      engineeringNote="k katsayısı iletken ve izolasyon malzemesine göre değişir (bakır+PVC için tipik 143, IEC 60364-5-54 Tablo 54.2)."
      fields={[
        { key: "hataAkimi_I_A", label: "Hata Akımı I (A)", type: "number", min: 1, step: 10 },
        {
          key: "kesmeSuresi_t_s",
          label: "Kesme Süresi t (s)",
          type: "number",
          min: 0.01,
          step: 0.01,
        },
        {
          key: "malzemeKatsayisi_k",
          label: "Malzeme Katsayısı k",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{ hataAkimi_I_A: 1000, kesmeSuresi_t_s: 0.5, malzemeKatsayisi_k: 143 }}
      mainUnit="mm²"
      mainValueKey="gerekliKesit_mm2"
      intermediateLabels={{ malzemeKatsayisi_k: "Malzeme Katsayısı (k)" }}
    />
  );
}
