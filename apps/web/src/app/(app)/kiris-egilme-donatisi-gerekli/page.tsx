"use client";

import { kirisEgilmeDonatisiGerekli } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KirisEgilmeDonatisiGerekliPage() {
  return (
    <CalcPage
      module={kirisEgilmeDonatisiGerekli}
      standardsLabel="TS 500 · TBDY 2018"
      description="Dikdörtgen kesitli, tek donatılı kirişte tasarım momenti için gerekli çekme donatısı alanını bulur ve donatı oranı sınırlarını kontrol eder."
      formula="a = As·fyd/(0,85·fcd·b);  Md = As·fyd·(d − a/2)  →  K·As² − fyd·d·As + Md = 0,  K = fyd²/(1,7·fcd·b)"
      engineeringNote="Kiriş Boyutlandırma modülünün (moment kapasitesi) ters yönüdür. γc = 1,5, γs = 1,15. Üst sınır min(0,02; 0,85·ρb), alt sınır 0,8·fctd/fyd'dir (Kiriş Donatı Oranı Kontrolü ile aynı). Sınır aşılırsa kesiti büyütün veya çift donatılı tasarıma geçin (Çift Donatılı Kiriş modülü). Kesme, sehim ve çatlak kontrolleri ayrıca yapılmalıdır."
      fields={[
        { key: "tasarimMomenti_kNm", label: "Tasarım Momenti Md (kNm)", type: "number", step: 1, min: 0.1 },
        { key: "genislik_b_mm", label: "Kiriş Genişliği b (mm)", type: "number", step: 10, min: 50 },
        { key: "faydaliYukseklik_d_mm", label: "Faydalı Yükseklik d (mm)", type: "number", step: 10, min: 50 },
        { key: "fck_MPa", label: "Beton fck (MPa)", type: "number", step: 1, min: 10 },
        { key: "fyk_MPa", label: "Donatı fyk (MPa)", type: "number", step: 10, min: 100 },
      ]}
      defaults={{ tasarimMomenti_kNm: 200, genislik_b_mm: 300, faydaliYukseklik_d_mm: 550, fck_MPa: 25, fyk_MPa: 420 }}
      mainUnit="mm²"
      mainValueKey="gerekliAs_mm2"
      mainDecimals={0}
      intermediateLabels={{
        hesaplanan_As_mm2: "Hesaplanan As (mm²)",
        As_min_mm2: "Asgari As (mm²)",
        gerilim_blogu_derinligi_a_mm: "Gerilim Bloku Derinliği a (mm)",
        donatiOrani_rho: "Donatı Oranı ρ",
        rho_min: "ρ min",
        rho_maks: "ρ maks",
        fcd_MPa: "fcd (MPa)",
        fyd_MPa: "fyd (MPa)",
        Mmaks_tek_donatili_kNm: "Tek Donatılı Azami Moment (kNm)",
      }}
    />
  );
}
