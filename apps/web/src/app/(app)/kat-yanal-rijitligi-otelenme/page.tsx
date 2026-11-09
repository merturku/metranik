"use client";

import { katYanalRijitligiOtelenme } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KatYanalRijitligiOtelenmePage() {
  return (
    <CalcPage
      module={katYanalRijitligiOtelenme}
      standardsLabel="Klasik yapı mekaniği"
      description="Kolonların yanal rijitliğinden kat rijitliğini, yatay yük altında ötelenmeyi ve tek serbestlik dereceli doğal periyodu hesaplar."
      formula="k = 12·E·I/h³;  K = n·k;  Δ = H/K;  T = 2π·√(m/K)"
      engineeringNote="Rijit döşeme ve iki ucu ankastre kolon (kesme çerçevesi) kabulü yapılır; kiriş esnekliği, perde ve çerçeve etkileşimi ihmal edilir. Çatlamış kesit için rijitlik çarpanı kullanın (TBDY'de kolonlar için yaklaşık 0,70; yönetmelikten teyit edin). Kolon derinliği yük doğrultusundaki kesit boyutudur. Bina Yaklaşık Doğal Periyodu modülüyle karşılaştırın."
      fields={[
        { key: "elastisiteModulu_MPa", label: "Elastisite Modülü E (MPa)", type: "number", step: 500, min: 1 },
        { key: "kolonGenisligi_mm", label: "Kolon Genişliği b (mm)", type: "number", step: 10, min: 1 },
        { key: "kolonYuksekligi_mm", label: "Kolon Kesit Derinliği (yük doğrultusu, mm)", type: "number", step: 10, min: 1 },
        { key: "katYuksekligi_mm", label: "Kat Yüksekliği h (mm)", type: "number", step: 50, min: 1 },
        { key: "kolonSayisi", label: "Kolon Sayısı", type: "number", step: 1, min: 1 },
        { key: "rijitlikCarpani", label: "Etkin Rijitlik Çarpanı (0–1)", type: "number", step: 0.05, min: 0.1 },
        { key: "yatayYuk_kN", label: "Yatay Yük H (kN)", type: "number", step: 10, min: 0 },
        { key: "katKutlesi_ton", label: "Kat Kütlesi (ton)", type: "number", step: 10, min: 1 },
      ]}
      defaults={{ elastisiteModulu_MPa: 32000, kolonGenisligi_mm: 400, kolonYuksekligi_mm: 400, katYuksekligi_mm: 3000, kolonSayisi: 4, rijitlikCarpani: 1, yatayYuk_kN: 100, katKutlesi_ton: 200 }}
      mainUnit="kN/mm"
      mainValueKey="katRijitligi_kNmm"
      mainDecimals={1}
      intermediateLabels={{
        kolon_atalet_mm4: "Kolon Atalet Momenti (mm⁴)",
        tek_kolon_rijitligi_kNmm: "Tek Kolon Rijitliği (kN/mm)",
        otelenme_mm: "Ötelenme Δ (mm)",
        goreli_otelenme_orani: "Göreli Ötelenme Δ/h",
        dogal_periyot_s: "Doğal Periyot T (s)",
      }}
    />
  );
}
