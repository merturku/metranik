import { describe, it, expect } from "vitest";
import {
  buharSikistirmaliSogutmaCevrimi,
  buharSikistirmaliSogutmaCevrimiInputSchema,
} from "./buhar-sikistirmali-sogutma-cevrimi";

// Çengel & Boles, Termodinamik, Örnek 11-1: R-134a ideal çevrim, 0,14–0,8 MPa, ṁ = 0,05 kg/s
// h1 = 239,16, h2 = 275,39, h3 = h4 = 95,47 kJ/kg → QL = 7,18 kW, W = 1,81 kW, QH = 9,00 kW, COP = 3,97
const ideal = {
  sogutmaKapasitesi_kW: 0.05 * (239.16 - 95.47),
  h1_kompresorGirisi_kJkg: 239.16,
  h2s_izentropikCikis_kJkg: 275.39,
  h3_kondenserCikisi_kJkg: 95.47,
  izentropikVerim: 1,
};

describe("Buhar Sıkıştırmalı Soğutma Çevrimi (Entalpi Yöntemi)", () => {
  it("Çengel Örnek 11-1 (ideal çevrim): COP = 143,69/36,23 = 3,97", () => {
    const r = buharSikistirmaliSogutmaCevrimi.compute(ideal);
    expect(r.value.copSogutma).toBeCloseTo(3.96605, 4);
    expect(r.value.copSogutma).toBeCloseTo(3.97, 1);
  });

  it("Çengel Örnek 11-1: ṁ = 0,05 kg/s, kompresör gücü 1,81 kW, kondenser ısı atımı 9,00 kW", () => {
    const r = buharSikistirmaliSogutmaCevrimi.compute(ideal);
    expect(r.intermediates.sogutucu_kutlesel_debi_kgs).toBeCloseTo(0.05, 6);
    expect(r.intermediates.kompresor_gucu_kW).toBeCloseTo(1.8115, 4);
    expect(r.intermediates.kondenser_isi_atimi_kW).toBeCloseTo(8.996, 3);
  });

  it("Çengel Örnek 11-2 (gerçek çevrim): h2s = 284,21, h2 = 286,69 → ηC = %93,9, QL = 7,93 kW, W = 2,02 kW, COP = 3,93", () => {
    const h1 = 246.36;
    const h3 = 87.83;
    const eta = (284.21 - h1) / (286.69 - h1);
    const r = buharSikistirmaliSogutmaCevrimi.compute({
      sogutmaKapasitesi_kW: 0.05 * (h1 - h3),
      h1_kompresorGirisi_kJkg: h1,
      h2s_izentropikCikis_kJkg: 284.21,
      h3_kondenserCikisi_kJkg: h3,
      izentropikVerim: eta,
    });
    expect(eta).toBeCloseTo(0.939, 3);
    expect(r.intermediates.h2_gercek_kompresor_cikisi_kJkg).toBeCloseTo(286.69, 6);
    expect(r.intermediates.kompresor_gucu_kW).toBeCloseTo(2.0165, 4);
    expect(r.value.copSogutma).toBeCloseTo(3.931, 3);
  });

  it("Isı pompası COP'u soğutma COP'undan tam 1 fazladır (enerji dengesi)", () => {
    const r = buharSikistirmaliSogutmaCevrimi.compute({ ...ideal, izentropikVerim: 0.75 });
    expect(r.intermediates.cop_isi_pompasi as number).toBeCloseTo(r.value.copSogutma + 1, 10);
    expect(r.value.copSogutma).toBeCloseTo(3.96605 * 0.75, 4);
  });

  it("Şema h1 ≤ h3 ve h2s ≤ h1 durumlarını reddeder", () => {
    expect(
      buharSikistirmaliSogutmaCevrimiInputSchema.safeParse({ ...ideal, h3_kondenserCikisi_kJkg: 250 }).success,
    ).toBe(false);
    expect(
      buharSikistirmaliSogutmaCevrimiInputSchema.safeParse({ ...ideal, h2s_izentropikCikis_kJkg: 230 }).success,
    ).toBe(false);
    expect(buharSikistirmaliSogutmaCevrimiInputSchema.safeParse(ideal).success).toBe(true);
  });
});
