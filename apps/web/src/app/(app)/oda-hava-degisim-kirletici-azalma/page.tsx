"use client";

import { odaHavaDegisimKirleticiAzalma } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function OdaHavaDegisimKirleticiAzalmaPage() {
  return (
    <CalcPage
      module={odaHavaDegisimKirleticiAzalma}
      standardsLabel="ASHRAE Fundamentals — Ventilation (tam karışım modeli)"
      description="Bir odada CO₂ veya başka bir kirletici derişiminin taze havayla hedef değere inmesi için gereken havalandırma süresini hesaplar."
      formula="C(t) = Cd + (C0 − Cd)·e^(−N·t);   N = Q/V;   t = ln((C0−Cd)/(Chedef−Cd))/N"
      engineeringNote="Oda havasının tam karıştığı ve kirletici kaynağının durduğu (kapalı kişi yok) varsayılır; kaynak devam ediyorsa denge derişimi Cd'den yüksektir (CO2 Bazlı Taze Hava / DCV modülüne bakın). Hedef derişim dış havadan yüksek olmalıdır. Açık pencere debisini tahmin etmek zordur, ölçülmüş debi kullanın."
      fields={[
        { key: "odaHacmi_m3", label: "Oda Hacmi (m³)", type: "number", min: 1, step: 5 },
        { key: "tazeHavaDebisi_m3h", label: "Taze Hava Debisi (m³/h)", type: "number", min: 1, step: 10 },
        { key: "baslangicDerisimi_ppm", label: "Başlangıç Derişimi (ppm)", type: "number", min: 1, step: 50 },
        { key: "disHavaDerisimi_ppm", label: "Dış Hava Derişimi (ppm)", type: "number", min: 0, step: 10 },
        { key: "hedefDerisim_ppm", label: "Hedef Derişim (ppm)", type: "number", min: 1, step: 50 },
      ]}
      defaults={{ odaHacmi_m3: 50, tazeHavaDebisi_m3h: 100, baslangicDerisimi_ppm: 1500, disHavaDerisimi_ppm: 400, hedefDerisim_ppm: 800 }}
      mainUnit="dakika"
      mainValueKey="sure_dk"
      mainDecimals={0}
      intermediateLabels={{
        hava_degisim_sayisi_ACH: "Hava Değişim Sayısı (1/h)",
        zaman_sabiti_dk: "Zaman Sabiti (dk)",
        sure_saat: "Süre (saat)",
        denge_derisimi_ppm: "Dış Hava / Denge Derişimi (ppm)",
      }}
    />
  );
}
