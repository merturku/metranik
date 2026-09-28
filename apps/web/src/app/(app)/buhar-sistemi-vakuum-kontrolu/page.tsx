"use client";
import { CalcPage } from "@/components/calc-page";
import { buharSistemiVakuumKontrolu } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={buharSistemiVakuumKontrolu}
      standardsLabel="ASME PTC 12.2, EN 12952"
      description="Kondenserin mutlak basıncından, buhar sisteminde oluşan vakuum kontrolü yapılır."
      formula="Vakuum (kPa) = 101.325 - P_kondenser (kPa abs)"
      engineeringNote="Aşırı vakuum (>95 kPa), kondenser temizlenmesi veya soğutma iyileştirilmesi gerektiğini gösterir."
      fields={[
        { name: "kondenser_basinc_kPa", label: "Kondenser Basıncı (kPa mutlak)", type: "number" },
        { name: "adiabatik_sicaklık_C", label: "Adiabatik (Doyma) Sıcaklığı (°C)", type: "number" },
        { name: "max_izin_vakuum_kPa", label: "Max. İzin Vakuum (kPa)", type: "number" },
      ]}
      defaults={{
        kondenser_basinc_kPa: 10,
        adiabatik_sicaklık_C: 45.8,
        max_izin_vakuum_kPa: 95,
      }}
    />
  );
}
