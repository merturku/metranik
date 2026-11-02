import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Gravite borusu dolu kesit kapasitesi (Manning): Q = (1/n)·A·R^(2/3)·S^(1/2),  dolu boruda A = πD²/4, R = D/4.
// n pürüzlülük (PVC/PE ≈ 0,010–0,011; beton ≈ 0,013; pik döküm ≈ 0,012). Tam doluluk tasarım üst sınırıdır;
// kısmi dolulukta tasarım debisi genelde Q_dolu'nun %70–80'i hedeflenir. Hız v = Q/A.
export const graviteBoruKapasitesiManningInputSchema = z.object({
  icCap_mm: z.number().positive(),
  egim_yuzde: z.number().positive().max(30),
  puruzluluk_n: z.number().min(0.008).max(0.04),
  tasarimDebisi_Ls: z.number().min(0),
});

export type GraviteBoruKapasitesiManningInput = z.infer<typeof graviteBoruKapasitesiManningInputSchema>;

export interface GraviteBoruKapasitesiManningOutput {
  doluKapasite_Ls: number;
}

function compute(input: GraviteBoruKapasitesiManningInput): CalcResult<GraviteBoruKapasitesiManningOutput> {
  const D = input.icCap_mm / 1000;
  const A = (Math.PI * D * D) / 4;
  const R = D / 4;
  const S = input.egim_yuzde / 100;
  const q = (1 / input.puruzluluk_n) * A * R ** (2 / 3) * Math.sqrt(S);
  const v = q / A;
  const oran = input.tasarimDebisi_Ls / (q * 1000);
  const status = oran <= 0.75 ? "uygun" : oran <= 1 ? "sinirda" : "uygunsuz";
  return {
    value: { doluKapasite_Ls: q * 1000 },
    intermediates: {
      dolu_hiz_ms: v,
      hidrolik_yaricap_m: R,
      doluluk_orani_Q_Qdolu: oran,
      kesit_alani_m2: A,
    },
    standardsUsed: ["Manning denklemi (EN 752 / EN 12056-2 tasarım pratiği)"],
    verdict: {
      status,
      note:
        status === "uygun"
          ? "Tasarım debisi dolu kapasitenin %75'i veya altında."
          : status === "sinirda"
            ? "Tasarım debisi dolu kapasitenin %75–100'ü: boru kısmi dolulukta rahat çalışmaz."
            : "Tasarım debisi dolu kapasiteyi aşıyor: çapı veya eğimi artırın.",
    },
  };
}

export const graviteBoruKapasitesiManning: CalcModule<GraviteBoruKapasitesiManningInput, GraviteBoruKapasitesiManningOutput> = {
  id: "gravite-boru-kapasitesi-manning",
  title: "Gravite Atık Su Borusu Kapasitesi (Manning)",
  discipline: "mekanik",
  standards: ["EN 752"],
  inputSchema: graviteBoruKapasitesiManningInputSchema,
  compute,
};
