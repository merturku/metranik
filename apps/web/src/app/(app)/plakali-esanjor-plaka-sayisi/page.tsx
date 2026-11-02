"use client";

import { plakaliEsanjorPlakaSayisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function PlakaliEsanjorPlakaSayisiPage() {
  return (
    <CalcPage
      module={plakaliEsanjorPlakaSayisi}
      standardsLabel="LMTD yöntemi (Q = U·A·LMTD)"
      description="Isı yükü, toplam ısı geçirgenliği ve LMTD'den gerekli ısı transfer alanını ve plakalı eşanjörün toplam plaka sayısını hesaplar."
      formula="A = Q/(U·LMTD)·(1+pay);   n = ⌈A/A_plaka⌉;   toplam plaka = n + 1"
      engineeringNote="U ve LMTD Eşanjör Toplam Isı Geçirgenliği (Kirlenme Dahil) ve Eşanjör Boyutlandırma (LMTD) modüllerinden alınabilir. Plaka alanı üretici verisidir (ısı transfer eden etkin alan). Basınç kaybı, plaka akış düzeni ve kanal sayıları üretici seçim yazılımıyla doğrulanmalıdır; bu modül yalnız ön boyutlandırmadır."
      fields={[
        { key: "isiYuku_kW", label: "Isı Yükü (kW)", type: "number", min: 0.1, step: 10 },
        { key: "U_Wm2K", label: "Toplam Isı Geçirgenliği U (W/m²K)", type: "number", min: 1, step: 100 },
        { key: "LMTD_K", label: "LMTD (K)", type: "number", min: 0.1, step: 0.5 },
        { key: "plakaAlani_m2", label: "Plaka Etkin Alanı (m²)", type: "number", min: 0.01, step: 0.05 },
        { key: "guvenlikPayiYuzde", label: "Güvenlik Payı (%)", type: "number", min: 0, step: 1 },
      ]}
      defaults={{ isiYuku_kW: 500, U_Wm2K: 4000, LMTD_K: 5, plakaAlani_m2: 0.3, guvenlikPayiYuzde: 10 }}
      mainUnit="adet (toplam plaka)"
      mainValueKey="toplamPlakaSayisi"
      mainDecimals={0}
      intermediateLabels={{
        net_alan_m2: "Net Gerekli Alan (m²)",
        gerekli_alan_m2: "Paylı Gerekli Alan (m²)",
        isi_transfer_plaka_sayisi: "Isı Transfer Eden Plaka Sayısı",
        kurulu_alan_m2: "Kurulu Alan (m²)",
        gercek_fazla_alan_yuzde: "Fiili Fazla Alan (%)",
      }}
    />
  );
}
