"use client";

import { dosemedeZimbalamaKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DosemedeZimbalamaKontroluPage() {
  return (
    <CalcPage
      module={dosemedeZimbalamaKontrolu}
      standardsLabel="TS 500"
      description="Kolon kenarı, döşeme faydalı yüksekliği ve beton dayanımından kritik çevre uzunluğunu ve zımbalama (punching shear) kapasitesini hesaplar, etkiyen yükle karşılaştırır."
      formula="u = 4×(c+d), Vc = 0.35√fck×u×d"
      engineeringNote="Kritik kesit, kolon yüzünden d/2 mesafede kabul edilir (kare kolon için u=4×(c+d)). Beton katkısı, Kesme Kuvveti Kapasitesi (Beton) modülüyle aynı katsayıyı (0.35√fck) kullanır, ancak kesit genişliği yerine kritik çevre uzunluğu ile çarpılır."
      fields={[
        {
          key: "kolonKenari_c_mm",
          label: "Kolon Kenarı c (mm)",
          type: "number",
          min: 100,
          step: 10,
        },
        {
          key: "doseFaydaliYukseklik_d_mm",
          label: "Döşeme Faydalı Yükseklik d (mm)",
          type: "number",
          min: 50,
          step: 5,
        },
        {
          key: "betonKarakteristikDayanim_fck_MPa",
          label: "Beton Karakteristik Dayanım fck (MPa)",
          type: "number",
          min: 15,
          step: 5,
        },
        {
          key: "etkiyenYuk_Vu_kN",
          label: "Etkiyen Yük Vu (kN)",
          type: "number",
          min: 1,
          step: 10,
        },
      ]}
      defaults={{
        kolonKenari_c_mm: 400,
        doseFaydaliYukseklik_d_mm: 150,
        betonKarakteristikDayanim_fck_MPa: 25,
        etkiyenYuk_Vu_kN: 300,
      }}
      mainUnit="kN"
      mainValueKey="zimbalamaKapasitesi_Vc_kN"
      mainDecimals={1}
      intermediateLabels={{
        kritikCevre_u_mm: "Kritik Çevre u (mm)",
        etkiyenYuk_kN: "Etkiyen Yük (kN)",
      }}
    />
  );
}
