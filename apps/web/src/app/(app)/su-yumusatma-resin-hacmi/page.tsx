"use client";

import { suYumusatmaResinHacmi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function SuYumusatmaResinHacmiPage() {
  return (
    <CalcPage
      module={suYumusatmaResinHacmi}
      standardsLabel="Fiziksel Formül"
      description="Su sertliğine, günlük debiye ve çalışma süresine göre su yumuşatma cihazı için gerekli reçine hacmini hesaplar."
      formula="Reçine Hacmi = (Sertlik × Debi × Süre) / Reçine Kapasitesi"
      engineeringNote="Reçine değişim kapasitesi ürüne göre değişir; tipik katyonik reçineler için ~1.8-2.2 ekv/L alınır."
      fields={[
        {
          key: "suSertligi_mekvL",
          label: "Su Sertliği (mekv/L)",
          type: "number",
          min: 0.1,
          step: 0.1,
        },
        {
          key: "gunlukDebi_Lgun",
          label: "Günlük Debi (L/gün)",
          type: "number",
          min: 1,
          step: 100,
        },
        {
          key: "calismaSuresi_gun",
          label: "Çalışma Süresi (gün)",
          type: "number",
          min: 0.1,
          step: 0.5,
        },
        {
          key: "resinKapasitesi_ekvL",
          label: "Reçine Kapasitesi (ekv/L)",
          type: "number",
          min: 0.5,
          step: 0.1,
        },
      ]}
      defaults={{
        suSertligi_mekvL: 5,
        gunlukDebi_Lgun: 2000,
        calismaSuresi_gun: 1,
        resinKapasitesi_ekvL: 2,
      }}
      mainUnit="L"
      mainValueKey="gerekliResinHacmi_L"
      intermediateLabels={{ toplamSertlikYuku_mekv: "Toplam Sertlik Yükü (mekv)" }}
    />
  );
}
