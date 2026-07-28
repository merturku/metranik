"use client";

import { konsolBoruDestekAraligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KonsolBoruDestekAraligiPage() {
  return (
    <CalcPage
      module={konsolBoruDestekAraligi}
      standardsLabel="Klasik Kiriş Teorisi"
      description="Duvara konsol (ankastre) montajlı boru destek braketinde, boru ve akışkan ağırlığından doğan eğilme gerilmesini izin verilen gerilmeyle karşılaştırır."
      formula="M = w×L² / 2, σ = M/Wx"
      engineeringNote="Konsol (ankastre) kiriş yaklaşımı kullanılır; izin verilen gerilme braket malzemesine göre (örn. S235 çelik için ilgili yönetmelikten) seçilmelidir."
      fields={[
        { key: "yayiliYuk_w_Nm", label: "Yayılı Yük w (N/m)", type: "number", min: 1, step: 10 },
        {
          key: "konsolUzunlugu_L_m",
          label: "Konsol Uzunluğu L (m)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "kesitModulu_Wx_cm3",
          label: "Kesit Modülü Wx (cm³)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "izinVerilenGerilme_sigma_MPa",
          label: "İzin Verilen Gerilme σ (MPa)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{
        yayiliYuk_w_Nm: 150,
        konsolUzunlugu_L_m: 1.2,
        kesitModulu_Wx_cm3: 5,
        izinVerilenGerilme_sigma_MPa: 140,
      }}
      mainUnit="MPa"
      mainValueKey="gerilme_MPa"
      intermediateLabels={{ maksimumMoment_Nm: "Maksimum Moment (N·m)" }}
    />
  );
}
