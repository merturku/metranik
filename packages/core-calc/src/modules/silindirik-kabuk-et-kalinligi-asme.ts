import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// ASME BPVC VIII-1 UG-27 (iç basınç, iç yarıçap R): silindir çevresel t = PR/(SE − 0,6P) (P ≤ 0,385SE), boyuna t = PR/(2SE + 0,4P),
// küre t = PR/(2SE − 0,2P); nihai t = max(t) + korozyon payı
export const silindirikKabukEtKalinligiAsmeInputSchema = z.object({
  tasarimBasinci_MPa: z.number().positive(),
  icYaricap_mm: z.number().positive(),
  izinVerilenGerilme_MPa: z.number().positive(),
  birlesimVerimi_E: z.number().gt(0).max(1),
  korozyonPayi_mm: z.number().min(0),
  kabukTipi: z.enum(["silindir", "kure"]),
});

export type SilindirikKabukEtKalinligiAsmeInput = z.infer<typeof silindirikKabukEtKalinligiAsmeInputSchema>;
export interface SilindirikKabukEtKalinligiAsmeOutput {
  gerekliEtKalinligi_mm: number;
}

const STD = "ASME BPVC Sec. VIII Div. 1 UG-27 (ince cidarlı kabuk)";

function compute(input: SilindirikKabukEtKalinligiAsmeInput): CalcResult<SilindirikKabukEtKalinligiAsmeOutput> {
  const P = input.tasarimBasinci_MPa;
  const R = input.icYaricap_mm;
  const SE = input.izinVerilenGerilme_MPa * input.birlesimVerimi_E;
  let t: number;
  const ara: Record<string, number | string> = {};
  let gecerli: boolean;
  if (input.kabukTipi === "silindir") {
    const tc = (P * R) / (SE - 0.6 * P);
    const tl = (P * R) / (2 * SE + 0.4 * P);
    t = Math.max(tc, tl);
    ara.cevresel_t_mm = tc;
    ara.boyuna_t_mm = tl;
    gecerli = P <= 0.385 * SE;
  } else {
    t = (P * R) / (2 * SE - 0.2 * P);
    ara.kure_t_mm = t;
    gecerli = P <= 0.665 * SE;
  }
  const nihai = t + input.korozyonPayi_mm;
  return {
    value: { gerekliEtKalinligi_mm: nihai },
    intermediates: { ...ara, korozyonsuz_t_mm: t, korozyon_payi_mm: input.korozyonPayi_mm, SE_MPa: SE },
    standardsUsed: [STD],
    verdict: gecerli
      ? { status: "uygun", note: "İnce cidar formülü geçerli; plaka kalınlığı üretim toleransı (−0,3 mm) ve standart levha kalınlığına yukarı yuvarlanmalı" }
      : { status: "uygunsuz", note: "P > 0,385·S·E (küre: 0,665·S·E): kalın cidar, UG-27 yerine Ek 1 formülleri kullanılmalı" },
  };
}

export const silindirikKabukEtKalinligiAsme: CalcModule<SilindirikKabukEtKalinligiAsmeInput, SilindirikKabukEtKalinligiAsmeOutput> = {
  id: "silindirik-kabuk-et-kalinligi-asme",
  title: "Basınçlı Kap Kabuk Et Kalınlığı (Silindir / Küre)",
  discipline: "mekanik",
  standards: [STD],
  inputSchema: silindirikKabukEtKalinligiAsmeInputSchema,
  compute,
};
