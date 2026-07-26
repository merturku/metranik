import { describe, expect, it } from "vitest";
import { kabloEkonomikKesit } from "./kablo-ekonomik-kesit";

describe("kablo-ekonomik-kesit", () => {
  it("I=200A, Je=3 A/mm² → ~66.67 mm²", () => {
    const r = kabloEkonomikKesit.compute({
      akim_I_A: 200,
      ekonomikAkimYogunlugu_Je_Amm2: 3,
    });

    expect(r.value.ekonomikKesit_mm2).toBeCloseTo(66.667, 2);
  });
});
