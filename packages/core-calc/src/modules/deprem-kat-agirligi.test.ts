import { describe, it, expect } from "vitest";
import { depremKatAgirligi } from "./deprem-kat-agirligi";

describe("Deprem Kat Ağırlığı", () => {
  it("G 5000, Q 1000, n 0,3: tipik kat 5300; 5 kat 26 500; çatı 3500 + 0,3·400 = 3620; W = 30 120 kN", () => {
    const r = depremKatAgirligi.compute({ g_kN: 5000, q_kN: 1000, n: 0.3, katSayisi: 5, catiG_kN: 3500, catiQ_kN: 400 });
    expect(r.intermediates.tipik_kat_agirligi_kN as number).toBeCloseTo(5300, 8);
    expect(r.intermediates.cati_agirligi_kN as number).toBeCloseTo(3620, 8);
    expect(r.value.toplamAgirlik_kN).toBeCloseTo(30120, 8);
  });
  it("n = 0 → yalnız sabit yük; n = 1 → G + Q", () => {
    const g = { g_kN: 100, q_kN: 40, katSayisi: 1, catiG_kN: 0, catiQ_kN: 0 };
    expect(depremKatAgirligi.compute({ ...g, n: 0 }).value.toplamAgirlik_kN).toBeCloseTo(100, 10);
    expect(depremKatAgirligi.compute({ ...g, n: 1 }).value.toplamAgirlik_kN).toBeCloseTo(140, 10);
  });
});
