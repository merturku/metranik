"use client";

import { istinatDuvariAktifToprakBasinci } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IstinatDuvariAktifToprakBasinciPage() {
  return (
    <CalcPage
      module={istinatDuvariAktifToprakBasinci}
      standardsLabel="Rankine Aktif Toprak Basıncı Teorisi"
      description="Zeminin birim hacim ağırlığı, duvar yüksekliği ve içsel sürtünme açısına göre istinat duvarına etkiyen toplam aktif toprak itkisini hesaplar."
      formula="Ka = tan²(45° - φ/2), Pa = 0.5×γ×H²×Ka"
      engineeringNote="Kohezyonsuz zemin, yatay dolgu yüzeyi ve sürtünmesiz duvar arkası varsayan klasik Rankine çözümüdür; sürşarj yükü, eğimli dolgu veya duvar sürtünmesi varsa Coulomb yöntemi veya ek terimler gerekir. İtki, taban yüzeyinden H/3 yükseklikte etkir."
      fields={[
        {
          key: "birimHacimAgirlik_gamma_kNm3",
          label: "Birim Hacim Ağırlık γ (kN/m³)",
          type: "number",
          min: 10,
          step: 0.5,
        },
        {
          key: "duvarYuksekligi_H_m",
          label: "Duvar Yüksekliği H (m)",
          type: "number",
          min: 0.5,
          step: 0.5,
        },
        {
          key: "icselSurtunmeAcisi_phi_derece",
          label: "İçsel Sürtünme Açısı φ (°)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{
        birimHacimAgirlik_gamma_kNm3: 18,
        duvarYuksekligi_H_m: 4,
        icselSurtunmeAcisi_phi_derece: 30,
      }}
      mainUnit="kN/m"
      mainValueKey="aktifItki_Pa_kNm"
      intermediateLabels={{
        aktifToprakBasincKatsayisi_Ka: "Aktif Toprak Basınç Katsayısı (Ka)",
        uygulamaNoktasi_tabandanYukseklik_m: "Uygulama Noktası, Tabandan Yükseklik (m)",
      }}
    />
  );
}
