"use client";

import { istinatDuvariYanalBasincSurjTabanSuyu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IstinatDuvariYanalBasincSurjTabanSuyuPage() {
  return (
    <CalcPage
      module={istinatDuvariYanalBasincSurjTabanSuyu}
      standardsLabel={"Rankine yanal toprak basıncı"}
      description={"Rankine teorisiyle, sürşarj yükü ve taban suyu seviyesi dahil, istinat duvarına etkiyen toplam yanal itmeyi, tabana göre momentini ve bileşkenin etki yüksekliğini hesaplar."}
      formula={"Ka = tan²(45° − φ/2);  σa = Ka(q + γ·z) + u;  P = Σ parça kuvvetleri,  ȳ = ΣM/P"}
      engineeringNote={"Kohezyonsuz zemin (c = 0), düşey duvar sırtı, yatay yüzey ve sürtünmesiz duvar varsayılır (Rankine). Taban suyu altında etkin gerilme için batık birim ağırlık γ' = γsat − γw ve ayrıca tam hidrostatik basınç eklenir. Sürşarj sonsuz yayılı kabul edilir; şerit/nokta yükler için dağılım farklıdır. Çıkan P ve ȳ, Devrilme ve Kayma Güvenliği modüllerinin girdileridir; deprem etkisi (Mononobe-Okabe) bu modülde yoktur."}
      fields={[
        { key: "yukseklik_m", label: "Duvar Yüksekliği H (m)", type: "number", step: 0.5, min: 0.1 },
        { key: "birimAgirlik_kNm3", label: "Zemin Birim Ağırlığı γ (kN/m³)", type: "number", step: 0.5, min: 1 },
        { key: "batikBirimAgirlik_kNm3", label: "Doygun Birim Ağırlık γsat (kN/m³)", type: "number", step: 0.5, min: 10 },
        { key: "phi_deg", label: "İçsel Sürtünme Açısı φ (°)", type: "number", step: 1, min: 1 },
        { key: "surj_kPa", label: "Sürşarj Yükü q (kPa)", type: "number", step: 5, min: 0 },
        { key: "suDerinligi_m", label: "Taban Suyu Derinliği (taban üzerinden, m)", type: "number", step: 0.5, min: 0 },
      ]}
      defaults={{ yukseklik_m: 5, birimAgirlik_kNm3: 18, batikBirimAgirlik_kNm3: 20, phi_deg: 30, surj_kPa: 10, suDerinligi_m: 0 }}
      mainUnit={"kN/m"}
      mainValueKey={"toplamItme_kNm"}
      mainDecimals={2}
      intermediateLabels={{
        ka: "Aktif Basınç Katsayısı Ka",
        etki_yuksekligi_m: "Bileşke Etki Yüksekliği (m)",
        devirme_momenti_kNm_m: "Tabana Göre Moment (kN·m/m)",
        surj_itmesi_kNm: "Sürşarj İtmesi (kN/m)",
        su_itmesi_kNm: "Hidrostatik İtme (kN/m)",
        tabanda_basinc_kPa: "Tabandaki Yanal Basınç (kPa)",
      }}
    />
  );
}
