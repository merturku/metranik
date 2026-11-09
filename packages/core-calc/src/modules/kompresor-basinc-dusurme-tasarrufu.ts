import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kompresör çıkış basıncı düşürmenin enerji tasarrufu (izentropik sıkıştırma gücü oranı):
// P ∝ (p2/p1)^((k−1)/k) − 1, p1 emme (≈ atmosfer, 1,013 bar mutlak), p2 çıkış mutlak basıncı, k = 1,4 (hava).
// Oran = P_yeni/P_eski; yaklaşık her 1 bar düşüşte %6–7 tasarruf (pratik kural, burada gerçek orandan çıkar).
// Şebeke basıncı son kullanıcı ihtiyacının (artı hat kayıpları) altına düşürülmemelidir; kurutucu/filtre kaybı ayrıca ele alınır.
const P_ATM = 1.013;

export const kompresorBasincDusurmeTasarrufuInputSchema = z.object({
  mevcutBasinc_bar_g: z.number().positive(),
  yeniBasinc_bar_g: z.number().positive(),
  mevcutGuc_kW: z.number().positive(),
  yillikSaat_h: z.number().positive(),
  birimFiyat_TLkWh: z.number().min(0),
  isentropikUs_k: z.number().min(1.2).max(1.5),
});

export type KompresorBasincDusurmeTasarrufuInput = z.infer<typeof kompresorBasincDusurmeTasarrufuInputSchema>;

export interface KompresorBasincDusurmeTasarrufuOutput {
  tasarruf_yuzde: number;
}

function compute(input: KompresorBasincDusurmeTasarrufuInput): CalcResult<KompresorBasincDusurmeTasarrufuOutput> {
  const e = (input.isentropikUs_k - 1) / input.isentropikUs_k;
  const f = (pg: number) => ((pg + P_ATM) / P_ATM) ** e - 1;
  const oran = f(input.yeniBasinc_bar_g) / f(input.mevcutBasinc_bar_g);
  const yeniGuc = input.mevcutGuc_kW * oran;
  const kwh = (input.mevcutGuc_kW - yeniGuc) * input.yillikSaat_h;
  const fark = input.mevcutBasinc_bar_g - input.yeniBasinc_bar_g;
  return {
    value: { tasarruf_yuzde: (1 - oran) * 100 },
    intermediates: {
      guc_orani: oran,
      yeni_guc_kW: yeniGuc,
      yillik_tasarruf_kWh: kwh,
      yillik_tasarruf_TL: kwh * input.birimFiyat_TLkWh,
      bar_basina_tasarruf_yuzde: fark !== 0 ? ((1 - oran) * 100) / fark : "—",
    },
    standardsUsed: ["İzentropik sıkıştırma bağıntısı (ISO 1217 ölçüm yöntemi için)"],
  };
}

export const kompresorBasincDusurmeTasarrufu: CalcModule<KompresorBasincDusurmeTasarrufuInput, KompresorBasincDusurmeTasarrufuOutput> = {
  id: "kompresor-basinc-dusurme-tasarrufu",
  title: "Kompresör Basıncı Düşürme Enerji Tasarrufu",
  discipline: "mekanik",
  standards: [],
  inputSchema: kompresorBasincDusurmeTasarrufuInputSchema,
  compute,
};
