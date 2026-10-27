import { describe, it, expect } from "vitest";
import {
  izinVerilenDokunmaAdimGerilimi,
  izinVerilenDokunmaAdimGerilimiInputSchema,
} from "./izin-verilen-dokunma-adim-gerilimi";

// IEEE Std 80 Ek B örnek 1: ρ = 400 Ω·m, 0,102 m kırma taş (ρs = 2500 Ω·m), ts = 0,5 s, 70 kg.
// Standart Cs = 0,74 (yuvarlanmış) ile Edokunma70 = 838,2 V, Eadım70 = 2686,6 V; GPR = 1908 A × 2,78 Ω = 5304 V.
const ornek = {
  zeminOzdirenci_ohmm: 400,
  yuzeyTabakasiOzdirenci_ohmm: 2500,
  yuzeyTabakasiKalinligi_m: 0.102,
  arizaSuresi_s: 0.5,
  vucutAgirligi: "70" as const,
  toprakPotansiyelYukselmesi_GPR_V: 5304,
};

describe("İzin Verilen Dokunma ve Adım Gerilimi", () => {
  it("IEEE 80 Ek B: Cs = 1 − 0,09·0,84/0,294 = 0,7429 (standartta 0,74)", () => {
    const r = izinVerilenDokunmaAdimGerilimi.compute(ornek);
    expect(r.intermediates.yuzey_tabakasi_katsayisi_Cs).toBeCloseTo(0.742857, 6);
    expect(r.intermediates.yuzey_tabakasi_katsayisi_Cs).toBeCloseTo(0.74, 2);
  });

  it("IEEE 80 Ek B: Edokunma70 = 840,5 V (standart Cs = 0,74 ile 838,2 V, fark < %0,5)", () => {
    const r = izinVerilenDokunmaAdimGerilimi.compute(ornek);
    expect(r.value.dokunmaGerilimi_V).toBeCloseTo(840.548, 2);
    expect(Math.abs(r.value.dokunmaGerilimi_V - 838.2) / 838.2).toBeLessThan(0.005);
  });

  it("IEEE 80 Ek B: Eadım70 = 2696,1 V (standart 2686,6 V, fark < %0,5)", () => {
    const r = izinVerilenDokunmaAdimGerilimi.compute(ornek);
    expect(r.intermediates.adim_gerilimi_V).toBeCloseTo(2696.096, 2);
    expect(Math.abs((r.intermediates.adim_gerilimi_V as number) - 2686.6) / 2686.6).toBeLessThan(0.005);
  });

  it("IEEE 80 Ek B: GPR 5304 V > 840 V → ayrıntılı göz/adım hesabı gerekir (sınırda); düşük GPR uygun", () => {
    expect(izinVerilenDokunmaAdimGerilimi.compute(ornek).verdict?.status).toBe("sinirda");
    expect(
      izinVerilenDokunmaAdimGerilimi.compute({ ...ornek, toprakPotansiyelYukselmesi_GPR_V: 800 }).verdict?.status,
    ).toBe("uygun");
    expect(
      izinVerilenDokunmaAdimGerilimi.compute({ ...ornek, toprakPotansiyelYukselmesi_GPR_V: 0 }).verdict,
    ).toBeUndefined();
  });

  it("50 kg: k = 0,116 → Edokunma50 = 621,0 V, IB = 0,164 A", () => {
    const r = izinVerilenDokunmaAdimGerilimi.compute({ ...ornek, vucutAgirligi: "50" });
    expect(r.value.dokunmaGerilimi_V).toBeCloseTo(621.042, 2);
    expect(r.intermediates.izin_verilen_vucut_akimi_IB_A).toBeCloseTo(0.164049, 5);
  });

  it("Yüzey tabakası yoksa (hs = 0) sonuç doğal zeminle aynıdır: (1000 + 1,5·400)·k/√ts", () => {
    const r0 = izinVerilenDokunmaAdimGerilimi.compute({ ...ornek, yuzeyTabakasiKalinligi_m: 0 });
    const rEsit = izinVerilenDokunmaAdimGerilimi.compute({ ...ornek, yuzeyTabakasiOzdirenci_ohmm: 400 });
    const beklenen = (1000 + 1.5 * 400) * (0.157 / Math.sqrt(0.5));
    expect(r0.value.dokunmaGerilimi_V).toBeCloseTo(beklenen, 6);
    expect(rEsit.value.dokunmaGerilimi_V).toBeCloseTo(beklenen, 6);
  });

  it("Dalziel geçerlilik aralığı dışı süre notlanır; şema sıfır süreyi reddeder", () => {
    const r = izinVerilenDokunmaAdimGerilimi.compute({ ...ornek, arizaSuresi_s: 5 });
    expect(r.intermediates.gecerlilik).toContain("dışında");
    expect(izinVerilenDokunmaAdimGerilimi.compute(ornek).intermediates.gecerlilik).not.toContain("dışında");
    expect(izinVerilenDokunmaAdimGerilimiInputSchema.safeParse({ ...ornek, arizaSuresi_s: 0 }).success).toBe(false);
  });
});
