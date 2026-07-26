"use client";

import { sicakSuSirkulasyonDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SicakSuSirkulasyonDebisiPage() {
  return (
    <CalcPage
      module={sicakSuSirkulasyonDebisi}
      standardsLabel="Fiziksel Formül"
      description="Sirkülasyon hattındaki ısı kaybını karşılamak için gerekli su debisini hesaplar."
      formula="ṁ = Qkayıp / (cp × ΔT)"
      engineeringNote="Hat ısı kaybı boru izolasyon kalitesine ve hat uzunluğuna göre değişir; izin verilen sıcaklık düşüşü tipik olarak 5°C civarında tutulur."
      fields={[
        {
          key: "hatIsiKaybi_Qkayip_kW",
          label: "Hat Isı Kaybı (kW)",
          type: "number",
          min: 0.01,
          step: 0.1,
        },
        {
          key: "izinVerilenSicaklikDususu_dT_C",
          label: "İzin Verilen Sıcaklık Düşüşü ΔT (°C)",
          type: "number",
          min: 0.5,
          step: 0.5,
        },
      ]}
      defaults={{ hatIsiKaybi_Qkayip_kW: 2, izinVerilenSicaklikDususu_dT_C: 5 }}
      mainUnit="L/s"
      mainValueKey="sirkulasyonDebisi_Ls"
      intermediateLabels={{ suOzgulIsi_kJ_kgK: "Su Özgül Isısı (kJ/kgK)" }}
    />
  );
}
