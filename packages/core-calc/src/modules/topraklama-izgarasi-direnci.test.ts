import { describe, it, expect } from "vitest";
import { topraklamaIzgarasiDirenci, topraklamaIzgarasiDirenciInputSchema } from "./topraklama-izgarasi-direnci";

// IEEE Std 80 Ek B örnek 1: 70 m × 70 m ızgara, 7 m göz, 11 × 11 iletken (LT = 1540 m), h = 0,5 m, ρ = 400 Ω·m
const ornek = {
  zeminOzdirenci_ohmm: 400,
  izgaraAlani_m2: 4900,
  toplamIletkenBoyu_m: 1540,
  gommeDerinligi_m: 0.5,
  izgaraAkimi_IG_kA: 1.908,
};

describe("Topraklama Izgarası (Ağ) Direnci", () => {
  it("IEEE 80 Ek B: Sverak Rg = ρ[1/LT + 1/√(20A)·(1 + 1/(1 + h√(20/A)))] = 2,78 Ω", () => {
    const r = topraklamaIzgarasiDirenci.compute(ornek);
    expect(r.value.direnc_Rg_ohm).toBeCloseTo(2.77569, 4);
  });

  it("Aynı ızgaraya çubuklar eklenince (LT = 1690 m) Rg = 2,75 Ω", () => {
    const r = topraklamaIzgarasiDirenci.compute({ ...ornek, toplamIletkenBoyu_m: 1690 });
    expect(r.value.direnc_Rg_ohm).toBeCloseTo(2.75264, 4);
  });

  it("Laurent-Niemann karşılaştırması: ρ/4·√(π/A) + ρ/LT = 2,792 Ω", () => {
    const r = topraklamaIzgarasiDirenci.compute(ornek);
    expect(r.intermediates.laurent_niemann_Rg_ohm).toBeCloseTo(2.79182, 4);
  });

  it("Toprak potansiyel yükselmesi GPR = IG·Rg = 1908 A × 2,776 Ω ≈ 5296 V", () => {
    const r = topraklamaIzgarasiDirenci.compute(ornek);
    expect(r.intermediates.toprak_potansiyel_yukselmesi_GPR_V).toBeCloseTo(5296.02, 1);
  });

  it("Direnç özdirençle doğru orantılı; Sverak geçerlilik aralığı dışı derinlik notlanır, şema negatif alanı reddeder", () => {
    const r = topraklamaIzgarasiDirenci.compute({ ...ornek, zeminOzdirenci_ohmm: 100 });
    expect(r.value.direnc_Rg_ohm).toBeCloseTo(2.77569 / 4, 4);
    const sig = topraklamaIzgarasiDirenci.compute({ ...ornek, gommeDerinligi_m: 0.1 });
    expect(sig.intermediates.gecerlilik).toContain("0,25");
    expect(topraklamaIzgarasiDirenciInputSchema.safeParse({ ...ornek, izgaraAlani_m2: -1 }).success).toBe(false);
  });
});
