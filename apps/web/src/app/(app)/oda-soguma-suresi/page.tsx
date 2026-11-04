"use client";

import { odaSogumaSuresi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function OdaSogumaSuresiPage() {
  return (
    <CalcPage
      module={odaSogumaSuresi}
      standardsLabel="Birinci mertebeden ısıl model"
      description="Isıtma kesildiğinde odanın hedef sıcaklığa düşme süresini ısı kaybı katsayısı ve ısıl kütleden hesaplar."
      formula="τ = C/H;   t = τ·ln((Ti−Te)/(Thedef−Te))"
      engineeringNote="Dış sıcaklık sabit, iç kazanç yok ve tek kapasiteli (homojen) bina kabul edilir; gerçekte ağır duvarlar daha yavaş soğur. Isıl kütle C için ev tipik olarak 10–40 MJ/K aralığındadır, mimari verilerden doğrulayın."
      fields={[
        { key: "isiKaybiKatsayisi_WK", label: "Toplam Isı Kaybı Katsayısı H (W/K)", type: "number", step: 10, min: 1 },
        { key: "isilKutle_MJK", label: "Isıl Kütle C (MJ/K)", type: "number", step: 1, min: 0.1 },
        { key: "baslangicSicakligi_C", label: "Başlangıç Sıcaklığı (°C)", type: "number", step: 1 },
        { key: "disSicaklik_C", label: "Dış Sıcaklık (°C)", type: "number", step: 1 },
        { key: "hedefSicaklik_C", label: "Hedef Sıcaklık (°C)", type: "number", step: 1 },
      ]}
      defaults={{ isiKaybiKatsayisi_WK: 200, isilKutle_MJK: 20, baslangicSicakligi_C: 21, disSicaklik_C: 0, hedefSicaklik_C: 18 }}
      mainUnit="saat"
      mainValueKey="sure_saat"
      mainDecimals={1}
      intermediateLabels={{
        zaman_sabiti_saat: "Zaman Sabiti τ (saat)",
        sure_dk: "Süre (dk)",
        baslangic_isi_kaybi_W: "Başlangıç Isı Kaybı (W)",
        denge_sicakligi_C: "Denge Sıcaklığı (°C)",
      }}
    />
  );
}
