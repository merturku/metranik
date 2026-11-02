"use client";

import { betonHacmiMikserSayisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BetonHacmiMikserSayisiPage() {
  return (
    <CalcPage
      module={betonHacmiMikserSayisi}
      standardsLabel="TS EN 206 — hazır beton teslim pratiği"
      description="Net beton hacmine fire payı ekleyerek sipariş miktarını, mikser sefer sayısını ve pompayla döküm süresini hesaplar."
      formula="V_sipariş = V_net·(1 + fire);   n = ⌈V_sipariş/V_mikser⌉;   t = V_sipariş/Q_pompa"
      engineeringNote="Fire payı kalıp toleransı, hat kaybı ve yüzey düzensizliğine göre %3–5 alınır. Mikser kapasitesi genelde 6–9 m³'tür. Döküm süresi, ilk beton teslim süresi ve priz süresi (soğuk derz riski) ile birlikte değerlendirilmelidir; mikserler arası bekleme bu hesapta dikkate alınmaz. Beton yoğunluğu 2,4 t/m³ alınarak ağırlık bilgi amaçlı verilir."
      fields={[
        { key: "netHacim_m3", label: "Net Beton Hacmi (m³)", type: "number", min: 0.1, step: 1 },
        { key: "fireYuzde", label: "Fire Payı (%)", type: "number", min: 0, step: 0.5 },
        { key: "mikserKapasitesi_m3", label: "Mikser Kapasitesi (m³)", type: "number", min: 1, step: 0.5 },
        { key: "pompaDebisi_m3h", label: "Pompa Debisi (m³/h)", type: "number", min: 1, step: 5 },
      ]}
      defaults={{ netHacim_m3: 45, fireYuzde: 3, mikserKapasitesi_m3: 8, pompaDebisi_m3h: 30 }}
      mainUnit="m³ (sipariş hacmi)"
      mainValueKey="siparisHacmi_m3"
      mainDecimals={2}
      intermediateLabels={{
        mikser_sayisi: "Mikser Sefer Sayısı",
        son_mikser_dolulugu_m3: "Son Mikser Yükü (m³)",
        dokum_suresi_saat: "Döküm Süresi (saat)",
        beton_agirligi_ton: "Beton Ağırlığı (ton)",
      }}
    />
  );
}
