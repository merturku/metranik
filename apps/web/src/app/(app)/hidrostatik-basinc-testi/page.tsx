"use client";

import { hidrostatikBasincTesti } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function HidrostatikBasincTestiPage() {
  return (
    <CalcPage
      module={hidrostatikBasincTesti}
      standardsLabel="ASME B31 / NFPA 13"
      description="Boru hattı çalışma basıncının üzerinde su ile basınçlandırılıp süre boyunca bekletilir; sızıntı/basınç düşüşü aranır. Gerekli test basıncı sistem tipine göre belirlenir (genel: 1.5×çalışma; NFPA 13 sprinkler: 13.8 bar veya çalışma+3.45 bar, en az 2 saat). Kriter: uygulanan basınç ≥ gerekli, süre ≥ minimum ve basınç düşüşü izin verilenin altında ise UYGUN."
      fields={[
        {
          key: "sistemTipi",
          label: "Sistem Tipi",
          type: "select",
          options: [
            { value: "genel", label: "Genel / Isıtma-Soğutma" },
            { value: "sprinkler", label: "Sprinkler (NFPA 13)" },
          ],
        },
        { key: "calismaBasinci_bar", label: "Çalışma Basıncı (bar)", type: "number", min: 0.1, step: 0.5 },
        {
          key: "uygulananTestBasinci_bar",
          label: "Uygulanan Test Basıncı (bar)",
          type: "number",
          min: 0.1,
          step: 0.5,
        },
        { key: "testSuresi_saat", label: "Test Süresi (saat)", type: "number", min: 0.1, step: 0.5 },
        {
          key: "izinVerilenDusus_bar",
          label: "İzin Verilen Düşüş (bar)",
          type: "number",
          min: 0,
          step: 0.1,
        },
        { key: "olculenDusus_bar", label: "Ölçülen Düşüş (bar)", type: "number", min: 0, step: 0.1 },
      ]}
      defaults={{
        sistemTipi: "genel",
        calismaBasinci_bar: 6,
        uygulananTestBasinci_bar: 10,
        testSuresi_saat: 2,
        izinVerilenDusus_bar: 0,
        olculenDusus_bar: 0,
      }}
      mainUnit="bar"
      mainValueKey="gerekliTestBasinci_bar"
      intermediateLabels={{
        gerekliSure_saat: "Gerekli Süre (saat)",
        basincKriteri: "Basınç Kriteri",
        sureKriteri: "Süre Kriteri",
        dususKriteri: "Düşüş Kriteri",
      }}
    />
  );
}
