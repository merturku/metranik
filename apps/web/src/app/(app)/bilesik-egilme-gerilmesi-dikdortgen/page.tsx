"use client";

import { bilesikEgilmeGerilmesiDikdortgen } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function BilesikEgilmeGerilmesiDikdortgenPage() {
  return (
    <CalcPage
      module={bilesikEgilmeGerilmesiDikdortgen}
      standardsLabel={'Klasik mukavemet'}
      description={'Dikdörtgen kesitte eksenel basınç ve iki eksenli momentten en büyük/en küçük gerilmeyi ve çekirdek durumunu hesaplar.'}
      formula={'σ = N/A ± Mx/Wx ± My/Wy;  Wx = b·h²/6, Wy = h·b²/6;  çekirdek: ex/h + ey/b ≤ 1/6'}
      engineeringNote={'Elastik ve çatlamamış kesit kabulü; betonarmede çatlama sonrası kapasite TS 500 etkileşim diyagramıyla kontrol edilir. Mx h doğrultusundaki, My b doğrultusundaki eğilmedir. Yığma ve temel gibi çekme almayan sistemlerde çekirdek şartı önemlidir.'}
      fields={[
        { key: "genislik_b_mm", label: "Genişlik b (mm)", type: "number", step: 10, min: 1 },
        { key: "yukseklik_h_mm", label: "Yükseklik h (mm)", type: "number", step: 10, min: 1 },
        { key: "eksenelBasinc_N_kN", label: "Eksenel Basınç N (kN)", type: "number", step: 10, min: 0.1 },
        { key: "momentMx_kNm", label: "Moment Mx (kN·m)", type: "number", step: 1, min: 0 },
        { key: "momentMy_kNm", label: "Moment My (kN·m)", type: "number", step: 1, min: 0 },
        { key: "izinVerilenBasinc_MPa", label: "İzin Verilen Basınç (MPa)", type: "number", step: 0.5, min: 0.1 },
      ]}
      defaults={{ genislik_b_mm: 300, yukseklik_h_mm: 500, eksenelBasinc_N_kN: 600, momentMx_kNm: 40, momentMy_kNm: 15, izinVerilenBasinc_MPa: 12 }}
      mainUnit={'MPa'}
      mainValueKey={'maksBasincGerilmesi_MPa'}
      mainDecimals={2}
      intermediateLabels={{
        A_mm2: "A (mm²)",
        eksenel_gerilme_MPa: "N/A (MPa)",
        Mx_gerilmesi_MPa: "Mx/Wx (MPa)",
        My_gerilmesi_MPa: "My/Wy (MPa)",
        min_gerilme_MPa: "σmin (MPa)",
        ex_mm: "ex (mm)",
        ey_mm: "ey (mm)",
        cekirdek_orani_ex_h_ey_b: "ex/h + ey/b",
      }}
    />
  );
}
