"use client";

import { chillerIplv } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ChillerIplvPage() {
  return (
    <CalcPage
      module={chillerIplv}
      standardsLabel="AHRI Std 550/590"
      description="Soğutma grubunun (chiller) %100, %75, %50 ve %25 yükteki COP değerlerinden, AHRI 550/590'ın kısmi yük ağırlıklarıyla bütünleşik kısmi yük değerini (IPLV) hesaplar; EER ve kW/TR karşılığını da verir."
      formula="IPLV = 0,01·A + 0,42·B + 0,45·C + 0,12·D   (A, B, C, D = %100, %75, %50, %25 yükteki COP)"
      engineeringNote="Ağırlıklar, ABD'deki tipik bina yük profili ve iklim dağılımından türetilmiş standart katsayılardır; gerçek projenin yük dağılımı farklıysa yıllık enerji hesabı (saatlik simülasyon) gerekir. Standart değerlendirme koşullarında su soğutmalı gruplarda yoğuşturucu giriş suyu yüke göre 29,4 / 23,9 / 18,3 / 18,3 °C'dir (ARI 550/590 güncel sürümünden teyit edin). COP değerleri üreticinin sertifikalı verisinden alınmalıdır; farklı sürümlerin IPLV değerleri doğrudan karşılaştırılmamalıdır. Hava soğutmalı gruplarda aynı formül kullanılır, ancak yoğuşturucu hava giriş sıcaklıkları farklıdır."
      fields={[
        { key: "cop100", label: "COP — %100 Yük (A)", type: "number", min: 0.5, step: 0.1 },
        { key: "cop75", label: "COP — %75 Yük (B)", type: "number", min: 0.5, step: 0.1 },
        { key: "cop50", label: "COP — %50 Yük (C)", type: "number", min: 0.5, step: 0.1 },
        { key: "cop25", label: "COP — %25 Yük (D)", type: "number", min: 0.5, step: 0.1 },
      ]}
      defaults={{ cop100: 5.0, cop75: 5.5, cop50: 6.0, cop25: 6.5 }}
      mainUnit="COP (IPLV)"
      mainValueKey="iplv_COP"
      mainDecimals={2}
      intermediateLabels={{
        agirlik_toplami: "Ağırlıklar Toplamı",
        iplv_EER: "IPLV (EER, Btu/Wh)",
        iplv_kW_per_TR: "IPLV (kW/TR)",
        tam_yuk_COP: "Tam Yük COP",
        iplv_tam_yuk_orani: "IPLV / Tam Yük COP",
      }}
    />
  );
}
