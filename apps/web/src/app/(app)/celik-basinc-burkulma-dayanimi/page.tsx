"use client";

import { celikBasincBurkulmaDayanimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function CelikBasincBurkulmaDayanimiPage() {
  return (
    <CalcPage
      module={celikBasincBurkulmaDayanimi}
      standardsLabel="TS EN 1993-1-1 §6.3.1"
      description="Merkezi basınç altındaki çelik kolon veya çubuğun eğilmeli burkulma dayanımını Eurocode 3 burkulma eğrileriyle hesaplar; azaltma katsayısı χ, Euler kritik yükü ve tasarım kuvvetine göre kullanım oranını verir."
      formula="λ̄ = (Lcr/i) / (π·√(E/fy)),   Φ = 0,5·[1 + α(λ̄ − 0,2) + λ̄²],   χ = 1/(Φ + √(Φ² − λ̄²)),   Nb,Rd = χ·A·fy/γM1"
      engineeringNote="Burkulma eğrisi Tablo 6.2'den kesit tipi, imalat şekli ve burkulma eksenine göre seçilir (örn. hadde I/H profil, h/b > 1,2: y-y a, z-z b; h/b ≤ 1,2: y-y b, z-z c; sıcak bitmiş kutu a; soğuk şekillendirilmiş kutu c; L köşebent b). Kontrol her iki eksen için ayrı yapılmalı; zayıf eksen (küçük i) genellikle belirleyicidir. Lcr, mesnet koşullarına göre burkulma boyudur (iki ucu mafsallı = L). Sınıf 4 kesitlerde etkin alan, eksantrik yüklemede eğilme-burkulma etkileşimi (§6.3.3) ayrıca kontrol edilmelidir. γM1 için ulusal eki kontrol edin (önerilen 1,0)."
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
        { key: "kesitAlani_A_cm2", label: "Kesit Alanı A (cm²)", type: "number", min: 0.1, step: 1 },
        { key: "ataletYaricapi_i_cm", label: "Burkulma Eksenindeki Atalet Yarıçapı i (cm)", type: "number", min: 0.1, step: 0.1 },
        { key: "burkulmaBoyu_Lcr_m", label: "Burkulma Boyu Lcr (m)", type: "number", min: 0.1, step: 0.1 },
        {
          key: "burkulmaEgrisi",
          label: "Burkulma Eğrisi",
          type: "select",
          options: [
            { value: "a0", label: "a0 (α = 0,13)" },
            { value: "a", label: "a (α = 0,21)" },
            { value: "b", label: "b (α = 0,34)" },
            { value: "c", label: "c (α = 0,49)" },
            { value: "d", label: "d (α = 0,76)" },
          ],
        },
        { key: "gammaM1", label: "Kısmi Güvenlik Katsayısı γM1", type: "number", min: 1, step: 0.05 },
        { key: "tasarimKuvveti_NEd_kN", label: "Tasarım Basınç Kuvveti NEd (kN)", type: "number", min: 0, step: 10 },
      ]}
      defaults={{
        celikSinifi: "S235",
        kesitAlani_A_cm2: 53.8,
        ataletYaricapi_i_cm: 4.98,
        burkulmaBoyu_Lcr_m: 3,
        burkulmaEgrisi: "c",
        gammaM1: 1,
        tasarimKuvveti_NEd_kN: 800,
      }}
      mainUnit="kN (Nb,Rd)"
      mainValueKey="burkulmaDayanimi_NbRd_kN"
      mainDecimals={1}
      intermediateLabels={{
        akma_dayanimi_fy_MPa: "Akma Dayanımı fy (MPa)",
        narinlik_Lcr_i: "Narinlik Lcr/i",
        referans_narinlik_lambda1: "Referans Narinlik λ1",
        boyutsuz_narinlik_lambdaBar: "Boyutsuz Narinlik λ̄",
        kusur_katsayisi_alfa: "Kusur Katsayısı α",
        phi: "Φ",
        azaltma_katsayisi_chi: "Burkulma Azaltma Katsayısı χ",
        euler_kritik_yuku_Ncr_kN: "Euler Kritik Yükü Ncr (kN)",
        plastik_dayanim_Npl_kN: "Kesit Plastik Dayanımı A·fy/γM1 (kN)",
        kullanim_orani: "Kullanım Oranı NEd/Nb,Rd",
      }}
    />
  );
}
