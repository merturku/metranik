import { describe, it, expect } from "vitest";
import { gesPerformansOraniPr } from "./ges-performans-orani-pr";

describe("GES Performans Oranı (PR)", () => {
  it("14 200 kWh, 10 kWp, 1600 kWh/m² → PR = 0,8875; özgül verim 1420 kWh/kWp; uygun", () => {
    const r = gesPerformansOraniPr.compute({ uretilenEnerji_kWh: 14200, kuruluGuc_kWp: 10, duzlemIsinimi_kWhm2: 1600 });
    expect(r.value.performansOrani).toBeCloseTo(0.8875, 4);
    expect(r.intermediates.ozgul_verim_kWh_kWp).toBe(1420);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("PR 0,75 → sınırda; 0,6 → uygunsuz", () => {
    expect(gesPerformansOraniPr.compute({ uretilenEnerji_kWh: 12000, kuruluGuc_kWp: 10, duzlemIsinimi_kWhm2: 1600 }).verdict?.status).toBe("sinirda");
    expect(gesPerformansOraniPr.compute({ uretilenEnerji_kWh: 9600, kuruluGuc_kWp: 10, duzlemIsinimi_kWhm2: 1600 }).verdict?.status).toBe("uygunsuz");
  });
});
