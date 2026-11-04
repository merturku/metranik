"use client";

import { isiGeriKazanimYillikTasarruf } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IsiGeriKazanimYillikTasarrufPage() {
  return (
    <CalcPage
      module={isiGeriKazanimYillikTasarruf}
      standardsLabel="Derece-gün yöntemi"
      description="Isı geri kazanım ünitesinin verimi, debisi ve derece-gün değerinden yıllık ısıtma enerjisi tasarrufunu hesaplar."
      formula="E = 0,335·V̇·ε·DG·h/1000  [kWh/yıl]"
      engineeringNote="Yalnız duyulur ısı geri kazanımı hesaplanır; nem (gizli ısı), buzlanma koruması ve fan basınç kaybı kaynaklı ek elektrik tüketimi hesaba katılmaz. ε değeri için Isı Geri Kazanım Verimi modülünü, DG için bölgenin TS 825 değerini kullanın."
      fields={[
        { key: "debi_m3h", label: "Taze Hava Debisi (m³/h)", type: "number", step: 100, min: 1 },
        { key: "verim", label: "Geri Kazanım Verimi ε (0–1)", type: "number", step: 0.05, min: 0.05 },
        { key: "dereceGun_Kgun", label: "Derece-Gün DG (K·gün)", type: "number", step: 100, min: 1 },
        { key: "gunlukCalismaSaati", label: "Günlük Çalışma Süresi (saat)", type: "number", step: 1, min: 1 },
      ]}
      defaults={{ debi_m3h: 5000, verim: 0.6, dereceGun_Kgun: 2500, gunlukCalismaSaati: 24 }}
      mainUnit="kWh/yıl"
      mainValueKey="yillikTasarruf_kWh"
      mainDecimals={0}
      intermediateLabels={{
        hava_isil_kapasite_WK: "Hava Isıl Kapasitesi (W/K)",
        geri_kazanilan_guc_tasarim_DT10_kW: "Geri Kazanılan Güç, ΔT = 10 K (kW)",
        yillik_tasarruf_MWh: "Yıllık Tasarruf (MWh)",
        yillik_tasarruf_GJ: "Yıllık Tasarruf (GJ)",
      }}
    />
  );
}
