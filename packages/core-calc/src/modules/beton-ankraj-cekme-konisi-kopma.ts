import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Tek ankrajın beton kopma konisi dayanımı (ACI 318-19 §17.6.2):
// Nb = kc·λa·√f'c·hef^1,5 (kc = 10 yerinde dökme / 7 sonradan montaj); 280 ≤ hef ≤ 635 mm yerinde dökme: Nb = 3,9·λa·√f'c·hef^(5/3)
// Ncb = (ANc/ANco)·ψed,N·ψc,N·ψcp,N·Nb,  ANco = 9·hef²,  ψed,N = 1 (ca,min ≥ 1,5hef) veya 0,7 + 0,3·ca,min/(1,5hef)
export const betonAnkrajCekmeKonisiKopmaInputSchema = z.object({
  hef_mm: z.number().positive(),
  fck_MPa: z.number().positive(),
  ankrajTipi: z.enum(["yerinde", "sonradan"]),
  betonDurumu: z.enum(["catlaksiz", "catlak"]),
  kenarMesafe1_mm: z.number().positive(),
  kenarMesafe2_mm: z.number().positive(),
  phi: z.number().gt(0).max(1),
  tasarimCekme_Nua_kN: z.number().min(0),
});

export type BetonAnkrajCekmeKonisiKopmaInput = z.infer<typeof betonAnkrajCekmeKonisiKopmaInputSchema>;
export interface BetonAnkrajCekmeKonisiKopmaOutput {
  phiNcb_kN: number;
}

const STD = "ACI 318-19 §17.6.2 (beton kopma konisi, tek ankraj)";

function compute(input: BetonAnkrajCekmeKonisiKopmaInput): CalcResult<BetonAnkrajCekmeKonisiKopmaOutput> {
  const hef = input.hef_mm;
  const sqrtFc = Math.sqrt(input.fck_MPa);
  const buyukDerinlik = input.ankrajTipi === "yerinde" && hef >= 280 && hef <= 635;
  const kc = input.ankrajTipi === "yerinde" ? 10 : 7;
  const Nb = buyukDerinlik ? 3.9 * sqrtFc * Math.pow(hef, 5 / 3) : kc * sqrtFc * Math.pow(hef, 1.5);

  const sinir = 1.5 * hef;
  const ca1 = Math.min(input.kenarMesafe1_mm, sinir);
  const ca2 = Math.min(input.kenarMesafe2_mm, sinir);
  const ANco = 9 * hef * hef;
  const ANc = (ca1 + sinir) * (ca2 + sinir);
  const caMin = Math.min(input.kenarMesafe1_mm, input.kenarMesafe2_mm);
  const psiEd = caMin >= sinir ? 1 : 0.7 + (0.3 * caMin) / sinir;
  // Sonradan montajda ψc,N = 1,0 (tutucu): ACI'nin 1,4 değeri ankraj onayı (ACI 355.2/ESR) koşulludur.
  const psiC = input.ankrajTipi === "yerinde" && input.betonDurumu === "catlaksiz" ? 1.25 : 1.0;
  const Ncb = (ANc / ANco) * psiEd * psiC * Nb;
  const phiNcb = (input.phi * Ncb) / 1000;
  const oran = input.tasarimCekme_Nua_kN / phiNcb;
  return {
    value: { phiNcb_kN: phiNcb },
    intermediates: {
      Nb_kN: Nb / 1000,
      ANc_ANco: ANc / ANco,
      psi_ed: psiEd,
      psi_c: psiC,
      Ncb_kN: Ncb / 1000,
      phiNcb_kN: phiNcb,
      talep_kapasite_orani: oran,
      Nb_formulu: buyukDerinlik ? "3,9·√f'c·hef^(5/3) (hef ≥ 280 mm)" : `${kc}·√f'c·hef^1,5`,
    },
    standardsUsed: [STD],
    verdict: {
      status: oran <= 0.9 ? "uygun" : oran <= 1 ? "sinirda" : "uygunsuz",
      note: `Nua/φNcb = ${oran.toFixed(2)} (yalnız beton kopma konisi; çelik akması, sıyrılma ve yarılma ayrıca kontrol edilmeli)`,
    },
  };
}

export const betonAnkrajCekmeKonisiKopma: CalcModule<BetonAnkrajCekmeKonisiKopmaInput, BetonAnkrajCekmeKonisiKopmaOutput> = {
  id: "beton-ankraj-cekme-konisi-kopma",
  title: "Beton Ankraj Çekme Konisi Kopma Dayanımı",
  discipline: "insaat",
  standards: [STD],
  inputSchema: betonAnkrajCekmeKonisiKopmaInputSchema,
  compute,
};
