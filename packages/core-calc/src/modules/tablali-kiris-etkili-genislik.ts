import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS EN 1992-1-1 §5.3.2.1, tablalı (T/L) kirişin etkili tabla genişliği:
//   beff = Σ beff,i + bw ≤ b,   beff,i = 0,2·bi + 0,1·l0 ≤ 0,2·l0  ve  beff,i ≤ bi
// bi: gövde yüzünden komşu kirişe kadar net aralığın yarısı (kenar kirişte döşeme ucu).
// l0: moment sıfır noktaları arası uzaklık (Şekil 5.2): uç açıklık 0,85·L, iç açıklık
// 0,70·L, basit mesnetli tek açıklık L (komşu açıklıkların oranı 0,67–1,5 arasındaysa).
const L0_KATSAYI: Record<"basit" | "uc" | "ic", number> = { basit: 1, uc: 0.85, ic: 0.7 };

export const tablaliKirisEtkiliGenislikInputSchema = z.object({
  govdeGenisligi_bw_mm: z.number().positive(),
  solTablaGenisligi_b1_mm: z.number().min(0),
  sagTablaGenisligi_b2_mm: z.number().min(0),
  aciklik_L_m: z.number().positive(),
  aciklikTipi: z.enum(["basit", "uc", "ic"]),
});

export type TablaliKirisEtkiliGenislikInput = z.infer<typeof tablaliKirisEtkiliGenislikInputSchema>;

export interface TablaliKirisEtkiliGenislikOutput {
  etkiliTablaGenisligi_mm: number;
}

function compute(input: TablaliKirisEtkiliGenislikInput): CalcResult<TablaliKirisEtkiliGenislikOutput> {
  const l0 = L0_KATSAYI[input.aciklikTipi] * input.aciklik_L_m * 1000;
  const kanat = (bi: number) => Math.min(0.2 * bi + 0.1 * l0, 0.2 * l0, bi);
  const b1 = kanat(input.solTablaGenisligi_b1_mm);
  const b2 = kanat(input.sagTablaGenisligi_b2_mm);
  const beff = b1 + b2 + input.govdeGenisligi_bw_mm;
  const gercek = input.solTablaGenisligi_b1_mm + input.sagTablaGenisligi_b2_mm + input.govdeGenisligi_bw_mm;

  return {
    value: { etkiliTablaGenisligi_mm: beff },
    intermediates: {
      moment_sifir_noktalari_arasi_l0_mm: l0,
      sol_etkili_kanat_beff1_mm: b1,
      sag_etkili_kanat_beff2_mm: b2,
      gercek_tabla_genisligi_mm: gercek,
      etkili_gercek_orani: beff / gercek,
    },
    standardsUsed: ["TS EN 1992-1-1"],
  };
}

export const tablaliKirisEtkiliGenislik: CalcModule<TablaliKirisEtkiliGenislikInput, TablaliKirisEtkiliGenislikOutput> = {
  id: "tablali-kiris-etkili-genislik",
  title: "Tablalı (T/L) Kiriş Etkili Tabla Genişliği",
  discipline: "insaat",
  standards: ["TS EN 1992-1-1"],
  inputSchema: tablaliKirisEtkiliGenislikInputSchema,
  compute,
};
