"use client";

import { kirisSehimKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KirisSehimKontroluPage() {
  return (
    <CalcPage
      module={kirisSehimKontrolu}
      standardsLabel="Klasik Kiriş Teorisi"
      description="Basit mesnetli, üniform yayılı yüklü bir kirişte maksimum sehimi hesaplar ve L/250 servis sınırıyla karşılaştırır."
      formula="δ = 5×w×L⁴ / (384×E×I)"
      engineeringNote="L/250 yaygın kullanılan bir servis sınırıdır; esas taşıyıcı yönetmelikte (TS 500/Eurocode 2) eleman tipine göre farklı sınırlar (L/250, L/360 vb.) tanımlanabilir, uygulanacak yönetmelikten teyit edilmelidir."
      fields={[
        { key: "yayiliYuk_w_Nm", label: "Yayılı Yük w (N/m)", type: "number", min: 1, step: 100 },
        { key: "aciklik_L_m", label: "Açıklık L (m)", type: "number", min: 0.5, step: 0.5 },
        {
          key: "elastisiteModulu_E_Pa",
          label: "Elastisite Modülü E (Pa)",
          type: "number",
          min: 1e6,
          step: 1e8,
        },
        {
          key: "ataletMomenti_I_m4",
          label: "Atalet Momenti I (m⁴)",
          type: "number",
          min: 0.00001,
          step: 0.00001,
        },
      ]}
      defaults={{
        yayiliYuk_w_Nm: 10000,
        aciklik_L_m: 6,
        elastisiteModulu_E_Pa: 2.1e10,
        ataletMomenti_I_m4: 0.0008,
      }}
      mainUnit="mm"
      mainValueKey="sehim_mm"
      intermediateLabels={{ sinirSehim_L250_mm: "Servis Sınırı L/250 (mm)" }}
    />
  );
}
