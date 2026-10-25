import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kablonun boru/kanal içinden çekilmesinde çekme kuvveti (yatay güzergâh):
// düz bölüm  T₂ = T₁ + μ·W·L   (W = kablo ağırlığı × g, N/m),
// dirsek     T₂ = T₁·e^(μ·θ)   (kapstan/Euler-Eytelwein denklemi, θ radyan),
// dirsekte yan duvar basıncı SWP = T/R (N/m).
// Güzergâh: düz bölüm 1 → dirsek → düz bölüm 2; ters yönde çekiş de hesaplanır
// (dirsek çekiş ucuna yakınken kuvvet daha düşüktür). İzin verilen çekme kuvveti
// iletkenden (çekme başlığıyla) çekişte σizin × iletken kesiti; σizin üreticiden alınır.
const G = 9.80665;

export const kabloCekmeKuvvetiInputSchema = z.object({
  kabloBirimAgirligi_kgm: z.number().positive(),
  surtunmeKatsayisi_mu: z.number().positive().max(1),
  duzBolum1_m: z.number().min(0),
  dirsekAcisi_derece: z.number().min(0).max(180),
  dirsekYaricapi_m: z.number().positive(),
  duzBolum2_m: z.number().min(0),
  toplamIletkenKesiti_mm2: z.number().positive(),
  izinVerilenGerilme_Nmm2: z.number().positive(),
});

export type KabloCekmeKuvvetiInput = z.infer<typeof kabloCekmeKuvvetiInputSchema>;

export interface KabloCekmeKuvvetiOutput {
  enKucukCekmeKuvveti_N: number;
}

function compute(input: KabloCekmeKuvvetiInput): CalcResult<KabloCekmeKuvvetiOutput> {
  const mu = input.surtunmeKatsayisi_mu;
  const W = input.kabloBirimAgirligi_kgm * G;
  const kapstan = Math.exp((mu * input.dirsekAcisi_derece * Math.PI) / 180);
  const cek = (ilk: number, son: number) => {
    const dirsekOncesi = mu * W * ilk;
    const dirsekSonrasi = dirsekOncesi * kapstan;
    return { dirsekSonrasi, toplam: dirsekSonrasi + mu * W * son };
  };
  const ileri = cek(input.duzBolum1_m, input.duzBolum2_m);
  const geri = cek(input.duzBolum2_m, input.duzBolum1_m);
  const enIyi = ileri.toplam <= geri.toplam ? ileri : geri;
  const izin = input.izinVerilenGerilme_Nmm2 * input.toplamIletkenKesiti_mm2;
  const yon = ileri.toplam <= geri.toplam ? "1. bölüm tarafından besleyip 2. bölüm ucundan çekin" : "2. bölüm tarafından besleyip 1. bölüm ucundan çekin";

  const verdict: CalcResult<KabloCekmeKuvvetiOutput>["verdict"] =
    enIyi.toplam <= izin
      ? {
          status: "uygun",
          note: `En düşük çekme kuvveti ${enIyi.toplam.toFixed(0)} N ≤ izin verilen ${izin.toFixed(0)} N (${yon}).`,
        }
      : {
          status: "uygunsuz",
          note: `En düşük çekme kuvveti ${enIyi.toplam.toFixed(0)} N > izin verilen ${izin.toFixed(0)} N: ara çekme kutusu ekleyin, dirsek sayısını azaltın veya kaydırıcı (yağlayıcı) ile μ'yü düşürün.`,
        };

  return {
    value: { enKucukCekmeKuvveti_N: enIyi.toplam },
    intermediates: {
      ileri_yonde_cekme_kuvveti_N: ileri.toplam,
      geri_yonde_cekme_kuvveti_N: geri.toplam,
      kapstan_katsayisi: kapstan,
      dirsek_yan_duvar_basinci_Nm: enIyi.dirsekSonrasi / input.dirsekYaricapi_m,
      izin_verilen_cekme_kuvveti_N: izin,
      onerilen_cekis_yonu: yon,
    },
    standardsUsed: [],
    verdict,
  };
}

export const kabloCekmeKuvveti: CalcModule<KabloCekmeKuvvetiInput, KabloCekmeKuvvetiOutput> = {
  id: "kablo-cekme-kuvveti",
  title: "Kablo Çekme Kuvveti (Kapstan Denklemi)",
  discipline: "elektrik",
  standards: [],
  inputSchema: kabloCekmeKuvvetiInputSchema,
  compute,
};
