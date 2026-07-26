import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Blondel ergonomi formülü: 2×rıht + basamak genişliği ≈ 63 cm (rahat yürüme adımı).
// Kabul aralığı literatürde 60-65 cm olarak kabul edilir.
const BLONDEL_MIN_CM = 60;
const BLONDEL_MAX_CM = 65;

export const merdivenBasamakHesabiInputSchema = z.object({
  rihtYuksekligi_cm: z.number().positive(),
  basamakGenisligi_cm: z.number().positive(),
});

export type MerdivenBasamakHesabiInput = z.infer<typeof merdivenBasamakHesabiInputSchema>;

export interface MerdivenBasamakHesabiOutput {
  blondelDegeri_cm: number;
}

function compute(input: MerdivenBasamakHesabiInput): CalcResult<MerdivenBasamakHesabiOutput> {
  const blondelCm = 2 * input.rihtYuksekligi_cm + input.basamakGenisligi_cm;
  const uygun = blondelCm >= BLONDEL_MIN_CM && blondelCm <= BLONDEL_MAX_CM;

  return {
    value: { blondelDegeri_cm: blondelCm },
    intermediates: {
      kabulAraligi_min_cm: BLONDEL_MIN_CM,
      kabulAraligi_max_cm: BLONDEL_MAX_CM,
    },
    standardsUsed: ["Blondel Formülü"],
    verdict: uygun
      ? { status: "uygun", note: "Blondel değeri kabul edilen 60-65 cm aralığında." }
      : { status: "uygunsuz", note: "Blondel değeri 60-65 cm aralığının dışında." },
  };
}

export const merdivenBasamakHesabi: CalcModule<
  MerdivenBasamakHesabiInput,
  MerdivenBasamakHesabiOutput
> = {
  id: "merdiven-basamak-hesabi",
  title: "Merdiven Basamak Hesabı",
  discipline: "insaat",
  standards: ["Blondel Formülü"],
  inputSchema: merdivenBasamakHesabiInputSchema,
  compute,
};
