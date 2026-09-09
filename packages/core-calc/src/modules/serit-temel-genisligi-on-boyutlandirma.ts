import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Şerit temel için ön boyutlandırma: birim uzunluk başına gelen yük, zeminin
// emniyetli taşıma gerilmesine bölünerek gerekli temel genişliği bulunur.
// B = N/qemniyet. Temel Taşıma Kapasitesi (Meyerhof) ve Zemin Taşıma Gücü
// Kontrolü modülleri verilen bir B için kapasiteyi kontrol eder; bu modül
// tam tersi yönde çalışır — istenen yük için gereken B'yi üretir.
export const seritTemelGenisligiOnBoyutlandirmaInputSchema = z.object({
  birimUzunlukYuku_N_kNm: z.number().positive(),
  zeminEmniyetGerilmesi_qEmniyet_kNm2: z.number().positive(),
});

export type SeritTemelGenisligiOnBoyutlandirmaInput = z.infer<
  typeof seritTemelGenisligiOnBoyutlandirmaInputSchema
>;

export interface SeritTemelGenisligiOnBoyutlandirmaOutput {
  gerekliGenislik_B_m: number;
}

function compute(
  input: SeritTemelGenisligiOnBoyutlandirmaInput,
): CalcResult<SeritTemelGenisligiOnBoyutlandirmaOutput> {
  const gerekliGenislikBM =
    input.birimUzunlukYuku_N_kNm / input.zeminEmniyetGerilmesi_qEmniyet_kNm2;

  return {
    value: { gerekliGenislik_B_m: gerekliGenislikBM },
    intermediates: {
      zeminEmniyetGerilmesi_kNm2: input.zeminEmniyetGerilmesi_qEmniyet_kNm2,
    },
    standardsUsed: [],
  };
}

export const seritTemelGenisligiOnBoyutlandirma: CalcModule<
  SeritTemelGenisligiOnBoyutlandirmaInput,
  SeritTemelGenisligiOnBoyutlandirmaOutput
> = {
  id: "serit-temel-genisligi-on-boyutlandirma",
  title: "Şerit Temel Genişliği Ön Boyutlandırma",
  discipline: "insaat",
  standards: [],
  inputSchema: seritTemelGenisligiOnBoyutlandirmaInputSchema,
  compute,
};
