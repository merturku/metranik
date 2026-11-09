"use client";

import { kabloSarjAkimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KabloSarjAkimiPage() {
  return (
    <CalcPage
      module={kabloSarjAkimi}
      standardsLabel="Ic = ωCU0"
      description="Orta/yüksek gerilim kablosunun kapasitansından faz başına şarj akımını ve üç faz reaktif şarj gücünü hesaplar."
      formula="Ic = 2π·f·C·L·U/√3;  Qc = 2π·f·C·L·U²"
      engineeringNote="C üretici kataloğundan nF/km olarak alınır. Uzun kablolarda şarj akımı yük akımına binerek kablo kapasitesini kısıtlayabilir; şönt reaktör ile dengelenir. Dağıtılmış parametreli (Ferranti) etkisi ihmal edilir."
      fields={[
        { key: "kapasitans_nFkm", label: "Kapasitans (nF/km)", type: "number", step: 10, min: 1 },
        { key: "uzunluk_km", label: "Uzunluk (km)", type: "number", step: 0.5, min: 0.01 },
        { key: "hatGerilimi_kV", label: "Hat Gerilimi (kV)", type: "number", step: 1, min: 0.1 },
        { key: "frekans_Hz", label: "Frekans (Hz)", type: "number", step: 10, min: 1 },
      ]}
      defaults={{ kapasitans_nFkm: 250, uzunluk_km: 10, hatGerilimi_kV: 20, frekans_Hz: 50 }}
      mainUnit="A"
      mainValueKey="sarjAkimi_A"
      mainDecimals={2}
      intermediateLabels={{
        toplam_kapasitans_uF: "Toplam Kapasitans (µF)",
        sarj_gucu_kVAr: "Şarj Gücü (kVAr)",
      }}
    />
  );
}
