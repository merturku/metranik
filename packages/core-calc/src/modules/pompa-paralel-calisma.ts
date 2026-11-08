import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Aynı n adet pompanın paralel çalışması: her pompa H = A + B·q + C·q² (q = pompa başına debi, m³/h).
// Paralelde aynı H'de debiler toplanır (Q = n·q). Sistem eğrisi H = Hst + k·Q² = Hst + k·n²·q².
// Kesişim: (C − k·n²)·q² + B·q + (A − Hst) = 0 → pozitif kök q. Pompa eğrisi katsayıları üretici
// eğrisinden girdidir (bkz. Pompa İşletme Noktası modülü ile 3 noktadan geçirilebilir).
export const pompaParalelCalismaInputSchema = z.object({
  pompaA_m: z.number().positive(),
  pompaB: z.number(),
  pompaC: z.number(),
  statikYuk_m: z.number().min(0),
  sistemK: z.number().min(0),
  pompaSayisi: z.number().int().min(1).max(8),
});

export type PompaParalelCalismaInput = z.infer<typeof pompaParalelCalismaInputSchema>;

export interface PompaParalelCalismaOutput {
  toplamDebi_m3h: number | null;
}

function kok(a: number, b: number, c: number): number | null {
  if (Math.abs(a) < 1e-12) {
    if (b >= 0) return null;
    const q = -c / b;
    return q > 0 ? q : null;
  }
  const d = b * b - 4 * a * c;
  if (d < 0) return null;
  const s = Math.sqrt(d);
  const adaylar = [(-b - s) / (2 * a), (-b + s) / (2 * a)].filter((q) => q > 0);
  return adaylar.length ? Math.min(...adaylar) : null;
}

function compute(input: PompaParalelCalismaInput): CalcResult<PompaParalelCalismaOutput> {
  const { pompaA_m: A, pompaB: B, pompaC: C, statikYuk_m: Hst, sistemK: k, pompaSayisi: n } = input;
  const standards = ["Pompa–sistem eğrisi kesişimi (ISO 9906 eğri verisi)"];
  const q = A > Hst ? kok(C - k * n * n, B, A - Hst) : null;
  if (q === null) {
    return {
      value: { toplamDebi_m3h: null },
      intermediates: { not: "Kesişim yok: kapalı vana yüksekliği statik yükten küçük veya eğri sistem eğrisini kesmiyor" },
      standardsUsed: standards,
      verdict: { status: "uygunsuz", note: "Pompa sistemi bu eğri verisiyle çalıştıramıyor." },
    };
  }
  const q1 = kok(C - k, B, A - Hst);
  const Q = n * q;
  const H = Hst + k * Q * Q;
  const intermediates: Record<string, number | string> = {
    pompa_basina_debi_m3h: q,
    calisma_basma_yuksekligi_m: H,
    tek_pompa_debisi_m3h: q1 ?? "—",
  };
  if (q1 !== null) {
    intermediates.debi_artis_orani = Q / q1;
    intermediates.n_kati_debinin_yuzdesi = (Q / (n * q1)) * 100;
  }
  return { value: { toplamDebi_m3h: Q }, intermediates, standardsUsed: standards };
}

export const pompaParalelCalisma: CalcModule<PompaParalelCalismaInput, PompaParalelCalismaOutput> = {
  id: "pompa-paralel-calisma",
  title: "Pompaların Paralel Çalışma Debisi",
  discipline: "mekanik",
  standards: ["ISO 9906"],
  inputSchema: pompaParalelCalismaInputSchema,
  compute,
};
