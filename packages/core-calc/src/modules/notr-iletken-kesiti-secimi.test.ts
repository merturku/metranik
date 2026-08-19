import { describe, expect, it } from "vitest";
import { notrIletkenKesitiSecimi } from "./notr-iletken-kesiti-secimi";

describe("notr-iletken-kesiti-secimi", () => {
  it("Ifaz=100A, harmonik çarpanı=1.45, faz kesiti=35mm² → 145A, 50.75mm²", () => {
    const r = notrIletkenKesitiSecimi.compute({
      fazAkimi_Ifaz_A: 100,
      harmonikCarpani: 1.45,
      fazKesiti_mm2: 35,
    });

    expect(r.intermediates.notrAkimi_A).toBeCloseTo(145, 5);
    expect(r.value.onerilenNotrKesiti_mm2).toBeCloseTo(50.75, 5);
  });
});
