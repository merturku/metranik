"use client";

import { boruEtKalinligiBarlow } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BoruEtKalinligiBarlowPage() {
  return (
    <CalcPage
      module={boruEtKalinligiBarlow}
      standardsLabel="Barlow Formülü"
      description="İç basınca, boru dış çapına ve izin verilen gerilmeye göre gerekli minimum boru et kalınlığını hesaplar."
      formula="t = P·D / (2·S)"
      engineeringNote="İzin verilen gerilme (S) malzemenin akma dayanımından güvenlik katsayısıyla bölünerek elde edilir; hesaplanan minimum kalınlık standart schedule tablosundan bir üst değere yuvarlanmalıdır."
      fields={[
        { key: "icBasinc_P_MPa", label: "İç Basınç P (MPa)", type: "number", min: 0.01, step: 0.1 },
        { key: "disCap_D_mm", label: "Dış Çap D (mm)", type: "number", min: 1, step: 1 },
        {
          key: "izinVerilenGerilme_S_MPa",
          label: "İzin Verilen Gerilme S (MPa)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{ icBasinc_P_MPa: 1.6, disCap_D_mm: 114.3, izinVerilenGerilme_S_MPa: 100 }}
      mainUnit="mm"
      mainValueKey="minimumEtKalinligi_mm"
      mainDecimals={4}
      intermediateLabels={{ izinVerilenGerilme_S_MPa: "İzin Verilen Gerilme (MPa)" }}
    />
  );
}
