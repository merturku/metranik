import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Primer–sekonder devre ayırıcı (decoupler / ortak boru) kütle ve enerji dengesi.
// Qb = Qp − Qs. Qb ≥ 0: fazla primer debi ayırıcıdan dönüşe geçer, primer dönüş karışım sıcaklığı
// Tpd = (Qs·Tsd + Qb·Tg)/Qp. Qb < 0: sekonder debi primeri aşar; ayırıcıda ters akış olur ve
// sekonder besleme sıcaklığı Tsg = (Qp·Tg + |Qb|·Tsd)/Qs (üretim sıcaklığından uzaklaşır).
export const primerSekonderAyiriciBypassInputSchema = z.object({
  primerDebi_m3h: z.number().positive(),
  sekonderDebi_m3h: z.number().positive(),
  primerGidisSicakligi_C: z.number(),
  sekonderDonusSicakligi_C: z.number(),
});

export type PrimerSekonderAyiriciBypassInput = z.infer<typeof primerSekonderAyiriciBypassInputSchema>;
export interface PrimerSekonderAyiriciBypassOutput {
  ayiriciDebisi_m3h: number;
}

const STD = "Kütle ve enerji dengesi (karışım düğümü), ASHRAE Handbook – HVAC Systems and Equipment (primer–sekonder pompalama)";
const RHO_CP_KJ_M3K = 1000 * 4.186; // su, kJ/(m³·K)

function compute(input: PrimerSekonderAyiriciBypassInput): CalcResult<PrimerSekonderAyiriciBypassOutput> {
  const Qp = input.primerDebi_m3h;
  const Qs = input.sekonderDebi_m3h;
  const Tg = input.primerGidisSicakligi_C;
  const Tsd = input.sekonderDonusSicakligi_C;
  const Qb = Qp - Qs;
  const ters = Qb < 0;

  const primerDonus = ters ? Tsd : (Qs * Tsd + Qb * Tg) / Qp;
  const sekonderGidis = ters ? (Qp * Tg + -Qb * Tsd) / Qs : Tg;
  const primerDeltaT = Math.abs(Tsd - Tg) === 0 ? 0 : Math.abs(primerDonus - Tg);
  const sekonderDeltaT = Math.abs(Tsd - sekonderGidis);
  const primerGuc_kW = (Qp * RHO_CP_KJ_M3K * primerDeltaT) / 3600;

  return {
    value: { ayiriciDebisi_m3h: Qb },
    intermediates: {
      ayirici_debi_orani_Qb_Qp: Qb / Qp,
      primer_donus_karisim_C: primerDonus,
      sekonder_gidis_C: sekonderGidis,
      primer_deltaT_K: primerDeltaT,
      sekonder_deltaT_K: sekonderDeltaT,
      primer_isil_guc_kW: primerGuc_kW,
    },
    standardsUsed: [STD],
    verdict: {
      status: ters ? "uygunsuz" : "uygun",
      note: ters
        ? `Sekonder debi primeri aşıyor: ayırıcıda ters akış var, sekonder besleme ${sekonderGidis.toFixed(2)} °C'ye bozuluyor (üretim ${Tg} °C)`
        : `Ayırıcıdan ${Qb.toFixed(2)} m³/h geçiyor; primer dönüş ${primerDonus.toFixed(2)} °C (ΔT ${primerDeltaT.toFixed(2)} K). Büyük ayırıcı debisi primer ΔT'yi düşürür (düşük ΔT sendromu)`,
    },
  };
}

export const primerSekonderAyiriciBypass: CalcModule<PrimerSekonderAyiriciBypassInput, PrimerSekonderAyiriciBypassOutput> = {
  id: "primer-sekonder-ayirici-bypass",
  title: "Primer–Sekonder Ayırıcı (Decoupler) Debisi ve Karışım Sıcaklığı",
  discipline: "mekanik",
  standards: [STD],
  inputSchema: primerSekonderAyiriciBypassInputSchema,
  compute,
};
