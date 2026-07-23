import { describe, expect, it } from "vitest";
import { sogutmaYuku } from "./sogutma-yuku";

describe("sogutma-yuku", () => {
  // NOT: Resmi bir standarttan alınmış doğrulanmış bir çözümlü örnek DEĞİLDİR.
  // Modülün kendi formülüyle tutarlılığını kontrol eder (85 * 60 W/m² * 1.0 / 1000 = 5.1 kW).
  it("85 m² konut İstanbul için soğutma yükünü hesaplar", () => {
    const r = sogutmaYuku.compute({ alan: 85, sehir: "istanbul", kullanim: "konut" });

    expect(r.value.kW).toBeCloseTo(5.1, 3);
    expect(r.intermediates.birimYuk_W_m2).toBe(60);
  });

  it("ofis kullanımı, konuta göre daha yüksek yük üretir", () => {
    const konut = sogutmaYuku.compute({ alan: 85, sehir: "istanbul", kullanim: "konut" });
    const ofis = sogutmaYuku.compute({ alan: 85, sehir: "istanbul", kullanim: "ofis" });

    expect(ofis.value.kW).toBeGreaterThan(konut.value.kW);
  });

  it("daha sıcak/kurak iklimde daha yüksek yük üretir", () => {
    const istanbul = sogutmaYuku.compute({ alan: 85, sehir: "istanbul", kullanim: "konut" });
    const izmir = sogutmaYuku.compute({ alan: 85, sehir: "izmir", kullanim: "konut" });

    expect(izmir.value.kW).toBeGreaterThan(istanbul.value.kW);
  });
});
