"use client";

import { yildizUcgenDirencDonusumu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YildizUcgenDirencDonusumuPage() {
  return (
    <CalcPage
      module={yildizUcgenDirencDonusumu}
      standardsLabel="Y–Δ (Kennelly) dönüşümü"
      description="Yıldız bağlı üç direncin eşdeğer üçgen dirençlerini hesaplar ve geri dönüşümle doğrular."
      formula="Rab = (RaRb + RbRc + RcRa)/Rc;  Rbc = (…)/Ra;  Rca = (…)/Rb;  simetrik: RΔ = 3·RY"
      engineeringNote="Dönüşüm yalnız uç noktalardan görülen eşdeğerlik içindir; iç düğüm gerilimi/akımı ayrıca bulunmak istenirse orijinal devreye dönülür. Motor sargı Y/Δ çalışma farkı için Yıldız-Üçgen Yol Verme modülüne bakın."
      fields={[
        { key: "ra_ohm", label: "Ra (Ω)", type: "number", step: 1, min: 0.001 },
        { key: "rb_ohm", label: "Rb (Ω)", type: "number", step: 1, min: 0.001 },
        { key: "rc_ohm", label: "Rc (Ω)", type: "number", step: 1, min: 0.001 },
      ]}
      defaults={{ ra_ohm: 10, rb_ohm: 20, rc_ohm: 30 }}
      mainUnit="Ω"
      mainValueKey="rab_ohm"
      mainDecimals={3}
      intermediateLabels={{
        rbc_ohm: "Rbc (Ω)",
        rca_ohm: "Rca (Ω)",
        geri_donusum_ra_ohm: "Geri Dönüşüm Ra (Ω)",
        geri_donusum_rb_ohm: "Geri Dönüşüm Rb (Ω)",
        geri_donusum_rc_ohm: "Geri Dönüşüm Rc (Ω)",
      }}
    />
  );
}
