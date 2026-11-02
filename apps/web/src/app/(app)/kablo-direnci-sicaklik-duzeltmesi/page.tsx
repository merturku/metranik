"use client";

import { kabloDirenciSicaklikDuzeltmesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KabloDirenciSicaklikDuzeltmesiPage() {
  return (
    <CalcPage
      module={kabloDirenciSicaklikDuzeltmesi}
      standardsLabel="IEC 60228 (iletken direnci) / IEC 60287 (sıcaklık katsayısı)"
      description="Bakır veya alüminyum iletkenin 20 °C ve çalışma sıcaklığındaki DC direncini kesit ve uzunluktan hesaplar."
      formula="R20 = ρ20·L/A;   R_T = R20·[1 + α20·(T − 20)]"
      engineeringNote="ρ20: bakır 0,017241, alüminyum 0,028264 Ω·mm²/m; α20: bakır 0,00393, alüminyum 0,00403 1/K. Sonuç DC dirençtir — büyük kesitte deri ve yakınlık etkisiyle AC direnci daha yüksektir (IEC 60287). Gerilim düşümü, kısa devre ve kayıp hesaplarında R girdisi olarak kullanılır; PVC için 70 °C, XLPE için 90 °C yaygın işletme sıcaklığıdır."
      fields={[
        { key: "kesit_mm2", label: "İletken Kesiti (mm²)", type: "number", min: 0.5, step: 0.5 },
        { key: "uzunluk_m", label: "Uzunluk (m)", type: "number", min: 1, step: 10 },
        {
          key: "malzeme",
          label: "İletken Malzeme",
          type: "select",
          options: [
            { value: "bakir", label: "Bakır" },
            { value: "aluminyum", label: "Alüminyum" },
          ],
        },
        { key: "iletkenSicakligi_C", label: "İletken Sıcaklığı (°C)", type: "number", step: 5 },
      ]}
      defaults={{ kesit_mm2: 16, uzunluk_m: 100, malzeme: "bakir", iletkenSicakligi_C: 70 }}
      mainUnit="Ω (T sıcaklığında DC direnç)"
      mainValueKey="direnc_ohm"
      mainDecimals={4}
      intermediateLabels={{
        R20_ohm: "20 °C Direnci (Ω)",
        sicaklik_carpani: "Sıcaklık Çarpanı",
        direnc_ohm_km: "Direnç, T sıcaklığında (Ω/km)",
        R20_ohm_km: "Direnç, 20 °C (Ω/km)",
      }}
    />
  );
}
