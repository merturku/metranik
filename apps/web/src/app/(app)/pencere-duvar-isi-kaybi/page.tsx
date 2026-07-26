"use client";

import { pencereDuvarIsiKaybi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PencereDuvarIsiKaybiPage() {
  return (
    <CalcPage
      module={pencereDuvarIsiKaybi}
      standardsLabel="TS 825"
      description="Isı geçirme katsayısına, yüzey alanına ve sıcaklık farkına göre pencere/duvar üzerinden olan iletim ısı kaybını hesaplar."
      formula="Q = U × A × ΔT"
      engineeringNote="U değeri malzeme/cam tipine göre değişir; TS 825'te bölgeye göre asgari U değeri sınırları tanımlanır."
      fields={[
        {
          key: "isiGecirmeKatsayisi_U_Wm2K",
          label: "Isı Geçirme Katsayısı U (W/m²K)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        { key: "yuzeyAlani_A_m2", label: "Yüzey Alanı A (m²)", type: "number", min: 0.1, step: 0.1 },
        {
          key: "sicaklikFarki_dT_C",
          label: "Sıcaklık Farkı ΔT (°C)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{ isiGecirmeKatsayisi_U_Wm2K: 1.4, yuzeyAlani_A_m2: 2, sicaklikFarki_dT_C: 20 }}
      mainUnit="W"
      mainValueKey="isiKaybi_W"
      intermediateLabels={{ isiGecirmeKatsayisi_U_Wm2K: "Isı Geçirme Katsayısı (U, W/m²K)" }}
    />
  );
}
