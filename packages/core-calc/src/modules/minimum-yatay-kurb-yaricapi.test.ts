import { describe, it, expect } from "vitest";
import { minimumYatayKurbYaricapi } from "./minimum-yatay-kurb-yaricapi";

describe("Minimum Yatay Kurb Yarıçapı", () => {
  it("100 km/h, e 0,08, f 0,12: R = 10000/(127·0,20) = 393,70 m", () => {
    const r = minimumYatayKurbYaricapi.compute({ hiz_kmh: 100, dever: 0.08, surtunme: 0.12 });
    expect(r.value.minYaricap_m).toBeCloseTo(393.7008, 3);
    expect(r.intermediates.e_plus_f as number).toBeCloseTo(0.2, 10);
  });
  it("yanal ivme = g·(e + f) (V²/(12,96R) = 9,81·0,2 = 1,962 m/s²); hız iki katı → R 4 kat", () => {
    const a = minimumYatayKurbYaricapi.compute({ hiz_kmh: 100, dever: 0.08, surtunme: 0.12 });
    expect(a.intermediates.yanal_ivme_ms2 as number).toBeCloseTo(9.81 * 0.2, 2);
    expect(minimumYatayKurbYaricapi.compute({ hiz_kmh: 200, dever: 0.08, surtunme: 0.12 }).value.minYaricap_m / a.value.minYaricap_m).toBeCloseTo(4, 10);
  });
});
