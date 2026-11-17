"use client";

import { foreKazikBetonHacmi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ForeKazikBetonHacmiPage() {
  return (
    <CalcPage
      module={foreKazikBetonHacmi}
      standardsLabel={"Geometrik metraj"}
      description={"Fore kazık çapı, boyu ve adedinden beton hacmini (fire dahil) ve boyuna donatı oranına göre yaklaşık donatı ağırlığını hesaplar."}
      formula={"V = n·π·d²/4·L·(1 + fire);  Wdonatı = ρs·(π·d²/4)·L·n·7850"}
      engineeringNote={"Fore kazıkta fiili beton sarfiyatı zemin kaçakları ve kazı çapı büyümesi nedeniyle teorik hacmin %10–25 üzerine çıkabilir; fire payı saha deneyimine göre girilmelidir. Donatı ağırlığı yalnız boyuna donatı oranına göredir (etriye/spiral ve bindirme ayrıca eklenir)."}
      fields={[
        { key: "capi_mm", label: "Kazık Çapı (mm)", type: "number", step: 50, min: 100 },
        { key: "boy_m", label: "Kazık Boyu (m)", type: "number", step: 1, min: 0.5 },
        { key: "adet", label: "Kazık Adedi", type: "number", step: 1, min: 1 },
        { key: "firePayi", label: "Beton Fire Payı (0–1)", type: "number", step: 0.01, min: 0 },
        { key: "donatiOrani", label: "Boyuna Donatı Oranı (0–0,04)", type: "number", step: 0.001, min: 0 },
      ]}
      defaults={{ capi_mm: 800, boy_m: 20, adet: 1, firePayi: 0.05, donatiOrani: 0.01 }}
      mainUnit={"m³"}
      mainValueKey={"betonHacmi_m3"}
      mainDecimals={2}
      intermediateLabels={{
        teorik_hacim_m3: "Teorik Hacim (m³)",
        boyuna_donati_kg: "Boyuna Donatı (kg)",
        kesit_alani_m2: "Kesit Alanı (m²)",
      }}
    />
  );
}
