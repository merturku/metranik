import { describe, it, expect } from "vitest";
import { upsIsiYayilimi } from "./ups-isi-yayilimi";

describe("UPS Isı Yayılımı", () => {
  it("100 kW, η = %94: Q = 6,383 kW; %20 yedekle 7,660 kW = 26 136 BTU/h = 2,178 TR", () => {
    const r = upsIsiYayilimi.compute({ cikisGucu_kW: 100, verim: 0.94, yedekPayi: 0.2 });
    expect(r.value.isiYayilimi_kW).toBeCloseTo(6.38298, 4);
    expect(r.intermediates.giris_gucu_kW as number).toBeCloseTo(106.38298, 4);
    expect(r.intermediates.gerekli_sogutma_kW as number).toBeCloseTo(7.65957, 4);
    expect(r.intermediates.gerekli_sogutma_BTUh as number).toBeCloseTo(26135.54, 1);
    expect(r.intermediates.gerekli_sogutma_TR as number).toBeCloseTo(2.17796, 4);
  });
  it("η = 1 → ısı yok", () => {
    expect(upsIsiYayilimi.compute({ cikisGucu_kW: 50, verim: 1, yedekPayi: 0 }).value.isiYayilimi_kW).toBeCloseTo(0, 10);
  });
});
