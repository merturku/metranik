"use client";

import { parafudrEtkinKorumaSeviyesi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function ParafudrEtkinKorumaSeviyesiPage() {
  return (
    <CalcPage
      module={parafudrEtkinKorumaSeviyesi}
      standardsLabel={'IEC 62305-4'}
      description={'Parafudr koruma seviyesine bağlantı iletkenlerindeki endüktif gerilim düşümünü ekleyip ekipman dayanım gerilimiyle karşılaştırır.'}
      formula={'Ueff = Up + L\'·l·(di/dt);  Ueff ≤ 0,8·Uw'}
      engineeringNote={'L\' ≈ 1 µH/m ve di/dt tipik 1 kA/µs alınır; gerçek değerler tasarım yıldırım akımına bağlıdır. 0,8·Uw payı salınım etkisi için yaygın bir uygulamadır, standart değeri değildir; IEC 62305-4 ve 60364-4-44\'ten teyit edin. Bağlantı uzunluğu (SPD iletkenleri toplamı) mümkün olduğunca 0,5 m\'nin altında tutulmalıdır.'}
      fields={[
        { key: "spdKorumaSeviyesiUp_kV", label: "SPD Koruma Seviyesi Up (kV)", type: "number", step: 0.1, min: 0.1 },
        { key: "baglantiUzunlugu_m", label: "Bağlantı İletkeni Toplam Uzunluğu (m)", type: "number", step: 0.1, min: 0 },
        { key: "iletkenInduktansi_uH_m", label: "İletken Endüktansı L' (µH/m)", type: "number", step: 0.1, min: 0.1 },
        { key: "akimDegisimHizi_kA_us", label: "Akım Değişim Hızı di/dt (kA/µs)", type: "number", step: 0.5, min: 0.1 },
        { key: "ekipmanDayanimUw_kV", label: "Ekipman Darbe Dayanımı Uw (kV)", type: "number", step: 0.5, min: 0.1 },
      ]}
      defaults={{ spdKorumaSeviyesiUp_kV: 1.5, baglantiUzunlugu_m: 0.5, iletkenInduktansi_uH_m: 1, akimDegisimHizi_kA_us: 1, ekipmanDayanimUw_kV: 4 }}
      mainUnit={'kV'}
      mainValueKey={'etkinKorumaSeviyesi_kV'}
      mainDecimals={2}
      intermediateLabels={{
        iletken_gerilim_dusumu_kV: "İletken gerilim düşümü (kV)",
        izin_sinir_08Uw_kV: "0,8·Uw (kV)",
        azami_baglanti_uzunlugu_m: "Azami bağlantı uzunluğu (m)",
        Ueff_Uw_orani: "Ueff/Uw",
      }}
    />
  );
}
