import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Köşe (fileto) kaynağı dikiş metal hacmi/ağırlığı: ikizkenar dik üçgen kesit (kenar uzunluğu z), A = z²/2 (gerçek kaynakta dikiş yüksekliği
// artışı için ek pay uygulanır: katsayı 1,0–1,2), boy L → V = A·L·pay,  m = V·7850 kg/m³. Boğaz kalınlığı a = z/√2 (a = 0,707·z).
// Elektrot/tel sarfiyatı için verime bölünür (örtülü elektrot ≈ %60–70, dolgulu/MAG tel ≈ %90–95; girdidir). İki taraflı dikişte adet 2 girilir.
// Bu modül malzeme/maliyet metrajı içindir; dikiş dayanımı Köşe Kaynağı Dikiş Kapasitesi modülündedir.
const RHO = 7850;

export const koseKaynagiMetalAgirligiInputSchema = z.object({
  kenarUzunlugu_z_mm: z.number().positive(),
  dikisBoyu_mm: z.number().positive(),
  dikisSayisi: z.number().int().min(1),
  yuzeyPayi: z.number().min(1).max(1.5),
  kaynakVerimi_yuzde: z.number().min(30).max(100),
});

export type KoseKaynagiMetalAgirligiInput = z.infer<typeof koseKaynagiMetalAgirligiInputSchema>;

export interface KoseKaynagiMetalAgirligiOutput {
  kaynakMetaliAgirligi_kg: number;
}

function compute(input: KoseKaynagiMetalAgirligiInput): CalcResult<KoseKaynagiMetalAgirligiOutput> {
  const a = (input.kenarUzunlugu_z_mm ** 2) / 2; // mm²
  const v = (a * input.yuzeyPayi * input.dikisBoyu_mm * input.dikisSayisi) / 1e9; // m³
  const m = v * RHO;
  return {
    value: { kaynakMetaliAgirligi_kg: m },
    intermediates: {
      dikis_kesit_alani_mm2: a * input.yuzeyPayi,
      bogaz_kalinligi_a_mm: input.kenarUzunlugu_z_mm / Math.SQRT2,
      kaynak_metali_hacmi_cm3: v * 1e6,
      elektrot_tel_sarfiyati_kg: m / (input.kaynakVerimi_yuzde / 100),
      birim_boy_agirligi_kg_m: ((a * input.yuzeyPayi) / 1e6) * RHO,
    },
    standardsUsed: ["Dikiş kesit geometrisi; çelik yoğunluğu 7850 kg/m³"],
  };
}

export const koseKaynagiMetalAgirligi: CalcModule<KoseKaynagiMetalAgirligiInput, KoseKaynagiMetalAgirligiOutput> = {
  id: "kose-kaynagi-metal-agirligi",
  title: "Köşe Kaynağı Metal Ağırlığı ve Elektrot Sarfiyatı",
  discipline: "insaat",
  standards: [],
  inputSchema: koseKaynagiMetalAgirligiInputSchema,
  compute,
};
