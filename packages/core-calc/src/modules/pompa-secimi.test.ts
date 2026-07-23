import { describe, expect, it } from "vitest";
import { pompaSecimi } from "./pompa-secimi";

describe("pompa-secimi", () => {
  // H = P/(ρg) = 98100/(1000×9.81) = 10.0 m tam sayı, bağımsız doğrulanabilir.
  it("98100 Pa basınç kaybı için basma yüksekliğini hesaplar", () => {
    const r = pompaSecimi.compute({ debi_m3h: 36, basincKaybi_Pa: 98100 });

    expect(r.value.basmaYuksekligi_m).toBeCloseTo(10, 5);
    expect(r.value.debi_m3h).toBe(36);
  });
});
