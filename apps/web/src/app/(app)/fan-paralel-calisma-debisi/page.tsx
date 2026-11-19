"use client";

import { fanParalelCalismaDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function FanParalelCalismaDebisiPage() {
  return (
    <CalcPage
      module={fanParalelCalismaDebisi}
      standardsLabel={"Fan–sistem eğrisi kesişimi (afinite/paralel çalışma)"}
      description={"Özdeş fanların paralel çalışmasında fan eğrisi (ΔP = A + Bq + Cq²) ile sistem eğrisi (ΔP = kQ²) kesişiminden toplam debiyi, fan başına debiyi ve tek fana göre debi artışını hesaplar."}
      formula={"(C − k·n²)·q² + B·q + A = 0;  Q = n·q;  ΔP = k·Q²"}
      engineeringNote={"Paralel çalışmada debi fan adedi kadar katlanmaz; sistem direnci arttıkça kazanım azalır (testteki örnekte 2 fan ≈ ×1,58). Fan eğrisi katsayıları üretici eğrisinden 2. dereceden uydurma ile alınmalıdır ve eğrinin stall (dengesiz) bölgesinin dışında kalınmalıdır. Fanlar özdeş ve geri tepme damperli varsayılır. Pompa Paralel Çalışma modülünün hava tarafı karşılığıdır."}
      fields={[
        { key: "A_Pa", label: "Fan Eğrisi A (Pa, kapalı basma)", type: "number", step: 50, min: 1 },
        { key: "B_Pa_per_m3s", label: "Fan Eğrisi B (Pa/(m³/s))", type: "number", step: 50, min: -100000 },
        { key: "C_Pa_per_m3s2", label: "Fan Eğrisi C (Pa/(m³/s)²)", type: "number", step: 50, min: -1000000 },
        { key: "sistemK_Pa_per_m3s2", label: "Sistem Direnç Katsayısı k (Pa/(m³/s)²)", type: "number", step: 10, min: 0.01 },
        { key: "fanAdedi", label: "Paralel Fan Adedi", type: "number", step: 1, min: 1 },
      ]}
      defaults={{ A_Pa: 1000, B_Pa_per_m3s: 0, C_Pa_per_m3s2: -2000, sistemK_Pa_per_m3s2: 500, fanAdedi: 2 }}
      mainUnit={"m³/s"}
      mainValueKey={"toplamDebi_m3s"}
      mainDecimals={3}
      intermediateLabels={{
        fan_basina_debi_m3s: "Fan Başına Debi (m³/s)",
        toplam_debi_m3h: "Toplam Debi (m³/h)",
        sistem_basinci_Pa: "Çalışma Basıncı (Pa)",
        tek_fan_debisi_m3s: "Tek Fan Debisi (m³/s)",
        debi_artis_orani: "Debi Artış Oranı (×)",
        fan_egrisi_kontrol_Pa: "Fan Eğrisi Kontrol (Pa)",
        uyari: "Uyarı",
      }}
    />
  );
}
