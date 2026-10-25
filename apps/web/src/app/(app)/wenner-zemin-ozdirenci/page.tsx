"use client";

import { wennerZeminOzdirenci } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function WennerZeminOzdirenciPage() {
  return (
    <CalcPage
      module={wennerZeminOzdirenci}
      standardsLabel="IEEE Std 81"
      description="Wenner dört elektrot yönteminde ölçülen dirençten, elektrot aralığı ve çakma derinliğini hesaba katarak görünür zemin özdirencini hesaplar. Sonuç, topraklama çubuğu ve topraklama sistemi tasarımının girdisidir."
      formula="ρ = 4π·a·R / [1 + 2a/√(a² + 4b²) − a/√(a² + b²)],   b ≪ a iken ρ ≈ 2π·a·R"
      engineeringNote="Dört elektrot düz bir hat üzerinde eşit aralıkla (a) çakılır; ölçüm cihazı dış elektrotlardan akım verip iç elektrotlar arasındaki gerilimden R'yi gösterir. Bulunan ρ, yaklaşık a derinliğine kadar olan zeminin ortalamasıdır: farklı a değerleriyle (örn. 1, 2, 4, 8 m) ölçüm yapılarak zeminin katmanlı olup olmadığı anlaşılır. Ölçümü yeraltındaki metal boru ve kablolara paralel yapmayın. Kuru mevsimde ölçülen değer tasarım için güvenli taraftadır."
      fields={[
        { key: "elektrotAraligi_a_m", label: "Elektrot Aralığı a (m)", type: "number", min: 0.1, step: 0.5 },
        { key: "olculenDirenc_R_ohm", label: "Ölçülen Direnç R (Ω)", type: "number", min: 0.01, step: 0.1 },
        { key: "elektrotDerinligi_b_m", label: "Elektrot Çakma Derinliği b (m)", type: "number", min: 0, step: 0.05 },
      ]}
      defaults={{
        elektrotAraligi_a_m: 3,
        olculenDirenc_R_ohm: 5,
        elektrotDerinligi_b_m: 0.2,
      }}
      mainUnit="Ωm"
      mainValueKey="zeminOzdirenci_ohm_m"
      mainDecimals={1}
      intermediateLabels={{
        basitlestirilmis_2piaR_ohm_m: "Basitleştirilmiş 2πaR (Ωm)",
        basitlestirme_hatasi_yuzde: "Basitleştirme Farkı (%)",
        derinlik_aralik_orani_b_a: "Derinlik/Aralık Oranı b/a",
        temsil_edilen_derinlik_m: "Temsil Edilen Yaklaşık Derinlik (m)",
      }}
    />
  );
}
