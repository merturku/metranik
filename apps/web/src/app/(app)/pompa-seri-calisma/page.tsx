"use client";

import { pompaSeriCalisma } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PompaSeriCalismaPage() {
  return (
    <CalcPage
      module={pompaSeriCalisma}
      standardsLabel="Pompa–sistem eğrisi"
      description="Aynı n pompanın seri çalışmasında sistem eğrisiyle kesişen debiyi ve toplam basma yüksekliğini hesaplar; tek pompaya göre debi artışını gösterir."
      formula="Pompa: H = n·(A + B·Q + C·Q²);  Sistem: H = Hst + k·Q²;  (n·C − k)·Q² + n·B·Q + (n·A − Hst) = 0"
      engineeringNote="Seri bağlantıda aynı debide yükler toplanır; yüksek basınç, düşük debi gereken sistemlerde kullanılır. İkinci pompanın gövde basınç sınıfı ve salmastrası toplam basınca dayanmalıdır. Pompaların Paralel Çalışma Debisi modülünün tamamlayıcısıdır. A, B, C üretici eğrisinden alınır."
      fields={[
        { key: "pompaA_m", label: "Pompa Eğrisi A — Kapalı Vana Yüksekliği (m)", type: "number", step: 0.1, min: 0.1 },
        { key: "pompaB", label: "Pompa Eğrisi B (m/(m³/h))", type: "number", step: 0.01 },
        { key: "pompaC", label: "Pompa Eğrisi C (m/(m³/h)²)", type: "number", step: 0.001 },
        { key: "statikYuk_m", label: "Statik Yük Hst (m)", type: "number", step: 0.1, min: 0 },
        { key: "sistemK", label: "Sistem Direnç Katsayısı k (m/(m³/h)²)", type: "number", step: 0.001, min: 0 },
        { key: "pompaSayisi", label: "Seri Pompa Sayısı n", type: "number", step: 1, min: 1 },
      ]}
      defaults={{ pompaA_m: 50, pompaB: 0, pompaC: -0.2, statikYuk_m: 10, sistemK: 0.05, pompaSayisi: 2 }}
      mainUnit="m³/h"
      mainValueKey="debi_m3h"
      mainDecimals={2}
      intermediateLabels={{
        toplam_basma_yuksekligi_m: "Toplam Basma Yüksekliği (m)",
        pompa_basina_yukseklik_m: "Pompa Başına Yükseklik (m)",
        tek_pompa_debisi_m3h: "Tek Pompa Debisi (m³/h)",
        debi_artis_orani: "Debi Artış Oranı (Q / Q₁)",
        toplam_basinc_bar: "Toplam Basınç (bar)",
        not: "Not",
      }}
    />
  );
}
