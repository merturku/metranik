import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// IEC 60364-4-41 TT sistem dokunma gerilimi kriteri: Ra × IΔn ≤ Uo (genel yerlerde
// 50V, ıslak/özel yerlerde 25V). Ra: ölçülen topraklama direnci, IΔn: koruma
// cihazının (RCD) anma artık akımı.
export const topraklamaDirenciTestiInputSchema = z.object({
  olculenDirenc_ohm: z.number().positive(),
  rcdAnmaAkimi_A: z.number().positive(),
  izinVerilenGerilim_V: z.number().positive(),
});

export type TopraklamaDirenciTestiInput = z.infer<typeof topraklamaDirenciTestiInputSchema>;

export interface TopraklamaDirenciTestiOutput {
  dokunmaGerilimi_V: number;
}

function compute(
  input: TopraklamaDirenciTestiInput,
): CalcResult<TopraklamaDirenciTestiOutput> {
  const dokunmaGerilimiV = input.olculenDirenc_ohm * input.rcdAnmaAkimi_A;
  const uygun = dokunmaGerilimiV <= input.izinVerilenGerilim_V;

  return {
    value: { dokunmaGerilimi_V: dokunmaGerilimiV },
    intermediates: {
      olculenDirenc_ohm: input.olculenDirenc_ohm,
      rcdAnmaAkimi_A: input.rcdAnmaAkimi_A,
    },
    standardsUsed: ["IEC 60364-4-41"],
    verdict: uygun
      ? { status: "uygun", note: "Hesaplanan dokunma gerilimi izin verilenin altında." }
      : { status: "uygunsuz", note: "Hesaplanan dokunma gerilimi izin verileni aşıyor." },
  };
}

export const topraklamaDirenciTesti: CalcModule<
  TopraklamaDirenciTestiInput,
  TopraklamaDirenciTestiOutput
> = {
  id: "topraklama-direnci-testi",
  title: "Topraklama Direnci Testi",
  discipline: "elektrik",
  standards: ["IEC 60364-4-41"],
  inputSchema: topraklamaDirenciTestiInputSchema,
  compute,
};
