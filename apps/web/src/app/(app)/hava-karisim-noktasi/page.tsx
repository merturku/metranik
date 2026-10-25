"use client";

import { havaKarisimNoktasi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HavaKarisimNoktasiPage() {
  return (
    <CalcPage
      module={havaKarisimNoktasi}
      standardsLabel="ASHRAE Fundamentals Bölüm 1"
      description="Klima santralinin karışım kutusunda taze hava ile dönüş havası gibi iki hava akımı karıştığında oluşan karışım havasının kuru ve yaş termometre sıcaklığını, nem oranını, entalpisini ve bağıl nemini hesaplar; karışımın doyma eğrisini aşıp sis oluşturup oluşturmadığını kontrol eder."
      formula="ṁ3·W3 = ṁ1·W1 + ṁ2·W2,   ṁ3·h3 = ṁ1·h1 + ṁ2·h2,   ṁ = Q/v,   h = 1,006·t + W·(2501 + 1,86·t)"
      engineeringNote="Karışım, debilerin hacmine göre değil kuru hava kütlesine göre ağırlıklandırılır; her akımın hacimsel debisi kendi özgül hacmiyle kütleye çevrilir. Doyma basıncı ASHRAE'nin Hyland-Wexler bağıntısıyla hesaplanır; yüksek rakımda atmosfer basıncını düşürün. Kışın çok soğuk taze hava sıcak-nemli dönüş havasıyla karıştığında karışım noktası doyma eğrisinin ötesine düşebilir: karışım kutusunda sis/buzlanma oluşur, taze hava karışımdan önce ön ısıtılmalıdır."
      fields={[
        { key: "akim1Debisi_m3s", label: "1. Akım (Taze Hava) Debisi (m³/s)", type: "number", min: 0.01, step: 0.1 },
        { key: "akim1Sicakligi_C", label: "1. Akım Kuru Termometre (°C)", type: "number", min: -50, step: 1 },
        { key: "akim1BagilNem_yuzde", label: "1. Akım Bağıl Nem (%)", type: "number", min: 1, step: 5 },
        { key: "akim2Debisi_m3s", label: "2. Akım (Dönüş Havası) Debisi (m³/s)", type: "number", min: 0.01, step: 0.1 },
        { key: "akim2Sicakligi_C", label: "2. Akım Kuru Termometre (°C)", type: "number", min: -50, step: 1 },
        { key: "akim2BagilNem_yuzde", label: "2. Akım Bağıl Nem (%)", type: "number", min: 1, step: 5 },
        { key: "atmosferBasinci_kPa", label: "Atmosfer Basıncı (kPa)", type: "number", min: 50, step: 0.5 },
      ]}
      defaults={{
        akim1Debisi_m3s: 2,
        akim1Sicakligi_C: 4,
        akim1BagilNem_yuzde: 70,
        akim2Debisi_m3s: 6.25,
        akim2Sicakligi_C: 25,
        akim2BagilNem_yuzde: 50,
        atmosferBasinci_kPa: 101.325,
      }}
      mainUnit="°C (karışım)"
      mainValueKey="karisimSicakligi_C"
      mainDecimals={1}
      intermediateLabels={{
        akim1_nem_orani_g_kg: "1. Akım Nem Oranı W1 (g/kg)",
        akim2_nem_orani_g_kg: "2. Akım Nem Oranı W2 (g/kg)",
        akim1_kuru_hava_kg_s: "1. Akım Kuru Hava Debisi (kg/s)",
        akim2_kuru_hava_kg_s: "2. Akım Kuru Hava Debisi (kg/s)",
        akim1_kutle_orani_yuzde: "1. Akımın Kütlesel Payı (%)",
        karisim_nem_orani_g_kg: "Karışım Nem Oranı W3 (g/kg)",
        karisim_entalpisi_kJ_kg: "Karışım Entalpisi h3 (kJ/kg)",
        karisim_bagil_nemi_yuzde: "Karışım Bağıl Nemi (%)",
        karisim_yas_termometre_C: "Karışım Yaş Termometre (°C)",
        karisim_hacimsel_debi_m3s: "Karışım Hacimsel Debisi (m³/s)",
      }}
    />
  );
}
