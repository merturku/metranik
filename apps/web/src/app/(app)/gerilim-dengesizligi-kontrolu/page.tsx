"use client";

import { gerilimDengesizligiKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function GerilimDengesizligiKontroluPage() {
  return (
    <CalcPage
      module={gerilimDengesizligiKontrolu}
      standardsLabel="IEC 61000-4-30 / EN 50160"
      description="Ölçülen üç hat (faz-faz) geriliminden gerilim dengesizliğini hem IEC (ters bileşen/doğru bileşen oranı) hem NEMA (ortalamadan en büyük sapma) tanımıyla hesaplar ve EN 50160 / IEC 61000-2-2 uyumluluk seviyesiyle karşılaştırır."
      formula="β = ΣV⁴ / (ΣV²)²,   u2 = √[(1 − √(3 − 6β)) / (1 + √(3 − 6β))] × 100,   NEMA = maks|V − Vort| / Vort × 100"
      engineeringNote="IEC formülü, yalnız hat gerilimi genliklerinden ters bileşen oranını kesin olarak verir (açı ölçümü gerekmez); NEMA tanımı biraz daha düşük sonuç verir. EN 50160'a göre haftalık 10 dakikalık ortalamaların %95'i %2'yi aşmamalıdır; tek fazlı yükü yoğun bölgelerde %3'e kadar görülebilir. NEMA MG 1'e göre en sıcak sargıdaki sıcaklık artışının yüzde artışı yaklaşık 2 × (dengesizlik %)² kadardır; %1'in üzerinde motor gücü düşürülmeli, %5'in üzerinde işletme önerilmez. Ölçüm tek anlık değer değil, yük altında zaman ortalaması olmalıdır."
      fields={[
        { key: "hatGerilimiAB_V", label: "Hat Gerilimi Vab (V)", type: "number", min: 1, step: 1 },
        { key: "hatGerilimiBC_V", label: "Hat Gerilimi Vbc (V)", type: "number", min: 1, step: 1 },
        { key: "hatGerilimiCA_V", label: "Hat Gerilimi Vca (V)", type: "number", min: 1, step: 1 },
      ]}
      defaults={{
        hatGerilimiAB_V: 400,
        hatGerilimiBC_V: 390,
        hatGerilimiCA_V: 410,
      }}
      mainUnit="% (u2)"
      mainValueKey="dengesizlikOrani_u2_yuzde"
      mainDecimals={2}
      intermediateLabels={{
        ortalama_hat_gerilimi_V: "Ortalama Hat Gerilimi (V)",
        ortalamadan_maks_sapma_V: "Ortalamadan En Büyük Sapma (V)",
        nema_lvur_yuzde: "NEMA Dengesizlik Oranı (%)",
        beta_katsayisi: "β Katsayısı",
        motor_sicaklik_artisi_artis_yuzde: "Motor Sıcaklık Artışındaki Artış (%)",
      }}
    />
  );
}
