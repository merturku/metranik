import { describe, it, expect } from "vitest";
import { evKonutKredisiTaksit } from "./ev-konut-kredisi-taksit";

describe("Kredi Aylık Taksit", () => {
  it("100 000 ₺, aylık %1, 12 ay: taksit 8 884,88; toplam faiz 6 618,55", () => {
    const r = evKonutKredisiTaksit.compute({ anapara: 100000, aylikFaizYuzde: 1, vadeAy: 12 });
    expect(r.value.aylikTaksit).toBeCloseTo(8884.88, 2);
    expect(r.intermediates.toplam_faiz as number).toBeCloseTo(6618.55, 0);
  });
  it("faiz 0: taksit = P/n", () => {
    expect(evKonutKredisiTaksit.compute({ anapara: 120000, aylikFaizYuzde: 0, vadeAy: 24 }).value.aylikTaksit).toBe(5000);
  });
  it("borç dengesi: taksitlerin bugünkü değeri anaparaya eşit", () => {
    const g = { anapara: 500000, aylikFaizYuzde: 2.5, vadeAy: 60 };
    const a = evKonutKredisiTaksit.compute(g).value.aylikTaksit;
    let pv = 0;
    for (let k = 1; k <= 60; k++) pv += a / Math.pow(1.025, k);
    expect(pv).toBeCloseTo(500000, 4);
  });
});
