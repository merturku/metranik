"use client";

import { trafoYillikKayipMaliyeti } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TrafoYillikKayipMaliyetiPage() {
  return (
    <CalcPage
      module={trafoYillikKayipMaliyeti}
      standardsLabel="IEC 60076-20 / AB 2019/1783 (Ecodesign) — trafo kayıpları"
      description="Trafonun boşta ve yük kayıplarından yıllık kayıp enerjisini ve maliyetini hesaplar."
      formula="E = (P0 + β²·Pk)·t"
      engineeringNote="P0 (boşta/demir kaybı) ve Pk (anma yükteki bakır kaybı) trafo etiketi veya katalogdan alınır. β ortalama değil eşdeğer (RMS) yüklenme olmalıdır; kayıp β² ile arttığından değişken yükte ortalama değer kaybı hafife alır. Yüklenme kontrolü için Trafo Yüklenme Oranı ve verim için Trafo Verimi modüllerine bakın."
      fields={[
        { key: "bostaKaybi_kW", label: "Boşta Kaybı P0 (kW)", type: "number", min: 0, step: 0.1 },
        { key: "yukKaybi_kW", label: "Anma Yük Kaybı Pk (kW)", type: "number", min: 0, step: 0.5 },
        { key: "yuklenmeOrani", label: "Ortalama (RMS) Yüklenme β (0–1,5)", type: "number", min: 0, step: 0.05 },
        { key: "yillikSaat", label: "Yıllık Bağlı Kalma Süresi (saat)", type: "number", min: 1, step: 100 },
        { key: "elektrikFiyati_TLkWh", label: "Elektrik Fiyatı (₺/kWh)", type: "number", min: 0, step: 0.1 },
      ]}
      defaults={{ bostaKaybi_kW: 1.1, yukKaybi_kW: 7.5, yuklenmeOrani: 0.6, yillikSaat: 8760, elektrikFiyati_TLkWh: 3 }}
      mainUnit="kWh/yıl (trafo kaybı)"
      mainValueKey="yillikKayip_kWh"
      mainDecimals={0}
      intermediateLabels={{
        bosta_kaybi_kWh: "Boşta Kayıp Enerjisi (kWh)",
        yuk_kaybi_kWh: "Yük Kayıp Enerjisi (kWh)",
        yillik_maliyet_TL: "Yıllık Maliyet (₺)",
        ortalama_kayip_kW: "Ortalama Kayıp Gücü (kW)",
        bosta_kayip_payi_yuzde: "Boşta Kayıp Payı (%)",
        esit_kayip_yuklenme_orani: "Boşta = Yük Kaybı Yüklenmesi",
      }}
    />
  );
}
