"use client";

import { isikSiddetiAkiAciDonusumu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IsikSiddetiAkiAciDonusumuPage() {
  return (
    <CalcPage
      module={isikSiddetiAkiAciDonusumu}
      standardsLabel={"CIE / SI fotometri tanımları"}
      description={"Armatürün ışık akısı ve ışın açısından ortalama ışık şiddetini (cd), katı açıyı ve belirli mesafedeki eksen aydınlığını hesaplar."}
      formula={"Ω = 2π·(1 − cos(θ/2));  I = Φ/Ω;  E = I/d²"}
      engineeringNote={"Işık şiddeti koni içinde düzgün dağılmış kabul edilir (gerçek armatürde merkezde daha yüksektir); ışın açısı tam koni açısıdır (yarı şiddet açısı). Eksen aydınlığı için ters kare yasası mesafenin armatür boyutlarının 5 katından büyük olduğu noktalarda geçerlidir. Yüzeye dik gelen aydınlık için kullanılır."}
      fields={[
        { key: "aki_lm", label: "Işık Akısı Φ (lm)", type: "number", step: 100, min: 1 },
        { key: "isinAcisi_deg", label: "Işın Açısı θ (°, tam koni)", type: "number", step: 5, min: 1 },
        { key: "mesafe_m", label: "Mesafe d (m)", type: "number", step: 0.5, min: 0.1 },
      ]}
      defaults={{ aki_lm: 1000, isinAcisi_deg: 60, mesafe_m: 3 }}
      mainUnit={"cd"}
      mainValueKey={"isikSiddeti_cd"}
      mainDecimals={1}
      intermediateLabels={{
        kati_aci_sr: "Katı Açı Ω (sr)",
        eksen_aydinligi_lx: "Eksen Aydınlığı (lx)",
      }}
    />
  );
}
