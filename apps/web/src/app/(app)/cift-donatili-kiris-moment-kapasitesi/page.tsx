"use client";

import { ciftDonatiliKirisMomentKapasitesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function CiftDonatiliKirisMomentKapasitesiPage() {
  return (
    <CalcPage
      module={ciftDonatiliKirisMomentKapasitesi}
      standardsLabel="TS 500 §7.1, §7.3"
      description="Hem çekme hem basınç donatısı bulunan dikdörtgen betonarme kirişin eğilme moment kapasitesini, şekil değiştirme uygunluğuyla tarafsız ekseni bularak hesaplar; basınç donatısının akıp akmadığını belirler, TS 500 donatı sınırlarını ve tasarım momentini kontrol eder."
      formula="0,85·fcd·b·k1·c + As'·σs' = As·σs,   σs' = 600·(c − d')/c ≤ fyd,   Mr = 0,85·fcd·b·k1·c·(d − k1·c/2) + As'·σs'·(d − d')"
      engineeringNote="Basınç donatısı hem moment kapasitesine katkı verir hem de tarafsız ekseni yukarı çekerek sünekliği artırır; TS 500 bu yüzden çift donatılı kesitte ρ − ρ' ≤ 0,85·ρb sınırını kullanır (ayrıca ρ ≤ 0,02). Basınç donatısı tarafsız eksene yakınsa (c küçük, d' büyük) akma şekil değiştirmesine ulaşmaz ve gerilmesi uygunluk denkleminden bulunur — kapasite hesabında fyd varsaymak bu durumda güvensizdir. Hesapta beton εcu = 0,003, çelik Es = 200 000 MPa ve elasto-plastik davranış kabul edilmiş, basınç donatısının yer değiştirdiği beton ihmal edilmiştir. Basınç donatısının burkulmaması için etriye aralığı ve sargı koşulları TS 500 / TBDY 2018'e göre ayrıca sağlanmalıdır."
      fields={[
        { key: "betonKarakteristikDayanim_fck_MPa", label: "Beton Dayanımı fck (MPa)", type: "number", min: 16, step: 5 },
        { key: "celikAkmaDayanimi_fyk_MPa", label: "Çelik Akma Dayanımı fyk (MPa)", type: "number", min: 220, step: 10 },
        { key: "genislik_b_mm", label: "Kiriş Genişliği b (mm)", type: "number", min: 100, step: 10 },
        { key: "faydaliYukseklik_d_mm", label: "Faydalı Yükseklik d (mm)", type: "number", min: 100, step: 10 },
        { key: "basincDonatisiPasPayi_dp_mm", label: "Basınç Donatısı Merkezi d' (mm)", type: "number", min: 10, step: 5 },
        { key: "cekmeDonatisiAlani_As_mm2", label: "Çekme Donatısı As (mm²)", type: "number", min: 0, step: 10 },
        { key: "basincDonatisiAlani_Asp_mm2", label: "Basınç Donatısı As' (mm²)", type: "number", min: 0, step: 10 },
        { key: "tasarimMomenti_Md_kNm", label: "Tasarım Momenti Md (kNm)", type: "number", min: 0, step: 10 },
      ]}
      defaults={{
        betonKarakteristikDayanim_fck_MPa: 30,
        celikAkmaDayanimi_fyk_MPa: 420,
        genislik_b_mm: 300,
        faydaliYukseklik_d_mm: 550,
        basincDonatisiPasPayi_dp_mm: 50,
        cekmeDonatisiAlani_As_mm2: 2945,
        basincDonatisiAlani_Asp_mm2: 628,
        tasarimMomenti_Md_kNm: 400,
      }}
      mainUnit="kNm (moment kapasitesi)"
      mainValueKey="momentKapasitesi_Mr_kNm"
      mainDecimals={1}
      intermediateLabels={{
        k1: "Gerilme Bloğu Katsayısı k1",
        tasarim_beton_dayanimi_fcd_MPa: "Tasarım Beton Dayanımı fcd (MPa)",
        tasarim_celik_dayanimi_fyd_MPa: "Tasarım Çelik Dayanımı fyd (MPa)",
        tarafsiz_eksen_c_mm: "Tarafsız Eksen Derinliği c (mm)",
        basinc_blogu_derinligi_a_mm: "Basınç Bloğu Derinliği a = k1·c (mm)",
        cekme_donatisi_gerilmesi_MPa: "Çekme Donatısı Gerilmesi σs (MPa)",
        basinc_donatisi_gerilmesi_MPa: "Basınç Donatısı Gerilmesi σs' (MPa)",
        cekme_donatisi_birim_sekil_degistirme: "Çekme Donatısı Birim Şekil Değiştirmesi εs",
        basinc_donatisi_birim_sekil_degistirme: "Basınç Donatısı Birim Şekil Değiştirmesi εs'",
        cekme_donatisi_orani_rho: "Çekme Donatısı Oranı ρ",
        basinc_donatisi_orani_rhop: "Basınç Donatısı Oranı ρ'",
        dengeli_donati_orani_rhob: "Dengeli Donatı Oranı ρb",
        siniri_085_rhob: "Sınır 0,85·ρb",
      }}
    />
  );
}
