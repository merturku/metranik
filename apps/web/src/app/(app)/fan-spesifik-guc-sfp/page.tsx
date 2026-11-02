"use client";

import { fanSpesifikGucSfp } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function FanSpesifikGucSfpPage() {
  return (
    <CalcPage
      module={fanSpesifikGucSfp}
      standardsLabel="EN 13779:2007 — Spesifik Fan Gücü (SFP) sınıfları"
      description="Fanın elektrik giriş gücünü hava debisine bölerek spesifik fan gücünü (SFP) bulur ve seçilen hedef sınıfla karşılaştırır."
      formula="SFP = P_elektrik / q   [W/(m³/s)]   —   SFP1 < 500, SFP2 ≤ 750, SFP3 ≤ 1250, SFP4 ≤ 2000"
      engineeringNote="P, fan + motor + sürücü dahil şebekeden çekilen elektrik gücüdür (mil gücü değil). Sınıf sınırları EN 13779:2007 Tablo 18'dendir; bu standardın yerini EN 16798-3 almıştır ve ulusal mevzuat farklı sınır isteyebilir — yerel baskıdan teyit edin. Mil gücü için Fan Mil Gücü modülüne bakın."
      fields={[
        { key: "elektrikGucu_W", label: "Fan Elektrik Giriş Gücü (W)", type: "number", min: 1, step: 100 },
        { key: "debi_m3h", label: "Hava Debisi (m³/h)", type: "number", min: 1, step: 100 },
        { key: "hedefSinif", label: "Hedef SFP Sınıfı (1–4)", type: "number", min: 1, step: 1 },
      ]}
      defaults={{ elektrikGucu_W: 3000, debi_m3h: 7200, hedefSinif: 4 }}
      mainUnit="W/(m³/s) (SFP)"
      mainValueKey="sfp_Wm3s"
      mainDecimals={0}
      intermediateLabels={{
        debi_m3s: "Debi (m³/s)",
        sfp_kWm3s: "SFP (kW/(m³/s))",
        sfp_sinifi: "Ulaşılan Sınıf",
        hedef_sinir_Wm3s: "Hedef Sınıf Üst Sınırı (W/(m³/s))",
      }}
    />
  );
}
