"use client";

import { bulonluBirlesimKesmeEzilme } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BulonluBirlesimKesmeEzilmePage() {
  return (
    <CalcPage
      module={bulonluBirlesimKesmeEzilme}
      standardsLabel="TS EN 1993-1-8"
      description="Kesmeye çalışan bulonlu çelik birleşimin bulon kesme ve levha ezilme dayanımını hesaplar; delik mesafelerini, uzun birleşim azaltmasını kontrol ederek grup dayanımını tasarım kuvvetiyle karşılaştırır."
      formula="Fv,Rd = m·αv·fub·A/γM2,   Fb,Rd = k1·αb·fu·d·t/γM2,   FRd = n × min(Fv,Rd; Fb,Rd)"
      engineeringNote="e1 ve p1 kuvvet doğrultusunda, e2 ve p2 ona dik ölçülür. Güvenli tarafta kalmak için en elverişsiz bulonun αd ve k1 değerleri kullanılır. Çift kesmede t, orta levha kalınlığı ile iki dış levha toplamının küçüğüdür. Bulon dişleri kesme düzlemine denk geliyorsa 'diş' seçin. Delikler normal yuvarlak delik (M12–M14 +1 mm, M16–M24 +2 mm, M27+ +3 mm) kabul edilmiştir; büyütülmüş/oval delik, kaymaya dirençli (B/C kategorisi) birleşim ve net kesit kontrolü ayrıca yapılmalıdır. γM2 için ulusal eki kontrol edin."
      fields={[
        {
          key: "bulonCapi",
          label: "Bulon Çapı",
          type: "select",
          options: ["M12", "M16", "M20", "M22", "M24", "M27", "M30"].map((v) => ({ value: v, label: v })),
        },
        {
          key: "bulonSinifi",
          label: "Bulon Sınıfı",
          type: "select",
          options: [
            { value: "4.6", label: "4.6 (fub 400 MPa)" },
            { value: "5.6", label: "5.6 (fub 500 MPa)" },
            { value: "8.8", label: "8.8 (fub 800 MPa)" },
            { value: "10.9", label: "10.9 (fub 1000 MPa)" },
          ],
        },
        {
          key: "kesmeDuzlemi",
          label: "Kesme Düzlemi",
          type: "select",
          options: [
            { value: "dis", label: "Dişli kısımdan" },
            { value: "govde", label: "Dişsiz gövdeden" },
          ],
        },
        { key: "kesmeDuzlemiSayisi", label: "Kesme Düzlemi Sayısı m (1–2)", type: "number", min: 1, step: 1 },
        {
          key: "levhaCelikSinifi",
          label: "Levha Çelik Sınıfı",
          type: "select",
          options: [
            { value: "S235", label: "S235 (fu 360 MPa)" },
            { value: "S275", label: "S275 (fu 430 MPa)" },
            { value: "S355", label: "S355 (fu 510 MPa)" },
          ],
        },
        { key: "levhaKalinligi_t_mm", label: "Ezilme Kalınlığı t (mm)", type: "number", min: 1, step: 1 },
        { key: "ucMesafesi_e1_mm", label: "Uç Mesafesi e1 (mm)", type: "number", min: 1, step: 5 },
        { key: "bulonAraligi_p1_mm", label: "Bulon Aralığı p1 (mm)", type: "number", min: 1, step: 5 },
        { key: "kenarMesafesi_e2_mm", label: "Kenar Mesafesi e2 (mm)", type: "number", min: 1, step: 5 },
        { key: "siraAraligi_p2_mm", label: "Sıra Aralığı p2 (mm)", type: "number", min: 1, step: 5 },
        { key: "kuvvetYonundeBulonSayisi_n1", label: "Kuvvet Yönünde Bulon Sayısı n1", type: "number", min: 1, step: 1 },
        { key: "siraSayisi_n2", label: "Sıra Sayısı n2", type: "number", min: 1, step: 1 },
        { key: "tasarimKuvveti_FEd_kN", label: "Tasarım Kesme Kuvveti FEd (kN)", type: "number", min: 0, step: 10 },
        { key: "gammaM2", label: "Kısmi Güvenlik Katsayısı γM2", type: "number", min: 1, step: 0.05 },
      ]}
      defaults={{
        bulonCapi: "M20",
        bulonSinifi: "8.8",
        kesmeDuzlemi: "dis",
        kesmeDuzlemiSayisi: 1,
        levhaCelikSinifi: "S235",
        levhaKalinligi_t_mm: 10,
        ucMesafesi_e1_mm: 40,
        bulonAraligi_p1_mm: 70,
        kenarMesafesi_e2_mm: 35,
        siraAraligi_p2_mm: 60,
        kuvvetYonundeBulonSayisi_n1: 2,
        siraSayisi_n2: 1,
        tasarimKuvveti_FEd_kN: 150,
        gammaM2: 1.25,
      }}
      mainUnit="kN (grup dayanımı)"
      mainValueKey="grupDayanimi_kN"
      mainDecimals={1}
      intermediateLabels={{
        delik_capi_d0_mm: "Delik Çapı d0 (mm)",
        kesme_alani_A_mm2: "Kesme Alanı A (mm²)",
        alfa_v: "αv",
        uzun_birlesim_betaLf: "Uzun Birleşim Azaltması βLf",
        bulon_kesme_dayanimi_FvRd_kN: "Bulon Kesme Dayanımı Fv,Rd (kN)",
        alfa_d: "αd",
        alfa_b: "αb",
        k1: "k1",
        levha_ezilme_dayanimi_FbRd_kN: "Levha Ezilme Dayanımı Fb,Rd (kN)",
        bulon_sayisi: "Bulon Sayısı n",
        kullanim_orani: "Kullanım Oranı FEd/FRd",
      }}
    />
  );
}
