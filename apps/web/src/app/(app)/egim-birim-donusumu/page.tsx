"use client";

import { egimBirimDonusumu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EgimBirimDonusumuPage() {
  return (
    <CalcPage
      module={egimBirimDonusumu}
      standardsLabel="Trigonometrik bağıntı"
      description="Eğimi derece, yüzde ve 1:n oranı arasında çevirir; rampa, çatı ve drenaj eğimlerinde kullanılır."
      formula="s(%) = 100·tan α;  1:n → n = 1/tan α"
      engineeringNote="Yüzde 100 eğim 45°'dir. 1:12 rampa ≈ %8,33 ≈ 4,76°'dir. Rampa Eğim Kontrolü modülü erişilebilirlik eşiğini değerlendirir; bu modül yalnız birim dönüşümüdür. Derece için 90°'nin altında değer girin."
      fields={[
        { key: "birim", label: "Girdi Birimi", type: "select", options: [{ value: "derece", label: "Derece (°)" }, { value: "yuzde", label: "Yüzde (%)" }, { value: "oran", label: "Oran 1:n (n değeri)" }] },
        { key: "deger", label: "Değer", type: "number", step: 0.5, min: 0.001 },
      ]}
      defaults={{ birim: "derece", deger: 30 }}
      mainUnit="%"
      mainValueKey="egimYuzdesi"
      mainDecimals={2}
      intermediateLabels={{
        egim_derece: "Eğim (°)",
        egim_orani_1_n: "Oran 1:n (n)",
        egim_mm_per_m: "Eğim (mm/m)",
      }}
    />
  );
}
