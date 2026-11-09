import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Pano (kabin) havalandırma fanı debisi: gerekli debi V̇ = (P_kayıp + P_güneş)/(ρ·cp·ΔT)·f,  ρ·cp = 1206 J/m³K (1,2 kg/m³, 1005 J/kgK);
// m³/h için V̇ ≈ 2,985·P/ΔT. ΔT = izin verilen iç–dış sıcaklık farkı (T_iç,maks − T_dış,maks). f filtre/kirlenme ve basınç kaybı güvenlik çarpanıdır (≈ 1,2–1,5).
// Doğal taşınım/duvar iletimi katkısı ihmal edilir (güvenli taraf). Yüksek rakım/ortam sıcaklığında yoğunluk düzeltmesi yapılmalıdır. Pano içi sıcaklık artışı için
// Pano Sıcaklık Artışı Kontrolü modülünü kullanın.
const RHO_CP = 1206;

export const panoHavalandirmaFaniDebisiInputSchema = z.object({
  isiKaybi_W: z.number().min(0),
  gunesKazanci_W: z.number().min(0),
  izinVerilenSicaklikFarki_K: z.number().positive(),
  guvenlikCarpani: z.number().min(1).max(3),
});

export type PanoHavalandirmaFaniDebisiInput = z.infer<typeof panoHavalandirmaFaniDebisiInputSchema>;

export interface PanoHavalandirmaFaniDebisiOutput {
  gerekliDebi_m3h: number;
}

function compute(input: PanoHavalandirmaFaniDebisiInput): CalcResult<PanoHavalandirmaFaniDebisiOutput> {
  const p = input.isiKaybi_W + input.gunesKazanci_W;
  const vs = p / (RHO_CP * input.izinVerilenSicaklikFarki_K); // m³/s
  const vh = vs * 3600 * input.guvenlikCarpani;
  return {
    value: { gerekliDebi_m3h: vh },
    intermediates: {
      toplam_isi_yuku_W: p,
      teorik_debi_m3h: vs * 3600,
      katalog_debisi_Ls: vh / 3.6,
      katalog_debisi_CFM: vh * 0.5886,
    },
    standardsUsed: ["Enerji dengesi Q = V̇·ρ·cp·ΔT"],
  };
}

export const panoHavalandirmaFaniDebisi: CalcModule<PanoHavalandirmaFaniDebisiInput, PanoHavalandirmaFaniDebisiOutput> = {
  id: "pano-havalandirma-fani-debisi",
  title: "Pano Havalandırma Fanı Debisi",
  discipline: "elektrik",
  standards: [],
  inputSchema: panoHavalandirmaFaniDebisiInputSchema,
  compute,
};
