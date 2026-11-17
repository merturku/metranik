"use client";

import { yolAydinlatmaDirekAraligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YolAydinlatmaDirekAraligiPage() {
  return (
    <CalcPage
      module={yolAydinlatmaDirekAraligi}
      standardsLabel={"EN 13201 (yol aydınlatması) — kullanım faktörü yöntemi"}
      description={"Armatür ışık akısı, kullanım faktörü, bakım faktörü ve yol genişliğinden, hedef ortalama aydınlığı sağlayan direk aralığını hesaplar."}
      formula={"Eort = Φ·UF·MF/(w·s)  →  s = Φ·UF·MF/(Eort·w)"}
      engineeringNote={"UF (kullanım faktörü) armatürün fotometrik verisinden yol genişliği/montaj yüksekliği oranına göre okunur; MF için bakım programına göre CIE 154 değerleri kullanılır. Tek taraflı dizilimde w yol genişliğidir; iki taraflı karşılıklı dizilimde w yarı yol genişliği alınmalıdır. Düzgünlük (U0, Ul) ve kamaşma kontrolleri ayrıca yapılmalıdır."}
      fields={[
        { key: "aki_lm", label: "Armatür Işık Akısı Φ (lm)", type: "number", step: 500, min: 100 },
        { key: "uf", label: "Kullanım Faktörü UF (0–1)", type: "number", step: 0.01, min: 0.05 },
        { key: "mf", label: "Bakım Faktörü MF (0–1)", type: "number", step: 0.05, min: 0.1 },
        { key: "hedefLux", label: "Hedef Ortalama Aydınlık (lx)", type: "number", step: 1, min: 0.5 },
        { key: "yolGenisligi_m", label: "Yol Genişliği w (m)", type: "number", step: 0.5, min: 1 },
      ]}
      defaults={{ aki_lm: 15000, uf: 0.45, mf: 0.8, hedefLux: 15, yolGenisligi_m: 7 }}
      mainUnit={"m"}
      mainValueKey={"direkAraligi_m"}
      mainDecimals={1}
      intermediateLabels={{
        yol_basina_aki_lmm: "Boy Başına Akı (lm/m)",
        armatur_basina_aydinlik_lx: "Bu Aralıkta Ort. Aydınlık (lx)",
      }}
    />
  );
}
