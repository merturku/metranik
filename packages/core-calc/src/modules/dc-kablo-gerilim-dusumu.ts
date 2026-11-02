import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// DC kablo gerilim düşümü (GES string/DC hattı, akü hattı): ΔV = 2·ρ·L·I / A  (gidiş-dönüş),
// ρ(bakır, ~75 °C) = 0,0225 Ω·mm²/m (tutucu). Azami izin yüzdesi tasarımcı girdisidir
// (GES DC hatlarında yaygın hedef ≤ %1–1,5; IEC 62548 tasarım kılavuzundan teyit edin).
export const dcKabloGerilimDusumuInputSchema = z.object({
  sistemGerilimi_V: z.number().positive(),
  akim_A: z.number().positive(),
  tekYonUzunluk_m: z.number().positive(),
  kesit_mm2: z.number().positive(),
  izinVerilenYuzde: z.number().positive().max(10),
});

export type DcKabloGerilimDusumuInput = z.infer<typeof dcKabloGerilimDusumuInputSchema>;

export interface DcKabloGerilimDusumuOutput {
  gerilimDusumu_V: number;
}

const RHO = 0.0225;

function compute(input: DcKabloGerilimDusumuInput): CalcResult<DcKabloGerilimDusumuOutput> {
  const dv = (2 * RHO * input.tekYonUzunluk_m * input.akim_A) / input.kesit_mm2;
  const yuzde = (dv / input.sistemGerilimi_V) * 100;
  const aMin = (2 * RHO * input.tekYonUzunluk_m * input.akim_A) / ((input.izinVerilenYuzde / 100) * input.sistemGerilimi_V);
  const uygun = yuzde <= input.izinVerilenYuzde;
  return {
    value: { gerilimDusumu_V: dv },
    intermediates: {
      gerilim_dusumu_yuzde: yuzde,
      hat_kaybi_W: dv * input.akim_A,
      gereken_min_kesit_mm2: aMin,
    },
    standardsUsed: ["IEC 62548 (tasarım kılavuzu)"],
    verdict: {
      status: uygun ? "uygun" : "uygunsuz",
      note: uygun
        ? `ΔV = %${yuzde.toFixed(2)} ≤ izin verilen %${input.izinVerilenYuzde}.`
        : `ΔV = %${yuzde.toFixed(2)} > izin verilen %${input.izinVerilenYuzde}; kesit en az ${aMin.toFixed(1)} mm² olmalı.`,
    },
  };
}

export const dcKabloGerilimDusumu: CalcModule<DcKabloGerilimDusumuInput, DcKabloGerilimDusumuOutput> = {
  id: "dc-kablo-gerilim-dusumu",
  title: "DC Kablo Gerilim Düşümü (GES / Akü Hattı)",
  discipline: "elektrik",
  standards: ["IEC 62548"],
  inputSchema: dcKabloGerilimDusumuInputSchema,
  compute,
};
