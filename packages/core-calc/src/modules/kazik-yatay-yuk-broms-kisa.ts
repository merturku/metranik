import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Broms (1964) kısa, serbest başlı kazık, kohezyonsuz zemin: zemin tepkisi p = 3·Kp·γ·D·z
// Dönme noktası kazık ucu: Hu·(e + L) = 0,5·Kp·γ·D·L³
export const kazikYatayYukBromsKisaInputSchema = z.object({
  capD_m: z.number().positive(),
  boyL_m: z.number().positive(),
  yukYuksekligiE_m: z.number().min(0),
  zeminBirimHacimAgirligi_kNm3: z.number().positive(),
  icSurtunmeAcisi_derece: z.number().min(15).max(45),
  guvenlikSayisi: z.number().min(1),
  tasarimYatayYuk_kN: z.number().min(0),
});

export type KazikYatayYukBromsKisaInput = z.infer<typeof kazikYatayYukBromsKisaInputSchema>;
export interface KazikYatayYukBromsKisaOutput {
  sinirYatayYuk_kN: number;
}

function compute(input: KazikYatayYukBromsKisaInput): CalcResult<KazikYatayYukBromsKisaOutput> {
  const phi = (input.icSurtunmeAcisi_derece * Math.PI) / 180;
  const Kp = Math.tan(Math.PI / 4 + phi / 2) ** 2;
  const { capD_m: D, boyL_m: L, yukYuksekligiE_m: e, zeminBirimHacimAgirligi_kNm3: g } = input;
  const Hu = (0.5 * Kp * g * D * L ** 3) / (e + L);
  const f = Math.sqrt(Hu / (1.5 * Kp * g * D));
  const Mmaks = Hu * (e + (2 * f) / 3);
  const Hizin = Hu / input.guvenlikSayisi;
  const oran = input.tasarimYatayYuk_kN / Hizin;
  const status = oran <= 0.9 ? "uygun" : oran <= 1 ? "sinirda" : "uygunsuz";
  return {
    value: { sinirYatayYuk_kN: Hu },
    intermediates: {
      Kp_pasif_katsayi: Kp,
      izin_yatay_yuk_kN: Hizin,
      sifir_kesme_derinligi_f_m: f,
      maks_moment_kNm: Mmaks,
      kullanim_orani: oran,
      uyari: f > L ? "f > L: kısa kazık varsayımı geçersiz (L yetersiz, uzun kazık/Broms plastik mafsal kontrolü gerekir)" : "—",
    },
    standardsUsed: ["Broms (1964) kohezyonsuz zeminde kısa kazık"],
    verdict: {
      status: f > L ? "uygunsuz" : status,
      note: `Tasarım yükü / izin yükü = ${oran.toFixed(2)}${f > L ? " — kısa kazık varsayımı sağlanmıyor" : ""}`,
    },
  };
}

export const kazikYatayYukBromsKisa: CalcModule<KazikYatayYukBromsKisaInput, KazikYatayYukBromsKisaOutput> = {
  id: "kazik-yatay-yuk-broms-kisa",
  title: "Kazık Yatay Yük Kapasitesi (Broms, Kısa Kazık, Kohezyonsuz Zemin)",
  discipline: "insaat",
  standards: ["Broms (1964)"],
  inputSchema: kazikYatayYukBromsKisaInputSchema,
  compute,
};
