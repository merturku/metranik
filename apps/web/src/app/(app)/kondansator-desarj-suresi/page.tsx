"use client";

import { kondansatorDesarjSuresi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KondansatorDesarjSuresiPage() {
  return (
    <CalcPage
      module={kondansatorDesarjSuresi}
      standardsLabel="RC Deşarj Denklemi"
      description="Deşarj direncine ve kapasiteye göre kondansatörün ilk gerilimden güvenli hedef gerilime düşmesi için geçen süreyi hesaplar."
      formula="t = R × C × ln(V1/V2)"
      engineeringNote="Kompanzasyon panolarında kondansatörlerin devre dışı bırakıldıktan sonra güvenli dokunma gerilimine (tipik ≤50V) inmesi için deşarj direnci zorunludur (IEC 60831)."
      fields={[
        {
          key: "desarjDirenci_R_ohm",
          label: "Deşarj Direnci R (Ω)",
          type: "number",
          min: 1,
          step: 100,
        },
        { key: "kapasite_C_F", label: "Kapasite C (F)", type: "number", min: 0.000001, step: 0.000001 },
        { key: "ilkGerilim_V1_V", label: "İlk Gerilim V1 (V)", type: "number", min: 1, step: 10 },
        {
          key: "hedefGerilim_V2_V",
          label: "Hedef Gerilim V2 (V)",
          type: "number",
          min: 1,
          step: 5,
        },
      ]}
      defaults={{
        desarjDirenci_R_ohm: 100000,
        kapasite_C_F: 0.00005,
        ilkGerilim_V1_V: 400,
        hedefGerilim_V2_V: 50,
      }}
      mainUnit="s"
      mainValueKey="desarjSuresi_s"
      intermediateLabels={{ zamanSabiti_RC_s: "Zaman Sabiti (RC, s)" }}
    />
  );
}
