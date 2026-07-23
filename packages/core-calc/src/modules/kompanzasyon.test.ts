import { describe, expect, it } from "vitest";
import { kompanzasyon } from "./kompanzasyon";

describe("kompanzasyon", () => {
  // Qc = 100×(tan(acos(0.75)) − tan(acos(0.95))) = 100×(0.8819−0.3288) ≈ 55.3 kVAr,
  // bağımsız doğrulanabilir (trigonometri).
  it("100 kW, cosφ 0.75→0.95 için gerekli kapasitör gücünü hesaplar", () => {
    const r = kompanzasyon.compute({ aktifGuc_kW: 100, mevcutCosPhi: 0.75, hedefCosPhi: 0.95 });

    expect(r.value.kapasitorGucu_kVAr).toBeCloseTo(55.31, 1);
  });

  it("hedef cosφ mevcuda eşitse kapasitör ihtiyacı sıfıra yakındır", () => {
    const r = kompanzasyon.compute({ aktifGuc_kW: 100, mevcutCosPhi: 0.9, hedefCosPhi: 0.9 });
    expect(r.value.kapasitorGucu_kVAr).toBeCloseTo(0, 5);
  });
});
