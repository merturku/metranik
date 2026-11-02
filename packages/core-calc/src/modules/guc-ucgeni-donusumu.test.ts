import { describe, it, expect } from "vitest";
import { gucUcgeniDonusumu } from "./guc-ucgeni-donusumu";

describe("Güç Üçgeni Dönüşümü", () => {
  it("100 kW, cosφ 0,8 → S 125 kVA, Q 75 kVAr, tanφ 0,75; 3 faz 400 V → 180,4 A", () => {
    const r = gucUcgeniDonusumu.compute({ aktifGuc_kW: 100, cosPhi: 0.8, gerilim_V: 400, faz: "3" });
    expect(r.value.gorunurGuc_kVA).toBeCloseTo(125, 9);
    expect(r.intermediates.reaktif_guc_kVAr as number).toBeCloseTo(75, 9);
    expect(r.intermediates.tan_phi as number).toBeCloseTo(0.75, 9);
    expect(r.intermediates.akim_A as number).toBeCloseTo(180.42, 2);
  });
  it("tek faz 230 V: 5 kW, cosφ 1 → 21,74 A", () => {
    const r = gucUcgeniDonusumu.compute({ aktifGuc_kW: 5, cosPhi: 1, gerilim_V: 230, faz: "1" });
    expect(r.intermediates.akim_A as number).toBeCloseTo(21.74, 2);
  });
});
