import { describe, it, expect } from "vitest";
import { buharSistemiVakuumKontrolu } from "./buhar-sistemi-vakuum-kontrolu";

describe("Buhar Sistemi Vakuum Kontrolü", () => {
  it("ASME PTC 12.2: Kondenser 10 kPa mutlak → 101.325-10=91.325 kPa vakuum, uygun", () => {
    const r = buharSistemiVakuumKontrolu.compute({
      kondenser_basinc_kPa: 10,
      adiabatik_sicaklık_C: 45.8,
      max_izin_vakuum_kPa: 95,
    });

    expect(r.value.vakuum_kPa).toBeCloseTo(91.3, 0);
    expect(r.value.verdict?.status).toBe("uygun");
  });

  it("Aşırı vakuum: Kondenser 3 kPa → 101.325-3=98.325 kPa vakuum, sınırda", () => {
    const r = buharSistemiVakuumKontrolu.compute({
      kondenser_basinc_kPa: 3,
      adiabatik_sicaklık_C: 24.8,
      max_izin_vakuum_kPa: 95,
    });

    expect(r.value.vakuum_kPa).toBeCloseTo(98.3, 0);
    expect(r.value.verdict?.status).toBe("sinirda");
  });
});
