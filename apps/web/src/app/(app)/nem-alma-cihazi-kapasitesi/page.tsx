"use client";

import { nemAlmaCihaziKapasitesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function NemAlmaCihaziKapasitesiPage() {
  return (
    <CalcPage
      module={nemAlmaCihaziKapasitesi}
      standardsLabel="ASHRAE Fundamentals — psikrometri (Magnus doyma basıncı)"
      description="Odanın havalandırma ile giren nem yükü ve iç nem üretiminden günlük nem alma ihtiyacını ve önerilen cihaz kapasitesini hesaplar."
      formula="W = 0,622·Pv/(P − Pv);   m = V·ACH·24·ρ·(W₁ − W₂) + üretim"
      engineeringNote="Oda sıcaklığı sabit kabul edilir. İç nem üretimi: dört kişilik hanede ~ 10–14 kg/gün (pişirme, banyo, çamaşır, nefes) bandında olabilir. Önerilen kapasite %25 emniyet payı içerir; cihaz kapasiteleri 30 °C %80 koşulunda verildiğinden gerçek koşulda düşer, üretici eğrisini kullanın. Yüzeyde yoğuşma ve küf riski için Duvar/Pencere İç Yüzey Sıcaklığı ve Küf Riski modülüne bakın."
      fields={[
        { key: "odaHacmi_m3", label: "Oda / Bölge Hacmi (m³)", type: "number", min: 1, step: 10 },
        { key: "havaDegisimSayisi", label: "Hava Değişim Sayısı (1/h)", type: "number", min: 0, step: 0.1 },
        { key: "sicaklik_C", label: "Oda Sıcaklığı (°C)", type: "number", min: 0, step: 1 },
        { key: "mevcutBagilNem", label: "Mevcut Bağıl Nem (%)", type: "number", min: 10, step: 1 },
        { key: "hedefBagilNem", label: "Hedef Bağıl Nem (%)", type: "number", min: 20, step: 1 },
        { key: "icNemUretimi_kggun", label: "İç Nem Üretimi (kg/gün)", type: "number", min: 0, step: 0.5 },
      ]}
      defaults={{ odaHacmi_m3: 100, havaDegisimSayisi: 0.5, sicaklik_C: 20, mevcutBagilNem: 60, hedefBagilNem: 45, icNemUretimi_kggun: 2 }}
      mainUnit="kg/gün (nem yükü ≈ L/gün)"
      mainValueKey="gunlukNemYuku_kg"
      mainDecimals={1}
      intermediateLabels={{
        W_mevcut_gkg: "Mevcut Nem Oranı (g/kg)",
        W_hedef_gkg: "Hedef Nem Oranı (g/kg)",
        hava_ile_giren_nem_kggun: "Hava ile Giren Nem (kg/gün)",
        ic_uretim_kggun: "İç Nem Üretimi (kg/gün)",
        onerilen_cihaz_kapasitesi_Lgun: "Önerilen Cihaz Kapasitesi, %25 pay (L/gün)",
      }}
    />
  );
}
