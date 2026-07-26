"use client";

import { kabloKesitiIec60364 } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KabloKesitiPage() {
  return (
    <CalcPage
      module={kabloKesitiIec60364}
      standardsLabel="IEC 60364"
      description="Gerilim düşümü kriterine göre gerekli kablo kesitini hesaplar."
      formula="A = k × ρ × L × I / ΔU (k=2 tek faz, √3 üç faz; ρ=0.0175 Ω·mm²/m)"
      engineeringNote="Yalnız gerilim düşümü kriteri kontrol edilir; akım taşıma kapasitesi (Iz) ayrıca doğrulanmalıdır."
      fields={[
        { key: "akim_A", label: "Akım (A)", type: "number", min: 0.1, step: 0.1 },
        { key: "uzunluk_m", label: "Hat Uzunluğu (m)", type: "number", min: 1, step: 1 },
        {
          key: "izinliGerilimDusumu_V",
          label: "İzinli Gerilim Düşümü (V)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "faz",
          label: "Faz",
          type: "select",
          options: [
            { value: "tek", label: "Tek Faz" },
            { value: "uc", label: "Üç Faz" },
          ],
        },
      ]}
      defaults={{ akim_A: 20, uzunluk_m: 30, izinliGerilimDusumu_V: 5, faz: "tek" }}
      mainUnit="mm²"
      mainValueKey="kesit_mm2"
      intermediateLabels={{
        fazKatsayisi: "Faz Katsayısı",
        bakirOzgulDirenc_ohm_mm2_m: "Bakır Özgül Direnç (Ω·mm²/m)",
      }}
    />
  );
}
