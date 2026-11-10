import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Pencere üstü saçak/güneşlik derinliği: profil açısı αp (güneş ışınının pencere düzlemine dik düşey kesitteki yüksekliği) için
// pencerenin tamamını gölgelemek için D = (a + Hp)/tan(αp); a = saçak ile pencere üst kenarı arası, Hp = pencere yüksekliği.
// Mevcut derinlikte gölgelenen oran = clamp((D·tan(αp) − a)/Hp, 0, 1). Profil açısı güneş yüksekliği ve duvar-güneş azimut farkından bulunur (güney cephe, öğle: αp = güneş yüksekliği).
export const evPencereSacakDerinligiInputSchema = z.object({
  saca_pencere_mesafesi_m: z.number().min(0),
  pencereYuksekligi_m: z.number().positive(),
  profilAcisi_derece: z.number().gt(0).lt(90),
  mevcutDerinlik_m: z.number().min(0),
});

export type EvPencereSacakDerinligiInput = z.infer<typeof evPencereSacakDerinligiInputSchema>;

export interface EvPencereSacakDerinligiOutput {
  gerekliDerinlik_m: number;
}

function compute(input: EvPencereSacakDerinligiInput): CalcResult<EvPencereSacakDerinligiOutput> {
  const t = Math.tan((input.profilAcisi_derece * Math.PI) / 180);
  const a = input.saca_pencere_mesafesi_m;
  const hp = input.pencereYuksekligi_m;
  const d = (a + hp) / t;
  const oran = Math.min(1, Math.max(0, (input.mevcutDerinlik_m * t - a) / hp));
  return {
    value: { gerekliDerinlik_m: d },
    intermediates: {
      golge_boyu_pencere_ustunde_m: input.mevcutDerinlik_m * t - a,
      mevcut_golgelenen_oran: oran,
      mevcut_golgelenen_yuzde: oran * 100,
    },
    standardsUsed: [],
  };
}

export const evPencereSacakDerinligi: CalcModule<EvPencereSacakDerinligiInput, EvPencereSacakDerinligiOutput> = {
  id: "ev-pencere-sacak-derinligi",
  title: "Pencere Güneşlik / Saçak Derinliği",
  discipline: "ev",
  standards: [],
  inputSchema: evPencereSacakDerinligiInputSchema,
  compute,
};
