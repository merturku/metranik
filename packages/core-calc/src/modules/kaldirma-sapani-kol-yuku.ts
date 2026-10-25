import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Çok kollu kaldırma sapanında kol kuvveti ve sapan takımı çalışma yükü sınırı (WLL).
// Statik denge: her kol T = W/(n·cos β), β kolun düşeyle yaptığı açı.
// TS EN 13414-1 (çelik tel halat sapan; zincir sapanda EN 818-4 aynı katsayılar)
// "tek tip yükleme" yöntemiyle takım WLL'i tek kol WLL'inin katsayıyla çarpımıdır:
//   2 kollu: β ≤ 45° → 1,4;  45° < β ≤ 60° → 1,0
//   3 ve 4 kollu: β ≤ 45° → 2,1;  45° < β ≤ 60° → 1,5   (β > 60° kullanılmaz)
// Katsayılar n·cos(aralığın üst açısı) değerleridir; 4 kollu sapanda yükün yalnız
// 3 kola dağıldığı varsayılır (rijit yükte kollar eşit yüklenmez). Tek kol düşeydir.
const KATSAYI: Record<"2" | "3" | "4", [number, number]> = { "2": [1.4, 1.0], "3": [2.1, 1.5], "4": [2.1, 1.5] };
const TASIYAN_KOL: Record<"1" | "2" | "3" | "4", number> = { "1": 1, "2": 2, "3": 3, "4": 3 };
const G = 9.80665;

export const kaldirmaSapaniKolYukuInputSchema = z.object({
  yukAgirligi_t: z.number().positive(),
  kolSayisi: z.enum(["1", "2", "3", "4"]),
  kolAcisi_derece: z.number().min(0).lt(90),
  tekKolCalismaYuku_WLL_t: z.number().positive(),
});

export type KaldirmaSapaniKolYukuInput = z.infer<typeof kaldirmaSapaniKolYukuInputSchema>;

export interface KaldirmaSapaniKolYukuOutput {
  kolKuvveti_t: number;
}

function compute(input: KaldirmaSapaniKolYukuInput): CalcResult<KaldirmaSapaniKolYukuOutput> {
  const W = input.yukAgirligi_t;
  const tek = input.kolSayisi === "1";
  const beta = tek ? 0 : input.kolAcisi_derece;
  const n = TASIYAN_KOL[input.kolSayisi];
  const kolKuvveti = W / (n * Math.cos((beta * Math.PI) / 180));
  const kol = input.kolSayisi;
  const katsayi = kol === "1" ? 1 : beta <= 45 ? KATSAYI[kol][0] : beta <= 60 ? KATSAYI[kol][1] : 0;
  const takimWll = katsayi * input.tekKolCalismaYuku_WLL_t;

  const verdict: CalcResult<KaldirmaSapaniKolYukuOutput>["verdict"] =
    beta > 60
      ? {
          status: "uygunsuz",
          note: `Kol açısı ${beta}° > 60°: kol kuvveti hızla artar, EN 13414-1 bu açıda kullanıma izin vermez. Daha uzun kol veya traversa kullanın.`,
        }
      : W <= takimWll
        ? {
            status: "uygun",
            note: `Yük ${W} t ≤ sapan takımı WLL = ${katsayi} × ${input.tekKolCalismaYuku_WLL_t} = ${takimWll.toFixed(2)} t; kol kuvveti ${kolKuvveti.toFixed(2)} t.`,
          }
        : {
            status: "uygunsuz",
            note: `Yük ${W} t > sapan takımı WLL = ${takimWll.toFixed(2)} t: daha yüksek kapasiteli sapan seçin veya kol açısını küçültün.`,
          };

  return {
    value: { kolKuvveti_t: kolKuvveti },
    intermediates: {
      kol_kuvveti_kN: kolKuvveti * G,
      yuku_tasiyan_kol_sayisi: n,
      aci_katsayisi_1_cosB: 1 / Math.cos((beta * Math.PI) / 180),
      takim_katsayisi_M: katsayi,
      sapan_takimi_WLL_t: takimWll,
    },
    standardsUsed: ["TS EN 13414-1"],
    verdict,
  };
}

export const kaldirmaSapaniKolYuku: CalcModule<KaldirmaSapaniKolYukuInput, KaldirmaSapaniKolYukuOutput> = {
  id: "kaldirma-sapani-kol-yuku",
  title: "Kaldırma Sapanı Kol Yükü ve WLL Kontrolü",
  discipline: "mekanik",
  standards: ["TS EN 13414-1"],
  inputSchema: kaldirmaSapaniKolYukuInputSchema,
  compute,
};
