import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kolon taban plakası altında betonun ezilme (yatak) dayanımı, AISC 360-16 §J8: Pp = 0,85·f'c·A1·√(A2/A1) ≤ 1,7·f'c·A1;  φ = 0,65 (LRFD).
// A1 = plaka alanı, A2 = beton kesitinin geometrik olarak benzer en geniş alanı (√(A2/A1) ≤ 2). f'c silindir dayanımı (≈ fck). TS EN 1992-1-1 §6.7 kısmi yüklü alan yöntemi farklı katsayı kullanır; yerel mevzuata göre ayrıca kontrol edin.
export const tabanPlakasiEzilmeKontroluInputSchema = z.object({
  tasarimYuku_kN: z.number().positive(),
  plakaAlani_mm2: z.number().positive(),
  betonAlani_mm2: z.number().positive(),
  betonDayanimi_MPa: z.number().positive(),
});

export type TabanPlakasiEzilmeKontroluInput = z.infer<typeof tabanPlakasiEzilmeKontroluInputSchema>;

export interface TabanPlakasiEzilmeKontroluOutput {
  tasarimDayanimi_kN: number;
}

const PHI = 0.65;

function compute(input: TabanPlakasiEzilmeKontroluInput): CalcResult<TabanPlakasiEzilmeKontroluOutput> {
  const a1 = input.plakaAlani_mm2;
  const a2 = Math.max(input.betonAlani_mm2, a1);
  const oran = Math.min(Math.sqrt(a2 / a1), 2);
  const pp = (0.85 * input.betonDayanimi_MPa * a1 * oran) / 1000;
  const phiPp = PHI * pp;
  const kul = input.tasarimYuku_kN / phiPp;
  return {
    value: { tasarimDayanimi_kN: phiPp },
    intermediates: {
      sinirsiz_dayanim_Pp_kN: pp,
      alan_orani_sqrt: oran,
      kullanim_orani: kul,
      yatak_gerilmesi_MPa: (input.tasarimYuku_kN * 1000) / a1,
    },
    standardsUsed: ["AISC 360-16 §J8"],
    verdict:
      kul > 1
        ? { status: "uygunsuz", note: "Yük ezilme dayanımını aşıyor; plaka alanını büyütün." }
        : kul > 0.9
          ? { status: "sinirda", note: "Kullanım oranı %90'ın üzerinde." }
          : { status: "uygun", note: "Ezilme dayanımı yeterli." },
  };
}

export const tabanPlakasiEzilmeKontrolu: CalcModule<TabanPlakasiEzilmeKontroluInput, TabanPlakasiEzilmeKontroluOutput> = {
  id: "taban-plakasi-ezilme-kontrolu",
  title: "Kolon Taban Plakası Beton Ezilme Kontrolü",
  discipline: "insaat",
  standards: ["AISC 360-16"],
  inputSchema: tabanPlakasiEzilmeKontroluInputSchema,
  compute,
};
