"use client";

import { pitotTupuHizDebi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PitotTupuHizDebiPage() {
  return (
    <CalcPage
      module={pitotTupuHizDebi}
      standardsLabel="Bernoulli · ISO 3966"
      description="Pitot tüpünün ölçtüğü dinamik basınçtan hava hızını ve kanal debisini hesaplar."
      formula="v = Cp·√(2Δp/ρ);  ρ = p/(R·T);  Q = v·A"
      engineeringNote="Δp dinamik basınçtır (toplam − statik). Tek nokta merkez hızıdır; ortalama hız için kesitte ağ ölçümü yapın (merkez/ortalama ≈ 0,85–0,9). Mach 0,3'ün (~100 m/s) üstünde sıkıştırılabilirlik düzeltmesi gerekir. Yoğuşma/nem ihmal edilmiştir (kuru hava)."
      fields={[
        { key: "dinamikBasinc_Pa", label: "Dinamik Basınç Δp (Pa)", type: "number", step: 1, min: 0.1 },
        { key: "sicaklik_C", label: "Hava Sıcaklığı (°C)", type: "number", step: 1 },
        { key: "mutlakBasinc_kPa", label: "Mutlak Basınç (kPa)", type: "number", step: 0.1, min: 1 },
        { key: "kesitAlani_m2", label: "Kanal Kesit Alanı (m²)", type: "number", step: 0.01, min: 0.001 },
        { key: "pitotKatsayisi", label: "Pitot Katsayısı Cp", type: "number", step: 0.01, min: 0.9 },
      ]}
      defaults={{ dinamikBasinc_Pa: 100, sicaklik_C: 20, mutlakBasinc_kPa: 101.325, kesitAlani_m2: 0.5, pitotKatsayisi: 1 }}
      mainUnit="m/s"
      mainValueKey="hiz_ms"
      mainDecimals={2}
      intermediateLabels={{
        hava_yogunlugu_kgm3: "Hava Yoğunluğu (kg/m³)",
        debi_m3s: "Debi (m³/s)",
        debi_m3h: "Debi (m³/h)",
        mach_sayisi: "Mach Sayısı",
        uyari: "Uyarı",
      }}
    />
  );
}
