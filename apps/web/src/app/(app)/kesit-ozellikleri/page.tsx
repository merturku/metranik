"use client";

import { kesitOzellikleri } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KesitOzellikleriPage() {
  return (
    <CalcPage
      module={kesitOzellikleri}
      standardsLabel="Klasik mukavemet — kesit geometrisi"
      description="Dikdörtgen, dolu daire veya boru kesitin alanını, atalet momentini, mukavemet momentini ve atalet yarıçapını hesaplar."
      formula="Dikdörtgen: A=bh, I=bh³/12;  Daire: I=πd⁴/64;  Boru: I=π(D⁴−d⁴)/64;  W=I/c;  i=√(I/A)"
      engineeringNote="Boyut 1: dikdörtgende genişlik b, dairede çap d, boruda dış çap D. Boyut 2: dikdörtgende yükseklik h (eğilme ekseni b·h³ yönünde güçlü eksendir), boruda et kalınlığı t; dairede kullanılmaz (herhangi bir değer girin). Çıkan I ve W, Konsol Kiriş Sehimi, Boru Destek Aralığı, Basit Kiriş Kesit Tesirleri ve Euler burkulma hesaplarının girdisidir."
      fields={[
        {
          key: "tip",
          label: "Kesit Tipi",
          type: "select",
          options: [
            { value: "dikdortgen", label: "Dikdörtgen (b × h)" },
            { value: "daire", label: "Dolu Daire (Ø d)" },
            { value: "boru", label: "Boru (Ø D, et t)" },
          ],
        },
        { key: "boyut1_mm", label: "Boyut 1 — b / d / D (mm)", type: "number", min: 1, step: 5 },
        { key: "boyut2_mm", label: "Boyut 2 — h / (kullanılmaz) / t (mm)", type: "number", min: 0.1, step: 5 },
      ]}
      defaults={{ tip: "dikdortgen", boyut1_mm: 300, boyut2_mm: 500 }}
      mainUnit="mm² (kesit alanı)"
      mainValueKey="alan_mm2"
      mainDecimals={0}
      intermediateLabels={{
        atalet_momenti_mm4: "Atalet Momenti I (mm⁴)",
        mukavemet_momenti_mm3: "Mukavemet Momenti W (mm³)",
        atalet_yaricapi_mm: "Atalet Yarıçapı i (mm)",
        ekstrem_lif_mesafesi_mm: "Ekstrem Lif Mesafesi c (mm)",
      }}
    />
  );
}
