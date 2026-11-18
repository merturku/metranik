"use client";

import { dogalHavalandirmaBacaEtkisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DogalHavalandirmaBacaEtkisiPage() {
  return (
    <CalcPage
      module={dogalHavalandirmaBacaEtkisi}
      standardsLabel={"ASHRAE Fundamentals Bölüm 16"}
      description={"Alt ve üst açıklıklar arasındaki sıcaklık farkından doğan yoğunluk farkıyla (baca etkisi) oluşan doğal havalandırma debisini ve saatlik hava değişimini hesaplar."}
      formula={"Q = Cd·A*·√(2g·ΔH·(Ti − To)/Ti);  A* = 1/√(1/A1² + 1/A2²)"}
      engineeringNote={"Yalnız ısıl kaldırma (baca etkisi) hesaplanır; rüzgâr etkisi ve nötr düzlem konumu hesaba katılmaz. Cd değeri açıklık tipine göre yaklaşık 0,5–0,65 alınır (ASHRAE; teyit edin). Debi yalnız iç sıcaklık dış sıcaklıktan yüksekken geçerlidir; ters durumda yaz gece soğutması için akış yönü tersine döner ve bu modül kapsamı dışındadır. Doğal havalandırma sürekli ve kontrollü debi garantisi vermez; zorunlu havalandırma gereksiniminin yerine geçmez."}
      fields={[
        { key: "girisAlani_m2", label: "Alt (Giriş) Açıklık Alanı (m²)", type: "number", step: 0.1, min: 0.001 },
        { key: "cikisAlani_m2", label: "Üst (Çıkış) Açıklık Alanı (m²)", type: "number", step: 0.1, min: 0.001 },
        { key: "yukseklikFarki_m", label: "Açıklık Orta Noktaları Arası Yükseklik (m)", type: "number", step: 0.5, min: 0.1 },
        { key: "icSicaklik_C", label: "İç Sıcaklık (°C)", type: "number", step: 1 },
        { key: "disSicaklik_C", label: "Dış Sıcaklık (°C)", type: "number", step: 1 },
        { key: "cd", label: "Debi Katsayısı Cd (0–1)", type: "number", step: 0.05, min: 0.1 },
        { key: "hacim_m3", label: "Mahal Hacmi (m³)", type: "number", step: 10, min: 1 },
      ]}
      defaults={{ girisAlani_m2: 1, cikisAlani_m2: 1, yukseklikFarki_m: 5, icSicaklik_C: 22, disSicaklik_C: 10, cd: 0.6, hacim_m3: 200 }}
      mainUnit={"m³/h"}
      mainValueKey={"debi_m3h"}
      mainDecimals={0}
      intermediateLabels={{
        debi_m3s: "Debi (m³/s)",
        etkin_alan_m2: "Etkin Açıklık Alanı (m²)",
        teorik_hiz_ms: "Teorik Hız (m/s)",
        hava_degisimi_1h: "Hava Değişimi (1/h)",
      }}
    />
  );
}
