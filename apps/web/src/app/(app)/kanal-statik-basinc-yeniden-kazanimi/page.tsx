"use client";

import { kanalStatikBasincYenidenKazanimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KanalStatikBasincYenidenKazanimiPage() {
  return (
    <CalcPage
      module={kanalStatikBasincYenidenKazanimi}
      standardsLabel={"ASHRAE Fundamentals — Duct Design (statik yeniden kazanım)"}
      description={"Kanal kesiti genişlediğinde hız düşümünden geri kazanılan statik basıncı hesaplar; statik yeniden kazanım yöntemiyle kanal boyutlandırmada kullanılır."}
      formula={"ΔPs = R·(ρ/2)·(v1² − v2²)"}
      engineeringNote={"R yeniden kazanım katsayısıdır; kademeli genişlemede 0,5–0,9, iyi tasarlanmış yumuşak difüzörde 0,85–0,95 aralığındadır (ASHRAE Fundamentals Duct Design bölümünden teyit edin). Hız düşüşü büyük olmamalıdır: ani genişlemelerde R düşer. Pozitif sonuç statik basıncın arttığını, negatif sonuç hız artışıyla düştüğünü gösterir."}
      fields={[
        { key: "v1_ms", label: "Giriş Hızı v1 (m/s)", type: "number", step: 0.5, min: 0.1 },
        { key: "v2_ms", label: "Çıkış Hızı v2 (m/s)", type: "number", step: 0.5, min: 0.1 },
        { key: "r", label: "Yeniden Kazanım Katsayısı R (0–1)", type: "number", step: 0.05, min: 0 },
        { key: "yogunluk_kgm3", label: "Hava Yoğunluğu (kg/m³)", type: "number", step: 0.05, min: 0.1 },
      ]}
      defaults={{ v1_ms: 10, v2_ms: 7, r: 0.75, yogunluk_kgm3: 1.2 }}
      mainUnit={"Pa"}
      mainValueKey={"statikKazanim_Pa"}
      mainDecimals={2}
      intermediateLabels={{
        dinamik_basinc_dusumu_Pa: "Dinamik Basınç Düşümü (Pa)",
        kazanim_orani: "Geri Kazanım Oranı",
      }}
    />
  );
}
