import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const isiPompasıKondanserKapasitesiSchema = z.object({
  kompresor_gucu_kW: z.number().positive(),
  isitma_cop: z.number().positive(),
  kondenser_kapasite_kW: z.number().positive(),
});

export type IsiPompasıKondanserKapasitesiInput = z.infer<typeof isiPompasıKondanserKapasitesiSchema>;

export interface IsiPompasıKondanserKapasitesiOutput {
  gereken_kondenser_kapasitesi_kW: number;
  verdict?: { status: "uygun" | "yetersiz"; note: string };
}

export const isiPompasıKondanserKapasitesi: CalcModule<IsiPompasıKondanserKapasitesiInput, IsiPompasıKondanserKapasitesiOutput> = {
  id: "isi-pompasi-kondenser-kapasitesi",
  title: "Isı Pompası Kondenser Kapasitesi",
  discipline: "mekanik",
  standards: ["—"],
  inputSchema: isiPompasıKondanserKapasitesiSchema,

  compute(input: IsiPompasıKondanserKapasitesiInput): CalcResult<IsiPompasıKondanserKapasitesiOutput> {
    // Kondenser duty = Kompresör gücü × COP
    // (Kompresör gücü + evaporatörden çekilen ısı = kondenserde yayılan ısı)
    const gereken_kapasitesi_kW = input.kompresor_gucu_kW * input.isitma_cop;

    let status: "uygun" | "yetersiz" = "uygun";
    let note = "";

    if (input.kondenser_kapasite_kW >= gereken_kapasitesi_kW) {
      note = `Kondenser kapasitesi yeterli (${input.kondenser_kapasite_kW} kW ≥ ${Math.round(gereken_kapasitesi_kW * 10) / 10} kW).`;
    } else {
      status = "yetersiz";
      note = `Kondenser yetersiz (${input.kondenser_kapasite_kW} kW < ${Math.round(gereken_kapasitesi_kW * 10) / 10} kW). Boyutlandırma gözden geçirilmeli.`;
    }

    return {
      value: {
        gereken_kondenser_kapasitesi_kW: Math.round(gereken_kapasitesi_kW * 10) / 10,
        verdict: { status, note },
      },
      intermediates: {
        isitma_kapasitesi_kW: Math.round(gereken_kapasitesi_kW * 10) / 10,
      },
      standardsUsed: ["—"],
    };
  },
};
