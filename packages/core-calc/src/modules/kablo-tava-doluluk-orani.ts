import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS EN 61537 / IEC 60364: doluluk oranı = ΣKablo kesit alanı / Tava kesit alanı.
// Tek katman dizilimde ≤%40, çok katmanlı dizilimde ≤%50 sınırı esas alınır.
const TEK_KATMAN_SINIR_YUZDE = 40;
const COK_KATMAN_SINIR_YUZDE = 50;

export const kabloTavaDolulukOraniInputSchema = z.object({
  kabloKesitAlanlariToplami_mm2: z.number().positive(),
  tavaKesitAlani_mm2: z.number().positive(),
  dizilimTipi: z.enum(["tek", "cok"]),
});

export type KabloTavaDolulukOraniInput = z.infer<typeof kabloTavaDolulukOraniInputSchema>;

export interface KabloTavaDolulukOraniOutput {
  doluluk_yuzde: number;
}

function compute(input: KabloTavaDolulukOraniInput): CalcResult<KabloTavaDolulukOraniOutput> {
  const dolulukYuzde =
    (input.kabloKesitAlanlariToplami_mm2 / input.tavaKesitAlani_mm2) * 100;
  const sinirYuzde =
    input.dizilimTipi === "tek" ? TEK_KATMAN_SINIR_YUZDE : COK_KATMAN_SINIR_YUZDE;
  const marjYuzde = sinirYuzde - dolulukYuzde;
  const uygun = marjYuzde >= 0;

  return {
    value: { doluluk_yuzde: dolulukYuzde },
    intermediates: {
      sinir_yuzde: sinirYuzde,
      marj_yuzde: marjYuzde,
    },
    standardsUsed: ["TS EN 61537", "IEC 60364"],
    verdict: uygun
      ? { status: "uygun", note: "Doluluk oranı izin verilen sınırın altında." }
      : { status: "uygunsuz", note: "Doluluk oranı izin verilen sınırı aşıyor." },
  };
}

export const kabloTavaDolulukOrani: CalcModule<
  KabloTavaDolulukOraniInput,
  KabloTavaDolulukOraniOutput
> = {
  id: "kablo-tava-doluluk-orani",
  title: "Kablo Tava Doluluk Oranı",
  discipline: "elektrik",
  standards: ["TS EN 61537", "IEC 60364"],
  inputSchema: kabloTavaDolulukOraniInputSchema,
  compute,
};
