"use client";

import { chillerKondenserSuDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ChillerKondenserSuDebisiPage() {
  return (
    <CalcPage
      module={chillerKondenserSuDebisi}
      standardsLabel="Enerji dengesi (Q_cond = Q_evap + W)"
      description="Su soğutmalı chiller'ın kondenserden atacağı ısıyı ve kule/kondenser devresi su debisini hesaplar."
      formula="W = Q_evap/COP;   Q_cond = Q_evap + W;   ṁ = Q_cond/(cp·ΔT)"
      engineeringNote="COP, kompresör motoru dahil toplam elektrik girişine göre alınmalıdır (hermetik/yarı hermetik makinede motor kaybı kondenserden atılır). Kondenser ΔT'si tipik 5 K'dir (ör. 30→35 °C). Bulunan debi ve ısı Soğutma Kulesi Kapasitesi ve Makyaj Suyu modüllerinin girdisidir; kısmi yükte verim için Chiller Kısmi Yük Verimi (IPLV) modülüne bakın."
      fields={[
        { key: "sogutmaKapasitesi_kW", label: "Soğutma Kapasitesi Q_evap (kW)", type: "number", min: 1, step: 10 },
        { key: "sogutmaCOP", label: "Soğutma COP", type: "number", min: 1.1, step: 0.1 },
        { key: "kondenserSuDeltaT_K", label: "Kondenser Su ΔT (K)", type: "number", min: 1, step: 0.5 },
      ]}
      defaults={{ sogutmaKapasitesi_kW: 500, sogutmaCOP: 5, kondenserSuDeltaT_K: 5 }}
      mainUnit="m³/h (kondenser su debisi)"
      mainValueKey="kondenserSuDebisi_m3h"
      mainDecimals={1}
      intermediateLabels={{
        kompresor_gucu_kW: "Kompresör Gücü (kW)",
        kondenser_isisi_kW: "Kondenser Isısı (kW)",
        kondenser_isisi_TR: "Kondenser Isısı (TR)",
        su_debisi_Ls: "Kondenser Su Debisi (L/s)",
        evaporator_debisi_5K_m3h: "Evaporatör Debisi, ΔT 5 K (m³/h)",
      }}
    />
  );
}
