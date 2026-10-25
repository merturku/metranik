"use client";

import { pompaIsletmeNoktasi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PompaIsletmeNoktasiPage() {
  return (
    <CalcPage
      module={pompaIsletmeNoktasi}
      standardsLabel="Pompa–Sistem Eğrisi"
      description="Üretici pompa eğrisinden okunan üç nokta ile sistemin statik yüksekliği ve tasarım noktasından pompanın gerçek işletme noktasını (debi ve basma yüksekliği) bulur; tam tasarım noktası için gereken devir oranını hesaplar."
      formula="Hp = A + B·Q + C·Q²,   Hs = Hst + b·Q²,  b = (Hd − Hst)/Qd²,   Hp(Q) = Hs(Q),   A·r² + B·Qd·r + C·Qd² = Hd"
      engineeringNote="Pompa eğrisi girilen üç noktadan ikinci derece polinomla geçirilir; noktaları üretici eğrisinin çalışma aralığına yayın (kapama, tasarım civarı ve yüksek debi). Sistem eğrisi tam türbülanslı akış varsayar (kayıp ∝ Q²). Pompa tasarımdan fazla debi veriyorsa vana kısma yerine devir düşürme (frekans konvertörü) enerji tasarrufu sağlar; r afinite yasalarıyla bulunur. Kapalı devre ısıtma/soğutma sistemlerinde statik yükseklik sıfırdır. NPSH kontrolünü ayrıca yapın."
      fields={[
        { key: "kapamaBasmaYuksekligi_H0_m", label: "Kapama Basma Yüksekliği H0 (m, Q = 0)", type: "number", min: 0.1, step: 1 },
        { key: "egriNokta2Debi_m3h", label: "Eğri 2. Nokta Debi (m³/h)", type: "number", min: 0.1, step: 1 },
        { key: "egriNokta2Basma_m", label: "Eğri 2. Nokta Basma (m)", type: "number", min: 0, step: 0.5 },
        { key: "egriNokta3Debi_m3h", label: "Eğri 3. Nokta Debi (m³/h)", type: "number", min: 0.1, step: 1 },
        { key: "egriNokta3Basma_m", label: "Eğri 3. Nokta Basma (m)", type: "number", min: 0, step: 0.5 },
        { key: "statikYukseklik_Hst_m", label: "Sistem Statik Yüksekliği Hst (m)", type: "number", min: 0, step: 1 },
        { key: "tasarimDebisi_Qd_m3h", label: "Tasarım Debisi Qd (m³/h)", type: "number", min: 0.1, step: 1 },
        { key: "tasarimBasmaYuksekligi_Hd_m", label: "Tasarım Basma Yüksekliği Hd (m)", type: "number", min: 0.1, step: 0.5 },
      ]}
      defaults={{
        kapamaBasmaYuksekligi_H0_m: 40,
        egriNokta2Debi_m3h: 50,
        egriNokta2Basma_m: 32.5,
        egriNokta3Debi_m3h: 80,
        egriNokta3Basma_m: 18.4,
        statikYukseklik_Hst_m: 10,
        tasarimDebisi_Qd_m3h: 60,
        tasarimBasmaYuksekligi_Hd_m: 28,
      }}
      mainUnit="m³/h (işletme)"
      mainValueKey="isletmeDebisi_m3h"
      mainDecimals={1}
      intermediateLabels={{
        pompa_egrisi_B: "Pompa Eğrisi Katsayısı B",
        pompa_egrisi_C: "Pompa Eğrisi Katsayısı C",
        sistem_direnc_katsayisi_b: "Sistem Direnç Katsayısı b",
        isletme_basma_yuksekligi_m: "İşletme Basma Yüksekliği (m)",
        tasarim_icin_devir_orani_r: "Tasarım Noktası İçin Devir Oranı n2/n1",
      }}
    />
  );
}
