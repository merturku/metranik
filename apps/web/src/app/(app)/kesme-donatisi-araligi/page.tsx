"use client";

import { kesmeDonatisiAraligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KesmeDonatisiAraligiPage() {
  return (
    <CalcPage
      module={kesmeDonatisiAraligi}
      standardsLabel="TS 500"
      description="Betonun karşılayamadığı kesme kuvvetinden (Vs=Vu-Vc), klasik etriye denklemiyle gerekli etriye aralığını hesaplar. Beton kesme kapasitesi (Vc), Kesme Kuvveti Kapasitesi modülünden alınabilir."
      formula="Vs = Vu-Vc, s = Av×fyd×d/Vs"
      engineeringNote="Av, etriyenin toplam kesit alanıdır (örn 2 kollu Φ8 için ~2×50.3mm²). Bu modül Vu>Vc olduğunu varsayar; Vu≤Vc ise beton tek başına yeterlidir ve TS 500'ün öngördüğü minimum etriye aralığı ayrıca uygulanmalıdır."
      fields={[
        {
          key: "tasarimKesmeKuvveti_Vu_kN",
          label: "Tasarım Kesme Kuvveti Vu (kN)",
          type: "number",
          min: 1,
          step: 5,
        },
        {
          key: "betonKesmeKapasitesi_Vc_kN",
          label: "Beton Kesme Kapasitesi Vc (kN)",
          type: "number",
          min: 1,
          step: 5,
        },
        {
          key: "etriyeKesitAlani_Av_mm2",
          label: "Etriye Kesit Alanı Av (mm²)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "celikAkmaDayanimi_fyk_MPa",
          label: "Çelik Akma Dayanımı fyk (MPa)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "faydaliYukseklik_d_mm",
          label: "Faydalı Yükseklik d (mm)",
          type: "number",
          min: 1,
          step: 10,
        },
      ]}
      defaults={{
        tasarimKesmeKuvveti_Vu_kN: 150,
        betonKesmeKapasitesi_Vc_kN: 80,
        etriyeKesitAlani_Av_mm2: 100,
        celikAkmaDayanimi_fyk_MPa: 420,
        faydaliYukseklik_d_mm: 450,
      }}
      mainUnit="mm"
      mainValueKey="gerekliAralik_s_mm"
      mainDecimals={1}
      intermediateLabels={{
        celikHesapDayanimi_fyd_MPa: "Çelik Hesap Dayanımı fyd (MPa)",
        celigeDusenKesme_Vs_kN: "Çeliğe Düşen Kesme Vs (kN)",
      }}
    />
  );
}
