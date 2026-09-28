"use client";
import { CalcPage } from "@/components/calc-page";
import { sogutmaKulesiKapasitesiKontrolu } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={sogutmaKulesiKapasitesiKontrolu}
      standardsLabel="EN 12113"
      description="Soğutma kulesi çıkış sıcaklığından, talep edilen ısı yükünün sağlanıp sağlanamadığını kontrol eder."
      formula="Q = ṁ × cp × ΔT | ΔT = Q / (ṁ × cp)"
      engineeringNote="Soğutma kulesi seçimi tasarım sıcaklıklarından, kapasite kontrolü sonucuna bağlıdır. Çıkış ≤28°C standarttır."
      fields={[
        { name: "isi_yuku_kW", label: "Tasarım Isı Yükü (kW)", type: "number" },
        { name: "su_debisi_m3h", label: "Su Debisi (m³/h)", type: "number" },
        { name: "giris_sicakligi_C", label: "Giriş Sıcaklığı (°C)", type: "number" },
        { name: "cikis_sicakligi_C", label: "Çıkış Sıcaklığı (°C)", type: "number" },
        { name: "ortam_sicakligi_C", label: "Ortam Sıcaklığı (°C)", type: "number" },
        { name: "min_cikis_sicakligi_C", label: "Min. Çıkış Sıcaklığı (°C)", type: "number" },
      ]}
      defaults={{
        isi_yuku_kW: 800,
        su_debisi_m3h: 100,
        giris_sicakligi_C: 35,
        cikis_sicakligi_C: 28,
        ortam_sicakligi_C: 25,
        min_cikis_sicakligi_C: 28,
      }}
    />
  );
}
