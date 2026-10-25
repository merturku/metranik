"use client";

import { hataCevrimEmpedansiKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HataCevrimEmpedansiKontroluPage() {
  return (
    <CalcPage
      module={hataCevrimEmpedansiKontrolu}
      standardsLabel="IEC 60364-4-41"
      description="TN sistemde bir devrenin ölçülen hata çevrim empedansını (Zs), minyatür devre kesicinin ani açma akımından türetilen azami değerle karşılaştırır; faz-PE kısa devresinde kesicinin süresi içinde açıp açmayacağını kontrol eder."
      formula="Zs × Ia ≤ U0,   Ia = k × In  (B: 5, C: 10, D: 20)"
      engineeringNote="Ölçüm ortam sıcaklığında yapılır; arıza anında iletken ısınıp direnci arttığı için ölçülen Zs, sıcaklık katsayısıyla küçültülmüş sınırla karşılaştırılır (yaygın uygulama 0,8; daha tutucu yaklaşım 2/3). Sınır aşılırsa kesit artırılmalı, daha düşük eğri/anma akımı seçilmeli veya ek koruma olarak RCD kullanılmalıdır. Sigortalı devrelerde Ia sigortanın zaman-akım eğrisinden alınmalıdır."
      fields={[
        { key: "fazNotrGerilimi_U0_V", label: "Faz-Toprak Gerilimi U0 (V)", type: "number", min: 1, step: 10 },
        { key: "kesiciAnmaAkimi_In_A", label: "Kesici Anma Akımı In (A)", type: "number", min: 1, step: 1 },
        {
          key: "acmaEgrisi",
          label: "Açma Eğrisi",
          type: "select",
          options: [
            { value: "B", label: "B (5 × In)" },
            { value: "C", label: "C (10 × In)" },
            { value: "D", label: "D (20 × In)" },
          ],
        },
        { key: "olculenCevrimEmpedansi_Zs_ohm", label: "Ölçülen Çevrim Empedansı Zs (Ω)", type: "number", min: 0.01, step: 0.05 },
        { key: "sicaklikKatsayisi", label: "Sıcaklık Katsayısı", type: "number", min: 0.5, step: 0.05 },
      ]}
      defaults={{
        fazNotrGerilimi_U0_V: 230,
        kesiciAnmaAkimi_In_A: 16,
        acmaEgrisi: "C",
        olculenCevrimEmpedansi_Zs_ohm: 0.9,
        sicaklikKatsayisi: 0.8,
      }}
      mainUnit="Ω (Zs,maks)"
      mainValueKey="maksimumCevrimEmpedansi_ohm"
      mainDecimals={3}
      intermediateLabels={{
        ani_acma_akimi_Ia_A: "Ani Açma Akımı Ia (A)",
        sicaklik_katsayili_sinir_ohm: "Sıcaklık Katsayılı Sınır (Ω)",
        beklenen_ariza_akimi_A: "Beklenen Arıza Akımı U0/Zs (A)",
      }}
    />
  );
}
