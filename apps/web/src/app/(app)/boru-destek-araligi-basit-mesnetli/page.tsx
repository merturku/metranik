"use client";

import { boruDestekAraligiBasitMesnetli } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BoruDestekAraligiBasitMesnetliPage() {
  return (
    <CalcPage
      module={boruDestekAraligiBasitMesnetli}
      standardsLabel="Klasik Kiriş Teorisi"
      description="İzin verilen gerilme, kesit modülü ve birim uzunluk yükünden, basit mesnetli (iki nokta destekli) bir boru hattı için maksimum destek aralığını hesaplar."
      formula="L = √(8σS/w)"
      engineeringNote="Basit mesnetli düz hatta düzgün yayılı yük altında maksimum moment M=wL²/8 oluşur. Konsol Boru Destek Aralığı Kontrolü modülü ankastre (tek uçtan sabit) durumu kapsar; bu modül daha yaygın olan iki nokta destekli düz hat durumunu kapsar."
      fields={[
        {
          key: "izinVerilenGerilme_sigma_MPa",
          label: "İzin Verilen Gerilme σ (MPa)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "kesitModulu_S_mm3",
          label: "Kesit Modülü S (mm³)",
          type: "number",
          min: 1,
          step: 1000,
        },
        {
          key: "birimUzunlukYuku_w_Nmm",
          label: "Birim Uzunluk Yükü w (N/mm)",
          type: "number",
          min: 0.1,
          step: 1,
        },
      ]}
      defaults={{
        izinVerilenGerilme_sigma_MPa: 140,
        kesitModulu_S_mm3: 20000,
        birimUzunlukYuku_w_Nmm: 20,
      }}
      mainUnit="m"
      mainValueKey="maksimumAralik_L_m"
      mainDecimals={3}
      intermediateLabels={{
        maksimumAralik_mm: "Maksimum Aralık (mm)",
      }}
    />
  );
}
