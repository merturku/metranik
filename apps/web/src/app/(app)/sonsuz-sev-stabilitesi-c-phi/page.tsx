"use client";

import { sonsuzSevStabilitesiCPhi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SonsuzSevStabilitesiCPhiPage() {
  return (
    <CalcPage
      module={sonsuzSevStabilitesiCPhi}
      standardsLabel={"Sonsuz şev analizi (Skempton & DeLory / Das)"}
      description={"Şev yüzeyine paralel kayma düzleminde kohezyon, sürtünme ve gözenek suyu basıncını dikkate alarak sonsuz şevin güvenlik sayısını hesaplar; kohezyonsuz kuru şev çözümüyle karşılaştırır."}
      formula={"FS = [c′ + (γ·z·cos²β − u)·tanφ′] / (γ·z·sinβ·cosβ);  u = ru·γ·z"}
      engineeringNote={"Sonsuz şev, kayma derinliğinin şev boyuna göre çok küçük olduğu yüzeysel kaymalar içindir; dairesel/derin kaymalar için dilim yöntemi gerekir. Kayma düzlemine paralel sızıntıda ru = (γw/γ)·(hw/z)·cos²β. Parametreler efektif gerilme esaslıdır (c′, φ′). Gerekli FS projeye ve yönetmeliğe göre seçilmelidir."}
      fields={[
        { key: "kohezyon_kPa", label: "Efektif Kohezyon c′ (kPa)", type: "number", step: 1, min: 0 },
        { key: "icSurtunmeAcisi_derece", label: "Efektif İçsel Sürtünme Açısı φ′ (°)", type: "number", step: 1, min: 0 },
        { key: "birimHacimAgirlik_kNm3", label: "Birim Hacim Ağırlığı γ (kN/m³)", type: "number", step: 1, min: 1 },
        { key: "kayma_derinligi_m", label: "Kayma Düzlemi Derinliği z (m)", type: "number", step: 0.5, min: 0.1 },
        { key: "sevEgimi_derece", label: "Şev Eğimi β (°)", type: "number", step: 1, min: 1 },
        { key: "gozenekSuBasinciOrani_ru", label: "Gözenek Suyu Basınç Oranı ru (0–1)", type: "number", step: 0.05, min: 0 },
        { key: "gerekliFS", label: "Gerekli Güvenlik Sayısı", type: "number", step: 0.1, min: 1 },
      ]}
      defaults={{ kohezyon_kPa: 5, icSurtunmeAcisi_derece: 30, birimHacimAgirlik_kNm3: 18, kayma_derinligi_m: 2, sevEgimi_derece: 20, gozenekSuBasinciOrani_ru: 0, gerekliFS: 1.5 }}
      mainUnit={""}
      mainValueKey={"guvenlikSayisi"}
      mainDecimals={2}
      intermediateLabels={{
        kayma_duzleminde_normal_gerilme_kPa: "Kayma Düzleminde Normal Gerilme (kPa)",
        gozenek_suyu_basinci_kPa: "Gözenek Suyu Basıncı u (kPa)",
        kayan_gerilme_kPa: "Kayan Gerilme (kPa)",
        kayma_dayanimi_kPa: "Kayma Dayanımı (kPa)",
        kohezyonsuz_kuru_FS_tanphi_tanbeta: "Kohezyonsuz Kuru FS = tanφ/tanβ",
      }}
    />
  );
}
