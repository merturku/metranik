"use client";

import { kirisDonatiOraniKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KirisDonatiOraniKontroluPage() {
  return (
    <CalcPage
      module={kirisDonatiOraniKontrolu}
      standardsLabel="TS 500 §7.3"
      description="Betonarme kirişin çekme donatısı oranını TS 500'deki alt sınır (çatlama sonrası gevrek kırılmayı önleyen asgari donatı) ve üst sınırla (dengeli donatı oranının %85'i ve %2) karşılaştırır."
      formula="ρ = As/(bw·d),  ρmin = 0,8·fctd/fyd,  ρb = 0,85·k1·(fcd/fyd)·600/(600+fyd),  ρmax = min(0,02; 0,85·ρb)"
      engineeringNote="Bu kontrol Kiriş Boyutlandırma (moment kapasitesi) hesabını tamamlar: kapasite yeterli olsa bile donatı oranı sınırlar dışındaysa kesit yönetmeliğe uymaz. Basınç donatısı ihmal edildiği için üst sınır kontrolü güvenli taraftadır. TBDY 2018 sünek kirişlerde mesnet üst donatısı için ek koşullar getirir."
      fields={[
        { key: "betonKarakteristikDayanim_fck_MPa", label: "Beton Dayanımı fck (MPa)", type: "number", min: 16, step: 5 },
        { key: "celikAkmaDayanimi_fyk_MPa", label: "Çelik Akma Dayanımı fyk (MPa)", type: "number", min: 220, step: 10 },
        { key: "govdeGenisligi_bw_mm", label: "Gövde Genişliği bw (mm)", type: "number", min: 100, step: 50 },
        { key: "faydaliYukseklik_d_mm", label: "Faydalı Yükseklik d (mm)", type: "number", min: 100, step: 50 },
        { key: "cekmeDonatisiAlani_As_mm2", label: "Çekme Donatısı Alanı As (mm²)", type: "number", min: 1, step: 50 },
      ]}
      defaults={{
        betonKarakteristikDayanim_fck_MPa: 25,
        celikAkmaDayanimi_fyk_MPa: 420,
        govdeGenisligi_bw_mm: 300,
        faydaliYukseklik_d_mm: 550,
        cekmeDonatisiAlani_As_mm2: 603,
      }}
      mainUnit="ρ"
      mainValueKey="donatiOrani"
      mainDecimals={5}
      intermediateLabels={{
        minimum_donati_orani: "Asgari Donatı Oranı ρmin",
        dengeli_donati_orani_rhob: "Dengeli Donatı Oranı ρb",
        maksimum_donati_orani: "Azami Donatı Oranı ρmax",
        minimum_donati_alani_mm2: "Asgari Donatı Alanı (mm²)",
        maksimum_donati_alani_mm2: "Azami Donatı Alanı (mm²)",
        k1: "Eşdeğer Basınç Bloğu Katsayısı k1",
      }}
    />
  );
}
