import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Yumuşak yol verici (soft starter), gerilim rampası başlangıç adımı: I ∝ U, T ∝ U² (ideal asenkron motor).
// Ikalkis = (Ik/In)·In·u,  Tkalkis = (Tk/Tn)·u²  [Tn cinsinden].  Yük momentini %25 payla aşan en küçük u: umin = √(1,25·Tyük/Tk).
export const yumusakYolVericiAkimSiniriInputSchema = z.object({
  anmaAkimi_A: z.number().positive(),
  direktKalkisAkimOrani: z.number().min(1),
  direktKalkisMomentOrani: z.number().positive(),
  baslangicGerilimi_yuzde: z.number().min(10).max(100),
  yukMomentOrani: z.number().min(0),
});

export type YumusakYolVericiAkimSiniriInput = z.infer<typeof yumusakYolVericiAkimSiniriInputSchema>;
export interface YumusakYolVericiAkimSiniriOutput {
  kalkisAkimi_A: number;
}

const STD = "IEC 60947-4-2 (yarı iletken motor starterleri); I ∝ U, T ∝ U² asenkron motor ilişkisi";
const MARJ = 1.25;
const EPS = 1e-9;

function compute(input: YumusakYolVericiAkimSiniriInput): CalcResult<YumusakYolVericiAkimSiniriOutput> {
  const u = input.baslangicGerilimi_yuzde / 100;
  const Idol = input.direktKalkisAkimOrani * input.anmaAkimi_A;
  const I = Idol * u;
  const T = input.direktKalkisMomentOrani * u * u;
  const oran = input.yukMomentOrani > 0 ? T / input.yukMomentOrani : Infinity;
  const umin = Math.sqrt((MARJ * input.yukMomentOrani) / input.direktKalkisMomentOrani);
  const Imin = Idol * umin;

  let status: "uygun" | "sinirda" | "uygunsuz";
  let note: string;
  if (oran >= MARJ - EPS) {
    status = "uygun";
    note = `Kalkış momenti yük momentinin ${Number.isFinite(oran) ? oran.toFixed(2) : "∞"} katı (≥ 1,25 pratik eşik); akım direkt yolun %${input.baslangicGerilimi_yuzde.toFixed(0)}'ine iner`;
  } else if (oran >= 1 - EPS) {
    status = "sinirda";
    note = `Moment marjı ${oran.toFixed(2)} (< 1,25): hızlanma yavaş/ısınma artar; başlangıç gerilimini en az %${(umin * 100).toFixed(1)} yapın`;
  } else {
    status = "uygunsuz";
    note =
      umin > 1
        ? "Direkt yolda bile moment marjı 1,25'in altında; motor/yük uyumsuz"
        : `Kalkış momenti yük momentini yenemez (oran ${oran.toFixed(2)}); başlangıç gerilimi en az %${(umin * 100).toFixed(1)} olmalı`;
  }

  return {
    value: { kalkisAkimi_A: I },
    intermediates: {
      direkt_yol_akimi_A: Idol,
      akim_orani_direkt_e: u,
      kalkis_momenti_Tn: T,
      moment_marji_Tkalkis_Tyuk: Number.isFinite(oran) ? oran : "sınırsız",
      min_baslangic_gerilimi_yuzde: umin * 100,
      min_gerilimde_akim_A: Imin,
    },
    standardsUsed: [STD],
    verdict: { status, note },
  };
}

export const yumusakYolVericiAkimSiniri: CalcModule<YumusakYolVericiAkimSiniriInput, YumusakYolVericiAkimSiniriOutput> = {
  id: "yumusak-yol-verici-akim-siniri",
  title: "Yumuşak Yol Verici (Soft Starter) Kalkış Akımı ve Moment Marjı",
  discipline: "elektrik",
  standards: [STD],
  inputSchema: yumusakYolVericiAkimSiniriInputSchema,
  compute,
};
