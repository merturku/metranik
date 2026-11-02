"use client";

import { sebekeGerilimHarmonikBozulmasi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SebekeGerilimHarmonikBozulmasiPage() {
  return (
    <CalcPage
      module={sebekeGerilimHarmonikBozulmasi}
      standardsLabel="EN 50160 — gerilim karakteristikleri (THDv ≤ %8)"
      description="Doğrusal olmayan yüklerin harmonik akımlarının, bağlantı noktası kısa devre gücü üzerinden oluşturduğu gerilim harmonik bozulmasını (THDv) hesaplar."
      formula="Zsc = U²/Ssc;   Vh% = √3·Ih·h·Zsc/U·100;   THDv = √(ΣVh²)"
      engineeringNote="Şebeke empedansının indüktif olduğu ve harmonik mertebesiyle doğrusal arttığı varsayılır; paralel rezonans (kompanzasyon kondansatörleri) ve yük empedansı ihmal edilmiştir — rezonans için Kompanzasyon Rezonans Kontrolü modülüne bakın. EN 50160 THDv ≤ %8 sınırı haftalık %95 değerleri içindir; bireysel harmonik sınırları ayrıca vardır. Harmonik akımlar Akım Harmonik Bozulması (THD) modülüyle belirlenebilir."
      fields={[
        { key: "hatGerilimi_V", label: "Hat Gerilimi (V)", type: "number", min: 1, step: 10 },
        { key: "kisaDevreGucu_MVA", label: "Bağlantı Noktası Kısa Devre Gücü (MVA)", type: "number", min: 0.1, step: 0.5 },
        { key: "akim5_A", label: "5. Harmonik Akımı (A)", type: "number", min: 0, step: 5 },
        { key: "akim7_A", label: "7. Harmonik Akımı (A)", type: "number", min: 0, step: 5 },
        { key: "akim11_A", label: "11. Harmonik Akımı (A)", type: "number", min: 0, step: 5 },
        { key: "akim13_A", label: "13. Harmonik Akımı (A)", type: "number", min: 0, step: 5 },
      ]}
      defaults={{ hatGerilimi_V: 400, kisaDevreGucu_MVA: 10, akim5_A: 100, akim7_A: 50, akim11_A: 20, akim13_A: 10 }}
      mainUnit="% (THDv)"
      mainValueKey="thdv_yuzde"
      mainDecimals={2}
      intermediateLabels={{
        Zsc_ohm: "Kısa Devre Empedansı (Ω)",
        V5_yuzde: "V5 (%)",
        V7_yuzde: "V7 (%)",
        V11_yuzde: "V11 (%)",
        V13_yuzde: "V13 (%)",
      }}
    />
  );
}
