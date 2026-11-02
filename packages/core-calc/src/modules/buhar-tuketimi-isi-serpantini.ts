import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Buharlı ısıtıcı/serpantin buhar tüketimi: ṁ = Q/h_fg (doymuş buhar yoğuştuğunda gizli ısı verir).
// h_fg işletme basıncına bağlıdır (buhar tablosundan girdi; ~2 bar(a) için 2202, ~8 bar(a) için 2048 kJ/kg).
// Kondens alt soğutması varsa verim katsayısıyla (kondensat duyulur ısısı) azaltılabilir (η).
export const buharTuketimiIsiSerpantiniInputSchema = z.object({
  isiYuku_kW: z.number().positive(),
  gizliIsi_kJkg: z.number().min(1500).max(2400),
  verim: z.number().gt(0).max(1),
});

export type BuharTuketimiIsiSerpantiniInput = z.infer<typeof buharTuketimiIsiSerpantiniInputSchema>;

export interface BuharTuketimiIsiSerpantiniOutput {
  buharDebisi_kgh: number;
}

function compute(input: BuharTuketimiIsiSerpantiniInput): CalcResult<BuharTuketimiIsiSerpantiniOutput> {
  const kgs = input.isiYuku_kW / (input.gizliIsi_kJkg * input.verim);
  return {
    value: { buharDebisi_kgh: kgs * 3600 },
    intermediates: {
      buhar_debisi_kgs: kgs,
      kondens_debisi_kgh: kgs * 3600,
      gunluk_buhar_ton_8h: (kgs * 3600 * 8) / 1000,
    },
    standardsUsed: ["Buhar tabloları (gizli ısı) — enerji dengesi"],
  };
}

export const buharTuketimiIsiSerpantini: CalcModule<BuharTuketimiIsiSerpantiniInput, BuharTuketimiIsiSerpantiniOutput> = {
  id: "buhar-tuketimi-isi-serpantini",
  title: "Buharlı Isıtıcı Buhar Tüketimi",
  discipline: "mekanik",
  standards: [],
  inputSchema: buharTuketimiIsiSerpantiniInputSchema,
  compute,
};
