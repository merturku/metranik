"use client";

import { yukFaktoruTalepAnalizi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YukFaktoruTalepAnaliziPage() {
  return (
    <CalcPage
      module={yukFaktoruTalepAnalizi}
      standardsLabel="Standart atfı yok"
      description="Dönem tüketimi ve pik talepten yük faktörünü, kullanım faktörünü ve talep bedelini hesaplar."
      formula="LF = E/(P_pik·T) = P_ort/P_pik;  UF = P_pik/P_kurulu;  Talep bedeli = P_pik·birim bedel"
      engineeringNote="Düşük yük faktörü pik talebin az kullanıldığını gösterir (pik traşlama/yük kaydırma fırsatı). Yük faktörü 1'i aşamaz. Tarife eşikleri bu modülde yoktur; kıyas amaçlıdır."
      fields={[
        { key: "tuketim_kWh", label: "Dönem Tüketimi (kWh)", type: "number", step: 100, min: 1 },
        { key: "donemSuresi_h", label: "Dönem Süresi (h)", type: "number", step: 24, min: 1 },
        { key: "pikTalep_kW", label: "Pik Talep (kW)", type: "number", step: 5, min: 0.1 },
        { key: "kuruluGuc_kW", label: "Kurulu Güç (kW)", type: "number", step: 5, min: 0.1 },
        { key: "talepBedeli_TLkW", label: "Talep Bedeli (₺/kW)", type: "number", step: 5, min: 0 },
      ]}
      defaults={{ tuketim_kWh: 72000, donemSuresi_h: 720, pikTalep_kW: 200, kuruluGuc_kW: 400, talepBedeli_TLkW: 150 }}
      mainUnit=""
      mainValueKey="yukFaktoru"
      mainDecimals={3}
      intermediateLabels={{
        ortalama_guc_kW: "Ortalama Güç (kW)",
        kullanim_faktoru: "Kullanım Faktörü",
        talep_bedeli_TL: "Talep Bedeli (₺)",
        pik_baslangic_orani: "Pik / Ortalama",
        pik_azaltma_1kW_tasarruf_TL: "1 kW Pik Azaltma Değeri (₺)",
      }}
    />
  );
}
