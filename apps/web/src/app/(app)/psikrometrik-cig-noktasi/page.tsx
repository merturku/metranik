"use client";

import { psikrometrikCigNoktasi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PsikrometrikCigNoktasiPage() {
  return (
    <CalcPage
      module={psikrometrikCigNoktasi}
      standardsLabel="Magnus-Tetens Yaklaşımı"
      description="Kuru termometre sıcaklığı ve bağıl neme göre havanın çiy noktası sıcaklığını hesaplar."
      formula="α = ln(RH/100) + a×T/(b+T), Td = b×α / (a-α)"
      engineeringNote="Magnus-Tetens katsayıları (a=17.27, b=237.7°C) su üzerinde -45°C ile +60°C arasında geçerlidir; kanal/boru yüzey sıcaklığı çiy noktasının altına düşerse yoğuşma (terleme) riski oluşur."
      fields={[
        {
          key: "kuruTermometreSicakligi_T_C",
          label: "Kuru Termometre Sıcaklığı T (°C)",
          type: "number",
          step: 0.5,
        },
        {
          key: "bagilNem_RH_yuzde",
          label: "Bağıl Nem RH (%)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{ kuruTermometreSicakligi_T_C: 25, bagilNem_RH_yuzde: 60 }}
      mainUnit="°C"
      mainValueKey="cigNoktasi_Td_C"
      intermediateLabels={{ bagilNem_RH_yuzde: "Bağıl Nem (%)" }}
    />
  );
}
