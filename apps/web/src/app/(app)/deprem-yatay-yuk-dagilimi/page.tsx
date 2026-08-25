"use client";

import { depremYatayYukDagilimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DepremYatayYukDagilimiPage() {
  return (
    <CalcPage
      module={depremYatayYukDagilimi}
      standardsLabel="TBDY 2018 §4.7"
      description="Taban kesme kuvvetini, katların ağırlık×yükseklik çarpımı oranında katlara dağıtır; en üst kata TBDY'nin öngördüğü ek kuvveti (ΔFN) ekler."
      formula="Fi = (Vt-ΔFN)×(wihi/Σwjhj) [+ ΔFN, en üst kat ise]"
      engineeringNote="ΔFN, en üst kata ayrılan ek kuvvettir (TBDY 2018'de belirli koşullarda uygulanır, örn ΔFN=0.0075×N×Vt); bu modül ΔFN'yi doğrudan girdi olarak alır. Kalan kuvvet (Vt-ΔFN) tüm katlara wi×hi oranında paylaştırılır, ΔFN yalnız en üst kata eklenir."
      fields={[
        {
          key: "tabanKesmeKuvveti_Vt_kN",
          label: "Taban Kesme Kuvveti Vt (kN)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "enUstKatEkKuvveti_DeltaFN_kN",
          label: "En Üst Kat Ek Kuvveti ΔFN (kN)",
          type: "number",
          min: 0,
          step: 5,
        },
        {
          key: "katAgirlikYukseklikCarpimi_wihi_kNm",
          label: "Bu Katın wi×hi Çarpımı (kNm)",
          type: "number",
          min: 1,
          step: 100,
        },
        {
          key: "toplamAgirlikYukseklikCarpimi_kNm",
          label: "Toplam Σ(wj×hj) (kNm)",
          type: "number",
          min: 1,
          step: 100,
        },
        {
          key: "buKatEnUstKatMi",
          label: "Bu Kat En Üst Kat mı?",
          type: "select",
          options: [
            { value: "evet", label: "Evet" },
            { value: "hayir", label: "Hayır" },
          ],
        },
      ]}
      defaults={{
        tabanKesmeKuvveti_Vt_kN: 1000,
        enUstKatEkKuvveti_DeltaFN_kN: 50,
        katAgirlikYukseklikCarpimi_wihi_kNm: 8000,
        toplamAgirlikYukseklikCarpimi_kNm: 40000,
        buKatEnUstKatMi: "evet",
      }}
      mainUnit="kN"
      mainValueKey="katKesmeKuvveti_Fi_kN"
      mainDecimals={1}
      intermediateLabels={{
        kalanKuvvet_kN: "Kalan Kuvvet (kN)",
        katPayOrani: "Kat Pay Oranı",
      }}
    />
  );
}
