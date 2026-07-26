"use client";

import { isitmaYukuTs825 } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IsitmaYukuPage() {
  return (
    <CalcPage
      module={isitmaYukuTs825}
      standardsLabel="TS 825"
      description="Bina brüt alanı, iklim bölgesi ve cam tipine göre ön boyutlandırma ısıtma yükünü hesaplar."
      formula="Q = Alan × Birim Yük(bölge) × Cam Faktörü"
      engineeringNote="İklim bölgesi ve W/m² birim yük katsayıları yer tutucudur; TS 825 Ek-A/Ek-B tablolarından doğrulanmadan gerçek projede kullanılmamalıdır."
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
          key: "cam",
          label: "Cam Tipi",
          type: "select",
          options: [
            { value: "cift", label: "Çift Cam" },
            { value: "tek", label: "Tek Cam" },
          ],
        },
      ]}
      defaults={{ alan: 85, sehir: "istanbul", cam: "cift" }}
      mainUnit="kW"
      mainValueKey="kW"
      intermediateLabels={{
        iklimBolgesi: "İklim Bölgesi",
        birimYuk_W_m2: "Birim Yük (W/m²)",
        camFaktoru: "Cam Faktörü",
        toplamYuk_W: "Toplam Yük (W)",
      }}
    />
  );
}
