import { describe, expect, it } from "vitest";
import { suFaturasiTahmini } from "./su-faturasi-tahmini";

describe("su-faturasi-tahmini", () => {
  it("tüketim=15m³, birim fiyat=45TL/m³ → 675 TL", () => {
    const r = suFaturasiTahmini.compute({
      aylikTuketim_m3: 15,
      birimFiyat_TLm3: 45,
    });

    expect(r.value.tahminiTutar_TL).toBeCloseTo(675, 5);
  });
});
