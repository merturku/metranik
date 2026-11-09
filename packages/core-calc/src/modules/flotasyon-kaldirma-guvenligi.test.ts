import { describe, it, expect } from "vitest";
import { flotasyonKaldirmaGuvenligi } from "./flotasyon-kaldirma-guvenligi";

describe("Flotasyon Güvenliği", () => {
  it("100 m², hw = 3 m: U = 2943 kN; W = 3500 → FS = 1,189 (gerekli 1,1 → uygun)", () => {
    const r = flotasyonKaldirmaGuvenligi.compute({ tabanAlani_m2: 100, suYuksekligi_m: 3, stabilizeEdenYuk_kN: 3500, gerekliFS: 1.1 });
    expect(r.intermediates.kaldirma_kuvveti_kN as number).toBeCloseTo(2943, 6);
    expect(r.value.guvenlikKatsayisi).toBeCloseTo(1.1892, 3);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("W = 3000 → FS 1,019 sınırda; W = 2800 → uygunsuz; ek ağırlık = 1,1·2943 − 2800", () => {
    const g = { tabanAlani_m2: 100, suYuksekligi_m: 3, gerekliFS: 1.1 };
    expect(flotasyonKaldirmaGuvenligi.compute({ ...g, stabilizeEdenYuk_kN: 3000 }).verdict?.status).toBe("sinirda");
    const r = flotasyonKaldirmaGuvenligi.compute({ ...g, stabilizeEdenYuk_kN: 2800 });
    expect(r.verdict?.status).toBe("uygunsuz");
    expect(r.intermediates.ek_agirlik_ihtiyaci_kN as number).toBeCloseTo(1.1 * 2943 - 2800, 6);
  });
  it("su yoksa FS tanımsız (null) ve uygun", () => {
    const r = flotasyonKaldirmaGuvenligi.compute({ tabanAlani_m2: 50, suYuksekligi_m: 0, stabilizeEdenYuk_kN: 100, gerekliFS: 1.1 });
    expect(r.value.guvenlikKatsayisi).toBeNull();
    expect(r.verdict?.status).toBe("uygun");
  });
});
