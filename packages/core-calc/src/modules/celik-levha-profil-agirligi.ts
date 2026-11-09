import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Çelik parça ağırlığı: m = V·ρ,  ρ = 7850 kg/m³.
// levha: V = b·t·L;  yuvarlak dolu: V = π·d²/4·L;  kare dolu: V = a²·L.  Toplam = adet × tek parça.
// Boyutlar mm (L mm), kesit toleransı ve kaynak/kesim firesi dahil değildir (metraja ayrıca fire ekleyin).
const RHO = 7850;

export const celikLevhaProfilAgirligiInputSchema = z.object({
  sekil: z.enum(["levha", "yuvarlak", "kare"]),
  boyut1_mm: z.number().positive(),
  boyut2_mm: z.number().min(0),
  uzunluk_mm: z.number().positive(),
  adet: z.number().int().min(1),
});

export type CelikLevhaProfilAgirligiInput = z.infer<typeof celikLevhaProfilAgirligiInputSchema>;

export interface CelikLevhaProfilAgirligiOutput {
  toplamAgirlik_kg: number;
}

function compute(input: CelikLevhaProfilAgirligiInput): CalcResult<CelikLevhaProfilAgirligiOutput> {
  const l = input.uzunluk_mm / 1000;
  let alan_m2: number;
  if (input.sekil === "levha") {
    alan_m2 = (input.boyut1_mm / 1000) * (input.boyut2_mm / 1000); // genişlik × kalınlık
  } else if (input.sekil === "yuvarlak") {
    alan_m2 = (Math.PI * (input.boyut1_mm / 1000) ** 2) / 4;
  } else {
    alan_m2 = (input.boyut1_mm / 1000) ** 2;
  }
  const m1 = alan_m2 * l * RHO;
  return {
    value: { toplamAgirlik_kg: m1 * input.adet },
    intermediates: {
      kesit_alani_mm2: alan_m2 * 1e6,
      birim_uzunluk_agirligi_kgm: alan_m2 * RHO,
      tek_parca_agirligi_kg: m1,
      toplam_agirlik_ton: (m1 * input.adet) / 1000,
    },
    standardsUsed: ["Çelik yoğunluğu 7850 kg/m³"],
  };
}

export const celikLevhaProfilAgirligi: CalcModule<CelikLevhaProfilAgirligiInput, CelikLevhaProfilAgirligiOutput> = {
  id: "celik-levha-profil-agirligi",
  title: "Çelik Levha / Dolu Profil Ağırlığı",
  discipline: "insaat",
  standards: [],
  inputSchema: celikLevhaProfilAgirligiInputSchema,
  compute,
};
