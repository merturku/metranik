import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kesicinin anma kısa devre kesme kapasitesi (Icu), hesaplanan olası kısa devre
// akımını karşılamalı: Icu ≥ Isc. Basit ama kritik bir seçim kontrolü.
export const keciciKisaDevreKontroluInputSchema = z.object({
  hesaplananKisaDevreAkimi_kA: z.number().positive(),
  kesiciAnmaKapasitesi_kA: z.number().positive(),
});

export type KesiciKisaDevreKontroluInput = z.infer<
  typeof keciciKisaDevreKontroluInputSchema
>;

export interface KesiciKisaDevreKontroluOutput {
  marj_kA: number;
}

function compute(
  input: KesiciKisaDevreKontroluInput,
): CalcResult<KesiciKisaDevreKontroluOutput> {
  const marjKA = input.kesiciAnmaKapasitesi_kA - input.hesaplananKisaDevreAkimi_kA;
  const uygun = marjKA >= 0;

  return {
    value: { marj_kA: marjKA },
    intermediates: {
      hesaplananKisaDevreAkimi_kA: input.hesaplananKisaDevreAkimi_kA,
      kesiciAnmaKapasitesi_kA: input.kesiciAnmaKapasitesi_kA,
    },
    standardsUsed: ["IEC 60947-2"],
    verdict: uygun
      ? { status: "uygun", note: "Kesici kapasitesi hesaplanan kısa devre akımını karşılıyor." }
      : { status: "uygunsuz", note: "Kesici kapasitesi yetersiz; daha yüksek Icu gerekir." },
  };
}

export const kesiciKisaDevreKontrolu: CalcModule<
  KesiciKisaDevreKontroluInput,
  KesiciKisaDevreKontroluOutput
> = {
  id: "kesici-kisa-devre-kontrolu",
  title: "Kesici Kısa Devre Kapasitesi Kontrolü",
  discipline: "elektrik",
  standards: ["IEC 60947-2"],
  inputSchema: keciciKisaDevreKontroluInputSchema,
  compute,
};
