import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Merdiven/balkon/teras korkuluğu yükseklik kontrolü: ölçülen korkuluk
// yüksekliği, kullanım tipine göre yönetmelikte tanımlanan asgari yükseklikle
// karşılaştırılır (TS 9111 / Planlı Alanlar İmar Yönetmeliği; konut içi
// merdivende genelde ~90cm, balkon/terasta kat yüksekliğine göre ~90-110cm
// asgari değerler kullanılır — kesin sınır projeye uygulanacak yönetmelikten
// teyit edilmelidir).
export const korkulukYuksekligiKontroluInputSchema = z.object({
  olculenYukseklik_cm: z.number().positive(),
  asgariYukseklik_cm: z.number().positive(),
});

export type KorkulukYuksekligiKontroluInput = z.infer<
  typeof korkulukYuksekligiKontroluInputSchema
>;

export interface KorkulukYuksekligiKontroluOutput {
  marj_cm: number;
}

function compute(
  input: KorkulukYuksekligiKontroluInput,
): CalcResult<KorkulukYuksekligiKontroluOutput> {
  const marjCm = input.olculenYukseklik_cm - input.asgariYukseklik_cm;

  return {
    value: { marj_cm: marjCm },
    intermediates: {
      asgariYukseklik_cm: input.asgariYukseklik_cm,
    },
    standardsUsed: ["TS 9111"],
    verdict:
      marjCm >= 0
        ? { status: "uygun", note: "Korkuluk yüksekliği asgari sınırın üstünde." }
        : { status: "uygunsuz", note: "Korkuluk yüksekliği asgari sınırın altında." },
  };
}

export const korkulukYuksekligiKontrolu: CalcModule<
  KorkulukYuksekligiKontroluInput,
  KorkulukYuksekligiKontroluOutput
> = {
  id: "korkuluk-yuksekligi-kontrolu",
  title: "Korkuluk Yüksekliği Kontrolü",
  discipline: "ev",
  standards: ["TS 9111"],
  inputSchema: korkulukYuksekligiKontroluInputSchema,
  compute,
};
