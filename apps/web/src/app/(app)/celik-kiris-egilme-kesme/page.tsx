"use client";

import { celikKirisEgilmeKesme } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function CelikKirisEgilmeKesmePage() {
  return (
    <CalcPage
      module={celikKirisEgilmeKesme}
      standardsLabel="TS EN 1993-1-1 §6.2"
      description="Yanal olarak tutulmuş I/H kesitli çelik kirişin plastik eğilme ve kesme dayanımını hesaplar; yüksek kesme altında moment dayanımını azaltır ve gövde narinliğini kontrol ederek tasarım etkileriyle karşılaştırır."
      formula="Mc,Rd = Wpl·fy/γM0,   Vpl,Rd = Av·(fy/√3)/γM0,   VEd > 0,5Vpl,Rd: ρ = (2VEd/Vpl,Rd − 1)², My,V,Rd = (Wpl − ρ·hw²·tw/4)·fy/γM0"
      engineeringNote="Plastik dayanım yalnız sınıf 1–2 kesitler için geçerlidir (hadde IPE/HEA/HEB profillerin çoğu S235–S355'te sınıf 1–2'dir; kesit sınıfını Tablo 5.2'den kontrol edin). Kiriş basınç başlığı yanal olarak tutulmuyorsa yanal burulmalı burkulma (§6.3.2) belirleyici olabilir ve bu hesap güvensiz kalır. Wpl ve Av profil tablolarından alınır; hw = h − 2tf. Kesmede azaltma, eğilme ve kesmenin aynı kesitte etkidiği durum (örn. sürekli kiriş mesnedi) içindir. Kullanılabilirlik (sehim) ayrıca kontrol edilmelidir."
      fields={[
        {
          key: "celikSinifi",
          label: "Çelik Sınıfı",
          type: "select",
          options: [
            { value: "S235", label: "S235 (fy 235 MPa)" },
            { value: "S275", label: "S275 (fy 275 MPa)" },
            { value: "S355", label: "S355 (fy 355 MPa)" },
          ],
        },
        { key: "plastikMukavemetMomenti_Wpl_cm3", label: "Plastik Mukavemet Momenti Wpl (cm³)", type: "number", min: 1, step: 10 },
        { key: "kesmeAlani_Av_cm2", label: "Kesme Alanı Av (cm²)", type: "number", min: 0.1, step: 0.5 },
        { key: "govdeYuksekligi_hw_mm", label: "Gövde Yüksekliği hw (mm)", type: "number", min: 1, step: 5 },
        { key: "govdeKalinligi_tw_mm", label: "Gövde Kalınlığı tw (mm)", type: "number", min: 0.5, step: 0.1 },
        { key: "tasarimMomenti_MEd_kNm", label: "Tasarım Momenti MEd (kNm)", type: "number", min: 0, step: 5 },
        { key: "tasarimKesmesi_VEd_kN", label: "Tasarım Kesme Kuvveti VEd (kN)", type: "number", min: 0, step: 5 },
        { key: "gammaM0", label: "Kısmi Güvenlik Katsayısı γM0", type: "number", min: 1, step: 0.05 },
      ]}
      defaults={{
        celikSinifi: "S235",
        plastikMukavemetMomenti_Wpl_cm3: 628.4,
        kesmeAlani_Av_cm2: 25.68,
        govdeYuksekligi_hw_mm: 278.6,
        govdeKalinligi_tw_mm: 7.1,
        tasarimMomenti_MEd_kNm: 120,
        tasarimKesmesi_VEd_kN: 100,
        gammaM0: 1,
      }}
      mainUnit="kNm (MRd)"
      mainValueKey="egilmeDayanimi_kNm"
      mainDecimals={1}
      intermediateLabels={{
        akma_dayanimi_fy_MPa: "Akma Dayanımı fy (MPa)",
        plastik_moment_dayanimi_McRd_kNm: "Plastik Moment Dayanımı Mc,Rd (kNm)",
        plastik_kesme_dayanimi_VplRd_kN: "Plastik Kesme Dayanımı Vpl,Rd (kN)",
        kesme_orani_VEd_Vpl: "Kesme Oranı VEd/Vpl,Rd",
        kesme_azaltma_katsayisi_rho: "Kesme Azaltma Katsayısı ρ",
        govde_narinligi_hw_tw: "Gövde Narinliği hw/tw",
        govde_siniri_72eps: "Gövde Sınırı 72ε",
        moment_kullanim_orani: "Moment Kullanım Oranı MEd/MRd",
      }}
    />
  );
}
