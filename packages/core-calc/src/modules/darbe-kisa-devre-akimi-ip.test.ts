import { describe, it, expect } from "vitest";
import { darbeKisaDevreAkimiIp } from "./darbe-kisa-devre-akimi-ip";

describe("Darbe Kısa Devre Akımı ip", () => {
  it("R/X = 0,1: κ = 1,02 + 0,98·e^−0,3 = 1,746; Ik = 20 kA → ip = 1,746·√2·20 = 49,38 kA", () => {
    const r = darbeKisaDevreAkimiIp.compute({ baslangicKisaDevreAkimi_kA: 20, r_x_orani: 0.1 });
    expect(r.intermediates.kappa as number).toBeCloseTo(1.746, 3);
    expect(r.value.darbeAkimi_kA).toBeCloseTo(49.38, 1);
  });
  it("R/X = 0 → κ = 2 (ip = 2√2·Ik... sınırı 2,0); R/X büyükken κ → 1,02", () => {
    expect(darbeKisaDevreAkimiIp.compute({ baslangicKisaDevreAkimi_kA: 10, r_x_orani: 0 }).intermediates.kappa).toBeCloseTo(2, 10);
    expect(darbeKisaDevreAkimiIp.compute({ baslangicKisaDevreAkimi_kA: 10, r_x_orani: 5 }).intermediates.kappa as number).toBeCloseTo(1.02, 3);
  });
});
