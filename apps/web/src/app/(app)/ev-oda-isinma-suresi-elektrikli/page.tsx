"use client";

import { evOdaIsinmaSuresiElektrikli } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EvOdaIsinmaSuresiElektrikliPage() {
  return (
    <CalcPage
      module={evOdaIsinmaSuresiElektrikli}
      standardsLabel="Newton ısınma yasası"
      description="Isıtıcı gücü, odanın ısıl kapasitesi ve ısı kaybından odanın hedef sıcaklığa ulaşma süresini ve kararlı sıcaklığını hesaplar."
      formula="T∞ = Tₑ + P/UA;  τ = C/UA;  t = τ·ln[(T∞ − T₀)/(T∞ − T_f)]"
      engineeringNote="C oda hava ve yapı/eşya ısıl kütlesidir (MJ/K); yalnız hava alınırsa süre gerçekçi olmayacak kadar kısa çıkar. UA, Pencere/Duvar Isı Kaybı ve Havalandırma Isı Kaybı modüllerinin toplamıdır (W/K). Hedef kararlı sıcaklığın üstündeyse ısıtıcı yetersizdir."
      fields={[
        { key: "isilKapasite_MJK", label: "Isıl Kapasite C (MJ/K)", type: "number", step: 0.1, min: 0.01 },
        { key: "isiKaybiKatsayisi_UA_WK", label: "Isı Kaybı Katsayısı UA (W/K)", type: "number", step: 5, min: 1 },
        { key: "isitaciGucu_W", label: "Isıtıcı Gücü (W)", type: "number", step: 100, min: 1 },
        { key: "disSicaklik_C", label: "Dış Sıcaklık (°C)", type: "number", step: 1 },
        { key: "baslangicSicakligi_C", label: "Başlangıç Sıcaklığı (°C)", type: "number", step: 1 },
        { key: "hedefSicaklik_C", label: "Hedef Sıcaklık (°C)", type: "number", step: 1 },
      ]}
      defaults={{ isilKapasite_MJK: 2, isiKaybiKatsayisi_UA_WK: 100, isitaciGucu_W: 3000, disSicaklik_C: 0, baslangicSicakligi_C: 10, hedefSicaklik_C: 20 }}
      mainUnit="saat"
      mainValueKey="isinmaSuresi_saat"
      mainDecimals={2}
      intermediateLabels={{
        kararli_sicaklik_C: "Kararlı Sıcaklık T∞ (°C)",
        zaman_sabiti_saat: "Zaman Sabiti τ (saat)",
        sure_dakika: "Süre (dk)",
        gerekli_surekli_guc_W: "Hedefi Sürdürme Gücü (W)",
        not: "Not",
      }}
    />
  );
}
