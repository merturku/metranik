import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Boru DN seçimi: gerekli iç çap D = √(4Q/(π·V)); EN 10220 / ISO 1127 dış çap serisinden
// iç çap (OD − 2·t) ≥ D olan en küçük DN seçilir, gerçek hız yeniden hesaplanır.
// Et kalınlığı t kullanıcı girdisidir (boru sınıfı/schedule'a göre değişir; tablo gömülmedi).
const DN_OD_mm: ReadonlyArray<readonly [number, number]> = [
  [15, 21.3], [20, 26.9], [25, 33.7], [32, 42.4], [40, 48.3], [50, 60.3], [65, 76.1],
  [80, 88.9], [100, 114.3], [125, 139.7], [150, 168.3], [200, 219.1], [250, 273.0], [300, 323.9],
];

export const boruSecimDnInputSchema = z.object({
  debi_m3h: z.number().positive(),
  tasarimHizi_ms: z.number().positive(),
  etKalinligi_mm: z.number().positive().max(15),
});

export type BoruSecimDnInput = z.infer<typeof boruSecimDnInputSchema>;

export interface BoruSecimDnOutput {
  dn: number | null;
}

function compute(input: BoruSecimDnInput): CalcResult<BoruSecimDnOutput> {
  const q = input.debi_m3h / 3600;
  const gerekli_mm = Math.sqrt((4 * q) / (Math.PI * input.tasarimHizi_ms)) * 1000;
  const secim = DN_OD_mm.find(([, od]) => od - 2 * input.etKalinligi_mm >= gerekli_mm - 1e-9);
  if (!secim) {
    return {
      value: { dn: null },
      intermediates: { gerekli_ic_cap_mm: gerekli_mm, not: "DN300'den büyük; seriyi genişletin veya paralel hat kullanın" },
      standardsUsed: ["EN 10220 (dış çap serisi)"],
      verdict: { status: "uygunsuz", note: "Gerekli iç çap DN300 iç çapını aşıyor." },
    };
  }
  const [dn, od] = secim;
  const ic = od - 2 * input.etKalinligi_mm;
  const v = q / ((Math.PI / 4) * (ic / 1000) ** 2);
  return {
    value: { dn },
    intermediates: {
      gerekli_ic_cap_mm: gerekli_mm,
      dis_cap_mm: od,
      secilen_ic_cap_mm: ic,
      gercek_hiz_ms: v,
    },
    standardsUsed: ["EN 10220 (dış çap serisi)", "Süreklilik denklemi"],
  };
}

export const boruSecimDn: CalcModule<BoruSecimDnInput, BoruSecimDnOutput> = {
  id: "boru-secim-dn",
  title: "Boru Seçimi (DN, Debi ve Hıza Göre)",
  discipline: "mekanik",
  standards: ["EN 10220"],
  inputSchema: boruSecimDnInputSchema,
  compute,
};
