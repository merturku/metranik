import { describe, expect, it } from "vitest";
import { havalandirmaDebiKontrolu } from "./havalandirma-debi-kontrolu";

describe("havalandirma-debi-kontrolu", () => {
  it("ölçülen debi gerekli debiyi karşılıyorsa uygun döner", () => {
    const r = havalandirmaDebiKontrolu.compute({
      olculenDebi_L_s: 45,
      gerekliDebi_L_s: 40,
    });

    expect(r.value.marj_L_s).toBeCloseTo(5, 5);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("ölçülen debi gerekli debinin altındaysa uygunsuz döner", () => {
    const r = havalandirmaDebiKontrolu.compute({
      olculenDebi_L_s: 30,
      gerekliDebi_L_s: 40,
    });

    expect(r.value.marj_L_s).toBeCloseTo(-10, 5);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
