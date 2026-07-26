"use client";

import { temizSuDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TemizSuDebisiPage() {
  return (
    <CalcPage
      module={temizSuDebisi}
      standardsLabel="EN 806-3"
      description="Armatürlerin toplam yükleme birimine (LU) göre temiz su hat debisini hesaplar."
      formula="Q = K × √(ΣLU)"
      engineeringNote="K katsayısı kullanım sıklığına göre değişir; her armatürün yükleme birimi (LU) EN 806-3 tablosundan alınır."
      fields={[
        {
          key: "kullanimKatsayisi_K",
          label: "Kullanım Katsayısı K",
          type: "number",
          min: 0.1,
          step: 0.05,
        },
        {
          key: "toplamYuklemeBirimi_LU",
          label: "Toplam Yükleme Birimi ΣLU",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{ kullanimKatsayisi_K: 0.5, toplamYuklemeBirimi_LU: 15 }}
      mainUnit="L/s"
      mainValueKey="debi_Ls"
      intermediateLabels={{ kullanimKatsayisi_K: "Kullanım Katsayısı (K)" }}
    />
  );
}
