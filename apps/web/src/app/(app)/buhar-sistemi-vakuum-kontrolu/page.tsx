"use client";
import { CalcPage } from "@/components/calc-page";
import { buharSistemiVakuumKontrolu } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={buharSistemiVakuumKontrolu}
      standardsLabel="ASME PTC 12.2"
      description="Ölçülen kondenser mutlak basıncından vakumu ve doyma sıcaklığını hesaplar, tasarım mutlak basıncıyla karşılaştırarak vakumun yeterliliğini kontrol eder."
      formula="Vakum = Patm - Pmutlak; log10(P[mmHg]) = 8,07131 - 1730,63 / (233,426 + Tdoyma)"
      engineeringNote="Kondenser mutlak basıncı ne kadar düşükse (vakum ne kadar derinse) türbin çıkış entalpisi o kadar düşer ve çevrim verimi artar. Ölçülen basınç tasarımı aşıyorsa hava kaçağı, boru kirlenmesi ve soğutma suyu debisi/sıcaklığı incelenmelidir. Doyma sıcaklığı Antoine denklemiyle (1-100 °C) hesaplanır."
      fields={[
        { key: "kondenser_basinc_kPa", label: "Ölçülen Kondenser Basıncı (kPa mutlak)", type: "number", min: 1, step: 1 },
        { key: "tasarim_basinc_kPa", label: "Tasarım Kondenser Basıncı (kPa mutlak)", type: "number", min: 1, step: 1 },
        { key: "atmosfer_basinci_kPa", label: "Atmosfer Basıncı (kPa)", type: "number", min: 50, step: 0.5 },
      ]}
      defaults={{
        kondenser_basinc_kPa: 8,
        tasarim_basinc_kPa: 10,
        atmosfer_basinci_kPa: 101.325,
      }}
      mainUnit="kPa"
      mainValueKey="vakuum_kPa"
      mainDecimals={2}
      intermediateLabels={{
        tasarim_doyma_sicakligi_C: "Tasarım Doyma Sıcaklığı (°C)",
        basinc_farki_kPa: "Ölçülen - Tasarım (kPa)",
      }}
    />
  );
}
