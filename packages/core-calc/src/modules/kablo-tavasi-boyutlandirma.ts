import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kablo tavası boyutlandırma: kablo-tava-doluluk-orani'nin tersi — verilen bir
// tavanın doluluğunu kontrol etmek yerine, toplam kablo kesitine ve hedef
// doluluk sınırına göre gerekli tava kesit alanını/genişliğini bulur.
// TS EN 61537: tek katman dizilimde ≤%40, çok katmanlı dizilimde ≤%50.
const TEK_KATMAN_SINIR_YUZDE = 40;
const COK_KATMAN_SINIR_YUZDE = 50;

export const kabloTavasiBoyutlandirmaInputSchema = z.object({
  kabloKesitAlanlariToplami_mm2: z.number().positive(),
  dizilimTipi: z.enum(["tek", "cok"]),
  tavaYuksekligi_mm: z.number().positive(),
});

export type KabloTavasiBoyutlandirmaInput = z.infer<
  typeof kabloTavasiBoyutlandirmaInputSchema
>;

export interface KabloTavasiBoyutlandirmaOutput {
  gerekliGenislik_mm: number;
}

function compute(
  input: KabloTavasiBoyutlandirmaInput,
): CalcResult<KabloTavasiBoyutlandirmaOutput> {
  const sinirYuzde =
    input.dizilimTipi === "tek" ? TEK_KATMAN_SINIR_YUZDE : COK_KATMAN_SINIR_YUZDE;
  const gerekliTavaKesitAlaniMm2 =
    input.kabloKesitAlanlariToplami_mm2 / (sinirYuzde / 100);
  const gerekliGenislikMm = gerekliTavaKesitAlaniMm2 / input.tavaYuksekligi_mm;

  return {
    value: { gerekliGenislik_mm: gerekliGenislikMm },
    intermediates: {
      sinir_yuzde: sinirYuzde,
      gerekliTavaKesitAlani_mm2: gerekliTavaKesitAlaniMm2,
    },
    standardsUsed: ["TS EN 61537"],
  };
}

export const kabloTavasiBoyutlandirma: CalcModule<
  KabloTavasiBoyutlandirmaInput,
  KabloTavasiBoyutlandirmaOutput
> = {
  id: "kablo-tavasi-boyutlandirma",
  title: "Kablo Tavası Boyutlandırma",
  discipline: "elektrik",
  standards: ["TS EN 61537"],
  inputSchema: kabloTavasiBoyutlandirmaInputSchema,
  compute,
};
