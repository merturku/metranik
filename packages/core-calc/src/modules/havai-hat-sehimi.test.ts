import { describe, it, expect } from "vitest";
import { havaiHatSehimi } from "./havai-hat-sehimi";

describe("Havai Hat Sehimi", () => {
  it("w = 20 N/m, L = 200 m, H = 10 kN: f = 20·40000/80000 = 10 m; boy = 201,333 m; T = 10,2 kN", () => {
    const r = havaiHatSehimi.compute({ birimAgirlik_Nm: 20, aciklik_m: 200, yatayCekme_N: 10000 });
    expect(r.value.sehim_m).toBeCloseTo(10, 8);
    expect(r.intermediates.iletken_boyu_m as number).toBeCloseTo(201.3333, 3);
    expect(r.intermediates.mesnet_cekmesi_N as number).toBeCloseTo(10200, 6);
  });
  it("açıklık iki katı → sehim 4 katı; çekme iki katı → sehim yarısı", () => {
    const a = havaiHatSehimi.compute({ birimAgirlik_Nm: 20, aciklik_m: 100, yatayCekme_N: 10000 }).value.sehim_m;
    expect(havaiHatSehimi.compute({ birimAgirlik_Nm: 20, aciklik_m: 200, yatayCekme_N: 10000 }).value.sehim_m / a).toBeCloseTo(4, 8);
    expect(havaiHatSehimi.compute({ birimAgirlik_Nm: 20, aciklik_m: 100, yatayCekme_N: 20000 }).value.sehim_m / a).toBeCloseTo(0.5, 8);
  });
});
