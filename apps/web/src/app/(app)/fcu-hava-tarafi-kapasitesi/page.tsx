"use client";

import { fcuHavaTarafiKapasitesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function FcuHavaTarafiKapasitesiPage() {
  return (
    <CalcPage
      module={fcuHavaTarafiKapasitesi}
      standardsLabel="Fiziksel Formül"
      description="Hava debisine ve sıcaklık farkına göre fan coil ünitesinin hava tarafı ısıtma/soğutma kapasitesini hesaplar."
      formula="Q = ρ × V × cp × ΔT"
      engineeringNote="Bu hesap kuru (duyulur) kapasiteyi verir; soğutmada nem alma (gizli ısı) bileşeni ayrıca hesaplanmalıdır (bkz. Klima Gizli Isı Yükü modülü)."
      fields={[
        {
          key: "havaDebisi_V_m3h",
          label: "Hava Debisi V (m³/h)",
          type: "number",
          min: 10,
          step: 10,
        },
        {
          key: "sicaklikFarki_dT_C",
          label: "Sıcaklık Farkı ΔT (°C)",
          type: "number",
          min: 0.5,
          step: 0.5,
        },
      ]}
      defaults={{ havaDebisi_V_m3h: 500, sicaklikFarki_dT_C: 10 }}
      mainUnit="kW"
      mainValueKey="kapasite_kW"
      intermediateLabels={{ debi_m3s: "Debi (m³/s)" }}
    />
  );
}
