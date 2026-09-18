import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const boruHavaHiziKontroluSchema = z.object({
  volumetrik_debi_m3s: z.number().positive(),
  boru_çapı_mm: z.number().positive(),
  hız_alt_sınır_ms: z.number().positive(),
  hız_üst_sınır_ms: z.number().positive(),
});

export type BoruHavaHiziKontroluInput = z.infer<typeof boruHavaHiziKontroluSchema>;

export interface BoruHavaHiziKontroluOutput {
  hava_hızı_ms: number;
  verdict?: { status: "uygun" | "düşük" | "yüksek"; note: string };
}

export const boruHavaHiziKontrolu: CalcModule<BoruHavaHiziKontroluInput, BoruHavaHiziKontroluOutput> = {
  id: "boru-hava-hizi-kontrolu",
  title: "Boru Hava Hızı Kontrolü",
  discipline: "mekanik",
  standards: ["ISO 4414"],
  inputSchema: boruHavaHiziKontroluSchema,

  compute(input: BoruHavaHiziKontroluInput): CalcResult<BoruHavaHiziKontroluOutput> {
    const d_m = input.boru_çapı_mm / 1000;
    const A = Math.PI * Math.pow(d_m / 2, 2);
    const hava_hızı_ms = input.volumetrik_debi_m3s / A;

    let status: "uygun" | "düşük" | "yüksek" = "uygun";
    let note = "";

    if (hava_hızı_ms < input.hız_alt_sınır_ms) {
      status = "düşük";
      note = `Hız ${input.hız_alt_sınır_ms} m/s'den az: basınç kaybı aşırı, hava kumaşı riskleri artar.`;
    } else if (hava_hızı_ms > input.hız_üst_sınır_ms) {
      status = "yüksek";
      note = `Hız ${input.hız_üst_sınır_ms} m/s'den fazla: gürültü, erozyon, enerji kaybı riskleri artar.`;
    } else {
      note = `Hız kabul edilebilir aralıkta (${input.hız_alt_sınır_ms}-${input.hız_üst_sınır_ms} m/s).`;
    }

    return {
      value: {
        hava_hızı_ms: Math.round(hava_hızı_ms * 100) / 100,
        verdict: { status, note },
      },
      intermediates: {
        boru_kesit_alanı_m2: Math.round(A * 1e7) / 1e7,
      },
      standardsUsed: ["ISO 4414"],
    };
  },
};
