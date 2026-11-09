"use client";

import { aydinlatmaBakimFaktoru } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function AydinlatmaBakimFaktoruPage() {
  return (
    <CalcPage
      module={aydinlatmaBakimFaktoru}
      standardsLabel="CIE 97 · EN 12464-1"
      description="Lamba ışık akısı, ömür, armatür ve oda yüzeyi bakım faktörlerinden toplam bakım faktörünü ve gereken başlangıç aydınlığını hesaplar."
      formula="MF = LLMF·LSF·LMF·RMF;  E_başlangıç = E_tasarım/MF"
      engineeringNote="Değerler üretici verisi ve ortam kirlilik sınıfından alınır (girdi); LED'de LLMF L80/L90 değerinden gelir. Aydınlatma Lüks Yöntemi modülünde N = E·A/(Φ·UF·MF) ile kullanılır."
      fields={[
        { key: "llmf", label: "Lamba Akı Bakım Faktörü LLMF", type: "number", step: 0.01, min: 0.1 },
        { key: "lsf", label: "Lamba Ömür Faktörü LSF", type: "number", step: 0.01, min: 0.1 },
        { key: "lmf", label: "Armatür Bakım Faktörü LMF", type: "number", step: 0.01, min: 0.1 },
        { key: "rmf", label: "Oda Yüzeyi Bakım Faktörü RMF", type: "number", step: 0.01, min: 0.1 },
        { key: "tasarimAydinligi_lux", label: "Tasarım Aydınlığı (lx)", type: "number", step: 10, min: 1 },
      ]}
      defaults={{ llmf: 0.9, lsf: 1, lmf: 0.92, rmf: 0.95, tasarimAydinligi_lux: 500 }}
      mainUnit=""
      mainValueKey="bakimFaktoru"
      mainDecimals={3}
      intermediateLabels={{
        baslangic_aydinligi_gerekli_lux: "Gerekli Başlangıç Aydınlığı (lx)",
        aydinlik_fazlasi_yuzde: "Aydınlık Fazlası (%)",
      }}
    />
  );
}
