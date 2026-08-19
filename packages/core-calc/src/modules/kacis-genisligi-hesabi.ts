import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kaçış merdiveni/kapısı genişlik kontrolü: tahliye edilecek kişi sayısı,
// birim genişliğin taşıyabileceği kişi kapasitesine bölünerek gerekli
// genişlik bulunur ve mevcut genişlikle karşılaştırılır.
// GerekliGenişlik = KişiSayısı / BirimGenişlikKapasitesi.
export const kacisGenisligiHesabiInputSchema = z.object({
  kisiSayisi: z.number().positive(),
  birimGenislikKapasitesi_kisi_m: z.number().positive(),
  mevcutGenislik_m: z.number().positive(),
});

export type KacisGenisligiHesabiInput = z.infer<typeof kacisGenisligiHesabiInputSchema>;

export interface KacisGenisligiHesabiOutput {
  gerekliGenislik_m: number;
}

function compute(
  input: KacisGenisligiHesabiInput,
): CalcResult<KacisGenisligiHesabiOutput> {
  const gerekliGenislikM = input.kisiSayisi / input.birimGenislikKapasitesi_kisi_m;
  const genislikMarjiM = input.mevcutGenislik_m - gerekliGenislikM;

  return {
    value: { gerekliGenislik_m: gerekliGenislikM },
    intermediates: {
      genislikMarji_m: genislikMarjiM,
    },
    standardsUsed: [],
    verdict:
      input.mevcutGenislik_m >= gerekliGenislikM
        ? { status: "uygun", note: "Mevcut genişlik gerekli genişliği karşılıyor." }
        : { status: "uygunsuz", note: "Mevcut genişlik gerekli genişliğin altında." },
  };
}

export const kacisGenisligiHesabi: CalcModule<
  KacisGenisligiHesabiInput,
  KacisGenisligiHesabiOutput
> = {
  id: "kacis-genisligi-hesabi",
  title: "Kaçış Merdiveni / Kapı Genişliği Hesabı",
  discipline: "insaat",
  standards: [],
  inputSchema: kacisGenisligiHesabiInputSchema,
  compute,
};
