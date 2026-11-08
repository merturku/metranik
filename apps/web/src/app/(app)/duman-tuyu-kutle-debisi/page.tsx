"use client";

import { dumanTuyuKutleDebisi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DumanTuyuKutleDebisiPage() {
  return (
    <CalcPage
      module={dumanTuyuKutleDebisi}
      standardsLabel="NFPA 92 (Heskestad tüyü)"
      description="Yangın gücü ve duman tabakası alt sınırı yüksekliğinden eksenel simetrik duman tüyünün kütle debisini, sıcaklığını ve gereken tahliye hacim debisini hesaplar."
      formula="zl = 0,166·Qc^0,4;  z > zl: m = 0,071·Qc^⅓·z^(5/3) + 0,0018·Qc;  z ≤ zl: m = 0,032·Qc^0,6·z;  T = T₀ + Qc/(m·cp);  V̇ = m/ρ"
      engineeringNote="Qc konvektif ısı yayılımıdır (yaklaşık toplam yangın gücünün %70'i). z yangın yüzeyinden duman tabakası alt sınırına temiz yüksekliktir. Eksenel simetrik tüy kabulü; duvar/köşe, tavan jeti, sprinkler etkisi ve tabaka sıcaklığı geri beslemesi yoktur. Tasarım yangın gücü ve kabul kriterleri NFPA 92 ve yerel yönetmelikten doğrulanmalıdır."
      fields={[
        { key: "yanginGucu_kW", label: "Toplam Yangın Gücü Q (kW)", type: "number", step: 50, min: 1 },
        { key: "konvektifOran", label: "Konvektif Oran (0–1)", type: "number", step: 0.05, min: 0.1 },
        { key: "temizYukseklik_m", label: "Temiz Yükseklik z (m)", type: "number", step: 0.5, min: 0.1 },
        { key: "ortamSicakligi_C", label: "Ortam Sıcaklığı (°C)", type: "number", step: 1 },
      ]}
      defaults={{ yanginGucu_kW: 1429, konvektifOran: 0.7, temizYukseklik_m: 5, ortamSicakligi_C: 20 }}
      mainUnit="kg/s"
      mainValueKey="dumanKutleDebisi_kgs"
      mainDecimals={2}
      intermediateLabels={{
        konvektif_isi_Qc_kW: "Konvektif Isı Qc (kW)",
        alev_yuksekligi_m: "Alev Yüksekliği zl (m)",
        bolge: "Hesap Bölgesi",
        duman_sicakligi_C: "Duman Sıcaklığı (°C)",
        duman_yogunlugu_kgm3: "Duman Yoğunluğu (kg/m³)",
        tahliye_debisi_m3s: "Tahliye Debisi (m³/s)",
        tahliye_debisi_m3h: "Tahliye Debisi (m³/h)",
      }}
    />
  );
}
