"use client";

import { pnomatikSilindirHavaTuketimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PnomatikSilindirHavaTuketimiPage() {
  return (
    <CalcPage
      module={pnomatikSilindirHavaTuketimi}
      standardsLabel={"Boyle yasası (izotermal sıkıştırma)"}
      description={"Silindir çapı, kursu, çevrim sayısı ve çalışma basıncından serbest hava (atmosferik) tüketimini hesaplar."}
      formula={"Vçevrim = A·s·k;  V̇serbest = n·Vçevrim·(pg + patm)/patm"}
      engineeringNote={"k çift etkili silindirde 2 (ileri + geri strok), tek etkili silindirde 1'dir. Piston kolu hacmi geri strokta ihmal edilmiştir (tutucu). Boru ve valf ölü hacimleri hesaba katılmamıştır; gerçek tüketim %10–20 daha yüksek olabilir. Sonuç kompresör seçimi için FAD (serbest hava) değeridir."}
      fields={[
        { key: "piston_mm", label: "Piston Çapı (mm)", type: "number", step: 5, min: 5 },
        { key: "kurs_mm", label: "Kurs (mm)", type: "number", step: 10, min: 1 },
        { key: "devir_dk", label: "Çevrim Sayısı (1/dk)", type: "number", step: 5, min: 0.1 },
        { key: "basinc_barg", label: "Çalışma Basıncı (bar-g)", type: "number", step: 0.5, min: 0.1 },
        { key: "etki", label: "Silindir Tipi", type: "select", options: [{ value: "cift", label: "Çift etkili" }, { value: "tek", label: "Tek etkili" }] },
      ]}
      defaults={{ piston_mm: 63, kurs_mm: 200, devir_dk: 30, basinc_barg: 6, etki: "cift" }}
      mainUnit={"L/dk"}
      mainValueKey={"serbestHava_Ldk"}
      mainDecimals={1}
      intermediateLabels={{
        cevrim_hacmi_L: "Çevrim Hacmi (L)",
        sikistirma_orani: "Sıkıştırma Oranı (pabs/patm)",
        serbest_hava_cevrim_L: "Çevrim Başına Serbest Hava (L)",
      }}
    />
  );
}
