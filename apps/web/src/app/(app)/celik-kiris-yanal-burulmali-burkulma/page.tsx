"use client";

import { celikKirisYanalBurulmaliBurkulma } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function CelikKirisYanalBurulmaliBurkulmaPage() {
  return (
    <CalcPage
      module={celikKirisYanalBurulmaliBurkulma}
      standardsLabel="TS EN 1993-1-1 §6.3.2"
      description="Basınç başlığı yanal olarak tutulmamış çift simetrik I/H kesitli çelik kirişin elastik kritik momentini (Mcr) ve yanal burulmalı burkulma moment dayanımını (Mb,Rd) genel yöntemle hesaplar."
      formula="Mcr = C1·(π²EIz/L²)·√(Iw/Iz + L²GIt/(π²EIz)),   λ̄LT = √(Wpl·fy/Mcr),   χLT = 1/(Φ + √(Φ² − λ̄²)),   Mb,Rd = χLT·Wpl·fy/γM1"
      engineeringNote="L, basınç başlığının yanal olarak tutulduğu noktalar arası uzaklıktır (aşık, döşeme bağlantısı, çapraz). Mcr yükün kesme merkezinde etkidiği, uçlarda çarpılma ve dönmenin serbest olduğu (k = kw = 1) duruma göredir; üst başlığa etkiyen yük Mcr'yi azaltır. C1: sabit moment 1,0; düzgün yayılı yüklü basit kiriş 1,13; açıklık ortasında tekil yük 1,35; uçlarda M ve 0 (doğrusal) ≈ 1,77. Eğri seçimi (Tablo 6.4): hadde I h/b ≤ 2 → a, > 2 → b; kaynaklı I h/b ≤ 2 → c, > 2 → d. Iz, It, Iw ve Wpl profil tablolarından alınır. §6.3.2.3'teki hadde profil özel yöntemi biraz daha yüksek dayanım verir; bu modül güvenli taraftaki genel yöntemi kullanır."
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
        { key: "plastikMukavemetMomenti_Wpl_cm3", label: "Plastik Mukavemet Momenti Wpl,y (cm³)", type: "number", min: 1, step: 10 },
        { key: "zayifEksenAtaleti_Iz_cm4", label: "Zayıf Eksen Ataleti Iz (cm⁴)", type: "number", min: 1, step: 10 },
        { key: "burulmaAtaleti_It_cm4", label: "Burulma Ataleti It (cm⁴)", type: "number", min: 0.1, step: 1 },
        { key: "carpilmaSabiti_Iw_cm6", label: "Çarpılma Sabiti Iw (cm⁶)", type: "number", min: 1, step: 1000 },
        { key: "yanalTutulmamisBoy_L_m", label: "Yanal Tutulmamış Boy L (m)", type: "number", min: 0.1, step: 0.5 },
        { key: "momentKatsayisi_C1", label: "Moment Dağılım Katsayısı C1", type: "number", min: 1, step: 0.01 },
        {
          key: "burkulmaEgrisi",
          label: "Burkulma Eğrisi",
          type: "select",
          options: [
            { value: "a", label: "a (αLT = 0,21)" },
            { value: "b", label: "b (αLT = 0,34)" },
            { value: "c", label: "c (αLT = 0,49)" },
            { value: "d", label: "d (αLT = 0,76)" },
          ],
        },
        { key: "gammaM1", label: "Kısmi Güvenlik Katsayısı γM1", type: "number", min: 1, step: 0.05 },
        { key: "tasarimMomenti_MEd_kNm", label: "Tasarım Momenti MEd (kNm)", type: "number", min: 0, step: 5 },
      ]}
      defaults={{
        celikSinifi: "S235",
        plastikMukavemetMomenti_Wpl_cm3: 628.4,
        zayifEksenAtaleti_Iz_cm4: 603.8,
        burulmaAtaleti_It_cm4: 20.12,
        carpilmaSabiti_Iw_cm6: 125900,
        yanalTutulmamisBoy_L_m: 4,
        momentKatsayisi_C1: 1,
        burkulmaEgrisi: "a",
        gammaM1: 1,
        tasarimMomenti_MEd_kNm: 90,
      }}
      mainUnit="kNm (Mb,Rd)"
      mainValueKey="burkulmaMomentDayanimi_MbRd_kNm"
      mainDecimals={1}
      intermediateLabels={{
        elastik_kritik_moment_Mcr_kNm: "Elastik Kritik Moment Mcr (kNm)",
        plastik_moment_Mpl_kNm: "Plastik Moment Wpl·fy (kNm)",
        boyutsuz_narinlik_lambdaLT: "Boyutsuz Narinlik λ̄LT",
        kusur_katsayisi_alfaLT: "Kusur Katsayısı αLT",
        phiLT: "ΦLT",
        azaltma_katsayisi_chiLT: "Azaltma Katsayısı χLT",
        kullanim_orani: "Kullanım Oranı MEd/Mb,Rd",
      }}
    />
  );
}
