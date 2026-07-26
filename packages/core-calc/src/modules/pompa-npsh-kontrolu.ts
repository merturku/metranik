import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Mevcut NPSH (NPSHa) hesabı ve gerekli NPSH (NPSHr) ile kavitasyon kontrolü:
// NPSHa = (Patm - Pv) / (ρ × g) - hs - hf
// Patm: atmosfer basıncı (Pa), Pv: akışkanın buhar basıncı (Pa), ρ: yoğunluk (kg/m³),
// hs: emme yüksekliği (m, pompa su seviyesinin üzerindeyse pozitif), hf: emme hattı sürtünme kaybı (m).
// Güvenli işletme için NPSHa, NPSHr'den en az ~0.5 m fazla olmalıdır (kavitasyon marjı).
export const pompaNpshKontroluInputSchema = z.object({
  atmosferBasinci_Patm_Pa: z.number().positive(),
  buharBasinci_Pv_Pa: z.number().nonnegative(),
  yogunluk_rho_kgm3: z.number().positive(),
  emmeYuksekligi_hs_m: z.number(),
  emmeHattiKaybi_hf_m: z.number().nonnegative(),
  gerekliNpsh_NPSHr_m: z.number().positive(),
});

export type PompaNpshKontroluInput = z.infer<typeof pompaNpshKontroluInputSchema>;

export interface PompaNpshKontroluOutput {
  npsha_m: number;
}

const GUVENLIK_MARJI_M = 0.5;
const YERCEKIMI_g = 9.81;

function compute(input: PompaNpshKontroluInput): CalcResult<PompaNpshKontroluOutput> {
  const atmosferHeadi_m =
    (input.atmosferBasinci_Patm_Pa - input.buharBasinci_Pv_Pa) /
    (input.yogunluk_rho_kgm3 * YERCEKIMI_g);
  const npsha_m = atmosferHeadi_m - input.emmeYuksekligi_hs_m - input.emmeHattiKaybi_hf_m;
  const marj_m = npsha_m - input.gerekliNpsh_NPSHr_m;

  let status: "uygun" | "sinirda" | "uygunsuz";
  let note: string;
  if (marj_m >= GUVENLIK_MARJI_M) {
    status = "uygun";
    note = "NPSHa, NPSHr'yi yeterli marjla aşıyor; kavitasyon riski düşük.";
  } else if (marj_m >= 0) {
    status = "sinirda";
    note = "NPSHa, NPSHr'nin üzerinde ama marj düşük; emme hattı gözden geçirilmeli.";
  } else {
    status = "uygunsuz";
    note = "NPSHa, NPSHr'nin altında; kavitasyon riski yüksek.";
  }

  return {
    value: { npsha_m },
    intermediates: {
      atmosferHeadi_m: Number(atmosferHeadi_m.toFixed(3)),
      gerekliNpsh_NPSHr_m: input.gerekliNpsh_NPSHr_m,
      marj_m: Number(marj_m.toFixed(3)),
    },
    standardsUsed: [],
    verdict: { status, note },
  };
}

export const pompaNpshKontrolu: CalcModule<PompaNpshKontroluInput, PompaNpshKontroluOutput> = {
  id: "pompa-npsh-kontrolu",
  title: "Pompa NPSH Kontrolü",
  discipline: "mekanik",
  standards: [],
  inputSchema: pompaNpshKontroluInputSchema,
  compute,
};
