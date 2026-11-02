"use client";

import { farkBasincliDebimetre } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function FarkBasincliDebimetrePage() {
  return (
    <CalcPage
      module={farkBasincliDebimetre}
      standardsLabel="ISO 5167-1 — Fark basınçlı debi ölçerler"
      description="Orifis, nozul veya venturi üzerinde ölçülen fark basınçtan sıkıştırılamaz akışkanın debisini hesaplar."
      formula="qm = C/√(1−β⁴) · (π/4)·d² · √(2·Δp·ρ),   β = d/D"
      engineeringNote="C boşaltım katsayısı cihaz tipi, β ve Reynolds sayısına bağlıdır (ISO 5167-2'deki Reader-Harris/Gallagher denklemi); keskin kenarlı orifis için yaklaşık 0,60–0,62 alınabilir, kesin değer için standarttaki denklemi veya cihaz sertifikasını kullanın. Gazlarda genleşme faktörü ε gerekir — bu modül yalnız sıvı (sıkıştırılamaz) içindir. β = 0,10–0,75 aralığı geçerlidir."
      fields={[
        { key: "boruIcCapi_mm", label: "Boru İç Çapı D (mm)", type: "number", min: 1, step: 5 },
        { key: "daralmaCapi_mm", label: "Daralma (Orifis/Boğaz) Çapı d (mm)", type: "number", min: 1, step: 5 },
        { key: "farkBasinc_Pa", label: "Fark Basınç Δp (Pa)", type: "number", min: 1, step: 500 },
        { key: "yogunluk_kgm3", label: "Akışkan Yoğunluğu ρ (kg/m³)", type: "number", min: 1, step: 10 },
        { key: "boşaltimKatsayisi", label: "Boşaltım Katsayısı C", type: "number", min: 0.1, step: 0.01 },
      ]}
      defaults={{ boruIcCapi_mm: 100, daralmaCapi_mm: 50, farkBasinc_Pa: 10000, yogunluk_kgm3: 1000, boşaltimKatsayisi: 0.6 }}
      mainUnit="m³/h (hacimsel debi)"
      mainValueKey="debi_m3h"
      mainDecimals={2}
      intermediateLabels={{
        beta: "β = d/D",
        yaklasma_hizi_faktoru_E: "Yaklaşma Hızı Faktörü 1/√(1−β⁴)",
        kutlesel_debi_kgs: "Kütlesel Debi (kg/s)",
        hacimsel_debi_ls: "Hacimsel Debi (L/s)",
        daralma_hizi_ms: "Daralma Hızı (m/s)",
      }}
    />
  );
}
