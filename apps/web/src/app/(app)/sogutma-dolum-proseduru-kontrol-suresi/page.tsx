"use client";
import { CalcPage } from "@/components/calc-page";
import { sogutmaDolumProsedureKontrolSuresi } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={sogutmaDolumProsedureKontrolSuresi}
      standardsLabel="EN 12828, ISO 13623"
      description="Soğutma sistemi dolum işleminin, basınç ve sıcaklık stabilizasyonu ile toplam kontrol süresini hesaplar."
      formula="t_dolum = V_sistem / Q_dolum | t_total = t_dolum + t_basınç + t_sıcaklık"
      engineeringNote="Dolum süresi hızlı olmalı ama kontrol noktalarında yeterince beklenmeli. Standart prosedür tavsiye edilir."
      fields={[
        { name: "sistem_hacmi_L", label: "Sistem Hacmi (L)", type: "number" },
        { name: "dolum_debisi_Lmin", label: "Dolum Debisi (L/min)", type: "number" },
        { name: "basinc_stabilizasyon_dakika", label: "Basınç Stabil. Süresi (dakika)", type: "number" },
        { name: "sicaklik_stabilizasyon_dakika", label: "Sıcaklık Stabil. Süresi (dakika)", type: "number" },
      ]}
      defaults={{
        sistem_hacmi_L: 500,
        dolum_debisi_Lmin: 10,
        basinc_stabilizasyon_dakika: 5,
        sicaklik_stabilizasyon_dakika: 10,
      }}
    />
  );
}
