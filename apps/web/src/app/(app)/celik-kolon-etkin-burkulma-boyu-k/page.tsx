"use client";

import { celikKolonEtkinBurkulmaBoyuK } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function CelikKolonEtkinBurkulmaBoyuKPage() {
  return (
    <CalcPage
      module={celikKolonEtkinBurkulmaBoyuK}
      standardsLabel={"AISC 360 Ek 7 yorumu / Duan-King-Chen yaklaşık formülleri"}
      description={"Kolon uçlarındaki kiriş-kolon rijitlik oranlarından (GA, GB) ötelenmesiz veya ötelenmeli çerçeve için etkin boy katsayısı K'yı, burkulma boyunu ve narinliği hesaplar."}
      formula={"Ötelenmesiz: K = (3GAGB + 1,4(GA+GB) + 0,64)/(3GAGB + 2,0(GA+GB) + 1,28);  Ötelenmeli: K = √[(1,6GAGB + 4(GA+GB) + 7,5)/(GA+GB + 7,5)]"}
      engineeringNote={"G = Σ(EI/L)kolon/Σ(EI/L)kiriş (düğüm noktasında). Ankastre uç G = 0 (teorik, pratikte 1,0 önerilir), mafsallı uç G = ∞ (pratikte 10). Bu yaklaşık formüller hizalama (nomogram) çözümünü %1–2 içinde verir. Ötelenmeli çerçevede K ≥ 1,0'dır. TS EN 1993-1-1 burkulma boyu için ayrıca sistem burkulma analizi veya ilgili ekleri kullanılabilir."}
      fields={[
        { key: "ga", label: "Üst Uç G (GA)", type: "number", step: 0.1, min: 0 },
        { key: "gb", label: "Alt Uç G (GB)", type: "number", step: 0.1, min: 0 },
        { key: "cerceve", label: "Çerçeve Davranışı", type: "select", options: [{ value: "otelenmesiz", label: "Ötelenmesiz (braced)" }, { value: "otelenmeli", label: "Ötelenmeli (sway)" }] },
        { key: "L_m", label: "Kolon Boyu L (m)", type: "number", step: 0.1, min: 0.1 },
        { key: "r_mm", label: "Atalet Yarıçapı r (mm)", type: "number", step: 5, min: 1 },
      ]}
      defaults={{ ga: 1, gb: 1, cerceve: "otelenmesiz", L_m: 4, r_mm: 60 }}
      mainUnit={""}
      mainValueKey={"K"}
      mainDecimals={3}
      intermediateLabels={{
        burkulma_boyu_m: "Burkulma Boyu K·L (m)",
        narinlik: "Narinlik K·L/r",
      }}
    />
  );
}
