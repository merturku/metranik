import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS 500/TBDY 2018: tek donatılı dikdörtgen kesit moment kapasitesi.
// a = As·fyd/(0.85·fcd·b), Mu = As·fyd·(d − a/2).
const BETON_GAMMA_C = 1.5;
const CELIK_GAMMA_S = 1.15;

export const kirisBoyutlandirmaInputSchema = z.object({
  betonKarakteristikDayanim_fck_MPa: z.number().positive(),
  celikAkmaDayanimi_fyk_MPa: z.number().positive(),
  donatiAlani_As_mm2: z.number().positive(),
  kirisGenisligi_b_mm: z.number().positive(),
  faydaliYukseklik_d_mm: z.number().positive(),
});

export type KirisBoyutlandirmaInput = z.infer<typeof kirisBoyutlandirmaInputSchema>;

export interface KirisBoyutlandirmaOutput {
  momentKapasitesi_kNm: number;
}

function compute(input: KirisBoyutlandirmaInput): CalcResult<KirisBoyutlandirmaOutput> {
  const fcdMPa = input.betonKarakteristikDayanim_fck_MPa / BETON_GAMMA_C;
  const fydMPa = input.celikAkmaDayanimi_fyk_MPa / CELIK_GAMMA_S;
  const basincBlokuYuksekligiMm =
    (input.donatiAlani_As_mm2 * fydMPa) / (0.85 * fcdMPa * input.kirisGenisligi_b_mm);
  const muNmm =
    input.donatiAlani_As_mm2 *
    fydMPa *
    (input.faydaliYukseklik_d_mm - basincBlokuYuksekligiMm / 2);

  return {
    value: { momentKapasitesi_kNm: muNmm / 1e6 },
    intermediates: {
      basincBlokuYuksekligi_a_mm: basincBlokuYuksekligiMm,
      celikHesapDayanimi_fyd_MPa: fydMPa,
    },
    standardsUsed: ["TS 500", "TBDY 2018"],
  };
}

export const kirisBoyutlandirma: CalcModule<
  KirisBoyutlandirmaInput,
  KirisBoyutlandirmaOutput
> = {
  id: "kiris-boyutlandirma",
  title: "Kiriş Boyutlandırma (Moment Kapasitesi)",
  discipline: "insaat",
  standards: ["TS 500", "TBDY 2018"],
  inputSchema: kirisBoyutlandirmaInputSchema,
  compute,
};
