"use client";
import { CalcPage } from "@/components/calc-page";
import { sogutmaDolumProsedureKontrolSuresi } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={sogutmaDolumProsedureKontrolSuresi}
      standardsLabel="Hacim / Debi + Prosedür Bekleme Süreleri"
      description="Kapalı devre sistemin dolum süresini ve basınç/sıcaklık stabilizasyon beklemeleriyle birlikte toplam kontrol süresini hesaplar."
      formula="t_dolum = V_sistem / Q_dolum, t_toplam = t_dolum + t_basınç + t_sıcaklık"
      engineeringNote="Stabilizasyon süreleri işletme/devreye alma prosedüründen alınır. Hızlı dolum hava kabarcığı hapsedebileceğinden, dolum debisi sistemdeki havanın tahliye edilebileceği hızda tutulmalıdır."
      fields={[
        { key: "sistem_hacmi_L", label: "Sistem Hacmi (L)", type: "number", min: 1, step: 50 },
        { key: "dolum_debisi_Lmin", label: "Dolum Debisi (L/dk)", type: "number", min: 0.5, step: 1 },
        { key: "basinc_stabilizasyon_dakika", label: "Basınç Stabilizasyonu (dk)", type: "number", min: 0, step: 1 },
        { key: "sicaklik_stabilizasyon_dakika", label: "Sıcaklık Stabilizasyonu (dk)", type: "number", min: 0, step: 1 },
      ]}
      defaults={{
        sistem_hacmi_L: 500,
        dolum_debisi_Lmin: 10,
        basinc_stabilizasyon_dakika: 5,
        sicaklik_stabilizasyon_dakika: 10,
      }}
      mainUnit="dk"
      mainValueKey="total_kontrol_suresi_dakika"
      mainDecimals={1}
      intermediateLabels={{
        dolum_suresi_dakika: "Dolum Süresi (dk)",
        basinc_stabilizasyon_dakika: "Basınç Stabilizasyonu (dk)",
        sicaklik_stabilizasyon_dakika: "Sıcaklık Stabilizasyonu (dk)",
      }}
    />
  );
}
