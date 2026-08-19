import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kazan baca gazı kaybı — Siegert formülü (dolaylı verim yönteminin en büyük
// bileşeni): qA = (Tgaz - Tortam) × (A2/CO2% + B). A2, B yakıt tipine özgü
// Siegert katsayılarıdır (doğalgaz için tipik A2≈0.66, B≈0.009). Basitleştirme:
// yalnız baca gazı kaybı dikkate alınır; kabuk kaybı gibi diğer kayıplar
// ihmal edilir, gerçek kazan verimi bu basit tahminden biraz daha düşük çıkar.
export const kazanBacaGaziKaybiInputSchema = z.object({
  bacaGaziSicakligi_Tgaz_C: z.number(),
  ortamSicakligi_Tortam_C: z.number(),
  co2Orani_yuzde: z.number().positive().max(21),
  siegertKatsayisi_A2: z.number().positive(),
  siegertKatsayisi_B: z.number().nonnegative(),
});

export type KazanBacaGaziKaybiInput = z.infer<typeof kazanBacaGaziKaybiInputSchema>;

export interface KazanBacaGaziKaybiOutput {
  yanmaVerimi_yuzde: number;
}

function compute(input: KazanBacaGaziKaybiInput): CalcResult<KazanBacaGaziKaybiOutput> {
  const sicaklikFarkiC = input.bacaGaziSicakligi_Tgaz_C - input.ortamSicakligi_Tortam_C;
  const bacaGaziKaybiYuzde =
    sicaklikFarkiC * (input.siegertKatsayisi_A2 / input.co2Orani_yuzde + input.siegertKatsayisi_B);
  const yanmaVerimiYuzde = 100 - bacaGaziKaybiYuzde;

  return {
    value: { yanmaVerimi_yuzde: yanmaVerimiYuzde },
    intermediates: {
      sicaklikFarki_C: sicaklikFarkiC,
      bacaGaziKaybi_yuzde: bacaGaziKaybiYuzde,
    },
    standardsUsed: ["Siegert"],
  };
}

export const kazanBacaGaziKaybi: CalcModule<
  KazanBacaGaziKaybiInput,
  KazanBacaGaziKaybiOutput
> = {
  id: "kazan-baca-gazi-kaybi",
  title: "Kazan Baca Gazı Kaybı (Siegert)",
  discipline: "mekanik",
  standards: ["Siegert"],
  inputSchema: kazanBacaGaziKaybiInputSchema,
  compute,
};
