import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kazan dairesi havalandırması = yanma havası + yayılan ısıyı atan soğutma havası.
// Yanma: V̇gaz = P/Hu, V̇yanma = V̇gaz·(2/0,21)·λ  (CH4: 2 O₂, havada %21 O₂ → 9,524 Nm³/Nm³).
// Soğutma: V̇ = Qyayılan/(ρ·cp·ΔT), Qyayılan = P·(kayıp oranı). Toplam muhafazakâr olarak toplanır.
export const kazanDairesiHavalandirmaDebisiInputSchema = z.object({
  yakitGirisGucu_kW: z.number().positive(),
  altIsilDeger_kWh_m3: z.number().positive(),
  fazlaHavaKatsayisi: z.number().min(1),
  yayilanIsiOrani_yuzde: z.number().min(0).max(10),
  izinVerilenSicaklikArtisi_K: z.number().positive(),
});
export type KazanDairesiHavalandirmaDebisiInput = z.infer<typeof kazanDairesiHavalandirmaDebisiInputSchema>;
export interface KazanDairesiHavalandirmaDebisiOutput {
  toplamHavaDebisi_m3h: number;
}

const STD = "Yanma stokiyometrisi (CH4) + enerji dengesi; TS 2164 / EN 12828 ve yerel kazan dairesi yönetmeliği ile teyit edin";
const HAVA_ORANI = 2 / 0.21;
const RHO_CP_KJ_M3K = 1.2 * 1.005;

function compute(input: KazanDairesiHavalandirmaDebisiInput): CalcResult<KazanDairesiHavalandirmaDebisiOutput> {
  const gaz = input.yakitGirisGucu_kW / input.altIsilDeger_kWh_m3;
  const yanma = gaz * HAVA_ORANI * input.fazlaHavaKatsayisi;
  const Q = (input.yakitGirisGucu_kW * input.yayilanIsiOrani_yuzde) / 100;
  const sogutma = ((Q / (RHO_CP_KJ_M3K * input.izinVerilenSicaklikArtisi_K)) * 3600);
  return {
    value: { toplamHavaDebisi_m3h: yanma + sogutma },
    intermediates: {
      gaz_debisi_m3h: gaz,
      yanma_havasi_m3h: yanma,
      yayilan_isi_kW: Q,
      sogutma_havasi_m3h: sogutma,
      yanma_havasi_orani: yanma / (yanma + sogutma),
    },
    standardsUsed: [STD],
  };
}

export const kazanDairesiHavalandirmaDebisi: CalcModule<KazanDairesiHavalandirmaDebisiInput, KazanDairesiHavalandirmaDebisiOutput> = {
  id: "kazan-dairesi-havalandirma-debisi",
  title: "Kazan Dairesi Havalandırma Debisi (Yanma + Soğutma Havası)",
  discipline: "mekanik",
  standards: [STD],
  inputSchema: kazanDairesiHavalandirmaDebisiInputSchema,
  compute,
};
