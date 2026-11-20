import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Fan ısı kazancı: Q = P_mil + (motor hava akımındaysa P_mil·(1/ηm − 1)); ΔT = Q/(ṁ·cp)
export const fanIsiKazanciHavaSicaklikArtisiInputSchema = z.object({
  debi_m3h: z.number().positive(),
  havaYogunlugu_kgm3: z.number().positive(),
  havaOzgulIsisi_kJkgK: z.number().positive(),
  milGucu_kW: z.number().positive(),
  motorVerimi: z.number().gt(0).max(1),
  motorKonumu: z.enum(["hava_akiminda", "hava_akimi_disinda"]),
});

export type FanIsiKazanciHavaSicaklikArtisiInput = z.infer<typeof fanIsiKazanciHavaSicaklikArtisiInputSchema>;
export interface FanIsiKazanciHavaSicaklikArtisiOutput {
  sicaklikArtisi_K: number;
}

function compute(input: FanIsiKazanciHavaSicaklikArtisiInput): CalcResult<FanIsiKazanciHavaSicaklikArtisiOutput> {
  const motorKaybi = (input.milGucu_kW * (1 - input.motorVerimi)) / input.motorVerimi;
  const Q = input.milGucu_kW + (input.motorKonumu === "hava_akiminda" ? motorKaybi : 0);
  const mdot = (input.debi_m3h / 3600) * input.havaYogunlugu_kgm3;
  const dT = Q / (mdot * input.havaOzgulIsisi_kJkgK);
  return {
    value: { sicaklikArtisi_K: dT },
    intermediates: {
      motor_kaybi_kW: motorKaybi,
      havaya_giren_isi_kW: Q,
      hava_kutle_debisi_kgs: mdot,
      motor_elektrik_girisi_kW: input.milGucu_kW / input.motorVerimi,
    },
    standardsUsed: ["ASHRAE Fundamentals (fan ısı kazancı)"],
  };
}

export const fanIsiKazanciHavaSicaklikArtisi: CalcModule<FanIsiKazanciHavaSicaklikArtisiInput, FanIsiKazanciHavaSicaklikArtisiOutput> = {
  id: "fan-isi-kazanci-hava-sicaklik-artisi",
  title: "Fan Isı Kazancı ve Hava Sıcaklık Artışı",
  discipline: "mekanik",
  standards: ["ASHRAE Fundamentals (fan ısı kazancı)"],
  inputSchema: fanIsiKazanciHavaSicaklikArtisiInputSchema,
  compute,
};
