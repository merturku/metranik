import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Hidrostatik basınç testi kabul kriterleri: genel boru hatlarında yaygın pratik
// 1.5×çalışma basıncı, sprinkler (NFPA 13) sistemlerinde ise min(13.8 bar,
// çalışma+3.45 bar) ve en az 2 saat süre. Bu değerler yayınlanmış kod pratiğidir,
// proje şartnamesi/yerel mevzuat ile teyit edilmelidir.
export const hidrostatikBasincTestiInputSchema = z.object({
  sistemTipi: z.enum(["genel", "sprinkler"]),
  calismaBasinci_bar: z.number().positive(),
  uygulananTestBasinci_bar: z.number().positive(),
  testSuresi_saat: z.number().positive(),
  izinVerilenDusus_bar: z.number().nonnegative(),
  olculenDusus_bar: z.number().nonnegative(),
});

export type HidrostatikBasincTestiInput = z.infer<typeof hidrostatikBasincTestiInputSchema>;

export interface HidrostatikBasincTestiOutput {
  gerekliTestBasinci_bar: number;
}

function compute(
  input: HidrostatikBasincTestiInput,
): CalcResult<HidrostatikBasincTestiOutput> {
  const gerekliTestBasinciBar =
    input.sistemTipi === "sprinkler"
      ? Math.max(13.8, input.calismaBasinci_bar + 3.45)
      : input.calismaBasinci_bar * 1.5;
  const gerekliSureSaat = input.sistemTipi === "sprinkler" ? 2 : 1;

  const basincTamam = input.uygulananTestBasinci_bar >= gerekliTestBasinciBar;
  const sureTamam = input.testSuresi_saat >= gerekliSureSaat;
  const dususTamam = input.olculenDusus_bar <= input.izinVerilenDusus_bar;
  const hepsiTamam = basincTamam && sureTamam && dususTamam;

  const eksikler = [
    !basincTamam && "basınç",
    !sureTamam && "süre",
    !dususTamam && "düşüş",
  ].filter(Boolean);

  return {
    value: { gerekliTestBasinci_bar: gerekliTestBasinciBar },
    intermediates: {
      gerekliSure_saat: gerekliSureSaat,
      basincKriteri: basincTamam ? "Sağlandı" : "Sağlanmadı",
      sureKriteri: sureTamam ? "Sağlandı" : "Sağlanmadı",
      dususKriteri: dususTamam ? "Sağlandı" : "Sağlanmadı",
    },
    standardsUsed: input.sistemTipi === "sprinkler" ? ["NFPA 13"] : ["ASME B31.1/B31.9"],
    verdict: hepsiTamam
      ? { status: "uygun", note: "Basınç, süre ve düşüş kriterleri sağlandı." }
      : { status: "uygunsuz", note: `Kriter sağlanmadı: ${eksikler.join(", ")}.` },
  };
}

export const hidrostatikBasincTesti: CalcModule<
  HidrostatikBasincTestiInput,
  HidrostatikBasincTestiOutput
> = {
  id: "hidrostatik-basinc-testi",
  title: "Hidrostatik Basınç Testi",
  discipline: "mekanik",
  standards: ["ASME B31.1/B31.9", "NFPA 13"],
  inputSchema: hidrostatikBasincTestiInputSchema,
  compute,
};
