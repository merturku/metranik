"use client";

import { kesmeKuvvetiKapasitesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KesmeKuvvetiKapasitesiPage() {
  return (
    <CalcPage
      module={kesmeKuvvetiKapasitesi}
      standardsLabel="TS 500"
      description="Kesit boyutlarına ve beton dayanımına göre betonun donatısız kesme kuvveti kapasitesini hesaplar."
      formula="Vc = 0.35 × √fck × bw × d"
      engineeringNote="Bu basitleştirilmiş hesap donatısız beton katkısını verir; kesme donatısı (etriye) katkısı ayrıca hesaplanmalıdır."
      fields={[
        {
          key: "betonKarakteristikDayanim_fck_MPa",
          label: "Beton Karakteristik Dayanımı fck (MPa)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "kesitGenisligi_bw_mm",
          label: "Kesit Genişliği bw (mm)",
          type: "number",
          min: 50,
          step: 10,
        },
        {
          key: "faydaliYukseklik_d_mm",
          label: "Faydalı Yükseklik d (mm)",
          type: "number",
          min: 50,
          step: 10,
        },
      ]}
      defaults={{
        betonKarakteristikDayanim_fck_MPa: 25,
        kesitGenisligi_bw_mm: 300,
        faydaliYukseklik_d_mm: 450,
      }}
      mainUnit="kN"
      mainValueKey="kesmeKapasitesi_kN"
      intermediateLabels={{ kesmeKapasitesi_N: "Kesme Kapasitesi (N)" }}
    />
  );
}
