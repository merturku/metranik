import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Aynı n pompanın seri çalışması: aynı debide yükler toplanır, H = n·(A + B·q + C·q²), q = Q (debi aynı).
// Sistem eğrisi H = Hst + k·Q². Kesişim: (n·C − k)·Q² + n·B·Q + (n·A − Hst) = 0 → pozitif kök. Seri bağlantı yüksek basınç gereken ve düşük debili sistemlerde
// kullanılır (Pompaların Paralel Çalışma Debisi modülünün tamamlayıcısı); ikinci pompanın gövde basınç sınıfı ve mekanik salmastra basıncı toplam basınca dayanmalıdır.
export const pompaSeriCalismaInputSchema = z.object({
  pompaA_m: z.number().positive(),
  pompaB: z.number(),
  pompaC: z.number(),
  statikYuk_m: z.number().min(0),
  sistemK: z.number().min(0),
  pompaSayisi: z.number().int().min(1).max(6),
});

export type PompaSeriCalismaInput = z.infer<typeof pompaSeriCalismaInputSchema>;

export interface PompaSeriCalismaOutput {
  debi_m3h: number | null;
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

function compute(input: PompaSeriCalismaInput): CalcResult<PompaSeriCalismaOutput> {
  const { pompaA_m: A, pompaB: B, pompaC: C, statikYuk_m: Hst, sistemK: k, pompaSayisi: n } = input;
  const standards = ["Pompa–sistem eğrisi kesişimi (seri bağlantı, yükler toplanır)"];
  const q = n * A > Hst ? kok(n * C - k, n * B, n * A - Hst) : null;
  if (q === null) {
    return {
      value: { debi_m3h: null },
      intermediates: { not: "Kesişim yok: toplam kapalı vana yüksekliği statik yükten küçük veya eğri sistem eğrisini kesmiyor" },
      standardsUsed: standards,
      verdict: { status: "uygunsuz", note: "Pompalar bu eğri verisiyle sistemi çalıştıramıyor." },
    };
  }
  const q1 = A > Hst ? kok(C - k, B, A - Hst) : null;
  const hTop = Hst + k * q * q;
  const hPompa = A + B * q + C * q * q;
  return {
    value: { debi_m3h: q },
    intermediates: {
      toplam_basma_yuksekligi_m: hTop,
      pompa_basina_yukseklik_m: hPompa,
      tek_pompa_debisi_m3h: q1 ?? "—",
      debi_artis_orani: q1 !== null ? q / q1 : "—",
      toplam_basinc_bar: (hTop * 9.81) / 100,
    },
    standardsUsed: standards,
  };
}

export const pompaSeriCalisma: CalcModule<PompaSeriCalismaInput, PompaSeriCalismaOutput> = {
  id: "pompa-seri-calisma",
  title: "Pompaların Seri Çalışma Debisi ve Yüksekliği",
  discipline: "mekanik",
  standards: [],
  inputSchema: pompaSeriCalismaInputSchema,
  compute,
};
