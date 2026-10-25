"use client";

import { hazenWilliamsSurtunmeKaybi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HazenWilliamsSurtunmeKaybiPage() {
  return (
    <CalcPage
      module={hazenWilliamsSurtunmeKaybi}
      standardsLabel="NFPA 13"
      description="Sprinkler ve yangın dolabı tesisatında bir boru bölümünün sürtünme basınç kaybını, NFPA 13 hidrolik hesabının esas aldığı Hazen-Williams formülüyle hesaplar."
      formula="pm = 6,05·10⁵ × Q^1,85 / (C^1,85 × d^4,87)  [bar/m],   Δp = pm × Leşdeğer"
      engineeringNote="Q litre/dakika, d boru iç çapı (mm; anma çapı değil, et kalınlığına göre iç çap) olarak girilir. C katsayısı NFPA 13 tablosundan: siyah veya galvaniz çelik kuru/ön-tepkimeli sistem 100, ıslak sistem 120; bakır, CPVC ve plastik 150; çimento kaplı sfero döküm 140. Eşdeğer boy, düz boru boyuna dirsek, te ve vanaların eşdeğer boylarının (NFPA 13 tablosu, C = 120 esaslı) eklenmesiyle bulunur. Hazen-Williams yalnız ~5–30 °C su için geçerlidir; antifriz sistemlerinde Darcy-Weisbach kullanılmalıdır (Boru Basınç Kaybı)."
      fields={[
        { key: "debi_Lmin", label: "Debi Q (L/dk)", type: "number", min: 1, step: 10 },
        { key: "boruIcCapi_mm", label: "Boru İç Çapı d (mm)", type: "number", min: 5, step: 0.5 },
        { key: "puruzlulukKatsayisi_C", label: "Hazen-Williams C Katsayısı", type: "number", min: 60, step: 10 },
        { key: "esdegerBoruBoyu_m", label: "Eşdeğer Boru Boyu (m)", type: "number", min: 0.1, step: 1 },
      ]}
      defaults={{
        debi_Lmin: 500,
        boruIcCapi_mm: 52.5,
        puruzlulukKatsayisi_C: 120,
        esdegerBoruBoyu_m: 30,
      }}
      mainUnit="bar"
      mainValueKey="toplamSurtunmeKaybi_bar"
      mainDecimals={3}
      intermediateLabels={{
        birim_kayip_bar_m: "Birim Kayıp (bar/m)",
        birim_kayip_kPa_m: "Birim Kayıp (kPa/m)",
        toplam_kayip_mSS: "Toplam Kayıp (mSS)",
        akis_hizi_ms: "Akış Hızı (m/s)",
      }}
    />
  );
}
