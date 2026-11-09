"use client";

import { evCitDirekSayisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function EvCitDirekSayisiPage() {
  return (
    <CalcPage
      module={evCitDirekSayisi}
      standardsLabel="Standart atfı yok"
      description="Toplam çit uzunluğu, direk aralığı, kapılar ve köşelerden gereken direk ve panel sayısını hesaplar."
      formula="Aralık = ⌈L_net/s⌉;  Direk = Aralık (kapalı) veya Aralık + 1 (açık) + 2·kapı + köşe"
      engineeringNote="L_net toplam uzunluktan kapı genişlikleri çıkarılarak bulunur; her kapı için 2 kapı kolonu eklenir. Direk aralığı panel/üretici genişliğinden alınır. Zemin türü, temel ve donatı metrajı bu modülde yoktur."
      fields={[
        { key: "toplamUzunluk_m", label: "Toplam Uzunluk (m)", type: "number", step: 1, min: 0.1 },
        { key: "direkAraligi_m", label: "Direk Aralığı (m)", type: "number", step: 0.1, min: 0.1 },
        { key: "hatTipi", label: "Hat Tipi", type: "select", options: [{ value: "kapali", label: "Kapalı çevre" }, { value: "acik", label: "Açık hat" }] },
        { key: "kapiSayisi", label: "Kapı Sayısı", type: "number", step: 1, min: 0 },
        { key: "kapiGenisligi_m", label: "Kapı Genişliği (m)", type: "number", step: 0.1, min: 0 },
        { key: "koseSayisi", label: "Ek Köşe Direği Sayısı", type: "number", step: 1, min: 0 },
      ]}
      defaults={{ toplamUzunluk_m: 100, direkAraligi_m: 2.5, hatTipi: "kapali", kapiSayisi: 1, kapiGenisligi_m: 3, koseSayisi: 4 }}
      mainUnit="adet"
      mainValueKey="toplamDirek"
      mainDecimals={0}
      intermediateLabels={{
        net_uzunluk_m: "Net Uzunluk (m)",
        aralik_sayisi: "Aralık Sayısı",
        panel_sayisi: "Panel Sayısı",
        hat_direkleri: "Hat Direkleri",
        kapi_kolonlari: "Kapı Kolonları",
        kose_direkleri: "Köşe Direkleri",
        gercek_aralik_m: "Gerçek Aralık (m)",
      }}
    />
  );
}
