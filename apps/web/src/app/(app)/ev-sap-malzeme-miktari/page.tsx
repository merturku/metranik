"use client";

import { evSapMalzemeMiktari } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EvSapMalzemeMiktariPage() {
  return (
    <CalcPage
      module={evSapMalzemeMiktari}
      standardsLabel={"TS EN 13813 (şap malzemeleri) — dozaj girdi"}
      description={"Şap alanı ve kalınlığından şap hacmini (fire dahil), çimento kütlesini, 50 kg torba sayısını ve karışım suyunu hesaplar."}
      formula={"V = A·t·(1 + fire);  çimento = V·dozaj;  su = çimento·(su/çimento oranı)"}
      engineeringNote={"Çimento dozajı (kg/m³) proje/şartnamenin öngördüğü değerdir (yaygın şaplarda 300–400 kg/m³ aralığı); kum miktarı agrega nemine ve yığın yoğunluğuna göre ayrıca belirlenir. Kalınlık ısıtma borusu olan şaplarda boru üstünden ölçülür."}
      fields={[
        { key: "alan_m2", label: "Şap Alanı (m²)", type: "number", step: 5, min: 0.1 },
        { key: "kalinlik_cm", label: "Şap Kalınlığı (cm)", type: "number", step: 0.5, min: 0.5 },
        { key: "cimentoDozaji_kgm3", label: "Çimento Dozajı (kg/m³)", type: "number", step: 10, min: 50 },
        { key: "firePayi", label: "Fire Payı (0–1)", type: "number", step: 0.01, min: 0 },
        { key: "suCimentoOrani", label: "Su/Çimento Oranı", type: "number", step: 0.05, min: 0.1 },
      ]}
      defaults={{ alan_m2: 50, kalinlik_cm: 5, cimentoDozaji_kgm3: 350, firePayi: 0.05, suCimentoOrani: 0.5 }}
      mainUnit={"m³"}
      mainValueKey={"sapHacmi_m3"}
      mainDecimals={3}
      intermediateLabels={{
        cimento_kg: "Çimento (kg)",
        cimento_torba_50kg: "Çimento (50 kg torba)",
        karisim_suyu_L: "Karışım Suyu (L)",
      }}
    />
  );
}
