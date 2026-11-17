import { describe, it, expect } from "vitest";
import { yagTutucuNominalBoyut } from "./yag-tutucu-nominal-boyut";

describe("Yağ Tutucu Nominal Boyutu", () => {
  it("Qs 4 L/s, ft 1,3, fd 1, fr 1: NS = 5,2 → 7", () => {
    const r = yagTutucuNominalBoyut.compute({ qs_Ls: 4, ft: 1.3, fd: 1, fr: 1 });
    expect(r.value.nominalBoyut_NS).toBeCloseTo(5.2, 10);
    expect(r.intermediates.onerilen_standart_NS).toBe(7);
  });
  it("tam NS değeri aynı boyutu seçer (NS = 10 → 10); 11 → 15; çarpanlar çarpılır", () => {
    expect(yagTutucuNominalBoyut.compute({ qs_Ls: 10, ft: 1, fd: 1, fr: 1 }).intermediates.onerilen_standart_NS).toBe(10);
    expect(yagTutucuNominalBoyut.compute({ qs_Ls: 11, ft: 1, fd: 1, fr: 1 }).intermediates.onerilen_standart_NS).toBe(15);
    expect(yagTutucuNominalBoyut.compute({ qs_Ls: 2, ft: 1.3, fd: 1.5, fr: 1.2 }).value.nominalBoyut_NS).toBeCloseTo(4.68, 10);
  });
});
