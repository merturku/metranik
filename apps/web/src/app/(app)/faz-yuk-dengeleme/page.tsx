"use client";

import { fazYukDengeleme } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function FazYukDengelemePage() {
  return (
    <CalcPage
      module={fazYukDengeleme}
      standardsLabel={"IEC 60364-3 — yük dengeleme ilkesi"}
      description={"Tek faz yük akımlarını (en çok 8 adet) üç faza, en büyükten başlayarak en az yüklü faza atayarak dağıtır; faz akımlarını, dengesizlik yüzdesini ve nötr akımını hesaplar."}
      formula={"Açgözlü (LPT) atama: yükler büyükten küçüğe, her biri en az toplamlı faza;  Dengesizlik = max|Ii − Ort|/Ort"}
      engineeringNote={"Atama sezgiseldir (en büyük yük önce) ve genellikle çok iyi sonuç verir, fakat global en iyi dağılımı garanti etmez. Yükler eşzamanlı çalışıyor varsayılır; eşzamanlılık faktörünü önceden uygulayın. Nötr akımı, faz açıları 120° ve yükler dirençsel (cosφ aynı) varsayımıyla hesaplanır."}
      fields={[
        { key: "y1", label: "Yük 1 (A)", type: "number", step: 1, min: 0 },
        { key: "y2", label: "Yük 2 (A)", type: "number", step: 1, min: 0 },
        { key: "y3", label: "Yük 3 (A)", type: "number", step: 1, min: 0 },
        { key: "y4", label: "Yük 4 (A)", type: "number", step: 1, min: 0 },
        { key: "y5", label: "Yük 5 (A)", type: "number", step: 1, min: 0 },
        { key: "y6", label: "Yük 6 (A)", type: "number", step: 1, min: 0 },
        { key: "y7", label: "Yük 7 (A, 0 = yok)", type: "number", step: 1, min: 0 },
        { key: "y8", label: "Yük 8 (A, 0 = yok)", type: "number", step: 1, min: 0 },
      ]}
      defaults={{ y1: 30, y2: 25, y3: 20, y4: 15, y5: 10, y6: 5, y7: 0, y8: 0 }}
      mainUnit={"%"}
      mainValueKey={"dengesizlik_pct"}
      mainDecimals={2}
      intermediateLabels={{
        l1_A: "L1 Toplamı (A)",
        l2_A: "L2 Toplamı (A)",
        l3_A: "L3 Toplamı (A)",
        notr_akimi_A: "Nötr Akımı (A)",
        atama: "Atama",
      }}
    />
  );
}
