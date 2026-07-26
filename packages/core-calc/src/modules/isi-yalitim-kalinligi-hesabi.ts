import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Isıl direnç formülü: hedef U değerine ulaşmak için gerekli ek yalıtım kalınlığı.
// Rhedef = 1/Uhedef, RekYalitim = Rhedef - Rmevcut, d = RekYalitim × λ.
export const isiYalitimKalinligiHesabiInputSchema = z.object({
  mevcutDuvarDirenci_m2KW: z.number().positive(),
  hedefUDegeri_WmK: z.number().positive(),
  yalitimIletkenligi_WmK: z.number().positive(),
});

export type IsiYalitimKalinligiHesabiInput = z.infer<
  typeof isiYalitimKalinligiHesabiInputSchema
>;

export interface IsiYalitimKalinligiHesabiOutput {
  gerekliKalinlik_cm: number;
}

function compute(
  input: IsiYalitimKalinligiHesabiInput,
): CalcResult<IsiYalitimKalinligiHesabiOutput> {
  const hedefDirencM2KW = 1 / input.hedefUDegeri_WmK;
  const ekYalitimDirenciM2KW = hedefDirencM2KW - input.mevcutDuvarDirenci_m2KW;
  const kalinlikM = ekYalitimDirenciM2KW * input.yalitimIletkenligi_WmK;

  return {
    value: { gerekliKalinlik_cm: kalinlikM * 100 },
    intermediates: {
      hedefDirenc_m2KW: hedefDirencM2KW,
      ekYalitimDirenci_m2KW: ekYalitimDirenciM2KW,
    },
    standardsUsed: ["TS 825"],
  };
}

export const isiYalitimKalinligiHesabi: CalcModule<
  IsiYalitimKalinligiHesabiInput,
  IsiYalitimKalinligiHesabiOutput
> = {
  id: "isi-yalitim-kalinligi-hesabi",
  title: "Isı Yalıtım Kalınlığı Hesabı",
  discipline: "ev",
  standards: ["TS 825"],
  inputSchema: isiYalitimKalinligiHesabiInputSchema,
  compute,
};
