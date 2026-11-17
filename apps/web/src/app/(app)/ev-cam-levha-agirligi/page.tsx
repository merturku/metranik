"use client";

import { evCamLevhaAgirligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EvCamLevhaAgirligiPage() {
  return (
    <CalcPage
      module={evCamLevhaAgirligi}
      standardsLabel={"TS EN 572-1 (yoğunluk 2500 kg/m³)"}
      description={"Cam levhanın boyutu, kalınlığı ve adedinden toplam ağırlığı ve m² ağırlığını hesaplar; taşıma ve montaj planlaması için kullanılır."}
      formula={"m = ρ·A·t·n;  ρ = 2500 kg/m³ (soda-kireç camı)"}
      engineeringNote={"Soda-kireç silikat camı yoğunluğu 2500 kg/m³'tür (1 mm kalınlıkta 2,5 kg/m²). Laminasyon arakat filmi (PVB ≈ 1,07 kg/m² / 0,76 mm) ve çerçeve ağırlığı ayrıca eklenmelidir. Isıcam için her iki cam ağırlığı toplanır."}
      fields={[
        { key: "genislik_m", label: "Genişlik (m)", type: "number", step: 0.1, min: 0.01 },
        { key: "yukseklik_m", label: "Yükseklik (m)", type: "number", step: 0.1, min: 0.01 },
        { key: "kalinlik_mm", label: "Kalınlık (mm)", type: "number", step: 1, min: 1 },
        { key: "adet", label: "Adet", type: "number", step: 1, min: 1 },
        { key: "yogunluk_kgm3", label: "Yoğunluk (kg/m³)", type: "number", step: 50, min: 100 },
      ]}
      defaults={{ genislik_m: 1.2, yukseklik_m: 2, kalinlik_mm: 6, adet: 1, yogunluk_kgm3: 2500 }}
      mainUnit={"kg"}
      mainValueKey={"toplamAgirlik_kg"}
      mainDecimals={1}
      intermediateLabels={{
        birim_alan_agirligi_kgm2: "Birim Alan Ağırlığı (kg/m²)",
        tek_levha_kg: "Tek Levha (kg)",
        toplam_alan_m2: "Toplam Alan (m²)",
      }}
    />
  );
}
