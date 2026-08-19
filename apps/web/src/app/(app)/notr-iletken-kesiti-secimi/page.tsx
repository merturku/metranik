"use client";

import { notrIletkenKesitiSecimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function NotrIletkenKesitiSecimiPage() {
  return (
    <CalcPage
      module={notrIletkenKesitiSecimi}
      standardsLabel="IEC 60364-5-52"
      description="Doğrusal olmayan tek fazlı yüklerde (LED sürücü, UPS, bilgisayar vb.) üçüncü harmonik akımlarının nötr iletkende toplanması nedeniyle gerekli nötr akımını ve kesitini hesaplar."
      formula="İnötr = İfaz × Harmonik Çarpanı, Önerilen Nötr Kesiti = Faz Kesiti × Harmonik Çarpanı"
      engineeringNote="Doğrusal yüklerde harmonik çarpanı ~1.0'dır; yüksek 3. harmonik içeriğine sahip yüklerde (özellikle LED aydınlatma, UPS) IEC 60364-5-52 tablosuna göre nötr akımı faz akımını aşabilir, bazı durumlarda nötr iletkeni fazdan daha büyük seçilmelidir."
      fields={[
        {
          key: "fazAkimi_Ifaz_A",
          label: "Faz Akımı İfaz (A)",
          type: "number",
          min: 1,
          step: 5,
        },
        {
          key: "harmonikCarpani",
          label: "Harmonik Çarpanı",
          type: "number",
          min: 0.5,
          step: 0.05,
        },
        {
          key: "fazKesiti_mm2",
          label: "Faz Kesiti (mm²)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{
        fazAkimi_Ifaz_A: 100,
        harmonikCarpani: 1.45,
        fazKesiti_mm2: 35,
      }}
      mainUnit="mm²"
      mainValueKey="onerilenNotrKesiti_mm2"
      intermediateLabels={{ notrAkimi_A: "Nötr Akımı (A)" }}
    />
  );
}
