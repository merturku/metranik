"use client";

import { pompaParalelCalisma } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PompaParalelCalismaPage() {
  return (
    <CalcPage
      module={pompaParalelCalisma}
      standardsLabel="ISO 9906 — pompa eğri verisi"
      description="Aynı n pompanın paralel çalışmasında sistem eğrisiyle kesişen toplam debiyi ve basma yüksekliğini bulur; tek pompaya göre debi kazancını gösterir."
      formula="Pompa: H = A + B·q + C·q²;  Sistem: H = Hst + k·(n·q)²;  (C − k·n²)·q² + B·q + (A − Hst) = 0;  Q = n·q"
      engineeringNote="Paralel çalışmada debi n katına çıkmaz; sistem eğrisi diktir ve kazanç düşer (debi artış oranı n'den küçüktür). A, B, C üretici eğrisinden alınır (Pompa İşletme Noktası modülüyle 3 noktadan bulunabilir). Pompalar aynı ve aynı devirde varsayılır; yedek pompa varsa n'e dahil etmeyin."
      fields={[
        { key: "pompaA_m", label: "Pompa Eğrisi A — Kapalı Vana Yüksekliği (m)", type: "number", step: 0.1, min: 0.1 },
        { key: "pompaB", label: "Pompa Eğrisi B (m/(m³/h))", type: "number", step: 0.01 },
        { key: "pompaC", label: "Pompa Eğrisi C (m/(m³/h)²)", type: "number", step: 0.001 },
        { key: "statikYuk_m", label: "Statik Yük Hst (m)", type: "number", step: 0.1, min: 0 },
        { key: "sistemK", label: "Sistem Direnç Katsayısı k (m/(m³/h)²)", type: "number", step: 0.001, min: 0 },
        { key: "pompaSayisi", label: "Paralel Pompa Sayısı n", type: "number", step: 1, min: 1 },
      ]}
      defaults={{ pompaA_m: 50, pompaB: 0, pompaC: -0.2, statikYuk_m: 10, sistemK: 0.05, pompaSayisi: 2 }}
      mainUnit="m³/h"
      mainValueKey="toplamDebi_m3h"
      mainDecimals={2}
      intermediateLabels={{
        pompa_basina_debi_m3h: "Pompa Başına Debi (m³/h)",
        calisma_basma_yuksekligi_m: "Çalışma Basma Yüksekliği (m)",
        tek_pompa_debisi_m3h: "Tek Pompa Debisi (m³/h)",
        debi_artis_orani: "Debi Artış Oranı (Q / Q₁)",
        n_kati_debinin_yuzdesi: "n Katı Debiye Göre (%)",
      }}
    />
  );
}
