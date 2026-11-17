"use client";

import { trapezKanalManningNormalDerinlik } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TrapezKanalManningNormalDerinlikPage() {
  return (
    <CalcPage
      module={trapezKanalManningNormalDerinlik}
      standardsLabel={"Manning denklemi"}
      description={"Verilen debi, taban genişliği, şev eğimi, pürüzlülük ve boy eğimi için trapez kesitli açık kanalda üniform akış (normal) derinliğini, hızı ve Froude sayısını hesaplar."}
      formula={"Q = (1/n)·A·R^(2/3)·S^(1/2);  A = (b + z·y)·y;  P = b + 2y√(1+z²);  Fr = V/√(g·A/T)"}
      engineeringNote={"Derinlik, Manning debisi Q(y) monoton olduğundan ikiye bölme ile çözülür. Fr < 1 alt-kritik (nehir), Fr > 1 üst-kritik (sel) rejimdir; Fr ≈ 1'de akış kararsızdır. Şev eğimi z = yatay/düşey. n değerleri kaplama cinsine göre tablodan alınmalıdır (örn. beton ≈ 0,013–0,017)."}
      fields={[
        { key: "q_m3s", label: "Debi Q (m³/s)", type: "number", step: 0.5, min: 0.001 },
        { key: "b_m", label: "Taban Genişliği b (m)", type: "number", step: 0.1, min: 0 },
        { key: "z", label: "Şev Eğimi z (yatay/düşey)", type: "number", step: 0.25, min: 0 },
        { key: "n", label: "Manning Pürüzlülük n", type: "number", step: 0.001, min: 0.005 },
        { key: "s", label: "Boy Eğimi S (m/m)", type: "number", step: 0.0005, min: 1e-05 },
      ]}
      defaults={{ q_m3s: 5.390262662974859, b_m: 2, z: 1.5, n: 0.015, s: 0.001 }}
      mainUnit={"m"}
      mainValueKey={"normalDerinlik_m"}
      mainDecimals={3}
      intermediateLabels={{
        hiz_ms: "Ortalama Hız (m/s)",
        alan_m2: "Islak Alan (m²)",
        hidrolik_yaricap_m: "Hidrolik Yarıçap (m)",
        froude: "Froude Sayısı",
        rejim: "Akış Rejimi",
      }}
    />
  );
}
