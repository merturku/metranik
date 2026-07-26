import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Betonarme kolonda boyuna donatı oranı: ρ = As / Ac.
// TS 500 §7.4.1: kolonlarda ρmin = 0.01, ρmax = 0.04 (brüt beton kesitine göre).
const RO_MIN = 0.01;
const RO_MAX = 0.04;

export const kolonDonatiOraniKontroluInputSchema = z.object({
  boyunaDonatiAlani_As_mm2: z.number().positive(),
  brutBetonKesitAlani_Ac_mm2: z.number().positive(),
});

export type KolonDonatiOraniKontroluInput = z.infer<
  typeof kolonDonatiOraniKontroluInputSchema
>;

export interface KolonDonatiOraniKontroluOutput {
  donatiOrani_ro: number;
}

function compute(
  input: KolonDonatiOraniKontroluInput,
): CalcResult<KolonDonatiOraniKontroluOutput> {
  const donatiOrani_ro = input.boyunaDonatiAlani_As_mm2 / input.brutBetonKesitAlani_Ac_mm2;

  let status: "uygun" | "sinirda" | "uygunsuz";
  let note: string;
  if (donatiOrani_ro < RO_MIN) {
    status = "uygunsuz";
    note = "Donatı oranı TS 500 asgari sınırı ρmin=0.01'in altında.";
  } else if (donatiOrani_ro > RO_MAX) {
    status = "uygunsuz";
    note = "Donatı oranı TS 500 azami sınırı ρmax=0.04'ün üstünde.";
  } else if (donatiOrani_ro > RO_MAX * 0.9) {
    status = "sinirda";
    note = "Donatı oranı azami sınıra yakın; kesit veya donatı düzeni gözden geçirilmeli.";
  } else {
    status = "uygun";
    note = "Donatı oranı TS 500 sınırları (ρmin-ρmax) içinde.";
  }

  return {
    value: { donatiOrani_ro },
    intermediates: {
      ro_min: RO_MIN,
      ro_max: RO_MAX,
      donatiOrani_yuzde: Number((donatiOrani_ro * 100).toFixed(3)),
    },
    standardsUsed: ["TS 500 §7.4.1"],
    verdict: { status, note },
  };
}

export const kolonDonatiOraniKontrolu: CalcModule<
  KolonDonatiOraniKontroluInput,
  KolonDonatiOraniKontroluOutput
> = {
  id: "kolon-donati-orani-kontrolu",
  title: "Kolon Boyuna Donatı Oranı Kontrolü",
  discipline: "insaat",
  standards: ["TS 500"],
  inputSchema: kolonDonatiOraniKontroluInputSchema,
  compute,
};
