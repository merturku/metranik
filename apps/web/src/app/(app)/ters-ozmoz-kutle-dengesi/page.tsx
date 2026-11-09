"use client";

import { tersOzmozKutleDengesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TersOzmozKutleDengesiPage() {
  return (
    <CalcPage
      module={tersOzmozKutleDengesi}
      standardsLabel="Kütle dengesi (standart atfı yok)"
      description="Ters ozmoz sisteminde geri kazanıma göre ürün suyu ve konsantre debisini, ürün suyu ve konsantre tuz konsantrasyonunu hesaplar."
      formula="Qp = R·Qf;  Qc = Qf − Qp;  Cp = Cf·(1 − Ret);  Cc = (Qf·Cf − Qp·Cp)/Qc"
      engineeringNote="Geri kazanım yükseldikçe konsantre tuzluluğu artar; kireç, sülfat ve silika çözünürlük sınırları su analizi ve membran üreticisiyle doğrulanmalıdır. Ret oranı ortalama değerdir; basınç ve sıcaklığa göre değişir."
      fields={[
        { key: "beslemeDebisi_m3h", label: "Besleme Debisi Qf (m³/h)", type: "number", step: 0.5, min: 0.01 },
        { key: "geriKazanim_yuzde", label: "Geri Kazanım R (%)", type: "number", step: 1, min: 1 },
        { key: "beslemeTDS_mgL", label: "Besleme TDS Cf (mg/L)", type: "number", step: 10, min: 1 },
        { key: "tuzRetOrani_yuzde", label: "Tuz Ret Oranı (%)", type: "number", step: 0.5, min: 0 },
      ]}
      defaults={{ beslemeDebisi_m3h: 10, geriKazanim_yuzde: 75, beslemeTDS_mgL: 1000, tuzRetOrani_yuzde: 98 }}
      mainUnit="m³/h"
      mainValueKey="uretilenSuDebisi_m3h"
      mainDecimals={2}
      intermediateLabels={{
        konsantre_debisi_m3h: "Konsantre Debisi (m³/h)",
        urun_suyu_TDS_mgL: "Ürün Suyu TDS (mg/L)",
        konsantre_TDS_mgL: "Konsantre TDS (mg/L)",
        konsantrasyon_faktoru: "Konsantrasyon Faktörü",
        tuz_dengesi_hatasi: "Tuz Dengesi Hatası",
      }}
    />
  );
}
