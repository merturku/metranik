import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const fanGirisAgiKaybiSchema = z.object({
  direnç_katsayisi_zeta: z.number().positive(),
  hava_hizi_ms: z.number().positive(),
  hava_yoğunluğu_kgm3: z.number().positive(),
});

export type FanGirisAgiKaybiInput = z.infer<typeof fanGirisAgiKaybiSchema>;

export interface FanGirisAgiKaybiOutput {
  basınç_kaybı_Pa: number;
}

export const fanGirisAgiKaybi: CalcModule<FanGirisAgiKaybiInput, FanGirisAgiKaybiOutput> = {
  id: "fan-giris-agi-kaybi",
  title: "Fan Giriş Ağı Kaybı",
  discipline: "mekanik",
  standards: ["ASHRAE"],
  inputSchema: fanGirisAgiKaybiSchema,

  compute(input: FanGirisAgiKaybiInput): CalcResult<FanGirisAgiKaybiOutput> {
    // ΔP = ζ × (ρ × V² / 2)
    const basınç_kaybı_Pa = input.direnç_katsayisi_zeta * (input.hava_yoğunluğu_kgm3 * Math.pow(input.hava_hizi_ms, 2) / 2);

    return {
      value: {
        basınç_kaybı_Pa: Math.round(basınç_kaybı_Pa * 10) / 10,
      },
      intermediates: {
        dinamik_basınç_Pa: Math.round((input.hava_yoğunluğu_kgm3 * Math.pow(input.hava_hizi_ms, 2) / 2) * 10) / 10,
      },
      standardsUsed: ["ASHRAE"],
    };
  },
};
