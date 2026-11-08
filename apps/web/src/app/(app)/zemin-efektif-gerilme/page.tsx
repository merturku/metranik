"use client";

import { zeminEfektifGerilme } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ZeminEfektifGerilmePage() {
  return (
    <CalcPage
      module={zeminEfektifGerilme}
      standardsLabel="Terzaghi efektif gerilme ilkesi"
      description="Belirli derinlikte toplam düşey gerilmeyi, boşluk suyu basıncını ve efektif düşey gerilmeyi yeraltı su seviyesine göre hesaplar."
      formula="σv = γ·min(z,zw) + γsat·max(z−zw,0);  u = γw·max(z−zw,0);  σ'v = σv − u"
      engineeringNote="Tek homojen tabaka; su tablası üstünde doğal birim hacim ağırlık, altında doygun ağırlık kullanılır; kılcal yükselme ihmal edilir. Çok tabakalı profilde her tabakayı ayrı hesaplayıp toplayın. Taşıma gücü, oturma ve toprak basıncı modüllerinin σ'v girdisini üretir."
      fields={[
        { key: "derinlik_z_m", label: "Derinlik z (m)", type: "number", step: 0.5, min: 0.1 },
        { key: "suTablasiDerinligi_zw_m", label: "Su Tablası Derinliği zw (m)", type: "number", step: 0.5, min: 0 },
        { key: "dogalBirimHacimAgirlik_kNm3", label: "Doğal Birim Hacim Ağırlık γ (kN/m³)", type: "number", step: 0.5, min: 1 },
        { key: "doygunBirimHacimAgirlik_kNm3", label: "Doygun Birim Hacim Ağırlık γsat (kN/m³)", type: "number", step: 0.5, min: 1 },
      ]}
      defaults={{ derinlik_z_m: 6, suTablasiDerinligi_zw_m: 2, dogalBirimHacimAgirlik_kNm3: 17, doygunBirimHacimAgirlik_kNm3: 19 }}
      mainUnit="kPa"
      mainValueKey="efektifGerilme_kPa"
      mainDecimals={2}
      intermediateLabels={{
        toplam_dusey_gerilme_kPa: "Toplam Düşey Gerilme (kPa)",
        bosluk_suyu_basinci_kPa: "Boşluk Suyu Basıncı (kPa)",
        batik_bolge_kalinligi_m: "Batık Bölge Kalınlığı (m)",
        batik_birim_hacim_agirligi_kNm3: "Batık Birim Hacim Ağırlığı (kN/m³)",
      }}
    />
  );
}
