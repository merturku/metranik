import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Hidrofor (hidropnömatik) tank hacmi: Boyle yasasına (izotermal gaz
// sıkışması) dayanır. Pompa devreye girme (Pmin) basıncında tank hacminin
// tamamı hava, devreden çıkma (Pmax) basıncında ise Vd kadar su alınmış
// haldedir (hava hacmi Vt-Vd). Pmin×Vt = Pmax×(Vt-Vd) eşitliğinden
// Vt = Pmax×Vd / (Pmax-Pmin). Basınçlar mutlak (atmosferik dahil) girilir.
export const hidroforTankiHacmiInputSchema = z.object({
  cekilebilirHacim_Vd_L: z.number().positive(),
  devreyeGirmeBasinci_Pmin_kPaAbs: z.number().positive(),
  devredenCikmaBasinci_Pmax_kPaAbs: z.number().positive(),
});

export type HidroforTankiHacmiInput = z.infer<
  typeof hidroforTankiHacmiInputSchema
>;

export interface HidroforTankiHacmiOutput {
  tankHacmi_Vt_L: number;
}

function compute(
  input: HidroforTankiHacmiInput,
): CalcResult<HidroforTankiHacmiOutput> {
  const basincFarkiKPa =
    input.devredenCikmaBasinci_Pmax_kPaAbs - input.devreyeGirmeBasinci_Pmin_kPaAbs;
  const tankHacmiVtL =
    (input.devredenCikmaBasinci_Pmax_kPaAbs * input.cekilebilirHacim_Vd_L) / basincFarkiKPa;

  return {
    value: { tankHacmi_Vt_L: tankHacmiVtL },
    intermediates: {
      basincFarki_kPa: basincFarkiKPa,
    },
    standardsUsed: [],
  };
}

export const hidroforTankiHacmi: CalcModule<
  HidroforTankiHacmiInput,
  HidroforTankiHacmiOutput
> = {
  id: "hidrofor-tanki-hacmi",
  title: "Hidrofor Tankı Hacmi",
  discipline: "mekanik",
  standards: [],
  inputSchema: hidroforTankiHacmiInputSchema,
  compute,
};
