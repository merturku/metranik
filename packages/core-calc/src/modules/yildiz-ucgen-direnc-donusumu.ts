import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Yıldız (Y) → üçgen (Δ) eşdeğer dönüşümü: Rab = (RaRb + RbRc + RcRa)/Rc, Rbc = (…)/Ra, Rca = (…)/Rb. Simetrik halde RΔ = 3·RY.
// Ters dönüşüm (Δ→Y): Ra = Rab·Rca/(Rab + Rbc + Rca) ile doğrulama değerleri verilir. Klasik devre teorisi (Kennelly).
export const yildizUcgenDirencDonusumuInputSchema = z.object({
  ra_ohm: z.number().positive(),
  rb_ohm: z.number().positive(),
  rc_ohm: z.number().positive(),
});

export type YildizUcgenDirencDonusumuInput = z.infer<typeof yildizUcgenDirencDonusumuInputSchema>;

export interface YildizUcgenDirencDonusumuOutput {
  rab_ohm: number;
}

function compute(input: YildizUcgenDirencDonusumuInput): CalcResult<YildizUcgenDirencDonusumuOutput> {
  const { ra_ohm: ra, rb_ohm: rb, rc_ohm: rc } = input;
  const s = ra * rb + rb * rc + rc * ra;
  const rab = s / rc;
  const rbc = s / ra;
  const rca = s / rb;
  const t = rab + rbc + rca;
  return {
    value: { rab_ohm: rab },
    intermediates: {
      rbc_ohm: rbc,
      rca_ohm: rca,
      geri_donusum_ra_ohm: (rab * rca) / t,
      geri_donusum_rb_ohm: (rab * rbc) / t,
      geri_donusum_rc_ohm: (rbc * rca) / t,
    },
    standardsUsed: ["Y–Δ (Kennelly) dönüşümü"],
  };
}

export const yildizUcgenDirencDonusumu: CalcModule<YildizUcgenDirencDonusumuInput, YildizUcgenDirencDonusumuOutput> = {
  id: "yildiz-ucgen-direnc-donusumu",
  title: "Yıldız–Üçgen Direnç Dönüşümü",
  discipline: "elektrik",
  standards: [],
  inputSchema: yildizUcgenDirencDonusumuInputSchema,
  compute,
};
