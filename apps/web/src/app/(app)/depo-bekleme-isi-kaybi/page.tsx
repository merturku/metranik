"use client";

import { depoBeklemeIsiKaybi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DepoBeklemeIsiKaybiPage() {
  return (
    <CalcPage
      module={depoBeklemeIsiKaybi}
      standardsLabel={"Isıl direnç / Newton soğuma yasası"}
      description={"Yalıtımlı sıcak su deposunun bekleme (standby) ısı kaybını, günlük enerji kaybını ve su sıcaklığının zamanla düşüşünü hesaplar."}
      formula={"Q = U·A·(Tsu − Tort);  τ = m·cp/(U·A);  T(t) = Tort + (Tsu − Tort)·e^(−t/τ)"}
      engineeringNote={"Su tek kütle (karışık depo, tabakalaşma yok) ve U değeri sabit varsayılır; ρ = 1000 kg/m³, cp = 4186 J/kgK. Bağlantı ve flanşlardaki ısıl köprü kayıpları ayrıca eklenmelidir. Üretici bekleme kaybı (EN 12897) değeri varsa U·A yerine onunla karşılaştırın."}
      fields={[
        { key: "hacim_L", label: "Depo Hacmi (L)", type: "number", step: 50, min: 1 },
        { key: "yuzeyAlani_m2", label: "Yalıtımlı Dış Yüzey Alanı A (m²)", type: "number", step: 0.1, min: 0.01 },
        { key: "u_Wm2K", label: "Yüzey U Değeri (W/m²K)", type: "number", step: 0.1, min: 0.01 },
        { key: "suSicakligi_C", label: "Depo Su Sıcaklığı (°C)", type: "number", step: 1 },
        { key: "ortamSicakligi_C", label: "Ortam Sıcaklığı (°C)", type: "number", step: 1 },
        { key: "sure_h", label: "Bekleme Süresi (saat)", type: "number", step: 1, min: 0 },
      ]}
      defaults={{ hacim_L: 200, yuzeyAlani_m2: 1.5, u_Wm2K: 0.8, suSicakligi_C: 60, ortamSicakligi_C: 20, sure_h: 24 }}
      mainUnit={"W"}
      mainValueKey={"kayip_W"}
      mainDecimals={1}
      intermediateLabels={{
        gunluk_kayip_kWh: "Günlük Isı Kaybı (kWh)",
        zaman_sabiti_saat: "Zaman Sabiti τ (saat)",
        baslangic_soguma_C_saat: "Başlangıç Soğuma Hızı (°C/saat)",
        sure_sonu_sicaklik_C: "Süre Sonu Su Sıcaklığı (°C)",
      }}
    />
  );
}
