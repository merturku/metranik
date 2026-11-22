import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS EN 1993-1-8 §3.9: Fp,C = 0,7·fub·As;  Fs,Rd = ks·n·μ·(Fp,C − 0,8·Ft,Ed)/γM3  (bulon başına, n sürtünme yüzeyi sayısı)
const FUB: Record<string, number> = { "8.8": 800, "10.9": 1000 };
const MU: Record<string, number> = { A: 0.5, B: 0.4, C: 0.3, D: 0.2 };

export const ongermeliBulonSurtunmeBirlesimiInputSchema = z.object({
  bulonSinifi: z.enum(["8.8", "10.9"]),
  gerilmeAlani_As_mm2: z.number().positive(),
  bulonAdedi: z.number().int().positive(),
  surtunmeYuzeyi_n: z.number().int().min(1).max(2),
  yuzeySinifi: z.enum(["A", "B", "C", "D"]),
  delikTipi_ks: z.enum(["1.0", "0.85", "0.7"]),
  gammaM3: z.enum(["1.25", "1.1"]),
  bulonCekmesi_Ft_kN: z.number().min(0),
  tasarimKesme_Ved_kN: z.number().min(0),
});

export type OngermeliBulonSurtunmeBirlesimiInput = z.infer<typeof ongermeliBulonSurtunmeBirlesimiInputSchema>;
export interface OngermeliBulonSurtunmeBirlesimiOutput {
  birlesimKayma_FsRd_kN: number;
}

const STD = "TS EN 1993-1-8 §3.9 (öngerilmeli bulonlu sürtünme birleşimi)";

function compute(input: OngermeliBulonSurtunmeBirlesimiInput): CalcResult<OngermeliBulonSurtunmeBirlesimiOutput> {
  const fub = FUB[input.bulonSinifi] ?? 800;
  const mu = MU[input.yuzeySinifi] ?? 0.2;
  const ks = Number(input.delikTipi_ks);
  const g3 = Number(input.gammaM3);
  const Fpc = (0.7 * fub * input.gerilmeAlani_As_mm2) / 1000;
  const etkin = Fpc - 0.8 * input.bulonCekmesi_Ft_kN;
  const FsBulon = etkin > 0 ? (ks * input.surtunmeYuzeyi_n * mu * etkin) / g3 : 0;
  const toplam = FsBulon * input.bulonAdedi;
  const oran = toplam > 0 ? input.tasarimKesme_Ved_kN / toplam : Infinity;
  return {
    value: { birlesimKayma_FsRd_kN: toplam },
    intermediates: { fub_MPa: fub, mu, ks, Fp_C_kN: Fpc, bulon_basina_FsRd_kN: FsBulon, talep_kapasite_orani: oran === Infinity ? "tanımsız (öngerme tükendi)" : oran },
    standardsUsed: [STD],
    verdict:
      toplam <= 0
        ? { status: "uygunsuz", note: "Çekme kuvveti öngermeyi tüketiyor (0,8·Ft ≥ Fp,C): sürtünme direnci yok" }
        : { status: oran <= 0.9 ? "uygun" : oran <= 1 ? "sinirda" : "uygunsuz", note: `Ved/Fs,Rd = ${oran.toFixed(2)} (kayma kontrolü; ezilme ve net kesit ayrıca kontrol edilmeli; μ yüzey hazırlığı gerektirir)` },
  };
}

export const ongermeliBulonSurtunmeBirlesimi: CalcModule<OngermeliBulonSurtunmeBirlesimiInput, OngermeliBulonSurtunmeBirlesimiOutput> = {
  id: "ongermeli-bulon-surtunme-birlesimi",
  title: "Öngerilmeli Bulon Sürtünme Birleşimi Kayma Dayanımı",
  discipline: "insaat",
  standards: [STD],
  inputSchema: ongermeliBulonSurtunmeBirlesimiInputSchema,
  compute,
};
