"use client";

import { evaporatifSogutmaCikisSicakligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EvaporatifSogutmaCikisSicakligiPage() {
  return (
    <CalcPage
      module={evaporatifSogutmaCikisSicakligi}
      standardsLabel="ASHRAE HVAC Systems and Equipment — Evaporative Air-Cooling"
      description="Doğrudan evaporatif (adyabatik) soğutucunun çıkış kuru termometre sıcaklığını giriş kuru/yaş termometre sıcaklığı ve doygunluk veriminden, buna karşılık gelen duyulur soğutma etkisini de hava debisinden hesaplar."
      formula="ε = (t1 − t2)/(t1 − t*1)  →  t2 = t1 − ε·(t1 − t*1),   Q = ρ·V̇·cp·(t1 − t2)"
      engineeringNote="Adyabatik nemlendirmede entalpi sabit kalır; hava en fazla giriş yaş termometre sıcaklığına kadar soğuyabilir (ε = 1). Islak ortam (selüloz ped) tipik olarak ε = 0,70–0,90 verir; değer üretici verisinden alınmalıdır. Kuru ve sıcak iklimlerde yaş termometre depresyonu büyük olduğundan etkilidir; nemli iklimlerde depresyon küçük kalır ve kazanç sınırlıdır. Soğutma duyulurdur, ancak havanın nemi artar (gizli yük sıfır değildir, mutlak nem artar) — konfor ve küf riski ayrıca değerlendirilmelidir. Hesapta kuru hava ρ = 1,2 kg/m³ ve cp = 1,006 kJ/(kg·K) alınmıştır; ped basınç kaybı ve su tüketimi dahil değildir."
      fields={[
        { key: "girisKuruTermometre_C", label: "Giriş Kuru Termometre t1 (°C)", type: "number", step: 0.5 },
        { key: "girisYasTermometre_C", label: "Giriş Yaş Termometre t*1 (°C)", type: "number", step: 0.5 },
        { key: "doygunlukVerimi", label: "Doygunluk Verimi ε (0–1)", type: "number", min: 0.05, step: 0.01 },
        { key: "havaDebisi_m3h", label: "Hava Debisi (m³/h)", type: "number", min: 1, step: 500 },
      ]}
      defaults={{ girisKuruTermometre_C: 35, girisYasTermometre_C: 22, doygunlukVerimi: 0.85, havaDebisi_m3h: 10000 }}
      mainUnit="°C (çıkış kuru termometre)"
      mainValueKey="cikisSicakligi_C"
      mainDecimals={2}
      intermediateLabels={{
        yas_termometre_depresyonu_K: "Yaş Termometre Depresyonu (K)",
        sicaklik_dususu_K: "Sıcaklık Düşüşü (K)",
        duyulur_sogutma_etkisi_kW: "Duyulur Soğutma Etkisi (kW)",
        sinir_sicaklik_C: "Teorik Alt Sınır (Yaş Termometre, °C)",
      }}
    />
  );
}
