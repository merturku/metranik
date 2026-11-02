import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Beton sipariş miktarı ve mikser sefer sayısı:
// V_sipariş = V_net·(1 + fire/100);  n = ⌈V_sipariş / V_mikser⌉;  döküm süresi = V_sipariş / pompa debisi.
// Fire/zayiat (kalıp sapması, pompa hattı kaybı, yüzey düzensizliği) deneyime göre %3–5 alınır.
export const betonHacmiMikserSayisiInputSchema = z.object({
  netHacim_m3: z.number().positive(),
  fireYuzde: z.number().min(0).max(20),
  mikserKapasitesi_m3: z.number().positive(),
  pompaDebisi_m3h: z.number().positive(),
});

export type BetonHacmiMikserSayisiInput = z.infer<typeof betonHacmiMikserSayisiInputSchema>;

export interface BetonHacmiMikserSayisiOutput {
  siparisHacmi_m3: number;
  mikserSayisi: number;
}

function compute(input: BetonHacmiMikserSayisiInput): CalcResult<BetonHacmiMikserSayisiOutput> {
  const siparis = input.netHacim_m3 * (1 + input.fireYuzde / 100);
  const n = Math.ceil(siparis / input.mikserKapasitesi_m3 - 1e-9);
  return {
    value: { siparisHacmi_m3: siparis, mikserSayisi: n },
    intermediates: {
      mikser_sayisi: n,
      son_mikser_dolulugu_m3: siparis - (n - 1) * input.mikserKapasitesi_m3,
      dokum_suresi_saat: siparis / input.pompaDebisi_m3h,
      beton_agirligi_ton: siparis * 2.4,
    },
    standardsUsed: ["TS EN 206 (hazır beton teslim pratiği)"],
  };
}

export const betonHacmiMikserSayisi: CalcModule<BetonHacmiMikserSayisiInput, BetonHacmiMikserSayisiOutput> = {
  id: "beton-hacmi-mikser-sayisi",
  title: "Beton Sipariş Hacmi ve Mikser Sayısı",
  discipline: "insaat",
  standards: ["TS EN 206"],
  inputSchema: betonHacmiMikserSayisiInputSchema,
  compute,
};
