"use client";

import { kanalSistemEgrisiBasincDebi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KanalSistemEgrisiBasincDebiPage() {
  return (
    <CalcPage
      module={kanalSistemEgrisiBasincDebi}
      standardsLabel="Sistem eğrisi ΔP ∝ Q^n"
      description="Bilinen bir çalışma noktasından debi değiştiğinde kanal/boru sisteminin basınç kaybını ve fan/pompa gücü oranını hesaplar."
      formula="ΔP₂ = ΔP₁·(Q₂/Q₁)^n;  P₂/P₁ = (Q₂/Q₁)^(n+1);  n ≈ 2"
      engineeringNote="n türbülanslı akışta ≈ 2'dir (sürtünme baskınsa 1,8–2,0). Sabit statik yük içeren (açık devre, sabit terimli) sistemlerde bağıntı yalnız dinamik kısım için geçerlidir. Fan Afinite Yasaları modülü devir değişimi içindir; bu modül sistem tarafıdır."
      fields={[
        { key: "referansDebi", label: "Referans Debi Q₁", type: "number", step: 10, min: 0.01 },
        { key: "referansBasincKaybi", label: "Referans Basınç Kaybı ΔP₁", type: "number", step: 1, min: 0.01 },
        { key: "yeniDebi", label: "Yeni Debi Q₂", type: "number", step: 10, min: 0.01 },
        { key: "us_n", label: "Üs n", type: "number", step: 0.05, min: 1 },
      ]}
      defaults={{ referansDebi: 1000, referansBasincKaybi: 200, yeniDebi: 1200, us_n: 2 }}
      mainUnit="(ΔP₁ birimi)"
      mainValueKey="yeniBasincKaybi"
      mainDecimals={1}
      intermediateLabels={{
        debi_orani: "Debi Oranı Q₂/Q₁",
        basinc_orani: "Basınç Oranı",
        guc_orani_P2_P1: "Güç Oranı P₂/P₁",
        direnc_katsayisi_k: "Direnç Katsayısı k",
      }}
    />
  );
}
