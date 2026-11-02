import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Ses basınç seviyelerinin enerji toplamı ve serbest alanda mesafe azalması (ISO 9613-2 temel ilişkiler):
// L_toplam = 10·log10(Σ 10^(Li/10));  nokta kaynakta L2 = L1 − 20·log10(r2/r1).
// Üç kaynak girilir; kullanılmayan kaynak için 0 dB girilebilir (katkısı ihmal edilebilir düzeyde, 10^0 = 1 birim).
export const gurultuSeviyesiToplamaInputSchema = z.object({
  kaynak1_dB: z.number().min(0).max(160),
  kaynak2_dB: z.number().min(0).max(160),
  kaynak3_dB: z.number().min(0).max(160),
  olcumMesafesi_m: z.number().positive(),
  hedefMesafe_m: z.number().positive(),
  izinVerilen_dB: z.number().min(0).max(160),
});

export type GurultuSeviyesiToplamaInput = z.infer<typeof gurultuSeviyesiToplamaInputSchema>;

export interface GurultuSeviyesiToplamaOutput {
  toplamSeviye_dB: number;
}

function compute(input: GurultuSeviyesiToplamaInput): CalcResult<GurultuSeviyesiToplamaOutput> {
  const toplam =
    10 * Math.log10([input.kaynak1_dB, input.kaynak2_dB, input.kaynak3_dB].reduce((a, l) => a + 10 ** (l / 10), 0));
  const hedef = toplam - 20 * Math.log10(input.hedefMesafe_m / input.olcumMesafesi_m);
  const uygun = hedef <= input.izinVerilen_dB;
  return {
    value: { toplamSeviye_dB: toplam },
    intermediates: {
      hedef_mesafede_dB: hedef,
      mesafe_azalmasi_dB: toplam - hedef,
      izin_asimi_dB: Math.max(0, hedef - input.izinVerilen_dB),
    },
    standardsUsed: ["ISO 9613-2 (geometrik yayılım)"],
    verdict: {
      status: uygun ? "uygun" : "uygunsuz",
      note: uygun
        ? `Hedef noktada ${hedef.toFixed(1)} dB ≤ izin verilen ${input.izinVerilen_dB} dB.`
        : `Hedef noktada ${hedef.toFixed(1)} dB > izin verilen ${input.izinVerilen_dB} dB; susturucu/perde/mesafe önlemi gerekir.`,
    },
  };
}

export const gurultuSeviyesiToplama: CalcModule<GurultuSeviyesiToplamaInput, GurultuSeviyesiToplamaOutput> = {
  id: "gurultu-seviyesi-toplama",
  title: "Gürültü Seviyesi Toplama ve Mesafe Azalması",
  discipline: "ev",
  standards: ["ISO 9613-2"],
  inputSchema: gurultuSeviyesiToplamaInputSchema,
  compute,
};
