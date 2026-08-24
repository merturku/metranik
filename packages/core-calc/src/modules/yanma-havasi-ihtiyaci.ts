import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Yanma havası ihtiyacı: stokiyometrik (teorik) hava/yakıt oranı, fazla hava
// katsayısıyla (λ>1, eksiksiz yanmayı güvence altına almak için) çarpılarak
// gerçek hava debisi bulunur. Doğalgaz (~CH4) için teorik oran ~9.52 Nm³
// hava/Nm³ yakıt (CH4 + 2O2 → CO2 + 2H2O, hava %21 O2 içerir → 2/0.21≈9.52).
export const yanmaHavasiIhtiyaciInputSchema = z.object({
  yakitDebisi_Nm3h: z.number().positive(),
  teorikHavaOrani_Nm3Nm3: z.number().positive(),
  fazlaHavaKatsayisi_lambda: z.number().min(1),
});

export type YanmaHavasiIhtiyaciInput = z.infer<
  typeof yanmaHavasiIhtiyaciInputSchema
>;

export interface YanmaHavasiIhtiyaciOutput {
  gerekliYanmaHavasi_Nm3h: number;
}

function compute(
  input: YanmaHavasiIhtiyaciInput,
): CalcResult<YanmaHavasiIhtiyaciOutput> {
  const teorikHavaDebisiNm3h = input.yakitDebisi_Nm3h * input.teorikHavaOrani_Nm3Nm3;
  const gerekliYanmaHavasiNm3h = teorikHavaDebisiNm3h * input.fazlaHavaKatsayisi_lambda;

  return {
    value: { gerekliYanmaHavasi_Nm3h: gerekliYanmaHavasiNm3h },
    intermediates: {
      teorikHavaDebisi_Nm3h: teorikHavaDebisiNm3h,
    },
    standardsUsed: [],
  };
}

export const yanmaHavasiIhtiyaci: CalcModule<
  YanmaHavasiIhtiyaciInput,
  YanmaHavasiIhtiyaciOutput
> = {
  id: "yanma-havasi-ihtiyaci",
  title: "Yanma Havası İhtiyacı",
  discipline: "mekanik",
  standards: [],
  inputSchema: yanmaHavasiIhtiyaciInputSchema,
  compute,
};
