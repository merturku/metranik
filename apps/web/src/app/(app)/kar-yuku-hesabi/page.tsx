"use client";

import { karYukuHesabi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KarYukuHesabiPage() {
  return (
    <CalcPage
      module={karYukuHesabi}
      standardsLabel="EN 1991-1-3"
      description="Çatı kar yükünü şekil, maruziyet ve ısıl katsayılarıyla zemin kar yükünden hesaplar."
      formula="S = μ × Ce × Ct × Sk"
      engineeringNote="Zemin kar yükü (Sk) yer/bölgeye göre standart haritasından alınır; bu modülde gömülü değildir."
      fields={[
        { key: "sekilKatsayisi_mu", label: "Şekil Katsayısı (μ)", type: "number", min: 0.1, step: 0.1 },
        {
          key: "maruziyetKatsayisi_Ce",
          label: "Maruziyet Katsayısı (Ce)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        { key: "isilKatsayi_Ct", label: "Isıl Katsayı (Ct)", type: "number", min: 0.1, step: 0.1 },
        {
          key: "zeminKarYuku_Sk_kNm2",
          label: "Zemin Kar Yükü Sk (kN/m²)",
          type: "number",
          min: 0.1,
          step: 0.05,
        },
      ]}
      defaults={{
        sekilKatsayisi_mu: 0.8,
        maruziyetKatsayisi_Ce: 1.0,
        isilKatsayi_Ct: 1.0,
        zeminKarYuku_Sk_kNm2: 0.75,
      }}
      mainUnit="kN/m²"
      mainValueKey="karYuku_kNm2"
      intermediateLabels={{
        sekilKatsayisi_mu: "Şekil Katsayısı (μ)",
        maruziyetKatsayisi_Ce: "Maruziyet Katsayısı (Ce)",
        isilKatsayi_Ct: "Isıl Katsayı (Ct)",
        zeminKarYuku_Sk_kNm2: "Zemin Kar Yükü (kN/m²)",
      }}
    />
  );
}
