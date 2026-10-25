"use client";

import { radyatorDilimSayisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function RadyatorDilimSayisiPage() {
  return (
    <CalcPage
      module={radyatorDilimSayisi}
      standardsLabel="TS EN 442-2"
      description="Odanın ısı kaybını karşılamak için kaç radyatör dilimi (veya panel radyatörde kaç metre) gerektiğini, kombi/kazan gidiş-dönüş suyu sıcaklığına göre düzeltilmiş kapasiteyle hesaplar."
      formula="ΔTln = (Tg − Td) / ln[(Tg − To)/(Td − To)],   Φ = Φ50 × (ΔTln/50)^n,   N = ⌈Q / Φ⌉"
      engineeringNote="Katalogdaki dilim kapasitesi genellikle ΔT = 50 K (75/65/20 °C) içindir; kombinin çoğu zaman 60–70 °C'de çalıştığı ve yoğuşmalı kazan/ısı pompasıyla daha düşük sıcaklık kullanıldığı için gerçek kapasite belirgin şekilde düşer. Panel radyatörde 'birim' olarak metre başına kapasiteyi girin; sonuç metre cinsinden olur. Oda ısı kaybı ısı kaybı hesabından (Isıtma Yükü modülü) alınmalıdır; m³ başına kaba kurallar yanıltıcıdır. Radyatörü pencere altına yerleştirmek soğuk hava düşüşünü engeller."
      fields={[
        { key: "odaIsiKaybi_W", label: "Oda Isı Kaybı Q (W)", type: "number", min: 1, step: 50 },
        { key: "birimKapasitesiDT50_W", label: "Dilim / Metre Kapasitesi, ΔT 50 K (W)", type: "number", min: 1, step: 5 },
        { key: "radyatorUssu_n", label: "Radyatör Üssü n", type: "number", min: 1, step: 0.01 },
        { key: "gidisSicakligi_C", label: "Gidiş Suyu Sıcaklığı (°C)", type: "number", min: 20, step: 5 },
        { key: "donusSicakligi_C", label: "Dönüş Suyu Sıcaklığı (°C)", type: "number", min: 15, step: 5 },
        { key: "odaSicakligi_C", label: "Oda Sıcaklığı (°C)", type: "number", min: 5, step: 1 },
      ]}
      defaults={{
        odaIsiKaybi_W: 1500,
        birimKapasitesiDT50_W: 120,
        radyatorUssu_n: 1.3,
        gidisSicakligi_C: 70,
        donusSicakligi_C: 55,
        odaSicakligi_C: 20,
      }}
      mainUnit="dilim (veya m)"
      mainValueKey="dilimSayisi"
      mainDecimals={0}
      intermediateLabels={{
        logaritmik_sicaklik_farki_K: "Logaritmik Sıcaklık Farkı ΔTln (K)",
        aritmetik_sicaklik_farki_K: "Aritmetik Sıcaklık Farkı (K)",
        kapasite_duzeltme_katsayisi: "Kapasite Düzeltme Katsayısı",
        isletmede_birim_kapasitesi_W: "İşletmede Birim Kapasite (W)",
        kurulu_kapasite_W: "Kurulu Toplam Kapasite (W)",
        fazla_kapasite_yuzde: "Fazla Kapasite (%)",
      }}
    />
  );
}
