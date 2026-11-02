import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Mahal iç ısı kazancı (ASHRAE Fundamentals, Nonresidential Cooling and Heating Load Calculations):
// insan: duyulur ve gizli ısı kişi başı (aktivite düzeyine göre tablo — girdi; ofis oturma ≈ 75 W / 55 W),
// aydınlatma: P_toplam·kullanım faktörü·balast faktörü, ekipman: anma gücü·kullanım faktörü.
// Işınım/taşınım ayrımı ve soğutma yükü zaman gecikmesi (CLTD/RTS) bu modülde yoktur.
export const icIsiKazanciInputSchema = z.object({
  kisiSayisi: z.number().min(0),
  kisiDuyulur_W: z.number().min(0),
  kisiGizli_W: z.number().min(0),
  aydinlatmaGucu_W: z.number().min(0),
  aydinlatmaBalastFaktoru: z.number().min(1).max(1.5),
  ekipmanGucu_W: z.number().min(0),
  ekipmanKullanimFaktoru: z.number().min(0).max(1),
});

export type IcIsiKazanciInput = z.infer<typeof icIsiKazanciInputSchema>;

export interface IcIsiKazanciOutput {
  toplam_W: number;
}

function compute(input: IcIsiKazanciInput): CalcResult<IcIsiKazanciOutput> {
  const insanDuyulur = input.kisiSayisi * input.kisiDuyulur_W;
  const insanGizli = input.kisiSayisi * input.kisiGizli_W;
  const aydinlatma = input.aydinlatmaGucu_W * input.aydinlatmaBalastFaktoru;
  const ekipman = input.ekipmanGucu_W * input.ekipmanKullanimFaktoru;
  const duyulur = insanDuyulur + aydinlatma + ekipman;
  const toplam = duyulur + insanGizli;
  return {
    value: { toplam_W: toplam },
    intermediates: {
      insan_duyulur_W: insanDuyulur,
      insan_gizli_W: insanGizli,
      aydinlatma_W: aydinlatma,
      ekipman_W: ekipman,
      toplam_duyulur_W: duyulur,
      duyulur_isi_orani: toplam > 0 ? duyulur / toplam : 0,
    },
    standardsUsed: ["ASHRAE Fundamentals — Nonresidential Cooling and Heating Load Calculations"],
  };
}

export const icIsiKazanci: CalcModule<IcIsiKazanciInput, IcIsiKazanciOutput> = {
  id: "ic-isi-kazanci",
  title: "Mahal İç Isı Kazancı (İnsan + Aydınlatma + Ekipman)",
  discipline: "mekanik",
  standards: ["ASHRAE Fundamentals"],
  inputSchema: icIsiKazanciInputSchema,
  compute,
};
