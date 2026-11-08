"use client";

import { kolonEtriyeSarilmaDonatisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KolonEtriyeSarilmaDonatisiPage() {
  return (
    <CalcPage
      module={kolonEtriyeSarilmaDonatisi}
      standardsLabel="TBDY 2018 (madde no teyit edin)"
      description="Deprem bölgesi kolonlarında sarılma bölgesi için gereken enine donatı (etriye) alanını hesaplar ve mevcut etriye alanıyla karşılaştırır."
      formula="Ash ≥ 0,30·s·bk·(fck/fywk)·[(Ac/Ack) − 1]  ve  Ash ≥ 0,075·s·bk·(fck/fywk)"
      engineeringNote="s etriye aralığı, bk çekirdek boyutu (etriye dış yüzleri arası), Ac brüt alan, Ack etriye dışından ölçülen çekirdek alanıdır. Kontrol her doğrultu için ayrı yapılır; Ash o doğrultuya dik tüm etriye kollarının toplam alanıdır. Aralık üst sınırı, çiroz ve bindirme koşulları ile madde numaraları yönetmelikten teyit edilmelidir."
      fields={[
        { key: "etriyeAraligi_s_mm", label: "Etriye Aralığı s (mm)", type: "number", step: 5, min: 1 },
        { key: "cekirdekBoyutu_bk_mm", label: "Çekirdek Boyutu bk (mm)", type: "number", step: 5, min: 1 },
        { key: "brutAlan_Ac_mm2", label: "Brüt Alan Ac (mm²)", type: "number", step: 1000, min: 1 },
        { key: "cekirdekAlani_Ack_mm2", label: "Çekirdek Alanı Ack (mm²)", type: "number", step: 1000, min: 1 },
        { key: "fck_MPa", label: "Beton fck (MPa)", type: "number", step: 1, min: 1 },
        { key: "fywk_MPa", label: "Etriye fywk (MPa)", type: "number", step: 10, min: 1 },
        { key: "mevcutAsh_mm2", label: "Mevcut Ash (mm²)", type: "number", step: 10, min: 0 },
      ]}
      defaults={{ etriyeAraligi_s_mm: 100, cekirdekBoyutu_bk_mm: 400, brutAlan_Ac_mm2: 250000, cekirdekAlani_Ack_mm2: 193600, fck_MPa: 30, fywk_MPa: 420, mevcutAsh_mm2: 300 }}
      mainUnit="mm²"
      mainValueKey="gerekliAsh_mm2"
      mainDecimals={1}
      intermediateLabels={{
        birinci_kosul_Ash_mm2: "1. Koşul Ash (mm²)",
        ikinci_kosul_Ash_mm2: "2. Koşul Ash (mm²)",
        belirleyici: "Belirleyici Koşul",
        mevcut_Ash_mm2: "Mevcut Ash (mm²)",
        mevcut_gerekli_orani: "Mevcut / Gerekli",
        not: "Not",
      }}
    />
  );
}
