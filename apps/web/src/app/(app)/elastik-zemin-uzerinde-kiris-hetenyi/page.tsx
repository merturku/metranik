"use client";

import { elastikZeminUzerindeKirisHetenyi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ElastikZeminUzerindeKirisHetenyiPage() {
  return (
    <CalcPage
      module={elastikZeminUzerindeKirisHetenyi}
      standardsLabel={"Hetényi (Winkler modeli)"}
      description={"Winkler (yatak katsayılı) zemin üzerindeki kirişte tekil yük altındaki maksimum çökme, eğilme momenti ve zemin gerilmesini hesaplar; kiriş boyuna göre sonsuz kiriş kabulünün geçerliliğini kontrol eder."}
      formula={"λ = (ks·b / 4EI)^¼;  y0 = P·λ / (2·ks·b);  M0 = P / (4λ);  q0 = ks·y0;  uzun kiriş: λL ≥ π"}
      engineeringNote={"Sonsuz uzun kiriş, kiriş orta bölgesinde tekil yük kabulüdür; λL < π ise uç etkisi (kısa kiriş çözümü) devreye girer, λL < π/4 ise kiriş rijit sayılır ve zemin tepkisi doğrusal dağılır. Yatak katsayısı ks zemin cinsine, temel boyutuna ve yük süresine göre değişen yaklaşık bir parametredir; Zemin Yatak Katsayısı modülüyle ölçek düzeltmesi yapılabilir. Zemin çekme almaz varsayımı (kaldırma) kontrol edilmez. Radye temel ve sürekli temel kirişi ön boyutlandırması içindir."}
      fields={[
        { key: "E_MPa", label: "Beton Elastisite Modülü E (MPa)", type: "number", step: 1000, min: 1 },
        { key: "I_cm4", label: "Atalet Momenti I (cm⁴)", type: "number", step: 10000, min: 1 },
        { key: "genislik_b_m", label: "Kiriş (Temel) Genişliği b (m)", type: "number", step: 0.05, min: 0.05 },
        { key: "yatakKatsayisi_ks_kNm3", label: "Yatak Katsayısı ks (kN/m³)", type: "number", step: 1000, min: 1 },
        { key: "yuk_P_kN", label: "Tekil Yük P (kN)", type: "number", step: 10, min: 0 },
        { key: "kirisBoyu_L_m", label: "Kiriş Boyu L (m)", type: "number", step: 0.5, min: 0.1 },
      ]}
      defaults={{ E_MPa: 30000, I_cm4: 720000, genislik_b_m: 0.4, yatakKatsayisi_ks_kNm3: 20000, yuk_P_kN: 500, kirisBoyu_L_m: 20 }}
      mainUnit={"kNm"}
      mainValueKey={"maksimumMoment_kNm"}
      mainDecimals={1}
      intermediateLabels={{
        EI_kNm2: "Eğilme Rijitliği EI (kNm²)",
        lambda_1m: "λ (1/m)",
        karakteristik_uzunluk_m: "Karakteristik Uzunluk 1/λ (m)",
        maks_cokme_mm: "Maksimum Çökme (mm)",
        maks_zemin_gerilmesi_kPa: "Maksimum Zemin Gerilmesi (kPa)",
        lambda_L: "λL",
      }}
    />
  );
}
