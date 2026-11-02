import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kazıklı temelde kazık adedi (ön boyut): n = ⌈N·(1 + f_temel)/Q_izin⌉, f_temel başlık/zemin öz ağırlığı payı.
// Dikdörtgen yerleşim: sütun = ⌈√n⌉, sıra = ⌈n/sütun⌉; aralık s = 3·D (min. 2,5–3D pratiği);
// başlık planı: B = (sütun − 1)·s + 2·D, L = (sıra − 1)·s + 2·D (kazık ekseni–kenar ≈ D).
// Grup etkisi için Kazık Grubu Verimliliği modülüne bakın. İzin verilen yük Q_izin = Qu/GS'dir.
export const kazikGrubuKazikSayisiInputSchema = z.object({
  tasarimYuku_kN: z.number().positive(),
  temelAgirlikPayiYuzde: z.number().min(0).max(40),
  kazikIzinYuku_kN: z.number().positive(),
  kazikCapi_m: z.number().positive().max(3),
});

export type KazikGrubuKazikSayisiInput = z.infer<typeof kazikGrubuKazikSayisiInputSchema>;

export interface KazikGrubuKazikSayisiOutput {
  kazikSayisi: number;
}

function compute(input: KazikGrubuKazikSayisiInput): CalcResult<KazikGrubuKazikSayisiOutput> {
  const toplam = input.tasarimYuku_kN * (1 + input.temelAgirlikPayiYuzde / 100);
  const n = Math.ceil(toplam / input.kazikIzinYuku_kN - 1e-9);
  const sutun = Math.ceil(Math.sqrt(n));
  const sira = Math.ceil(n / sutun);
  const s = 3 * input.kazikCapi_m;
  return {
    value: { kazikSayisi: n },
    intermediates: {
      toplam_yuk_kN: toplam,
      gerekli_kazik_ham: toplam / input.kazikIzinYuku_kN,
      yerlesim: `${sira} sıra × ${sutun} sütun`,
      kazik_araligi_m: s,
      baslik_genisligi_m: (sutun - 1) * s + 2 * input.kazikCapi_m,
      baslik_uzunlugu_m: (sira - 1) * s + 2 * input.kazikCapi_m,
      kazik_basina_yuk_kN: toplam / n,
    },
    standardsUsed: ["TS EN 1997-1 (kazık tasarımı, ön boyut)"],
  };
}

export const kazikGrubuKazikSayisi: CalcModule<KazikGrubuKazikSayisiInput, KazikGrubuKazikSayisiOutput> = {
  id: "kazik-grubu-kazik-sayisi",
  title: "Kazıklı Temel Kazık Sayısı ve Başlık Boyutu",
  discipline: "insaat",
  standards: ["TS EN 1997-1"],
  inputSchema: kazikGrubuKazikSayisiInputSchema,
  compute,
};
