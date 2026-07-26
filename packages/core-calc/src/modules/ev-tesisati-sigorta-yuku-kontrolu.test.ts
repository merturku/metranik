import { describe, expect, it } from "vitest";
import { evTesisatiSigortaYukuKontrolu } from "./ev-tesisati-sigorta-yuku-kontrolu";

describe("ev-tesisati-sigorta-yuku-kontrolu", () => {
  it("3000W, 230V, cosφ=0.95, 16A sigorta → ~13.73A, uygun", () => {
    const r = evTesisatiSigortaYukuKontrolu.compute({
      toplamGuc_W: 3000,
      gerilim_V: 230,
      gucFaktoru_cosfi: 0.95,
      sigortaAnmaAkimi_A: 16,
    });

    expect(r.value.akim_A).toBeCloseTo(13.73, 1);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("4500W yükte akım sigorta anma akımını aşar → uygunsuz", () => {
    const r = evTesisatiSigortaYukuKontrolu.compute({
      toplamGuc_W: 4500,
      gerilim_V: 230,
      gucFaktoru_cosfi: 0.95,
      sigortaAnmaAkimi_A: 16,
    });

    expect(r.value.akim_A).toBeCloseTo(20.59, 1);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
