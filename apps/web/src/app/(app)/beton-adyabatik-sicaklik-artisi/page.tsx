"use client";

import { betonAdyabatikSicaklikArtisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BetonAdyabatikSicaklikArtisiPage() {
  return (
    <CalcPage
      module={betonAdyabatikSicaklikArtisi}
      standardsLabel="ACI 207.2R"
      description="Çimento dozajı ve hidratasyon ısısından masif betonda adyabatik sıcaklık artışını ve en yüksek sıcaklığı hesaplar."
      formula="ΔT = C·q/(ρ·c);  T_maks = T_taze + ΔT"
      engineeringNote="Normal portland çimentoda hidratasyon ısısı 7–28 günde yaklaşık 350–420 kJ/kg'dır; düşük ısılı çimentoda daha azdır. Adyabatik değer üst sınırdır, ısı kaçışıyla gerçek sıcaklık düşüktür. Merkez–yüzey farkı genellikle 20 °C ile sınırlanır (şartnameden teyit edin)."
      fields={[
        { key: "cimentoDozaji_kgm3", label: "Çimento Dozajı C (kg/m³)", type: "number", step: 10, min: 1 },
        { key: "hidratasyonIsisi_kJkg", label: "Hidratasyon Isısı q (kJ/kg)", type: "number", step: 10, min: 1 },
        { key: "betonYogunlugu_kgm3", label: "Beton Yoğunluğu (kg/m³)", type: "number", step: 10, min: 1 },
        { key: "ozgulIsi_kJkgK", label: "Özgül Isı c (kJ/kg·K)", type: "number", step: 0.05, min: 0.1 },
        { key: "tazeBetonSicakligi_C", label: "Taze Beton Sıcaklığı (°C)", type: "number", step: 1 },
        { key: "izinVerilenMaksSicaklik_C", label: "İzin Verilen Maks. Sıcaklık (°C)", type: "number", step: 1 },
      ]}
      defaults={{ cimentoDozaji_kgm3: 350, hidratasyonIsisi_kJkg: 370, betonYogunlugu_kgm3: 2400, ozgulIsi_kJkgK: 1, tazeBetonSicakligi_C: 20, izinVerilenMaksSicaklik_C: 70 }}
      mainUnit="K"
      mainValueKey="adyabatikArtis_K"
      mainDecimals={1}
      intermediateLabels={{
        hidratasyon_isisi_toplam_kJm3: "Toplam Hidratasyon Isısı (kJ/m³)",
        adyabatik_maks_sicaklik_C: "Adyabatik Maks. Sıcaklık (°C)",
        izin_verilen_maks_C: "İzin Verilen Maks. (°C)",
      }}
    />
  );
}
