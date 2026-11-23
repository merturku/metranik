"use client";

import { betonRotreKisalma } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BetonRotreKisalmaPage() {
  return (
    <CalcPage
      module={betonRotreKisalma}
      standardsLabel={'TS EN 1992-1-1 §3.1.4'}
      description={'Kuruma ve otojen rötreden toplam rötre şekil değiştirmesini ve elemanın boy kısalmasını hesaplar.'}
      formula={'εcs = εcd + εca;  εcd = kh·εcd,0;  εca = 2,5(fck − 10)·10⁻⁶;  ΔL = εcs·L'}
      engineeringNote={'kh katsayısı EC2 Tablo 3.3\'ten h0 = 2Ac/u için doğrusal enterpolasyonla bulunur (h0 < 100 mm\'de 1,0, ≥ 500 mm\'de 0,70). Nominal kuruma rötresi εcd,0 değeri çimento sınıfı ve bağıl neme göre EC2 Ek B/Tablo 3.2\'den girilir; modül tablo gömmez. Zamana bağlı gelişim ve sünme hesaplanmaz, yalnız nihai (t = ∞) değerdir. Ulusal ek değerlerini teyit edin.'}
      fields={[
        { key: "fck_MPa", label: "Karakteristik Silindir Dayanımı fck (MPa)", type: "number", step: 1, min: 12 },
        { key: "h0_mm", label: "Kuramsal Kalınlık h0 = 2Ac/u (mm)", type: "number", step: 10, min: 1 },
        { key: "epsCd0_promil", label: "Nominal Kuruma Rötresi εcd,0 (‰)", type: "number", step: 0.01, min: 0 },
        { key: "uzunluk_m", label: "Eleman Boyu L (m)", type: "number", step: 1, min: 0.1 },
      ]}
      defaults={{ fck_MPa: 30, h0_mm: 200, epsCd0_promil: 0.45, uzunluk_m: 10 }}
      mainUnit={'‰'}
      mainValueKey={'toplamRotre_promil'}
      mainDecimals={4}
      intermediateLabels={{
        kh: "kh katsayısı",
        kuruma_rotresi_promil: "εcd (‰)",
        otojen_rotre_promil: "εca (‰)",
        boy_kisalmasi_mm: "Boy kısalması (mm)",
        kisalma_mm_m: "Kısalma (mm/m)",
      }}
    />
  );
}
