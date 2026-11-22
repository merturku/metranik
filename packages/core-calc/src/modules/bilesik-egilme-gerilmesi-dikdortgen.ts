import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Dikdörtgen kesit, eksenel yük + iki eksenli eğilme: σ = N/A ± Mx/Wx ± My/Wy  (basınç +)
// Wx = b·h²/6 (h doğrultusunda eğilme), Wy = h·b²/6;  çekirdek şartı: ex/h + ey/b ≤ 1/6
export const bilesikEgilmeGerilmesiDikdortgenInputSchema = z.object({
  genislik_b_mm: z.number().positive(),
  yukseklik_h_mm: z.number().positive(),
  eksenelBasinc_N_kN: z.number().positive(),
  momentMx_kNm: z.number().min(0),
  momentMy_kNm: z.number().min(0),
  izinVerilenBasinc_MPa: z.number().positive(),
});

export type BilesikEgilmeGerilmesiDikdortgenInput = z.infer<typeof bilesikEgilmeGerilmesiDikdortgenInputSchema>;
export interface BilesikEgilmeGerilmesiDikdortgenOutput {
  maksBasincGerilmesi_MPa: number;
}

const STD = "Klasik mukavemet (σ = N/A ± M/W), elastik, çatlamamış kesit";

function compute(input: BilesikEgilmeGerilmesiDikdortgenInput): CalcResult<BilesikEgilmeGerilmesiDikdortgenOutput> {
  const b = input.genislik_b_mm;
  const h = input.yukseklik_h_mm;
  const A = b * h;
  const Wx = (b * h * h) / 6;
  const Wy = (h * b * b) / 6;
  const N = input.eksenelBasinc_N_kN * 1000;
  const sN = N / A;
  const sx = (input.momentMx_kNm * 1e6) / Wx;
  const sy = (input.momentMy_kNm * 1e6) / Wy;
  const smax = sN + sx + sy;
  const smin = sN - sx - sy;
  const ex = (input.momentMx_kNm * 1000) / input.eksenelBasinc_N_kN;
  const ey = (input.momentMy_kNm * 1000) / input.eksenelBasinc_N_kN;
  const cekirdek = ex / h + ey / b;
  const status = smax > input.izinVerilenBasinc_MPa ? "uygunsuz" : smin < 0 ? "sinirda" : "uygun";
  return {
    value: { maksBasincGerilmesi_MPa: smax },
    intermediates: {
      A_mm2: A,
      eksenel_gerilme_MPa: sN,
      Mx_gerilmesi_MPa: sx,
      My_gerilmesi_MPa: sy,
      min_gerilme_MPa: smin,
      ex_mm: ex,
      ey_mm: ey,
      cekirdek_orani_ex_h_ey_b: cekirdek,
    },
    standardsUsed: [STD],
    verdict: {
      status,
      note: smax > input.izinVerilenBasinc_MPa
        ? `σmaks izin değeri aşıyor (${smax.toFixed(2)} > ${input.izinVerilenBasinc_MPa} MPa)`
        : smin < 0
          ? `Kesitte çekme bölgesi oluşuyor (σmin = ${smin.toFixed(2)} MPa; çekirdek oranı ${cekirdek.toFixed(3)} > 1/6). Çekme almayan malzeme (yığma/zemin) için yeniden dağılım gerekir`
          : "Kesit tamamen basınç altında",
    },
  };
}

export const bilesikEgilmeGerilmesiDikdortgen: CalcModule<BilesikEgilmeGerilmesiDikdortgenInput, BilesikEgilmeGerilmesiDikdortgenOutput> = {
  id: "bilesik-egilme-gerilmesi-dikdortgen",
  title: "Bileşik Eğilme Gerilmesi ve Çekirdek Kontrolü (Dikdörtgen Kesit)",
  discipline: "insaat",
  standards: [STD],
  inputSchema: bilesikEgilmeGerilmesiDikdortgenInputSchema,
  compute,
};
