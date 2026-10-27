"use client";

import { ahsapKolonBurkulmaKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function AhsapKolonBurkulmaKontroluPage() {
  return (
    <CalcPage
      module={ahsapKolonBurkulmaKontrolu}
      standardsLabel="TS EN 1995-1-1 §6.3.2"
      description="Dikdörtgen kesitli masif ahşap kolon veya dikmenin eksenel basınç altında burkulma kontrolünü yapar: her iki eksen için göreli narinliği ve burkulma azaltma katsayısını hesaplayıp tasarım gerilmesini azaltılmış basınç dayanımıyla karşılaştırır."
      formula="λrel = (λ/π)·√(fc,0,k/E0,05),   k = 0,5[1 + 0,2(λrel − 0,3) + λrel²],   kc = 1/(k + √(k² − λrel²)),   NEd/A ≤ kc·kmod·fc,0,k/γM"
      engineeringNote="Burkulma boyu Lef = β·L'dir (iki ucu mafsallı β = 1, bir ucu ankastre diğeri serbest β = 2); y ekseni h kenarı doğrultusundaki, z ekseni b kenarı doğrultusundaki burkulmayı temsil eder — zayıf eksen ara kuşaklarla tutuluyorsa z burkulma boyu kısalır. λrel ≤ 0,3 ise burkulma etkisi yoktur (kc = 1). βc = 0,2 masif ahşap içindir (tutkallı lamine ahşapta 0,1, bu hesapta yok). Dayanım ve E0,05 değerleri TS EN 338 (2016) tablosundandır. Bu hesap yalnız merkezi eksenel yük içindir; dışmerkezlik veya yanal yük varsa §6.3.2 (6.23)–(6.24) eğilme etkileşimi ayrıca kontrol edilmelidir. Yangın dayanımı (kömürleşme derinliği, TS EN 1995-1-2) kapsam dışıdır."
      fields={[
        {
          key: "dayanimSinifi",
          label: "Dayanım Sınıfı",
          type: "select",
          options: [
            { value: "C16", label: "C16 (fc,0,k 17 MPa, E0,05 5400 MPa)" },
            { value: "C24", label: "C24 (fc,0,k 21 MPa, E0,05 7400 MPa)" },
            { value: "C30", label: "C30 (fc,0,k 24 MPa, E0,05 8000 MPa)" },
          ],
        },
        { key: "genislik_b_mm", label: "Kesit Genişliği b (mm)", type: "number", min: 10, step: 10 },
        { key: "yukseklik_h_mm", label: "Kesit Yüksekliği h (mm)", type: "number", min: 10, step: 10 },
        { key: "burkulmaBoyu_y_m", label: "Burkulma Boyu Lef,y — h doğrultusu (m)", type: "number", min: 0.1, step: 0.1 },
        { key: "burkulmaBoyu_z_m", label: "Burkulma Boyu Lef,z — b doğrultusu (m)", type: "number", min: 0.1, step: 0.1 },
        { key: "eksenelYuk_NEd_kN", label: "Tasarım Eksenel Yükü NEd (kN)", type: "number", min: 0, step: 1 },
        {
          key: "yukSuresi",
          label: "Yük Süresi Sınıfı",
          type: "select",
          options: [
            { value: "kalici", label: "Kalıcı (> 10 yıl, öz ağırlık)" },
            { value: "uzun", label: "Uzun süreli (6 ay – 10 yıl, depolama)" },
            { value: "orta", label: "Orta süreli (1 hafta – 6 ay, kullanım yükü)" },
            { value: "kisa", label: "Kısa süreli (< 1 hafta, kar)" },
            { value: "ani", label: "Ani (rüzgar, kaza)" },
          ],
        },
        {
          key: "servisSinifi",
          label: "Servis Sınıfı",
          type: "select",
          options: [
            { value: "1-2", label: "1–2 — iç mekân / korunaklı" },
            { value: "3", label: "3 — açık hava" },
          ],
        },
        { key: "gammaM", label: "Malzeme Katsayısı γM", type: "number", min: 1, step: 0.05 },
      ]}
      defaults={{
        dayanimSinifi: "C24",
        genislik_b_mm: 100,
        yukseklik_h_mm: 100,
        burkulmaBoyu_y_m: 3,
        burkulmaBoyu_z_m: 3,
        eksenelYuk_NEd_kN: 30,
        yukSuresi: "orta",
        servisSinifi: "1-2",
        gammaM: 1.3,
      }}
      mainUnit="(kullanım oranı)"
      mainValueKey="kullanimOrani"
      mainDecimals={2}
      intermediateLabels={{
        karakteristik_basinc_dayanimi_fc0k_MPa: "Karakteristik Basınç Dayanımı fc,0,k (MPa)",
        elastisite_modulu_E005_MPa: "Elastisite Modülü E0,05 (MPa)",
        narinlik_lambda_y: "Narinlik λy",
        narinlik_lambda_z: "Narinlik λz",
        goreli_narinlik_lambda_rel_y: "Göreli Narinlik λrel,y",
        goreli_narinlik_lambda_rel_z: "Göreli Narinlik λrel,z",
        burkulma_katsayisi_kc_y: "Burkulma Katsayısı kc,y",
        burkulma_katsayisi_kc_z: "Burkulma Katsayısı kc,z",
        kmod: "Değişiklik Katsayısı kmod",
        tasarim_basinc_dayanimi_fc0d_MPa: "Tasarım Basınç Dayanımı fc,0,d (MPa)",
        basinc_gerilmesi_sigma_MPa: "Basınç Gerilmesi σc,0,d (MPa)",
        eksenel_tasima_kapasitesi_NRd_kN: "Eksenel Taşıma Kapasitesi NRd (kN)",
      }}
    />
  );
}
