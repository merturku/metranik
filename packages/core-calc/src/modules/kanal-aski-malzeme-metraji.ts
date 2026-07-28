import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kanal askı (hanger) malzeme metrajı: SMACNA HVAC Duct Construction
// Standards, düz kanal hatlarında asgari askı aralığını (yaygın pratik
// değer ~3.0 m) referans alır. Askı adedi = ⌈L/S⌉ + 1 (iki uçtaki askılar
// dahil). Her askı için gerekli kayış/çubuk uzunluğu kanal çevresi + bağlama
// payından hesaplanır.
const VARSAYILAN_EK_PAY_M = 0.3;

export const kanalAskiMalzemeMetrajiInputSchema = z.object({
  kanalUzunlugu_L_m: z.number().positive(),
  maksimumAskiAraligi_S_m: z.number().positive(),
  kanalCevresi_P_m: z.number().positive(),
  baglamaPayi_m: z.number().nonnegative().default(VARSAYILAN_EK_PAY_M),
});

export type KanalAskiMalzemeMetrajiInput = z.infer<
  typeof kanalAskiMalzemeMetrajiInputSchema
>;

export interface KanalAskiMalzemeMetrajiOutput {
  toplamAskiMalzemesi_m: number;
}

function compute(
  input: KanalAskiMalzemeMetrajiInput,
): CalcResult<KanalAskiMalzemeMetrajiOutput> {
  const askiAdedi =
    Math.ceil(input.kanalUzunlugu_L_m / input.maksimumAskiAraligi_S_m) + 1;
  const askiBasinaMalzeme_m = input.kanalCevresi_P_m + input.baglamaPayi_m;
  const toplamAskiMalzemesiM = askiAdedi * askiBasinaMalzeme_m;

  return {
    value: { toplamAskiMalzemesi_m: toplamAskiMalzemesiM },
    intermediates: {
      askiAdedi,
      askiBasinaMalzeme_m: askiBasinaMalzeme_m,
    },
    standardsUsed: ["SMACNA HVAC Duct Construction Standards"],
  };
}

export const kanalAskiMalzemeMetraji: CalcModule<
  KanalAskiMalzemeMetrajiInput,
  KanalAskiMalzemeMetrajiOutput
> = {
  id: "kanal-aski-malzeme-metraji",
  title: "Kanal Askı Malzeme Metrajı",
  discipline: "mekanik",
  standards: ["SMACNA HVAC Duct Construction Standards"],
  inputSchema: kanalAskiMalzemeMetrajiInputSchema,
  compute,
};
