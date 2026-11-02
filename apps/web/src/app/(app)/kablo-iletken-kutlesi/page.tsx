"use client";

import { kabloIletkenKutlesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KabloIletkenKutlesiPage() {
  return (
    <CalcPage
      module={kabloIletkenKutlesi}
      standardsLabel="Geometrik kütle hesabı (Cu 8960, Al 2700 kg/m³)"
      description="Kablonun iletken metal kütlesini kesit, damar sayısı ve uzunluktan hesaplar; metraj ve hurda/maliyet tahmininde kullanılır."
      formula="m = A·n·L·ρ   (ρ_Cu = 8960, ρ_Al = 2700 kg/m³)"
      engineeringNote="Yalnız iletken metali hesaplanır; yalıtım, dolgu, zırh ve dış kılıf ağırlığı dahil değildir. Kablo çekme kuvveti ve taşıma yükü için üretici kataloğundaki toplam kablo ağırlığını kullanın (Kablo Çekme Kuvveti modülü). Sıkıştırılmış iletkende fiili kütle teorik kesite çok yakındır."
      fields={[
        { key: "kesit_mm2", label: "Damar Kesiti (mm²)", type: "number", min: 0.5, step: 0.5 },
        { key: "damarSayisi", label: "İletken (Damar) Sayısı", type: "number", min: 1, step: 1 },
        { key: "uzunluk_m", label: "Uzunluk (m)", type: "number", min: 1, step: 10 },
        {
          key: "malzeme",
          label: "İletken Malzeme",
          type: "select",
          options: [
            { value: "bakir", label: "Bakır" },
            { value: "aluminyum", label: "Alüminyum" },
          ],
        },
      ]}
      defaults={{ kesit_mm2: 16, damarSayisi: 4, uzunluk_m: 100, malzeme: "bakir" }}
      mainUnit="kg (iletken metal)"
      mainValueKey="kutle_kg"
      mainDecimals={1}
      intermediateLabels={{
        birim_uzunluk_kutlesi_kgm: "Birim Uzunluk Kütlesi (kg/m)",
        toplam_metal_kesiti_mm2: "Toplam Metal Kesiti (mm²)",
        toplam_kutle_ton: "Toplam Kütle (ton)",
      }}
    />
  );
}
