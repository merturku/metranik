import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Buhar kazanı besi suyu debisi: kütle dengesi — besi suyu, üretilen buhar
// ile blöfün (blowdown) toplamına eşittir. Blöf, besi suyunun bir oranı
// olarak tanımlanır (kazan suyundaki çözünmüş katı derişimini sınırlamak
// için, tipik %2-10): ṁ_besi = ṁ_besi×b + ṁ_buhar → ṁ_besi = ṁ_buhar/(1-b).
export const buharKazaniBesiSuyuDebisiInputSchema = z.object({
  buharDebisi_kgh: z.number().positive(),
  blofOrani_b: z.number().min(0).max(0.5),
});

export type BuharKazaniBesiSuyuDebisiInput = z.infer<
  typeof buharKazaniBesiSuyuDebisiInputSchema
>;

export interface BuharKazaniBesiSuyuDebisiOutput {
  besiSuyuDebisi_kgh: number;
}

function compute(
  input: BuharKazaniBesiSuyuDebisiInput,
): CalcResult<BuharKazaniBesiSuyuDebisiOutput> {
  const besiSuyuDebisiKgh = input.buharDebisi_kgh / (1 - input.blofOrani_b);
  const blofMiktariKgh = besiSuyuDebisiKgh - input.buharDebisi_kgh;

  return {
    value: { besiSuyuDebisi_kgh: besiSuyuDebisiKgh },
    intermediates: {
      blofMiktari_kgh: blofMiktariKgh,
    },
    standardsUsed: [],
  };
}

export const buharKazaniBesiSuyuDebisi: CalcModule<
  BuharKazaniBesiSuyuDebisiInput,
  BuharKazaniBesiSuyuDebisiOutput
> = {
  id: "buhar-kazani-besi-suyu-debisi",
  title: "Buhar Kazanı Besi Suyu Debisi",
  discipline: "mekanik",
  standards: [],
  inputSchema: buharKazaniBesiSuyuDebisiInputSchema,
  compute,
};
