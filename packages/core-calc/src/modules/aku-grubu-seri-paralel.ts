import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Akü/batarya grubu bağlantı sayıları: seri sayı Ns = ⌈V_hedef/V_hücre⌉, paralel sayı Np = ⌈C_hedef/C_hücre⌉,
// toplam hücre N = Ns·Np, grup gerilimi V = Ns·V_hücre, kapasite C = Np·C_hücre (Ah), enerji E = V·C/1000 (kWh).
// Kullanılabilir enerji = E·DoD (deşarj derinliği). Seri hatlarda aynı model/yaştaki hücreler kullanılmalı, paralelde her kol için ayrı sigorta önerilir;
// paralel kol sayısı arttıkça kollar arası akım dengesizliği artar (genellikle ≤ 3–4 kol önerilir; üretici sınırlarına uyun).
export const akuGrubuSeriParalelInputSchema = z.object({
  hucreGerilimi_V: z.number().positive(),
  hucreKapasitesi_Ah: z.number().positive(),
  hedefGerilim_V: z.number().positive(),
  hedefKapasite_Ah: z.number().positive(),
  desarjDerinligi_yuzde: z.number().min(1).max(100),
});

export type AkuGrubuSeriParalelInput = z.infer<typeof akuGrubuSeriParalelInputSchema>;

export interface AkuGrubuSeriParalelOutput {
  toplamHucre: number;
}

function compute(input: AkuGrubuSeriParalelInput): CalcResult<AkuGrubuSeriParalelOutput> {
  const ns = Math.ceil(input.hedefGerilim_V / input.hucreGerilimi_V - 1e-9);
  const np = Math.ceil(input.hedefKapasite_Ah / input.hucreKapasitesi_Ah - 1e-9);
  const v = ns * input.hucreGerilimi_V;
  const c = np * input.hucreKapasitesi_Ah;
  const e = (v * c) / 1000;
  return {
    value: { toplamHucre: ns * np },
    intermediates: {
      seri_sayisi_Ns: ns,
      paralel_kol_sayisi_Np: np,
      grup_gerilimi_V: v,
      grup_kapasitesi_Ah: c,
      toplam_enerji_kWh: e,
      kullanilabilir_enerji_kWh: (e * input.desarjDerinligi_yuzde) / 100,
      paralel_kol_uyarisi: np > 4 ? "Paralel kol sayısı > 4: üretici onayı ve kol başına koruma gerekir" : "paralel kol sayısı kabul edilebilir",
    },
    standardsUsed: ["Seri/paralel bağlantı bağıntıları"],
  };
}

export const akuGrubuSeriParalel: CalcModule<AkuGrubuSeriParalelInput, AkuGrubuSeriParalelOutput> = {
  id: "aku-grubu-seri-paralel",
  title: "Akü Grubu Seri/Paralel Bağlantı Sayısı",
  discipline: "elektrik",
  standards: [],
  inputSchema: akuGrubuSeriParalelInputSchema,
  compute,
};
