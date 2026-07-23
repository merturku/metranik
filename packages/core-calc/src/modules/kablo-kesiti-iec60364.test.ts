import { describe, expect, it } from "vitest";
import { kabloKesitiIec60364 } from "./kablo-kesiti-iec60364";

describe("kablo-kesiti-iec60364", () => {
  // A = 2×0.0175×30×20/5 = 4.2 mm², bağımsız doğrulanabilir (gerilim düşümü formülü).
  it("tek faz, 20 A, 30 m, 5 V izinli düşüm için kesiti hesaplar", () => {
    const r = kabloKesitiIec60364.compute({
      akim_A: 20,
      uzunluk_m: 30,
      izinliGerilimDusumu_V: 5,
      faz: "tek",
    });

    expect(r.value.kesit_mm2).toBeCloseTo(4.2, 5);
  });

  it("üç faz katsayısı (√3), tek faz katsayısından (2) düşüktür", () => {
    const tek = kabloKesitiIec60364.compute({
      akim_A: 20,
      uzunluk_m: 30,
      izinliGerilimDusumu_V: 5,
      faz: "tek",
    });
    const uc = kabloKesitiIec60364.compute({
      akim_A: 20,
      uzunluk_m: 30,
      izinliGerilimDusumu_V: 5,
      faz: "uc",
    });

    expect(uc.value.kesit_mm2).toBeLessThan(tek.value.kesit_mm2);
  });
});
