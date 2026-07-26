"use client";

import { esanjorBoyutlandirma } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EsanjorBoyutlandirmaPage() {
  return (
    <CalcPage
      module={esanjorBoyutlandirma}
      standardsLabel="Fiziksel Formül"
      description="Isıl yüke, ısı transfer katsayısına ve logaritmik ortalama sıcaklık farkına (LMTD) göre gerekli eşanjör yüzey alanını hesaplar."
      formula="A = Q / (U × LMTD)"
      engineeringNote="Isı transfer katsayısı (U) eşanjör tipine (plaka, borulu) ve akışkan çiftine göre değişir; LMTD, giriş/çıkış sıcaklıklarından ayrıca hesaplanmalıdır."
      fields={[
        { key: "isilYuk_Q_kW", label: "Isıl Yük Q (kW)", type: "number", min: 1, step: 1 },
        {
          key: "isiTransferKatsayisi_U_Wm2K",
          label: "Isı Transfer Katsayısı U (W/m²K)",
          type: "number",
          min: 10,
          step: 10,
        },
        {
          key: "logaritmikOrtalamaSicaklikFarki_LMTD_C",
          label: "LMTD (°C)",
          type: "number",
          min: 0.5,
          step: 0.5,
        },
      ]}
      defaults={{
        isilYuk_Q_kW: 100,
        isiTransferKatsayisi_U_Wm2K: 1500,
        logaritmikOrtalamaSicaklikFarki_LMTD_C: 10,
      }}
      mainUnit="m²"
      mainValueKey="gerekliYuzeyAlani_m2"
      intermediateLabels={{ isilYuk_W: "Isıl Yük (W)" }}
    />
  );
}
