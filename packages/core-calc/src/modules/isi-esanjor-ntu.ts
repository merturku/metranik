import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";
export const isiNtuSchema = z.object({ C_min: z.number().positive(), UA: z.number().positive() });
export const isiEsanjorNtu: CalcModule<any, any> = {
  id: "isi-esanjor-ntu",
  title: "Isı Eşanjörü NTU",
  discipline: "mekanik",
  standards: ["EN 12815"],
  inputSchema: isiNtuSchema as any,
  compute(input: any) {
    const NTU = input.UA / input.C_min;
    const eps = 1 - Math.exp(-NTU);
    return { value: { NTU: parseFloat(NTU.toFixed(2)), eps: parseFloat(eps.toFixed(2)) }, intermediates: {}, standardsUsed: ["EN 12815"] };
  },
};
