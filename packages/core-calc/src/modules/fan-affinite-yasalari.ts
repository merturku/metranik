import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Fan afinite (benzerlik) yasaları: aynı fan farklı devirde çalışırken
// Q2=Q1·(N2/N1), P2=P1·(N2/N1)², Güç2=Güç1·(N2/N1)³.
export const fanAffiniteYasalariInputSchema = z.object({
  referansDebi_Q1_m3h: z.number().positive(),
  referansBasinc_P1_Pa: z.number().positive(),
  referansGuc_Guc1_kW: z.number().positive(),
  referansDevir_N1_rpm: z.number().positive(),
  yeniDevir_N2_rpm: z.number().positive(),
});

export type FanAffiniteYasalariInput = z.infer<typeof fanAffiniteYasalariInputSchema>;

export interface FanAffiniteYasalariOutput {
  yeniDebi_Q2_m3h: number;
}

function compute(input: FanAffiniteYasalariInput): CalcResult<FanAffiniteYasalariOutput> {
  const oran = input.yeniDevir_N2_rpm / input.referansDevir_N1_rpm;
  const yeniDebiM3h = input.referansDebi_Q1_m3h * oran;
  const yeniBasincPa = input.referansBasinc_P1_Pa * oran ** 2;
  const yeniGucKW = input.referansGuc_Guc1_kW * oran ** 3;

  return {
    value: { yeniDebi_Q2_m3h: yeniDebiM3h },
    intermediates: {
      devirOrani: oran,
      yeniBasinc_P2_Pa: yeniBasincPa,
      yeniGuc_Guc2_kW: yeniGucKW,
    },
    standardsUsed: ["Fan Afinite Yasaları"],
  };
}

export const fanAffiniteYasalari: CalcModule<
  FanAffiniteYasalariInput,
  FanAffiniteYasalariOutput
> = {
  id: "fan-affinite-yasalari",
  title: "Fan Afinite Yasaları (Devir Değişimi)",
  discipline: "mekanik",
  standards: ["Fan Afinite Yasaları"],
  inputSchema: fanAffiniteYasalariInputSchema,
  compute,
};
