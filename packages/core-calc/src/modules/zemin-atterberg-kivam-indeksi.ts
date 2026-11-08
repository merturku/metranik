import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Atterberg limitleri: plastisite indeksi PI = LL − PL, kıvam (likidite) indeksi LI = (w − PL)/PI, kıvam indeksi CI = (LL − w)/PI = 1 − LI.
// Doğal su içeriği w limitlere göre konumlandırılır: LI < 0 katı (PL altı), 0–1 plastik, > 1 akıcı (LL üstü).
// Plastisite derecesi (Burmister): PI 0 plastik değil; 1–5 hafif; 5–10 düşük; 10–20 orta; 20–40 yüksek; > 40 çok yüksek.
// Likit limit ve plastik limit laboratuvar deneylerinden (TS 1900-1 / ASTM D4318) alınır, girdidir. Kıvam sınıfları kohezyonlu zeminler içindir.
export const zeminAtterbergKivamIndeksiInputSchema = z.object({
  likitLimit_LL: z.number().positive(),
  plastikLimit_PL: z.number().positive(),
  dogalSuIcerigi_w: z.number().positive(),
});

export type ZeminAtterbergKivamIndeksiInput = z.infer<typeof zeminAtterbergKivamIndeksiInputSchema>;

export interface ZeminAtterbergKivamIndeksiOutput {
  plastisiteIndeksi_PI: number;
}

function plastisiteDerecesi(pi: number): string {
  if (pi <= 0) return "plastik değil";
  if (pi <= 5) return "hafif plastik";
  if (pi <= 10) return "düşük plastisiteli";
  if (pi <= 20) return "orta plastisiteli";
  if (pi <= 40) return "yüksek plastisiteli";
  return "çok yüksek plastisiteli";
}

function compute(input: ZeminAtterbergKivamIndeksiInput): CalcResult<ZeminAtterbergKivamIndeksiOutput> {
  const { likitLimit_LL: ll, plastikLimit_PL: pl, dogalSuIcerigi_w: w } = input;
  if (ll <= pl) {
    return {
      value: { plastisiteIndeksi_PI: ll - pl },
      intermediates: { not: "Likit limit plastik limitten büyük olmalı; aksi halde zemin plastik değildir (NP)" },
      standardsUsed: ["TS 1900-1 / ASTM D4318 (Atterberg limitleri)"],
      verdict: { status: "sinirda", note: "LL ≤ PL: plastik olmayan (NP) zemin; kıvam indeksi tanımsız." },
    };
  }
  const pi = ll - pl;
  const li = (w - pl) / pi;
  const sinif = li < 0 ? "katı (PL altı)" : li <= 1 ? (li < 0.25 ? "yarı katı/sert plastik" : li < 0.75 ? "plastik" : "yumuşak plastik") : "akıcı (LL üstü)";
  return {
    value: { plastisiteIndeksi_PI: pi },
    intermediates: {
      likidite_indeksi_LI: li,
      kivam_indeksi_CI: 1 - li,
      plastisite_derecesi: plastisiteDerecesi(pi),
      kivam_durumu: sinif,
    },
    standardsUsed: ["TS 1900-1 / ASTM D4318 (Atterberg limitleri); Burmister plastisite sınıfları"],
    verdict:
      li > 1
        ? { status: "uygunsuz", note: "Doğal su içeriği likit limitin üstünde: zemin akıcı kıvamda, taşıma gücü çok düşük." }
        : li > 0.75
          ? { status: "sinirda", note: "Yumuşak plastik kıvam; taşıma gücü ve oturma dikkatle incelenmeli." }
          : { status: "uygun", note: "Kıvam, katı–plastik aralığında." },
  };
}

export const zeminAtterbergKivamIndeksi: CalcModule<ZeminAtterbergKivamIndeksiInput, ZeminAtterbergKivamIndeksiOutput> = {
  id: "zemin-atterberg-kivam-indeksi",
  title: "Zemin Plastisite ve Kıvam İndeksi (Atterberg)",
  discipline: "insaat",
  standards: [],
  inputSchema: zeminAtterbergKivamIndeksiInputSchema,
  compute,
};
