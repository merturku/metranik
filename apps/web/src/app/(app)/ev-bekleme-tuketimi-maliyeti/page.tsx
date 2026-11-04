"use client";

import { evBeklemeTuketimiMaliyeti } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EvBeklemeTuketimiMaliyetiPage() {
  return (
    <CalcPage
      module={evBeklemeTuketimiMaliyeti}
      standardsLabel="Enerji = güç × süre"
      description="Cihazların bekleme (standby) gücünden yıllık gizli elektrik tüketimini ve maliyetini hesaplar."
      formula="E = P·n·h·365/1000  [kWh/yıl];   Maliyet = E × birim fiyat"
      engineeringNote="Bekleme gücünü cihaz etiketinden veya prize takılan watt-metreyle ölçün; televizyon, set-üstü kutu ve şarj adaptörleri tipik olarak 0,5–15 W çeker. Birim fiyat örnek bir girdidir, güncel faturanızdan alın."
      fields={[
        { key: "beklemeGucu_W", label: "Cihaz Başına Bekleme Gücü (W)", type: "number", step: 1, min: 0 },
        { key: "cihazSayisi", label: "Cihaz Adedi", type: "number", step: 1, min: 1 },
        { key: "gunlukBeklemeSaati", label: "Günlük Bekleme Süresi (saat)", type: "number", step: 1, min: 1 },
        { key: "birimFiyat_TLkWh", label: "Birim Fiyat (₺/kWh)", type: "number", step: 0.1, min: 0 },
      ]}
      defaults={{ beklemeGucu_W: 5, cihazSayisi: 5, gunlukBeklemeSaati: 20, birimFiyat_TLkWh: 3 }}
      mainUnit="₺/yıl"
      mainValueKey="yillikMaliyet_TL"
      mainDecimals={0}
      intermediateLabels={{
        yillik_enerji_kWh: "Yıllık Enerji (kWh)",
        toplam_bekleme_gucu_W: "Toplam Bekleme Gücü (W)",
        aylik_maliyet_TL: "Aylık Maliyet (₺)",
      }}
    />
  );
}
