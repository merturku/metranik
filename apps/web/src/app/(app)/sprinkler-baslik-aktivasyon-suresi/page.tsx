"use client";

import { sprinklerBaslikAktivasyonSuresi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SprinklerBaslikAktivasyonSuresiPage() {
  return (
    <CalcPage
      module={sprinklerBaslikAktivasyonSuresi}
      standardsLabel={'NFPA 13 (RTI)'}
      description={'Sabit gaz sıcaklığı ve hızında, başlığın RTI değerine göre aktivasyon sıcaklığına ulaşma süresini hesaplar.'}
      formula={'τ = RTI/√u;  t = τ·ln[(Tg − Ta)/(Tg − Tact)]'}
      engineeringNote={'Tek kapasiteli ısıl tepki modelidir (iletim kaybı ve süreç içi değişen gaz koşulları ihmal). Gerçek yangında tavan jeti sıcaklığı ve hızı zamanla değişir; sonuç ön değerlendirmedir. RTI ve aktivasyon sıcaklığı başlık etiketinden/katalogtan alınır (standart tepki ≥ 80, hızlı tepki ≤ 50 m^½s^½ mertebesi, teyit edin).'}
      fields={[
        { key: "rti_m05s05", label: "RTI (m½·s½)", type: "number", step: 5, min: 1 },
        { key: "gazHizi_m_s", label: "Gaz Hızı u (m/s)", type: "number", step: 0.5, min: 0.1 },
        { key: "gazSicakligi_C", label: "Gaz Sıcaklığı Tg (°C)", type: "number", step: 5 },
        { key: "ortamSicakligi_C", label: "Ortam Sıcaklığı Ta (°C)", type: "number", step: 1 },
        { key: "aktivasyonSicakligi_C", label: "Aktivasyon Sıcaklığı (°C)", type: "number", step: 1 },
      ]}
      defaults={{ rti_m05s05: 100, gazHizi_m_s: 4, gazSicakligi_C: 200, ortamSicakligi_C: 20, aktivasyonSicakligi_C: 68 }}
      mainUnit={'s'}
      mainValueKey={'aktivasyonSuresi_s'}
      mainDecimals={1}
      intermediateLabels={{
        zaman_sabiti_s: "Zaman sabiti τ (s)",
        isil_yaklasim_orani: "(Tact−Ta)/(Tg−Ta)",
        aktivasyon_suresi_dk: "Süre (dk)",
      }}
    />
  );
}
