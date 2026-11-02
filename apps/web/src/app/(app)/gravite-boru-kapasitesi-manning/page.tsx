"use client";

import { graviteBoruKapasitesiManning } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function GraviteBoruKapasitesiManningPage() {
  return (
    <CalcPage
      module={graviteBoruKapasitesiManning}
      standardsLabel="Manning denklemi — EN 752 gravite drenaj tasarım pratiği"
      description="Gravite atık su/yağmur suyu borusunun dolu kesit kapasitesini ve hızını Manning denklemiyle hesaplar, tasarım debisiyle doluluk oranını kontrol eder."
      formula="Q = (1/n)·A·R^(2/3)·S^(1/2);   dolu boruda A = πD²/4,  R = D/4"
      engineeringNote="n pürüzlülük katsayısı: PVC/PE ≈ 0,010–0,011, beton ≈ 0,013, pik döküm ≈ 0,012. Tasarım debisi genelde dolu kapasitenin %75'i içinde tutulur (kısmi dolulukta ters yönden giden hava akışı ve hız kontrolü için). Minimum öz-temizleme hızı (≈ 0,7 m/s) ve maksimum hız sınırları yerel şartnameden teyit edilmelidir. Debiyi Atık Su Debisi (EN 12056-2) modülü verir."
      fields={[
        { key: "icCap_mm", label: "Boru İç Çapı (mm)", type: "number", min: 20, step: 10 },
        { key: "egim_yuzde", label: "Eğim (%)", type: "number", min: 0.1, step: 0.1 },
        { key: "puruzluluk_n", label: "Manning Pürüzlülük n", type: "number", min: 0.008, step: 0.001 },
        { key: "tasarimDebisi_Ls", label: "Tasarım Debisi (L/s)", type: "number", min: 0, step: 1 },
      ]}
      defaults={{ icCap_mm: 200, egim_yuzde: 1, puruzluluk_n: 0.013, tasarimDebisi_Ls: 20 }}
      mainUnit="L/s (dolu kesit kapasitesi)"
      mainValueKey="doluKapasite_Ls"
      mainDecimals={1}
      intermediateLabels={{
        dolu_hiz_ms: "Dolu Kesit Hızı (m/s)",
        hidrolik_yaricap_m: "Hidrolik Yarıçap (m)",
        doluluk_orani_Q_Qdolu: "Q / Q_dolu",
        kesit_alani_m2: "Kesit Alanı (m²)",
      }}
    />
  );
}
