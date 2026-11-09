"use client";

import { kopukSolusyonKonsantreMiktari } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KopukSolusyonKonsantreMiktariPage() {
  return (
    <CalcPage
      module={kopukSolusyonKonsantreMiktari}
      standardsLabel="NFPA 11"
      description="Korunan alan, uygulama yoğunluğu ve süreden köpük solüsyon debisini, toplam solüsyonu, köpük konsantresi ve su miktarını hesaplar."
      formula="Q = A·q;  V = Q·t;  Konsantre = V·c·yedek;  Su = V·(1 − c)"
      engineeringNote="Uygulama yoğunluğu ve süre yakıt tipine ve tehlikeye göre standarttan alınır (hidrokarbonda tipik 4,1 L/dk·m², 15–30 dk; teyit edin). Hortum/ek bekleme ihtiyacı ve yedek konsantre (genellikle ≥ %100) yedek çarpanıyla verilir."
      fields={[
        { key: "korunanAlan_m2", label: "Korunan Alan (m²)", type: "number", step: 1, min: 1 },
        { key: "uygulamaYogunlugu_Ldkm2", label: "Uygulama Yoğunluğu (L/dk·m²)", type: "number", step: 0.1, min: 0.1 },
        { key: "uygulamaSuresi_dk", label: "Uygulama Süresi (dk)", type: "number", step: 1, min: 1 },
        { key: "konsantrasyon_yuzde", label: "Konsantrasyon (%)", type: "number", step: 1, min: 0.5 },
        { key: "yedekCarpani", label: "Yedek Çarpanı", type: "number", step: 0.1, min: 1 },
      ]}
      defaults={{ korunanAlan_m2: 100, uygulamaYogunlugu_Ldkm2: 4.1, uygulamaSuresi_dk: 20, konsantrasyon_yuzde: 3, yedekCarpani: 1 }}
      mainUnit="L"
      mainValueKey="konsantreMiktari_L"
      mainDecimals={0}
      intermediateLabels={{
        solusyon_debisi_Ldk: "Solüsyon Debisi (L/dk)",
        toplam_solusyon_L: "Toplam Solüsyon (L)",
        konsantre_tek_seferlik_L: "Konsantre – Tek Sefer (L)",
        su_ihtiyaci_L: "Su İhtiyacı (L)",
        pompa_debisi_m3h: "Pompa Debisi (m³/h)",
      }}
    />
  );
}
