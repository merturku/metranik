"use client";

import { koruyucuCihazAzamiKabloBoyu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KorumaCihaziAzamiKabloBoyuPage() {
  return (
    <CalcPage
      module={koruyucuCihazAzamiKabloBoyu}
      standardsLabel={'IEC 60364-4-41, IEC 60364-6'}
      description={"TN sistemde MCB'nin manyetik açma akımının sağlanması için izin verilen en uzun kablo boyunu hesaplar."}
      formula={'Lmaks = 0,8·U0·S / (ρθ·(1+m)·Ia);  Ia = k·In (B 5, C 10, D 20);  m = S_faz/S_pe'}
      engineeringNote={"Reaktans ve kaynak empedansı ihmal edilir, 0,8 katsayısı kaynak payıdır; büyük kesitlerde (>95 mm²) reaktans önemlidir. Kesin doğrulama saha Zs ölçümü ile yapılmalı; ρ20 ve sıcaklık katsayıları IEC 60228'e göredir, standart tablosundan teyit edin."}
      fields={[
        { key: "U0_V", label: "Faz–Toprak Gerilimi U0 (V)", type: "number", step: 1, min: 50 },
        { key: "fazKesiti_mm2", label: "Faz İletken Kesiti (mm²)", type: "number", step: 0.5, min: 0.5 },
        { key: "pe_Kesiti_mm2", label: "PE İletken Kesiti (mm²)", type: "number", step: 0.5, min: 0.5 },
        { key: "anmaAkimi_A", label: "Anma Akımı In (A)", type: "number", step: 1, min: 1 },
        { key: "egri", label: "Açma Eğrisi", type: "select", options: [{ value: "B", label: "B (5·In)" }, { value: "C", label: "C (10·In)" }, { value: "D", label: "D (20·In)" }] },
        { key: "iletkenMalzemesi", label: "İletken", type: "select", options: [{ value: "bakir", label: "Bakır" }, { value: "aluminyum", label: "Alüminyum" }] },
        { key: "hataSicakligi_C", label: "Hata Anı İletken Sıcaklığı (°C)", type: "number", step: 5, min: 20 },
        { key: "gerceklKabloBoyu_m", label: "Gerçek Kablo Boyu (m)", type: "number", step: 5, min: 0 },
      ]}
      defaults={{ U0_V: 230, fazKesiti_mm2: 2.5, pe_Kesiti_mm2: 2.5, anmaAkimi_A: 16, egri: "B", iletkenMalzemesi: "bakir", hataSicakligi_C: 70, gerceklKabloBoyu_m: 100 }}
      mainUnit={'m'}
      mainValueKey={'azamiKabloBoyu_m'}
      mainDecimals={1}
      intermediateLabels={{
        Ia_A: "Açma Akımı Ia (A)",
        iletken_ozdirenci_ohm_mm2_m: "ρθ (Ω·mm²/m)",
        m_faz_pe_orani: "m = Sfaz/Spe",
        kullanim_orani: "Gerçek / Azami Boy",
      }}
    />
  );
}
