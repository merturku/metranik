"use client";

import { catlakYontemiInfiltrasyon } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function CatlakYontemiInfiltrasyonPage() {
  return (
    <CalcPage
      module={catlakYontemiInfiltrasyon}
      standardsLabel={'ASHRAE Fundamentals Ch. 16'}
      description={'Pencere/kapı çatlak uzunluğu ve rüzgâr basıncından hava sızıntı debisini ve duyulur ısı kaybını hesaplar.'}
      formula={'ΔP = ΔCp·ρ·v²/2;  Q = C·L·ΔP^n;  Φ = ρ·cp·Q·ΔT'}
      engineeringNote={'C ve n değerleri pencere/kapı üreticisinin hava geçirgenlik (EN 12207) verisinden alınır; modül tablo gömmez. Yalnız rüzgâr etkisi dikkate alınır, baca etkisi (stack) ve mekanik havalandırma dahil değildir. n 0,5 (türbülanslı) ile 1 (laminer) arasındadır, çoğu çatlak için ≈ 0,65.'}
      fields={[
        { key: "catlakKatsayisi_C", label: "Çatlak Katsayısı C (m³/h·m·Pa⁻ⁿ)", type: "number", step: 0.05, min: 0.001 },
        { key: "akisUsteli_n", label: "Akış Üssü n", type: "number", step: 0.05, min: 0.5 },
        { key: "catlakUzunlugu_m", label: "Çatlak Uzunluğu L (m)", type: "number", step: 1, min: 0.1 },
        { key: "ruzgarHizi_m_s", label: "Rüzgâr Hızı v (m/s)", type: "number", step: 1, min: 0 },
        { key: "basincKatsayisiFarki", label: "Basınç Katsayısı Farkı ΔCp", type: "number", step: 0.1, min: 0 },
        { key: "icDisSicaklikFarki_K", label: "İç–Dış Sıcaklık Farkı ΔT (K)", type: "number", step: 1, min: 0 },
      ]}
      defaults={{ catlakKatsayisi_C: 0.5, akisUsteli_n: 0.65, catlakUzunlugu_m: 10, ruzgarHizi_m_s: 5, basincKatsayisiFarki: 1, icDisSicaklikFarki_K: 20 }}
      mainUnit={'m³/h'}
      mainValueKey={'sizintiDebisi_m3h'}
      mainDecimals={1}
      intermediateLabels={{
        basinc_farki_Pa: "Basınç farkı (Pa)",
        sizinti_debisi_L_s: "Debi (L/s)",
        duyulur_isi_kaybi_kW: "Duyulur ısı kaybı (kW)",
      }}
    />
  );
}
