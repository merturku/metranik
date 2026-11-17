import { describe, it, expect } from "vitest";
import { dikdortgenSavakDebisi } from "./dikdortgen-savak-debisi";

describe("Dikdörtgen Savak Debisi", () => {
  it("b = 1 m, H = 0,3 m, Cd 0,62, n = 2: b_etkin = 0,94 m; Q = 0,28274 m³/s", () => {
    const r = dikdortgenSavakDebisi.compute({ b_m: 1, h_m: 0.3, cd: 0.62, n: "2" });
    expect(r.intermediates.etkin_genislik_m as number).toBeCloseTo(0.94, 10);
    expect(r.value.debi_m3s).toBeCloseTo(0.282739, 5);
  });
  it("bastırılmış savak (n = 0): Q = 0,300786 m³/s; H iki katı → debi 2^1,5 kat (n = 0)", () => {
    const a = dikdortgenSavakDebisi.compute({ b_m: 1, h_m: 0.3, cd: 0.62, n: "0" }).value.debi_m3s;
    expect(a).toBeCloseTo(0.300786, 5);
    expect(dikdortgenSavakDebisi.compute({ b_m: 1, h_m: 0.6, cd: 0.62, n: "0" }).value.debi_m3s / a).toBeCloseTo(Math.pow(2, 1.5), 8);
  });
});
