import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Saha ölçüm kontrolü: ölçülen gerilim düşümü yüzdesi, izin verilen sınırı
// (IEC 60364-5-52: aydınlatmada tipik %3, diğer kullanımlarda %5) aşmamalı.
export const gerilimDusumuKontroluInputSchema = z.object({
  olculenGerilimDusumu_yuzde: z.number().positive(),
  izinVerilenYuzde: z.number().positive(),
});

export type GerilimDusumuKontroluInput = z.infer<typeof gerilimDusumuKontroluInputSchema>;

export interface GerilimDusumuKontroluOutput {
  marj_yuzde: number;
}

function compute(input: GerilimDusumuKontroluInput): CalcResult<GerilimDusumuKontroluOutput> {
  const marjYuzde = input.izinVerilenYuzde - input.olculenGerilimDusumu_yuzde;
  const uygun = marjYuzde >= 0;

  return {
    value: { marj_yuzde: marjYuzde },
    intermediates: {
      olculenGerilimDusumu_yuzde: input.olculenGerilimDusumu_yuzde,
      izinVerilenYuzde: input.izinVerilenYuzde,
    },
    standardsUsed: ["IEC 60364-5-52"],
    verdict: uygun
      ? { status: "uygun", note: "Ölçülen gerilim düşümü izin verilen sınırın altında." }
      : { status: "uygunsuz", note: "Ölçülen gerilim düşümü izin verilen sınırı aşıyor." },
  };
}

export const gerilimDusumuKontrolu: CalcModule<
  GerilimDusumuKontroluInput,
  GerilimDusumuKontroluOutput
> = {
  id: "gerilim-dusumu-kontrolu",
  title: "Gerilim Düşümü Kontrolü",
  discipline: "elektrik",
  standards: ["IEC 60364-5-52"],
  inputSchema: gerilimDusumuKontroluInputSchema,
  compute,
};
