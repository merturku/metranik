"use client";

import { mutlakNemBagilNemDonusumu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function MutlakNemBagilNemDonusumuPage() {
  return (
    <CalcPage
      module={mutlakNemBagilNemDonusumu}
      standardsLabel="Magnus formülü · ideal gaz"
      description="Sıcaklık ve bağıl nemden mutlak nemi (g/m³), özgül nemi (g/kg), buhar basıncını ve çiy noktasını hesaplar."
      formula="Psat = 6,112·exp(17,62T/(243,12 + T));  ρv = 216,7·RH·Psat/(T + 273,15);  W = 0,622·Pv/(P − Pv)"
      engineeringNote="Magnus yaklaşımı −45…60 °C aralığında yaklaşık ±%0,4 doğruluktadır (20 °C'de 23,33 hPa, tablo 23,39). Nem alma/nemlendirme debisi için Nem Alma Cihazı Kapasitesi modülünü, yoğuşma riski için İç Yüzey Küf Riski modülünü kullanın."
      fields={[
        { key: "sicaklik_C", label: "Sıcaklık (°C)", type: "number", step: 0.5 },
        { key: "bagilNem_yuzde", label: "Bağıl Nem (%)", type: "number", step: 1, min: 0 },
        { key: "toplamBasinc_hPa", label: "Toplam Basınç (hPa)", type: "number", step: 1, min: 1 },
      ]}
      defaults={{ sicaklik_C: 20, bagilNem_yuzde: 50, toplamBasinc_hPa: 1013.25 }}
      mainUnit="g/m³"
      mainValueKey="mutlakNem_gm3"
      mainDecimals={2}
      intermediateLabels={{
        doyma_buhar_basinci_hPa: "Doyma Buhar Basıncı (hPa)",
        buhar_basinci_hPa: "Buhar Basıncı (hPa)",
        ozgul_nem_gkg: "Özgül Nem (g/kg)",
        ciy_noktasi_C: "Çiy Noktası (°C)",
        doygun_mutlak_nem_gm3: "Doygun Mutlak Nem (g/m³)",
      }}
    />
  );
}
