"use client";

import { boruErozyonHiziKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BoruErozyonHiziKontroluPage() {
  return (
    <CalcPage
      module={boruErozyonHiziKontrolu}
      standardsLabel="API RP 14E"
      description="Akışkan yoğunluğu ve erozyon katsayısından izin verilen maksimum akış hızını hesaplar, gerçek akış hızıyla karşılaştırarak erozyon/korozyon riskini kontrol eder."
      formula="Vmax = C/√ρ"
      engineeringNote="C, hizmet tipine ve boru malzemesine göre değişen ampirik bir katsayıdır (sürekli servis için tipik olarak daha düşük, aralıklı servis için daha yüksek seçilir) — mühendisin ilgili standart/üretici tablosundan seçmesi gerekir. Boru Ekonomik Çap Seçimi modülünün ürettiği hızın erozyon açısından güvenli olup olmadığının kontrolüdür."
      fields={[
        {
          key: "akiskanYogunlugu_rho_kgm3",
          label: "Akışkan Yoğunluğu ρ (kg/m³)",
          type: "number",
          min: 1,
          step: 50,
        },
        {
          key: "erozyonKatsayisi_C",
          label: "Erozyon Katsayısı C",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "gercekAkisHizi_V_ms",
          label: "Gerçek Akış Hızı (m/s)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
      ]}
      defaults={{
        akiskanYogunlugu_rho_kgm3: 1000,
        erozyonKatsayisi_C: 122,
        gercekAkisHizi_V_ms: 2.5,
      }}
      mainUnit="m/s"
      mainValueKey="maksimumHiz_Vmax_ms"
      mainDecimals={2}
      intermediateLabels={{
        gercekAkisHizi_ms: "Gerçek Akış Hızı (m/s)",
      }}
    />
  );
}
