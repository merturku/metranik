"use client";

import { koseKaynagiDikisKapasitesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KoseKaynagiDikisKapasitesiPage() {
  return (
    <CalcPage
      module={koseKaynagiDikisKapasitesi}
      standardsLabel="TS EN 1993-1-8"
      description="Çelik yapı birleşimlerindeki köşe kaynağının tasarım dayanımını basitleştirilmiş yöntemle hesaplar; boğaz kalınlığı ve asgari dikiş boyu koşullarını, uzun bindirmeli birleşim azaltmasını uygulayarak tasarım kuvvetiyle karşılaştırır."
      formula="fvw,d = (fu/√3) / (βw · γM2),   Fw,Rd = n · βLw · fvw,d · a · Leff"
      engineeringNote="Basitleştirilmiş yöntem kuvvet doğrultusundan bağımsızdır ve güvenli taraftadır; enine yüklü dikişlerde yönlü yöntem (§4.5.3.2) daha yüksek dayanım verebilir. fu, birleşen parçalardan zayıf olanın çekme dayanımıdır (t ≤ 40 mm değerleri kullanılmıştır). Dikiş uçlarında krater varsa etkin boy L − 2a alınır. 150a'dan uzun bindirmeli birleşimlerde βLw.1 azaltması uygulanır. γM2 için ulusal eki kontrol edin (önerilen 1,25)."
      fields={[
        {
          key: "celikSinifi",
          label: "Çelik Sınıfı (zayıf parça)",
          type: "select",
          options: [
            { value: "S235", label: "S235 (fu 360 MPa, βw 0,80)" },
            { value: "S275", label: "S275 (fu 430 MPa, βw 0,85)" },
            { value: "S355", label: "S355 (fu 510 MPa, βw 0,90)" },
          ],
        },
        { key: "kaynakKalinligi_a_mm", label: "Boğaz Kalınlığı a (mm)", type: "number", min: 1, step: 0.5 },
        { key: "kaynakUzunlugu_L_mm", label: "Dikiş Boyu L (mm)", type: "number", min: 1, step: 10 },
        { key: "dikisSayisi", label: "Dikiş Sayısı", type: "number", min: 1, step: 1 },
        {
          key: "uzunlukTipi",
          label: "Etkin Boy",
          type: "select",
          options: [
            { value: "tam", label: "Tam boy (uç dönüşlü/krater yok)" },
            { value: "krater", label: "Uç krateri var (L − 2a)" },
          ],
        },
        {
          key: "kuvvetYonu",
          label: "Kuvvet Doğrultusu",
          type: "select",
          options: [
            { value: "enine", label: "Dikişe dik (enine)" },
            { value: "boyuna", label: "Dikiş boyunca (bindirmeli)" },
          ],
        },
        { key: "tasarimKuvveti_FEd_kN", label: "Tasarım Kuvveti FEd (kN)", type: "number", min: 0, step: 10 },
        { key: "gammaM2", label: "Kısmi Güvenlik Katsayısı γM2", type: "number", min: 1, step: 0.05 },
      ]}
      defaults={{
        celikSinifi: "S235",
        kaynakKalinligi_a_mm: 5,
        kaynakUzunlugu_L_mm: 200,
        dikisSayisi: 1,
        uzunlukTipi: "tam",
        kuvvetYonu: "enine",
        tasarimKuvveti_FEd_kN: 150,
        gammaM2: 1.25,
      }}
      mainUnit="kN (Fw,Rd)"
      mainValueKey="kaynakTasarimDayanimi_kN"
      mainDecimals={1}
      intermediateLabels={{
        cekme_dayanimi_fu_MPa: "Çekme Dayanımı fu (MPa)",
        korelasyon_katsayisi_betaW: "Korelasyon Katsayısı βw",
        kaynak_kayma_dayanimi_fvwd_MPa: "Kaynak Kayma Dayanımı fvw,d (MPa)",
        birim_boy_dayanimi_N_mm: "Birim Boy Dayanımı (N/mm)",
        etkin_dikis_boyu_mm: "Etkin Dikiş Boyu (mm)",
        uzun_birlesim_azaltmasi_betaLw: "Uzun Birleşim Azaltması βLw.1",
        kullanim_orani: "Kullanım Oranı FEd/Fw,Rd",
      }}
    />
  );
}
