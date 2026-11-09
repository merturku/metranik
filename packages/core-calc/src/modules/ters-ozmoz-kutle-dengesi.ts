import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Ters ozmoz (RO) kütle dengesi: geri kazanım R = Qp/Qf,  Qc = Qf − Qp (konsantre);  tuz geçirgenliği için ret oranı Rej:
// Cp = Cf·(1 − Rej);  tuz dengesi Qf·Cf = Qp·Cp + Qc·Cc → Cc = (Qf·Cf − Qp·Cp)/Qc;  konsantrasyon faktörü CF = Cc/Cf.
// Yüksek geri kazanımda konsantrede çözünürlük sınırı aşılırsa (CaCO3, CaSO4, silika) kireçlenme/tıkanma olur; sınırlar su analizinden
// ve membran üreticisinden doğrulanmalıdır. Ret oranı ortalama değerdir (basınç, sıcaklık, akıya göre değişir).
export const tersOzmozKutleDengesiInputSchema = z.object({
  beslemeDebisi_m3h: z.number().positive(),
  geriKazanim_yuzde: z.number().gt(0).lt(100),
  beslemeTDS_mgL: z.number().positive(),
  tuzRetOrani_yuzde: z.number().min(0).max(100),
});

export type TersOzmozKutleDengesiInput = z.infer<typeof tersOzmozKutleDengesiInputSchema>;

export interface TersOzmozKutleDengesiOutput {
  uretilenSuDebisi_m3h: number;
}

function compute(input: TersOzmozKutleDengesiInput): CalcResult<TersOzmozKutleDengesiOutput> {
  const qf = input.beslemeDebisi_m3h;
  const qp = (qf * input.geriKazanim_yuzde) / 100;
  const qc = qf - qp;
  const cp = input.beslemeTDS_mgL * (1 - input.tuzRetOrani_yuzde / 100);
  const cc = (qf * input.beslemeTDS_mgL - qp * cp) / qc;
  const cf = cc / input.beslemeTDS_mgL;
  return {
    value: { uretilenSuDebisi_m3h: qp },
    intermediates: {
      konsantre_debisi_m3h: qc,
      urun_suyu_TDS_mgL: cp,
      konsantre_TDS_mgL: cc,
      konsantrasyon_faktoru: cf,
      tuz_dengesi_hatasi: qf * input.beslemeTDS_mgL - qp * cp - qc * cc,
    },
    standardsUsed: ["Kütle dengesi (membran ayırma)"],
    verdict:
      input.geriKazanim_yuzde > 85
        ? { status: "sinirda", note: "Geri kazanım %85'in üstünde: konsantrede kireçlenme/silika sınırlarını su analiziyle kontrol edin." }
        : { status: "uygun", note: "Geri kazanım olağan aralıkta; çözünürlük sınırlarını yine de su analiziyle kontrol edin." },
  };
}

export const tersOzmozKutleDengesi: CalcModule<TersOzmozKutleDengesiInput, TersOzmozKutleDengesiOutput> = {
  id: "ters-ozmoz-kutle-dengesi",
  title: "Ters Ozmoz Kütle ve Tuz Dengesi",
  discipline: "mekanik",
  standards: [],
  inputSchema: tersOzmozKutleDengesiInputSchema,
  compute,
};
