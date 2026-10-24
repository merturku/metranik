import { describe, it, expect } from "vitest";
import { buharSistemiVakuumKontrolu } from "./buhar-sistemi-vakuum-kontrolu";

const ATM = 101.325;

describe("Buhar Sistemi Vakuum Kontrolü", () => {
  it("Buhar tablosu: 10 kPa mutlak → Tdoyma = 45,81 °C; vakum = 91,33 kPa", () => {
    const r = buharSistemiVakuumKontrolu.compute({
      kondenser_basinc_kPa: 10,
      tasarim_basinc_kPa: 10,
      atmosfer_basinci_kPa: ATM,
    });

    expect(r.value.vakuum_kPa).toBeCloseTo(91.325, 3);
    expect(r.value.doyma_sicakligi_C).toBeCloseTo(45.81, 0);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("8 kPa ölçülen, 10 kPa tasarım: daha derin vakum (Tdoyma ≈ 41,5 °C) → uygun", () => {
    const r = buharSistemiVakuumKontrolu.compute({
      kondenser_basinc_kPa: 8,
      tasarim_basinc_kPa: 10,
      atmosfer_basinci_kPa: ATM,
    });

    expect(r.value.vakuum_kPa).toBeCloseTo(93.325, 3);
    expect(r.value.doyma_sicakligi_C).toBeCloseTo(41.51, 0);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("12 kPa ölçülen, 10 kPa tasarım: vakum yetersiz (Tdoyma ≈ 49,4 °C) → uygunsuz", () => {
    const r = buharSistemiVakuumKontrolu.compute({
      kondenser_basinc_kPa: 12,
      tasarim_basinc_kPa: 10,
      atmosfer_basinci_kPa: ATM,
    });

    expect(r.value.doyma_sicakligi_C).toBeCloseTo(49.42, 0);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
