import { describe, expect, it } from "vitest";
import { elektrikFaturaTahmini } from "./elektrik-fatura-tahmini";

describe("elektrikFaturaTahmini", () => {
  it("350 kWh, 2.85 TL/kWh → 997.5 TL", () => {
    const r = elektrikFaturaTahmini.compute({
      aylikTuketim_kWh: 350,
      birimFiyat_TLkWh: 2.85,
    });
    expect(r.value.tahminiTutar_TL).toBeCloseTo(997.5, 2);
  });
});
