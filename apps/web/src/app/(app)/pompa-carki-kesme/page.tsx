"use client";

import { pompaCarkiKesme } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PompaCarkiKesmePage() {
  return (
    <CalcPage
      module={pompaCarkiKesme}
      standardsLabel="ISO 9906 / Hydraulic Institute — afinite bağıntıları (çap)"
      description="Pompa çarkı tıraşlandığında (sabit devir) yeni debi, basma yüksekliği ve mil gücünü çap oranına göre hesaplar."
      formula="Q2 = Q1·r;   H2 = H1·r²;   P2 = P1·r³;   r = D2/D1"
      engineeringNote="Bağıntılar yaklaşıktır ve aynı çalışma noktasına karşılık gelen benzer noktaları verir; kesme arttıkça verim düşer. Girdiler, çarkın tıraşlanmadan önceki aynı çalışma noktasına aittir. Üretici genellikle azami kesmeyi sınırlar (%20–25); kesin tıraşlama çapı için üretici eğrisini kullanın. Devir değişimi için Pompa/Fan Devir Düşürme modülüne bakın."
      fields={[
        { key: "orijinalCap_mm", label: "Orijinal Çark Çapı D1 (mm)", type: "number", min: 1, step: 5 },
        { key: "kesilmisCap_mm", label: "Tıraşlanmış Çark Çapı D2 (mm)", type: "number", min: 1, step: 5 },
        { key: "debi_m3h", label: "Mevcut Debi Q1 (m³/h)", type: "number", min: 0.1, step: 5 },
        { key: "basma_mSS", label: "Mevcut Basma Yüksekliği H1 (mSS)", type: "number", min: 0.1, step: 1 },
        { key: "guc_kW", label: "Mevcut Mil Gücü P1 (kW)", type: "number", min: 0.01, step: 0.5 },
      ]}
      defaults={{ orijinalCap_mm: 250, kesilmisCap_mm: 225, debi_m3h: 100, basma_mSS: 30, guc_kW: 15 }}
      mainUnit="m³/h (yeni debi)"
      mainValueKey="debi_m3h"
      mainDecimals={1}
      intermediateLabels={{
        yeni_basma_mSS: "Yeni Basma Yüksekliği (mSS)",
        yeni_guc_kW: "Yeni Mil Gücü (kW)",
        cap_orani: "Çap Oranı r",
        kesme_yuzde: "Çap Kesme (%)",
        guc_azalmasi_yuzde: "Güç Azalması (%)",
      }}
    />
  );
}
