import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS EN 62305 / NF C 17-102: yuvarlanan küre yöntemine dayalı koruma yarıçapı
// Rp = √(h × (2D − h)); h: paratoner yüksekliği, D: koruma seviyesine bağlı parametre.
export const paratonerKorumaYaricapiInputSchema = z.object({
  paratonerYuksekligi_h_m: z.number().positive(),
  korumaSeviyesiParametresi_D_m: z.number().positive(),
});

export type ParatonerKorumaYaricapiInput = z.infer<
  typeof paratonerKorumaYaricapiInputSchema
>;

export interface ParatonerKorumaYaricapiOutput {
  korumaYaricapi_m: number;
}

function compute(
  input: ParatonerKorumaYaricapiInput,
): CalcResult<ParatonerKorumaYaricapiOutput> {
  const korumaYaricapiM = Math.sqrt(
    input.paratonerYuksekligi_h_m *
      (2 * input.korumaSeviyesiParametresi_D_m - input.paratonerYuksekligi_h_m),
  );

  return {
    value: { korumaYaricapi_m: korumaYaricapiM },
    intermediates: {
      paratonerYuksekligi_h_m: input.paratonerYuksekligi_h_m,
      korumaSeviyesiParametresi_D_m: input.korumaSeviyesiParametresi_D_m,
    },
    standardsUsed: ["TS EN 62305", "NF C 17-102"],
  };
}

export const paratonerKorumaYaricapi: CalcModule<
  ParatonerKorumaYaricapiInput,
  ParatonerKorumaYaricapiOutput
> = {
  id: "paratoner-koruma-yaricapi",
  title: "Paratoner Koruma Yarıçapı",
  discipline: "elektrik",
  standards: ["TS EN 62305", "NF C 17-102"],
  inputSchema: paratonerKorumaYaricapiInputSchema,
  compute,
};
