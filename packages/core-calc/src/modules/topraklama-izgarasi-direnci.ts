import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Yatay topraklama ızgarasının (ağ) yayılma direnci (IEEE Std 80, Sverak bağıntısı):
// Rg = ρ·[1/LT + 1/√(20·A)·(1 + 1/(1 + h·√(20/A)))]   (h 0,25–2,5 m için)
// Karşılaştırma (Laurent-Niemann): Rg = ρ/4·√(π/A) + ρ/LT.
// Toprak potansiyel yükselmesi GPR = IG·Rg; dokunma/adım gerilimi kontrolü ayrıca yapılmalıdır.
export const topraklamaIzgarasiDirenciInputSchema = z.object({
  zeminOzdirenci_ohmm: z.number().positive(),
  izgaraAlani_m2: z.number().positive(),
  toplamIletkenBoyu_m: z.number().positive(),
  gommeDerinligi_m: z.number().positive(),
  izgaraAkimi_IG_kA: z.number().min(0),
});

export type TopraklamaIzgarasiDirenciInput = z.infer<typeof topraklamaIzgarasiDirenciInputSchema>;

export interface TopraklamaIzgarasiDirenciOutput {
  direnc_Rg_ohm: number;
}

function compute(input: TopraklamaIzgarasiDirenciInput): CalcResult<TopraklamaIzgarasiDirenciOutput> {
  const rho = input.zeminOzdirenci_ohmm;
  const A = input.izgaraAlani_m2;
  const LT = input.toplamIletkenBoyu_m;
  const h = input.gommeDerinligi_m;

  const rg = rho * (1 / LT + (1 / Math.sqrt(20 * A)) * (1 + 1 / (1 + h * Math.sqrt(20 / A))));
  const laurentNiemann = (rho / 4) * Math.sqrt(Math.PI / A) + rho / LT;
  const gecerlilik =
    h < 0.25 || h > 2.5
      ? "Gömme derinliği Sverak bağıntısının geçerlilik aralığı (0,25–2,5 m) dışında; sonuç yaklaşıktır."
      : "Sverak bağıntısı geçerlilik aralığında (h 0,25–2,5 m).";

  return {
    value: { direnc_Rg_ohm: rg },
    intermediates: {
      laurent_niemann_Rg_ohm: laurentNiemann,
      esdeger_daire_yaricapi_m: Math.sqrt(A / Math.PI),
      toprak_potansiyel_yukselmesi_GPR_V: input.izgaraAkimi_IG_kA * 1000 * rg,
      gecerlilik,
    },
    standardsUsed: ["IEEE Std 80"],
  };
}

export const topraklamaIzgarasiDirenci: CalcModule<TopraklamaIzgarasiDirenciInput, TopraklamaIzgarasiDirenciOutput> = {
  id: "topraklama-izgarasi-direnci",
  title: "Topraklama Izgarası (Ağ) Direnci",
  discipline: "elektrik",
  standards: ["IEEE Std 80"],
  inputSchema: topraklamaIzgarasiDirenciInputSchema,
  compute,
};
