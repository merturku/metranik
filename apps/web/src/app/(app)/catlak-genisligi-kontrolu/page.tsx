"use client";

import { catlakGenisligiKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function CatlakGenisligiKontroluPage() {
  return (
    <CalcPage
      module={catlakGenisligiKontrolu}
      standardsLabel="TS EN 1992-1-1 §7.3.4"
      description="Eğilme etkisindeki dikdörtgen betonarme kirişte, yarı kalıcı yük momenti altında hesap çatlak genişliğini (wk) bulur ve maruz kalma sınıfına göre izin verilen değerle karşılaştırır."
      formula="wk = sr,max × (εsm − εcm),  εsm − εcm = [σs − kt·(fct,eff/ρp,eff)·(1 + αe·ρp,eff)]/Es ≥ 0,6·σs/Es,  sr,max = 3,4·c + 0,17·φ/ρp,eff"
      engineeringNote="Moment yarı kalıcı yük kombinasyonundan (G + ψ2·Q) alınmalıdır. c boyuna donatıya kadar net pas payıdır. Çubuk aralığı 5·(c + φ/2)'yi aşarsa sr,max = 1,3·(h − x) kullanılır. İzin verilen değer için önerilen değerler: X0/XC1 0,4 mm, XC2–XC4 ve XD/XS sınıfları 0,3 mm. k1–k4 katsayıları önerilen değerlerdir, ulusal ekten teyit edin. Formül fck ≤ 50 MPa için geçerlidir."
      fields={[
        { key: "betonKarakteristikDayanim_fck_MPa", label: "Beton Dayanımı fck (MPa)", type: "number", min: 12, step: 5 },
        { key: "kesitGenisligi_b_mm", label: "Kesit Genişliği b (mm)", type: "number", min: 100, step: 50 },
        { key: "kesitYuksekligi_h_mm", label: "Kesit Yüksekliği h (mm)", type: "number", min: 100, step: 50 },
        { key: "faydaliYukseklik_d_mm", label: "Faydalı Yükseklik d (mm)", type: "number", min: 50, step: 10 },
        { key: "cekmeDonatisiAlani_As_mm2", label: "Çekme Donatısı Alanı As (mm²)", type: "number", min: 1, step: 50 },
        { key: "cubukCapi_mm", label: "Çubuk Çapı φ (mm)", type: "number", min: 6, step: 2 },
        { key: "netPasPayi_c_mm", label: "Net Pas Payı c (mm)", type: "number", min: 10, step: 5 },
        { key: "cubukAraligi_mm", label: "Çubuk Aralığı (mm)", type: "number", min: 10, step: 10 },
        { key: "yariKaliciMoment_kNm", label: "Yarı Kalıcı Moment M (kNm)", type: "number", min: 1, step: 10 },
        {
          key: "yukSuresi",
          label: "Yük Süresi",
          type: "select",
          options: [
            { value: "uzun", label: "Uzun süreli (kt = 0,4)" },
            { value: "kisa", label: "Kısa süreli (kt = 0,6)" },
          ],
        },
        { key: "izinVerilenCatlak_mm", label: "İzin Verilen Çatlak wmax (mm)", type: "number", min: 0.05, step: 0.05 },
      ]}
      defaults={{
        betonKarakteristikDayanim_fck_MPa: 30,
        kesitGenisligi_b_mm: 300,
        kesitYuksekligi_h_mm: 600,
        faydaliYukseklik_d_mm: 550,
        cekmeDonatisiAlani_As_mm2: 1206,
        cubukCapi_mm: 16,
        netPasPayi_c_mm: 40,
        cubukAraligi_mm: 50,
        yariKaliciMoment_kNm: 150,
        yukSuresi: "uzun",
        izinVerilenCatlak_mm: 0.3,
      }}
      mainUnit="mm"
      mainValueKey="catlakGenisligi_mm"
      mainDecimals={3}
      intermediateLabels={{
        tarafsiz_eksen_x_mm: "Tarafsız Eksen Derinliği x (mm)",
        donati_gerilmesi_sigma_s_MPa: "Donatı Gerilmesi σs (MPa)",
        etkili_cekme_yuksekligi_hc_eff_mm: "Etkili Çekme Yüksekliği hc,eff (mm)",
        etkili_donati_orani_rho_p_eff: "Etkili Donatı Oranı ρp,eff",
        birim_deformasyon_farki: "Ortalama Birim Deformasyon Farkı εsm − εcm",
        azami_catlak_araligi_sr_max_mm: "Azami Çatlak Aralığı sr,max (mm)",
        modul_orani_alfa_e: "Modül Oranı αe = Es/Ecm",
      }}
    />
  );
}
