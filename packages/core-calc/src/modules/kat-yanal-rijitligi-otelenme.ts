import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kat yanal rijitliği (basit kesme modeli): her kolon için rijit kiriş/döşeme varsayımıyla (iki ucu ankastre) k = 12·E·I/h³,
// kolon sayısı n için K = n·k (kN/mm veya N/mm). Yatay yük H altında kat ötelenmesi Δ = H/K, göreli ötelenme oranı Δ/h.
// Doğal periyot tek serbestlik dereceli: T = 2π·√(m/K). Perde veya çerçeve etkileşimi, kiriş rijitliği ve çatlamış kesit (EIeff) ihmal edilir;
// çatlamış kesit için I'ya bir etkin rijitlik çarpanı uygulayın (TBDY'de kolonlar için yaklaşık 0,70, kirişler 0,35 — yönetmelikten teyit edin).
export const katYanalRijitligiOtelenmeInputSchema = z.object({
  elastisiteModulu_MPa: z.number().positive(),
  kolonGenisligi_mm: z.number().positive(),
  kolonYuksekligi_mm: z.number().positive(),
  katYuksekligi_mm: z.number().positive(),
  kolonSayisi: z.number().int().min(1),
  rijitlikCarpani: z.number().gt(0).max(1),
  yatayYuk_kN: z.number().min(0),
  katKutlesi_ton: z.number().positive(),
});

export type KatYanalRijitligiOtelenmeInput = z.infer<typeof katYanalRijitligiOtelenmeInputSchema>;

export interface KatYanalRijitligiOtelenmeOutput {
  katRijitligi_kNmm: number;
}

function compute(input: KatYanalRijitligiOtelenmeInput): CalcResult<KatYanalRijitligiOtelenmeOutput> {
  const ix = (input.kolonGenisligi_mm * input.kolonYuksekligi_mm ** 3) / 12; // yük doğrultusunda eğilme: derinlik h_k
  const eiEff = input.elastisiteModulu_MPa * ix * input.rijitlikCarpani; // N·mm²
  const k = (12 * eiEff) / input.katYuksekligi_mm ** 3; // N/mm
  const kat = (k * input.kolonSayisi) / 1000; // kN/mm
  const delta = input.yatayYuk_kN / kat; // mm
  const t = 2 * Math.PI * Math.sqrt((input.katKutlesi_ton * 1000) / (kat * 1e6)); // kg / (N/m)
  return {
    value: { katRijitligi_kNmm: kat },
    intermediates: {
      kolon_atalet_mm4: ix,
      tek_kolon_rijitligi_kNmm: k / 1000,
      otelenme_mm: delta,
      goreli_otelenme_orani: delta / input.katYuksekligi_mm,
      dogal_periyot_s: t,
    },
    standardsUsed: ["Klasik yapı mekaniği (kesme çerçevesi, k = 12EI/h³)"],
  };
}

export const katYanalRijitligiOtelenme: CalcModule<KatYanalRijitligiOtelenmeInput, KatYanalRijitligiOtelenmeOutput> = {
  id: "kat-yanal-rijitligi-otelenme",
  title: "Kat Yanal Rijitliği, Ötelenme ve Periyot (Kesme Modeli)",
  discipline: "insaat",
  standards: [],
  inputSchema: katYanalRijitligiOtelenmeInputSchema,
  compute,
};
