import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Sabine yankılanma süresi: T60 = 0,161·V/A,  A = Σ(Si·αi)  [m² sabin], V (m³). αi yüzeyin ses yutum katsayısı
// (0–1; çıplak beton ≈ 0,02–0,05, halı ≈ 0,3, akustik tavan ≈ 0,6–0,9 — 500 Hz için malzeme verisinden alınır).
// Yaklaşık yaygın ses alanı varsayar (ortalama α < 0,2 iyi sonuç verir); hava yutumu ve nesneler ihmal edilir.
// Hedef T60 kullanım amacına göre kullanıcı girdisidir (konut/ofis genellikle 0,4–0,8 s).
export const odaYankilanmaSuresiSabineInputSchema = z.object({
  hacim_m3: z.number().positive(),
  yuzey1_m2: z.number().min(0),
  yuzey1_alfa: z.number().min(0).max(1),
  yuzey2_m2: z.number().min(0),
  yuzey2_alfa: z.number().min(0).max(1),
  yuzey3_m2: z.number().min(0),
  yuzey3_alfa: z.number().min(0).max(1),
  hedefT60_s: z.number().positive(),
});

export type OdaYankilanmaSuresiSabineInput = z.infer<typeof odaYankilanmaSuresiSabineInputSchema>;

export interface OdaYankilanmaSuresiSabineOutput {
  t60_s: number | null;
}

function compute(input: OdaYankilanmaSuresiSabineInput): CalcResult<OdaYankilanmaSuresiSabineOutput> {
  const a =
    input.yuzey1_m2 * input.yuzey1_alfa + input.yuzey2_m2 * input.yuzey2_alfa + input.yuzey3_m2 * input.yuzey3_alfa;
  const s = input.yuzey1_m2 + input.yuzey2_m2 + input.yuzey3_m2;
  if (a <= 0) {
    return {
      value: { t60_s: null },
      intermediates: { not: "Toplam ses yutumu sıfır; en az bir yüzeyde α > 0 olmalı" },
      standardsUsed: ["Sabine formülü (TS EN ISO 3382-2 ölçüm yöntemi için)"],
      verdict: { status: "uygunsuz", note: "Yutum alanı tanımsız." },
    };
  }
  const t = (0.161 * input.hacim_m3) / a;
  const h = input.hedefT60_s;
  const durum = t <= h ? "uygun" : t <= 1.2 * h ? "sinirda" : "uygunsuz";
  const gerekliA = (0.161 * input.hacim_m3) / h;
  return {
    value: { t60_s: t },
    intermediates: {
      toplam_yutum_alani_A_m2: a,
      toplam_yuzey_alani_m2: s,
      ortalama_alfa: s > 0 ? a / s : 0,
      hedef_icin_gerekli_A_m2: gerekliA,
      eklenmesi_gereken_yutum_m2: Math.max(0, gerekliA - a),
    },
    standardsUsed: ["Sabine formülü (TS EN ISO 3382-2 ölçüm yöntemi için)"],
    verdict: {
      status: durum,
      note: durum === "uygun" ? "T60 hedef içinde." : `Hedef için yaklaşık ${Math.max(0, gerekliA - a).toFixed(1)} m² ek yutum alanı gerekir.`,
    },
  };
}

export const odaYankilanmaSuresiSabine: CalcModule<OdaYankilanmaSuresiSabineInput, OdaYankilanmaSuresiSabineOutput> = {
  id: "oda-yankilanma-suresi-sabine",
  title: "Oda Yankılanma Süresi (Sabine)",
  discipline: "ev",
  standards: [],
  inputSchema: odaYankilanmaSuresiSabineInputSchema,
  compute,
};
