import { describe, it, expect } from "vitest";
import { celikIKesitSinifi } from "./celik-i-kesit-sinifi";

describe("Çelik I Kesit Sınıflandırması", () => {
  it("IPE300 S355: ε 0,8136; başlık c/t 5,276 (≤ 9ε = 7,32 → 1); gövde 35,01 (≤ 72ε = 58,6 → 1); sınıf 1", () => {
    const r = celikIKesitSinifi.compute({ fy_MPa: 355, h_mm: 300, b_mm: 150, tf_mm: 10.7, tw_mm: 7.1, r_mm: 15 });
    expect(r.intermediates.epsilon as number).toBeCloseTo(0.81357, 4);
    expect(r.intermediates.baslik_c_t as number).toBeCloseTo(5.27570, 3);
    expect(r.intermediates.govde_c_t as number).toBeCloseTo(35.0141, 3);
    expect(r.value.kesitSinifi).toBe(1);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("narin kaynaklı kesit (h 600, b 200, tf 10, tw 4, r 0): başlık 9,8 → sınıf 3; gövde 145 > 124ε → sınıf 4; genel 4", () => {
    const r = celikIKesitSinifi.compute({ fy_MPa: 355, h_mm: 600, b_mm: 200, tf_mm: 10, tw_mm: 4, r_mm: 0 });
    expect(r.intermediates.baslik_sinifi).toBe(3);
    expect(r.intermediates.govde_sinifi).toBe(4);
    expect(r.value.kesitSinifi).toBe(4);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
  it("daha düşük fy → daha büyük ε → daha iyi sınıf (S235'te aynı kesit ≤ S355 sınıfı)", () => {
    const g = { h_mm: 600, b_mm: 200, tf_mm: 10, tw_mm: 4, r_mm: 0 };
    expect(celikIKesitSinifi.compute({ ...g, fy_MPa: 235 }).value.kesitSinifi).toBeLessThanOrEqual(celikIKesitSinifi.compute({ ...g, fy_MPa: 355 }).value.kesitSinifi);
  });
});
