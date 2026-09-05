"use client";

import { kondensTankiHacmi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KondensTankiHacmiPage() {
  return (
    <CalcPage
      module={kondensTankiHacmi}
      standardsLabel="Bekletme Süresi Yöntemi"
      description="Kondens debisi ve bekletme (retention) süresinden, kondens tankının (receiver) gerekli hacmini hesaplar."
      formula="V = Q×t"
      engineeringNote="Bekletme süresi yöntemi, pompa çevrimlerini dengelemek ve ani debi dalgalanmalarını yutmak için endüstride yaygın kullanılan basit bir tank boyutlandırma pratiğidir. Kondens Debisi modülünün ürettiği debiyi girdi olarak alır."
      fields={[
        {
          key: "kondensDebisi_kgh",
          label: "Kondens Debisi (kg/h)",
          type: "number",
          min: 1,
          step: 50,
        },
        {
          key: "tutmaSuresi_dk",
          label: "Bekletme Süresi (dk)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{
        kondensDebisi_kgh: 1000,
        tutmaSuresi_dk: 5,
      }}
      mainUnit="L"
      mainValueKey="tankHacmi_L"
      mainDecimals={1}
      intermediateLabels={{
        debisi_Ldk: "Debi (L/dk)",
      }}
    />
  );
}
