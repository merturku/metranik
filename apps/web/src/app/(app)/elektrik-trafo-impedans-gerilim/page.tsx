"use client";
import { CalcPage } from "@/components/calc-page";
import { trafoImpedansGerilim } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={trafoImpedansGerilim}
      standardsLabel="IEC 60076-1"
      description="Trafo etiketindeki kısa devre gerilimi (uk) ve yük kayıplarından (Pk) empedansın rezistif/reaktif bileşenlerini ayırır, verilen yüklenme ve güç faktöründe trafo içindeki gerilim düşümünü hesaplar."
      formula="uR = Pk/Sn×100, uX = √(uk² − uR²), ΔU% = β(uR·cosφ + uX·sinφ) + β²(uX·cosφ − uR·sinφ)²/200"
      engineeringNote="uk ve Pk (75 °C'ye düzeltilmiş yük kaybı) trafo etiketinden ya da test raporundan alınır. Endüktif yükte düşüm ağırlıkla reaktif bileşenden (uX) gelir; kapasitif yükte ΔU negatif olabilir (gerilim yükselmesi), bu modül endüktif/omik yükü varsayar."
      fields={[
        { key: "guc_kVA", label: "Anma Gücü Sn (kVA)", type: "number", min: 1, step: 50 },
        { key: "kisa_devre_kaybi_kW", label: "Yük Kaybı Pk (kW)", type: "number", min: 0.01, step: 0.5 },
        { key: "kisa_devre_gerilimi_yuzde", label: "Kısa Devre Gerilimi uk (%)", type: "number", min: 0.5, step: 0.5 },
        { key: "yuklenme_orani", label: "Yüklenme Oranı β (I/In)", type: "number", min: 0.05, step: 0.1 },
        { key: "guc_faktoru_cosfi", label: "Güç Faktörü cosφ", type: "number", min: 0.1, step: 0.05 },
      ]}
      defaults={{
        guc_kVA: 630,
        kisa_devre_kaybi_kW: 6,
        kisa_devre_gerilimi_yuzde: 4,
        yuklenme_orani: 1,
        guc_faktoru_cosfi: 0.8,
      }}
      mainUnit="%"
      mainValueKey="gerilim_dusumu_yuzde"
      mainDecimals={2}
      intermediateLabels={{
        rezistif_gerilim_uR_yuzde: "uR (%)",
        reaktif_gerilim_uX_yuzde: "uX (%)",
        birinci_derece_terim_yuzde: "Birinci Derece Terim (%)",
      }}
    />
  );
}
