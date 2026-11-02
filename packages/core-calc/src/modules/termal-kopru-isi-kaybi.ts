import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Doğrusal ısıl köprü ısı kaybı (TS EN ISO 14683 / TS 825): Q = ψ·L·ΔT  [W]
// ψ doğrusal ısı geçirgenlik katsayısı (W/mK; ayrıntı hesabı veya katalogdan), L köprü uzunluğu.
// Duvar iletim kaybına (UA·ΔT) oranı verilerek köprünün payı görülür.
export const termalKopruIsiKaybiInputSchema = z.object({
  psi_WmK: z.number().min(0),
  uzunluk_m: z.number().positive(),
  icSicaklik_C: z.number(),
  disSicaklik_C: z.number(),
  duvarUA_WK: z.number().positive(),
});

export type TermalKopruIsiKaybiInput = z.infer<typeof termalKopruIsiKaybiInputSchema>;

export interface TermalKopruIsiKaybiOutput {
  isiKaybi_W: number;
}

function compute(input: TermalKopruIsiKaybiInput): CalcResult<TermalKopruIsiKaybiOutput> {
  const dT = input.icSicaklik_C - input.disSicaklik_C;
  const q = input.psi_WmK * input.uzunluk_m * dT;
  const duvar = input.duvarUA_WK * dT;
  return {
    value: { isiKaybi_W: q },
    intermediates: {
      sicaklik_farki_K: dT,
      psi_L_WK: input.psi_WmK * input.uzunluk_m,
      duvar_iletim_kaybi_W: duvar,
      ek_kayip_yuzde: duvar !== 0 ? (q / duvar) * 100 : 0,
    },
    standardsUsed: ["TS EN ISO 14683", "TS 825"],
  };
}

export const termalKopruIsiKaybi: CalcModule<TermalKopruIsiKaybiInput, TermalKopruIsiKaybiOutput> = {
  id: "termal-kopru-isi-kaybi",
  title: "Isıl Köprü (Doğrusal) Isı Kaybı",
  discipline: "ev",
  standards: ["TS EN ISO 14683", "TS 825"],
  inputSchema: termalKopruIsiKaybiInputSchema,
  compute,
};
