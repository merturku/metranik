import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Yıldız-üçgen (Y-Δ) yol verme: yıldızda sargı gerilimi 1/√3'e düşer → hat akımı ve moment DOL değerinin 1/3'ü:
// I_Y = I_DOL/3,  T_Y = T_DOL/3  (T ∝ U²). Yıldız konumunda motor yük momentini yenebilmeli (T_Y > T_yük); aksi halde
// hızlanamaz ve üçgene geçişte ikinci bir akım darbesi olur. Geçiş anı akım tepesi DOL değerine yaklaşabilir (açık geçiş).
// Kalkış akımı/momenti motor etiketinden/katalogtan alınır (girdi).
export const yildizUcgenYolVermeInputSchema = z.object({
  dolKalkisAkimi_A: z.number().positive(),
  dolKalkisMomenti_Nm: z.number().positive(),
  yukKalkisMomenti_Nm: z.number().min(0),
});

export type YildizUcgenYolVermeInput = z.infer<typeof yildizUcgenYolVermeInputSchema>;

export interface YildizUcgenYolVermeOutput {
  yildizKalkisAkimi_A: number;
}

function compute(input: YildizUcgenYolVermeInput): CalcResult<YildizUcgenYolVermeOutput> {
  const iy = input.dolKalkisAkimi_A / 3;
  const ty = input.dolKalkisMomenti_Nm / 3;
  const oran = input.yukKalkisMomenti_Nm > 0 ? ty / input.yukKalkisMomenti_Nm : Infinity;
  const durum = oran >= 1.1 ? "uygun" : oran >= 1 ? "sinirda" : "uygunsuz";
  return {
    value: { yildizKalkisAkimi_A: iy },
    intermediates: {
      yildiz_kalkis_momenti_Nm: ty,
      akim_azalmasi_yuzde: (1 - 1 / 3) * 100,
      moment_marji_Ty_Tyuk: Number.isFinite(oran) ? oran : "yüksüz kalkış",
    },
    standardsUsed: ["IEC 60034-12 (kalkış karakteristikleri); Y-Δ oranları sargı gerilimi ilişkisinden"],
    verdict: {
      status: durum,
      note:
        durum === "uygun"
          ? "Yıldız momenti yük momentini %10'dan fazla marjla aşıyor."
          : durum === "sinirda"
            ? "Yıldız momenti yük momentine çok yakın; hızlanma yavaş olur."
            : "Yıldız momenti yük momentinden küçük: motor yıldızda hızlanamaz; yumuşak yolverici veya DOL düşünün.",
    },
  };
}

export const yildizUcgenYolVerme: CalcModule<YildizUcgenYolVermeInput, YildizUcgenYolVermeOutput> = {
  id: "yildiz-ucgen-yol-verme",
  title: "Yıldız-Üçgen Yol Verme (Akım ve Moment)",
  discipline: "elektrik",
  standards: ["IEC 60034-12"],
  inputSchema: yildizUcgenYolVermeInputSchema,
  compute,
};
