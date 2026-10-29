import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// İstinat duvarı taban kaymasına karşı güvenlik (klasik yaklaşım; Das, Principles of Foundation Engineering):
// FS = (ΣV·tanδ + ca·B + Pp)/ΣH,  δ = taban-zemin sürtünme açısı (tipik 2/3·φ), ca taban adhezyonu (kPa),
// ΣV duvar+temel+üzerindeki zemin ağırlığı (kN/m), ΣH = aktif itki Pa'nın yatay bileşeni (kN/m),
// Pp pasif direnç (kN/m, güvenli tarafta çoğu kez 0 alınır). Gerekli FS kullanıcı girdisi (klasik değer ≥ 1,5).
export const istinatDuvariKaymaGuvenligiInputSchema = z.object({
  toplamDusey_kNm: z.number().positive(),
  toplamYatay_kNm: z.number().positive(),
  tabanSurtunmeAcisi_derece: z.number().min(0).max(45),
  tabanAdhezyonu_kPa: z.number().min(0),
  tabanGenisligi_m: z.number().positive(),
  pasifDirenc_kNm: z.number().min(0),
  gerekliFS: z.number().min(1),
});

export type IstinatDuvariKaymaGuvenligiInput = z.infer<typeof istinatDuvariKaymaGuvenligiInputSchema>;

export interface IstinatDuvariKaymaGuvenligiOutput {
  kaymaGuvenlikSayisi: number;
}

function compute(input: IstinatDuvariKaymaGuvenligiInput): CalcResult<IstinatDuvariKaymaGuvenligiOutput> {
  const surtunme = input.toplamDusey_kNm * Math.tan((input.tabanSurtunmeAcisi_derece * Math.PI) / 180);
  const adhezyon = input.tabanAdhezyonu_kPa * input.tabanGenisligi_m;
  const direnc = surtunme + adhezyon + input.pasifDirenc_kNm;
  const fs = direnc / input.toplamYatay_kNm;

  const verdict: CalcResult<IstinatDuvariKaymaGuvenligiOutput>["verdict"] =
    fs >= input.gerekliFS
      ? { status: "uygun", note: `FS = ${fs.toFixed(2)} ≥ gerekli ${input.gerekliFS.toFixed(2)}.` }
      : { status: "uygunsuz", note: `FS = ${fs.toFixed(2)} < gerekli ${input.gerekliFS.toFixed(2)}: temel genişliği/ağırlığı artırılmalı veya kayma anahtarı (key) eklenmeli.` };

  return {
    value: { kaymaGuvenlikSayisi: fs },
    intermediates: {
      surtunme_direnci_kNm: surtunme,
      adhezyon_direnci_kNm: adhezyon,
      toplam_direnc_kNm: direnc,
      gereken_ek_direnc_kNm: Math.max(0, input.gerekliFS * input.toplamYatay_kNm - direnc),
    },
    standardsUsed: [],
    verdict,
  };
}

export const istinatDuvariKaymaGuvenligi: CalcModule<
  IstinatDuvariKaymaGuvenligiInput,
  IstinatDuvariKaymaGuvenligiOutput
> = {
  id: "istinat-duvari-kayma-guvenligi",
  title: "İstinat Duvarı Kayma Güvenliği Kontrolü",
  discipline: "insaat",
  standards: [],
  inputSchema: istinatDuvariKaymaGuvenligiInputSchema,
  compute,
};
