import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// İyon değişimi kapasite dengesi: gerekli reçine hacmi, giderilecek toplam
// sertlik yüküne (mekv) bölünen reçine değişim kapasitesine (mekv/L) bağlıdır.
export const suYumusatmaResinHacmiInputSchema = z.object({
  suSertligi_mekvL: z.number().positive(),
  gunlukDebi_Lgun: z.number().positive(),
  calismaSuresi_gun: z.number().positive(),
  resinKapasitesi_ekvL: z.number().positive(),
});

export type SuYumusatmaResinHacmiInput = z.infer<typeof suYumusatmaResinHacmiInputSchema>;

export interface SuYumusatmaResinHacmiOutput {
  gerekliResinHacmi_L: number;
}

function compute(input: SuYumusatmaResinHacmiInput): CalcResult<SuYumusatmaResinHacmiOutput> {
  const toplamSertlikMekv =
    input.suSertligi_mekvL * input.gunlukDebi_Lgun * input.calismaSuresi_gun;
  const gerekliResinHacmiL = toplamSertlikMekv / 1000 / input.resinKapasitesi_ekvL;

  return {
    value: { gerekliResinHacmi_L: gerekliResinHacmiL },
    intermediates: {
      toplamSertlikYuku_mekv: toplamSertlikMekv,
    },
    standardsUsed: [],
  };
}

export const suYumusatmaResinHacmi: CalcModule<
  SuYumusatmaResinHacmiInput,
  SuYumusatmaResinHacmiOutput
> = {
  id: "su-yumusatma-resin-hacmi",
  title: "Su Yumuşatma Reçine Hacmi",
  discipline: "mekanik",
  standards: [],
  inputSchema: suYumusatmaResinHacmiInputSchema,
  compute,
};
