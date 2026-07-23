import { describe, expect, it } from "vitest";
import { isitmaYukuTs825 } from "./isitma-yuku-ts825";

describe("isitma-yuku-ts825", () => {
  // NOT: Bu, standarttan alınmış doğrulanmış bir çözümlü örnek DEĞİLDİR.
  // Modülün kendi formülüyle tutarlılığını kontrol eder (85 * 65 W/m² * 1.0 / 1000 = 5.525 kW).
  // Üretimde kullanılmadan önce TS 825 Ek-A/Ek-B tablolarından doğrulanmış bir
  // referans örnekle değiştirilmelidir.
  it("85 m² çift cam İstanbul konut için ısıtma yükünü hesaplar", () => {
    const r = isitmaYukuTs825.compute({ alan: 85, sehir: "istanbul", cam: "cift" });

    expect(r.value.kW).toBeCloseTo(5.525, 3);
    expect(r.intermediates.iklimBolgesi).toBe(2);
    expect(r.standardsUsed).toEqual(["TS 825"]);
  });

  it("tek cam, çift cama göre daha yüksek yük üretir", () => {
    const cift = isitmaYukuTs825.compute({ alan: 85, sehir: "istanbul", cam: "cift" });
    const tek = isitmaYukuTs825.compute({ alan: 85, sehir: "istanbul", cam: "tek" });

    expect(tek.value.kW).toBeGreaterThan(cift.value.kW);
  });
});
