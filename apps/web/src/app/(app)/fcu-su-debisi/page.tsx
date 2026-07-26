"use client";

import { fcuSuDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function FcuSuDebisiPage() {
  return (
    <CalcPage
      module={fcuSuDebisi}
      standardsLabel="Fiziksel Formül"
      description="Fan coil ünitesinin ısıl yüküne ve su sıcaklık farkına göre gerekli su debisini hesaplar."
      formula="ṁ = Q / (cp × ΔT)"
      engineeringNote="Soğutma uygulamalarında tipik giriş/çıkış su sıcaklığı 7°C/12°C (ΔT=5°C), ısıtmada 70°C/50°C gibi daha yüksek ΔT değerleri kullanılabilir."
      fields={[
        { key: "isilYuk_Q_kW", label: "Isıl Yük Q (kW)", type: "number", min: 0.1, step: 0.5 },
        {
          key: "suSicaklikFarki_dT_C",
          label: "Su Sıcaklık Farkı ΔT (°C)",
          type: "number",
          min: 0.5,
          step: 0.5,
        },
      ]}
      defaults={{ isilYuk_Q_kW: 10, suSicaklikFarki_dT_C: 5 }}
      mainUnit="L/s"
      mainValueKey="suDebisi_Ls"
      intermediateLabels={{ suOzgulIsi_kJ_kgK: "Su Özgül Isısı (kJ/kgK)" }}
    />
  );
}
