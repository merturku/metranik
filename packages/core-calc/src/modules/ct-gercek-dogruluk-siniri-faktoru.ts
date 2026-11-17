import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// IEC 61869-2: ALF′ = ALF·(Sin + Sn)/(Sin + Sb), Sin = In²·Rct. Doymasız çalışma için ALF′ ≥ Ik/In.
export const ctGercekDogrulukSiniriFaktoruInputSchema = z.object({
  alf: z.number().positive(),
  sn_VA: z.number().positive(),
  sb_VA: z.number().min(0),
  in_A: z.number().positive(),
  rct_ohm: z.number().min(0),
  gerekliSinir: z.number().positive(),
});

export type CtGercekDogrulukSiniriFaktoruInput = z.infer<typeof ctGercekDogrulukSiniriFaktoruInputSchema>;

export interface CtGercekDogrulukSiniriFaktoruOutput {
  alfGercek: number;
}

function compute(input: CtGercekDogrulukSiniriFaktoruInput): CalcResult<CtGercekDogrulukSiniriFaktoruOutput> {
  const sin = input.in_A * input.in_A * input.rct_ohm;
  const alf = (input.alf * (sin + input.sn_VA)) / (sin + input.sb_VA);
  const k = alf / input.gerekliSinir;
  let status: "uygun" | "sinirda" | "uygunsuz";
  let note: string;
  if (k >= 1.2) {
    status = "uygun";
    note = "ALF′ gerekli sınır faktörünün %20 üzerinde: doyma payı var.";
  } else if (k >= 1) {
    status = "sinirda";
    note = "ALF′ gerekli değeri güçlükle karşılıyor; marj < %20.";
  } else {
    status = "uygunsuz";
    note = "ALF′ gerekli sınır faktörünün altında: CT arıza akımında doyabilir.";
  }
  return {
    value: { alfGercek: alf },
    intermediates: { sin_VA: sin, gerekli_sinir: input.gerekliSinir },
    standardsUsed: ["IEC 61869-2"],
    verdict: { status, note },
  };
}

export const ctGercekDogrulukSiniriFaktoru: CalcModule<
  CtGercekDogrulukSiniriFaktoruInput,
  CtGercekDogrulukSiniriFaktoruOutput
> = {
  id: "ct-gercek-dogruluk-siniri-faktoru",
  title: "CT Gerçek Doğruluk Sınır Faktörü (ALF′)",
  discipline: "elektrik",
  standards: ["IEC 61869-2"],
  inputSchema: ctGercekDogrulukSiniriFaktoruInputSchema,
  compute,
};
