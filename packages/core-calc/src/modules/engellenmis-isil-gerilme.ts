import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Genleşmesi tamamen engellenmiş çubuk/boru/ray: serbest genleşme ε = α·ΔT engellenirse σ = E·α·ΔT, F = σ·A (Hooke yasası + ısıl şekil değiştirme).
// Gerçek mesnetlerde kısmi rijitlik ve burkulma (basınç) ayrıca kontrol edilmelidir; bu modül üst sınır gerilmeyi verir.
export const engellenmisIsilGerilmeInputSchema = z.object({
  elastisiteModulu_MPa: z.number().positive(),
  genlesmeKatsayisi_1e6: z.number().positive(),
  sicaklikFarki_K: z.number().finite(),
  kesitAlani_mm2: z.number().positive(),
  akmaDayanimi_MPa: z.number().positive(),
});

export type EngellenmisIsilGerilmeInput = z.infer<typeof engellenmisIsilGerilmeInputSchema>;

export interface EngellenmisIsilGerilmeOutput {
  gerilme_MPa: number;
}

function compute(input: EngellenmisIsilGerilmeInput): CalcResult<EngellenmisIsilGerilmeOutput> {
  const eps = input.genlesmeKatsayisi_1e6 * 1e-6 * input.sicaklikFarki_K;
  const sigma = input.elastisiteModulu_MPa * eps;
  const oran = Math.abs(sigma) / input.akmaDayanimi_MPa;
  return {
    value: { gerilme_MPa: sigma },
    intermediates: {
      isil_sekil_degistirme: eps,
      eksenel_kuvvet_kN: (sigma * input.kesitAlani_mm2) / 1000,
      akma_orani: oran,
      etki: sigma > 0 ? "Çekme" : sigma < 0 ? "Basınç" : "—",
    },
    standardsUsed: ["Hooke yasası, ısıl şekil değiştirme ε = α·ΔT"],
    verdict:
      oran > 1
        ? { status: "uygunsuz", note: "Gerilme akma dayanımını aşıyor; genleşme derzi/lira gerekir." }
        : oran > 0.6
          ? { status: "sinirda", note: "Gerilme akma dayanımının %60'ını aşıyor." }
          : { status: "uygun", note: "Gerilme akma dayanımının %60'ı altında." },
  };
}

export const engellenmisIsilGerilme: CalcModule<EngellenmisIsilGerilmeInput, EngellenmisIsilGerilmeOutput> = {
  id: "engellenmis-isil-gerilme",
  title: "Engellenmiş Genleşmede Isıl Gerilme ve Kuvvet",
  discipline: "insaat",
  standards: [],
  inputSchema: engellenmisIsilGerilmeInputSchema,
  compute,
};
