"use client";

import { celikLevhaProfilAgirligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function CelikLevhaProfilAgirligiPage() {
  return (
    <CalcPage
      module={celikLevhaProfilAgirligi}
      standardsLabel="Çelik yoğunluğu 7850 kg/m³"
      description="Çelik levha, yuvarlak ve kare dolu profilin ağırlığını ve birim uzunluk ağırlığını hesaplar."
      formula="m = A·L·7850;  levha A = b·t;  yuvarlak A = πd²/4;  kare A = a²"
      engineeringNote="Levhada boyut 1 genişlik, boyut 2 kalınlıktır; yuvarlak ve karede yalnız boyut 1 (çap/kenar) kullanılır. Kesim/kaynak firesi ve haddeleme toleransı dahil değildir."
      fields={[
        { key: "sekil", label: "Şekil", type: "select", options: [{ value: "levha", label: "Levha (genişlik × kalınlık)" }, { value: "yuvarlak", label: "Yuvarlak dolu (çap)" }, { value: "kare", label: "Kare dolu (kenar)" }] },
        { key: "boyut1_mm", label: "Boyut 1 (mm)", type: "number", step: 1, min: 0.1 },
        { key: "boyut2_mm", label: "Boyut 2 — levha kalınlığı (mm)", type: "number", step: 1, min: 0 },
        { key: "uzunluk_mm", label: "Uzunluk (mm)", type: "number", step: 100, min: 1 },
        { key: "adet", label: "Adet", type: "number", step: 1, min: 1 },
      ]}
      defaults={{ sekil: "levha", boyut1_mm: 1000, boyut2_mm: 10, uzunluk_mm: 2000, adet: 1 }}
      mainUnit="kg"
      mainValueKey="toplamAgirlik_kg"
      mainDecimals={2}
      intermediateLabels={{
        kesit_alani_mm2: "Kesit Alanı (mm²)",
        birim_uzunluk_agirligi_kgm: "Birim Uzunluk Ağırlığı (kg/m)",
        tek_parca_agirligi_kg: "Tek Parça Ağırlığı (kg)",
        toplam_agirlik_ton: "Toplam Ağırlık (ton)",
      }}
    />
  );
}
