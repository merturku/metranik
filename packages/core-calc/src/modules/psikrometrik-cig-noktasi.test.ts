import { describe, expect, it } from "vitest";
import { psikrometrikCigNoktasi } from "./psikrometrik-cig-noktasi";

describe("psikrometrikCigNoktasi", () => {
  it("T=25°C, RH=%60 → Td≈16.68°C", () => {
    const r = psikrometrikCigNoktasi.compute({
      kuruTermometreSicakligi_T_C: 25,
      bagilNem_RH_yuzde: 60,
    });
    expect(r.value.cigNoktasi_Td_C).toBeCloseTo(16.6842, 3);
  });
});
