"use client";

import { kabloSonuKisaDevreAkimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KabloSonuKisaDevreAkimiPage() {
  return (
    <CalcPage
      module={kabloSonuKisaDevreAkimi}
      standardsLabel="IEC 60909-0"
      description="Kaynak kısa devre akımı ve kablo empedansından kablo sonundaki 3 faz simetrik kısa devre akımını hesaplar."
      formula="Zs = c·U/(√3·Ik,k);  Rt = Rs + R'L;  Xt = Xs + X'L;  Ik = c·U/(√3·√(Rt² + Xt²))"
      engineeringNote="R' ve X' kablo üreticisinden/IEC 60909-0'dan alınır. Maksimum Ik için 20 °C direnci, minimum Ik (koruma açma süresi) için çalışma sıcaklığı direnci kullanılmalıdır. Motor katkısı ve şönt kollar dikkate alınmaz. Sonucu Kesici Kısa Devre Kapasitesi Kontrolü ile karşılaştırın."
      fields={[
        { key: "nominalGerilim_V", label: "Nominal Gerilim (V)", type: "number", step: 1, min: 1 },
        { key: "kaynakKisaDevreAkimi_kA", label: "Kaynak Kısa Devre Akımı (kA)", type: "number", step: 0.5, min: 0.1 },
        { key: "kaynakR_X_orani", label: "Kaynak R/X Oranı", type: "number", step: 0.05, min: 0 },
        { key: "gerilimFaktoru_c", label: "Gerilim Faktörü c", type: "number", step: 0.01, min: 0.9 },
        { key: "kabloR_mOhm_m", label: "Kablo R' (mΩ/m)", type: "number", step: 0.01, min: 0 },
        { key: "kabloX_mOhm_m", label: "Kablo X' (mΩ/m)", type: "number", step: 0.01, min: 0 },
        { key: "kabloUzunlugu_m", label: "Kablo Uzunluğu (m)", type: "number", step: 1, min: 0 },
      ]}
      defaults={{ nominalGerilim_V: 400, kaynakKisaDevreAkimi_kA: 20, kaynakR_X_orani: 0.1, gerilimFaktoru_c: 1, kabloR_mOhm_m: 1.15, kabloX_mOhm_m: 0.08, kabloUzunlugu_m: 50 }}
      mainUnit="kA"
      mainValueKey="kisaDevreAkimi_kA"
      mainDecimals={2}
      intermediateLabels={{
        kaynak_empedansi_ohm: "Kaynak Empedansı (Ω)",
        kablo_direnci_ohm: "Kablo Direnci (Ω)",
        kablo_reaktansi_ohm: "Kablo Reaktansı (Ω)",
        toplam_empedans_ohm: "Toplam Empedans (Ω)",
        akim_dusus_orani_yuzde: "Kaynak Akımına Oranı (%)",
      }}
    />
  );
}
