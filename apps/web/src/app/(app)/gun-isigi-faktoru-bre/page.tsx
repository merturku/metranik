"use client";

import { gunIsigiFaktoruBre } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function GunIsigiFaktoruBrePage() {
  return (
    <CalcPage
      module={gunIsigiFaktoruBre}
      standardsLabel={"BRE / CIBSE LG10"}
      description={"Pencere cam alanı, cam ışık geçirgenliği, görünen gökyüzü açısı ve oda yüzey yansımalarından odanın ortalama gün ışığı faktörünü (DF, %) hesaplar ve aydınlık düzeyini sınıflandırır."}
      formula={"DF = Aw·T·θ·M / (A·(1 − R²))  [%]"}
      engineeringNote={"BRE ortalama DF formülü gökyüzü ışığına dayanır; karşı bina/ağaç gibi engeller θ açısına yansıtılmalıdır. Çerçeve ve doğrama alanı Aw'dan düşülür. %2 ve %5 sınırları yaygın pratik eşiklerdir (CIBSE LG10 / BS 8206-2); güncel mevzuat (TS EN 17037) hedefleri farklı ölçüt kullanır, yerel gereksinimi teyit edin. Ön tasarım amaçlıdır."}
      fields={[
        { key: "camAlani_m2", label: "Net Cam Alanı Aw (m²)", type: "number", step: 0.5, min: 0.1 },
        { key: "camGecirgenligi", label: "Cam Işık Geçirgenliği T (0–1)", type: "number", step: 0.05, min: 0.05 },
        { key: "gokyuzuAcisi_derece", label: "Görünen Gökyüzü Açısı θ (°)", type: "number", step: 5, min: 1 },
        { key: "bakimFaktoru", label: "Bakım/Kirlenme Faktörü M (0–1)", type: "number", step: 0.05, min: 0.1 },
        { key: "odaToplamYuzeyAlani_m2", label: "Oda Toplam İç Yüzey Alanı A (m²)", type: "number", step: 5, min: 1 },
        { key: "ortalamaYansima", label: "Ortalama Yüzey Yansıması R (0–1)", type: "number", step: 0.05, min: 0 },
      ]}
      defaults={{ camAlani_m2: 2, camGecirgenligi: 0.7, gokyuzuAcisi_derece: 60, bakimFaktoru: 0.9, odaToplamYuzeyAlani_m2: 60, ortalamaYansima: 0.5 }}
      mainUnit={"%"}
      mainValueKey={"gunIsigiFaktoru_yuzde"}
      mainDecimals={2}
      intermediateLabels={{
        yansima_terimi_1_eksi_R2: "1 − R²",
        pencere_zemin_orani: "Cam / Yüzey Alanı Oranı",
      }}
    />
  );
}
