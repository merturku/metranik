import { describe, it, expect } from "vitest";
import { modul_241 } from "./modul_241";

describe("Akışkan Sıcaklık Farkı", () => {
  it("EN 442: 10000 W, 1 kg/s → ΔT≈2.39 K", () => {
    const r = modul_241.compute({
      isi_yuku_W: 10000,
      kutlesel_debi_kgs: 1,
      ozgul_isi_JkgK: 4186,
    });
    expect(r.value.sicaklik_farki_K).toBeCloseTo(2.39, 1);
  });
});
