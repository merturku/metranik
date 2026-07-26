import { describe, expect, it } from "vitest";
import { yanginPompasiPerformansKontrolu } from "./yangin-pompasi-performans-kontrolu";

describe("yangin-pompasi-performans-kontrolu", () => {
  it("ölçülen basınç gerekli basıncı karşılıyorsa uygun döner", () => {
    const r = yanginPompasiPerformansKontrolu.compute({
      olculenBasinc_bar: 9.5,
      gerekliBasinc_bar: 9,
    });

    expect(r.value.marj_bar).toBeCloseTo(0.5, 5);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("ölçülen basınç gerekli basıncın altındaysa uygunsuz döner", () => {
    const r = yanginPompasiPerformansKontrolu.compute({
      olculenBasinc_bar: 8,
      gerekliBasinc_bar: 9,
    });

    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
