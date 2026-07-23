import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Basitleştirilmiş eşdeğer statik yük yöntemi: Vt = Sa·W·I / R. Bu genel form
// (spektral ivme × ağırlık × önem / taşıyıcı sistem katsayısı) TBDY 2018 dahil
// birçok deprem yönetmeliğinde ortaktır. Sa, I ve R değerleri TBDY 2018 tasarım
// spektrumu ve bina sınıfına göre mühendis tarafından belirlenir; tablo gömülü değildir.
export const depremTabanKesmeInputSchema = z.object({
  spektralIvme_Sa: z.number().positive(),
  binaAgirligi_kN: z.number().positive(),
  onemKatsayisi_I: z.number().positive(),
  tasiyiciSistemKatsayisi_R: z.number().positive(),
});

export type DepremTabanKesmeInput = z.infer<typeof depremTabanKesmeInputSchema>;

export interface DepremTabanKesmeOutput {
  tabanKesmeKuvveti_kN: number;
}

function compute(input: DepremTabanKesmeInput): CalcResult<DepremTabanKesmeOutput> {
  const vtKN =
    (input.spektralIvme_Sa * input.binaAgirligi_kN * input.onemKatsayisi_I) /
    input.tasiyiciSistemKatsayisi_R;

  return {
    value: { tabanKesmeKuvveti_kN: vtKN },
    intermediates: {
      spektralIvme_Sa: input.spektralIvme_Sa,
      etkinKatsayi_I_R: input.onemKatsayisi_I / input.tasiyiciSistemKatsayisi_R,
    },
    standardsUsed: ["TBDY 2018"],
  };
}

export const depremTabanKesmeTbdy2018: CalcModule<
  DepremTabanKesmeInput,
  DepremTabanKesmeOutput
> = {
  id: "deprem-taban-kesme-tbdy2018",
  title: "Deprem Taban Kesme",
  discipline: "insaat",
  standards: ["TBDY 2018"],
  inputSchema: depremTabanKesmeInputSchema,
  compute,
};
