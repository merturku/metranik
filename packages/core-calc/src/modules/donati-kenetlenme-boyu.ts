import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS 500 / TBDY 2018: tasarım aderans gerilmesi fbd = 0.35·√fck/γc·η,
// kenetlenme boyu lb = (φ/4)·(fyd/fbd). γc=1.5 sabit, η pozisyon katsayısı.
const BETON_GUVENLIK_KATSAYISI_GAMMA_C = 1.5;
const CELIK_GUVENLIK_KATSAYISI = 1.15;

export const donatiKenetlenmeBoyuInputSchema = z.object({
  betonKarakteristikDayanim_fck_MPa: z.number().positive(),
  celikAkmaDayanimi_fyk_MPa: z.number().positive(),
  donatiCapi_mm: z.number().positive(),
  pozisyonKatsayisi_eta: z.number().positive().max(1),
});

export type DonatiKenetlenmeBoyuInput = z.infer<typeof donatiKenetlenmeBoyuInputSchema>;

export interface DonatiKenetlenmeBoyuOutput {
  kenetlenmeBoyu_mm: number;
}

function compute(input: DonatiKenetlenmeBoyuInput): CalcResult<DonatiKenetlenmeBoyuOutput> {
  const fydMPa = input.celikAkmaDayanimi_fyk_MPa / CELIK_GUVENLIK_KATSAYISI;
  const fbdMPa =
    (0.35 * Math.sqrt(input.betonKarakteristikDayanim_fck_MPa)) /
    BETON_GUVENLIK_KATSAYISI_GAMMA_C *
    input.pozisyonKatsayisi_eta;
  const kenetlenmeBoyuMm = (input.donatiCapi_mm / 4) * (fydMPa / fbdMPa);

  return {
    value: { kenetlenmeBoyu_mm: kenetlenmeBoyuMm },
    intermediates: {
      celikHesapDayanimi_fyd_MPa: fydMPa,
      aderansGerilmesi_fbd_MPa: fbdMPa,
    },
    standardsUsed: ["TS 500", "TBDY 2018"],
  };
}

export const donatiKenetlenmeBoyu: CalcModule<
  DonatiKenetlenmeBoyuInput,
  DonatiKenetlenmeBoyuOutput
> = {
  id: "donati-kenetlenme-boyu",
  title: "Donatı Kenetlenme Boyu",
  discipline: "insaat",
  standards: ["TS 500", "TBDY 2018"],
  inputSchema: donatiKenetlenmeBoyuInputSchema,
  compute,
};
