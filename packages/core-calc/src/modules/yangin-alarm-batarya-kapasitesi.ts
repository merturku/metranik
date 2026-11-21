import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Yangın alarm paneli yedek (ikincil) güç kaynağı: Ah = (Ibekleme·tbekleme + Ialarm·talarm)·f
// NFPA 72 §10.6.7.2.1: 24 saat bekleme + 5 dakika alarm; EN 54-4: 24 saat bekleme + alarm süresi (ulusal şartname)
export const yanginAlarmBataryaKapasitesiInputSchema = z.object({
  beklemeAkimi_mA: z.number().min(0),
  alarmAkimi_mA: z.number().min(0),
  beklemeSuresi_saat: z.number().positive(),
  alarmSuresi_dk: z.number().min(0),
  emniyetKatsayisi: z.number().min(1),
  secilenBatarya_Ah: z.number().positive(),
});

export type YanginAlarmBataryaKapasitesiInput = z.infer<typeof yanginAlarmBataryaKapasitesiInputSchema>;
export interface YanginAlarmBataryaKapasitesiOutput {
  gerekliKapasite_Ah: number;
}

const STD = "NFPA 72 §10.6.7.2.1 / EN 54-4 (ikincil güç kaynağı)";

function compute(input: YanginAlarmBataryaKapasitesiInput): CalcResult<YanginAlarmBataryaKapasitesiOutput> {
  const bekleme_Ah = (input.beklemeAkimi_mA * input.beklemeSuresi_saat) / 1000;
  const alarm_Ah = (input.alarmAkimi_mA * (input.alarmSuresi_dk / 60)) / 1000;
  const net = bekleme_Ah + alarm_Ah;
  const gerekli = net * input.emniyetKatsayisi;
  const oran = gerekli / input.secilenBatarya_Ah;
  return {
    value: { gerekliKapasite_Ah: gerekli },
    intermediates: {
      bekleme_Ah,
      alarm_Ah,
      net_Ah: net,
      gerekli_Ah: gerekli,
      secilen_Ah: input.secilenBatarya_Ah,
      kapasite_kullanim_orani: oran,
    },
    standardsUsed: [STD],
    verdict: {
      status: oran <= 0.9 ? "uygun" : oran <= 1 ? "sinirda" : "uygunsuz",
      note: `Gerekli ${gerekli.toFixed(2)} Ah / seçilen ${input.secilenBatarya_Ah} Ah (kullanım ${(oran * 100).toFixed(0)} %)`,
    },
  };
}

export const yanginAlarmBataryaKapasitesi: CalcModule<YanginAlarmBataryaKapasitesiInput, YanginAlarmBataryaKapasitesiOutput> = {
  id: "yangin-alarm-batarya-kapasitesi",
  title: "Yangın Alarm Paneli Batarya Kapasitesi",
  discipline: "elektrik",
  standards: [STD],
  inputSchema: yanginAlarmBataryaKapasitesiInputSchema,
  compute,
};
