"use client";

import { sogutmaYuku } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SogutmaYukuPage() {
  return (
    <CalcPage
      module={sogutmaYuku}
      standardsLabel="Pratisyen Tablo"
      description="Bina brüt alanı, iklim ve kullanım tipine göre ön boyutlandırma soğutma yükünü hesaplar."
      fields={[
        { key: "alan", label: "Alan (m²)", type: "number", min: 1, step: 1 },
        {
          key: "sehir",
          label: "Şehir",
          type: "select",
          options: [
            { value: "istanbul", label: "İstanbul" },
            { value: "izmir", label: "İzmir" },
            { value: "ankara", label: "Ankara" },
            { value: "erzurum", label: "Erzurum" },
          ],
        },
        {
          key: "kullanim",
          label: "Kullanım",
          type: "select",
          options: [
            { value: "konut", label: "Konut" },
            { value: "ofis", label: "Ofis" },
          ],
        },
      ]}
      defaults={{ alan: 85, sehir: "istanbul", kullanim: "konut" }}
      mainUnit="kW"
      mainValueKey="kW"
      intermediateLabels={{
        birimYuk_W_m2: "Birim Yük (W/m²)",
        iklimFaktoru: "İklim Faktörü",
        toplamYuk_W: "Toplam Yük (W)",
      }}
    />
  );
}
