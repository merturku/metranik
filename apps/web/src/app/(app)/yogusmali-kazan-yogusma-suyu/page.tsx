"use client";

import { yogusmaliKazanYogusmaSuyu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YogusmaliKazanYogusmaSuyuPage() {
  return (
    <CalcPage
      module={yogusmaliKazanYogusmaSuyu}
      standardsLabel="Stokiyometrik yanma"
      description="Doğalgaz tüketiminden yanma ürünü su miktarını ve yoğuşmalı kazanda yoğuşan kısmı ile gizli ısı geri kazanımını hesaplar."
      formula="CH₄ + 2O₂ → CO₂ + 2H₂O;  m_su = V̇·1,6075 kg/Nm³·f"
      engineeringNote="Teorik su üretimi saf metan içindir (gerçek doğalgazda biraz farklıdır; katsayı girdidir). Yoğuşan kesir f dönüş suyu sıcaklığına ve fazla havaya bağlıdır (dönüş suyu 30–40 °C'de yaklaşık 0,3–0,5; çiy noktası ≈ 55–59 °C). Yoğuşma suyu asidiktir (pH 3–5); atık su bağlantısı için nötralizasyon koşullarını yerel yönetmelikten kontrol edin."
      fields={[
        { key: "yakitDebisi_Nm3h", label: "Doğalgaz Debisi (Nm³/h)", type: "number", step: 1, min: 0.1 },
        { key: "birimSuUretimi_kgNm3", label: "Birim Su Üretimi (kg/Nm³)", type: "number", step: 0.01, min: 0.1 },
        { key: "yogusanKesir", label: "Yoğuşan Kesir (0–1)", type: "number", step: 0.05, min: 0 },
      ]}
      defaults={{ yakitDebisi_Nm3h: 100, birimSuUretimi_kgNm3: 1.6075, yogusanKesir: 0.4 }}
      mainUnit="kg/h"
      mainValueKey="yogusmaSuyu_kgh"
      mainDecimals={1}
      intermediateLabels={{
        yanma_suyu_toplam_kgh: "Toplam Yanma Suyu (kg/h)",
        yogusan_su_Lh: "Yoğuşan Su (L/h)",
        yogusmayan_su_kgh: "Yoğuşmayan Su (kg/h)",
        gizli_isi_geri_kazanimi_kW: "Gizli Isı Geri Kazanımı (kW)",
        teorik_metan_birim_su_kgNm3: "Teorik Metan Birim Su (kg/Nm³)",
      }}
    />
  );
}
