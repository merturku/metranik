"use client";

import { sogutucuHatHiziKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SogutucuHatHiziKontroluPage() {
  return (
    <CalcPage
      module={sogutucuHatHiziKontrolu}
      standardsLabel={"ASHRAE Refrigeration — hat hızı ilkesi"}
      description={"Soğutucu akışkan kütle debisi, özgül hacim ve boru iç çapından hat hızını hesaplar ve yağ dönüşü / gürültü için belirlenen hız aralığıyla karşılaştırır."}
      formula={"v = ṁ·ν/A;  A = π·D²/4"}
      engineeringNote={"Aralık sınırları hat türüne ve akışkana göre belirlenir (emme hattı düşey yükselticide yağ dönüşü için genellikle ≥ 5–7 m/s; azami yaklaşık 15–20 m/s; sıvı hattı yaklaşık 0,5–1,5 m/s). Sınırları ASHRAE Refrigeration veya üretici verisinden teyit ederek girin. Özgül hacim ν doymuş buhar/sıvı tablosundan ilgili sıcaklık ve basınçta alınır; bu modül akışkan tablosu içermez."}
      fields={[
        { key: "m_kgs", label: "Kütle Debisi ṁ (kg/s)", type: "number", step: 0.01, min: 0.0001 },
        { key: "nu_m3kg", label: "Özgül Hacim ν (m³/kg)", type: "number", step: 0.005, min: 0.0001 },
        { key: "icCap_mm", label: "Boru İç Çapı (mm)", type: "number", step: 1, min: 2 },
        { key: "vMin_ms", label: "Asgari Hız (m/s)", type: "number", step: 0.5, min: 0 },
        { key: "vMaks_ms", label: "Azami Hız (m/s)", type: "number", step: 0.5, min: 0.1 },
      ]}
      defaults={{ m_kgs: 0.1, nu_m3kg: 0.05, icCap_mm: 25, vMin_ms: 5, vMaks_ms: 15 }}
      mainUnit={"m/s"}
      mainValueKey={"hiz_ms"}
      mainDecimals={2}
      intermediateLabels={{
        kesit_alani_mm2: "Kesit Alanı (mm²)",
        hacimsel_debi_m3h: "Hacimsel Debi (m³/h)",
      }}
    />
  );
}
