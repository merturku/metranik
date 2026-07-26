"use client";

import { dengeKabiHacmi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DengeKabiHacmiPage() {
  return (
    <CalcPage
      module={dengeKabiHacmi}
      standardsLabel="Fiziksel Formül"
      description="Isı kaynağının kısa devrelerden korunması için gerekli asgari çalışma süresine göre denge kabı (buffer tank) hacmini hesaplar."
      formula="V = (Q × t) / (cp × ΔT)"
      engineeringNote="Sık açma-kapama (kısa devre) kazan/ısı pompası ömrünü kısaltır; buffer tank bu döngüleri yavaşlatmak için kullanılır."
      fields={[
        {
          key: "isiKaynagiGucu_Q_kW",
          label: "Isı Kaynağı Gücü Q (kW)",
          type: "number",
          min: 0.5,
          step: 0.5,
        },
        {
          key: "minimumCalismaSuresi_t_s",
          label: "Minimum Çalışma Süresi t (s)",
          type: "number",
          min: 10,
          step: 10,
        },
        {
          key: "izinVerilenSicaklikFarki_dT_C",
          label: "İzin Verilen Sıcaklık Farkı ΔT (°C)",
          type: "number",
          min: 1,
          step: 1,
        },
      ]}
      defaults={{
        isiKaynagiGucu_Q_kW: 20,
        minimumCalismaSuresi_t_s: 600,
        izinVerilenSicaklikFarki_dT_C: 10,
      }}
      mainUnit="L"
      mainValueKey="gerekliHacim_L"
      intermediateLabels={{ gerekliEnerji_kJ: "Gerekli Enerji (kJ)" }}
    />
  );
}
