import { describe, expect, it } from "vitest";
import { kuruSistemHavaKompresoru } from "./kuru-sistem-hava-kompresoru";

describe("kuru-sistem-hava-kompresoru", () => {
  it("V=200L, t=30dk → ~6.667 L/dk", () => {
    const r = kuruSistemHavaKompresoru.compute({
      boruSistemiHacmi_V_L: 200,
      hedefDolumSuresi_t_dk: 30,
    });

    expect(r.value.gerekliDebi_Ldk).toBeCloseTo(6.667, 2);
  });
});
