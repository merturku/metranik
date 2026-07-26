"use client";

import { konsolKirisSehimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KonsolKirisSehimiPage() {
  return (
    <CalcPage
      module={konsolKirisSehimi}
      standardsLabel="Klasik Kiriş Teorisi"
      description="Ankastre (konsol) bir kirişte üniform yayılı yükle uçtaki maksimum sehimi hesaplar ve yaygın L/180 servis sınırıyla karşılaştırır."
      formula="δ = w×L⁴ / (8×E×I)"
      engineeringNote="Konsol elemanlar basit mesnetli kirişlere göre daha esnek davrandığından servis sınırı genelde daha sıkı tutulur (yaygın pratikte L/180); esas taşıyıcı yönetmelikten (TS 500/Eurocode 2) teyit edilmelidir."
      fields={[
        { key: "yayiliYuk_w_Nm", label: "Yayılı Yük w (N/m)", type: "number", min: 1, step: 100 },
        { key: "aciklik_L_m", label: "Konsol Açıklığı L (m)", type: "number", min: 0.2, step: 0.1 },
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
        yayiliYuk_w_Nm: 5000,
        aciklik_L_m: 2,
        elastisiteModulu_E_Pa: 2.1e10,
        ataletMomenti_I_m4: 0.0004,
      }}
      mainUnit="mm"
      mainValueKey="sehim_mm"
      intermediateLabels={{ sinirSehim_L180_mm: "Servis Sınırı L/180 (mm)" }}
    />
  );
}
