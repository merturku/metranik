"use client";

import { donatiKenetlenmeBoyu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DonatiKenetlenmeBoyuPage() {
  return (
    <CalcPage
      module={donatiKenetlenmeBoyu}
      standardsLabel="TS 500 / TBDY 2018"
      description="Donatı çapına, beton ve çelik dayanımına göre gerekli kenetlenme (bindirme) boyunu hesaplar."
      formula="lb = (φ/4) × (fyd/fbd), fbd = 0.35√fck/γc × η"
      engineeringNote="Pozisyon katsayısı η, donatının döküm sırasındaki konumuna göre TS 500'den alınır (iyi konum 1.0, kötü konum ~0.7)."
      fields={[
        {
          key: "betonKarakteristikDayanim_fck_MPa",
          label: "Beton Karakteristik Dayanımı fck (MPa)",
          type: "number",
          min: 1,
          step: 1,
        },
        {
          key: "celikAkmaDayanimi_fyk_MPa",
          label: "Çelik Akma Dayanımı fyk (MPa)",
          type: "number",
          min: 1,
          step: 10,
        },
        { key: "donatiCapi_mm", label: "Donatı Çapı φ (mm)", type: "number", min: 4, step: 1 },
        {
          key: "pozisyonKatsayisi_eta",
          label: "Pozisyon Katsayısı η (0.7-1.0)",
          type: "number",
          min: 0.1,
          step: 0.05,
        },
      ]}
      defaults={{
        betonKarakteristikDayanim_fck_MPa: 25,
        celikAkmaDayanimi_fyk_MPa: 420,
        donatiCapi_mm: 16,
        pozisyonKatsayisi_eta: 1.0,
      }}
      mainUnit="mm"
      mainValueKey="kenetlenmeBoyu_mm"
      intermediateLabels={{
        celikHesapDayanimi_fyd_MPa: "Çelik Hesap Dayanımı (fyd, MPa)",
        aderansGerilmesi_fbd_MPa: "Aderans Gerilmesi (fbd, MPa)",
      }}
    />
  );
}
