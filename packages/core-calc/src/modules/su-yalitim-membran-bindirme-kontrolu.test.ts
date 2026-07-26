import { describe, expect, it } from "vitest";
import { suYalitimMembranBindirmeKontrolu } from "./su-yalitim-membran-bindirme-kontrolu";

describe("su-yalitim-membran-bindirme-kontrolu", () => {
  it("yatay yüzeyde 12cm bindirme (asgari 10cm) → uygun", () => {
    const r = suYalitimMembranBindirmeKontrolu.compute({
      olculenBindirme_cm: 12,
      yuzeyTipi: "yatay",
    });

    expect(r.value.marj_cm).toBeCloseTo(2, 5);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("eğimli yüzeyde aynı 12cm bindirme (asgari 15cm) → uygunsuz", () => {
    const r = suYalitimMembranBindirmeKontrolu.compute({
      olculenBindirme_cm: 12,
      yuzeyTipi: "egimli",
    });

    expect(r.value.marj_cm).toBeCloseTo(-3, 5);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
