import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Yük faktörü: LF = E/(P_pik·T) = P_ort/P_pik  (T dönem süresi, h). 0–1 arası; düşük LF pik talebin az kullanıldığını (pik traş/kaydırma, kapasite
// maliyeti) gösterir. Kurulu güce göre kullanım faktörü UF = P_pik/P_kurulu. Talep bedeli kW_maks × birim talep bedeli. Çeşitlilik faktörü
// DF = ΣP_bireysel,pik/P_sistem,pik ≥ 1 (isteğe bağlı: bireysel pikler toplamı girilirse). Tarife sınıflarına özgü eşikler yoktur; kıyas amaçlıdır.
export const yukFaktoruTalepAnaliziInputSchema = z.object({
  tuketim_kWh: z.number().positive(),
  donemSuresi_h: z.number().positive(),
  pikTalep_kW: z.number().positive(),
  kuruluGuc_kW: z.number().positive(),
  talepBedeli_TLkW: z.number().min(0),
});

export type YukFaktoruTalepAnaliziInput = z.infer<typeof yukFaktoruTalepAnaliziInputSchema>;

export interface YukFaktoruTalepAnaliziOutput {
  yukFaktoru: number;
}

function compute(input: YukFaktoruTalepAnaliziInput): CalcResult<YukFaktoruTalepAnaliziOutput> {
  const ort = input.tuketim_kWh / input.donemSuresi_h;
  const lf = ort / input.pikTalep_kW;
  return {
    value: { yukFaktoru: lf },
    intermediates: {
      ortalama_guc_kW: ort,
      kullanim_faktoru: input.pikTalep_kW / input.kuruluGuc_kW,
      talep_bedeli_TL: input.pikTalep_kW * input.talepBedeli_TLkW,
      pik_baslangic_orani: input.pikTalep_kW / ort,
      pik_azaltma_1kW_tasarruf_TL: input.talepBedeli_TLkW,
    },
    standardsUsed: [],
    verdict:
      lf > 1.0001
        ? { status: "uygunsuz", note: "Yük faktörü 1'i aşamaz: pik talep ortalama güçten küçük girilmiş." }
        : lf < 0.3
          ? { status: "sinirda", note: "Yük faktörü düşük (< 0,3): pik talep çok yüksek veya yük düzensiz; pik traşlama/yük kaydırma değerlendirilebilir." }
          : { status: "uygun", note: "Yük faktörü olağan aralıkta." },
  };
}

export const yukFaktoruTalepAnalizi: CalcModule<YukFaktoruTalepAnaliziInput, YukFaktoruTalepAnaliziOutput> = {
  id: "yuk-faktoru-talep-analizi",
  title: "Yük Faktörü ve Talep Analizi",
  discipline: "elektrik",
  standards: [],
  inputSchema: yukFaktoruTalepAnaliziInputSchema,
  compute,
};
