"use client";

import { eulerKritikBurkulmaYuku } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EulerKritikBurkulmaYukuPage() {
  return (
    <CalcPage
      module={eulerKritikBurkulmaYuku}
      standardsLabel="Euler burkulma teorisi"
      description="Merkezi basınçlı elemanın ideal elastik kritik burkulma yükünü, kritik gerilmesini ve narinliğini hesaplar; Euler'in geçerli olup olmadığını gösterir."
      formula="Ncr = π²·E·I/(k·L)²;  σcr = Ncr/A;  λ = k·L/i,  i = √(I/A)"
      engineeringNote="k etkin boy katsayısıdır: iki ucu mafsallı 1,0; ankastre–serbest 2,0; ankastre–mafsallı 0,7; iki ucu ankastre 0,5. İdeal elastik değerdir; σcr > fy ise Euler geçerli değildir (akma belirler). Gerçek tasarım için geometrik kusurlu Çelik Basınç Elemanı Burkulma Dayanımı modülünü kullanın."
      fields={[
        { key: "elastisiteModulu_GPa", label: "Elastisite Modülü E (GPa)", type: "number", step: 1, min: 1 },
        { key: "atalet_mm4", label: "Atalet Momenti I (mm⁴)", type: "number", step: 100000, min: 1 },
        { key: "alan_mm2", label: "Kesit Alanı A (mm²)", type: "number", step: 10, min: 1 },
        { key: "boy_m", label: "Eleman Boyu L (m)", type: "number", step: 0.1, min: 0.1 },
        { key: "boyKatsayisi_k", label: "Etkin Boy Katsayısı k", type: "number", step: 0.1, min: 0.1 },
        { key: "akmaDayanimi_MPa", label: "Akma Dayanımı fy (MPa)", type: "number", step: 5, min: 1 },
      ]}
      defaults={{ elastisiteModulu_GPa: 210, atalet_mm4: 13360000, alan_mm2: 5383, boy_m: 3, boyKatsayisi_k: 1, akmaDayanimi_MPa: 355 }}
      mainUnit="kN"
      mainValueKey="kritikYuk_kN"
      mainDecimals={0}
      intermediateLabels={{
        etkin_boy_mm: "Etkin Boy (mm)",
        atalet_yaricapi_mm: "Atalet Yarıçapı i (mm)",
        narinlik_lambda: "Narinlik λ",
        kritik_gerilme_MPa: "Kritik Gerilme σcr (MPa)",
        euler_gecerlilik_siniri_lambda: "Euler Geçerlilik Sınırı λ",
        euler_gecerli_mi: "Euler Geçerli mi?",
      }}
    />
  );
}
