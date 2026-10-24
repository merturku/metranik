"use client";

import { zeminKonsolidasyonSuresi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ZeminKonsolidasyonSuresiPage() {
  return (
    <CalcPage
      module={zeminKonsolidasyonSuresi}
      standardsLabel="Terzaghi Konsolidasyon Teorisi"
      description="Zaman faktörü, drenaj yolu uzunluğu ve konsolidasyon katsayısından, hedeflenen konsolidasyon derecesine ulaşmak için gereken süreyi hesaplar."
      formula="t = Tv×H²/cv"
      engineeringNote="H, drenaj yolu uzunluğudur (tek yüzeyden drenajda tabaka kalınlığı, çift yüzeyden drenajda kalınlığın yarısı). Tv, hedeflenen konsolidasyon derecesine (U%) bağlı standart bir katsayıdır (örn. U=%50 için Tv≈0.197, U=%90 için Tv≈0.848). Zemin Konsolidasyon Oturması modülünün verdiği oturma miktarının ne kadar sürede oluşacağını tamamlar."
      fields={[
        {
          key: "zamanFaktoru_Tv",
          label: "Zaman Faktörü Tv",
          type: "number",
          min: 0.01,
          step: 0.01,
        },
        {
          key: "drenajYoluUzunlugu_H_m",
          label: "Drenaj Yolu Uzunluğu H (m)",
          type: "number",
          min: 0.1,
          step: 0.5,
        },
        {
          key: "konsolidasyonKatsayisi_cv_m2yil",
          label: "Konsolidasyon Katsayısı cv (m²/yıl)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
      ]}
      defaults={{
        zamanFaktoru_Tv: 0.848,
        drenajYoluUzunlugu_H_m: 5,
        konsolidasyonKatsayisi_cv_m2yil: 2,
      }}
      mainUnit="yıl"
      mainValueKey="konsolidasyonSuresi_t_yil"
      mainDecimals={2}
      intermediateLabels={{
        drenajYoluUzunluguKaresi_H2_m2: "H² (m²)",
      }}
    />
  );
}
