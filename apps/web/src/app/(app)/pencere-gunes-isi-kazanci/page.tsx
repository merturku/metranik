"use client";

import { pencereGunesIsiKazanci } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PencereGunesIsiKazanciPage() {
  return (
    <CalcPage
      module={pencereGunesIsiKazanci}
      standardsLabel="ASHRAE Fundamentals — Fenestration (SHGC yöntemi)"
      description="Cam yüzeyden içeri giren güneş ısı kazancını cam alanı, güneş ısı kazanç katsayısı (SHGC), gelen ışınım ve gölgeleme çarpanından hesaplar; klima yüküne eklenir."
      formula="Q = A·SHGC·Et·Fg   (1 W = 3,412 Btu/h)"
      engineeringNote="Et, pencere düzlemine gelen toplam güneş ışınımıdır (yön ve saate göre değişir; yerel iklim verisinden alınmalıdır). SHGC camın üretici verisidir (çift cam low-e için tipik 0,3–0,5). Gölgeleme çarpanı Fg: 1 = gölgesiz, perde/panjur/saçak ile azalır. Bu modül yalnız güneş kazancını verir; cam iletim kazancı (U·A·ΔT) ve sızıntı ayrıca eklenmelidir (bkz. Pencere/Duvar Isı Kaybı, Klima Kapasite Seçimi)."
      fields={[
        { key: "pencereAlani_m2", label: "Cam Alanı (m²)", type: "number", min: 0.1, step: 0.5 },
        { key: "shgc", label: "SHGC (0–1)", type: "number", min: 0.05, step: 0.05 },
        { key: "gunesIsinimi_Wm2", label: "Pencere Düzlemine Gelen Işınım Et (W/m²)", type: "number", min: 0, step: 50 },
        { key: "golgelemeCarpani", label: "Gölgeleme Çarpanı Fg (0–1)", type: "number", min: 0, step: 0.05 },
      ]}
      defaults={{ pencereAlani_m2: 4, shgc: 0.4, gunesIsinimi_Wm2: 600, golgelemeCarpani: 1 }}
      mainUnit="W (güneş ısı kazancı)"
      mainValueKey="isiKazanci_W"
      mainDecimals={0}
      intermediateLabels={{
        isi_kazanci_Btuh: "Isı Kazancı (Btu/h)",
        birim_alan_kazanci_Wm2: "Birim Alan Kazancı (W/m²)",
        gunes_gecirgenligi_ozet: "SHGC Özeti",
        golgeleme_ile_azalma_W: "Gölgeleme ile Azalma (W)",
      }}
    />
  );
}
