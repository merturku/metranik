"use client";

import { bulonKesmeCekmeEtkilesimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BulonKesmeCekmeEtkilesimiPage() {
  return (
    <CalcPage
      module={bulonKesmeCekmeEtkilesimi}
      standardsLabel={"TS EN 1993-1-8 Tablo 3.4"}
      description={"Hem kesme hem çekme kuvveti taşıyan tek bulonda kesme dayanımı, çekme dayanımı ve birleşik etkileşim oranını kontrol eder."}
      formula={"Fv,Rd = αv·fub·A/γM2;  Ft,Rd = 0,9·fub·As/γM2;  Fv,Ed/Fv,Rd + Ft,Ed/(1,4·Ft,Rd) ≤ 1,0"}
      engineeringNote={"Kesme düzlemi dişten geçiyorsa A = As ve αv sınıfa göre (4.6/5.6/8.8: 0,6; 4.8/5.8/6.8/10.9: 0,5); gövdeden geçiyorsa A brüt kesit ve αv = 0,6 alınır. Ezilme ve zımbalama (Bp,Rd) ayrı kontrol edilir; kaldıraç etkisi (prying) dikkate alınmalıdır. γM2 = 1,25. Sürtünme tipi (öngerilmeli) birleşimler bu modülün dışındadır."}
      fields={[
        { key: "sinif", label: "Bulon Sınıfı", type: "select", options: [{ value: "4.6", label: "4.6" }, { value: "4.8", label: "4.8" }, { value: "5.6", label: "5.6" }, { value: "5.8", label: "5.8" }, { value: "6.8", label: "6.8" }, { value: "8.8", label: "8.8" }, { value: "10.9", label: "10.9" }] },
        { key: "duzlem", label: "Kesme Düzlemi", type: "select", options: [{ value: "disli", label: "Dişli kısımdan" }, { value: "govde", label: "Gövdeden (dişsiz)" }] },
        { key: "d_mm", label: "Bulon Nominal Çapı d (mm)", type: "number", step: 2, min: 6 },
        { key: "as_mm2", label: "Gerilme Alanı As (mm²)", type: "number", step: 10, min: 10 },
        { key: "fvEd_kN", label: "Bulon Başına Kesme Kuvveti Fv,Ed (kN)", type: "number", step: 5, min: 0 },
        { key: "ftEd_kN", label: "Bulon Başına Çekme Kuvveti Ft,Ed (kN)", type: "number", step: 5, min: 0 },
      ]}
      defaults={{ sinif: "8.8", duzlem: "disli", d_mm: 16, as_mm2: 157, fvEd_kN: 30, ftEd_kN: 40 }}
      mainUnit={""}
      mainValueKey={"etkilesimOrani"}
      mainDecimals={3}
      intermediateLabels={{
        fub_MPa: "fub (MPa)",
        alfa_v: "αv",
        Fv_Rd_kN: "Fv,Rd (kN)",
        Ft_Rd_kN: "Ft,Rd (kN)",
        kesme_orani: "Fv,Ed/Fv,Rd",
        cekme_orani: "Ft,Ed/(1,4·Ft,Rd)",
      }}
    />
  );
}
