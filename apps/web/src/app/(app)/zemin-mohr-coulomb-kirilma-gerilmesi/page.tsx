"use client";

import { zeminMohrCoulombKirilmaGerilmesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ZeminMohrCoulombKirilmaGerilmesiPage() {
  return (
    <CalcPage
      module={zeminMohrCoulombKirilmaGerilmesi}
      standardsLabel={"Mohr-Coulomb kırılma ölçütü"}
      description={"Zeminin kohezyon, içsel sürtünme açısı ve yanal gerilmesinden kırılmadaki düşey asal gerilmeyi, kırılma düzleminin açısını ve bu düzlemdeki gerilmeleri hesaplar; uygulanan gerilmeyle güvenlik sayısını verir."}
      formula={"Nφ = tan²(45°+φ/2);  σ1f = σ3·Nφ + 2c·√Nφ;  θ = 45°+φ/2;  τf = c + σn·tanφ"}
      engineeringNote={"Efektif gerilme parametreleri (c', φ') kullanılıyorsa gerilmeler de efektif olmalıdır; doygun killerde drenajsız (φu = 0) analiz için φ = 0 girilir. Ölçütten gelen FS yalnız bir gerilme noktası içindir, taşıma gücü veya şev stabilitesi yerine geçmez. Gerekli FS projeye/yönetmeliğe göre belirlenmelidir."}
      fields={[
        { key: "kohezyon_kPa", label: "Kohezyon c (kPa)", type: "number", step: 5, min: 0 },
        { key: "icSurtunmeAcisi_derece", label: "İçsel Sürtünme Açısı φ (°)", type: "number", step: 1, min: 0 },
        { key: "yanalGerilme_kPa", label: "Yanal (Çevre) Gerilme σ3 (kPa)", type: "number", step: 10, min: 0 },
        { key: "uygulananDusey_kPa", label: "Uygulanan Düşey Gerilme σ1 (kPa)", type: "number", step: 10, min: 1 },
        { key: "gerekliFS", label: "Gerekli Güvenlik Sayısı", type: "number", step: 0.1, min: 1 },
      ]}
      defaults={{ kohezyon_kPa: 20, icSurtunmeAcisi_derece: 30, yanalGerilme_kPa: 100, uygulananDusey_kPa: 250, gerekliFS: 1.3 }}
      mainUnit={"kPa"}
      mainValueKey={"kirilmaDuseyGerilmesi_kPa"}
      mainDecimals={1}
      intermediateLabels={{
        N_phi: "Nφ = tan²(45°+φ/2)",
        kirilma_duzlemi_acisi_derece: "Kırılma Düzlemi Açısı θ (°)",
        kirilma_duzleminde_normal_gerilme_kPa: "Kırılma Düzleminde Normal Gerilme (kPa)",
        kirilma_duzleminde_kayma_dayanimi_kPa: "Kırılma Düzleminde Kayma Gerilmesi (kPa)",
        c_artı_sigma_tanphi_kontrol_kPa: "c + σn·tanφ Kontrol (kPa)",
        guvenlik_sayisi: "Güvenlik Sayısı FS",
      }}
    />
  );
}
