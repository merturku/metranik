"use client";

import { evAspiratorDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EvAspiratorDebisiPage() {
  return (
    <CalcPage
      module={evAspiratorDebisi}
      standardsLabel="Standart atfı yok"
      description="Mahal hacmi ve saatlik hava değişim sayısından aspiratör debisini hesaplar."
      formula="Q = V·n"
      engineeringNote="Tipik hava değişimi: banyo/WC 8–10 h⁻¹, mutfak 10–15 h⁻¹ (konut uygulaması; yerel yönetmelikten teyit edin). Kanal kayıp faktörü, kanal ve menfez kaybı yüzünden azalan gerçek debiyi karşılamak için katalog debisini büyütür. Telafi havası sağlanmalıdır."
      fields={[
        { key: "hacim_m3", label: "Mahal Hacmi (m³)", type: "number", step: 1, min: 0.1 },
        { key: "havaDegisimSayisi_ACH", label: "Hava Değişim Sayısı (1/h)", type: "number", step: 1, min: 0.5 },
        { key: "kanalKayipFaktoru", label: "Kanal Kayıp Faktörü (1–2)", type: "number", step: 0.05, min: 1 },
      ]}
      defaults={{ hacim_m3: 12, havaDegisimSayisi_ACH: 10, kanalKayipFaktoru: 1.25 }}
      mainUnit="m³/h"
      mainValueKey="gerekliDebi_m3h"
      mainDecimals={0}
      intermediateLabels={{
        debi_Ls: "Debi (L/s)",
        katalog_debisi_kayip_payli_m3h: "Katalog Debisi – Kayıp Paylı (m³/h)",
        katalog_debisi_CFM: "Katalog Debisi (CFM)",
      }}
    />
  );
}
