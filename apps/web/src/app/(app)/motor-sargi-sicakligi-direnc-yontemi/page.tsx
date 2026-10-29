"use client";

import { motorSargiSicakligiDirencYontemi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function MotorSargiSicakligiDirencYontemiPage() {
  return (
    <CalcPage
      module={motorSargiSicakligiDirencYontemi}
      standardsLabel="IEC 60034-1"
      description="Motor sargısının işletme sıcaklığını soğuk ve sıcak direnç ölçümünden bulur, sıcaklık artışını yalıtım sınıfının izin verdiği sınırla karşılaştırır."
      formula="θ2 = (R2/R1)·(k + θ1) − k,   Δθ = θ2 − θa,   k = 234,5 (Cu) / 225 (Al);   sınır: A 60, E 75, B 80, F 105, H 125 K"
      engineeringNote="R1, bilinen soğuk sıcaklıktaki (sargı ortamla dengede, çalışmıyorken) ölçülen dirençtir; R2, motor kapatıldıktan hemen sonra ölçülen sıcak dirençtir. Durdurma ile ölçüm arasında sargı soğuduğundan gerçek sıcaklık biraz daha yüksektir; standart, ölçümü geriye ekstrapole etmeyi önerir. Sınır değerleri IEC 60034-1 Tablo 8'deki direnç yöntemi artışlarıdır ve ortam ≤ 40 °C, rakım ≤ 1000 m içindir; yerel baskıdan ve motor etiketinden teyit edin. 40 °C üstü ortamda veya yüksek rakımda izin verilen artış düşer."
      fields={[
        { key: "soguk_direnc_ohm", label: "Soğuk Direnç R1 (Ω)", type: "number", min: 0.001, step: 0.1 },
        { key: "soguk_sicaklik_C", label: "Soğuk Direncin Ölçüldüğü Sıcaklık θ1 (°C)", type: "number", step: 1 },
        { key: "sicak_direnc_ohm", label: "Sıcak Direnç R2 (Ω)", type: "number", min: 0.001, step: 0.1 },
        { key: "ortam_sicakligi_C", label: "Ortam Sıcaklığı θa (°C)", type: "number", step: 1 },
        {
          key: "iletkenMalzeme",
          label: "Sargı İletkeni",
          type: "select",
          options: [
            { value: "bakir", label: "Bakır (k = 234,5)" },
            { value: "aluminyum", label: "Alüminyum (k = 225)" },
          ],
        },
        {
          key: "yalitimSinifi",
          label: "Yalıtım Sınıfı",
          type: "select",
          options: [
            { value: "A", label: "A (sınır 60 K)" },
            { value: "E", label: "E (sınır 75 K)" },
            { value: "B", label: "B (sınır 80 K)" },
            { value: "F", label: "F (sınır 105 K)" },
            { value: "H", label: "H (sınır 125 K)" },
          ],
        },
      ]}
      defaults={{
        soguk_direnc_ohm: 10,
        soguk_sicaklik_C: 20,
        sicak_direnc_ohm: 12.5,
        ortam_sicakligi_C: 25,
        iletkenMalzeme: "bakir",
        yalitimSinifi: "B",
      }}
      mainUnit="°C (sargı sıcaklığı)"
      mainValueKey="sargiSicakligi_C"
      mainDecimals={1}
      intermediateLabels={{
        direnc_orani_R2_R1: "Direnç Oranı R2/R1",
        sicaklik_artisi_K: "Sıcaklık Artışı Δθ (K)",
        sinif_siniri_K: "Sınıf Sınırı (K)",
        k_sabiti: "k Sabiti",
        ortam_notu: "Ortam Notu",
      }}
    />
  );
}
