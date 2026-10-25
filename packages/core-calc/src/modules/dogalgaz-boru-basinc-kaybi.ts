import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Alçak basınçlı gaz tesisatı için lineer Renouard formülü:
// ΔP = 23200 × S × Le × Q^1,82 × D^−4,82 (ΔP mbar, Le m, Q m³/h, D mm).
// S gazın havaya göre bağıl yoğunluğu (doğal gaz ~0,6). Le, armatürlerin eşdeğer
// boylarını da içeren hesap uzunluğudur. Formül Q/D < 150 için geçerlidir; bina
// içi çaplarda bu koşul her zaman sağlanır. İzin verilen kayıp gaz dağıtım
// şirketinin iç tesisat teknik esaslarından alınır, bu modülde gömülü değildir.
const RENOUARD_SABITI = 23200;
const DEBI_USSU = 1.82;
const CAP_USSU = -4.82;

export const dogalgazBoruBasincKaybiInputSchema = z.object({
  debi_m3h: z.number().positive(),
  icCap_mm: z.number().positive(),
  esdegerUzunluk_m: z.number().positive(),
  bagilYogunluk: z.number().positive(),
  izinVerilenKayip_mbar: z.number().positive(),
});

export type DogalgazBoruBasincKaybiInput = z.infer<typeof dogalgazBoruBasincKaybiInputSchema>;

export interface DogalgazBoruBasincKaybiOutput {
  basincKaybi_mbar: number;
}

function compute(input: DogalgazBoruBasincKaybiInput): CalcResult<DogalgazBoruBasincKaybiOutput> {
  const basincKaybiMbar =
    RENOUARD_SABITI *
    input.bagilYogunluk *
    input.esdegerUzunluk_m *
    input.debi_m3h ** DEBI_USSU *
    input.icCap_mm ** CAP_USSU;
  const kesitAlaniM2 = (Math.PI * (input.icCap_mm / 1000) ** 2) / 4;
  const hizMS = input.debi_m3h / 3600 / kesitAlaniM2;
  const uygun = basincKaybiMbar <= input.izinVerilenKayip_mbar;

  return {
    value: { basincKaybi_mbar: basincKaybiMbar },
    intermediates: {
      gaz_hizi_ms: hizMS,
      kullanim_orani_yuzde: (basincKaybiMbar / input.izinVerilenKayip_mbar) * 100,
    },
    standardsUsed: [],
    verdict: uygun
      ? {
          status: "uygun",
          note: `ΔP = ${basincKaybiMbar.toFixed(2)} mbar ≤ ${input.izinVerilenKayip_mbar} mbar izin verilen kayıp.`,
        }
      : {
          status: "uygunsuz",
          note: `ΔP = ${basincKaybiMbar.toFixed(2)} mbar > ${input.izinVerilenKayip_mbar} mbar: boru çapını büyütün veya hattı kısaltın.`,
        },
  };
}

export const dogalgazBoruBasincKaybi: CalcModule<
  DogalgazBoruBasincKaybiInput,
  DogalgazBoruBasincKaybiOutput
> = {
  id: "dogalgaz-boru-basinc-kaybi",
  title: "Doğalgaz Boru Basınç Kaybı (Renouard)",
  discipline: "mekanik",
  standards: [],
  inputSchema: dogalgazBoruBasincKaybiInputSchema,
  compute,
};
