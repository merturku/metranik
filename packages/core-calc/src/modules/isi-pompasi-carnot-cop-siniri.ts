import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Termodinamiğin ikinci yasası, herhangi bir ısı pompasının COP'sine mutlak
// bir üst sınır koyar: Carnot COP = Tsıcak/(Tsıcak-Tsoğuk) (Kelvin cinsinden).
// Gerçek COP bu sınırı asla aşamaz — aşıyorsa girdi/ölçüm hatası vardır. Isı
// Pompası Kompresör Gücü ve SPF modülleri gerçek COP'u girdi olarak alır; bu
// modül o COP'un fiziksel olarak mümkün olup olmadığını doğrular.
export const isiPompasiCarnotCopSiniriInputSchema = z.object({
  sicakKaynakSicakligi_Tsicak_C: z.number(),
  sogukKaynakSicakligi_Tsoguk_C: z.number(),
  gercekCOP: z.number().positive(),
});

export type IsiPompasiCarnotCopSiniriInput = z.infer<
  typeof isiPompasiCarnotCopSiniriInputSchema
>;

export interface IsiPompasiCarnotCopSiniriOutput {
  carnotCOP: number;
}

const KELVIN_OFFSET = 273.15;

function compute(
  input: IsiPompasiCarnotCopSiniriInput,
): CalcResult<IsiPompasiCarnotCopSiniriOutput> {
  const tSicakKelvin = input.sicakKaynakSicakligi_Tsicak_C + KELVIN_OFFSET;
  const tSogukKelvin = input.sogukKaynakSicakligi_Tsoguk_C + KELVIN_OFFSET;
  const carnotCOP = tSicakKelvin / (tSicakKelvin - tSogukKelvin);
  const verimlilikOrani = input.gercekCOP / carnotCOP;

  return {
    value: { carnotCOP },
    intermediates: {
      verimlilikOrani_gercekCarnot: verimlilikOrani,
    },
    standardsUsed: [],
    verdict:
      input.gercekCOP <= carnotCOP
        ? { status: "uygun", note: "Gerçek COP, Carnot sınırının altında — fiziksel olarak geçerli." }
        : { status: "uygunsuz", note: "Gerçek COP, Carnot sınırını aşıyor — ölçüm/girdi hatası olmalı." },
  };
}

export const isiPompasiCarnotCopSiniri: CalcModule<
  IsiPompasiCarnotCopSiniriInput,
  IsiPompasiCarnotCopSiniriOutput
> = {
  id: "isi-pompasi-carnot-cop-siniri",
  title: "Isı Pompası Carnot COP Sınırı",
  discipline: "mekanik",
  standards: [],
  inputSchema: isiPompasiCarnotCopSiniriInputSchema,
  compute,
};
