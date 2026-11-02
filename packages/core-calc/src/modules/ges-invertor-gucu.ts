import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// GES invertör gücü seçimi: P_AC,ideal = P_DC/DC-AC oranı (yaygın 1,1–1,3); seçim, ticari kapasite
// basamaklarından P_AC,ideal'e eşit veya büyük en küçük değerdir. Gerçek DC/AC oranı = P_DC/P_AC,seçilen;
// oran 1,0–1,4 dışında değerlendirilir (düşük: invertör atıl; yüksek: tepe kırpma/clipping).
export const gesInvertorGucuInputSchema = z.object({
  dcPanelGucu_kWp: z.number().positive(),
  hedefDcAcOrani: z.number().min(1).max(1.6),
});

export type GesInvertorGucuInput = z.infer<typeof gesInvertorGucuInputSchema>;

export interface GesInvertorGucuOutput {
  invertorGucu_kW: number;
}

const BASAMAKLAR = [1, 1.5, 2, 3, 3.6, 4, 5, 6, 8, 10, 12, 15, 17, 20, 25, 30, 40, 50, 60, 80, 100, 125, 150, 200, 250, 500, 1000];

function compute(input: GesInvertorGucuInput): CalcResult<GesInvertorGucuOutput> {
  const ideal = input.dcPanelGucu_kWp / input.hedefDcAcOrani;
  const secilen = BASAMAKLAR.find((b) => b >= ideal - 1e-9) ?? Math.ceil(ideal);
  const oran = input.dcPanelGucu_kWp / secilen;
  const status = oran > 1.4 ? "sinirda" : oran < 1.0 ? "sinirda" : "uygun";
  return {
    value: { invertorGucu_kW: secilen },
    intermediates: {
      ideal_ac_gucu_kW: ideal,
      gercek_dc_ac_orani: oran,
      invertor_yuklenme_yuzde: oran * 100,
    },
    standardsUsed: ["IEC 62548 (PV dizi tasarımı)"],
    verdict: {
      status,
      note:
        oran > 1.4
          ? "DC/AC oranı 1,4'ü aşıyor: güneşli saatlerde tepe kırpma kaybı artar."
          : oran < 1
            ? "DC/AC oranı 1'in altında: invertör gereğinden büyük (atıl kapasite)."
            : "DC/AC oranı yaygın tasarım aralığında (1,0–1,4).",
    },
  };
}

export const gesInvertorGucu: CalcModule<GesInvertorGucuInput, GesInvertorGucuOutput> = {
  id: "ges-invertor-gucu",
  title: "GES İnvertör Gücü Seçimi (DC/AC Oranı)",
  discipline: "ev",
  standards: ["IEC 62548"],
  inputSchema: gesInvertorGucuInputSchema,
  compute,
};
