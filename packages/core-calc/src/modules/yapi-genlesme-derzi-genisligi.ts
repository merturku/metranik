import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Isıl hareket Δ = α·ΔT·L; derz genişliği w = Δ·(1+pay)/MAC; verilen derz için azami blok boyu Lmaks = w·MAC/(α·ΔT·(1+pay))
export const yapiGenlesmeDerziGenisligiInputSchema = z.object({
  blokBoyu_m: z.number().positive(),
  isilGenlesmeKatsayisi_1e6: z.number().positive(),
  tasarimSicaklikFarki_K: z.number().positive(),
  emniyetPayi: z.number().min(0),
  derzDolguHareketKapasitesi_yuzde: z.number().gt(0).max(100),
  mevcutDerzGenisligi_mm: z.number().min(0),
});

export type YapiGenlesmeDerziGenisligiInput = z.infer<typeof yapiGenlesmeDerziGenisligiInputSchema>;
export interface YapiGenlesmeDerziGenisligiOutput {
  gerekliDerzGenisligi_mm: number;
}

function compute(input: YapiGenlesmeDerziGenisligiInput): CalcResult<YapiGenlesmeDerziGenisligiOutput> {
  const alfa = input.isilGenlesmeKatsayisi_1e6 * 1e-6;
  const delta_mm = alfa * input.tasarimSicaklikFarki_K * input.blokBoyu_m * 1000;
  const tasarimHareket = delta_mm * (1 + input.emniyetPayi);
  const mac = input.derzDolguHareketKapasitesi_yuzde / 100;
  const w = tasarimHareket / mac;
  const Lmaks = input.mevcutDerzGenisligi_mm > 0 ? (input.mevcutDerzGenisligi_mm * mac) / (alfa * input.tasarimSicaklikFarki_K * (1 + input.emniyetPayi) * 1000) : 0;
  const status = input.mevcutDerzGenisligi_mm >= w ? "uygun" : "uygunsuz";
  return {
    value: { gerekliDerzGenisligi_mm: w },
    intermediates: {
      serbest_isil_hareket_mm: delta_mm,
      tasarim_hareketi_mm: tasarimHareket,
      mevcut_derz_icin_azami_blok_boyu_m: Lmaks,
    },
    standardsUsed: ["Doğrusal ısıl genleşme δ = αΔTL"],
    verdict:
      input.mevcutDerzGenisligi_mm > 0
        ? { status, note: `Mevcut derz ${input.mevcutDerzGenisligi_mm} mm, gerekli ${w.toFixed(1)} mm` }
        : undefined,
  };
}

export const yapiGenlesmeDerziGenisligi: CalcModule<YapiGenlesmeDerziGenisligiInput, YapiGenlesmeDerziGenisligiOutput> = {
  id: "yapi-genlesme-derzi-genisligi",
  title: "Yapı Genleşme Derzi Genişliği ve Azami Blok Boyu",
  discipline: "insaat",
  standards: ["Doğrusal ısıl genleşme δ = αΔTL"],
  inputSchema: yapiGenlesmeDerziGenisligiInputSchema,
  compute,
};
