import { describe, it, expect } from "vitest";
import { bolmeBoslukOrani } from "./insaat-bolme-bosluk-orani";

describe("Boşluk Oranı", () => {
  it("50 m² oda, 5 m² pencere → 10% (uygun)", () => {
    const r = bolmeBoslukOrani.compute({ toplam_alan_m2: 50, pencere_alan_m2: 5 });
    expect(r.value.bosluk_orani_yuzde).toBeCloseTo(10, 0);
  });
});
