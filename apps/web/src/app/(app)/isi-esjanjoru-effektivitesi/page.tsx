"use client";
import { CalcPage } from "@/components/calc-page";
import { isiEsjanjoreEffektivitesi } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={isiEsjanjoreEffektivitesi}
      standardsLabel="EN 12815, ISO 8801"
      description="Eşanjörün aktual ısı transferi, teorik maksimuma kıyasla effektivitesini hesaplar (ε-NTU yöntemi)."
      formula="ε = ΔT_fiili / ΔT_teorik = (T_soğuk_çıkış - T_soğuk_giriş) / (T_sıcak_giriş - T_soğuk_giriş)"
      engineeringNote="Effektivite 0.7+ istenilir. Düşük effektivite, eşanjör boyutunun yetersiz olduğunu veya fouling olduğunu gösterir."
      fields={[
        { name: "sicaklik_giris_sicak_C", label: "Sıcak Akış Giriş (°C)", type: "number" },
        { name: "sicaklik_giris_soğuk_C", label: "Soğuk Akış Giriş (°C)", type: "number" },
        { name: "sicaklik_cikis_sicak_C", label: "Sıcak Akış Çıkış (°C)", type: "number" },
        { name: "sicaklik_cikis_soğuk_C", label: "Soğuk Akış Çıkış (°C)", type: "number" },
        { name: "min_effektivite", label: "Min. Effektivite", type: "number" },
      ]}
      defaults={{
        sicaklik_giris_sicak_C: 80,
        sicaklik_giris_soğuk_C: 20,
        sicaklik_cikis_sicak_C: 70,
        sicaklik_cikis_soğuk_C: 65,
        min_effektivite: 0.7,
      }}
    />
  );
}
