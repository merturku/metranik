import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Derece-gün yöntemi: yıllık ısıtma enerji ihtiyacı E = H·DG·24/1000 [kWh],
// H = UA + Hv [W/K], Hv = ρ·cp/3600·n·V (ρ = 1,2 kg/m³, cp = 1005 J/kgK → 0,335 Wh/m³K).
// İç kazançlar ve güneş kazancı ihmal edilir (DG, denge sıcaklığına göre seçilirse kısmen kapsanır).
export const isitmaDereceGunYillikEnerjiInputSchema = z.object({
  ua_WK: z.number().positive(),
  hacim_m3: z.number().positive(),
  havaDegisimi_1h: z.number().min(0),
  dereceGun_Kgun: z.number().positive(),
  sistemVerimi: z.number().gt(0).max(1),
});

export type IsitmaDereceGunYillikEnerjiInput = z.infer<typeof isitmaDereceGunYillikEnerjiInputSchema>;

export interface IsitmaDereceGunYillikEnerjiOutput {
  yillikIhtiyac_kWh: number;
}

function compute(input: IsitmaDereceGunYillikEnerjiInput): CalcResult<IsitmaDereceGunYillikEnerjiOutput> {
  const hv = 1.2 * (1005 / 3600) * input.havaDegisimi_1h * input.hacim_m3;
  const h = input.ua_WK + hv;
  const e = (h * input.dereceGun_Kgun * 24) / 1000;
  return {
    value: { yillikIhtiyac_kWh: e },
    intermediates: {
      havalandirma_kayip_katsayisi_WK: hv,
      toplam_kayip_katsayisi_WK: h,
      yillik_ihtiyac_MWh: e / 1000,
      yakit_girisi_kWh: e / input.sistemVerimi,
      yakit_girisi_GJ: (e / input.sistemVerimi) * 0.0036,
    },
    standardsUsed: ["TS 825 (derece-gün yöntemi)"],
  };
}

export const isitmaDereceGunYillikEnerji: CalcModule<IsitmaDereceGunYillikEnerjiInput, IsitmaDereceGunYillikEnerjiOutput> = {
  id: "isitma-derece-gun-yillik-enerji",
  title: "Derece-Gün ile Yıllık Isıtma Enerjisi",
  discipline: "mekanik",
  standards: ["TS 825"],
  inputSchema: isitmaDereceGunYillikEnerjiInputSchema,
  compute,
};
