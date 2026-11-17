"use client";

import { daireselMilBurulma } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DaireselMilBurulmaPage() {
  return (
    <CalcPage
      module={daireselMilBurulma}
      standardsLabel={"Saint-Venant burulma teorisi"}
      description={"Dolu veya boru kesitli dairesel milde burulma momentinden en büyük kayma gerilmesini, kutupsal atalet momentini ve uç dönme açısını hesaplar."}
      formula={"J = π(d⁴ − di⁴)/32;  τmaks = T·(d/2)/J;  φ = T·L/(G·J)"}
      engineeringNote={"Yalnız dairesel (dolu/boru) kesitler için geçerlidir; kama yuvası ve kesit değişimlerindeki gerilme yığılması dahil değildir. Çeliğin kayma modülü G ≈ 80 GPa'dır. İzin verilen kayma gerilmesi ayrıca malzeme akma sınırı ve güvenlik katsayısına göre kontrol edilmelidir."}
      fields={[
        { key: "disCap_mm", label: "Dış Çap d (mm)", type: "number", step: 5, min: 1 },
        { key: "icCap_mm", label: "İç Çap di (mm, dolu için 0)", type: "number", step: 5, min: 0 },
        { key: "moment_kNm", label: "Burulma Momenti T (kN·m)", type: "number", step: 0.5, min: 0 },
        { key: "boy_m", label: "Mil Boyu L (m)", type: "number", step: 0.1, min: 0.01 },
        { key: "g_GPa", label: "Kayma Modülü G (GPa)", type: "number", step: 1, min: 1 },
      ]}
      defaults={{ disCap_mm: 50, icCap_mm: 0, moment_kNm: 1, boy_m: 1, g_GPa: 80 }}
      mainUnit={"MPa"}
      mainValueKey={"tauMaks_MPa"}
      mainDecimals={2}
      intermediateLabels={{
        J_mm4: "Kutupsal Atalet J (mm⁴)",
        donme_rad: "Dönme Açısı (rad)",
        donme_derece: "Dönme Açısı (°)",
      }}
    />
  );
}
