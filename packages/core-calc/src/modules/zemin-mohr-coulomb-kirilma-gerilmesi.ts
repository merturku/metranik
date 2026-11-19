import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Mohr-Coulomb: σ1f = σ3·Nφ + 2c·√Nφ, Nφ = tan²(45°+φ/2); kırılma düzlemi θ = 45°+φ/2
export const zeminMohrCoulombKirilmaGerilmesiInputSchema = z.object({
  kohezyon_kPa: z.number().min(0),
  icSurtunmeAcisi_derece: z.number().min(0).max(50),
  yanalGerilme_kPa: z.number().min(0),
  uygulananDusey_kPa: z.number().positive(),
  gerekliFS: z.number().min(1),
});

export type ZeminMohrCoulombKirilmaGerilmesiInput = z.infer<typeof zeminMohrCoulombKirilmaGerilmesiInputSchema>;
export interface ZeminMohrCoulombKirilmaGerilmesiOutput {
  kirilmaDuseyGerilmesi_kPa: number;
}

function compute(input: ZeminMohrCoulombKirilmaGerilmesiInput): CalcResult<ZeminMohrCoulombKirilmaGerilmesiOutput> {
  const phi = (input.icSurtunmeAcisi_derece * Math.PI) / 180;
  const N = Math.tan(Math.PI / 4 + phi / 2) ** 2;
  const s1f = input.yanalGerilme_kPa * N + 2 * input.kohezyon_kPa * Math.sqrt(N);
  const teta = Math.PI / 4 + phi / 2;
  const sn = (s1f + input.yanalGerilme_kPa) / 2 + ((s1f - input.yanalGerilme_kPa) / 2) * Math.cos(2 * teta);
  const tau = ((s1f - input.yanalGerilme_kPa) / 2) * Math.sin(2 * teta);
  const fs = s1f / input.uygulananDusey_kPa;
  const status = fs >= input.gerekliFS ? "uygun" : fs >= 1 ? "sinirda" : "uygunsuz";
  return {
    value: { kirilmaDuseyGerilmesi_kPa: s1f },
    intermediates: {
      N_phi: N,
      kirilma_duzlemi_acisi_derece: (teta * 180) / Math.PI,
      kirilma_duzleminde_normal_gerilme_kPa: sn,
      kirilma_duzleminde_kayma_dayanimi_kPa: tau,
      c_artı_sigma_tanphi_kontrol_kPa: input.kohezyon_kPa + sn * Math.tan(phi),
      guvenlik_sayisi: fs,
    },
    standardsUsed: ["Mohr-Coulomb kırılma ölçütü"],
    verdict: { status, note: `FS = σ1f/σ1 = ${fs.toFixed(2)} (gerekli ${input.gerekliFS})` },
  };
}

export const zeminMohrCoulombKirilmaGerilmesi: CalcModule<ZeminMohrCoulombKirilmaGerilmesiInput, ZeminMohrCoulombKirilmaGerilmesiOutput> = {
  id: "zemin-mohr-coulomb-kirilma-gerilmesi",
  title: "Zemin Mohr-Coulomb Kırılma Gerilmesi",
  discipline: "insaat",
  standards: ["Mohr-Coulomb kırılma ölçütü"],
  inputSchema: zeminMohrCoulombKirilmaGerilmesiInputSchema,
  compute,
};
