"use client";

import { havalandirmaIsiKaybi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HavalandirmaIsiKaybiPage() {
  return (
    <CalcPage
      module={havalandirmaIsiKaybi}
      standardsLabel="TS 825"
      description="Hava değişim sayısı, hacim ve iç-dış sıcaklık farkından, havalandırma/infiltrasyon yoluyla oluşan ısı kaybını hesaplar. Bina zarfından iletim kaybını (Pencere/Duvar Isı Kaybı) tamamlayan ayrı bileşendir."
      formula="Q = (ρ×cp/3600)×n×V×ΔT ≈ 0.335×n×V×ΔT"
      engineeringNote="ρ×cp/3600 ≈ 0.335 W/m³K havanın hacimsel ısı kapasitesinden gelir (ρ≈1.2 kg/m³, cp≈1005 J/kgK). Isıtma yükü hesabının TS 825 metodolojisindeki havalandırma bileşenine karşılık gelir."
      fields={[
        {
          key: "havaDegisimSayisi_n_1h",
          label: "Hava Değişim Sayısı n (1/h)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "hacim_V_m3",
          label: "Hacim V (m³)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "sicaklikFarki_dT_C",
          label: "Sıcaklık Farkı ΔT (°C)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{
        havaDegisimSayisi_n_1h: 0.5,
        hacim_V_m3: 200,
        sicaklikFarki_dT_C: 20,
      }}
      mainUnit="W"
      mainValueKey="isiKaybi_W"
      mainDecimals={0}
      intermediateLabels={{
        havaHacimselIsiKatsayisi_Wm3K: "Hava Hacimsel Isı Katsayısı (W/m³K)",
      }}
    />
  );
}
