import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";
export const isiNtuSchema = z.object({ C_min_W_K: z.number().positive(), U_A_W_K: z.number().positive() });
export const isiEsanjorNtu: CalcModule<any, any> = {
  id: "isi-esanjoru-ntu",
  title: "Isı Eşanjörü NTU (Etkinlik)",
  discipline: "mekanik",
  standards: ["EN 12815"],
  inputSchema: isiNtuSchema as any,
  compute(input: any) {
    const NTU = input.U_A_W_K / input.C_min_W_K;
    const epsilon = 1 - Math.exp(-NTU);
    return { value: { NTU: parseFloat(NTU.toFixed(2)), epsilon: parseFloat(epsilon.toFixed(2)) }, intermediates: { C_min: input.C_min_W_K }, standardsUsed: ["EN 12815"] };
  },
};
