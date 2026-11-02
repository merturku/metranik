"use client";

import { termalKopruIsiKaybi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TermalKopruIsiKaybiPage() {
  return (
    <CalcPage
      module={termalKopruIsiKaybi}
      standardsLabel="TS EN ISO 14683 / TS 825 — Isıl köprüler"
      description="Balkon bağlantısı, döşeme kenarı, pencere çevresi gibi doğrusal ısıl köprülerin ek ısı kaybını ve duvar iletim kaybına oranını hesaplar."
      formula="Q = ψ·L·ΔT   [W]"
      engineeringNote="ψ (W/mK) ayrıntı hesabıyla (TS EN ISO 10211) veya köprü kataloglarından alınır; TS EN ISO 14683 yalnız yaklaşık varsayılan değerler verir ve bunlar tutucudur. Duvar UA değeri için Duvar/Çatı U-Değeri ve Pencere/Duvar Isı Kaybı modüllerini kullanın. Birden çok köprü varsa her biri için ayrı hesaplayıp toplayın."
      fields={[
        { key: "psi_WmK", label: "Doğrusal Isı Geçirgenliği ψ (W/mK)", type: "number", min: 0, step: 0.01 },
        { key: "uzunluk_m", label: "Köprü Uzunluğu L (m)", type: "number", min: 0.1, step: 1 },
        { key: "icSicaklik_C", label: "İç Sıcaklık (°C)", type: "number", step: 1 },
        { key: "disSicaklik_C", label: "Dış Sıcaklık (°C)", type: "number", step: 1 },
        { key: "duvarUA_WK", label: "Duvar Toplam UA (W/K, kıyas için)", type: "number", min: 0.1, step: 5 },
      ]}
      defaults={{ psi_WmK: 0.15, uzunluk_m: 20, icSicaklik_C: 20, disSicaklik_C: 0, duvarUA_WK: 100 }}
      mainUnit="W (ısıl köprü kaybı)"
      mainValueKey="isiKaybi_W"
      mainDecimals={1}
      intermediateLabels={{
        sicaklik_farki_K: "Sıcaklık Farkı (K)",
        psi_L_WK: "ψ·L (W/K)",
        duvar_iletim_kaybi_W: "Duvar İletim Kaybı (W)",
        ek_kayip_yuzde: "Duvar Kaybına Oranı (%)",
      }}
    />
  );
}
