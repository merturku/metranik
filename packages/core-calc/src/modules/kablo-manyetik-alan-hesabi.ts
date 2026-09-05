import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Ampère yasası: sonsuz uzun düz bir iletkenin etrafında oluşan manyetik alan
// B = μ0×I/(2πr) (μ0: boşluğun manyetik geçirgenliği, 4π×10⁻⁷ T·m/A).
// Hesaplanan alan, maruziyet için izin verilen referans seviyesiyle (örn.
// ICNIRP genel halk için 50 Hz'de 200 µT) karşılaştırılabilir.
const MU0_TmA = 4 * Math.PI * 1e-7;

export const kabloManyetikAlanHesabiInputSchema = z.object({
  akim_I_A: z.number().positive(),
  mesafe_r_m: z.number().positive(),
  izinVerilenReferansSeviyesi_uT: z.number().positive(),
});

export type KabloManyetikAlanHesabiInput = z.infer<
  typeof kabloManyetikAlanHesabiInputSchema
>;

export interface KabloManyetikAlanHesabiOutput {
  manyetikAlan_B_uT: number;
}

function compute(
  input: KabloManyetikAlanHesabiInput,
): CalcResult<KabloManyetikAlanHesabiOutput> {
  const manyetikAlanTeslaB = (MU0_TmA * input.akim_I_A) / (2 * Math.PI * input.mesafe_r_m);
  const manyetikAlanUTB = manyetikAlanTeslaB * 1_000_000;

  return {
    value: { manyetikAlan_B_uT: manyetikAlanUTB },
    intermediates: {
      izinVerilenReferansSeviyesi_uT: input.izinVerilenReferansSeviyesi_uT,
    },
    standardsUsed: ["ICNIRP"],
    verdict:
      manyetikAlanUTB <= input.izinVerilenReferansSeviyesi_uT
        ? { status: "uygun", note: "Manyetik alan referans seviyesinin altında." }
        : { status: "uygunsuz", note: "Manyetik alan referans seviyesini aşıyor." },
  };
}

export const kabloManyetikAlanHesabi: CalcModule<
  KabloManyetikAlanHesabiInput,
  KabloManyetikAlanHesabiOutput
> = {
  id: "kablo-manyetik-alan-hesabi",
  title: "Kablo Çevresindeki Manyetik Alan (Ampère Yasası)",
  discipline: "elektrik",
  standards: ["ICNIRP"],
  inputSchema: kabloManyetikAlanHesabiInputSchema,
  compute,
};
