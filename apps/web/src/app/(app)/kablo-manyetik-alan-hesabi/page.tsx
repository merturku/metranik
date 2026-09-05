"use client";

import { kabloManyetikAlanHesabi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KabloManyetikAlanHesabiPage() {
  return (
    <CalcPage
      module={kabloManyetikAlanHesabi}
      standardsLabel="Ampère Yasası / ICNIRP"
      description="Kablo akımı ve mesafeden, sonsuz uzun düz iletken kabulüyle çevredeki manyetik alan şiddetini hesaplar ve izin verilen referans seviyesiyle karşılaştırır."
      formula="B = μ0×I/(2πr)"
      engineeringNote="μ0 = 4π×10⁻⁷ T·m/A (boşluğun manyetik geçirgenliği). İzin verilen referans seviyesi maruziyet ortamına göre değişir (örn. ICNIRP genel halk için 50 Hz'de 200 µT); kullanım amacına uygun sınır girilmelidir."
      fields={[
        {
          key: "akim_I_A",
          label: "Akım I (A)",
          type: "number",
          min: 1,
          step: 10,
        },
        {
          key: "mesafe_r_m",
          label: "Mesafe r (m)",
          type: "number",
          min: 0.01,
          step: 0.1,
        },
        {
          key: "izinVerilenReferansSeviyesi_uT",
          label: "İzin Verilen Referans Seviyesi (µT)",
          type: "number",
          min: 1,
          step: 10,
        },
      ]}
      defaults={{
        akim_I_A: 200,
        mesafe_r_m: 0.5,
        izinVerilenReferansSeviyesi_uT: 200,
      }}
      mainUnit="µT"
      mainValueKey="manyetikAlan_B_uT"
      mainDecimals={2}
      intermediateLabels={{
        izinVerilenReferansSeviyesi_uT: "İzin Verilen Referans Seviyesi (µT)",
      }}
    />
  );
}
