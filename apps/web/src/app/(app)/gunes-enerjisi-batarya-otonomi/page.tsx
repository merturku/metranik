"use client";

import { gunesEnerjisiBataryaOtonomi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function GunesEnerjisiBataryaOtonomiPage() {
  return (
    <CalcPage
      module={gunesEnerjisiBataryaOtonomi}
      standardsLabel="Fiziksel Formül"
      description="Off-grid güneş enerjisi sisteminde, güneşsiz geçecek gün sayısını (otonomi) ve izin verilen deşarj derinliğini (DoD) esas alarak gerekli batarya kapasitesini hesaplar."
      formula="C(Ah) = (Günlük Tüketim × Otonomi Günü) / (DoD × V)"
      engineeringNote="UPS yedekleme süresinden farklı olarak burada gün bazlı otonomi esas alınır; DoD kurşun-asit bataryada ~0.5, lityum bataryada ~0.8-0.9 alınır — batarya ömrünü korumak için üretici sınırı aşılmamalıdır."
      fields={[
        {
          key: "gunlukTuketim_kWh",
          label: "Günlük Tüketim (kWh)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "otonomiGunSayisi",
          label: "Otonomi Gün Sayısı",
          type: "number",
          min: 0.5,
          step: 0.5,
        },
        {
          key: "izinVerilenDesarjDerinligi_DoD",
          label: "İzin Verilen Deşarj Derinliği DoD (örn. 0.8)",
          type: "number",
          min: 0.1,
          step: 0.05,
        },
        {
          key: "sistemGerilimi_V",
          label: "Sistem Gerilimi V (V)",
          type: "number",
          min: 6,
          step: 6,
        },
      ]}
      defaults={{
        gunlukTuketim_kWh: 10,
        otonomiGunSayisi: 2,
        izinVerilenDesarjDerinligi_DoD: 0.8,
        sistemGerilimi_V: 48,
      }}
      mainUnit="Ah"
      mainValueKey="gerekliKapasite_Ah"
      intermediateLabels={{ gerekliEnerji_Wh: "Gerekli Enerji (Wh)" }}
    />
  );
}
