import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Beton karbonatlaşma derinliği, dayanıklılık mühendisliğinde yaygın kullanılan
// √t yasasıyla (kare kök zaman modeli) tahmin edilir: d = k×√t. k, beton
// kalitesine/çevre koşullarına bağlı karbonatlaşma katsayısıdır (mühendis
// tarafından deneyim/ölçümle girilir). Karbonatlaşma cephesi donatıya (pas
// payına) ulaştığında korozyon başlama riski oluşur — bu yüzden hesaplanan
// derinlik pas payıyla karşılaştırılır.
export const betonKarbonatlasmaDerinligiKontroluInputSchema = z.object({
  karbonatlasmaKatsayisi_k_mmYilYariKuvvet: z.number().positive(),
  gecenSure_t_yil: z.number().positive(),
  pasPayi_mm: z.number().positive(),
});

export type BetonKarbonatlasmaDerinligiKontroluInput = z.infer<
  typeof betonKarbonatlasmaDerinligiKontroluInputSchema
>;

export interface BetonKarbonatlasmaDerinligiKontroluOutput {
  karbonatlasmaDerinligi_d_mm: number;
}

function compute(
  input: BetonKarbonatlasmaDerinligiKontroluInput,
): CalcResult<BetonKarbonatlasmaDerinligiKontroluOutput> {
  const karbonatlasmaDerinligiDMm =
    input.karbonatlasmaKatsayisi_k_mmYilYariKuvvet * Math.sqrt(input.gecenSure_t_yil);

  return {
    value: { karbonatlasmaDerinligi_d_mm: karbonatlasmaDerinligiDMm },
    intermediates: {
      pasPayi_mm: input.pasPayi_mm,
    },
    standardsUsed: [],
    verdict:
      karbonatlasmaDerinligiDMm < input.pasPayi_mm
        ? { status: "uygun", note: "Karbonatlaşma cephesi donatıya henüz ulaşmamış." }
        : { status: "uygunsuz", note: "Karbonatlaşma cephesi donatıya ulaşmış veya aşmış — korozyon riski." },
  };
}

export const betonKarbonatlasmaDerinligiKontrolu: CalcModule<
  BetonKarbonatlasmaDerinligiKontroluInput,
  BetonKarbonatlasmaDerinligiKontroluOutput
> = {
  id: "beton-karbonatlasma-derinligi-kontrolu",
  title: "Beton Karbonatlaşma Derinliği Kontrolü",
  discipline: "insaat",
  standards: [],
  inputSchema: betonKarbonatlasmaDerinligiKontroluInputSchema,
  compute,
};
