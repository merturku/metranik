"use client";

import { boruBirimAgirligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BoruBirimAgirligiPage() {
  return (
    <CalcPage
      module={boruBirimAgirligi}
      standardsLabel="Geometrik ağırlık hesabı (çelik 7850 kg/m³, su 1000 kg/m³)"
      description="Çelik borunun, içindeki suyun ve yalıtımın metre başına ağırlığını hesaplar; askı ve destek yük hesaplarının girdisidir."
      formula="w = π/4·[(D² − di²)·7850 + di²·1000·(su dolu) + (Dy² − D²)·ρyalıtım]"
      engineeringNote="Çıkan toplam, Askılama Hesabı'ndaki boru ve su ağırlığı girdilerine karşılık gelir (boru + yalıtım ağırlığı ve su ayrı girilebilir; ara değerler ayrı verilir). Vana, flanş, kaplama ve montaj yükü dahil değildir; test basıncında boru su dolu hesaplanmalıdır. Boru et kalınlığı ve dış çap için ilgili boru standardı tablosunu kullanın."
      fields={[
        { key: "disCap_mm", label: "Boru Dış Çapı (mm)", type: "number", min: 1, step: 1 },
        { key: "etKalinligi_mm", label: "Et Kalınlığı (mm)", type: "number", min: 0.1, step: 0.1 },
        { key: "yalitimKalinligi_mm", label: "Yalıtım Kalınlığı (mm, yoksa 0)", type: "number", min: 0, step: 5 },
        { key: "yalitimYogunlugu_kgm3", label: "Yalıtım Yoğunluğu (kg/m³)", type: "number", min: 0, step: 10 },
        {
          key: "icerik",
          label: "Boru İçi",
          type: "select",
          options: [
            { value: "dolu", label: "Su dolu" },
            { value: "bos", label: "Boş" },
          ],
        },
      ]}
      defaults={{ disCap_mm: 114.3, etKalinligi_mm: 3.6, yalitimKalinligi_mm: 0, yalitimYogunlugu_kgm3: 0, icerik: "dolu" }}
      mainUnit="kg/m (toplam)"
      mainValueKey="toplam_kgm"
      mainDecimals={2}
      intermediateLabels={{
        celik_boru_kgm: "Çelik Boru (kg/m)",
        su_kgm: "Su (kg/m)",
        yalitim_kgm: "Yalıtım (kg/m)",
        ic_cap_mm: "İç Çap (mm)",
        toplam_N_m: "Toplam (N/m)",
      }}
    />
  );
}
