"use client";

import { betonOlgunlukKalipAlmaSuresi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BetonOlgunlukKalipAlmaSuresiPage() {
  return (
    <CalcPage
      module={betonOlgunlukKalipAlmaSuresi}
      standardsLabel="ASTM C1074"
      description="Laboratuvarda belirli bir sıcaklıkta hedef dayanıma (örn. kalıp alma dayanımı) ulaşma süresinden, şantiyedeki ortalama beton sıcaklığında aynı dayanıma ulaşma süresini Nurse-Saul olgunluk yöntemiyle hesaplar."
      formula="M = (T − T0) × t,   tşantiye = tref × (Tref − T0)/(Tşantiye − T0)"
      engineeringNote="Yöntem, aynı karışımın aynı olgunluk değerinde aynı dayanıma ulaştığı kabulüne dayanır; laboratuvar verisi şantiyedeki betonla aynı karışımdan olmalıdır. T0 ideal olarak deneyle belirlenir, literatürde −10 °C ile 0 °C arası değerler kullanılır (0 °C daha uzun süre verir, güvenli taraftır). Beton sıcaklığı hava sıcaklığından farklıdır; mümkünse gömülü sensörle ölçülmelidir. Kalıp alma kararı yerinde dayanım doğrulamasıyla verilmelidir."
      fields={[
        { key: "referansSicaklik_Tref_C", label: "Laboratuvar Kür Sıcaklığı Tref (°C)", type: "number", min: -10, step: 1 },
        { key: "referansSure_tref_gun", label: "Laboratuvarda Hedef Dayanıma Ulaşma Süresi (gün)", type: "number", min: 0.5, step: 0.5 },
        { key: "santiyeOrtalamaSicaklik_C", label: "Şantiye Ortalama Beton Sıcaklığı (°C)", type: "number", min: -10, step: 1 },
        { key: "datumSicakligi_T0_C", label: "Datum Sıcaklığı T0 (°C)", type: "number", min: -15, step: 1 },
      ]}
      defaults={{
        referansSicaklik_Tref_C: 20,
        referansSure_tref_gun: 3,
        santiyeOrtalamaSicaklik_C: 10,
        datumSicakligi_T0_C: 0,
      }}
      mainUnit="gün"
      mainValueKey="gerekliSure_gun"
      mainDecimals={1}
      intermediateLabels={{
        hedef_olgunluk_M_Csaat: "Hedef Olgunluk M (°C·saat)",
        gerekli_sure_saat: "Gerekli Süre (saat)",
        sure_orani: "Laboratuvar Süresine Oranı",
      }}
    />
  );
}
