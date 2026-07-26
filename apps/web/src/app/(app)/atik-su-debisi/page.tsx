"use client";

import { atikSuDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function AtikSuDebisiPage() {
  return (
    <CalcPage
      module={atikSuDebisi}
      standardsLabel="EN 12056-2"
      description="Tesisat elemanlarının toplam deşarj birimine (DU) göre atık su hat debisini hesaplar."
      formula="Q = K × √(ΣDU)"
      engineeringNote="K katsayısı kullanım sıklığına göre değişir: aralıklı kullanım ~0.5, sık kullanım ~0.7, sürekli akış ~1.0 (EN 12056-2)."
      fields={[
        {
          key: "kullanimKatsayisi_K",
          label: "Kullanım Katsayısı K",
          type: "number",
          min: 0.1,
          step: 0.05,
        },
        {
          key: "toplamDesarjBirimi_DU",
          label: "Toplam Deşarj Birimi ΣDU",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{ kullanimKatsayisi_K: 0.5, toplamDesarjBirimi_DU: 20 }}
      mainUnit="L/s"
      mainValueKey="debi_Ls"
      intermediateLabels={{ kullanimKatsayisi_K: "Kullanım Katsayısı (K)" }}
    />
  );
}
