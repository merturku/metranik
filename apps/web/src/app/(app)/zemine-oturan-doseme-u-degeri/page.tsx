"use client";

import { zemineOturanDosemeUDegeri } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ZemineOturanDosemeUDegeriPage() {
  return (
    <CalcPage
      module={zemineOturanDosemeUDegeri}
      standardsLabel="TS EN ISO 13370"
      description="Zemine oturan döşemenin U değerini döşeme alanı, çevre uzunluğu, duvar kalınlığı, zemin iletkenliği ve döşeme yalıtım direncinden hesaplar."
      formula="B' = A/(0,5·P);  dt = w + λ(Rsi + Rf + Rse);  dt < B': U = 2λ/(πB' + dt)·ln(πB'/dt + 1);  dt ≥ B': U = λ/(0,457B' + dt)"
      engineeringNote="Rsi = 0,17, Rse = 0,04 m²K/W. Zemin iletkenliği kil/silt ≈ 1,5, kum/çakıl ≈ 2,0, kaya ≈ 3,5 W/mK. Yıllık ortalama sabit durum değeridir; kenar yalıtımı ve yeraltı suyu ayrıca değerlendirilmelidir. Sonuç Pencere/Duvar Isı Kaybı ve Isıtma Yükü modüllerine U girdisi olur."
      fields={[
        { key: "doseme_alani_m2", label: "Döşeme Alanı A (m²)", type: "number", step: 1, min: 1 },
        { key: "cevre_uzunlugu_m", label: "Açıkta Çevre Uzunluğu P (m)", type: "number", step: 1, min: 1 },
        { key: "duvarKalinligi_m", label: "Duvar Kalınlığı w (m)", type: "number", step: 0.05, min: 0.05 },
        { key: "zeminIletkenligi_WmK", label: "Zemin İletkenliği λ (W/mK)", type: "number", step: 0.1, min: 0.1 },
        { key: "dosemeYalitimDirenci_m2KW", label: "Döşeme Yalıtım Direnci Rf (m²K/W)", type: "number", step: 0.1, min: 0 },
      ]}
      defaults={{ doseme_alani_m2: 100, cevre_uzunlugu_m: 40, duvarKalinligi_m: 0.3, zeminIletkenligi_WmK: 2, dosemeYalitimDirenci_m2KW: 0 }}
      mainUnit="W/m²K"
      mainValueKey="uDegeri_WmK"
      mainDecimals={3}
      intermediateLabels={{
        karakteristik_boyut_B_m: "Karakteristik Boyut B' (m)",
        esdeger_kalinlik_dt_m: "Eşdeğer Kalınlık dt (m)",
        hesap_kolu: "Hesap Kolu",
        birim_sicaklik_farki_isi_kaybi_WK: "Isı Kaybı (W/K)",
      }}
    />
  );
}
