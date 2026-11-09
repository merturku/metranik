import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Karşıt akışlı eşanjör, ε–NTU yöntemi: NTU = UA/Cmin,  C* = Cmin/Cmax,
// ε = (1 − e^(−NTU(1−C*)))/(1 − C*·e^(−NTU(1−C*)))  (C* = 1 için ε = NTU/(1 + NTU)).
// Q = ε·Cmin·(Th,g − Tc,g);  çıkış sıcaklıkları: Th,ç = Th,g − Q/Ch,  Tc,ç = Tc,g + Q/Cc.  C = ṁ·cp (W/K).
// Boyutlandırma (UA verilen eşanjör için çıkış sıcaklığı tahmini). Eşanjör Boyutlandırma (LMTD) alan bulur; Isı Değiştirici Etkinliği ε'u sıcaklıklardan hesaplar.
export const esanjorNtuKarsitAkisInputSchema = z.object({
  UA_WK: z.number().positive(),
  sicakDebiKapasitesi_Ch_WK: z.number().positive(),
  sogukDebiKapasitesi_Cc_WK: z.number().positive(),
  sicakGiris_C: z.number(),
  sogukGiris_C: z.number(),
});

export type EsanjorNtuKarsitAkisInput = z.infer<typeof esanjorNtuKarsitAkisInputSchema>;

export interface EsanjorNtuKarsitAkisOutput {
  isiTransferi_W: number;
}

function compute(input: EsanjorNtuKarsitAkisInput): CalcResult<EsanjorNtuKarsitAkisOutput> {
  const standards = ["ε–NTU yöntemi (Kays & London), karşıt akış"];
  if (input.sicakGiris_C <= input.sogukGiris_C) {
    return {
      value: { isiTransferi_W: 0 },
      intermediates: { not: "Sıcak akışkan girişi soğuktan yüksek olmalı" },
      standardsUsed: standards,
      verdict: { status: "uygunsuz", note: "Sıcaklık farkı yok veya ters." },
    };
  }
  const cmin = Math.min(input.sicakDebiKapasitesi_Ch_WK, input.sogukDebiKapasitesi_Cc_WK);
  const cmax = Math.max(input.sicakDebiKapasitesi_Ch_WK, input.sogukDebiKapasitesi_Cc_WK);
  const cr = cmin / cmax;
  const ntu = input.UA_WK / cmin;
  const eps = Math.abs(1 - cr) < 1e-9 ? ntu / (1 + ntu) : (1 - Math.exp(-ntu * (1 - cr))) / (1 - cr * Math.exp(-ntu * (1 - cr)));
  const q = eps * cmin * (input.sicakGiris_C - input.sogukGiris_C);
  return {
    value: { isiTransferi_W: q },
    intermediates: {
      NTU: ntu,
      kapasite_orani_Cr: cr,
      etkinlik_epsilon: eps,
      sicak_cikis_C: input.sicakGiris_C - q / input.sicakDebiKapasitesi_Ch_WK,
      soguk_cikis_C: input.sogukGiris_C + q / input.sogukDebiKapasitesi_Cc_WK,
      maks_isi_transferi_W: cmin * (input.sicakGiris_C - input.sogukGiris_C),
    },
    standardsUsed: standards,
  };
}

export const esanjorNtuKarsitAkis: CalcModule<EsanjorNtuKarsitAkisInput, EsanjorNtuKarsitAkisOutput> = {
  id: "esanjor-ntu-karsit-akis",
  title: "Eşanjör ε–NTU (Karşıt Akış) Çıkış Sıcaklıkları",
  discipline: "mekanik",
  standards: [],
  inputSchema: esanjorNtuKarsitAkisInputSchema,
  compute,
};
