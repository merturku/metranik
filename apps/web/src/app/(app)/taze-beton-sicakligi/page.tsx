"use client";

import { tazeBetonSicakligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TazeBetonSicakligiPage() {
  return (
    <CalcPage
      module={tazeBetonSicakligi}
      standardsLabel="ACI 305R / ACI 306R — ısı dengesi"
      description="Agrega, çimento ve karışım suyu sıcaklıklarından taze betonun döküm sıcaklığını hesaplar."
      formula="T = [0,22·(Ta·Wa + Tc·Wc) + Tw·Ww + Ta·Wwa] / [0,22·(Wa+Wc) + Ww + Wwa]"
      engineeringNote="Buz, karıştırma ısısı, hidratasyon ve ortamla ısı alışverişi hesaba katılmaz. Sıcak havada dökümde beton sıcaklığı için şartnamedeki üst sınıra (genelde 30–35 °C) bakın; ayrıntılı kalıp alma için Beton Olgunluk modülünü kullanın. Bileşen miktarları 1 m³ beton içindir."
      fields={[
        { key: "agrega_kg", label: "Kuru Agrega Wa (kg/m³)", type: "number", step: 50, min: 1 },
        { key: "cimento_kg", label: "Çimento Wc (kg/m³)", type: "number", step: 10, min: 1 },
        { key: "karisimSuyu_kg", label: "Karışım Suyu Ww (kg/m³)", type: "number", step: 5, min: 1 },
        { key: "agregaNemi_kg", label: "Agrega Serbest Nemi Wwa (kg/m³)", type: "number", step: 5, min: 0 },
        { key: "agregaSicakligi_C", label: "Agrega Sıcaklığı Ta (°C)", type: "number", step: 1 },
        { key: "cimentoSicakligi_C", label: "Çimento Sıcaklığı Tc (°C)", type: "number", step: 1 },
        { key: "suSicakligi_C", label: "Su Sıcaklığı Tw (°C)", type: "number", step: 1 },
      ]}
      defaults={{ agrega_kg: 1800, cimento_kg: 350, karisimSuyu_kg: 160, agregaNemi_kg: 0, agregaSicakligi_C: 30, cimentoSicakligi_C: 40, suSicakligi_C: 15 }}
      mainUnit="°C"
      mainValueKey="betonSicakligi_C"
      mainDecimals={1}
      intermediateLabels={{
        isil_pay: "Isıl Pay",
        isil_payda: "Isıl Payda",
        toplam_kutle_kg: "Toplam Kütle (kg/m³)",
        su_cimento_orani: "Toplam Su/Çimento Oranı",
      }}
    />
  );
}
