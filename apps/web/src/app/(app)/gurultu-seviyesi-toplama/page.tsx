"use client";

import { gurultuSeviyesiToplama } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function GurultuSeviyesiToplamaPage() {
  return (
    <CalcPage
      module={gurultuSeviyesiToplama}
      standardsLabel="ISO 9613-2 — açık alanda ses yayılımı (geometrik yayılım)"
      description="Birden çok kaynağın ses basınç seviyesini enerji olarak toplar, nokta kaynak varsayımıyla hedef mesafedeki seviyeyi bulur ve izin verilen değerle karşılaştırır."
      formula="L = 10·log₁₀(Σ10^(Li/10));   L2 = L1 − 20·log₁₀(r2/r1)"
      engineeringNote="Serbest alanda nokta kaynak varsayımıdır; yansıma, duvar/perde sönümü, atmosferik soğurma ve zemin etkisi dahil değildir (ISO 9613-2'nin tam yöntemi bunları ekler). Kullanılmayan kaynak için 0 dB girilebilir. İzin verilen seviye yönetmelik ve bölge sınıfına göre değişir (ör. konutta gece), ilgili mevzuattan teyit edin."
      fields={[
        { key: "kaynak1_dB", label: "Kaynak 1 Seviyesi (dB)", type: "number", min: 0, step: 1 },
        { key: "kaynak2_dB", label: "Kaynak 2 Seviyesi (dB)", type: "number", min: 0, step: 1 },
        { key: "kaynak3_dB", label: "Kaynak 3 Seviyesi (dB)", type: "number", min: 0, step: 1 },
        { key: "olcumMesafesi_m", label: "Ölçüm Mesafesi (m)", type: "number", min: 0.1, step: 0.5 },
        { key: "hedefMesafe_m", label: "Hedef Mesafe (m)", type: "number", min: 0.1, step: 0.5 },
        { key: "izinVerilen_dB", label: "İzin Verilen Seviye (dB)", type: "number", min: 0, step: 1 },
      ]}
      defaults={{ kaynak1_dB: 50, kaynak2_dB: 50, kaynak3_dB: 50, olcumMesafesi_m: 1, hedefMesafe_m: 10, izinVerilen_dB: 35 }}
      mainUnit="dB (toplam seviye)"
      mainValueKey="toplamSeviye_dB"
      mainDecimals={1}
      intermediateLabels={{
        hedef_mesafede_dB: "Hedef Mesafedeki Seviye (dB)",
        mesafe_azalmasi_dB: "Mesafe Azalması (dB)",
        izin_asimi_dB: "İzin Aşımı (dB)",
      }}
    />
  );
}
