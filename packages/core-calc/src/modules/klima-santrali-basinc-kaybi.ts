import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Seri bağlı bileşenlerin basınç kaybı toplanır: Ptoplam = ΣPi + güvenlik marjı.
// Fan seçimi için gerekli toplam statik basıncı verir.
export const klimaSantraliBasincKaybiInputSchema = z.object({
  filtreKaybi_Pa: z.number().nonnegative(),
  isiticiSogutucuKaybi_Pa: z.number().nonnegative(),
  kanalKaybi_Pa: z.number().nonnegative(),
  difuzorKaybi_Pa: z.number().nonnegative(),
  guvenlikMarji_Pa: z.number().nonnegative(),
});

export type KlimaSantraliBasincKaybiInput = z.infer<
  typeof klimaSantraliBasincKaybiInputSchema
>;

export interface KlimaSantraliBasincKaybiOutput {
  toplamBasincKaybi_Pa: number;
}

function compute(
  input: KlimaSantraliBasincKaybiInput,
): CalcResult<KlimaSantraliBasincKaybiOutput> {
  const toplamBasincKaybiPa =
    input.filtreKaybi_Pa +
    input.isiticiSogutucuKaybi_Pa +
    input.kanalKaybi_Pa +
    input.difuzorKaybi_Pa +
    input.guvenlikMarji_Pa;

  return {
    value: { toplamBasincKaybi_Pa: toplamBasincKaybiPa },
    intermediates: {
      guvenlikMarji_Pa: input.guvenlikMarji_Pa,
    },
    standardsUsed: [],
  };
}

export const klimaSantraliBasincKaybi: CalcModule<
  KlimaSantraliBasincKaybiInput,
  KlimaSantraliBasincKaybiOutput
> = {
  id: "klima-santrali-basinc-kaybi",
  title: "Klima Santrali Toplam Basınç Kaybı",
  discipline: "mekanik",
  standards: [],
  inputSchema: klimaSantraliBasincKaybiInputSchema,
  compute,
};
