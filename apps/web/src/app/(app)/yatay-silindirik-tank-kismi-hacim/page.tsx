"use client";

import { yataySilindirikTankKismiHacim } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YataySilindirikTankKismiHacimPage() {
  return (
    <CalcPage
      module={yataySilindirikTankKismiHacim}
      standardsLabel="Dairesel segment geometrisi"
      description="Yatay silindirik tankta sıvı yüksekliğinden dolu hacmi, doluluk yüzdesini ve boş hacmi hesaplar."
      formula="V = L·[r²·arccos((r−h)/r) − (r−h)·√(2rh − h²)]"
      engineeringNote="Düz kapaklı silindir kabulüdür; bombeli veya elipsoidal kapak hacmini üreticiden ekleyin. Yakıt veya ısıl depo seviye–hacim kalibrasyonu için kullanılır; hacmi Yakıt Deposu Otonomi Süresi modülüne girdi yapabilirsiniz."
      fields={[
        { key: "cap_D_m", label: "Tank Çapı D (m)", type: "number", step: 0.1, min: 0.1 },
        { key: "boy_L_m", label: "Tank Boyu L (m)", type: "number", step: 0.1, min: 0.1 },
        { key: "sivi_yuksekligi_h_m", label: "Sıvı Yüksekliği h (m)", type: "number", step: 0.05, min: 0 },
      ]}
      defaults={{ cap_D_m: 2, boy_L_m: 4, sivi_yuksekligi_h_m: 0.5 }}
      mainUnit="m³"
      mainValueKey="dolu_hacim_m3"
      mainDecimals={3}
      intermediateLabels={{
        dolu_hacim_L: "Dolu Hacim (L)",
        toplam_hacim_m3: "Toplam Hacim (m³)",
        doluluk_yuzde: "Doluluk (%)",
        seviye_yuzdesi: "Seviye (% çap)",
        bos_hacim_m3: "Boş Hacim (m³)",
        not: "Not",
      }}
    />
  );
}
