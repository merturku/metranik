import { describe, it, expect } from "vitest";
import { fanIsletmeNoktasi } from "./fan-isletme-noktasi";

describe("Fan İşletme Noktası", () => {
  it("A=600, B=0, C=−4e-6, k=2e-6: Q = 10000 m³/h, ΔP = 200 Pa; fan eğrisi de 200 Pa verir", () => {
    const r = fanIsletmeNoktasi.compute({ fanA_Pa: 600, fanB: 0, fanC: -4e-6, sistemK: 2e-6, fanVerimi: 0.6 });
    expect(r.value.debi_m3h).toBeCloseTo(10000, 4);
    expect(r.intermediates.basinc_Pa as number).toBeCloseTo(200, 4);
    expect(600 - 4e-6 * 1e8).toBeCloseTo(200, 8);
    expect(r.intermediates.mil_gucu_kW as number).toBeCloseTo((10000 * 200) / (3600 * 0.6 * 1000), 6);
  });
  it("B ≠ 0 için kesişim her iki eğriyi sağlar", () => {
    const g = { fanA_Pa: 800, fanB: -0.01, fanC: -3e-6, sistemK: 1.5e-6, fanVerimi: 0.7 };
    const r = fanIsletmeNoktasi.compute(g);
    const q = r.value.debi_m3h as number;
    expect(g.fanA_Pa + g.fanB * q + g.fanC * q * q).toBeCloseTo(g.sistemK * q * q, 6);
  });
  it("kesişim yoksa null + uygunsuz", () => {
    const r = fanIsletmeNoktasi.compute({ fanA_Pa: 600, fanB: 0.01, fanC: 1e-6, sistemK: 1e-7, fanVerimi: 0.6 });
    expect(r.value.debi_m3h).toBeNull();
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
