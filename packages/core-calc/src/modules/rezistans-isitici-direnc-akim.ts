import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// 3 fazlı rezistanslı ısıtıcı: toplam P üç eşit elemana bölünür, eleman gücü Pe = P/3.
// Yıldız (Y): eleman gerilimi Uf = U/√3;  Üçgen (Δ): eleman gerilimi U.  Eleman direnci R = Uf²/Pe; hat akımı I = P/(√3·U) (her iki bağlantıda aynı güç için).
// Aynı elemanlar yıldızdan üçgene geçince güç 3 katına çıkar (P ∝ Uf²). Sıcaklıkla direnç değişimi (nikelin/kanthal) ve rezistans yüzey yükü ayrıca kontrol edilmelidir.
export const rezistansIsiticiDirencAkimInputSchema = z.object({
  toplamGuc_kW: z.number().positive(),
  hatGerilimi_V: z.number().positive(),
  baglanti: z.enum(["yildiz", "ucgen"]),
});

export type RezistansIsiticiDirencAkimInput = z.infer<typeof rezistansIsiticiDirencAkimInputSchema>;

export interface RezistansIsiticiDirencAkimOutput {
  elemanDirenci_ohm: number;
}

function compute(input: RezistansIsiticiDirencAkimInput): CalcResult<RezistansIsiticiDirencAkimOutput> {
  const p = input.toplamGuc_kW * 1000;
  const pe = p / 3;
  const uf = input.baglanti === "yildiz" ? input.hatGerilimi_V / Math.sqrt(3) : input.hatGerilimi_V;
  const r = (uf * uf) / pe;
  const iHat = p / (Math.sqrt(3) * input.hatGerilimi_V);
  const iEleman = uf / r;
  return {
    value: { elemanDirenci_ohm: r },
    intermediates: {
      eleman_gerilimi_V: uf,
      eleman_gucu_W: pe,
      eleman_akimi_A: iEleman,
      hat_akimi_A: iHat,
      diger_baglantida_guc_kW: (input.baglanti === "yildiz" ? 3 : 1 / 3) * input.toplamGuc_kW,
    },
    standardsUsed: ["Ohm yasası; 3 faz yıldız/üçgen bağlantı bağıntıları"],
  };
}

export const rezistansIsiticiDirencAkim: CalcModule<RezistansIsiticiDirencAkimInput, RezistansIsiticiDirencAkimOutput> = {
  id: "rezistans-isitici-direnc-akim",
  title: "Rezistanslı Isıtıcı Eleman Direnci ve Akım (Y/Δ)",
  discipline: "elektrik",
  standards: [],
  inputSchema: rezistansIsiticiDirencAkimInputSchema,
  compute,
};
