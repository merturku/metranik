import { describe, it, expect } from "vitest";
import { temelOturmaPrediktif } from "./temel-oturma-prediktif";

describe("Temel Oturma Tahmini", () => {
  it("1000 kN, 10 m², 200 kPa → ~50 mm (2 yıl)", () => {
    const r = temelOturmaPrediktif.compute({
      agirlik_kN: 1000,
      temel_alani_m2: 10,
      taşıma_gucu_kPa: 200,
      konsolidasyon_suresi_yıl: 2,
    });
    expect(r.value.oturma_mm).toBeGreaterThan(40);
  });
});
