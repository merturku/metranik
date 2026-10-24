import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Enerji dengesi Csıcak×ΔTsıcak = Csoğuk×ΔTsoğuk olduğundan ısıl kapasite debisi
// (C = ṁ×cp) küçük olan akışkan daha büyük sıcaklık değişimine uğrar. Yalnız
// sıcaklıklar biliniyorken etkinlik: ε = max(ΔTsıcak, ΔTsoğuk) / (Tsıcak,g - Tsoğuk,g).
export const isiEsjanjoreEffektivitesiSchema = z.object({
  sicaklik_giris_sicak_C: z.number(),
  sicaklik_giris_soğuk_C: z.number(),
  sicaklik_cikis_sicak_C: z.number(),
  sicaklik_cikis_soğuk_C: z.number(),
  min_effektivite: z.number().positive().max(1),
});

export type IsiEsjanjoreEffektivitesiInput = z.infer<typeof isiEsjanjoreEffektivitesiSchema>;

export interface IsiEsjanjoreEffektivitesiOutput {
  effektivite: number;
  isi_farki_teorik_C: number;
  isi_farki_fiili_C: number;
}

function compute(
  input: IsiEsjanjoreEffektivitesiInput,
): CalcResult<IsiEsjanjoreEffektivitesiOutput> {
  const teorikFarkC = input.sicaklik_giris_sicak_C - input.sicaklik_giris_soğuk_C;
  const sicakTarafFarkC = input.sicaklik_giris_sicak_C - input.sicaklik_cikis_sicak_C;
  const sogukTarafFarkC = input.sicaklik_cikis_soğuk_C - input.sicaklik_giris_soğuk_C;
  const fiiliFarkC = Math.max(sicakTarafFarkC, sogukTarafFarkC);
  const effektivite = fiiliFarkC / teorikFarkC;
  const yuzde = (x: number) => `%${(x * 100).toFixed(1)}`;

  return {
    value: {
      effektivite,
      isi_farki_teorik_C: teorikFarkC,
      isi_farki_fiili_C: fiiliFarkC,
    },
    intermediates: {
      sicakTarafFarki_C: sicakTarafFarkC,
      sogukTarafFarki_C: sogukTarafFarkC,
      minEffektivite: input.min_effektivite,
    },
    standardsUsed: [],
    verdict:
      effektivite >= input.min_effektivite
        ? {
            status: "uygun",
            note: `Etkinlik ${yuzde(effektivite)} ≥ ${yuzde(input.min_effektivite)}.`,
          }
        : {
            status: "uygunsuz",
            note: `Etkinlik ${yuzde(effektivite)} < ${yuzde(input.min_effektivite)}: eşanjör yüzeyi yetersiz ya da kirlenmiş olabilir.`,
          },
  };
}

export const isiEsjanjoreEffektivitesi: CalcModule<
  IsiEsjanjoreEffektivitesiInput,
  IsiEsjanjoreEffektivitesiOutput
> = {
  id: "isi-esjanjoru-effektivitesi",
  title: "Isı Eşanjörü Effektivitesi (ε-NTU)",
  discipline: "mekanik",
  standards: [],
  inputSchema: isiEsjanjoreEffektivitesiSchema,
  compute,
};
