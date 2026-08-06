"use client";

import { isitmaYakitTuketimiMaliyeti } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IsitmaYakitTuketimiMaliyetiPage() {
  return (
    <CalcPage
      module={isitmaYakitTuketimiMaliyeti}
      standardsLabel="Fiziksel Formül"
      description="Yıllık ısı ihtiyacını, yakıtın alt ısıl değeri ve kazan/sistem verimini kullanarak yıllık yakıt tüketimine ve maliyetine çevirir."
      formula="Tüketim = Yıllık Isı İhtiyacı / (Alt Isıl Değer × Verim), Maliyet = Tüketim × Birim Fiyat"
      engineeringNote="Yıllık ısı ihtiyacı, ısıtma yükü (TS 825) modülünden derece-gün yöntemiyle veya geçmiş fatura verisinden tahmin edilebilir."
      fields={[
        {
          key: "yillikIsiIhtiyaci_kWh",
          label: "Yıllık Isı İhtiyacı (kWh)",
          type: "number",
          min: 100,
          step: 100,
        },
        {
          key: "yakitAltIsilDegeri_kWh_birim",
          label: "Yakıt Alt Isıl Değeri (kWh/birim)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "kazanVerimi",
          label: "Kazan/Sistem Verimi (0-1)",
          type: "number",
          min: 0.1,
          step: 0.05,
        },
        {
          key: "yakitBirimFiyati_TL_birim",
          label: "Yakıt Birim Fiyatı (TL/birim)",
          type: "number",
          min: 0.1,
          step: 0.5,
        },
      ]}
      defaults={{
        yillikIsiIhtiyaci_kWh: 9270,
        yakitAltIsilDegeri_kWh_birim: 10.3,
        kazanVerimi: 0.9,
        yakitBirimFiyati_TL_birim: 15,
      }}
      mainUnit="TL"
      mainValueKey="yillikMaliyet_TL"
      intermediateLabels={{ yillikYakitTuketimi_birim: "Yıllık Yakıt Tüketimi (birim)" }}
    />
  );
}
