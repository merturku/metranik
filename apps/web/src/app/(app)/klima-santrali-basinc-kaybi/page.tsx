"use client";

import { klimaSantraliBasincKaybi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KlimaSantraliBasincKaybiPage() {
  return (
    <CalcPage
      module={klimaSantraliBasincKaybi}
      standardsLabel="Fiziksel Formül"
      description="Klima santrali bileşenlerinin (filtre, batarya, kanal, difüzör) basınç kayıplarını toplayarak fan seçimi için gerekli toplam statik basıncı hesaplar."
      formula="Ptoplam = ΣPi + Güvenlik Marjı"
      engineeringNote="Filtre basınç kaybı kirlenme arttıkça yükselir; genelde temiz ve kirli filtre arası bir tasarım değeri seçilir."
      fields={[
        { key: "filtreKaybi_Pa", label: "Filtre Kaybı (Pa)", type: "number", min: 0, step: 10 },
        {
          key: "isiticiSogutucuKaybi_Pa",
          label: "Isıtıcı/Soğutucu Batarya Kaybı (Pa)",
          type: "number",
          min: 0,
          step: 10,
        },
        { key: "kanalKaybi_Pa", label: "Kanal Kaybı (Pa)", type: "number", min: 0, step: 10 },
        { key: "difuzorKaybi_Pa", label: "Difüzör Kaybı (Pa)", type: "number", min: 0, step: 10 },
        {
          key: "guvenlikMarji_Pa",
          label: "Güvenlik Marjı (Pa)",
          type: "number",
          min: 0,
          step: 10,
        },
      ]}
      defaults={{
        filtreKaybi_Pa: 150,
        isiticiSogutucuKaybi_Pa: 100,
        kanalKaybi_Pa: 80,
        difuzorKaybi_Pa: 30,
        guvenlikMarji_Pa: 50,
      }}
      mainUnit="Pa"
      mainValueKey="toplamBasincKaybi_Pa"
      intermediateLabels={{ guvenlikMarji_Pa: "Güvenlik Marjı (Pa)" }}
    />
  );
}
